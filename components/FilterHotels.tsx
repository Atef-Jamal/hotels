"use client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import testImage from "@/public/gamePhoto-43.jpg";
import RcSlider from "rc-slider";
import { useQuery } from "@tanstack/react-query";
import { getPlaces, GetPlacesParams } from "@/actions/actions";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { updateURLSearchParams } from "@/lib/utils";
import "rc-slider/assets/index.css";

const FilterHotels = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [country] = useState(searchParams.get("country"));
  const [address] = useState(searchParams.get("address"));
  const [city] = useState(searchParams.get("city"));
  const [minPrice, setMinPrice] = useState(Number(searchParams.get("minPrice")));
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("maxPrice")));
  const [averageRating, setAverageRating] = useState(Number(searchParams.get("averageRating")));
  const [breakfastIncluded, setBreakfastIncluded] = useState(searchParams.get("breakfastIncluded"));
  const [cancellationPolicy, setCancellationPolicy] = useState(searchParams.get("cancellationPolicy"));
  const [paymentFacilities, setPaymentFacilities] = useState(searchParams.get("paymentFacilities"));
  const [roomServices, setRoomServices] = useState(searchParams.getAll("roomServices"));

  const handleRoomServiceChange = (service: string) => {
    const exists = roomServices.includes(service);
    let newParams;
    if (exists) {
      setRoomServices((prev) => prev.filter((i) => i !== service));
      newParams = updateURLSearchParams(searchParams, [
        { actionType: "delete", key: "roomServices", value: service },
      ]);
    } else {
      setRoomServices((prev) => [...prev, service]);
      newParams = updateURLSearchParams(searchParams, [
        { actionType: "append", key: "roomServices", value: service },
      ]);
    }
    router.push(`?${newParams}`);
  };

  let placesTypeg: "cities" | "countries" | "addresses" = "countries";
  let params: GetPlacesParams = {};

  if (country && city) {
    params.country = country;
    params.city = city;
    placesTypeg = "addresses";
  } else if (country) {
    params.country = country;
    placesTypeg = "cities";
  }

  const placesChangeHandler = (value: string) => {
    let newParams;
    switch (placesTypeg) {
      case "countries":
        newParams = updateURLSearchParams(searchParams, [
          { actionType: "delete", key: "hotelName" },
          { actionType: "set", key: "country", value },
        ]);

        break;
      case "cities":
        newParams = updateURLSearchParams(searchParams, [
          { actionType: "delete", key: "hotelName" },
          { actionType: "set", key: "city", value },
        ]);

        break;
      case "addresses":
        newParams = updateURLSearchParams(searchParams, [
          { actionType: "delete", key: "hotelName" },
          { actionType: "set", key: "address", value },
        ]);

        break;
    }
    router.push(`?${newParams}`);
  };

  const { data: places } = useQuery({
    queryKey: ["hotels-list-filters-places", params],
    queryFn: () => getPlaces(params),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <div className="space-y-5">
      <div className="space-y-3 border-b pb-4">
        <p className="font-bold">Price Range</p>
        <div className="space-y-2">
          <div className="flex items-center gap-5 text-blue-700">
            <span className="font-medium">SAR {minPrice || 0}</span>
            <span className="h-0.5 w-8 bg-blue-700"></span>
            <span className="font-medium">SAR {maxPrice || 500}</span>
          </div>
          <RcSlider
            range
            min={0}
            max={500}
            step={1}
            value={[minPrice || 0, maxPrice || 500]}
            onChange={(value) => {
              if (Array.isArray(value)) {
                setMinPrice(value[0]);
                setMaxPrice(value[1]);

                const newParams = updateURLSearchParams(searchParams, [
                  { actionType: "set", key: "minPrice", value: value[0].toString() },
                  { actionType: "set", key: "maxPrice", value: value[1].toString() },
                ]);
                router.push(`?${newParams}`);
              }
            }}
            styles={{
              track: { background: "blue" },
              handle: { background: "blue" },
            }}
          />
          <div className="grid grid-cols-2 gap-x-1 gap-y-2">
            <Button
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(60);
                const newParams = updateURLSearchParams(searchParams, [
                  { actionType: "set", key: "minPrice", value: "0" },
                  { actionType: "set", key: "maxPrice", value: "60" },
                ]);
                router.push(`?${newParams}`);
              }}
              size={"sm"}
              className="text-blue-700"
              variant={"secondary"}
            >
              Under 60
            </Button>
            <Button
              onClick={() => {
                setMinPrice(60);
                setMaxPrice(150);
                const newParams = updateURLSearchParams(searchParams, [
                  { actionType: "set", key: "minPrice", value: "60" },
                  { actionType: "set", key: "maxPrice", value: "150" },
                ]);
                router.push(`?${newParams}`);
              }}
              size={"sm"}
              className="text-blue-700"
              variant={"secondary"}
            >
              60 - 150
            </Button>
            <Button
              onClick={() => {
                setMinPrice(150);
                setMaxPrice(200);
                const newParams = updateURLSearchParams(searchParams, [
                  { actionType: "set", key: "minPrice", value: "150" },
                  { actionType: "set", key: "maxPrice", value: "200" },
                ]);
                router.push(`?${newParams}`);
              }}
              size={"sm"}
              className="text-blue-700"
              variant={"secondary"}
            >
              150 - 200
            </Button>
            <Button
              onClick={() => {
                setMinPrice(200);
                setMaxPrice(300);
                const newParams = updateURLSearchParams(searchParams, [
                  { actionType: "set", key: "minPrice", value: "200" },
                  { actionType: "set", key: "maxPrice", value: "300" },
                ]);
                router.push(`?${newParams}`);
              }}
              size={"sm"}
              className="text-blue-700"
              variant={"secondary"}
            >
              200 - 300
            </Button>
            <Button
              onClick={() => {
                setMinPrice(300);
                setMaxPrice(400);
                const newParams = updateURLSearchParams(searchParams, [
                  { actionType: "set", key: "minPrice", value: "300" },
                  { actionType: "set", key: "maxPrice", value: "400" },
                ]);
                router.push(`?${newParams}`);
              }}
              size={"sm"}
              className="text-blue-700"
              variant={"secondary"}
            >
              300 - 400
            </Button>
            <Button
              onClick={() => {
                setMinPrice(400);
                setMaxPrice(500);
                const newParams = updateURLSearchParams(searchParams, [
                  { actionType: "set", key: "minPrice", value: "400" },
                  { actionType: "set", key: "maxPrice", value: "500" },
                ]);
                router.push(`?${newParams}`);
              }}
              size={"sm"}
              className="text-blue-700"
              variant={"secondary"}
            >
              400 - 500
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Popular Filters</h1>
        <div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              id="Breakfast Included"
              checked={breakfastIncluded === "true"}
              onCheckedChange={(checked) => {
                let newParams;
                if (checked === true) {
                  setBreakfastIncluded("true");
                  newParams = updateURLSearchParams(searchParams, [
                    { actionType: "set", key: "breakfastIncluded", value: "true" },
                  ]);
                } else {
                  setBreakfastIncluded("false");
                  newParams = updateURLSearchParams(searchParams, [
                    { actionType: "delete", key: "breakfastIncluded" },
                  ]);
                }
                router.push(`?${newParams}`);
              }}
            />
            <label
              htmlFor="Breakfast Included"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Breakfast Included
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              id="popular-filter-2"
              checked={cancellationPolicy === "true"}
              onCheckedChange={(checked) => {
                let newParams;
                if (checked === true) {
                  setCancellationPolicy("true");
                  newParams = updateURLSearchParams(searchParams, [
                    { actionType: "set", key: "cancellationPolicy", value: "true" },
                  ]);
                } else {
                  setCancellationPolicy("false");
                  newParams = updateURLSearchParams(searchParams, [
                    { actionType: "delete", key: "cancellationPolicy" },
                  ]);
                }
                router.push(`?${newParams}`);
              }}
            />
            <label
              htmlFor="popular-filter-2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Free Cancellation
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="popular-filter-3" />
            <label
              htmlFor="popular-filter-3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Instant Confiremations
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="popular-filter-4" />
            <label
              htmlFor="popular-filter-4"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Average Rating</h1>
        <div className="flex items-center justify-between">
          <Badge
            onClick={() => {
              setAverageRating(2);
              const newParams = updateURLSearchParams(searchParams, [
                { actionType: "set", key: "averageRating", value: "2" },
              ]);
              router.push(`?${newParams}`);
            }}
            variant={"secondary"}
            className="flex items-center justify-center gap-x-2 px-2 py-1"
          >
            2 <Star fill={averageRating && averageRating >= 2 ? "blue" : "white"} size={18} />
          </Badge>
          <Badge
            onClick={() => {
              setAverageRating(3);
              const newParams = updateURLSearchParams(searchParams, [
                { actionType: "set", key: "averageRating", value: "3" },
              ]);
              router.push(`?${newParams}`);
            }}
            variant={"secondary"}
            className="flex items-center justify-center gap-x-2 px-2 py-1"
          >
            3 <Star fill={averageRating && averageRating >= 3 ? "blue" : "white"} size={18} />
          </Badge>
          <Badge
            onClick={() => {
              setAverageRating(4);
              const newParams = updateURLSearchParams(searchParams, [
                { actionType: "set", key: "averageRating", value: "4" },
              ]);
              router.push(`?${newParams}`);
            }}
            variant={"secondary"}
            className="flex items-center justify-center gap-x-2 px-2 py-1"
          >
            4 <Star fill={averageRating && averageRating >= 4 ? "blue" : "white"} size={18} />
          </Badge>
          <Badge
            onClick={() => {
              setAverageRating(5);
              const newParams = updateURLSearchParams(searchParams, [
                { actionType: "set", key: "averageRating", value: "5" },
              ]);
              router.push(`?${newParams}`);
            }}
            variant={"secondary"}
            className="flex items-center justify-center gap-x-2 px-2 py-1"
          >
            5 <Star fill={averageRating && averageRating >= 5 ? "blue" : "white"} size={18} />
          </Badge>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Bed Types</h1>
        <RadioGroup defaultValue="bed-type-1" className="pl-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="bed-type-1" />
            <Label htmlFor="bed-type-1">1 Double Bed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="bed-type-2" />
            <Label htmlFor="bed-type-2">2 Beds</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="bed-type-3" />
            <Label htmlFor="bed-type-3">1 Single Bed</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Locations</h1>
        <RadioGroup onValueChange={placesChangeHandler} className="pl-2">
          {places?.map((place, i) => (
            <div key={i} className="flex space-x-2">
              <RadioGroupItem
                checked={city === place || country === place || address === place}
                value={place}
                id={place}
              />
              <Label htmlFor={place}>{place}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Payment</h1>
        <RadioGroup
          defaultValue={paymentFacilities || undefined}
          onValueChange={(value: any) => {
            setPaymentFacilities(value);
            const newParams = updateURLSearchParams(searchParams, [
              { actionType: "set", key: "paymentFacilities", value: value },
            ]);
            router.push(`?${newParams}`);
          }}
          className="pl-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Prepay Online" id="Prepay Online" />
            <Label htmlFor="Prepay Online">Prepay Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Pay At Hotel" id="Pay At Hotel" />
            <Label htmlFor="Pay At Hotel">Pay at Hotel</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Room Facilities & Services</h1>
        <div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              checked={roomServices.includes("Espresso machine")}
              onCheckedChange={() => handleRoomServiceChange("Espresso machine")}
              id="Espresso machine"
            />
            <label
              htmlFor="Espresso machine"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Espresso machine
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              checked={roomServices.includes("Balcony")}
              onCheckedChange={() => handleRoomServiceChange("Balcony")}
              id="Balcony"
            />
            <label
              htmlFor="Balcony"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Balcony
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              checked={roomServices.includes("Kettle")}
              onCheckedChange={() => handleRoomServiceChange("Kettle")}
              id="Kettle"
            />
            <label
              htmlFor="Kettle"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Kettle
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              checked={roomServices.includes("Microwave")}
              onCheckedChange={() => handleRoomServiceChange("Microwave")}
              id="Microwave"
            />
            <label
              htmlFor="Microwave"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Microwave
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Recently Viewed</h1>
        <div className="flex">
          <Image src={testImage} alt="" className="h-full w-[40%] object-cover" />
          <div className="flex-1 px-2">
            <h1 className="text-sm font-bold">Ramcaly Dubai Hotel</h1>
            <div className="flex items-center gap-x-2">
              <span className="rounded-b-lg rounded-s-lg bg-blue-900 p-[3px] text-[13px] font-medium text-white">
                4.2/5
              </span>
              <p className="text-xs font-bold leading-4 text-muted-foreground">Very good | 142 Review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterHotels;
