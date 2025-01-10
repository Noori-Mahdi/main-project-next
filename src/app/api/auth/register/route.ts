import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import {NextRequest} from 'next/server';

const prisma = new PrismaClient();

interface IRegisterBody {
  email: string;
  password: string;
  userName: string;
  phone?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: IRegisterBody = await req.json();

    if (!data.email || !data.password || !data.userName) {
      return new Response('please fill all the fields', {status: 400});
    }

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) return new Response('user already exists', {status: 400});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        userName: data.userName,
        phone: data.phone || '',
      },
    });

    return new Response('user created successfully', {status: 201});
  } catch (error) {
    return new Response('Internal server error', {status: 500});
  }
}
