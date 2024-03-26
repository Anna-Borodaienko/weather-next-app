'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { GlobalContext, GlobalContextUpdate } from '../context/GlobalContext';

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});

  const fetchForecast = async () => {
    try {
      const res = await axios.get('api/weather');
      setForecast(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAirQuality = async () => {
    try {
      const res = await axios.get('api/pollution');
      setAirQuality(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
      }}>
      <GlobalContextUpdate.Provider
        value={{
          forecast,
          airQuality,
        }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};
