"use client";
import { FilterHotelsSchema, IFilterHotelsSchema } from "@/validation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const validatedResult = FilterHotelsSchema.safeParse({
    page: searchParams.get("page"),
    adults: searchParams.get("adults"),
    children: searchParams.get("children"),
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    roomsCount: searchParams.get("roomsCount"),
    hotelName: searchParams.get("hotelName"),
    address: searchParams.get("address"),
    city: searchParams.get("city"),
    country: searchParams.get("country"),
    averageRating: searchParams.get("averageRating"),
    paymentFacilities: searchParams.get("paymentFacilities"),
    cancellationPolicy: searchParams.get("cancellationPolicy"),
    breakfastIncluded: searchParams.get("breakfastIncluded"),
    roomServices: searchParams.getAll("roomServices"),
    bedType: searchParams.get("bedType"),
  });
  // console.log(validatedResult.data);
  if (!validatedResult.success) {
    console.log("validatedResult.error", validatedResult.error);
    throw new Error(`Client side Validation Error: ${validatedResult.error.message}`);
  }

  type IProps =
    | { method: "append"; key: keyof IFilterHotelsSchema; value: string }
    | { method: "set"; key: keyof IFilterHotelsSchema; value: string }
    | { method: "delete"; key: keyof IFilterHotelsSchema }
    | { method: "toggle"; key: keyof IFilterHotelsSchema; value: string };

  const updateQueryParams = (props: IProps[]) => {
    const params = new URLSearchParams(searchParams);

    props.forEach((action) => {
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

    // Update the URL, which triggers a new server render on your page.tsx
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { queryParams: validatedResult.data, updateQueryParams };
};
