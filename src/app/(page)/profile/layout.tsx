import DynamicIcon from '@/components/DynamicIcon';
import VerticalNav from '@/components/VerticalNav';
import { getUserInfo } from '@/helper/authentication';
import {cookies, headers} from 'next/headers';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const referer = (await headers()).get('referer');
  const pathname = referer ? new URL(referer).pathname : 'Unknown';

  const cookie = await cookies();

  const userInfo = await getUserInfo({cookies: cookie});


  return (
    <div className="flex w-screen h-full">
      <div className="w-10/12 h-full ">{children}</div>
      <VerticalNav
        linlList={[
          {label: 'user info', pathname: 'userInfo', icon: 'faUser'},
          {label: 'history', pathname: 'userHistory', icon: 'faClock'},
        ]}
        navTitle="Profile"
      />
    </div>
  );
}
