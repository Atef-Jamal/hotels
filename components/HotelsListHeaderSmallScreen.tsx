"use client";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import SelectPriceRatingDrawer from "./SelectPriceRatingDrawer";
import SelectDistinationDialog from "./SelectDistinationDialog";
import SelectDatesDialog from "./SelectDatesDialog";
import ResponsiveSortHotels from "./ResponsiveSortHotels";
import { DrawerTrigger } from "./ui/drawer";
import { DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { ISearchData } from "./SearchBox";

const HotelsListHeaderSmallScreen = () => {
  const today = new Date();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  const [searchData, setSearchData] = useState<ISearchData>({
    hotelName: "",
    country: "",
    city: "",
    checkIn: today,
    checkOut: tomorrow,
    minPrice: 0,
    maxPrice: 500,
    averageRating: 0,
    adults: 1,
    children: 0,
    roomsCount: 1,
    breakfastIncluded: false,
  });

  return (
    <header className="sticky top-0 z-[1] bg-[#623af3] py-2 md:hidden">
      <div className="mx-2 mb-2 rounded-sm bg-white px-2">
        <SelectDistinationDialog searchData={searchData} setSearchData={setSearchData}>
          <DialogTrigger
            className={cn(
              "w-full border-b py-1 text-left text-sm font-medium",
              !searchData.hotelName && !searchData.city && !searchData.country && "text-muted-foreground",
            )}
          >
            {searchData.hotelName
              ? searchData.hotelName
              : searchData.city
                ? `${searchData.city} - ${searchData.country}`
                : searchData.country
                  ? searchData.country
                  : "Enter destination"}
          </DialogTrigger>
        </SelectDistinationDialog>
        <SelectDatesDialog searchData={searchData} setSearchData={setSearchData}>
          <DialogTrigger className="flex w-full items-center gap-x-4 py-1 text-sm font-medium">
            <p>{searchData.checkIn.toISOString().split("T")[0]}</p>
            <small className="border-b-blue-800 font-semibold text-blue-600">To</small>
            <p>{searchData.checkOut.toISOString().split("T")[0]}</p>
          </DialogTrigger>
        </SelectDatesDialog>
      </div>
      <div className="flex flex-nowrap gap-x-2 overflow-auto px-3 scrollbar-thin">
        <SelectPriceRatingDrawer searchData={searchData} setSearchData={setSearchData}>
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
