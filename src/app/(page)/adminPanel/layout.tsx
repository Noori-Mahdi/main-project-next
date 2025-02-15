import DynamicIcon from '@/components/DynamicIcon';
import VerticalNav from '@/components/VerticalNav';
import {headers} from 'next/headers';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const referer = (await headers()).get('referer');
  const pathname = referer ? new URL(referer).pathname : 'Unknown';

  return (
    <div className="flex w-screen h-full">
      <div className="w-10/12 h-full ">{children}</div>
      <VerticalNav
        linlList={[
          {label: 'users', pathname: 'usersManagement', icon: 'faUser'},
          {label: 'items', pathname: 'itemsManagement', icon: 'faBox'},
          {label: 'messages', pathname: 'messageManagement', icon: 'faEnvelope'}
        ]}
        navTitle="management"
      />
    </div>
  );
}
