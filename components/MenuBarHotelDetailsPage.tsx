"use client";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

interface IHelperObject {
  [key: string]: string;
}
const helperObj: IHelperObject = {
  "overview-section": "overview-button",
  "rooms-section": "rooms-button",
  "hotels-nearby-section": "hotels-nearby-button",
  "reviews-section": "reviews-button",
  "nearby-attractions-section": "nearby-attractions-button",
  "amentities-section": "amentities-button",
  "hotel-policy-section": "hotel-policy-button",
};

const MenuBarHotelDetailsPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [menuBarIsSticky, setMenuBarIsSticky] = useState(false);
  const timeOutRef1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeOutRef2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeOutRef3 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeOutRef4 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeOutRef5 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeOutRef6 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeOutRef7 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refs = useMemo(
    () => [
      timeOutRef1,
      timeOutRef2,
      timeOutRef3,
      timeOutRef4,
      timeOutRef5,
      timeOutRef6,
      timeOutRef7,
    ],
    []
  );
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const rec = element.getBoundingClientRect();
    window.scrollBy({ top: rec.top - 44, behavior: "smooth" });
    element.classList.add("border", "border-green-800");
  };

  useEffect(() => {
    console.log("first");
    const handleActiveSection = () => {
      if (window.scrollY >= 204) {
        setMenuBarIsSticky(true);
      } else {
        setMenuBarIsSticky(false);
      }
      if (window.scrollY >= 2017) {
        setActiveSection("hotel-policy-section");
      } else if (window.scrollY >= 1643) {
        setActiveSection("amentities-section");
      } else if (window.scrollY >= 1446) {
        setActiveSection("nearby-attractions-section");
      } else if (window.scrollY >= 1034) {
        setActiveSection("reviews-section");
      } else if (window.scrollY >= 645) {
        setActiveSection("hotels-nearby-section");
      } else if (window.scrollY >= 500) {
        setActiveSection("rooms-section");
      } else if (window.scrollY >= 200) {
        setActiveSection("overview-section");
      } else {
        setActiveSection("");
      }

      const elementIds = Object.keys(helperObj);
      let elements: HTMLElement[] = [];
      for (let index = 0; index < elementIds.length; index++) {
        const getElement = document.getElementById(elementIds[index])!;
        elements.push(getElement);
      }

      elements.forEach((ele, i) => {
        if (refs[i].current) clearTimeout(refs[i].current);
        refs[i].current = setTimeout(() => {
          ele.classList.remove("border", "border-green-800");
        }, 3000);
      });
    };
    document.addEventListener("scroll", handleActiveSection);
    return () => {
      refs.forEach((re) => {
        if (re.current) clearTimeout(re.current);
      });
      document.removeEventListener("scroll", handleActiveSection);
    };
  }, [refs]);

  useEffect(() => {
    const elementId = helperObj[activeSection];
    const element = document.getElementById(elementId);
    if (!element) return;
    element.scrollIntoView({
      inline: "center",
    });
  }, [activeSection]);

  return (
    <div
      className={cn(
        "whitespace-nowrap space-x-4 px-2 overflow-auto scrollbar-none",
        menuBarIsSticky
          ? "bg-[#87b1ff] lg:mx-2"
          : "bg-white rounded-ss-lg rounded-se-lg mx-2"
      )}
    >
      <button
        id="overview-button"
        onClick={() => scrollToElement("overview-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "overview-section" || activeSection === ""
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Overview
      </button>
      <button
        id="rooms-button"
        onClick={() => scrollToElement("rooms-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "rooms-section" ? "border-b-2 border-blue-800" : ""
        )}
      >
        Rooms
      </button>
      <button
        id="hotels-nearby-button"
        onClick={() => scrollToElement("hotels-nearby-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "hotels-nearby-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Hotels Nearby
      </button>
      <button
        id="reviews-button"
        onClick={() => scrollToElement("reviews-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "reviews-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Reviews
      </button>
      <button
        id="nearby-attractions-button"
        onClick={() => scrollToElement("nearby-attractions-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "nearby-attractions-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Nearby Attractions
      </button>
      <button
        id="amentities-button"
        onClick={() => scrollToElement("amentities-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "amentities-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Amentities
      </button>
      <button
        id="hotel-policy-button"
        onClick={() => scrollToElement("hotel-policy-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "hotel-policy-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Hotel Policy
      </button>
    </div>
  );
};

export default MenuBarHotelDetailsPage;
