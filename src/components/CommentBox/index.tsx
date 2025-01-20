import ProfileBox from "../ProfileBox";

const CommentBox = () => {
  return (
    <div className="flex flex-col justify-start rounded gap-3 items-end w-1/3 h-52 bg-neutral-800 p-3">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-end gap-2 text-md font-semibold">
        <ProfileBox firstLetter='m' userName="mahdi" />
        <div>mahdi</div>
        </div>
        <div className="text-sm font-semibold">2000/3/5</div>
      </div>
      <div className="text-sm font-semibold ">
        CoffeNest is my go-to place for coffee! From the amazing variety of
        beans to the freshness of every cup, they never disappoint. The prices
        are reasonable, and the subscription service is perfect for coffee
        lovers like me. I’ve found my favorite brand!
      </div>
    </div>
  );
};

export default CommentBox;
