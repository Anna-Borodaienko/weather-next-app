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

  const { main, timezone, name, weather: currentWeather } = weather;

  const weatherData =
    currentWeather && currentWeather.length > 0 ? currentWeather[0] : null;
  const { icon, description } = weatherData || {};

  const mainData = main ? main : null;
  const { temp, temp_min, temp_max } = mainData || {};

  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      const formattedTime = localMoment.format('HH:mm:ss');
      const day = localMoment.format('dddd');

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  if (!weather || !currentWeather) return <div>Loading...</div>;

  return (
    <div
      className='pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between 
    dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <p className='flex justify-between items-center'>
        <span className='font-medium'>{currentDay}</span>
        <span className='font-medium'>{localTime}</span>
      </p>
      <p className='py-10 font-bold flex gap-1'>
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className='py-10 text-9xl font-bold self-center'>
        {Math.round(temp)}°
      </p>
      <div>
        <div>
          <IconWeather iconCode={icon} />
          <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
        </div>
        <p className='flex items-center gap-2'>
          <span>Low: {Math.round(temp_min)}°</span>
          <span>High: {Math.round(temp_max)}°</span>
        </p>
      </div>
    </div>
  );
};
