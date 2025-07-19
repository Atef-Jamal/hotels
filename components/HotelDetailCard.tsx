// import { IOptions } from "@/context/context";
import { IHotelWithRoomsReviewsNearbyAttractions } from "@/types/types";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdBreakfastDining, MdFreeCancellation } from "react-icons/md";

interface IProps {
  hotel: IHotelWithRoomsReviewsNearbyAttractions;
  options: Record<string, string | string[]>;
}

const HotelDetailCard = ({ hotel, options }: IProps) => {
  const nameSlug = hotel.name.replaceAll(" ", "_");

  return (
    <Link
      href={{ pathname: `/hotels/${nameSlug}`, query: options }}
      className="flex h-[11rem] items-center justify-center overflow-hidden rounded-md bg-[#fff] md:h-[12rem]"
    >
      <Image
        src={hotel.images[0]}
        priority={true}
        alt="hotel image"
        height={100}
        width={300}
        className="h-full w-[7rem] bg-gray-500 object-cover lg:w-[15rem]"
      />
      <div className="flex h-full flex-1 flex-col gap-y-1 overflow-hidden border p-1">
        <div className="leading-tigh flex flex-wrap gap-x-1 font-semibold">
          <p className="max-w-[210px] truncate text-base leading-4 sm:max-w-max lg:text-lg">{hotel.name}</p>
          <span className="flex items-center gap-x-0.5">
            {[...Array(Number(hotel.averageRating.toFixed())).keys()].map((item) => (
              <StarIcon size={10} key={item} fill="#b3e04a" color="#b3e04a" />
            ))}
          </span>
        </div>
        <div className="flex items-center gap-x-1 text-sm sm:text-base sm:font-medium">
          <span className="rounded-b-lg rounded-s-lg bg-blue-800 px-1 py-0.5 text-xs text-white">
            {hotel.averageRating}/5
          </span>
          <span className="leading-3 text-blue-800">
            {hotel.averageRating >= 4.5
              ? "Excellent"
              : hotel.averageRating >= 3.5
                ? "Very Good"
                : hotel.averageRating >= 2.5
                  ? "Good"
                  : "Intermediate"}
            <span className="mx-1">|</span>
            <span className="text-muted-foreground"> {hotel.reviews.length} Review</span>
          </span>
        </div>
        <p className="max-h-7 overflow-hidden text-xs font-thin leading-tight text-muted-foreground md:text-base">
          {hotel.nearbyAttractions.map((item) => `${item.name} (${item.distance} meter)`).join(" . ")}
        </p>
        <div className="mt-auto space-y-1">
          <div className="flex items-center gap-x-1">
            <small className="ml-auto rounded-[1px] bg-[#e0d0d0a6] px-1 py-0.5 text-xs font-thin text-primary-foreground text-red-900 md:text-sm">
              First Booking Deal
            </small>
            <small className="rounded-[1px] bg-[#ee3f3ff8] px-1 py-0.5 text-xs font-thin text-primary-foreground text-white md:text-sm">
              40% Off
            </small>
          </div>
          <div className="flex bg-gradient-to-r from-[#ebebeb] to-[#fff]">
            <div className="hidden px-2 py-1 font-thin md:block">
              <p className="font-medium leading-5">{hotel.rooms[0].type} Room</p>
              <div className="flex flex-wrap items-center gap-x-2">
                {hotel.rooms[0].breakfastIncluded && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MdBreakfastDining size={15} /> <p>Breakfast Included</p>
                  </div>
                )}
                {!hotel.rooms[0].breakfastIncluded && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MdBreakfastDining size={15} /> <p>Breakfast Not Included</p>
                  </div>
                )}
                {hotel.policies.cancellationPolicy && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MdFreeCancellation size={15} /> <p>Free Cancellation</p>
                  </div>
                )}
                {!hotel.policies.cancellationPolicy && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MdFreeCancellation size={15} /> <p>Not Free Cancellation</p>
                  </div>
                )}
              </div>
            </div>
            <div className="ml-auto flex-1">
              <div className="flex items-end justify-end gap-x-1 text-blue-700">
                <span className="mr-1 text-nowrap font-thin text-zinc-800 line-through md:text-xl">
                  SAR 313
                </span>
                <span className="flex items-end text-nowrap text-base font-medium md:text-lg">
                  <span className="font-medium md:text-xl">SAR</span>
                  <span className="ml-1 text-xl font-semibold md:text-2xl">
                    {hotel.rooms[0].pricePerNight}
                  </span>
                </span>
              </div>

              <button className="my-1 w-full text-nowrap rounded-sm bg-blue-700 px-3 py-1 text-sm font-medium text-white md:text-base">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelDetailCard;
