"use client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectDistinationDialog from "./SelectDistinationDialog";
import SelectDatesDialog from "./SelectDatesDialog";
import SelectPriceRatingDrawer from "./SelectPriceRatingDrawer";
import ResponsiveSelectGuestsRooms from "./ResponsiveSelectGuestsRooms";
import { cn } from "@/lib/utils";
import { Calendar, SearchIcon, SendIcon, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { DrawerTrigger } from "./ui/drawer";
import { DialogTrigger } from "./ui/dialog";
import { useQueryParams } from "@/hooks/useQueryParams";

const SearchBox = () => {
  const { queryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handelSearch = () => {
    const params = new URLSearchParams(searchParams);
    return router.replace(`/hotels?${params.toString()}`);
  };

  return (
    <Card className="shadow-xl">
      <CardContent className="flex flex-col items-center gap-2 p-2 text-sm md:flex-row">
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          <SelectDistinationDialog>
            <DialogTrigger
              className={cn(
                "flex items-center justify-between gap-2 truncate rounded-sm border px-2",
                !queryParams.hotelName &&
                  !queryParams.city &&
                  !queryParams.country &&
                  "text-muted-foreground",
              )}
            >
              <SearchIcon size={16} />
              <input
                placeholder="Enter destination"
                autoFocus={!queryParams.hotelName && !queryParams.country && !queryParams.city}
                className="border-none outline-none"
                defaultValue={
                  queryParams.hotelName
                    ? queryParams.hotelName
                    : queryParams.city
                      ? `${queryParams.city} - ${queryParams.country}`
                      : queryParams.country
                        ? queryParams.country
                        : ""
                }
              />

              <SendIcon size={20} className="ml-auto" />
            </DialogTrigger>
          </SelectDistinationDialog>

          <SelectDatesDialog>
            <DialogTrigger className="relative flex items-center justify-between gap-x-2 truncate rounded-sm border p-2">
              <Calendar size={15} />
              <p>{queryParams.checkIn.toISOString().split("T")[0]}</p>
              <small className="h-5 w-5 border-b border-b-blue-800 font-semibold text-blue-600">To</small>
              <p>{queryParams.checkOut.toISOString().split("T")[0]}</p>
              <Badge variant={"secondary"} className="rounded-sm px-2 text-[10px]">
                {Math.ceil(
                  Math.abs(queryParams.checkOut.getTime() - queryParams.checkIn.getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                night
              </Badge>
            </DialogTrigger>
          </SelectDatesDialog>

          <ResponsiveSelectGuestsRooms>
            <DrawerTrigger className="flex w-full items-center gap-x-2 truncate rounded-sm border p-2 md:hidden">
              <User size={16} />
              <span>
                {queryParams.roomsCount} Room, {queryParams.adults} Adults, {queryParams.children} Children
              </span>
            </DrawerTrigger>
          </ResponsiveSelectGuestsRooms>

          <SelectPriceRatingDrawer>
            <DrawerTrigger
              className={cn(
                "flex w-full items-center gap-x-2 truncate rounded-sm border p-2 md:hidden",
                !queryParams.minPrice &&
                  !queryParams.maxPrice &&
                  !queryParams.averageRating &&
                  "text-muted-foreground",
              )}
            >
              <User size={15} />
              <span>
                {queryParams.minPrice && queryParams.maxPrice && queryParams.averageRating
                  ? `${queryParams.minPrice} SAR - ${queryParams.maxPrice} SAR, ${queryParams.averageRating} stars`
                  : "Enter Price, average rating"}
              </span>
            </DrawerTrigger>
          </SelectPriceRatingDrawer>
        </div>
        {pathname !== "/hotels" && (
          <Button
            onClick={handelSearch}
            className="w-full rounded-sm py-3 text-sm sm:py-5 md:w-24 lg:w-40 xl:w-60"
          >
            Search
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchBox;
