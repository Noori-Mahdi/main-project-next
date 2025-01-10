import DynamicIcon from '../DynamicIcon';
import ImgBox from '../ImgBox';

interface MineProfilePropsType {
  image: string;
  userName?: string;
  userEmail?: string;
  onClose: () => void;
}

const MineProfile = ({image, userName, userEmail,onClose}: MineProfilePropsType) => {
  return (
    <div className="w-44 bg-slate-700 rounded-sm py-2 px-1">
      <DynamicIcon
        className="absolute right-1 cursor-pointer top-2"
        iconName="faXmark"
        onClick={onClose}
      />
      <div className="flex items-start ">
        {' '}
        <div className="w-4/12">
          <ImgBox
            alt={userName ? userName : 'userImage'}
            imageHeight={52}
            imageWidth={52}
            image={image}
            classImage="rounded-sm"
          />
        </div>
        <div className="ml-2 w-8/12">
          <div className="text-base font-bold text-ellipsis overflow-hidden">
            {userName}
          </div>
          <div className="text-xs font-bold text-ellipsis overflow-hidden">
            {userEmail}
          </div>
        </div>
      </div>

      <ul className="flex justify-between mt-1">
        <li className="flex items-end cursor-pointer">
          <div>
            <DynamicIcon className="w-3 h-3" iconName={'faFlag'} />
          </div>
          <div className="text-sm font-medium select-none">Report</div>
        </li>
        <li className="flex items-end cursor-pointer">
          <div>
            <DynamicIcon className="w-3 h-3" iconName={'faTrash'} />
          </div>
          <div className="text-sm font-medium select-none">Remove</div>
        </li>
      </ul>
    </div>
  );
};

export default MineProfile;
