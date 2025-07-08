import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';

export async function GET(req) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload || !payload.id) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    try {
        const userData = await prisma.user.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,

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
            },
        });

        if (!userData) {
            return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
        }

        const user = {
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phone: userData.phone || '',

            shippingAddress: {
                firstName: userData.shippingFirstName || '',
                lastName: userData.shippingLastName || '',
                line1: userData.shippingLine1 || '',
                line2: userData.shippingLine2 || '',
                postalCode: userData.shippingPostalCode || '',
                city: userData.shippingCity || '',
                country: userData.shippingCountry || '',
            },
            billingAddress: {
                firstName: userData.billingFirstName || '',
                lastName: userData.billingLastName || '',
                line1: userData.billingLine1 || '',
                line2: userData.billingLine2 || '',
                postalCode: userData.billingPostalCode || '',
                city: userData.billingCity || '',
                country: userData.billingCountry || '',
            },
        };

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Erreur lors de la récupération du user :', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}