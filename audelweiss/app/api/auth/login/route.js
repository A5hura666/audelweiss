// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateToken } from '@/app/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 });
    }

    const token = generateToken(user);
    return NextResponse.json({ token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, phone: user.phone } });
}
