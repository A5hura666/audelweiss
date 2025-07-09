import { verifyToken } from "@/app/lib/auth";
import emailService from "@/app/lib/email";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.PRIVATE_STRIPE_API_KEY);

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload?.id) {
    return NextResponse.json({ error: "Token invalide" }, { status: 401 });
  }

  const { sessionId } = await req.json();
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId manquant" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: [
        "line_items",
        "line_items.data.price.product",
        "collected_information.shipping_details",
        "payment_intent.payment_method",
      ],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Paiement non validé" },
        { status: 400 }
      );
    }

    const cart = session.line_items.data.map((item) => ({
      productName: item.description || item.price.product.name,
      productPrice: item.price.unit_amount / 100,
      quantity: item.quantity,
      color: null,
      taille: null,
    }));

    const total = session.amount_total / 100;

    // Récupération de l'adresse de livraison
    let shipping = {};
    let shippingName = "";
    if (session.metadata?.shippingAddress) {
      const s = JSON.parse(session.metadata.shippingAddress);
      shipping = s;
      shippingName = `${s.firstName || ""} ${s.lastName || ""}`.trim();
    } else if (session.collected_information?.shipping_details) {
      const sd = session.collected_information.shipping_details;
      shipping = sd.address || {};
      shippingName = sd.name || "";
    }

    // Récupération de l'adresse de facturation
    let billing = {};
    let billingName = "";
    if (session.metadata?.billingAddress) {
      const b = JSON.parse(session.metadata.billingAddress);
      billing = b;
      billingName = `${b.firstName || ""} ${b.lastName || ""}`.trim();
    } else if (session.payment_intent?.payment_method?.billing_details) {
      const bd = session.payment_intent.payment_method.billing_details;
      billing = bd.address || {};
      billingName = bd.name || "";
    }

    const [shippingFirstName = "", ...shippingRest] = shippingName.split(" ");
    const shippingLastName = shippingRest.join(" ");

    const [billingFirstName = "", ...billingRest] = billingName.split(" ");
    const billingLastName = billingRest.join(" ");

    const order = await prisma.order.create({
      data: {
        userId: payload.id,
        total,
        status: "PAID",

        shippingFirstName,
        shippingLastName,
        shippingLine1: shipping.line1 || "",
        shippingLine2: shipping.line2 || null,
        shippingPostalCode: shipping.postal_code || shipping.postalCode || "",
        shippingCity: shipping.city || "",
        shippingCountry: shipping.country || "",

        billingFirstName,
        billingLastName,
        billingLine1: billing.line1 || "",
        billingLine2: billing.line2 || null,
        billingPostalCode: billing.postal_code || billing.postalCode || "",
        billingCity: billing.city || "",
        billingCountry: billing.country || "",

        items: {
          create: cart.map((item) => ({
            productName: item.productName,
            productPrice: item.productPrice,
            quantity: item.quantity,
            color: item.color,
            taille: item.taille,
          })),
        },
      },
      include: { items: true },
    });

    await emailService.sendOrderConfirmation(
      payload.email,
      order.shippingFirstName + " " + order.shippingLastName
    );
    return NextResponse.json(
      { message: "Commande créée", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création commande depuis session:", error);
    return NextResponse.json(
      { error: "Erreur serveur: " + error.message },
      { status: 500 }
    );
  }
}
