import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import {NextResponse} from 'next/server';
import {encodeToken} from '@/helper/authentication';

const prisma = new PrismaClient();

interface ILoginBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const data: ILoginBody = await req.json();

    if (!data.email || !data.password) {
      return new NextResponse('Please fill all the fields', {status: 400});
    }

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return new NextResponse('User not found', {status: 404});
    }

    // مقایسه رمز عبور
    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      return new NextResponse('Password not valid', {status: 400});
    }

    //JWT تولید توکن
    const token = await encodeToken(user.id);

    //Set-Cookie تنظیم کوکی با استفاده از هدر
    return new NextResponse('User logged in successfully', {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
      },
    });
  } catch (error) {
    return new NextResponse('Internal server error', {status: 500});
  }
}
