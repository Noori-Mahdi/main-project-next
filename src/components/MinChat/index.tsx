'use client';
import {useState} from 'react';
import DynamicIcon from '../DynamicIcon';
import Button from '../Button';

const MinChat = () => {
  const [showChatBox, SetShowChatBox] = useState(false);
  return (
    <>
      <DynamicIcon
        onClick={() => {
          SetShowChatBox(true);
        }}
        iconName="faMessage"
        className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-900 transition-colors duration-300 ease-in-out"
      />
      {showChatBox && (
        <div className="fixed flex flex-col left-3 bottom-4  w-3/12 h-3/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]  bg-neutral-800 rounded-md backdrop-blur-[5.8px] bg-opacity-95 border border-yellow-900 z-30">
          <div className="flex justify-between items-center px-3 py-1 text-gray-300 border-b mx-1 border-yellow-900">
            <div>
              <span className=" capitalize select-none cursor-auto font-semibold text-lg">
                chat
              </span>
              <DynamicIcon iconName="faMessage" className="ml-2 text-sm" />
            </div>

            <DynamicIcon
              iconName="faXmark"
              className=" cursor-pointer hover:text-red-700"
              onClick={() => {
                SetShowChatBox(false);
              }}
            />
          </div>
          <div className="grow">{/* message Box */}</div>
          <div className="flex mx-1 py-1">
            <input
            placeholder='send your message ...'
              type="text"
              className="grow rounded-tl-sm rounded-bl-sm text-sm font-semibold p-1 outline-none "
            />
            <Button
              color="primary"
              icon="faPaperPlane"
              className="p-1 rounded-tr-sm rounded-br-sm w-10 text-gray-300"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MinChat;
