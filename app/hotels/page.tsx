"use client";
import SearchBox from "@/components/SearchBox";
import HotelsListHeaderSmallScreen from "@/components/HotelsListHeaderSmallScreen";
import HotelDetailCard from "@/components/HotelDetailCard";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import FilterHotels from "@/components/FilterHotels";

const HotelsPage = () => {
  const [color, setColor] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      if (window.scrollY >= 85) {
        setColor(true);
      } else {
        setColor(false);
      }
    };

    document.addEventListener("scroll", handleChange);
    return () => {
      document.removeEventListener("scroll", handleChange);
    };
  }, []);

  return (
    <section>
      <HotelsListHeaderSmallScreen />
      <div
        className={cn(
          "transition-all hidden md:block -mb-[4.2rem] mt-5 sticky top-0 z-[1] pb-1",
          color && "bg-[#623af3]"
        )}
      >
        <div className="w-[90%] lg:w-[85%] max-w-[1200px] mx-auto">
          <SearchBox />
        </div>
      </div>
      <div className="rounded-3xl bg-[#fceeee]">
        <section className="md:w-[90%] lg:w-[85%] max-w-[76.3rem] mx-auto md:flex md:justify-center md:gap-x-4 p-3 md:pt-24 lg:pt-[4rem] lg:mt-10 ">
          <p className="md:hidden text-[13px] font-bold mb-2">
            2671 Hotels Match your Search critiria
          </p>
          <FilterHotels />
          <div className="space-y-2 flex-1">
            <p className="hidden md:block text-sm font-bold text-white tracking-wide px-4 py-1 mb-2 bg-[#4451ff75] rounded-sm">
              2671 Hotels Match your Search critiria
            </p>
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
            <HotelDetailCard />
          </div>
        </section>
      </div>
    </section>
  );
};

export default HotelsPage;
