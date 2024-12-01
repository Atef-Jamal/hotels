"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import testImage from "@/public/gamePhoto-43.jpg";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const ImageSlider = () => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const imagesNum = 10;

  const handlePrev = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // @ts-ignore: Ignoring TypeScript error on the next line
    event.currentTarget.nextElementSibling.disabled = false;

    if (activeImage === 0) {
      event.currentTarget.disabled = true;
      return;
    }
    setActiveImage((prev) => prev - 1);
  };
  const handleNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // @ts-ignore: Ignoring TypeScript error on the next line
    event.currentTarget.previousElementSibling.disabled = false;
    if (activeImage === imagesNum - 1) {
      event.currentTarget.disabled = true;
    } else {
      setActiveImage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    imageRefs.current[activeImage]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }, [activeImage]);

  return (
    <div className="sm:hidden h-44 whitespace-nowrap overflow-x-hidden scrollbar-none space-x-2">
      {[...Array(imagesNum).keys()].map((_, index) => {
        return (
          <div
            ref={(ele) => (imageRefs.current[index] = ele as any)}
            key={index}
            className="inline-block h-full w-full"
          >
            <Image
              src={testImage}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        );
      })}
      <span className="absolute top-1 right-1 rounded-sm px-2 text-white text-sm bg-[#0e020263]">
        {activeImage + 1} / {imagesNum}
      </span>
      <button
        onClick={(e) => handlePrev(e)}
        className="py-1 px-3 absolute -left-1 top-16 bg-[#140404af] disabled:bg-[#14040463] rounded-e-sm"
      >
        <ArrowBigLeft color="white" />
      </button>
      <button
        onClick={(e) => handleNext(e)}
        className="py-1 px-3 absolute right-0 top-16 bg-[#140404af] disabled:bg-[#14040463] rounded-s-sm"
      >
        <ArrowBigRight color="white" />
      </button>
      <div className="absolute top-44 left-0 w-full shadow-custom-shadow2"></div>
    </div>
  );
};

export default ImageSlider;
