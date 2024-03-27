'use client';

import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

import { useGlobalContext } from '@/app/context/GlobalContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

import { IconWeather } from '../IconWeather';

export const HourlyForecast: React.FC = (): JSX.Element => {
  const [visibleForecast, setVisibleForecast] = useState([
    {
      id: 0,
      hour: '',
      temp: 0,
      icon: '',
    },
  ]);

  const { hourlyForecast } = useGlobalContext();

  const { current, hourly, timezone_offset } = hourlyForecast;

  const getHour = useCallback(
    (timestamp: number) => {
      return moment
        .unix(timestamp)
        .utc()
        .utcOffset(timezone_offset / 60)
        .format('HH:mm')
        .toString();
    },
    [timezone_offset],
  );

  useEffect(() => {
    if (!current || !current.dt || !current.temp || !hourly) return;

    const visibleForecastList = [
      {
        id: current.dt,
        hour: 'Now',
        temp: Math.round(current.temp),
        icon: current.weather[0].icon,
      },
    ];
    for (let i = 1; i < 24; i++) {
      const hourForecast = {
        id: hourly[i].dt,
        hour: getHour(hourly[i].dt),
        temp: Math.round(hourly[i].temp),
        icon: hourly[i].weather[0].icon,
      };
      visibleForecastList.push(hourForecast);
    }

    setVisibleForecast(visibleForecastList);
  }, [current, getHour, hourly]);

  return (
    <div
      className='pt-6 px-4 h-[12rem] border rounded-lg 
      flex flex-col gap-8 dark:bg-dark-grey 
      shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
      <div className='h-full flex gap-10 overflow-hidden'>
        {visibleForecast.length < 1 ? (
          <Skeleton className='h-[12rem] w-full' />
        ) : (
          <div className='w-full'>
            <Carousel
              opts={{
                align: 'start',
              }}>
              <CarouselContent>
                {visibleForecast.map((forecast) => {
                  return (
                    <CarouselItem
                      key={forecast.id}
                      className='flex flex-col items-center gap-4 cursor-grab basis-[8.5rem]'>
                      <p>{forecast.hour}</p>
                      <IconWeather iconCode={forecast.icon} />
                      <p className='mt-4'>{forecast.temp}°C</p>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};
