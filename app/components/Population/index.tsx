'use client';

import { useGlobalContext } from '@/app/context/GlobalContext';
import { getPopulationNumber } from '@/app/utils/getPopulationNumber';
import { Skeleton } from '@/components/ui/skeleton';

import { people } from '../icons';

export const Population: React.FC = (): JSX.Element => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast.city) {
    return <Skeleton className='h-[12rem] w-full' />;
  }

  const { city } = forecast;

  return (
    <div
      className='pt-6 pb-5 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey 
      shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {people} Population
        </h2>
        <p className='pt-4 text-2xl'>{getPopulationNumber(city.population)}</p>
      </div>
      <p className='text-sm'>Latest UN population data for {city.name}.</p>
    </div>
  );
};
