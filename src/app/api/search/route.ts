import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchQuery = url.searchParams.get('search'); // دریافت مقدار search از query string

    if (!searchQuery) {
      return new Response('Search query is required', { status: 400 });
    }

    // جستجو با استفاده از queryRaw و انتخاب فیلدهای id و userName
    const users = await prisma.$queryRaw`
      SELECT "id", "userName"
      FROM "User"
      WHERE LOWER("userName") LIKE LOWER(${`%${searchQuery}%`})
    `;

    return new Response(
      JSON.stringify({ data: users }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  }
}
