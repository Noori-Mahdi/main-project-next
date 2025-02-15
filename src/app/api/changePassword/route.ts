import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import {NextResponse} from 'next/server';

export async function PUT(req: Request) {
  const Prisma = new PrismaClient();

  try {
    const {id, currentPassword, newPassword} = await req.json();

    if (!id || !currentPassword || !newPassword) {
      return new NextResponse('Missing required fields', {status: 400});
    }

    const user = await Prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return new NextResponse('User not found', {status: 404});
    }

    // بررسی صحت رمز عبور فعلی
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return new NextResponse('Current password is incorrect', {status: 401});
    }

    // هش کردن رمز جدید
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ذخیره رمز عبور جدید
    await Prisma.user.update({
      where: {id},
      data: {password: hashedPassword},
    });

    return NextResponse.json(
      {message: 'Password updated successfully'},
      {status: 200}
    );
  } catch (error) {
    return new Response('Internal server error', {status: 500});
  }
}
