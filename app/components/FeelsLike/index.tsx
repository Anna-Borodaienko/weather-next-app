'use client';

import { feelsLikeTexts } from '@/app/constants/feelsLike';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Weather } from '@/app/types/Weather';
import { Skeleton } from '@/components/ui/skeleton';

import { thermometer } from '../icons';

export const FeelsLike: React.FC = (): JSX.Element => {
  const { weather }: { weather: Weather } = useGlobalContext();

  if (!weather || !weather.daily || !weather.current) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const { current, daily } = weather;
  const { feels_like } = current;
  const { min, max } = daily[0].temp;

  const feelsLikeText = (
    feelsLike: number,
    minTemp: number,
    maxTemp: number,
  ): string => {
    const avgTemp = (minTemp + maxTemp) / 2;

    const difference = feelsLike - avgTemp;

    if (difference < -5) {
      return feelsLikeTexts.significantlyColder;
    }
    if (difference >= -5 && difference <= 5) {
      return feelsLikeTexts.closeToActual;
    }
    if (difference > 5) {
      return feelsLikeTexts.significantlyWarmer;
    }

    return feelsLikeTexts.typicalForRange;
  };

  const feelsLikeDescription = feelsLikeText(feels_like, min, max);

  return (
    <div
      className='pt-6 pb-5 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey 
      shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {thermometer} Feels Like
        </h2>
        <p className='pt-4 text-2xl'>{Math.round(feels_like)}°</p>
      </div>
      <p className='text-sm'>{feelsLikeDescription}</p>
    </div>
  );
};
