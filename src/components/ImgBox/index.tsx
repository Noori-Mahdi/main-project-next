import {ImgBoxPropsType} from '@/types/type';
import Image from 'next/image';

const ImgBox = ({
  alt,
  image,
  classImage,
  classLabel,
  classSubLabel,
  label,
  subLabel,
  imageHeight,
  imageWidth,
  classImageBox,
}: ImgBoxPropsType) => {
  return (
    <>
      <div className={classImageBox}>
        <Image
          width={imageWidth}
          height={imageHeight}
          className={classImage}
          alt={alt}
          src={image}
        />
      </div>
      <div>
        {label && <div className={classLabel}>{label}</div>}
        {subLabel && <div className={classSubLabel}>{subLabel}</div>}
      </div>
    </>
  );
};

export default ImgBox;
