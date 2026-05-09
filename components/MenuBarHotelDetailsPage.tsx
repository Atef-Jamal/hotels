"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const MenuBarHotelDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const tabsContainer = useRef<HTMLDivElement>(null);

  const handleClick = (arg: string) => {
    setActiveTab(arg);
    const section = document.getElementById(arg);
    if (section) {
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset - 40;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px",
      threshold: 0.7,
    };
    // let timeOutId: NodeJS.Timeout;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          const tabElement = document.getElementById(`${id}-tab`);
          if (id && tabElement) {
            if (tabsContainer.current) {
              const containerWidth = tabsContainer.current.offsetWidth;
              const tabLeft = tabElement.offsetLeft;
              const tabWidth = tabElement.offsetWidth;
              const scrollTo = tabLeft - containerWidth / 2 + tabWidth / 2;

              tabsContainer.current.scrollTo({
                left: scrollTo,
                behavior: "smooth",
              });
            }
            setActiveTab(id);
          }
        }
      });
    }, options);

    const section1 = document.getElementById("overview");
    const section2 = document.getElementById("rooms");
    const section3 = document.getElementById("nearby-attractions");
    const section4 = document.getElementById("policies");
    const section5 = document.getElementById("reviews");
    const section6 = document.getElementById("hotels-nearby");
    const sections = [section1, section2, section3, section4, section5, section6];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div
      ref={tabsContainer}
      className="scrollbar-none sticky top-0 z-10 flex w-full flex-nowrap overflow-x-auto bg-white md:top-5"
    >
      <span
        id="overview-tab"
        onClick={() => handleClick("overview")}
        className={cn(
          "cursor-pointer px-5 py-2 font-semibold md:text-lg",
          activeTab === "overview" && "border-b-2 border-b-black md:border-b-[3px]",
        )}
      >
        Overview
      </span>
      <span
        id="rooms-tab"
        onClick={() => handleClick("rooms")}
        className={cn(
          "cursor-pointer px-5 py-2 font-semibold md:text-lg",
          activeTab === "rooms" && "border-b-2 border-b-black md:border-b-[3px]",
        )}
      >
        Rooms
      </span>
      <span
        id="nearby-attractions-tab"
        onClick={() => handleClick("nearby-attractions")}
        className={cn(
          "cursor-pointer px-5 py-2 font-semibold text-nowrap md:text-lg",
          activeTab === "nearby-attractions" && "border-b-2 border-b-black md:border-b-[3px]",
        )}
      >
        Nearby Attractions
      </span>
      <span
        id="reviews-tab"
        onClick={() => handleClick("reviews")}
        className={cn(
          "cursor-pointer px-5 py-2 font-semibold text-nowrap md:text-lg",
          activeTab === "reviews" && "border-b-2 border-b-black md:border-b-[3px]",
        )}
      >
        Reviews
      </span>
      <span
        id="hotels-nearby-tab"
        onClick={() => handleClick("hotels-nearby")}
        className={cn(
          "cursor-pointer px-5 py-2 font-semibold text-nowrap md:text-lg",
          activeTab === "hotels-nearby" && "border-b-2 border-b-black md:border-b-[3px]",
        )}
      >
        Hotels Nearby
      </span>
      <span
        id="policies-tab"
        onClick={() => handleClick("policies")}
        className={cn(
          "cursor-pointer px-5 py-2 font-semibold md:text-lg",
          activeTab === "policies" && "border-b-2 border-b-black md:border-b-[3px]",
        )}
      >
        Policies
      </span>
    </div>
  );
};

export default MenuBarHotelDetailsPage;
