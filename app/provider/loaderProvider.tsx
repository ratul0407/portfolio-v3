"use client";
import { createContext, useContext } from "react";

const loaderContext = createContext(false);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <loaderContext.Provider value={loaderContext}>
      {children}
    </loaderContext.Provider>
  );
};

export const useLoader = () => {
  return useContext(loaderContext);
};
