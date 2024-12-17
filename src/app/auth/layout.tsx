import ListNewsCard from '@/components/ListNewsCard';
import NewsCard from '@/components/NewsCard';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-6/12 h-full md:block hidden">
        <ListNewsCard />
      </div>
      <div className="flex bg-gray-600 justify-center items-center w-full md:w-6/12 h-full relative">
        <div className="md:w-7/12 sm:w-8/12 w-10/12 my-4">{children}</div>
      </div>
    </div>
  );
}
