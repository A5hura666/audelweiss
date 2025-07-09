import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    let userId;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.id;
    }
    catch (error) {
        return Response.json({ error: "Token invalide" }, { status: 401 });
    }

    if (!userId) {
        return Response.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }
    const wishList = await prisma.productWish.findMany({
        where: { userId },
    });

    return Response.json({wishList});
}

export async function POST(req) {
    const body = await req.json();
    const { productId , userId} = body;

    if (!productId) {
        return Response.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const newWishListProduct = await prisma.productWish.create({
        data: { productId, userId, createdAt: new Date() },
    });

    return Response.json(newWishListProduct);
}

export async function DELETE(req) {
    const body = await req.json();
    const { productId, userId } = body;
    if (!productId || !userId) {
        return Response.json({ error: "Champs requis manquants" }, { status: 400 });
    }
    const deletedProduct = await prisma.productWish.deleteMany({
        where: { productId, userId },
    });
    if (deletedProduct.count === 0) {
        return Response.json({ error: "Produit non trouvé dans la liste de souhaits" }, { status: 404 });
    }
    return Response.json({ message: "Produit supprimé de la liste de souhaits" });
}