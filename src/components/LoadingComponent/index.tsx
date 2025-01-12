import DynamicIcon from '../DynamicIcon';

const LoadingComponent = () => {
  return (
    <div className="flex flex-col text-gray-400 justify-center items-center text-7xl absolute left-0 top-0 w-full h-full z-50 bg-yellow-950">
      <DynamicIcon iconName="faMugHot" />
      <div
        data-text="CoffeeNest"
        className="text-4xl font-bold mt-8 mb-4 textAnimation"
      >
        CoffeeNest
      </div>
      <div className="text-gray-50 capitalize -tracking-tighter text-base font-semibold">
        loading ...
      </div>
    </div>
  );
};

export default LoadingComponent;
