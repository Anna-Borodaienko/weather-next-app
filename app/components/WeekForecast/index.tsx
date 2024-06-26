'use client';

import { useGlobalContext } from '@/app/context/GlobalContext';
import { Weather } from '@/app/types/Weather';
import { getDayFromUnix } from '@/app/utils/getDayFromUnix';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';

import { calender } from '../icons';
import { IconWeather } from '../IconWeather';

export const WeekForecast: React.FC = (): JSX.Element => {
  const { weather }: { weather: Weather } = useGlobalContext();

  if (!weather || !weather.daily || !weather.timezone_offset) {
    return <Skeleton className='h-[12rem] w-full' />;
  }

  const { daily, timezone_offset } = weather;

  const temperatures = daily.map((day) => day.temp);
  const minTemp = Math.min(...temperatures.map((temp) => temp.min));
  const maxTemp = Math.max(...temperatures.map((temp) => temp.max));

  return (
    <div
      className='pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div>
        <h2 className='flex items-center gap-4 font-medium'>
          {calender} 7-Day Forecast
        </h2>
        <div className='forecast-list py-3 gap-4'>
          {daily.slice(1).map((day) => (
            <div
              key={day.dt}
              className='daily-forecast py-2 flex w-full flex-row items-center justify-between 
              gap-2 last:mb-0 border-b-2 last:border-none'>
              <p className='min-w-[3rem] font-medium'>
                {getDayFromUnix(day.dt, timezone_offset)}
              </p>
              <IconWeather iconCode={day.weather[0].icon} />
              <div className='flex-1 flex items-center justify-between gap-2'>
                <p className='text-sm font-bold'>{Math.round(day.temp.min)}°</p>
                <Slider
                  min={minTemp}
                  max={maxTemp}
                  value={[day.temp.min, day.temp.max]}
                />
                <p className='text-sm font-bold'>{Math.round(day.temp.max)}°</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
