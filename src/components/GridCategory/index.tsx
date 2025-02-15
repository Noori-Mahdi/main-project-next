'use client';
import Image from 'next/image';
import ImgBox from '../ImgBox';

interface GridCategoryPropsType {
  id: string;
  name: string;
  image: string | null;
}

const GridCategory = ({props}: {props: GridCategoryPropsType[]}) => {
  return (
    <>
      <div className="grid gap-1 grid-cols-5 grid-rows-2 px-6 h-full w-full">
        {props.map((ItemCard, index) => (
          <div
            key={index}
            className={`${index == 0 ? 'row-span-2 col-span-2' : index == 1 || index == 4 ? 'col-span-1' : 'col-span-2'} hover:brightness-125 hover:border-2 cursor-pointer hover:border-yellow-950 rounded  bg-neutral-800`}
          >
            <ImgBox
              alt={ItemCard.name}
              imageWidth={230}
              imageHeight={230}
              image={ItemCard.image}
              classImageBox="flex justify-center items-center h-full w-full p-3"
              classImage=" w-full h-full"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GridCategory;
{
  /* <GridCategory props={categories} /> */
}
