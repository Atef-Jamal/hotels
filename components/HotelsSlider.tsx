"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gamePhoto from "@/public/gamePhoto-43.jpg";
import { Button } from "./ui/button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const HotelsSlider = () => {
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative mb-4 lg:w-[900px] mx-auto">
      <Button
        onClick={() => {
          sliderContainerRef.current?.scrollBy({
            left: -258,
            behavior: "smooth",
          });
        }}
        className="bg-[#0e000081] rounded-full absolute left-0 top-[35%] hidden lg:block"
      >
        <ArrowBigLeft />
      </Button>
      <Button
        onClick={() => {
          sliderContainerRef.current?.scrollBy({
            left: 258,
            behavior: "smooth",
          });
        }}
        className="bg-[#0e000081] rounded-full absolute right-0 top-[35%] hidden lg:block"
      >
        <ArrowBigRight />
      </Button>
      <div
        ref={sliderContainerRef}
        className=" flex flex-nowrap gap-x-2 p-2 bg-white rounded-s-xl rounded-e-xl overflow-auto scrollbar-thin sm:scrollbar-none"
      >
        <HotelSliderCard />
        <HotelSliderCard />
      </div>
    </div>
  );
};

export default HotelsSlider;

export const HotelSliderCard = () => {
  return (
    <div className="inline-block w-[210px] h-[250px] rounded-sm overflow-hidden">
      <Image src={gamePhoto} alt="" className="w-full h-[45%] object-cover" />
      <div className="bg-[#fcdfdf] h-[55%] px-2 py-1">
        <h1 className="sm:text-lg font-medium sm:font-[600] truncate">
          Asia international Hotel
        </h1>
        <p className="whitespace-normal mb-2 h-10 leading-4 text-[13px] font-medium text-muted-foreground flex-1 border-white border-b">
          {"This is the Hotel Description as you might say what is it i told Hotel Dksjdh sdkjhjkdh s".slice(
            0,
            70
          ) + "..."}
        </p>
        <p className="whitespace-normal h-10 leading-4 text-[13px] font-medium text-muted-foreground flex-1">
          {"This is the Hotel Description as you might say what is it i told Hotel Dksjdh sdkjhjkdh s".slice(
            0,
            70
          ) + "..."}
        </p>
      </div>
    </div>
  );
};
