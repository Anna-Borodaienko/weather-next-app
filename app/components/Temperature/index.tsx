'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';

import { navigation } from '@/app/components/icons';
import { useGlobalContext } from '@/app/context/GlobalContext';

import { IconWeather } from '../IconWeather';

export const Temperature: React.FC = (): JSX.Element => {
  const [localTime, setLocalTime] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  const { forecast } = useGlobalContext();

  useEffect(() => {
    if (
      !forecast ||
      !forecast.city ||
      !forecast.list ||
      !forecast.list[0] ||
      !forecast.list[0].main
    )
      return;

    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(forecast.timezone / 60);
      const formattedTime = localMoment.format('HH:mm:ss');
      const day = localMoment.format('dddd');

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval);
  }, [forecast]);

  const { city, list } = forecast;

  if (
    !forecast ||
    !forecast.city ||
    !forecast.list ||
    !forecast.list[0] ||
    !forecast.list[0].main
  )
    return <div>Loading...</div>;

  const { main, icon } = list[0].weather[0];
  const { temp, temp_min, temp_max } = list[0].main;

  return (
    <div
      className='pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between 
    dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <p className='flex justify-between items-center'>
        <span className='font-medium'>{currentDay}</span>
        <span className='font-medium'>{localTime}</span>
      </p>
      <p className='py-10 font-bold flex gap-1'>
        <span>{city.name}</span>
        <span>{navigation}</span>
      </p>
      <p className='py-10 text-9xl font-bold self-center'>
        {Math.round(temp)}°
      </p>
      <div>
        <div>
          <IconWeather iconCode={icon} />
          <p className='pt-2 capitalize text-lg font-medium'>{main}</p>
        </div>
        <p className='flex items-center gap-2'>
          <span>Low: {Math.round(temp_min)}°</span>
          <span>High: {Math.round(temp_max)}°</span>
        </p>
      </div>
    </div>
  );
};
