'use client';

import { humidityTexts } from '@/app/constants/humidity';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Weather } from '@/app/types/Weather';
import { Skeleton } from '@/components/ui/skeleton';

import { droplets } from '../icons';

export const Humidity: React.FC = (): JSX.Element => {
  const { weather }: { weather: Weather } = useGlobalContext();

  if (!weather || !weather.current) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const { current } = weather;

  const getHumidityText = (humidity: number): string => {
    if (humidity < 30) {
      return humidityTexts.dry;
    }
    if (humidity >= 30 && humidity < 50) {
      return humidityTexts.comfortable;
    }
    if (humidity >= 50 && humidity < 70) {
      return humidityTexts.moderate;
    }
    if (humidity >= 70) {
      return humidityTexts.high;
    }
    return humidityTexts.unavailable;
  };

  return (
    <div
      className='pt-6 pb-5 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey 
      shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {droplets} Humidity
        </h2>
        <p className='pt-4 text-2xl'>{current.humidity}%</p>
      </div>
      <p className='text-sm'>{getHumidityText(current.humidity)}</p>
    </div>
  );
};
