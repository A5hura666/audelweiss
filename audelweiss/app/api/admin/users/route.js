import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { verifyAdmin } from "@/app/lib/auth";

export async function GET(req) {
    const verification = await verifyAdmin(req);

    if (!verification) {
        return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
            },
        });

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
