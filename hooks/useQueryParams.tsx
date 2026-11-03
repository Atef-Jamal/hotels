"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { hotelsFilterSchema } from "@/lib/validation";
import { IUpdateQueryParamsArg } from "@/types";

export function useQueryParams() {
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

  const updateQueryParams = (arg: IUpdateQueryParamsArg[]) => {
    const params = new URLSearchParams(searchParams.toString());

    arg.forEach((item) => {
      switch (item.action) {
        case "append":
          params.append(item.key, item.value);
          break;

        case "set":
          params.set(item.key, item.value);
          break;

        case "delete":
          params.delete(item.key);
          break;

        case "toggle": {
          const values = params.getAll(item.key);
          const exist = values.find((ele) => ele == item.value);
          if (exist) {
            const filtered = values.filter((ele) => ele !== item.value);
            params.delete(item.key);
            filtered.forEach((ele) => params.append(item.key, ele));
            break;
          } else {
            params.append(item.key, item.value);
            break;
          }
        }

        default: {
          const _exhaustive: never = item;
          return _exhaustive;
        }
      }
    });

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    return router.refresh();
  };

  return { queryParams: validationResult.data, updateQueryParams };
}
