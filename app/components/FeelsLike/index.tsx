'use client';

import { useGlobalContext } from '@/app/context/GlobalContext';
import { Skeleton } from '@/components/ui/skeleton';

import { thermometer } from '../icons';

export const FeelsLike: React.FC = (): JSX.Element => {
  const { forecast } = useGlobalContext();

  if (
    !forecast ||
    !forecast.list ||
    !forecast.list[0] ||
    !forecast.list[0].main
  ) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const { list } = forecast;
  const { main } = list[0];
  const { feels_like, temp_min, temp_max } = main;

  const feelsLikeText = (
    feelsLike: number,
    minTemp: number,
    maxTemp: number,
  ) => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return 'Feels significantly colder than actual temperature.';
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return 'Feels close to the actual temperature.';
    }
    if (feelsLike > avgTemp + 5) {
      return 'Feels significantly warmer than actual temperature.';
    }

    return 'Temperature feeling is typical for this range.';
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

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
