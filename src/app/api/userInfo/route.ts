import {PrismaClient} from '@prisma/client';

import {decodeToken} from '@/helper/authentication';
import {cookies} from 'next/headers';
import {RequestCookie} from 'next/dist/compiled/@edge-runtime/cookies';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = await cookies();
    let token =  cookieStore.get('token') as RequestCookie;
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
      },
    });
    return Response.json({data: user});
  } catch (error) {
    console.log(error);
    return new Response('Internal server error', {status: 500});
  }
}