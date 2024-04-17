'use client';

import { sunrise } from '@/app/components/icons';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Weather } from '@/app/types/Weather';
import { getTimeFromUnix } from '@/app/utils/getTimeFromUnix';
import { Skeleton } from '@/components/ui/skeleton';

export const SunTimes: React.FC = (): JSX.Element => {
  const { weather }: { weather: Weather } = useGlobalContext();

  if (
    !weather ||
    !weather.current ||
    !weather.current.sunset ||
    !weather.current.sunrise ||
    !weather.timezone_offset
  ) {
    return <Skeleton className='h-[12rem] w-full' />;
  }

  const { current, timezone_offset } = weather;
  const sunsetTime = getTimeFromUnix(current.sunset, timezone_offset);
  const sunriseTime = getTimeFromUnix(current.sunrise, timezone_offset);

  return (
    <div
      className='pt-6 pb-5 px-4 
      h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey 
      shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {sunrise}Sunrise
        </h2>
        <p className='pt-4 text-2xl'>{sunriseTime}</p>
      </div>
      <p className='text-sm'>Sunset: {sunsetTime}</p>
    </div>
  );
};
