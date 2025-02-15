import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        email: true,
        phone: true,
        roleAdmin: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {message: 'successfully', data: users},
      {status: 200}
    );
  } catch (error) {
    return new Response('Internal server error', {status: 500});
  }
}


