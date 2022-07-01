import React, { FC, useReducer, useState } from "react";

interface AppContextInterface {
  center: { lat: number; lng: number };
  setCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  minZoom: number;
  maxZoom: number;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [center, setCenter] = useState({ lat: 21.028511, lng: 105.804817 });
  const [zoomLevel, setZoomLevel] = useState(10);
  const minZoom = 3;
  const maxZoom = 19;

  const AppCtx: AppContextInterface = {
    center,
    setCenter,
    zoomLevel,
    setZoomLevel,
    minZoom,
    maxZoom,
  };

  return (
    <AppContext.Provider value={{ ...AppCtx }}>{children}</AppContext.Provider>
  );
};

//export default AppProvider;
