import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.PRIVATE_STRIPE_API_KEY);

export async function POST(req) {
    const body = await req.json();

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: body.cart.map((item) => ({
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
                cart: JSON.stringify(body.cart),
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/paiement-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        return NextResponse.json({ error: 'Erreur lors de la création de la session' }, { status: 500 });
    }
}
