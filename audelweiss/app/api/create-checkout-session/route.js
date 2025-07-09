import Stripe from 'stripe';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.PRIVATE_STRIPE_API_KEY);

export async function POST(req) {
    const body = await req.json();
    const { cart, shippingAddress, billingAddress, email } = body;

    if (!email) {
        return NextResponse.json({ error: 'Email manquant' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    try {
        let customer;

        if (!user.customerStripeId) {
            // Création client Stripe avec adresses si fournies
            customer = await stripe.customers.create({
                email,
                ...(shippingAddress && {
                    shipping: {
                        name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                        address: {
                            line1: shippingAddress.line1,
                            line2: shippingAddress.line2 || undefined,
                            postal_code: shippingAddress.postalCode,
                            city: shippingAddress.city,
                            country: shippingAddress.country,
                        },
                    },
                }),
                ...(billingAddress && {
                    address: {
                        line1: billingAddress.line1,
                        line2: billingAddress.line2 || undefined,
                        postal_code: billingAddress.postalCode,
                        city: billingAddress.city,
                        country: billingAddress.country,
                    },
                }),
            });

            await prisma.user.update({
                where: { id: user.id },
                data: { customerStripeId: customer.id },
            });
        } else {
            // Récupération client Stripe existant
            customer = await stripe.customers.retrieve(user.customerStripeId);

            // Mise à jour des adresses si fournies
            const updateData = {};
            if (shippingAddress) {
                updateData.shipping = {
                    name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                    address: {
                        line1: shippingAddress.line1,
                        line2: shippingAddress.line2 || undefined,
                        postal_code: shippingAddress.postalCode,
                        city: shippingAddress.city,
                        country: shippingAddress.country,
                    },
                };
            }
            if (billingAddress) {
                updateData.address = {
                    line1: billingAddress.line1,
                    line2: billingAddress.line2 || undefined,
                    postal_code: billingAddress.postalCode,
                    city: billingAddress.city,
                    country: billingAddress.country,
                };
            }
            if (Object.keys(updateData).length > 0) {
                await stripe.customers.update(customer.id, updateData);
            }
        }

        // On demande l’adresse dans Stripe si non transmise
        const requireShippingAddress = !shippingAddress;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer: customer.id,
            line_items: cart.map((item) => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.productName,
                    },
                    unit_amount: Math.round(item.productPrice * 100),
                },
                quantity: item.quantity,
            })),
            metadata: {
                ...(shippingAddress && { shippingAddress: JSON.stringify(shippingAddress) }),
                ...(billingAddress && { billingAddress: JSON.stringify(billingAddress) }),
            },
            ...(requireShippingAddress && {
                shipping_address_collection: { allowed_countries: ['FR'] },
                billing_address_collection: 'required',
            }),
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/paiement-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création de la session' },
            { status: 500 }
        );
    }
}
