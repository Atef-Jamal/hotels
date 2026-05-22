"use client";
import { hotelDetailTabs } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState(hotelDetailTabs[0].id);

  const isClickScrolling = useRef(false);

  const handleTabClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    isClickScrolling.current = true;
    setActiveTab(id);

    const yOffset = -64;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    hotelDetailTabs.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isClickScrolling.current) {
            setActiveTab(section.id);
          }
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="scrollbar-none sticky top-0 z-10 flex w-full flex-nowrap overflow-x-auto bg-white md:top-5">
      {hotelDetailTabs.map((section) => (
        <span
          key={section.id}
          onClick={() => handleTabClick(section.id)}
          className={cn(
            "cursor-pointer px-5 py-1 font-semibold text-nowrap",
            activeTab === section.id && "border-b-2 border-b-black md:border-b-[3px]",
          )}
        >
          {section.label}
        </span>
      ))}
    </div>
  );
}
