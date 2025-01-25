import Logo from "../Logo";

const Footer = () => {
  return (
    <div className="bg-neutral-900 flex items-end justify-between p-3 w-full h-56">
      <div className="flex justify-start">
        <div className="border-r border-yellow-800 py-14">
          <Logo label="CoffeNest" />
        </div>
        <div className="ml-4">
          <div className="mb-3">
            <div className="text-sm mb-1 font-medium text-yellow-800">
              Phone Number :{' '}
            </div>
            <div className="ml-3 text-gray-300 text-xs">+1 555 123 4567</div>
          </div>
          <div className="mb-3">
            <div className="text-sm mb-1 font-medium text-yellow-800">
              Email Address :
            </div>
            <div className="ml-3 tracking-wide text-gray-300 text-xs">
              CoffeNest@gmail.com
            </div>
          </div>
          <div>
            <div className="text-sm mb-1 font-medium text-yellow-800">
              Physical Address :
            </div>
            <div className="ml-3 tracking-wide text-gray-300 text-xs">
              123 Imaginary Blvd, 4th Floor, Dream City, Fakeland, 12345
            </div>
          </div>
        </div>
      </div>
      <div className="mr-5 text-sm text-gray-300 flex justify-end items-end font-medium">
        <div>
          {' '}
          © 2025 <span className="text-yellow-800">Mahdi Noori</span>. All
          rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
