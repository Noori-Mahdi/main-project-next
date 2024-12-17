import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pages = await prisma.pages.findMany({
        include:{
            childLink: true,
        }

      });
      return Response.json({data:pages});

  } catch (error) {
    return new Response('Internal server error', {status: 500});
  }
}