'use client';
import {TablePropsType, UserInfo} from '@/types/type';
import {useEffect, useState} from 'react';
import DynamicIcon from '../DynamicIcon';
import Button from '../Button';

const Table = ({list, onDelete, onShow}: TablePropsType) => {
  const [firstRowKeys, setFirstRowKeys] = useState<[] | string[]>([]);

  useEffect(() => {
    if (list && list.length > 0) setFirstRowKeys(Object.keys(list[0]));
  }, [list]);

  if (!list || list.length === 0) {
    return <p>هیچ داده‌ای وجود ندارد.</p>;
  }
  return (
    <table className="table-auto w-full bg-neutral-800 text-gray-200 rounded-lg">
      <thead>
        <tr className="border-b border-yellow-800 rounded-tr-lg rounded-tl-lg h-10">
          {firstRowKeys.length > 0 &&
            firstRowKeys.map((title, index) => {
              if (title !== 'id') {
                return (
                  <th key={index} className=" text-left pl-2">
                    {title}
                  </th>
                );
              }
              return null;
            })}
        </tr>
      </thead>
      <tbody>
        {list.length > 0 &&
          list.map((item, index) => (
            <tr
              key={index}
              className={` hover:bg-neutral-800  transition-colors duration-300 h-10 ease-in-out ${index + 1 != list.length && 'border-b rounded-bl-lg rounded-br-lg '} `}
            >
              {firstRowKeys.map((key) => {
                if (key !== 'id') {
                  const value = (item as any)[key];
                  if (typeof value === 'boolean') {
                    return (
                      <td key={key} className=" pl-2">
                        {value ? (
                          <DynamicIcon
                            className="text-green-700"
                            iconName="faCheck"
                          />
                        ) : (
                          <DynamicIcon
                            className="text-red-700"
                            iconName="faXmark"
                          />
                        )}
                      </td>
                    );
                  }

                  return (
                    <td key={key} className="pl-2 ">
                      {value}
                    </td>
                  );
                }
                return null;
              })}
              <td className="flex gap-2 h-10 justify-center items-center ">
                <Button
                  className="p-1 text-sm w-5 h-5 rounded-full flex justify-center items-center"
                  iconClass="text-xs text-center"
                  icon="faEye"
                  color="info"
                  onClick={() => {
                    onShow(item.id);
                  }}
                />
                <Button
                  className="p-1 text-sm w-5 h-5 rounded-full flex justify-center items-center"
                  iconClass="text-xs text-center"
                  icon="faTrash"
                  color="danger"
                  onClick={() => {
                    onDelete(item.id);
                  }}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
