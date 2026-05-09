import { getHotles, getTotalHotelsCount } from "@/actions/actions";
import HotelsList from "@/components/HotelsList";
import { FilterHotelsSchema } from "@/validation";

async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const getSearchParams = await searchParams;
  console.log("getSearchParams", getSearchParams);
  const validationResult = FilterHotelsSchema.safeParse(getSearchParams);
  if (!validationResult.success)
    throw new Error(`server validation error - ${validationResult.error.message}`);

  const hotelsPromise = getHotles(validationResult.data);
  const matchedHotelsCountPromise = getTotalHotelsCount(validationResult.data);

  const [hotels, matchedHotelsCount] = await Promise.all([hotelsPromise, matchedHotelsCountPromise]);

  return <HotelsList initialHotels={hotels} matchedHotelsCount={matchedHotelsCount} />;
}

export default HotelsPage;
