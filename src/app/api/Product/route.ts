import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from 'next/server';
import {writeFile} from 'fs/promises';
import path from 'path';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({});
    return NextResponse.json(
      {message: 'successfully', data: products},
      {status: 200}
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {success: false, message: 'Internal server error'},
      {status: 500}
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const categoryId = formData.get('categoryId') as string;
    const status = formData.get('status') as string;
    const price = parseInt(formData.get('price') as string);
    const discount = parseInt(formData.get('discount') as string) || 0;
    const stock = parseInt(formData.get('stock') as string);
    const description = formData.get('description') as string;
    const file = formData.get('image') as File;

    if (!name || !categoryId || !price || !stock) {
      return NextResponse.json(
        {success: false, message: 'اطلاعات ضروری وارد نشده است!'},
        {status: 400}
      );
    }

    let filePath = null;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      filePath = `/uploads/${Date.now()}-${file.name}`;
      await writeFile(path.join('public', filePath), buffer);
    }

    const product = await prisma.product.create({
      data: {
        name,
        categoryId,
        status,
        price,
        discount,
        stock,
        description,
        image: filePath, // مسیر تصویر در دیتابیس ذخیره می‌شود
      },
    });

    return NextResponse.json({success: true, product}, {status: 201});
  } catch (error) {
    console.error('❌ خطا در سرور:', error);
    return NextResponse.json(
      {success: false, message: 'خطا در سرور'},
      {status: 500}
    );
  }
}
