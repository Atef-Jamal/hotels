"use client";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import SelectPriceRatingDrawer from "./SelectPriceRatingDrawer";
import SelectDistinationDialog from "./SelectDistinationDialog";
import SelectDatesDialog from "./SelectDatesDialog";
import ResponsiveSortHotels from "./ResponsiveSortHotels";
import { DrawerTrigger } from "./ui/drawer";
import { DialogTrigger } from "./ui/dialog";
import ResponsiveSelectGuestsRooms from "./ResponsiveSelectGuestsRooms";
import { useQueryParams } from "@/hooks/useQueryParams";

const HotelsListHeaderSmallScreen = () => {
  const { queryParams } = useQueryParams();
  return (
    <header className="sticky top-0 z-1 bg-[#623af3] py-2 md:hidden">
      <div className="mx-2 mb-2 rounded-sm bg-white px-2">
        <SelectDistinationDialog>
          <DialogTrigger
            className={cn(
              "w-full border-b py-1 text-left text-sm font-medium",
              !queryParams.hotelName && !queryParams.city && !queryParams.country && "text-muted-foreground",
            )}
          >
            {queryParams.hotelName
              ? queryParams.hotelName
              : queryParams.city
                ? `${queryParams.city} - ${queryParams.country}`
                : queryParams.country
                  ? queryParams.country
                  : "Enter destination"}
          </DialogTrigger>
        </SelectDistinationDialog>
        <SelectDatesDialog>
          <DialogTrigger className="flex w-full items-center gap-x-4 py-1 text-sm font-medium">
            <p>{queryParams.checkIn.toISOString().split("T")[0]}</p>
            <small className="border-b-blue-800 font-semibold text-blue-600">To</small>
            <p>{queryParams.checkOut.toISOString().split("T")[0]}</p>
          </DialogTrigger>
        </SelectDatesDialog>
      </div>
      <div className="scrollbar-thin flex flex-nowrap gap-x-2 overflow-auto px-3">
        <SelectPriceRatingDrawer>
          <DrawerTrigger className="flex items-center justify-center rounded-sm bg-white px-1.5 py-0.75 text-[13px] font-medium text-blue-950">
            Filter
            <ArrowDown size={16} className="ml-1 min-w-fit" />
          </DrawerTrigger>
        </SelectPriceRatingDrawer>

        <ResponsiveSelectGuestsRooms>
          <DrawerTrigger className="flex min-w-fit items-center justify-center rounded-sm bg-white px-1.5 py-0.75 text-[13px] font-medium">
            <span>
              {queryParams.roomsCount} Rooms, {queryParams.adults} Guests
            </span>
            <ArrowDown size={16} className="ml-1 min-w-fit" />
          </DrawerTrigger>
        </ResponsiveSelectGuestsRooms>
        <ResponsiveSortHotels />
        <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-[13px] text-white">
          Breakfast Included
        </span>
        <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-[13px] text-white">
          Free Cancellation
        </span>
      </div>
    </header>
  );
};

export default HotelsListHeaderSmallScreen;
