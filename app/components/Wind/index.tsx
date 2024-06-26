'use client';

import Image from 'next/image';

import { wind } from '@/app/components/icons';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Weather } from '@/app/types/Weather';
import { Skeleton } from '@/components/ui/skeleton';

export const Wind: React.FC = (): JSX.Element => {
  const { weather }: { weather: Weather } = useGlobalContext();

  if (!weather || !weather.current) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const { current } = weather;

  const { wind_speed: windSpeed, wind_deg: windDirection } = current;

  return (
    <div
      className='pt-6 pb-5 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-grey 
      shadow-sm dark:shadow-none'>
      <h2 className='flex items-center gap-2 font-medium'>{wind}Wind</h2>
      <div className='compass relative flex items-center justify-center'>
        <div className='image relative'>
          <Image
            src='/compass_body.svg'
            alt='compass'
            width={110}
            height={110}
          />
          <Image
            src='/compass_arrow.svg'
            alt='compass'
            className='absolute top-0 left-[45%] transition-all duration-500 ease-in-out dark:invert'
            style={{
              transform: `rotate(${windDirection}deg) translateX(-50%)`,
              height: '100%',
            }}
            width={11}
            height={11}
          />
        </div>
        <p
          className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs
        dark:text-white font-medium'>
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
};
