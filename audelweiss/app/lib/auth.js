// app/lib/auth.js
import jwt from 'jsonwebtoken';
import {NextResponse} from "next/server";
import prisma from "@/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
    });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export async function verifyAdmin(req) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (!payload || !payload.id) {
        return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.id },
        select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    return { ok: true, userId: payload.id };
}