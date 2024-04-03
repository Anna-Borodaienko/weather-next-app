'use client';

import { OTHER_LARGE_CITIES } from '@/app/constants/defaultLocations';

export const LargeCities: React.FC = (): JSX.Element => {
  return (
    <div className='states flex flex-col flex-1 gap-3'>
      <h2 className='flex items-center gap-2 font-medium'>Top Large Cities</h2>
      <div className='flex flex-col gap-4'>
        {OTHER_LARGE_CITIES.map((city) => {
          return (
            <div
              key={city.id}
              className='border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none'>
              <p className='px-6 py-4'>{city.city}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
