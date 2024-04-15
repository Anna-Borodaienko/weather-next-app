'use client';

import { createContext, useContext } from 'react';

export const GlobalContext = createContext();
export const GlobalContextUpdate = createContext();

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
