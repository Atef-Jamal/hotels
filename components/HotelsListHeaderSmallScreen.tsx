"use client";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { useAppContext } from "@/context/context";
import SelectPriceRatingDrawer from "./SelectPriceRatingDrawer";
import SelectDistinationDialog from "./SelectDistinationDialog";
import SelectDatesDialog from "./SelectDatesDialog";
import ResponsiveSortHotels from "./ResponsiveSortHotels";
import { DrawerTrigger } from "./ui/drawer";
import { DialogTrigger } from "./ui/dialog";

const HotelsListHeaderSmallScreen = () => {
  const { options } = useAppContext();
  return (
    <header className="sticky top-0 z-[1] bg-[#623af3] py-2 md:hidden">
      <div className="mx-2 mb-2 rounded-sm bg-white px-2 py-1">
        <SelectDistinationDialog>
          <DialogTrigger
            className={cn(
              "w-full border-b py-1 text-left text-xs font-medium",
              !options.hotelName &&
                !options.location?.city &&
                !options.location?.country &&
                "text-muted-foreground",
            )}
          >
            {options.hotelName || options.location?.country || options.location?.city || "Enter destination"}
          </DialogTrigger>
        </SelectDistinationDialog>
        <SelectDatesDialog>
          <DialogTrigger className="flex w-full items-center gap-x-4 py-1 text-xs font-medium">
            <p>{options.checkIn}</p>
            <small className="h-5 w-5 border-b-blue-800 font-semibold text-blue-600">To</small>
            <p>{options.checkOut}</p>
          </DialogTrigger>
        </SelectDatesDialog>
      </div>
      <div className="flex flex-nowrap gap-x-2 overflow-auto px-3 scrollbar-thin">
        <SelectPriceRatingDrawer>
          <DrawerTrigger className="flex items-center justify-center rounded-sm bg-white px-[6px] py-[3px] text-[13px] font-medium text-blue-950">
            Filter
            <ArrowDown size={16} className="ml-1 min-w-fit" />
          </DrawerTrigger>
        </SelectPriceRatingDrawer>

        <button className="flex items-center justify-center rounded-sm bg-white px-[6px] py-[3px] text-[13px] font-medium text-blue-950">
          Location
          <ArrowDown size={16} className="ml-1 min-w-fit" />
        </button>
        <ResponsiveSortHotels />
        <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-[6px] py-[3px] text-[13px] text-white">
          Breakfast Included
        </span>
        <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-[6px] py-[3px] text-sm text-white">
          Free Cancellation
        </span>
      </div>
    </header>
  );
};

export default HotelsListHeaderSmallScreen;
