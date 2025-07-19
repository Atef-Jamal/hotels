"use client";
import { getHotles } from "@/actions/actions";
import { searchParamsToObject } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import HotelDetailCard from "./HotelDetailCard";
import { IHotelWithRoomsReviewsNearbyAttractions } from "@/types/types";

function HotelList({
  initialFirstPageHotels,
}: {
  initialFirstPageHotels: { hotels: IHotelWithRoomsReviewsNearbyAttractions[]; hasMore: boolean };
}) {
  const searchParams = useSearchParams();
  const options = searchParamsToObject(searchParams);

  const { data, error, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["list-hotels", options],
    queryFn: ({ pageParam }) => getHotles({ page: pageParam.toString(), ...options }),
    initialPageParam: 2,
    initialData: {
      pages: [initialFirstPageHotels],
      pageParams: [1],
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
    staleTime: 60 * 60 * 1000,
  });

  const hotels = data?.pages?.flatMap((page) => page.hotels) || [];

  return (
    <div className="space-y-2">
      {status === "error" && <p>{error.message}</p>}

      {status === "success" && hotels.length === 0 && <p>no hotels was found</p>}

      {status === "success" &&
        hotels.map((hotel) => <HotelDetailCard key={hotel._id} hotel={hotel} options={options} />)}

      {hasNextPage && !isFetchingNextPage && <button onClick={() => fetchNextPage()}>Load more</button>}

      {isFetchingNextPage && <p>is Loading more .....</p>}
    </div>
  );
}

export default HotelList;
