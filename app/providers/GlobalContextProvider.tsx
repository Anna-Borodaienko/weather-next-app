'use client';

import { GlobalContext, GlobalContextUpdate } from '../context/GlobalContext';

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <GlobalContext.Provider value='hello'>
      <GlobalContextUpdate.Provider value='hello'>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};
