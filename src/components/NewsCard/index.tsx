import {NewsCardPropsType} from '@/types/type';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import '@/sass/global.scss';
import Image from 'next/image';

const NewsCard = ({title, content, rate, image,onClick}: NewsCardPropsType) => {
  return (
    <div onClick={onClick} className="flex items-end justify-start relative w-full h-full">
      <div className="absolute w-full h-full left-0 top-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex flex-col justify-between relative w-full h-2/6 hover:h-full transition-all duration-300 glassBox p-1">
        <div className="text-base font-medium tracking-wide truncate">
          {title}
        </div>
        <div className="text-xs truncate">{content}</div>
        <div className="flex justify-between items-center">
          {rate && (
            <>
              <div className="flex justify-center items-center">
                {Array.from({length: 5}, (_, i) => (
                  <FontAwesomeIcon
                    className={`h-3 w-3 ${rate >= i + 1 ? 'text-warning' : 'text-muted'}`}
                    icon={faStar}
                  />
                ))}
              </div>

              <div className="text-xs font-medium ml-2 ">
                <span>{rate}</span>
                <span>/5</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
