'use client';
import ImgBox from '../ImgBox';
import '@/sass/global.scss';

interface LogoPropsType {
  type?: 'row' | 'col';
  label?: string;
}

const Logo = ({type = 'row', label}: LogoPropsType) => {
  return (
    <div
      className={`flex ${type == 'col' && 'flex-col'} justify-center items-start`}
    >
      <ImgBox
        alt="logo"
        image="/logo/logo.png"
        imageWidth={50}
        imageHeight={50}
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
