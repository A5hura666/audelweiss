import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const comments = await prisma.comment.findMany({
    where: { slug },
    orderBy: { date: "desc" },
  });

  return Response.json({ comments });
}

export async function POST(req) {
  const body = await req.json();
  const { name, email, website, comment, slug } = body;

  if (!name || !email || !comment || !slug) {
    return Response.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const newComment = await prisma.comment.create({
    data: { name, email, website, comment, slug },
  });

  return Response.json(newComment);
}
