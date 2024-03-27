'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { GlobalContext } from '../context/GlobalContext';

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weather, setWeather] = useState({});
  const [pollution, setPollution] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState({});

  const fetchWeather = async () => {
    try {
      const res = await axios.get('api/weather');
      setWeather(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPollution = async () => {
    try {
      const res = await axios.get('api/pollution');
      setPollution(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHourlyForecast = async () => {
    try {
      const res = await axios.get('api/hourlyForecast');
      setHourlyForecast(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchPollution();
    fetchHourlyForecast();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        weather,
        pollution,
        hourlyForecast,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
