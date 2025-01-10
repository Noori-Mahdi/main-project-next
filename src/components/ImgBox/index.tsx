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
  onClick,
}: ImgBoxPropsType) => {
  return (
    <>
      <div
        className={`${classImageBox} `}
        onClick={() => {
          onClick && onClick();
        }}
      >
        <Image
          width={imageWidth}
          height={imageHeight}
          className={`${classImage} pointer-events-none`}
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
