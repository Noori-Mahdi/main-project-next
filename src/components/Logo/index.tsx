'use client';
import ImgBox from '../ImgBox';
import '@/sass/global.scss';

interface LogoPropsType {
  type?: 'row' | 'col';
  label?: string;
  width?: number;
  height?: number;
}

const Logo = ({type = 'row', label, height, width}: LogoPropsType) => {
  return (
    <div
      className={`flex ${type == 'col' && 'flex-col'} select-none justify-center items-start`}
    >
      <ImgBox
        alt="logo"
        image="/logo/logo.png"
        imageWidth={width ? width : 50}
        imageHeight={height ? height : 50}
      />
      {label && (
        <div
          data-text={label}
          className="text-xl font-bold textAnimation top-1 -left-3"
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default Logo;
