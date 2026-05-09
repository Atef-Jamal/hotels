// "use client";
// import { BedTypeEnum, PaymentFacilities, RoomServices } from "@/app/generated/prisma/enums";
// import { addDays } from "date-fns";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

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
//   paymentFacilities?: "Pay_At_Hotel" | "Prepay_Online";
//   breakfastIncluded?: boolean;
//   cancellationPolicy?: boolean;
//   averageRating?: number;
//   roomServices?: RoomServices[];
//   bedType?: BedTypeEnum;
// };

// export const useSearchState = () => {
//   const searchParams = useSearchParams();

//   const [searchState, setSearchState] = useState<ISearch>({
//     adults: 1,
//     checkIn: new Date(),
//     checkOut: new Date(),
//     children: 0,
//     maxPrice: 700,
//     minPrice: 0,
//     page: 1,
//     roomsCount: 1,
//   });

//   useEffect(() => {
//     const adults = Number(searchParams.get("adults")) || 1;
//     const children = Number(searchParams.get("children")) || 0;
//     const minPrice = Number(searchParams.get("minPrice")) || 0;
//     const maxPrice = Number(searchParams.get("maxPrice")) || 700;
//     const page = Number(searchParams.get("page")) || 1;
//     const roomsCount = Number(searchParams.get("roomsCount")) || 1;
//     const checkInParam = searchParams.get("checkIn") || new Date();
//     const checkOutParam = searchParams.get("checkOut") || addDays(checkInParam, 1);
//     const hotelNameParam = searchParams.get("hotelName");
//     const countryParam = searchParams.get("country");
//     const cityParam = searchParams.get("city");
//     const addressParam = searchParams.get("address");
//     const breakfastIncludedParam = searchParams.get("breakfastIncluded");
//     const cancellationPolicyParam = searchParams.get("cancellationPolicy");
//     const paymentFacilitiesParam = searchParams.get("paymentFacilities") as PaymentFacilities;
//     const averageRatingParam = searchParams.get("averageRating");
//     const bedTypeParam = searchParams.get("bedType") as BedTypeEnum;
//     const roomServicesParam = searchParams.getAll("roomServices") as RoomServices[];

//     setSearchState((prev) => ({
//       ...prev,
//       adults,
//       children,
//       minPrice,
//       maxPrice,
//       checkIn: new Date(checkInParam),
//       checkOut: new Date(checkOutParam),
//       page,
//       roomsCount,
//       ...(typeof hotelNameParam === "string" ? { hotelName: hotelNameParam } : {}),
//       ...(typeof countryParam === "string" ? { country: countryParam } : {}),
//       ...(typeof cityParam === "string" ? { city: cityParam } : {}),
//       ...(typeof addressParam === "string" ? { address: addressParam } : {}),
//       ...(typeof breakfastIncludedParam === "string" && ["false", "true"].includes(breakfastIncludedParam)
//         ? { breakfastIncluded: breakfastIncludedParam === "true" }
//         : {}),
//       ...(typeof cancellationPolicyParam === "string" && ["false", "true"].includes(cancellationPolicyParam)
//         ? { cancellationPolicy: cancellationPolicyParam === "true" }
//         : {}),
//       ...(typeof paymentFacilitiesParam === "string" ? { paymentFacilities: paymentFacilitiesParam } : {}),
//       ...(typeof averageRatingParam === "string" && !Number.isNaN(averageRatingParam)
//         ? { averageRating: Number(averageRatingParam) }
//         : {}),
//       ...(typeof bedTypeParam === "string" ? { bedType: bedTypeParam } : {}),
//       ...(roomServicesParam.length > 0 ? { roomServices: roomServicesParam } : {}),
//     }));
//   }, [searchParams]);

//   return { searchState, setSearchState };
// };
