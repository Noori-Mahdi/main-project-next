import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      where:{
        public: true,
      },
      select:{
        title: true,
        content: true,
        image: true,
      }
    });
    return Response.json({data: news});
  } catch (error) {
    return new Response('Internal server error', {status: 500});
  }
}