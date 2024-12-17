'use client';

import {getNews} from '@/services/news';
import {ListNewsCardPropsType} from '@/types/type';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Clock} from '../Clock/Clock';
import InfoBox from '../InfoBox';
import '@/sass/global.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

const ListNewsCard = () => {
  const [list, setList] = useState<ListNewsCardPropsType>([]);
  const [index, setIndex] = useState<number>(2);

  const handleNext = () => {
    const listLentgh = list.length;
    if (list.length > index + 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const handlePre = () => {
    const listLentgh = list.length;
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(listLentgh - 1);
    }
  };

  const getNewsAsync = async () => {
    try {
      const res = await getNews();
      setList(res.data.data);
    } catch {
      console.log('error');
    }
  };
  useEffect(() => {
    getNewsAsync();
  }, []);

  return (
    <>
      {list.length > 0 && (
        <div className="relative w-full h-full flex flex-col justify-between px-4">
          <div className="flex w-full justify-between items-start mt-4">
            <div className="relative glassBox rounded-md  w-6/12 max-h-64 z-20 p-2">
              <InfoBox
                title={list[index].title}
                content={list[index].content}
              />
            </div>
            <div className="relative glassBox rounded-md  w-fit z-20">
              <Clock type="full" />
            </div>
          </div>
          <div className="flex justify-between items-center absolute z-10 w-full h-full left-0">
            <div
              onClick={handlePre}
              className="cursor-pointer glassBox w-10 hover:text-cyan-400 ml-4 h-10 rounded-full flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </div>
            <div
              onClick={handleNext}
              className="cursor-pointer glassBox w-10 hover:text-cyan-400 mr-4 h-10 rounded-full flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </div>
          </div>

          <div className="absolute select-none w-full h-full left-0 top-0 z-0">
            <Image
              src={list[index].image}
              alt={list[index].title}
              fill
              style={{objectFit: 'cover'}}
            />
          </div>
          <div className="flex justify-center items-center  relative w-full z-10 mb-4">
            {list.length > 0 &&
              list.map((_, i) => (
                <div
                  onClick={() => setIndex(i)}
                  key={i}
                  className={`cursor-pointer w-3 h-3 mx-2 rounded-full ${index == i ? ' bg-primary w-8' : 'bg-muted'}`}
                ></div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListNewsCard;
