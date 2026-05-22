import { getHotelsList, getTotalHotelsCount } from "@/actions";
import HotelsList from "@/components/hotels/HotelsList";
import ErrorComponent from "@/components/shared/ErrorComponent";
import { hotelsFilterSchema } from "@/lib/validation";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HotelListingPage({ searchParams }: IProps) {
  try {
    const getSearchParams = await searchParams;

    const validationResult = hotelsFilterSchema.safeParse(getSearchParams);
    if (!validationResult.success) {
      throw new Error(validationResult.error.message);
    }

    const hotelsPromise = getHotelsList(validationResult.data);
    const matchedHotelsCountPromise = getTotalHotelsCount(validationResult.data);
    const [hotels, matchedHotelsCount] = await Promise.all([hotelsPromise, matchedHotelsCountPromise]);
    return <HotelsList initialHotels={hotels} matchedHotelsCount={matchedHotelsCount} />;
  } catch (error: any) {
    return <ErrorComponent errorMessage={error.message} />;
  }
}
