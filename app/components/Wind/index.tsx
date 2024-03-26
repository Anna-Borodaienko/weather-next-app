'use client';

import Image from 'next/image';

import { wind } from '@/app/components/icons';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Skeleton } from '@/components/ui/skeleton';

export const Wind: React.FC = (): JSX.Element => {
  const { forecast } = useGlobalContext();

  if (
    !forecast ||
    !forecast?.wind ||
    !forecast?.wind?.speed ||
    !forecast?.wind?.deg
  ) {
    return <Skeleton className='h-[12rem] w-full' />;
  }

  const windSpeed = forecast.wind.speed;
  const windDirection = forecast.wind.deg;

  return (
    <div
      className='pt-6 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey 
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
        </div>
      </div>
    </div>
  );
};
