"use client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import SelectDistinationDialog from "./SelectDistinationDialog";
import SelectDatesDialog from "./SelectDatesDialog";
import SelectPriceRatingDrawer from "./SelectPriceRatingDrawer";
import ResponsiveSelectGuestsRooms from "./ResponsiveSelectGuestsRooms";
import { cn } from "@/lib/utils";
import { Calendar, SearchIcon, SendIcon, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { DrawerTrigger } from "./ui/drawer";
import { DialogTrigger } from "./ui/dialog";
import { useState } from "react";

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

  const [hotelName, setHotelName] = useState(searchParams.get("hotelName") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || today);
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || tomorrow);
  const [minPrice, setMinPrice] = useState(Number(searchParams.get("minPrice")));
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("maxPrice")));
  const [averageRating, setAverageRating] = useState(Number(searchParams.get("averageRating")));

  const handelSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <Card className="shadow-xl">
      <CardContent className="flex flex-col items-center gap-2 p-2 md:flex-row">
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
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
                "flex items-center justify-between truncate rounded-sm border p-2",
                !hotelName && !city && !country && "text-muted-foreground",
              )}
            >
              <SearchIcon size={16} />
              <span className="ml-2">{hotelName || country || city || "Enter destination"}</span>
              <SendIcon size={20} className="ml-auto" />
            </DialogTrigger>
          </SelectDistinationDialog>

          <SelectDatesDialog
            checkIn={checkIn}
            checkOut={checkOut}
            setCheckIn={setCheckIn}
            setCheckOut={setCheckOut}
          >
            <DialogTrigger className="flex items-center justify-between gap-x-2 truncate rounded-sm border p-2">
              <Calendar size={15} />
              <div className="flex flex-1 items-center justify-between">
                <p>{checkIn}</p>
                <small className="h-5 w-5 border-b border-b-blue-800 font-semibold text-blue-600">To</small>
                <p>{checkOut}</p>
              </div>
              <Badge variant={"secondary"} className="ml-auto px-2 py-0 text-[10px]">
                1 night
              </Badge>
            </DialogTrigger>
          </SelectDatesDialog>

          <ResponsiveSelectGuestsRooms />

          <SelectPriceRatingDrawer
            minPrice={minPrice}
            averageRating={averageRating}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setAverageRating={setAverageRating}
          >
            <DrawerTrigger
              className={cn(
                "flex w-full items-center gap-x-2 truncate rounded-sm border p-2 md:hidden",
                !minPrice && !maxPrice && !averageRating && "text-muted-foreground",
              )}
            >
              <User size={15} />
              <span>
                {minPrice && maxPrice && averageRating
                  ? `${minPrice} SAR - ${maxPrice} SAR, ${averageRating} stars`
                  : "Enter Price, average rating"}
              </span>
            </DrawerTrigger>
          </SelectPriceRatingDrawer>
        </div>
        <Button onClick={handelSearch} className="w-full md:w-24 lg:w-40 xl:w-60">
          Search
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchBox;
