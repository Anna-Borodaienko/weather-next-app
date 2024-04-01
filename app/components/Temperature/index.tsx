'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';

import { navigation } from '@/app/components/icons';
import { useGlobalContext } from '@/app/context/GlobalContext';

import { IconWeather } from '../IconWeather';

export const Temperature: React.FC = (): JSX.Element => {
  const [localTime, setLocalTime] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  const { weather } = useGlobalContext();

  useEffect(() => {
    if (
      !weather ||
      !weather.daily ||
      !weather.daily[0] ||
      !weather.daily[0].weather?.[0] ||
      !weather.daily[0].temp
    )
      return;

    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(weather.timezone_offset / 60);
      const formattedTime = localMoment.format('HH:mm:ss');
      const day = localMoment.format('dddd');

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval);
  }, [weather]);

  const { daily, timezone } = weather;

  if (
    !weather ||
    !daily ||
    !daily[0].weather ||
    !daily[0].weather[0] ||
    !daily[0].temp
  )
    return <div>Loading...</div>;

  const { main, icon } = daily[0].weather[0];
  const { day, min, max } = daily[0].temp;

  return (
    <div
      className='pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between 
    dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <p className='flex justify-between items-center'>
        <span className='font-medium'>{currentDay}</span>
        <span className='font-medium'>{localTime}</span>
      </p>
      <p className='py-10 font-bold flex gap-1'>
        <span>{timezone}</span>
        <span>{navigation}</span>
      </p>
      <p className='py-10 text-9xl font-bold self-center'>{Math.round(day)}°</p>
      <div>
        <div>
          <IconWeather iconCode={icon} />
          <p className='pt-2 capitalize text-lg font-medium'>{main}</p>
        </div>
        <p className='flex items-center gap-2'>
          <span>Low: {Math.round(min)}°</span>
          <span>High: {Math.round(max)}°</span>
        </p>
      </div>
    </div>
  );
};
