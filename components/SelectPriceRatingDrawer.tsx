"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { cn, updateURLSearchParams } from "@/lib/utils";
import { Star } from "lucide-react";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

function SelectPriceRatingDrawer({
  children,
  minPrice,
  maxPrice,
  // averageRating,
  setMinPrice,
  setMaxPrice,
  // setAverageRating
}: {
  children: React.ReactNode;
  minPrice: number;
  maxPrice: number;
  averageRating: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  setAverageRating: React.Dispatch<React.SetStateAction<number>>;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const breakfastIncluded = Boolean(searchParams.get("breakfastIncluded"));

  return (
    <Drawer>
      {children}
      <DrawerContent className="px-3 py-0">
        <DrawerHeader className="px-1">
          <DrawerTitle className="mr-auto font-medium">Budget</DrawerTitle>
          <DrawerDescription className="mr-auto text-center text-sm font-[300]">
            price per night, Bed Type, Room Services ect
          </DrawerDescription>
        </DrawerHeader>
        <div className="mb-4 max-h-[60vh] space-y-4 overflow-y-auto text-sm font-[400] scrollbar-thin">
          <div className="space-y-2 px-2">
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
          <div>
            <p className="mb-3 font-bold">Star Rating</p>
            <div className="grid grid-cols-4 gap-x-2">
              <button className="flex items-center justify-center gap-x-1 rounded-md bg-muted-foreground/15 p-2 font-bold">
                2 <Star size={19} />
              </button>
              <button className="flex items-center justify-center gap-x-1 rounded-md bg-muted-foreground/15 p-2 font-bold">
                3 <Star size={19} />
              </button>
              <button className="flex items-center justify-center gap-x-1 rounded-md bg-muted-foreground/15 p-2 font-bold">
                4 <Star size={19} />
              </button>
              <button className="flex items-center justify-center gap-x-1 rounded-md bg-muted-foreground/15 p-2 font-bold">
                5 <Star size={19} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold">Breakfast Included</p>
            <button
              onClick={() => {
                const newParams = updateURLSearchParams(searchParams, [
                  {
                    actionType: "set",
                    key: "breakfastIncluded",
                    value: breakfastIncluded ? "false" : "true",
                  },
                ]);
                router.push(`?${newParams}`);
              }}
              className={cn(
                "flex h-7 w-12 items-center rounded-full px-0.5",
                breakfastIncluded ? "bg-blue-700" : "bg-muted-foreground/30",
              )}
            >
              <span className={cn("size-6 rounded-full bg-white", breakfastIncluded && "ml-auto")}></span>
            </button>
          </div>
          <div className="space-y-3">
            <p className="font-bold">Bed Type</p>
            <div className="flex items-center gap-2">
              <button className="rounded-md bg-muted-foreground/10 px-3 py-2 text-sm">1 Double Bed</button>
              <button className="rounded-md bg-muted-foreground/10 p-2 text-sm">2 Beds</button>
              <button className="rounded-md bg-muted-foreground/10 px-3 py-2 text-sm">1 Single Bed</button>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold">Payment</p>
            <div className="grid grid-cols-2 gap-x-3">
              <button className="rounded-md bg-muted-foreground/10 p-2">Pay At Hotel</button>
              <button className="rounded-md bg-muted-foreground/10 p-2">Prepay Online</button>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold">Booking Policy</p>
            <div className="grid grid-cols-2 gap-x-2">
              <button className="rounded-md bg-muted-foreground/10 py-2 text-sm">Free Cancellation</button>
              <button className="rounded-md bg-muted-foreground/10 py-2 text-sm">Instant Confirmation</button>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold">Room Facilities & Services</p>
            <div className="flex flex-wrap items-center gap-2">
              <button className="rounded-md bg-muted-foreground/10 p-2 text-sm">Air-conditioning</button>
              <button className="rounded-md bg-muted-foreground/10 p-2 text-sm">Non-smoking rooms</button>
              <button className="rounded-md bg-muted-foreground/10 p-2 text-sm">Waching-machine</button>
              <button className="rounded-md p-2 text-sm text-blue-700">Show More</button>
            </div>
          </div>
        </div>
        <DrawerFooter className="p-0">
          <DrawerClose onClick={() => {}} className="rounded-md bg-blue-700 py-1 text-gray-200">
            Apply
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SelectPriceRatingDrawer;
