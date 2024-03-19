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
  const fetchForecast = async () => {
    try {
      const res = await axios.get('api/weather');
      setForecast(res.data);
      console.log('res', res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
      }}>
      <GlobalContextUpdate.Provider
        value={{
          forecast,
        }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};
