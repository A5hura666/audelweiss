import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const comments = await prisma.comment.findMany({
    where: {
      slug,
      replyTo: null,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      replies: {
        orderBy: { date: "asc" },
      },
    },
  });

  return Response.json({ comments });
}

export async function POST(req) {
  const body = await req.json();
  const { name, email, website, comment, slug, replyTo } = body;

  if (!name || !email || !comment || !slug) {
    return Response.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const newComment = await prisma.comment.create({
    data: { name, email, website, comment, slug, replyTo: replyTo || null },
  });

  return Response.json(newComment);
}
