import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from 'next/server';
import {writeFile} from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // دریافت id از URL

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete Product' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop(); // دریافت id از URL
    if (!id) {
      return NextResponse.json(
        {success: false, message: 'شناسه محصول ارسال نشده است!'},
        {status: 400}
      );
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price'));
    const discount = Number(formData.get('discount')) || 0;
    const stock = Number(formData.get('stock'));
    const status = formData.get('status') as string;
    const categoryId = formData.get('categoryId') as string;
    const image = formData.get('image') as File | null;

    const existingProduct = await prisma.product.findUnique({where: {id}});
    if (!existingProduct) {
      return NextResponse.json(
        {success: false, message: 'محصول یافت نشد!'},
        {status: 404}
      );
    }

    let imagePath = existingProduct.image;
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imageName = `${Date.now()}_${image.name}`;
      imagePath = `/uploads/${imageName}`;

      const uploadPath = path.join(process.cwd(), 'public/uploads', imageName);
      await writeFile(uploadPath, buffer);
    }

    const updatedProduct = await prisma.product.update({
      where: {id},
      data: {
        name,
        description,
        price,
        discount,
        stock,
        status,
        categoryId,
        image: imagePath,
      },
    });

    return NextResponse.json({success: true, product: updatedProduct});
  } catch (error) {
    console.error('خطا در ویرایش محصول:', error);
    return NextResponse.json(
      {success: false, message: 'خطای سرور'},
      {status: 500}
    );
  }
}
