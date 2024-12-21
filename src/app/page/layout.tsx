import NavBarVertical from '@/components/NavBarVertical';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<div className={``}>
    <div><NavBarVertical/></div>
    <div>{children}</div>
    </div>);
}
