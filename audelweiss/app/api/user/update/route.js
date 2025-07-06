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
    const { firstName, lastName, phone } = body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: payload.id },
            data: { firstName, lastName, phone },
        });

        return NextResponse.json({
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phone: updatedUser.phone,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la mise à jour.' }, { status: 500 });
    }
}
