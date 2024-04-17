'use client';

import { pressureTexts } from '@/app/constants/pressureTexts';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Weather } from '@/app/types/Weather';
import { Skeleton } from '@/components/ui/skeleton';

import { gauge } from '../icons';

export const Pressure: React.FC = (): JSX.Element => {
  const { weather }: { weather: Weather } = useGlobalContext();

  if (!weather || !weather.current) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const { current } = weather;
  const { pressure } = current;

  const getPressureDescription = (pressure: number): string => {
    if (pressure < 1000) {
      return pressureTexts.veryLow;
    }
    if (pressure >= 1000 && pressure < 1015) {
      return pressureTexts.lowExpectChanges;
    }
    if (pressure >= 1015 && pressure < 1025) {
      return pressureTexts.normalExpectChanges;
    }
    if (pressure >= 1025 && pressure < 1040) {
      return pressureTexts.highExpectChanges;
    }
    if (pressure >= 1040) {
      return pressureTexts.veryHighExpectChanges;
    }
    return pressureTexts.unavailable;
  };

  return (
    <div
      className='pt-6 pb-5 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey 
      shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {gauge} Pressure
        </h2>
        <p className='pt-4 text-2xl'>{pressure} hPa</p>
      </div>
      <p className='text-sm'>{getPressureDescription(pressure)}</p>
    </div>
  );
};
