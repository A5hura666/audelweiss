import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';

export async function GET(req) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token);
        if (!payload) {
            return new Response(JSON.stringify({ error: 'Token invalide' }), { status: 401 });
        }

        const orders = await prisma.order.findMany({
            where: { userId: payload.id },
            include: { items: true },
            orderBy: { createdAt: 'desc' },
        });

        return new Response(JSON.stringify({ orders }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Erreur récupération commandes:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
    }
}
