"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function ImageSlider({ images }: { images: string[] }) {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImage, setActiveImage] = useState(0);

  const handlePrev = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // @ts-ignore: Ignoring TypeScript error on the next line
    event.currentTarget.nextElementSibling.disabled = false;

    if (activeImage === 0) {
      event.currentTarget.disabled = true;
      return;
    }
    setActiveImage((prev) => prev - 1);
  };
  const handleNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // @ts-ignore: Ignoring TypeScript error on the next line
    event.currentTarget.previousElementSibling.disabled = false;
    if (activeImage === images.length - 1) {
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
    <div className="scrollbar-none h-44 space-x-2 overflow-x-hidden whitespace-nowrap">
      {images.map((img, index) => {
        return (
          <div
            key={index}
            ref={(ele) => (imageRefs.current[index] = ele as any)}
            className="inline-block h-full w-full"
          >
            <Image
              src={img}
              priority={true}
              width={200}
              height={200}
              alt="hotel image"
              className="h-full w-full object-cover"
            />
          </div>
        );
      })}
      <span className="absolute top-1 right-1 rounded-sm bg-[#0e020263] px-2 text-sm text-white">
        {activeImage + 1} / {images.length}
      </span>
      <button
        onClick={(e) => handlePrev(e)}
        className="absolute top-16 -left-2 rounded-e-sm bg-[#140404af] px-3 py-1 disabled:bg-[#14040463]"
      >
        <ArrowBigLeft color="white" />
      </button>
      <button
        onClick={(e) => handleNext(e)}
        className="absolute top-16 right-0 rounded-s-sm bg-[#140404af] px-3 py-1 disabled:bg-[#14040463]"
      >
        <ArrowBigRight color="white" />
      </button>
      <div className="shadow-custom-shadow2 absolute top-44 left-0 w-full"></div>
    </div>
  );
}
