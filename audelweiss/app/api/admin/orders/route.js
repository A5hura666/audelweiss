import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { verifyAdmin } from "@/app/lib/auth";

export async function GET(req) {
    const verification = await verifyAdmin(req);

    if (!verification) {
        return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    try {
        const orders = await prisma.order.findMany({
            select: {
                id: true,
                userId: true,
                createdAt: true,
                status: true,
                total: true,

                shippingFirstName: true,
                shippingLastName: true,
                shippingLine1: true,
                shippingLine2: true,
                shippingPostalCode: true,
                shippingCity: true,
                shippingCountry: true,

                billingFirstName: true,
                billingLastName: true,
                billingLine1: true,
                billingLine2: true,
                billingPostalCode: true,
                billingCity: true,
                billingCountry: true,

                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                items: {
                    select: {
                        productName: true,
                        productPrice: true,
                        quantity: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ orders });
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
