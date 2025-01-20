import {getPages} from '@/services/pages';
import {getUserInfo} from '@/helper/authentication';
import {cookies} from 'next/headers'; // برای دسترسی به کوکی‌ها
import Header from '@/components/Header';
import BasketBox from '@/components/BasketBox';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p>No token provided. Please log in.</p>
        </div>
      );
    }

    const userInfo = await getUserInfo({cookies: cookieStore});

    if (!userInfo || 'status' in userInfo) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p>Failed to retrieve user information. Please try again later.</p>
        </div>
      );
    }

    const {roleAdmin, friends, id, userName, image} = userInfo;

    // دریافت صفحات از سرور
    const res = await getPages();
    const pageListArray = res.data.data;

    // رندر کردن کامپوننت‌ها
    return (
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        <div className="h-fit">
          {' '}
          <Header
            image={image}
            userName={userName}
            pages={pageListArray}
            roleAdmin={roleAdmin}
          />
        </div>

        <div className="flex bg-yellow-700 h-full pb-3 overflow-y-auto overflow-x-hidden grow relative">
          <div className="grow z-0 ">{children}</div>
          <BasketBox />
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
