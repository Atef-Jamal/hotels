"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface IOptions {
  minPrice?: number;
  maxPrice?: number;
  breakfastIncluded?: boolean;
  cancellationPolicy?: boolean;
  averageRating?: number;
  paymentFacilities?: "Pay At Hotel" | "Prepay Online";
  roomServices?: string[];
  hotelName?: string;
  rooms: number;
  country?: string;
  city?: string;
  address?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

interface IInitialContextValue {
  options: IOptions;
  setOptions: React.Dispatch<React.SetStateAction<IOptions>>;
}

const AppContext = createContext<IInitialContextValue | undefined>(undefined);

export const initialSearchValues: IOptions = {
  checkIn: new Date().toISOString().split("T")[0],
  checkOut: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
  adults: 1,
  children: 0,
  rooms: 1,
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState(initialSearchValues);

  // console.log(data);
  return <AppContext.Provider value={{ options, setOptions }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppContextProvider");
  return context;
};
