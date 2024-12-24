import { DynamicIconProps } from '@/types/type';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';




const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  className,
  onClick,
}) => {
  const Icon = solidIcons[iconName];

  if (!Icon) {
    return null;
  }

  return (
    <FontAwesomeIcon
      className={className}
      icon={Icon as any}
      onClick={onClick}
    />
  );
};

export default DynamicIcon;
