import z from "zod";
import {
  getHotelDetails,
  getHotelRooms,
  getHotelsList,
  checkRoomAvailability,
  suggestedLocations,
} from "@/actions";
import {
  applyDiscountSchema,
  bookingOrderSchema,
  hotelsFilterSchema,
  roomsFilterSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/validation";

export type ISignUp = z.infer<typeof signUpSchema>;
export type ISignIn = z.infer<typeof signInSchema>;
export type IHotelsFilter = z.infer<typeof hotelsFilterSchema>;
export type IRoomsFilter = z.infer<typeof roomsFilterSchema>;
export type IBookingOrder = z.infer<typeof bookingOrderSchema>;
export type IApplyDiscount = z.infer<typeof applyDiscountSchema>;

export type IHotelListResponse = Awaited<ReturnType<typeof getHotelsList>>;
export type IHotelDetailResponse = Awaited<ReturnType<typeof getHotelDetails>>;
export type IHotelRoomsListResponse = Awaited<ReturnType<typeof getHotelRooms>>;
export type IRoomsDetailResponse = Awaited<ReturnType<typeof checkRoomAvailability>>;
export type ISuggestedLocationslResponse = Awaited<ReturnType<typeof suggestedLocations>>;
export type IDestinationResponse = IDestinationItem[];

export type IDestinationItem =
  | {
      type: "property";
      name: string;
      hotelSlug: string;
      address: string;
      country: string;
      city: string;
    }
  | {
      type: "address";
      address: string;
      country: string;
      city: string;
    }
  | {
      type: "city";
      city: string;
      country: string;
    }
  | { type: "country"; country: string };

export type ISortType = "recommended" | "rating" | "top-reviewed" | "distance";

export type IResetFilters =
  | "Price"
  | "Popular_Filters"
  | "Average_Rating"
  | "Payment_Facilities"
  | "Room_Facilities_Services"
  | "Bed_Types"
  | "Sort";

export interface IErrorPageProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}
