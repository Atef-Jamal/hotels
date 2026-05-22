"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectDistinationDialog from "./SelectDistinationDialog";
import SelectDatesDialog from "./SelectDatesDialog";
import ResponsiveSelectGuestsRooms from "./ResponsiveSelectGuestsRooms";
import { Calendar, SearchIcon, SendIcon, User } from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IDestinationResponse } from "@/types";
import { DialogTrigger } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { DrawerTrigger } from "../ui/drawer";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface IProps {
  initialDestinations: IDestinationResponse;
}

export default function SearchBox({ initialDestinations }: IProps) {
  const { queryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const nights = Math.ceil(
    Math.abs(queryParams.checkOut.getTime() - queryParams.checkIn.getTime()) / (1000 * 60 * 60 * 24),
  );

  const handelSearch = () => {
    if (queryParams.hotelName)
      return router.replace(`/hotels/${queryParams.hotelName}?${searchParams.toString()}`);
    return router.replace(`/hotels?${searchParams.toString()}`);
  };

  return (
    <Card className="shadow-xl">
      <CardContent className="flex flex-col items-center gap-2 p-2 text-sm md:flex-row">
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          <SelectDistinationDialog initialDestinations={initialDestinations}>
            <DialogTrigger
              className={"flex items-center justify-between gap-2 truncate rounded-sm border px-2"}
            >
              <SearchIcon size={16} />
              <input
                placeholder="Enter destination"
                autoFocus={!queryParams.hotelName && !queryParams.country && !queryParams.city}
                className="border-none py-2 outline-none"
                value={
                  queryParams.hotelName
                    ? queryParams.hotelName.replace(/_/g, " ")
                    : queryParams.city
                      ? `${queryParams.city} - ${queryParams.country}`
                      : queryParams.country
                        ? queryParams.country
                        : ""
                }
                readOnly
              />

              <SendIcon size={20} className="ml-auto" />
            </DialogTrigger>
          </SelectDistinationDialog>

          <SelectDatesDialog>
            <DialogTrigger className="relative flex items-center justify-between gap-x-2 truncate rounded-sm border p-2">
              <Calendar size={15} />
              <p>{queryParams.checkIn.toLocaleDateString("en-CA")}</p>
              <small className="h-5 w-5 border-b border-b-blue-800 font-semibold text-blue-600">To</small>
              <p>{queryParams.checkOut.toLocaleDateString("en-CA")}</p>
              <Badge variant={"secondary"} className="rounded-sm px-2 text-[10px]">
                {nights} night
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
}
