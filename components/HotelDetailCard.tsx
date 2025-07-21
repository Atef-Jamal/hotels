import { IHotelWithRoomsReviewsNearbyAttractions } from "@/types/types";
import { BedDouble, BedSingle, MapPin, PlusIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdBreakfastDining } from "react-icons/md";
import { Button } from "./ui/button";

interface IProps {
  hotel: IHotelWithRoomsReviewsNearbyAttractions;
  options: Record<string, string | string[]>;
}

const HotelDetailCard = ({ hotel, options }: IProps) => {
  const nameSlug = hotel.name.replaceAll(" ", "_");

  return (
    <Link
      href={{ pathname: `/hotels/${nameSlug}`, query: options }}
      className="grid grid-cols-1 gap-2 overflow-hidden rounded-md bg-[#fff] p-2 lg:h-64 lg:grid-cols-4"
    >
      <div className="grid h-28 auto-cols-[100%] grid-flow-col gap-x-2 overflow-hidden min-[380px]:auto-cols-[50%] sm:auto-cols-[33.3%] md:auto-cols-[50%] min-[900px]:auto-cols-[33.3%] lg:h-full lg:auto-cols-[100%]">
        <div className="relative bg-gray-500">
          <Image
            src={hotel.images[0]}
            priority={true}
            alt="hotel image"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="relative bg-gray-500">
          <Image
            src={hotel.images[0]}
            priority={true}
            alt="hotel image"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="relative bg-gray-500">
          <Image
            src={hotel.images[0]}
            priority={true}
            alt="hotel image"
            fill={true}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 lg:col-span-3 lg:h-full">
        <div className="flex w-full items-center">
          <p className="flex-1 truncate font-semibold">{hotel.name}</p>
          <span className="flex items-center gap-x-0.5">
            {[...Array(Number(hotel.averageRating.toFixed())).keys()].map((item) => (
              <StarIcon size={15} key={item} fill="#4ce747" color="#57c953" />
            ))}
          </span>
        </div>
        <div className="flex items-center gap-x-3 text-sm font-medium sm:text-base">
          <span className="rounded-b-lg rounded-s-lg bg-blue-800 px-1 py-0.5 text-xs font-semibold text-white">
            {hotel.averageRating} / 5
          </span>
          <span className="leading-3 text-blue-800">
            {hotel.averageRating >= 4.5
              ? "Excellent"
              : hotel.averageRating >= 3.5
                ? "Very Good"
                : hotel.averageRating >= 2.5
                  ? "Good"
                  : "Intermediate"}
          </span>
          <span className="text-muted-foreground"> {hotel.reviews.length} Review</span>
          <button className="ml-auto flex items-center gap-2 rounded-sm bg-[#6a5d99] pl-1 pr-2 text-sm text-white">
            <PlusIcon size={18} className="" /> WhitList
          </button>
        </div>
        <div>
          {hotel.nearbyAttractions.map((item, indx) => (
            <div key={indx} className="flex items-center gap-1">
              <MapPin size={14} />
              <p className="flex-1 truncate text-sm font-thin leading-tight text-black/80 md:text-base">
                {`Near ${item.name} - (${item.distance} meter) - (${item.travelTime})`}
              </p>
              <button className="rounded-sm bg-green-200 px-2 text-xs font-medium sm:px-4 md:py-0.5">
                Map
              </button>
            </div>
          ))}
        </div>
        <div className="relative mx-2 mt-3 rounded-md bg-purple-200 px-3 py-1 md:mt-auto">
          <div className="absolute -top-2 right-3 flex items-center gap-1 text-xs font-thin text-primary-foreground text-white">
            <p className="rounded-[2px] bg-[#63c24be3] px-1 py-0.5">First Booking Deal</p>
            <p className="rounded-[2px] bg-[#ee3f3ff8] px-1 py-0.5">40% Off</p>
          </div>
          <p className="font-medium">{hotel.rooms[0].type} Room</p>
          <div className="flex flex-wrap items-center gap-x-4">
            {hotel.rooms[0].breakfastIncluded && (
              <div className="flex items-center gap-2">
                <MdBreakfastDining size={16} />{" "}
                <span className="text-sm text-black/75">Breakfast Included</span>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-x-4">
              {hotel.rooms[0].beds.map((bed, indx) => (
                <div key={indx} className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(bed.count).keys()].map((num) => {
                      if (bed.type === "Single") return <BedSingle key={num} size={15} />;
                      return <BedDouble key={num} size={15} />;
                    })}
                  </div>

                  <span className="text-sm text-black/75">
                    {bed.count} {bed.type} Beds
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="ml-auto flex items-end gap-1">
              <span className="line-through">390 SAR</span>
              <span className="text-xl font-medium text-blue-700 md:text-2xl">
                {hotel.rooms[0].pricePerNight} SAR
              </span>
            </div>
            <Button size={"sm"} className="w-full bg-blue-700">
              Check Availability
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelDetailCard;
