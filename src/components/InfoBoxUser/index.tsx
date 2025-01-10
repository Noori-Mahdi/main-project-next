import {InfoBoxUserPropsType, UserInfo} from '@/types/type';
import ImgBox from '../ImgBox';
import MineProfile from '../MineProfile';
import {useState} from 'react';

const InfoBoxUser = ({alt, image, label, subLabel}: InfoBoxUserPropsType) => {
  const [showMineProfile, setShowMineProfile] = useState(false);
  return (
    <div>
      {showMineProfile && (
        <div className="absolute right-0 top-4 -translate-x-14 z-20">
          <MineProfile
            image={image}
            userEmail={subLabel}
            userName={label}
            onClose={() => setShowMineProfile(false)}
          />
        </div>
      )}

      <ImgBox
        alt={alt}
        image={image}
        imageHeight={128}
        imageWidth={128}
        classImage="rounded-md object-cover w-full h-full"
        classImageBox="w-10 h-10 rounded-md border cursor-pointer p-px border-red-600 "
        classLabel="px-1 text-base font-bold tracking-wide"
        classSubLabel="px-1 text-sm font-normal tracking-wide"
        onClick={() => setShowMineProfile(!showMineProfile)}
      />
    </div>
  );
};

export default InfoBoxUser;
