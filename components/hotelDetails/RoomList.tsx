"use client";
import { MdBathroom, MdOutlineBed, MdOutlineKingBed } from "react-icons/md";
import { BedDoubleIcon, BedIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getHotelRooms } from "@/actions";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import type { IHotelRoomsListResponse, IRoomsFilter } from "@/types";

interface IProps {
  hotelSlug: string;
  initialRooms: IHotelRoomsListResponse;
  queryFilters: IRoomsFilter;
}

export default function RoomList({ hotelSlug, initialRooms, queryFilters }: IProps) {
  const searchParams = useSearchParams();

  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["room-list", hotelSlug, queryFilters],
    queryFn: ({ pageParam }) =>
      getHotelRooms({ hotelSlug, queryFilters: { ...queryFilters, page: pageParam } }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: {
      pageParams: [1],
      pages: [{ hasMore: initialRooms.hasMore, rooms: initialRooms.rooms }],
    },
  });

  const rooms = data.pages.flatMap((page) => page.rooms);

  return (
    <div>
      {status === "error" && <p>{error.message}</p>}

      {status === "success" &&
        rooms.map((room) => (
          <div key={room.id}>
            <div className="flex flex-col gap-4 px-2 md:flex-row md:px-4">
              <div className="relative h-36 w-full md:h-64 md:w-92">
                <Image src={room.images[0]} alt="test" className="h-full w-full" width={200} height={200} />
                <div className="absolute bottom-0 flex w-full items-center justify-center gap-2 bg-black/10 py-2 backdrop-blur-lg">
                  {room.images.slice(1).map((img, indx) => (
                    <Image
                      key={indx}
                      src={img}
                      alt=""
                      width={80}
                      height={80}
                      className="h-7.5 w-13.75 rounded-md border border-white object-fill md:h-10 md:w-18.75"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-1 flex-col font-medium">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg">{room.type.replace(/_/g, " ")} Room</h1>
                  <Button variant={"outline"} size={"sm"} className={"rounded-sm text-lg"}>
                    ${room.pricePerNight / 100}
                  </Button>
                </div>
                <div className="my-2 flex flex-wrap items-center gap-x-4">
                  {room.beds.map((bed, indx) => (
                    <div key={indx} className="flex items-center gap-1 text-sm">
                      <div className="flex">
                        {[...Array(bed.count).keys()].map((num) => {
                          if (bed.type === "Single") return <BedIcon key={num} size={17} />;
                          if (bed.type === "Double") return <BedDoubleIcon key={num} size={17} />;
                          if (bed.type === "Twin") return <BedDoubleIcon key={num} size={17} />;
                          if (bed.type === "Queen") return <MdOutlineBed key={num} size={17} />;
                          if (bed.type === "King") return <MdOutlineKingBed key={num} size={17} />;
                        })}
                      </div>
                      <span>
                        {bed.count} {bed.type} Beds
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-x-1 gap-y-1 text-black/80 sm:grid-cols-3 md:grid-cols-2 md:gap-x-2 lg:grid-cols-3 xl:grid-cols-4">
                  {room.roomServices.slice(0, 10).map((service, indx) => (
                    <div key={indx} className="flex gap-1 md:gap-2">
                      <MdBathroom size={15} />
                      <span className="text-xs font-normal md:text-sm">{service.replace(/_/g, " ")}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-4 rounded-sm bg-blue-700 px-8 md:mt-auto">
                  <Link
                    className="flex size-full items-center justify-center"
                    href={`${hotelSlug}/${room.id}?${searchParams.toString()}`}
                  >
                    Reserve
                  </Link>
                </Button>
              </div>
            </div>
            <Separator orientation="horizontal" className="my-2" />
          </div>
        ))}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} variant={"outline"} className={"w-full bg-slate-400"}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
}
