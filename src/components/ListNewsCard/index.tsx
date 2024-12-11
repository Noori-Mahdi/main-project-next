'use client';

import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {getNews} from '@/services/news';
import NewsCard from '../NewsCard';
import {ListNewsCardPropsType} from '@/types/type';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Clock } from '../Clock/Clock';

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
    <div className="relative h-full pt-2">
      {list.length > 0 && (
        <div className="w-full">
            <div className='relative glassBox ml-2 rounded-md  w-fit z-10'>
                <Clock type='full'/>
            </div>
          <div className="absolute w-full h-full left-0 top-0 z-0">
            <Image
              src={list[index].image}
              alt={list[index].title}
              fill
              style={{objectFit: 'cover'}}
            />
          </div>
        </div> 
      )}

      <div className="flex justify-center items-center absolute bottom-10 left-0 w-full h-2/6">
        <div
          onClick={handlePre}
          className="cursor-pointer glassBox hover:text-cyan-400 h-full flex justify-center items-center px-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        {list.length > 0 &&
          list.map((news, i) => (
            <div
              key={i}
              className={`cursor-pointer w-36 h-52 mx-1 hover:w-40 hover:h-60 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out ${index === i && 'border border-color-primary'}`}
            >
              <NewsCard
                content={news.content}
                image={news.image}
                title={news.title}
                onClick={() => {
                  setIndex(i);
                }}
              />
            </div>
          ))}
        <div
          onClick={handleNext}
          className="cursor-pointer glassBox h-full hover:text-cyan-400 flex justify-center items-center px-2"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
};

export default ListNewsCard;
