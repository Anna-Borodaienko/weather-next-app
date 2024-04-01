'use client';

import { useGlobalContext } from '@/app/context/GlobalContext';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

import { sun } from '../icons';

export const UviIndex: React.FC = (): JSX.Element => {
  const { weather } = useGlobalContext();

  if (!weather || !weather.current) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const { current } = weather;

  const { uvi } = current;

  const uvIndexCategory = (uvIndex: number) => {
    let category;
    switch (true) {
      case uvIndex <= 2:
        category = {
          text: 'Low',
          protection: 'No protection required',
        };
        break;
      case uvIndex <= 5:
        category = {
          text: 'Moderate',
          protection: 'Stay in shade near midday.',
        };
        break;
      case uvIndex <= 7:
        category = {
          text: 'High',
          protection: 'Wear a hat and sunglasses.',
        };
        break;
      case uvIndex <= 10:
        category = {
          text: 'Very High',
          protection: 'Apply sunscreen SPF 30+ every 2 hours.',
        };
        break;
      case uvIndex >= 12:
      default:
        category = {
          text: 'Extreme',
          protection: 'Avoid being outside.',
        };
    }
    return category;
  };

  return (
    <div
      className='pt-6 pb-5 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-grey 
      shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>{sun} UV index</h2>
        <div className='pt-4 flex flex-col gap-1'>
          <p className='text-2xl'>
            {Math.round(uvi)}{' '}
            <span className='text-sm'>
              ({uvIndexCategory(Math.round(uvi)).text})
            </span>
          </p>
          <Progress
            value={(Math.round(uvi) / 14) * 100}
            max={10}
            className='progress'
          />
        </div>
      </div>
      <p className='text-sm pt-4'>
        {uvIndexCategory(Math.round(uvi)).protection}
      </p>
    </div>
  );
};
