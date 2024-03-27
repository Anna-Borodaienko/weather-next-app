'use client';

import { thermo } from '@/app/components/icons';
import { airQualityIndexText } from '@/app/constants/airQuality';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

export const AirPollution: React.FC = (): JSX.Element => {
  const { airQuality } = useGlobalContext();

  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  )
    return (
      <Skeleton className='h-[12rem] w-full col-span-2 md:col-span-full' />
    );

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const aitQualityIndexDescription = airQualityIndexText.find(
    (value) => value.rating === airQualityIndex,
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
        value={airQualityIndex}
        max={100}
        className='progress'
      />
      <p>Air quality is {aitQualityIndexDescription?.description} </p>
    </div>
  );
};
