import { roomsFilterSchema } from "@/lib/validation";
import { getDestinations, getHotelDetails, getHotelRooms } from "@/actions";
import HotelDetails from "@/components/hotelDetails/HotelDetails";
import ErrorComponent from "@/components/shared/ErrorComponent";

interface IProps {
  params: Promise<{ hotelSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HotelDetailsPage({ params, searchParams }: IProps) {
  const { hotelSlug } = await params;
  const getSearchParams = await searchParams;
  const validatedResult = roomsFilterSchema.safeParse(getSearchParams);

  if (!validatedResult.success) {
    return <ErrorComponent errorMessage={validatedResult.error.message} />;
  }

  const [hotel, initialRooms, initialDestinations] = await Promise.all([
    getHotelDetails({ hotelSlug }),
    getHotelRooms({ hotelSlug, queryFilters: validatedResult.data }),
    getDestinations(""),
  ]);

  return (
    <HotelDetails
      hotel={hotel}
      initialRooms={initialRooms}
      initialDestinations={initialDestinations}
      queryFilters={validatedResult.data}
    />
  );
}
