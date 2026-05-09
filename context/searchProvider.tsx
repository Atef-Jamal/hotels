// "use client";
// import { BedTypeEnum, PaymentFacilities, RoomServices } from "@/app/generated/prisma/client";
// import { addDays } from "date-fns";
// import { createContext, use, useState } from "react";

// export type ISearch = {
//   adults: number;
//   children: number;
//   checkIn: Date;
//   checkOut: Date;
//   minPrice: number;
//   maxPrice: number;
//   page: number;
//   roomsCount: number;
//   hotelName?: string;
//   country?: string;
//   city?: string;
//   address?: string;
//   paymentFacilities?: PaymentFacilities;
//   breakfastIncluded?: boolean;
//   cancellationPolicy?: boolean;
//   averageRating?: number;
//   roomServices?: RoomServices[];
//   bedType?: BedTypeEnum;
// };

// type SearchContextType = {
//   searchState: ISearch;
//   setSearchState: React.Dispatch<React.SetStateAction<ISearch>>;
// };

// const SearchContext = createContext<SearchContextType | undefined>(undefined);

// function SearchProvider({ children }: { children: React.ReactNode }) {
//   const [searchState, setSearchState] = useState<ISearch>({
//     adults: 1,
//     children: 0,
//     checkIn: new Date(),
//     checkOut: addDays(new Date(), 1),
//     minPrice: 0,
//     maxPrice: 700,
//     page: 1,
//     roomsCount: 1,
//   });

//   return <SearchContext.Provider value={{ searchState, setSearchState }}>{children}</SearchContext.Provider>;
// }

// export function useSearchState(): SearchContextType {
//   const context = use(SearchContext);
//   if (context === undefined) {
//     throw new Error("useSearchState must be used within SearchProvider");
//   }
//   return context;
// }

// export default SearchProvider;
