import BookingDetailView from "@/components/booking/BookingDetailView";
import { checkRoomAvailability, hotelHasDiscount } from "@/actions";
import { roomsFilterSchema } from "@/lib/validation";
import ErrorComponent from "@/components/shared/ErrorComponent";

interface IProps {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BookingDetailPage({ params, searchParams }: IProps) {
  const { roomId } = await params;
  const getSearchParams = await searchParams;

  const validatedResult = roomsFilterSchema.safeParse(getSearchParams);
  if (!validatedResult.success) {
    return <ErrorComponent errorMessage={validatedResult.error.message} />;
  }

  const room = await checkRoomAvailability({
    roomId,
    dates: { checkIn: validatedResult.data.checkIn, checkOut: validatedResult.data.checkOut },
  });
  const hasDiscounts = await hotelHasDiscount({ hotelSlug: room.hotel.slug });

  return <BookingDetailView room={room} hasDiscounts={hasDiscounts} />;
}
