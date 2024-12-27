import Dashboard from '@/components/Dashboard';
import NavBarVertical from '@/components/NavBarVertical';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={`flex w-screen h-screen p-2`}>
        <div className="w-2/12 h-full">
          <NavBarVertical />
        </div>
        <div className="flex flex-col w-10/12 h-full test">
          {' '}
          <div className="">
            <Dashboard />
          </div>
          <div className="grow">{children}</div>
        </div>
      </div>
    </>
  );
}
