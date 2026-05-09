"use client";
import { BedTypeEnum, RoomServices } from "@/app/generated/prisma/client";
import { addDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { createContext, use, useState } from "react";

type SearchContextType = {
  searchData: ISearchData;
  setSearchData: React.Dispatch<React.SetStateAction<ISearchData>>;
};

export type ISearchData = {
  hotelName: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  adults: number;
  children: number;
  checkIn: Date;
  checkOut: Date;
  page: number;
  roomsCount: number;
  minPrice: number;
  maxPrice: number;
  paymentFacilities: "Pay_At_Hotel" | "Prepay_Online" | null;
  breakfastIncluded: boolean | null;
  cancellationPolicy: boolean | null;
  averageRating: number | null;
  roomServices: RoomServices[] | null;
  bedType: BedTypeEnum | null;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

function SearchProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const hotelName = searchParams.get("hotelName");
  const countryParam = searchParams.get("country");
  const cityParam = searchParams.get("city");
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const averageRatingParam = searchParams.get("averageRating");
  const adultsParam = searchParams.get("adults");
  const childrenParam = searchParams.get("children");
  const roomsCountParam = searchParams.get("roomsCount");
  const breakfastIncludedParam = searchParams.get("breakfastIncluded");
  const cancellationPolicyParam = searchParams.get("cancellationPolicy");
  const addressParam = searchParams.get("address");
  const paymentFacilitiesParam = searchParams.get("paymentFacilities") as
    | "Pay_At_Hotel"
    | "Prepay_Online"
    | null;
  const pageParam = searchParams.get("page");
  const roomServicesParam = searchParams.getAll("roomServices") as RoomServices[] | null;
  const bedTypeParam = searchParams.get("bedType") as BedTypeEnum | null;

  const [searchData, setSearchData] = useState<ISearchData>({
    hotelName: hotelName,
    country: countryParam,
    city: cityParam,
    address: addressParam,
    checkIn: checkInParam ? new Date(checkInParam) : new Date(),
    checkOut: checkOutParam ? new Date(checkOutParam) : addDays(new Date(), 1),
    adults: adultsParam ? parseInt(adultsParam) : 1,
    children: childrenParam ? parseInt(childrenParam) : 0,
    minPrice: minPriceParam ? parseFloat(minPriceParam) : 0,
    maxPrice: maxPriceParam ? parseFloat(maxPriceParam) : 700,
    page: pageParam ? parseInt(pageParam) : 1,
    roomsCount: roomsCountParam ? parseInt(roomsCountParam) : 2,
    paymentFacilities: paymentFacilitiesParam,
    breakfastIncluded: breakfastIncludedParam ? breakfastIncludedParam === "true" : null,
    cancellationPolicy: cancellationPolicyParam ? cancellationPolicyParam === "true" : null,
    averageRating: averageRatingParam ? parseFloat(averageRatingParam) : null,
    roomServices: roomServicesParam && roomServicesParam.length > 0 ? roomServicesParam : null,
    bedType: bedTypeParam || null,
  });

  return <SearchContext.Provider value={{ searchData, setSearchData }}>{children}</SearchContext.Provider>;
}

export function useSearchContext(): SearchContextType {
  const context = use(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within SearchProvider");
  }
  return context;
}

export default SearchProvider;
