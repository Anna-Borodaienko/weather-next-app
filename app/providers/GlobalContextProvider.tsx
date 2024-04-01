'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { GlobalContext } from '../context/GlobalContext';

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weather, setWeather] = useState({});
  const [pollution, setPollution] = useState({});
  const [forecast, setForecast] = useState({});

  const fetchWeather = useCallback(async () => {
    try {
      const res = await axios.get('api/weather');
      setWeather(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchPollution = useCallback(async () => {
    try {
      const res = await axios.get('api/pollution');
      setPollution(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchFiveDayForecast = useCallback(async () => {
    try {
      const res = await axios.get('api/fiveDayForecast');
      setForecast(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeather();
      await fetchPollution();
      await fetchFiveDayForecast();
    };

    fetchData();
  }, [fetchWeather, fetchPollution, fetchFiveDayForecast]);

  return (
    <GlobalContext.Provider
      value={{
        weather,
        pollution,
        forecast,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
