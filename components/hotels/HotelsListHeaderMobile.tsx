"use client";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

import SortHotelsDrawer from "../shared/SortHotelsDrawer";
import { DrawerTrigger } from "../ui/drawer";
import { DialogTrigger } from "../ui/dialog";
import ResponsiveSelectGuestsRooms from "../shared/ResponsiveSelectGuestsRooms";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IDestinationResponse } from "@/types";
import SelectDistinationDialog from "@/components/shared/SelectDistinationDialog";
import SelectDatesDialog from "@/components/shared/SelectDatesDialog";
import FilterDrawer from "@/components/shared/FilterDrawer";

interface IProps {
  initialDestinations: IDestinationResponse;
  initialSuggestedLocations: string[];
}

export default function HotelsListHeaderMobile({ initialDestinations, initialSuggestedLocations }: IProps) {
  const { queryParams } = useQueryParams();

  return (
    <header className="sticky top-0 z-1 bg-[#623af3] py-2 md:hidden">
      <div className="mx-2 mb-2 rounded-sm bg-white px-2">
        <SelectDistinationDialog initialDestinations={initialDestinations}>
          <DialogTrigger
            className={cn(
              "w-full border-b py-2 text-left text-sm",
              !queryParams.hotelName && !queryParams.city && !queryParams.country && "text-muted-foreground",
            )}
          >
            {queryParams.hotelName
              ? queryParams.hotelName.replace(/_/g, " ")
              : queryParams.city
                ? `${queryParams.city} - ${queryParams.country}`
                : queryParams.country
                  ? queryParams.country
                  : "Enter destination or property name"}
          </DialogTrigger>
        </SelectDistinationDialog>
        <SelectDatesDialog>
          <DialogTrigger className="flex w-full items-center justify-around p-2 text-sm">
            <p>{queryParams.checkIn.toLocaleDateString("en-CA")}</p>
            <span className="border-b-blue-800 font-medium text-blue-600">To</span>
            <p>{queryParams.checkOut.toLocaleDateString("en-CA")}</p>
          </DialogTrigger>
        </SelectDatesDialog>
      </div>
      <div className="scrollbar-thin flex flex-nowrap gap-x-2 overflow-auto px-3">
        <FilterDrawer initialSuggestedLocations={initialSuggestedLocations} />

        <ResponsiveSelectGuestsRooms>
          <DrawerTrigger className="flex min-w-fit items-center justify-center rounded-sm bg-white px-1.5 py-0.75 text-sm">
            <span>Guests & Rooms</span>
            <ArrowDown size={16} className="ml-1 min-w-fit" />
          </DrawerTrigger>
        </ResponsiveSelectGuestsRooms>
        <SortHotelsDrawer />
        {queryParams.breakfastIncluded && (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            Breakfast Included
          </span>
        )}
        {queryParams.cancellationPolicy && (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            Free Cancellation
          </span>
        )}
        {queryParams.paymentFacilities && (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            {queryParams.paymentFacilities.replace(/_/g, " ")}
          </span>
        )}
        {queryParams.adults && (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            Adults: {queryParams.adults}
          </span>
        )}
        {queryParams.children ?? (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            Children: {queryParams.children}
          </span>
        )}
        {queryParams.minPrice ?? (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            Min Price: {queryParams.minPrice}
          </span>
        )}
        {queryParams.maxPrice && (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            Max Price: {queryParams.maxPrice}
          </span>
        )}
        {queryParams.averageRating && (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            Rating: {queryParams.averageRating}
          </span>
        )}
        {queryParams.bedType && (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            Bed: {queryParams.bedType}
          </span>
        )}
        {queryParams.sort && (
          <span className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white">
            Sort: {queryParams.sort}
          </span>
        )}
        {queryParams.roomServices.map((service) => (
          <span
            key={service}
            className="min-w-fit rounded-sm bg-[#daeeff3b] px-1.5 py-0.75 text-sm text-white"
          >
            {service.replace(/_/g, " ")}
          </span>
        ))}
      </div>
    </header>
  );
}
