// middleware.js
import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';

export function middleware(req: NextRequest) {
  // برای زمانی بود که بدون لاگین نمی خواستم کاربر به صفحات دسترسی داشته باشه

  // const cookies = req.cookies;
  // const userCookie = cookies.get('token');

  // const allowedPaths = ['/login', '/register'];

  // if (!userCookie && !allowedPaths.includes(req.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (req.nextUrl.pathname === '/adminPanel') {
    return NextResponse.redirect(
      new URL('/adminPanel/messageManagement', req.url)
    );
  }

  if (req.nextUrl.pathname === '/profile') {
    return NextResponse.redirect(new URL('/profile/userInfo', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/adminPanel', '/profile'],
};
