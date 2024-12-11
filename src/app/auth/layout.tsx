import ListNewsCard from '@/components/ListNewsCard';
import NewsCard from '@/components/NewsCard';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-6/12 h-full">
        <ListNewsCard />
      </div>
      <div className="flex bg-gray-600 justify-center items-center w-6/12 h-full relative">
        {children}
      </div>
    </div>
  );
}
