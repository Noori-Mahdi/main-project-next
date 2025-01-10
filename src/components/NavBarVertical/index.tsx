'use client';

import {getPages} from '@/services/pages';
import {Pages} from '@/types/type';
import {useContext, useEffect, useState} from 'react';
import DynamicIcon from '../DynamicIcon';
import Link from 'next/link';
import ConfirmationModal from '../ConfirmationModal';
import MainContext, {Context} from '@/providers/MainContext';
interface NavBarVerticalPropsType {
  list: Pages[];
  adminMode: boolean;
}
const NavBarVertical = ({list, adminMode}: NavBarVerticalPropsType) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showLogOutMassage, setShowLogOutMassage] = useState(false);
  const [openPages, setOpenPages] = useState<{[key: number]: boolean}>({});

  const {handleLogout} = useContext(Context);
  console.log(adminMode, 'adminMode');
  const togglePageOpen = (index: number) => {
    setOpenPages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showLogOutMassage}
        message="Are you sure you want to log out?"
        onCancel={() => setShowLogOutMassage(false)}
        onConfirm={handleLogout}
      />

      <ul
        className={`bg-slate-700 h-full ${
          isOpen ? 'w-full' : 'w-fit'
        } px-3 py-1 rounded-md transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex justify-between items-center">
            <DynamicIcon className="mr-1 text-xl" iconName={'faJedi'} />
            {isOpen && (
              <h3 className="uppercase select-none tracking-wide text-lg font-medium">
                TeamForge
              </h3>
            )}
          </div>
          <div onClick={() => setIsOpen(!isOpen)}>
            <DynamicIcon
              className={`cursor-pointer text-sm transform  hover:text-slate-400 ${
                isOpen ? 'rotate-0 ml-3' : 'rotate-180'
              } transition-transform duration-300 ease-in-out`}
              iconName={'faAnglesLeft'}
            />
          </div>
        </div>
        {list &&
          list.map((page, index) => {
            if (!adminMode && !page.public) {
              return null;
            }

            return (
              <li
                className={`${
                  !isOpen && 'text-center'
                } w-full my-3 transition-colors duration-300 rounded-md ease-in-out hover:bg-slate-600`}
                key={index}
              >
                {page.childLink && page.childLink.length > 0 ? (
                  <>
                    <div
                      className={`flex ${
                        isOpen ? 'justify-between' : 'justify-center'
                      } p-2 items-center w-full h-full rounded cursor-pointer`}
                      onClick={() => togglePageOpen(index)}
                    >
                      <div>
                        <DynamicIcon
                          className={`${isOpen && 'mr-2'}`}
                          iconName={page.icon}
                        />
                        {isOpen && (
                          <span className="capitalize text-sm font-medium select-none">
                            {page.label}
                          </span>
                        )}
                      </div>
                      {isOpen && (
                        <DynamicIcon
                          className={`mr-2 text-sm transition-transform duration-300 hover:text-slate-400 ${
                            openPages[index] ? 'rotate-180' : 'rotate-0'
                          }`}
                          iconName={'faAngleDown'}
                        />
                      )}
                    </div>
                    <div
                      className={`${
                        openPages[index]
                          ? 'max-h-screen opacity-100'
                          : 'max-h-0 opacity-0'
                      } overflow-hidden transform origin-top transition-all duration-300 ease-in-out`}
                    >
                      {page.childLink.map((child, childIndex) => (
                        <Link
                          className={`${
                            isOpen ? 'ml-5 pl-2' : 'ml-0'
                          } block hover:text-slate-400 transform origin-top transition-all duration-300 ease-in-out py-1`}
                          key={childIndex}
                          href={`/page${child.URL}`}
                        >
                          {isOpen ? (
                            <span className="select-none capitalize text-sm font-medium cursor-pointer">
                              {child.label}
                            </span>
                          ) : (
                            <DynamicIcon
                              className="text-sm cursor-pointer"
                              iconName={child.icon}
                            />
                          )}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    className="block p-2 w-full h-full rounded transition-colors duration-300 ease-in-out hover:text-slate-400 hover:bg-slate-600"
                    href={`/page${page.URL}`}
                  >
                    <DynamicIcon
                      className={`${isOpen && 'mr-2'}`}
                      iconName={page.icon}
                    />
                    {isOpen && (
                      <span className="select-none capitalize text-sm font-medium">
                        {page.label}
                      </span>
                    )}
                  </Link>
                )}
              </li>
            );
          })}

        <li
          onClick={() => setShowLogOutMassage(true)}
          className={`${!isOpen && 'text-center'} block p-2 cursor-pointer  rounded transition-colors duration-300 ease-in-out hover:text-red-600 hover:bg-slate-600`}
        >
          <DynamicIcon
            className={`${isOpen && 'mr-2'}`}
            iconName={'faPowerOff'}
          />
          {isOpen && (
            <span className="select-none capitalize text-sm font-medium">
              Log Out
            </span>
          )}
        </li>
      </ul>
    </>
  );
};

export default NavBarVertical;
