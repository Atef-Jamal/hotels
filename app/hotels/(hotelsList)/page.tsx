"use client";
import { getHotles } from "@/actions/actions";
import HotelDetailCard from "@/components/HotelDetailCard";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/context/searchProvider";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

function HotelsPage() {
  const { searchData } = useSearchContext();

  const { data, error, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["list-hotels", searchData],
    queryFn: ({ pageParam }) => getHotles({ ...searchData, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
    staleTime: 60 * 60 * 1000,
  });

  const hotels = data?.pages?.flatMap((page) => page.hotels) || [];

  return (
    <div className="h-full space-y-1 py-1 max-md:px-2">
      <div className="flex items-center gap-2 rounded-sm bg-blue-500 px-2 py-1 text-sm font-medium md:text-base">
        <span className="text-purple-50">{data?.pages[0].matchedHotelsCount || 0}</span>
        <span className="text-purple-200">Hotels Match your Search critiria</span>
      </div>
      <div className="h-full space-y-2">
        {status === "error" && (
          <div className="mt-2 flex h-20 items-center justify-center rounded-lg bg-white text-red-700">
            {error?.message}
          </div>
        )}

        {status === "success" && hotels.length === 0 && (
          <div className="flex h-[50%] flex-col items-center justify-center gap-2 rounded-lg bg-white text-blue-700 sm:flex-row">
            <Search className="size-12 rounded-sm" />
            <div>
              <h1 className="text-center font-bold">No matching properties found</h1>
              <p className="text-center text-sm">Please adjust your search filters and try again.</p>
            </div>
          </div>
        )}

        {status === "success" && hotels.map((hotel) => <HotelDetailCard key={hotel.id} hotel={hotel} />)}

        {status === "pending" && (
          <div className="flex h-full animate-pulse items-center justify-center rounded-lg bg-white text-gray-700">
            Loading hotels...
          </div>
        )}

        {hasNextPage && (
          <Button
            className={"w-full rounded-sm bg-blue-300 text-gray-600"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load more"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default HotelsPage;
