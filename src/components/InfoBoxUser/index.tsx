import { InfoBoxUserPropsType, UserInfo } from '@/types/type';
import ImgBox from '../ImgBox';

const InfoBoxUser = ({alt,image,label,subLabel }:InfoBoxUserPropsType) => {
  return (
    <>
      <ImgBox
        alt={alt}
        label={label}
        subLabel={subLabel}
        image={image}
        imageHeight={128}
        imageWidth={128}
        classImage="rounded-full object-cover w-full h-full"
        classImageBox="w-10 h-10 rounded-full border-2 p-px border-red-600 mx-3"
        classLabel="px-1 text-base font-bold tracking-wide"
        classSubLabel="px-1 text-sm font-normal tracking-wide"
      />
    </>
  );
};

export default InfoBoxUser;
