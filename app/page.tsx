'use client';

import { AirPollution } from './components/AirPollution';
import { FeelsLike } from './components/FeelsLike';
import { FiveDaysForecast } from './components/FiveDaysForecast';
import { HourlyForecast } from './components/HourlyForecast';
import { Humidity } from './components/Humidity';
import { LargeCities } from './components/LargeCities';
import { Map } from './components/Map';
import { Navbar } from './components/Navbar';
import { Population } from './components/Population';
import { Pressure } from './components/Pressure';
import { SunTimes } from './components/SunTimes';
import { Temperature } from './components/Temperature';
import { UviIndex } from './components/UviIndex';
import { Visibility } from './components/Visibility';
import { Wind } from './components/Wind';

const Home: React.FC = (): JSX.Element => {
  return (
    <main className='mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto'>
      <Navbar />
      <div className='pb-4 flex flex-col gap-4 md:flex-row'>
        <div className='flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]'>
          <Temperature />
          <FiveDaysForecast />
        </div>
        <div className='flex flex-col w-full'>
          <div
            className='instruments grid h-full gap-4 col-span-full 
            sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4'>
            <AirPollution />
            <SunTimes />
            <Wind />
            <HourlyForecast />
            <UviIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className='map-container mt-4 flex gap-4'>
            <Map />
            <LargeCities />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
