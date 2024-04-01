'use client';

import { thermo } from '@/app/components/icons';
import { pollutionIndexText } from '@/app/constants/pollution';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

export const AirPollution: React.FC = (): JSX.Element => {
  const { pollution } = useGlobalContext();

  if (
    !pollution ||
    !pollution.list ||
    !pollution.list[0] ||
    !pollution.list[0].main
  )
    return (
      <Skeleton className='h-[12rem] w-full col-span-2 md:col-span-full' />
    );

  const pollutionIndex = pollution.list[0].main.aqi * 10;

  const pollutionIndexDescription = pollutionIndexText.find(
    (value) => value.rating === pollutionIndex,
  );

  return (
    <div
      className='air-pollution pt-6 px-4 h-[12rem] border rounded-lg 
      flex flex-col gap-8 dark:bg-dark-grey 
      shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
      <h2 className='flex items-center gap-2 font-medium'>
        {thermo}Air Pollution
      </h2>
      <Progress
        value={pollutionIndex}
        max={100}
        className='progress'
      />
      <p className='text-sm'>
        Air quality is {pollutionIndexDescription?.description}{' '}
      </p>
    </div>
  );
};
