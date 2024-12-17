import NavBarVertical from '@/components/NavBarVertical';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<div className={``}>
    <div><NavBarVertical list={[]} childLink={[]}/></div>
    <div>{children}</div>
    </div>);
}
