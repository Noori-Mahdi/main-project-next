import Dashboard from '@/components/Dashboard';
import NavBarVertical from '@/components/NavBarVertical';
import {getPages} from '@/services/pages';
import {getUserInfo} from '@/helper/authentication'; // وارد کردن تابع getUserInfo از helper
import {Pages} from '@prisma/client';
import {cookies} from 'next/headers'; // برای دسترسی به کوکی‌ها
import FriendList from '@/components/FriendList';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    // دریافت کوکی‌ها از درخواست
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p>No token provided. Please log in.</p>
        </div>
      );
    }

    // دریافت اطلاعات کاربر از توکن
    const userInfo = await getUserInfo({cookies: cookieStore});

    // بررسی اینکه آیا اطلاعات کاربر درستی بازگشته است
    if (!userInfo || 'status' in userInfo) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p>Failed to retrieve user information. Please try again later.</p>
        </div>
      );
    }

    // حالا می‌توانید به roleAdmin دسترسی داشته باشید
    const {roleAdmin, friends} = userInfo;
    console.log(friends, 'friends');
    // دریافت صفحات از سرور
    const res = await getPages();
    const pageListArray = res.data.data;

    // رندر کردن کامپوننت‌ها
    return (
      <div className="flex w-screen h-screen p-2">
        <div className="w-2/12 h-full">
          <NavBarVertical list={pageListArray} adminMode={roleAdmin} />
        </div>
        <div className="flex flex-col w-10/12 h-full">
          <div>
            <Dashboard />
          </div>
          <div className="flex h-full">
            <div className="grow">{children}</div>
            <div>
              {' '}
              <FriendList list={friends} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in RootLayout:', error);
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
}
