'use client';

import { sunrise } from '@/app/components/icons';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { getTimeFromUnix } from '@/app/utils/getTimeFromUnix';
import { Skeleton } from '@/components/ui/skeleton';

export const SunTimes: React.FC = (): JSX.Element => {
  const { weather } = useGlobalContext();

  if (
    !weather ||
    !weather?.sys ||
    !weather?.sys?.sunset ||
    !weather?.sys?.sunrise ||
    !weather?.timezone
  ) {
    return <Skeleton className='h-[12rem] w-full' />;
  }

  const sunsetUnix = weather.sys.sunset;
  const sunriseUnix = weather.sys.sunrise;
  const timezone = weather.timezone;

  const sunsetTime = getTimeFromUnix(sunsetUnix, timezone);
  const sunriseTime = getTimeFromUnix(sunriseUnix, timezone);

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
      <p>Sunset: {sunsetTime}</p>
    </div>
  );
};
