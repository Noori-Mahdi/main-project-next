import {HeaderTypeProps} from '@/types/type';
import DynamicIcon from '../DynamicIcon';
import ImgBox from '../ImgBox';
import Logo from '../Logo';
import {headers} from 'next/headers';
import LinkList from '../LinkList';
import ProfileBox from '../ProfileBox';
import SearchBox from '../SearchBox';
import MinChat from '../MinChat';
import BasketBoxButton from '../BasketButton';

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
        <div className="flex">
          <Logo type="row" label="CoffeeNest" />
          <LinkList list={pages} active={roleAdmin} />
        </div>
        <div className="flex justify-center items-center gap-5 mt-2">
          <div className="h-6">
            <SearchBox />
          </div>
          <MinChat />
          <BasketBoxButton />
          <ProfileBox
            firstLetter={firstLetter ? firstLetter : null}
            userName={userName}
            image={image}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
