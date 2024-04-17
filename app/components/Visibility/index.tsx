'use client';

import { visibilityTexts } from '@/app/constants/visibility';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Weather } from '@/app/types/Weather';
import { Skeleton } from '@/components/ui/skeleton';

import { eye } from '../icons';

export const Visibility: React.FC = (): JSX.Element => {
  const { weather }: { weather: Weather } = useGlobalContext();

  if (!weather || !weather.current) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const { current } = weather;

  const { visibility } = current;

  const getVisibilityDescription = (visibility: number): string => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 5) {
      return visibilityTexts.good;
    }
    if (visibilityInKm > 2) {
      return visibilityTexts.moderate;
    }
    if (visibilityInKm <= 2) {
      return visibilityTexts.poor;
    }
    return visibilityTexts.unavailable;
  };

  return (
    <div
      className='pt-6 pb-5 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey 
      shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {eye} Visibility
        </h2>
        <p className='pt-4 text-2xl'>{Math.round(visibility / 1000)} km</p>
      </div>
      <p className='text-sm'>{getVisibilityDescription(visibility)}</p>
    </div>
  );
};
