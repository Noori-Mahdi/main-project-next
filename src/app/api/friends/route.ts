import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId'); // دریافت userId از query string

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    const userWithFriends = await prisma.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });

    return new Response(
      JSON.stringify({ data: userWithFriends }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', { status: 500 });
  }
}
