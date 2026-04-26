"use client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
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

export type ISearchData = {
  hotelName: string;
  country: string;
  city: string;
  checkIn: Date;
  checkOut: Date;
  minPrice: number;
  maxPrice: number;
  averageRating: number;
  adults: number;
  children: number;
  roomsCount: number;
  breakfastIncluded: boolean;
};

const SearchBox = () => {
  const router = useRouter();

  const [searchData, setSearchData] = useState<ISearchData>({
    hotelName: "",
    country: "",
    city: "",
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    minPrice: 0,
    maxPrice: 500,
    averageRating: 0,
    adults: 1,
    children: 0,
    roomsCount: 1,
    breakfastIncluded: false,
  });

  const handelSearch = () => {
    let newSearchParams = "";

    for (const key in searchData) {
      newSearchParams += `${key}=${searchData[key as keyof ISearchData]}&`;
    }

    return router.push(`/hotels${newSearchParams}`);
  };

  return (
    <Card className="shadow-xl">
      <CardContent className="flex flex-col items-center gap-2 p-2 md:flex-row">
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          <SelectDistinationDialog searchData={searchData} setSearchData={setSearchData}>
            <DialogTrigger
              className={cn(
                "flex items-center justify-between truncate rounded-sm border p-2",
                !searchData.hotelName && !searchData.city && !searchData.country && "text-muted-foreground",
              )}
            >
              <SearchIcon size={16} />
              <span className="ml-2">
                {searchData.hotelName
                  ? searchData.hotelName
                  : searchData.city
                    ? `${searchData.city} - ${searchData.country}`
                    : searchData.country
                      ? searchData.country
                      : "Enter destination"}
                {/* {searchData.hotelName || searchData.country || searchData.city || "Enter destination"} */}
              </span>
              <SendIcon size={20} className="ml-auto" />
            </DialogTrigger>
          </SelectDistinationDialog>

          <SelectDatesDialog searchData={searchData} setSearchData={setSearchData}>
            <DialogTrigger className="flex items-center justify-between gap-x-2 truncate rounded-sm border p-2">
              <Calendar size={15} />
              <div className="flex flex-1 items-center justify-between">
                <p>{searchData.checkIn.toISOString().split("T")[0]}</p>
                <small className="h-5 w-5 border-b border-b-blue-800 font-semibold text-blue-600">To</small>
                <p>{searchData.checkOut.toISOString().split("T")[0]}</p>
              </div>
              <Badge variant={"secondary"} className="ml-auto px-2 py-0 text-[10px]">
                1 night
              </Badge>
            </DialogTrigger>
          </SelectDatesDialog>

          <ResponsiveSelectGuestsRooms searchData={searchData} setSearchData={setSearchData} />

          <SelectPriceRatingDrawer searchData={searchData} setSearchData={setSearchData}>
            <DrawerTrigger
              className={cn(
                "flex w-full items-center gap-x-2 truncate rounded-sm border p-2 md:hidden",
                !searchData.minPrice &&
                  !searchData.maxPrice &&
                  !searchData.averageRating &&
                  "text-muted-foreground",
              )}
            >
              <User size={15} />
              <span>
                {searchData.minPrice && searchData.maxPrice && searchData.averageRating
                  ? `${searchData.minPrice} SAR - ${searchData.maxPrice} SAR, ${searchData.averageRating} stars`
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
