import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const Category = await prisma.category.findMany();

      return Response.json({data:Category});

  } catch (error) {
    return new Response('Internal server error', {status: 500});
  }
}