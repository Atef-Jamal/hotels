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
import { useSearchParams } from "next/navigation";

const HotelsListHeaderSmallScreen = () => {
  const searchParams = useSearchParams();

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

  const [hotelName, setHotelName] = useState(searchParams.get("hotelName") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || today);
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || tomorrow);
  const [minPrice, setMinPrice] = useState(Number(searchParams.get("minPrice")) || 0);
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("maxPrice")) || 500);
  const [averageRating, setAverageRating] = useState(Number(searchParams.get("averageRating")));

  return (
    <header className="sticky top-0 z-[1] bg-[#623af3] py-2 md:hidden">
      <div className="mx-2 mb-2 rounded-sm bg-white px-2">
        <SelectDistinationDialog
          hotelName={hotelName}
          country={country}
          city={city}
          setHotelName={setHotelName}
          setCountry={setCountry}
          setCity={setCity}
        >
          <DialogTrigger
            className={cn(
              "w-full border-b py-1 text-left text-sm font-medium",
              hotelName && city && country && "text-muted-foreground",
            )}
          >
            {hotelName || country || city || "Enter destination"}
          </DialogTrigger>
        </SelectDistinationDialog>
        <SelectDatesDialog
          checkIn={checkIn}
          checkOut={checkOut}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
        >
          <DialogTrigger className="flex w-full items-center gap-x-4 py-1 text-sm font-medium">
            <p>{checkIn}</p>
            <small className="border-b-blue-800 font-semibold text-blue-600">To</small>
            <p>{checkOut}</p>
          </DialogTrigger>
        </SelectDatesDialog>
      </div>
      <div className="flex flex-nowrap gap-x-2 overflow-auto px-3 scrollbar-thin">
        <SelectPriceRatingDrawer
          minPrice={minPrice}
          maxPrice={maxPrice}
          averageRating={averageRating}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setAverageRating={setAverageRating}
        >
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
