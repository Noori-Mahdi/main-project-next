'use client';

import {InfoBoxPropsType} from '@/types/type';
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';

const InfoBox = ({content, title}: InfoBoxPropsType) => {
  const [show, setShow] = useState<boolean>(true);
  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-start font-bold tracking-wider ">
        <div className="capitalize ">{title}</div>
        <div
          className="cursor-pointer font-extrabold text-primary"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </div>
      </div>
      {show && (
        <>
          <div className="text-sm tracking-wide text-justify my-3 overflow-hidden text-ellipsis line-clamp-6">
            {content}
          </div>
          <div className="text-sm font-base tracking-wide capitalize text-end">
            sing in to view details
          </div>
        </>
      )}
    </div>
  );
};

export default InfoBox;
