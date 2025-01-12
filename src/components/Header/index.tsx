import {HeaderTypeProps} from '@/types/type';
import DynamicIcon from '../DynamicIcon';
import ImgBox from '../ImgBox';
import Logo from '../Logo';
import {headers} from 'next/headers';
import LinkList from '../LinkList';
import ProfileBox from '../ProfileBox';

const Header = async ({
  image,
  userName,
  pages,
  roleAdmin = false,
}: HeaderTypeProps) => {
  let firstLetter = null;

  if (userName) firstLetter = userName.trim().charAt(0);

  const referer = (await headers()).get('referer');
  const pathname = referer ? new URL(referer).pathname : 'Unknown';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full h-fit  px-6 bg-neutral-900 pt-1 pb-3">
        <div className="logo">
          <Logo type="row" label="CoffeeNest" />
        </div>
        <LinkList list={pages} active={roleAdmin}/>
        <div className="flex justify-center items-center gap-5 mt-2">
          <DynamicIcon
            iconName="faSearch"
            className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-900 transition-colors duration-300 ease-in-out"
          />
          <DynamicIcon
            iconName="faCartShopping"
            className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-900 transition-colors duration-300 ease-in-out"
          />
          <ProfileBox firstLetter={firstLetter ? firstLetter : null} userName={userName} image={image}/>
        </div>
      </div>
    </div>
  );
};

export default Header;
