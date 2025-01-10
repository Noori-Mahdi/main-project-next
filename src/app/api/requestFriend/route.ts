import {PrismaClient} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from 'next';
import {NextRequest, NextResponse} from 'next/server';

const prisma = new PrismaClient();
interface RequestFriendType {
  receiverId: string;
  senderId: string;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {senderId, receiverId} = data;

    if (!senderId || !receiverId) {
      return NextResponse.json(
        {error: 'Invalid senderId or receiverId'},
        {status: 400}
      );
    }

    const existingRequest = await prisma.friendRequest.findFirst({
      where: {senderId, receiverId},
    });

    if (existingRequest) {
      return NextResponse.json(
        {error: 'Friend request already sent or exists.'},
        {status: 400}
      );
    }

    const newRequest = await prisma.friendRequest.create({
      data: {senderId, receiverId},
    });

    return NextResponse.json(
      {success: true, message: 'Friend request sent.'},
      {status: 200}
    );
  } catch (error) {
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

export async function PUT(req: NextRequest) {
  try {
    // دریافت داده‌ها از request
    const data = await req.json();
    const {requestId, isAccepted} = data;
    // بررسی اینکه آیا requestId معتبر است یا خیر
    if (!requestId) {
      return NextResponse.json(
        {success: false, message: 'Request ID is required.'},
        {status: 400}
      );
    }

    // پیدا کردن درخواست دوستی با id مشخص
    const request = await prisma.friendRequest.findUnique({
      where: {id: requestId},
    });

    // اگر درخواست وجود نداشته باشد
    if (!request) {
      return NextResponse.json(
        {success: false, message: 'Friend request not found.'},
        {status: 404}
      );
    }

    // پردازش ادامه می‌دهد اگر درخواست وجود داشته باشد
    if (isAccepted) {
      // اگر درخواست پذیرفته شد، ایجاد رابطه دوستی
      await prisma.user.update({
        where: {id: request.senderId},
        data: {
          friends: {
            connect: {id: request.receiverId},
          },
        },
      });

      await prisma.user.update({
        where: {id: request.receiverId},
        data: {
          friends: {
            connect: {id: request.senderId},
          },
        },
      });

      // تغییر وضعیت درخواست به "پذیرفته شده"
      await prisma.friendRequest.update({
        where: {id: requestId},
        data: {status: 'accepted'},
      });

      // در اینجا هیچ نوتیفیکیشنی ارسال نمی‌شود
      return NextResponse.json({
        success: true,
        message: 'Friend request accepted.',
      });
    } else {
      // اگر درخواست رد شد، تغییر وضعیت به "رد شده"
      await prisma.friendRequest.update({
        where: {id: requestId},
        data: {status: 'rejected'},
      });

      // در اینجا هیچ نوتیفیکیشنی ارسال نمی‌شود
      return NextResponse.json({
        success: true,
        message: 'Friend request rejected.',
      });
    }
  } catch (error) {
    console.error('Error in PUT request:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing the request.',
      },
      {status: 500}
    );
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const receiverId = url.searchParams.get('receiverId'); // دریافت مقدار search از query string

  if (!receiverId) {
    return new Response('Receiver ID is required', {status: 400}); // در صورتی که `receiverId` وجود ندارد، خطا باز می‌گردانیم
  }

  console.log('Receiver ID:', receiverId); // برای debug

  const requests = await prisma.friendRequest.findMany({
    where: {
      receiverId: receiverId, // حالا مطمئن هستیم که `receiverId` یک string است
      status: 'pending',
    },
    include: {
      sender: true, // اطلاعات کاربری که درخواست را فرستاده
    },
  });

  return new Response(JSON.stringify(requests), {status: 200}); // بازگرداندن پاسخ به صورت JSON
}
