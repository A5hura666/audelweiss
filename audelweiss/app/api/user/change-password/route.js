import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';
import bcrypt from 'bcryptjs';

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

    const { currentPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
        return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Mot de passe mis à jour' });
}
