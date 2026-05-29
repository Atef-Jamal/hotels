import Image from "next/image";
import gamePhoto from "@/public/gamePhoto-43.jpg";
import { MapPin } from "lucide-react";

export default function HotelSliderCard() {
  return (
    <div className="inline-block h-62.5 w-52.5 overflow-hidden rounded-sm">
      <Image src={gamePhoto} priority={true} alt="" className="h-[45%] w-full object-cover" />
      <div className="bg-foreground/5 h-[55%] px-2 py-1">
        <h1 className="truncate font-medium max-md:text-sm">Asia international Hotel</h1>
        <div className="flex gap-x-1">
          <MapPin size={11} className="mt-1" />
          <p className="text-muted-foreground h-9 flex-1 overflow-hidden text-sm text-wrap max-md:text-[10px]">
            No. 365 West Huanshi Road | 4.5 KM From City Center
          </p>
        </div>
        <hr className="my-0.5 bg-black" />
        <p className="h-16.75 overflow-hidden text-sm leading-4 text-wrap max-md:text-xs">
          The Asia International Hotel is located in Guangzhou&apos;s business district along the Huanshi Dong
          Road. Standing with a total height of 180 meters, this is a multifunctional hotel that features with
          deluxe rooms, 14-floor of Grade-A office, different type of Chinese & Western restaurants,
          entertainment and apartments. It is your ideal place for business, convention & exhibition, food &
          beverage, gathering in Guangzhou. The 440 hotel rooms and suites integrate elegance and fashion with
          delicate and simple style.Rooms above 25th floor are completed with high-speed Broadband Internet
          Access. All rooms feature terrific city view.Sky Cafe - Revolving Restaurant The city&apos;s highest
          revolving restaurant, commanding a panoramic view of Guangzhou, features an innovative buffet
          dishes, serves you a romantic dining experience.
        </p>
      </div>
    </div>
  );
}
