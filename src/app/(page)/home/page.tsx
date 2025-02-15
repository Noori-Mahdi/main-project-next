import CommentBox from '@/components/CommentBox';
import DynamicIcon from '@/components/DynamicIcon';
import Footer from '@/components/Footer';
import GridCategory from '@/components/GridCategory';
import ItemCard from '@/components/ItemCard';
import Logo from '@/components/Logo';
import Title from '@/components/Title';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const Home = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className=" w-full h-full">
      <div
        className="w-full h-2/4  bg-cover bg-no-repeat p-6  flex flex-col items-top justify-end "
        style={{
          backgroundImage: 'url(/wallpaper/homewp.jpg)',
          backgroundPosition: '10% 85%',
        }}
      >
        <div className="mb-3 text-5xl font-extrabold text-yellow-600">
          Welcome!
        </div>
        <div className="w-5/12 text-gray-300 text-4xl capitalize tracking-wide font-semibold">
          The coffee you crave,
          <br /> with the quality you deserve.
        </div>
      </div>
      <div className=" py-1 w-full">
        <div className="w-full flex items-center p-4 text-lg justify-center h-full text-center bg-neutral-800 text-gray-300">
          <div className="w-7/12">
            <div className="text-2xl font-bold text-yellow-600">CoffeNest</div>
            <div className="font-semibold my-2">
              " Where Real Coffee Flavor Finds You! "
            </div>
            <div className=" text-lg text-white">
              At CoffeNest, we’re dedicated to bringing you the best coffee
              experience. From the freshest, highest-quality beans to unique,
              signature flavors, every cup of coffee you get from us tells a
              story of passion for coffee and a commitment to excellence.
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-10 my-6 mx-6">
          <div className="flex">
            <div className="">
              <div className="flex justify-between">
                <div className="text-base font-medium">24/7 Support</div>
                <DynamicIcon className="text-2xl" iconName="faHeadset" />
              </div>
              <div className="text-sm ml-1">
                Our support team is always here to assist you with any need,
                anytime.
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="">
              <div className="flex justify-between">
                <div className="text-base font-medium">Fast Delivery</div>
                <DynamicIcon className="text-xl" iconName="faTruckFast" />
              </div>
              <div className="text-sm ml-1">
                Experience fast and reliable delivery, right at your doorstep.
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between">
              <div className="text-base font-medium">Affordable Prices</div>
              <DynamicIcon className="text-xl" iconName="faCoins" />
            </div>
            <div className="text-sm ml-1">
              Enjoy high quality at prices that fit your budget.
            </div>
          </div>
        </div>
        <div className="w-full h-96">
          <div className="mx-6 my-3">
            <Title title="Category" />
          </div>
          <GridCategory props={categories} />
          <div className="mx-6 my-3">
            <Title title="Popular Products" />
          </div>
          <div className="px-6 flex justify-between items-center">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
          <div className="mx-6 my-3">
            <Title title="Comments" />
            <div className="flex gap-1">
              <CommentBox />
              <CommentBox />
              <CommentBox />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
