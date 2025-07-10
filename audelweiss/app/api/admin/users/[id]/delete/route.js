import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { verifyAdmin } from "@/app/lib/auth";

export async function DELETE(req, context) {
    const params = await context.params;

    const verification = await verifyAdmin(req);
    if (!verification) {
        return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const userId = parseInt(params.id);
    if (isNaN(userId)) {
        return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user || user.role === "ADMIN") {
            return NextResponse.json({ error: "Impossible de supprimer un admin" }, { status: 403 });
        }

        await prisma.user.delete({ where: { id: userId } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erreur suppression utilisateur:", error);
        return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
    }
}
