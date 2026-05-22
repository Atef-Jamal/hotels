"use client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SortAsc, Star } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import testImage from "@/public/gamePhoto-43.jpg";
import { useQuery } from "@tanstack/react-query";
import { suggestedLocations } from "@/actions";
import { Button } from "../ui/button";
import { BedTypeEnum, RoomServices } from "@/app/generated/prisma/enums";
import { useEffect, useRef, useState } from "react";
import {
  bedTypesList,
  paymentFacilitiesList,
  priceRanges,
  roomServicesList,
  sortOptions,
} from "@/constants/constants";
import { useQueryParams } from "@/hooks/useQueryParams";
import type { IResetFilters, ISortType } from "@/types";
import { Slider } from "../ui/slider";

interface IProps {
  initialSuggestedLocations: string[];
}
export default function FilterHotels({ initialSuggestedLocations }: IProps) {
  const { queryParams, updateQueryParams } = useQueryParams();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [roomServicesPage, setRoomServicesPage] = useState(1);

  const roomServicesPerPage = 10;

  const skipRoomServices = (roomServicesPage - 1) * roomServicesPerPage;

  const placesChangeHandler = (value: string) => {
    if (queryParams.address) {
      return updateQueryParams([
        { method: "delete", key: "hotelName" },
        { method: "set", key: "address", value },
      ]);
    }
    if (queryParams.city) {
      return updateQueryParams([
        { method: "delete", key: "hotelName" },
        { method: "set", key: "address", value },
      ]);
    }
    if (queryParams.country) {
      return updateQueryParams([
        { method: "delete", key: "hotelName" },
        { method: "delete", key: "address" },
        { method: "set", key: "city", value },
      ]);
    }
    return updateQueryParams([
      { method: "delete", key: "hotelName" },
      { method: "delete", key: "address" },
      { method: "delete", key: "city" },
      { method: "set", key: "country", value },
    ]);
  };

  const handleRoomServiceChange = (service: RoomServices) => {
    return updateQueryParams([
      {
        method: "toggle",
        key: "roomServices",
        value: service,
      },
    ]);
  };

  const resetFilters = (type: IResetFilters) => {
    switch (type) {
      case "Price":
        updateQueryParams([
          { method: "delete", key: "minPrice" },
          { method: "delete", key: "maxPrice" },
        ]);
        break;
      case "Bed_Types":
        updateQueryParams([{ method: "delete", key: "bedType" }]);

        break;
      case "Popular_Filters":
        updateQueryParams([
          { method: "delete", key: "breakfastIncluded" },
          { method: "delete", key: "cancellationPolicy" },
        ]);

        break;
      case "Room_Facilities_Services":
        updateQueryParams([{ method: "delete", key: "roomServices" }]);

        break;
      case "Average_Rating":
        updateQueryParams([{ method: "delete", key: "averageRating" }]);
        break;
      case "Payment_Facilities":
        updateQueryParams([{ method: "delete", key: "paymentFacilities" }]);

        break;
      case "Sort":
        updateQueryParams([{ method: "delete", key: "sort" }]);

        break;
      default:
        break;
    }
  };

  const handlePriceChange = (value: number[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      updateQueryParams([
        { method: "set", key: "minPrice", value: value[0].toString() },
        { method: "set", key: "maxPrice", value: value[1].toString() },
      ]);
    }, 500);
  };

  const handleSortChange = (type: ISortType) => {
    return updateQueryParams([{ method: "set", key: "sort", value: type }]);
  };

  const {
    data: suggestedDestinations,
    status,
    error,
  } = useQuery({
    queryKey: ["suggested-locations", queryParams.country, queryParams.city],
    queryFn: () => suggestedLocations({ city: queryParams.city, country: queryParams.country }),
    initialData: initialSuggestedLocations,
    // staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-5 max-sm:px-2">
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Price Range</h1>
          <Button
            onClick={() => resetFilters("Price")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-5 text-blue-700">
            <span className="font-medium">SAR {queryParams.minPrice}</span>
            <span className="h-0.5 w-8 bg-blue-700"></span>
            <span className="font-medium">SAR {queryParams.maxPrice}</span>
          </div>
          <Slider
            value={[queryParams.minPrice, queryParams.maxPrice]}
            max={700}
            onValueChange={handlePriceChange as any}
          />
          <div className="grid grid-cols-2 gap-x-1 gap-y-2">
            {priceRanges.map((range) => (
              <Button
                key={range.max}
                onClick={() => {
                  updateQueryParams([
                    { method: "set", key: "minPrice", value: range.min.toString() },
                    { method: "set", key: "maxPrice", value: range.max.toString() },
                  ]);
                }}
                size={"sm"}
                className="text-blue-700"
                variant={"secondary"}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden border-b pb-4 md:block">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <h1 className="font-bold">Sort</h1>
            <SortAsc size={20} />
          </div>

          <Button
            onClick={() => resetFilters("Sort")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>
        {sortOptions.map((item) => (
          <div key={item.value} className="flex items-center space-x-2 p-2">
            <Checkbox
              checked={queryParams.sort === item.value}
              onCheckedChange={() => handleSortChange(item.value)}
              id={item.value}
            />
            <label
              htmlFor={item.value}
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Popular Filters</h1>
          <Button
            onClick={() => resetFilters("Popular_Filters")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>
        <div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              id="Breakfast_Included"
              checked={queryParams.breakfastIncluded === true}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  updateQueryParams([{ method: "set", key: "breakfastIncluded", value: "true" }]);
                } else {
                  updateQueryParams([{ method: "delete", key: "breakfastIncluded" }]);
                }
              }}
            />
            <label
              htmlFor="Breakfast_Included"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Breakfast Included
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              id="Free_Cancellation"
              checked={queryParams.cancellationPolicy === true}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  updateQueryParams([{ method: "set", key: "cancellationPolicy", value: "true" }]);
                } else {
                  updateQueryParams([{ method: "delete", key: "cancellationPolicy" }]);
                }
              }}
            />
            <label
              htmlFor="Free_Cancellation"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Free Cancellation
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="Instant_Confiremations" />
            <label
              htmlFor="Instant_Confiremations"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Instant Confiremations
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="Accept_terms_and_conditions" />
            <label
              htmlFor="Accept_terms_and_conditions"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Average Rating</h1>
          <Button
            onClick={() => resetFilters("Average_Rating")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>

        <div className="flex items-center justify-between">
          {[...Array(4).keys()].map((i) => (
            <Badge
              key={i}
              onClick={() => {
                if (queryParams.averageRating === i + 2) {
                  return updateQueryParams([{ method: "delete", key: "averageRating" }]);
                }
                return updateQueryParams([
                  { method: "set", key: "averageRating", value: (i + 2).toString() },
                ]);
              }}
              variant={"secondary"}
              className="flex items-center justify-center gap-x-2 px-2 py-1"
            >
              {i + 2}
              <Star
                fill={queryParams.averageRating && queryParams.averageRating >= i + 2 ? "blue" : "white"}
                size={18}
              />
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Bed Types</h1>
          <Button
            onClick={() => resetFilters("Bed_Types")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>

        <RadioGroup
          value={queryParams.bedType}
          onValueChange={(value: BedTypeEnum) => {
            return updateQueryParams([{ method: "set", key: "bedType", value }]);
          }}
          className="pl-2"
        >
          {bedTypesList.map(({ label, value }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Locations</h1>
        {status === "error" && <div className="text-center text-sm text-red-600">{error.message}</div>}
        {status === "success" && suggestedDestinations.length === 0 && (
          <div className="text-center text-blue-600">No places found</div>
        )}
        {status === "success" && (
          <RadioGroup onValueChange={placesChangeHandler} className="pl-2">
            {suggestedDestinations.map((place, i) => (
              <div key={i} className="flex space-x-2">
                <RadioGroupItem
                  checked={
                    queryParams.address === place ||
                    queryParams.city === place ||
                    queryParams.country === place
                  }
                  value={place}
                  defaultValue={place}
                  id={place}
                />
                <Label htmlFor={place} className="text-xs">
                  {place}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Payment Facilities</h1>
          <Button
            onClick={() => resetFilters("Payment_Facilities")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>

        <RadioGroup
          value={queryParams.paymentFacilities}
          onValueChange={(value) => {
            return updateQueryParams([{ method: "set", key: "paymentFacilities", value }]);
          }}
          className="pl-2"
        >
          {paymentFacilitiesList.map(({ label, value }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="space-y-3 pb-4 sm:border-b">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Room Facilities & Services</h1>
          <Button
            onClick={() => resetFilters("Room_Facilities_Services")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>

        <div>
          {roomServicesList
            .map((service) => (
              <div key={service} className="flex items-center space-x-2 p-2">
                <Checkbox
                  checked={queryParams.roomServices.includes(service)}
                  onCheckedChange={() => handleRoomServiceChange(service)}
                  id={service}
                />
                <label
                  htmlFor={service}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {service.replace(/_/g, " ")}
                </label>
              </div>
            ))
            .slice(0, skipRoomServices + roomServicesPerPage)}
          <Button
            onClick={() => setRoomServicesPage((prev) => prev + 1)}
            variant={"outline"}
            size={"sm"}
            className="mx-auto mt-2"
          >
            Load more
          </Button>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4 max-sm:hidden">
        <h1 className="font-bold">Recently Viewed</h1>
        <div className="flex">
          <Image src={testImage} alt="" className="h-full w-[40%] object-cover" />
          <div className="flex-1 px-2">
            <h1 className="text-sm font-bold">Ramcaly Dubai Hotel</h1>
            <div className="flex items-center gap-x-2">
              <span className="rounded-s-lg rounded-b-lg bg-blue-900 p-0.75 text-[13px] font-medium text-white">
                4.2/5
              </span>
              <p className="text-muted-foreground text-xs leading-4 font-bold">Very good | 142 Review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
