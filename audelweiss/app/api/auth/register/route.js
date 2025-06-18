import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/app/lib/prisma';
import jwt from 'jsonwebtoken';

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function isValidPhone(phone) {
    return /^\+?\d{7,15}$/.test(phone);
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password, firstName, lastName, phone } = body;

        if (!email || !password || !firstName || !lastName || !phone) {
            return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
        }
        if (!isValidEmail(email)) {
            return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 6 caractères' }, { status: 400 });
        }
        if (!isValidPhone(phone)) {
            return NextResponse.json({ error: 'Numéro de téléphone invalide' }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: 'Utilisateur déjà existant' }, { status: 409 });
        }

        const hashed = await hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashed, firstName, lastName, phone },
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return NextResponse.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
    }
}
