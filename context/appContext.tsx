"use client";

import { hotelsFilterSchema } from "@/lib/validation";
import { IHotelsFilter, IUpdateQueryParamsArg } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface AppContextType {
  queryParams: IHotelsFilter;
  setQueryParams: Dispatch<SetStateAction<IHotelsFilter>>;
  updateQueryParams: (arg: IUpdateQueryParamsArg[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const adultsParam = searchParams.get("adults");
  const childrenParam = searchParams.get("children");
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const roomsCountParam = searchParams.get("roomsCount");
  const hotelNameParam = searchParams.get("hotelName");
  const addressParam = searchParams.get("address");
  const cityParam = searchParams.get("city");
  const countryParam = searchParams.get("country");
  const averageRatingParam = searchParams.get("averageRating");
  const paymentFacilitiesParam = searchParams.get("paymentFacilities");
  const cancellationPolicyParam = searchParams.get("cancellationPolicy");
  const breakfastIncludedParam = searchParams.get("breakfastIncluded");
  const sortParam = searchParams.get("sort");
  const bedTypeParam = searchParams.get("bedType");
  const roomServicesParam = searchParams.getAll("roomServices");

  const [queryParams, setQueryParams] = useState(() => {
    const validationResult = hotelsFilterSchema.safeParse({
      ...(pageParam ? { page: pageParam } : {}),
      ...(adultsParam ? { adults: adultsParam } : {}),
      ...(childrenParam ? { children: childrenParam } : {}),
      ...(checkInParam ? { checkIn: checkInParam } : {}),
      ...(checkOutParam ? { checkOut: checkOutParam } : {}),
      ...(minPriceParam ? { minPrice: minPriceParam } : {}),
      ...(maxPriceParam ? { maxPrice: maxPriceParam } : {}),
      ...(roomsCountParam ? { roomsCount: roomsCountParam } : {}),
      ...(hotelNameParam ? { hotelName: hotelNameParam } : {}),
      ...(addressParam ? { address: addressParam } : {}),
      ...(cityParam ? { city: cityParam } : {}),
      ...(countryParam ? { country: countryParam } : {}),
      ...(averageRatingParam ? { averageRating: averageRatingParam } : {}),
      ...(paymentFacilitiesParam ? { paymentFacilities: paymentFacilitiesParam } : {}),
      ...(cancellationPolicyParam ? { cancellationPolicy: cancellationPolicyParam } : {}),
      ...(breakfastIncludedParam ? { breakfastIncluded: breakfastIncludedParam } : {}),
      ...(sortParam ? { sort: sortParam } : {}),
      ...(bedTypeParam ? { bedType: bedTypeParam } : {}),
      ...(roomServicesParam.length > 0 ? { roomServices: roomServicesParam } : {}),
    });

    if (!validationResult.success) {
      throw new Error(validationResult.error.message);
    }
    return validationResult.data;
  });

  const updateQueryParams = (arg: IUpdateQueryParamsArg[]) => {
    const params = new URLSearchParams(searchParams.toString());

    arg.forEach((action) => {
      switch (action.method) {
        case "append":
          params.append(action.key, action.value);
          break;

        case "set":
          params.set(action.key, action.value);
          break;

        case "delete":
          params.delete(action.key);
          break;

        case "toggle": {
          const values = params.getAll(action.key);
          const exist = values.find((item) => item == action.value);
          if (exist) {
            const filtered = values.filter((v) => v !== action.value);
            params.delete(action.key);
            filtered.forEach((v) => params.append(action.key, v));
            break;
          } else {
            params.append(action.key, action.value);
            break;
          }
        }

        default: {
          const _exhaustive: never = action;
          return _exhaustive;
        }
      }
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <AppContext.Provider value={{ queryParams, setQueryParams, updateQueryParams }}>
      {children}
    </AppContext.Provider>
  );
}

// 4. Create a custom hook for safe and clean consumption
export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
