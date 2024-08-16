import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import testImage from "@/public/gamePhoto-43.jpg";

const FilterHotels = () => {
  return (
    <div className="hidden md:block bg-white w-[278px] rounded-lg p-2 space-y-5">
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">
          Price
          <span className="text-sm font-normal ml-2">(us 0 - us 500)</span>
        </h1>
        <Slider defaultValue={[83]} max={500} step={1} />
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge variant={"secondary"}>US$0 - US$30</Badge>
          <Badge variant={"secondary"}>US$0 - US$30</Badge>
          <Badge variant={"secondary"}>US$0 - US$30</Badge>
          <Badge variant={"secondary"}>US$0 - US$30</Badge>
          <Badge variant={"secondary"}>US$0 - US$30</Badge>
          <Badge variant={"secondary"}>US$0 - US$30</Badge>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Popular Filters</h1>
        <div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="popular-filter-1" />
            <label
              htmlFor="popular-filter-1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Breakfast Included
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="popular-filter-2" />
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
              Accept terms and conditions
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
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="popular-filter-5" />
            <label
              htmlFor="popular-filter-5"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Star Rating</h1>
        <div className="flex items-center justify-between">
          <Badge
            variant={"secondary"}
            className="px-2 py-1 flex items-center justify-center gap-x-2"
          >
            2 <Star size={18} />
          </Badge>
          <Badge
            variant={"secondary"}
            className="px-2 py-1 flex items-center justify-center gap-x-2"
          >
            3 <Star size={18} />
          </Badge>
          <Badge
            variant={"secondary"}
            className="px-2 py-1 flex items-center justify-center gap-x-2"
          >
            4 <Star size={18} />
          </Badge>
          <Badge
            variant={"secondary"}
            className="px-2 py-1 flex items-center justify-center gap-x-2"
          >
            5 <Star size={18} />
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
        <h1 className="font-bold">Location</h1>
        <RadioGroup defaultValue="location-1" className="pl-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="location-1" />
            <Label htmlFor="location-1">Cairo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="location-2" />
            <Label htmlFor="location-2">Giza</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="location-3" />
            <Label htmlFor="location-3">Minia</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Payment</h1>
        <RadioGroup defaultValue="payment-1" className="pl-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="payment-1" />
            <Label htmlFor="payment-1">Prepay Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="payment-2" />
            <Label htmlFor="payment-2">Pay at Hotel</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Room Facilities & Services</h1>
        <div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="room-facilities-1" />
            <label
              htmlFor="room-facilities-1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Washing Machine
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="room-facilities-2" />
            <label
              htmlFor="room-facilities-2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Kitchen
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="room-facilities-2" />
            <label
              htmlFor="room-facilities-3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Balacony
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4 sticky top-[5rem]">
        <h1 className="font-bold">Recently Viewed</h1>
        <div className="flex">
          <Image
            src={testImage}
            alt=""
            className="object-cover w-[40%] h-full"
          />
          <div className="flex-1 px-2">
            <h1 className="font-bold text-sm">Ramcaly Dubai Hotel</h1>
            <div className="flex items-center gap-x-2">
              <span className="rounded-s-lg rounded-b-lg bg-blue-900 text-white text-[13px] font-medium p-[3px]">
                4.2/5
              </span>
              <p className="text-muted-foreground text-xs font-bold leading-4">
                Very good | 142 Review
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterHotels;
