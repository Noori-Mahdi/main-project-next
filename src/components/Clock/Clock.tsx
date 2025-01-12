'use client';

import {useState, useEffect} from 'react';
import {ClockPropType} from '@/types/type';

export const Clock = ({type}: ClockPropType) => {
  const [time, setTime] = useState({
    sec: '00',
    min: '00',
    hour: '00',
    day: 0,
    month: 0,
    year: 0,
    weekDay: 0,
  });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime({
        sec: updateTime(date.getSeconds()),
        min: updateTime(date.getMinutes()),
        hour: updateTime(date.getHours()),
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        weekDay: date.getDay(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function updateTime(e: number): string {
    return e < 10 ? '0' + e : e.toString();
  }

  return (
    <>
      {type === 'full' ? (
        <div className="flex flex-col cursor-pointer justify-center items-center px-2 py-1 Orbitron z-10 select-none">
          <div className="time_wrapper  mb-2">
            <span className="text-cyan-400 text-2xl mr-2 font-medium">
              {time.hour}
            </span>
            <span className="text-cyan-400 text-2xl mr-2 font-medium">:</span>
            <span className="text-cyan-400 text-2xl mr-2 font-medium">
              {time.min}
            </span>
            <span className="text-cyan-400 text-xs font-xs ">{time.sec}</span>
            {weekDays.map((day, index) => (
              <span
                key={index}
                className={`text-cyan-400  ${
                  time.weekDay === index ? 'inline ml-2 font-medium ' : 'hidden'
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          <div className="date_wrapper mb-2 tracking-wider font-bold text-base">
            <span className="text-cyan-400 ">
              {monthNames[time.month]} {time.day}, {time.year}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-cyan-400 Orbitron font-bold">
          <span className="text-base">{time.hour}</span>
          <span className="text-base">:</span>
          <span className="text-base">{time.min}</span>
          {weekDays.map((day, index) => (
            <span
              key={index}
              className={`text-cyan-400 ml-2 text-xs  ${
                time.weekDay === index ? '' : 'hidden'
              }`}
            >
              {day}``
            </span>
          ))}
        </div>
      )}
    </>
  );
};
