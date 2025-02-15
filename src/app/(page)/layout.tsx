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
    const cookie = await cookies();
    const token = cookie.get('token')?.value;


    const userInfo = await getUserInfo({cookies: cookie});
    let roleAdmin
    let userName
    let image

    if (!userInfo || 'status' in userInfo) {
      roleAdmin= null
      userName = null
      image = null
    }else{
      roleAdmin = userInfo.roleAdmin;
      userName = userInfo.userName;
      image = userInfo.image;

    }


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

        <div className="flex bg-yellow-700 h-full overflow-y-auto overflow-x-hidden grow relative">
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
