
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex justify-center items-center w-screen h-screen "
      style={{
        backgroundImage: `url('/wallpaper/wallpaper.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div></div>
      <div className="my-4 lg:w-4/12 md:w-6/12 sm:w-8/12 w-full h-full sm:h-fit shadow-[0_4px_30px_rgba(0,0,0,0.1)]  bg-neutral-800 rounded-md backdrop-blur-[5.8px] bg-opacity-75 border border-yellow-900">
        {children}
      </div>
    </div>
  );
}
