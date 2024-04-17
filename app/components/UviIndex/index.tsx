'use client';

import { uvIndexText } from '@/app/constants/uv';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Weather } from '@/app/types/Weather';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

import { sun } from '../icons';

export const UviIndex: React.FC = (): JSX.Element => {
  const { weather }: { weather: Weather } = useGlobalContext();

  if (!weather || !weather.current) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const { current } = weather;

  const { uvi } = current;

  const uviIndex = Math.min(Math.ceil(uvi), 10);

  const uviIndexDescription = uvIndexText.find(
    (value) => value.index === uviIndex,
  );

  return (
    <div
      className='pt-6 pb-5 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-grey 
      shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>{sun} UV index</h2>
        <div className='pt-4 flex flex-col gap-1'>
          <p className='text-2xl'>
            {uviIndex}{' '}
            <span className='text-sm'>{uviIndexDescription?.description}</span>
          </p>
          <Progress
            value={uviIndex * 10}
            max={100}
            className='progress'
          />
        </div>
      </div>
      <p className='text-sm pt-4'>{uviIndexDescription?.protection}</p>
    </div>
  );
};
