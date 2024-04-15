'use client';

import { OTHER_LARGE_CITIES } from '@/app/constants/defaultLocations';
import { useGlobalContextUpdate } from '@/app/context/GlobalContext';

export const LargeCities: React.FC = (): JSX.Element => {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const changeActiveCityCoords = (lat, lon) => {
    setActiveCityCoords({ lat, lon });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='states flex flex-col flex-1 gap-3'>
      <h2 className='flex items-center gap-2 font-medium'>Top Large Cities</h2>
      <div className='flex flex-col gap-4'>
        {OTHER_LARGE_CITIES.map((city) => {
          return (
            <div
              key={city.id}
              className='border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none'
              onClick={() =>
                changeActiveCityCoords(city.coord.lat, city.coord.lon)
              }>
              <p className='px-6 py-4'>{city.city}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
