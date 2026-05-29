"use client";
import { BedDouble, BedSingle, Check, MapPin, PlusIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { IHotelListResponse } from "@/types";
import { Badge } from "../ui/badge";

interface IProps {
  hotel: IHotelListResponse["hotels"][0];
}

export default function HotelDetailCard({ hotel }: IProps) {
  const searchParams = useSearchParams();

  return (
    <Link
      href={`/hotels/${hotel.slug}?${searchParams.toString()}`}
      className="grid grid-cols-1 gap-2 overflow-hidden rounded-md bg-white p-2 lg:h-64 lg:grid-cols-4"
    >
      <div className="grid h-28 auto-cols-[100%] grid-flow-col gap-x-2 overflow-hidden min-[380px]:auto-cols-[50%] min-[900px]:auto-cols-[33.3%] sm:auto-cols-[33.3%] md:auto-cols-[50%] lg:h-full lg:auto-cols-[100%]">
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
          <p className="flex-1 truncate font-semibold text-blue-700">{hotel.name}</p>
          <span className="flex items-center gap-x-0.5">
            {[...Array(Math.floor(hotel.averageRating)).keys()].map((item) => {
              return <StarIcon size={15} key={item} fill="#4ce747" color="#57c953" />;
            })}
          </span>
        </div>
        <div className="flex items-center gap-x-3 text-sm md:font-medium">
          <span className="rounded-s-lg rounded-b-lg bg-blue-800 px-1 py-0.5 text-xs text-white md:font-semibold">
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
          <Button size="xs" className="ml-auto flex items-center gap-2 rounded-sm bg-blue-600 text-gray-100">
            <PlusIcon size={18} /> WhitList
          </Button>
        </div>

        <div>
          {hotel.nearbyAttractions.map((item, indx) => (
            <div key={indx} className="flex items-center gap-1">
              <MapPin size={14} />
              <p className="flex-1 truncate text-sm leading-tight font-thin text-black/80 md:text-base">
                {`Near ${item.name} - (${item.distance} meter) - (${item.travelTime})`}
              </p>
              <button className="rounded-sm bg-green-200 px-2 text-xs font-medium sm:px-4 md:py-0.5">
                Map
              </button>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <p className="text-muted-foreground flex-1 truncate text-xs leading-tight md:text-sm">
              {`Near aribort - (256 meter) - (5 mins)`}
            </p>
            <Badge variant={"secondary"} className="rounded-xs text-xs font-medium">
              Map
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <p className="text-muted-foreground flex-1 truncate text-xs leading-tight md:text-sm">
              {`Near aribort - (256 meter) - (5 mins)`}
            </p>
            <Badge variant={"secondary"} className="rounded-xs text-xs font-medium">
              Map
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <p className="text-muted-foreground flex-1 truncate text-xs leading-tight md:text-sm">
              {`Near aribort - (256 meter) - (5 mins)`}
            </p>
            <Badge variant={"secondary"} className="rounded-xs text-xs font-medium">
              Map
            </Badge>
          </div>
        </div>
        <div className="relative mx-2 mt-3 rounded-md bg-purple-200 px-3 py-1 md:mt-auto">
          <div className="font- absolute -top-2 right-3 flex items-center gap-1 text-xs text-white">
            <p className="rounded-xs bg-[#63c24be3] px-1">First Booking Deal</p>
            <p className="rounded-xs bg-[#ee3f3ff8] px-1">40% Off</p>
          </div>
          <p className="text-sm font-medium text-blue-700">{hotel.rooms[0].type} Room</p>
          <div className="flex flex-wrap items-center gap-x-4">
            {hotel.rooms[0].breakfastIncluded && (
              <div className="flex items-center gap-2">
                <Check size={13} />
                <span className="text-xs font-medium text-green-800">Breakfast Included</span>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-x-4">
              {hotel.rooms[0].beds.map((bed, indx) => (
                <div key={indx} className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(bed.count).keys()].map((num) => {
                      if (bed.type === "Single") return <BedSingle key={num} size={15} />;
                      return <BedDouble key={num} size={13} />;
                    })}
                  </div>

                  <span className="text-xs font-medium text-green-800">
                    {bed.count} {bed.type} Beds
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="item-center mt-2 flex justify-between gap-x-4">
            <Button size={"sm"} className="flex-1 rounded-sm bg-blue-700">
              Check Availability
            </Button>
            <div className="ml-auto flex items-end gap-1">
              <span className="text-sm line-through">$390</span>
              <span className="text-lg font-medium text-blue-700 md:text-xl">
                ${hotel.rooms[0].pricePerNight / 100}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
