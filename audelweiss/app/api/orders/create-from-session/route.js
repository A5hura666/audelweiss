import Stripe from 'stripe';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/auth';

const stripe = new Stripe(process.env.PRIVATE_STRIPE_API_KEY);

export async function POST(req) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (!payload || !payload.id) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    const { sessionId } = await req.json();
    if (!sessionId) {
        return NextResponse.json({ error: 'sessionId manquant' }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'line_items.data.price.product'],
        });

        if (!session || session.payment_status !== 'paid') {
            return NextResponse.json({ error: 'Paiement non validé' }, { status: 400 });
        }

        const cart = session.line_items.data.map((item) => ({
            productName: item.description || item.price.product.name,
            productPrice: item.price.unit_amount / 100,
            quantity: item.quantity,
            color: null,
            taille: null,
        }));

        const total = session.amount_total / 100;

        const order = await prisma.order.create({
            data: {
                userId: payload.id,
                total,
                status: 'PAID',
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

        return NextResponse.json({ message: 'Commande créée', order }, { status: 201 });
    } catch (error) {
        console.error('Erreur création commande depuis session:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
