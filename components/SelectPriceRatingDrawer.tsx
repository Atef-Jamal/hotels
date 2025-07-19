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
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const breakfastIncluded = Boolean(searchParams.get("breakfastIncluded"));

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value); // Update or add the param
    router.push(`?${params.toString()}`); // Update URL without full reload
  };

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
          <div className="space-y-3 font-medium">
            <span className="">SAR 140</span> -<span className="">SAR 340</span>
            <RcSlider
              range
              min={0}
              max={500}
              step={1}
              value={[minPrice, maxPrice]}
              onChange={(value) => {
                if (Array.isArray(value)) {
                  setMinPrice(value[0]);
                  setMaxPrice(value[1]);
                  updateSearchParam("minPrice", value[0].toString());
                  updateSearchParam("maxPrice", value[1].toString());
                }
              }}
              styles={{
                track: { background: "blue" },
                handle: { background: "blue" },
              }}
            />
            <div className="grid grid-cols-2 gap-2">
              <button className="text-nowrap rounded-md bg-muted-foreground/10 p-2">Under SAR 60</button>
              <button className="text-nowrap rounded-md bg-muted-foreground/10 p-2">SAR 60 - SAR 150</button>
              <button className="text-nowrap rounded-md bg-muted-foreground/10 p-2">SAR 150 - SAR 200</button>
              <button className="text-nowrap rounded-md bg-muted-foreground/10 p-2">SAR 200 - SAR 300</button>
              <button className="text-nowrap rounded-md bg-muted-foreground/10 p-2">SAR 300 - SAR 400</button>
              <button className="text-nowrap rounded-md bg-muted-foreground/10 p-2">SAR 400 - SAR 500</button>
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
              // onClick={() => setBreakfastIncluded((prev) => !prev)}
              onClick={() => updateSearchParam("breakfastIncluded", breakfastIncluded ? "false" : "true")}
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
          <DrawerClose className="rounded-md bg-blue-700 py-1 text-gray-200">Apply</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SelectPriceRatingDrawer;
