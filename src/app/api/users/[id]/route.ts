import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(_: Request, {params}: {params: {id: string}}) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({error: 'User ID is required'}, {status: 400});
    }

    await prisma.user.delete({
      where: {id: id},
    });

    return NextResponse.json(
      {message: 'User deleted successfully'},
      {status: 200}
    );
  } catch (error) {
    return NextResponse.json({error: 'Failed to delete user'}, {status: 500});
  }
}

export async function  GET(_: Request, {params}: {params: {id: string}}) {
  try{
    const id = params.id;

    if (!id) {
      return NextResponse.json({error: 'User ID is required'}, {status: 400});
    }

    const user = await prisma.user.findUnique({
      where: {id: id},
      select:{
        id:true,
        userName:true,
        email:true,
        image:true,
        roleAdmin:true,
        phone:true,
      }
    });

    return NextResponse.json(
      {message: 'successfully',data: user},
      {status: 200}
    );

  }catch(error){
    return NextResponse.json({error: 'Failed to delete user'}, {status: 500});
  }
}