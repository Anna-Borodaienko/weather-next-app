'use client';

import axios from 'axios';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { DEFAULT_LOCATION } from '@/app/constants/defaultLocations';

import { GlobalContext, GlobalContextUpdate } from '../context/GlobalContext';
import { Coordinates } from '../types/Coordinates';
import { Pollution } from '../types/Pollution';

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [weather, setWeather] = useState({});
  const [pollution, setPollution] = useState<Pollution | null>(null);
  const [forecast, setForecast] = useState({});

  const [activeCityCoords, setActiveCityCoords] = useState<Coordinates>(
    DEFAULT_LOCATION.coord,
  );

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
      setWeather(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchPollution = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setPollution(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchFiveDayForecast = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/fiveDayForecast?lat=${lat}&lon=${lon}`);
      setForecast(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeather(activeCityCoords.lat, activeCityCoords.lon);
      await fetchPollution(activeCityCoords.lat, activeCityCoords.lon);
      await fetchFiveDayForecast(activeCityCoords.lat, activeCityCoords.lon);
    };

    fetchData();
  }, [fetchWeather, fetchPollution, fetchFiveDayForecast, activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        weather,
        pollution,
        forecast,
        setActiveCityCoords,
      }}>
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};
