import {PrismaClient} from '@prisma/client';

import {decodeToken} from '@/helper/authentication';
import {cookies} from 'next/headers';
import {RequestCookie} from 'next/dist/compiled/@edge-runtime/cookies';
import {UserInfo} from '@/types/type';
import {NextResponse} from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get('token') as RequestCookie;
    if (!token) return new Response('Authorization required', {status: 401});
    const newtoken = token.value;

    const decodedToken = await decodeToken(newtoken);
    if (!decodedToken)
      return new Response('Authorization required', {status: 401});

    const user = await prisma.user.findFirst({
      where: {
        id: String(decodedToken.id),
      },
      select: {
        id: true,
        email: true,
        userName: true,
        phone: true,
        image: true,
      },
    });
    return Response.json({data: user});
  } catch (error) {
    return new Response('Internal server error', {status: 500});
  }
}

export async function PUT(req: Request) {
  try {
    const data: UserInfo = await req.json();

    if (!data.id) return new NextResponse('invalid user', {status: 400});

    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      return new NextResponse('User not found', {status: 404});
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        userName: data.userName || user.userName,
        email: data.email || user.email,
        phone: data.phone || user.phone,
        image: data.image || user.image,
      },
    });

    return NextResponse.json(
      {message: 'User updated successfully', data: updatedUser},
      {status: 200}
    );
  } catch (error) {
    return new Response('Internal server error', {status: 500});
  }
}
