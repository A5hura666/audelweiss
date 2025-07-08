import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';

export async function PUT(req) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    const body = await req.json();
    const {
        firstName,
        lastName,
        phone,
        shippingAddress = {},
        billingAddress = {},
    } = body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: payload.id },
            data: {
                firstName,
                lastName,
                phone,

                shippingFirstName: shippingAddress.firstName,
                shippingLastName: shippingAddress.lastName,
                shippingLine1: shippingAddress.line1,
                shippingLine2: shippingAddress.line2,
                shippingPostalCode: shippingAddress.postalCode,
                shippingCity: shippingAddress.city,
                shippingCountry: shippingAddress.country,

                billingFirstName: billingAddress.firstName,
                billingLastName: billingAddress.lastName,
                billingLine1: billingAddress.line1,
                billingLine2: billingAddress.line2,
                billingPostalCode: billingAddress.postalCode,
                billingCity: billingAddress.city,
                billingCountry: billingAddress.country,
            },
        });

        return NextResponse.json({
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                firstName: updatedUser.firstName || '',
                lastName: updatedUser.lastName || '',
                phone: updatedUser.phone || '',

                shippingAddress: {
                    firstName: updatedUser.shippingFirstName || '',
                    lastName: updatedUser.shippingLastName || '',
                    line1: updatedUser.shippingLine1 || '',
                    line2: updatedUser.shippingLine2 || '',
                    postalCode: updatedUser.shippingPostalCode || '',
                    city: updatedUser.shippingCity || '',
                    country: updatedUser.shippingCountry || '',
                },
                billingAddress: {
                    firstName: updatedUser.billingFirstName || '',
                    lastName: updatedUser.billingLastName || '',
                    line1: updatedUser.billingLine1 || '',
                    line2: updatedUser.billingLine2 || '',
                    postalCode: updatedUser.billingPostalCode || '',
                    city: updatedUser.billingCity || '',
                    country: updatedUser.billingCountry || '',
                },
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur lors de la mise à jour.' }, { status: 500 });
    }
}
