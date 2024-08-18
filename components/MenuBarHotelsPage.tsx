"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface IHelperObject {
  [key: string]: string;
}
const helperObj: IHelperObject = {
  "hotel-detail-page-overview-section": "overview-button",
  "hotel-detail-page-rooms-section": "rooms-button",
  "hotel-detail-page-hotels-nearby-section": "hotels-nearby-button",
  "hotel-detail-page-reviews-section": "reviews-button",
  "hotel-detail-page-nearby-attractions-section": "nearby-attractions-button",
  "hotel-detail-page-amentities-section": "amentities-button",
  "hotel-detail-page-hotel-policy-section": "hotel-policy-button",
};

const MenuBarHotelsPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [menuBarIsSticky, setMenuBarIsSticky] = useState(false);

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.scrollIntoView({
      block: "center",
    });

    setTimeout(() => {
      setActiveSection(elementId);
    }, 200);

    element.classList.add("border", "border-green-800");

    const handleCleanBorder = () => {
      setTimeout(() => {
        element.classList.remove("border", "border-green-800");
      }, 3000);
      document.removeEventListener("scroll", handleCleanBorder);
    };

    document.addEventListener("scroll", handleCleanBorder);
  };

  useEffect(() => {
    const handleActiveSection = () => {
      if (window.scrollY >= 204) {
        setMenuBarIsSticky(true);
      } else {
        setMenuBarIsSticky(false);
      }
      if (window.scrollY >= 2017) {
        setActiveSection("hotel-detail-page-hotel-policy-section");
      } else if (window.scrollY >= 1643) {
        setActiveSection("hotel-detail-page-amentities-section");
      } else if (window.scrollY >= 1446) {
        setActiveSection("hotel-detail-page-nearby-attractions-section");
      } else if (window.scrollY >= 1034) {
        setActiveSection("hotel-detail-page-reviews-section");
      } else if (window.scrollY >= 645) {
        setActiveSection("hotel-detail-page-hotels-nearby-section");
      } else if (window.scrollY >= 500) {
        setActiveSection("hotel-detail-page-rooms-section");
      } else if (window.scrollY >= 200) {
        setActiveSection("hotel-detail-page-overview-section");
      } else {
        setActiveSection("");
      }
    };
    document.addEventListener("scroll", handleActiveSection);
    return () => document.removeEventListener("scroll", handleActiveSection);
  }, []);

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
        "-mt-5 sticky left-0 top-0 z-[10] whitespace-nowrap space-x-4 px-2 rounded-ss-lg rounded-se-lg overflow-auto scrollbar-none bg-white",
        menuBarIsSticky ? "bg-[#87b1ff]" : "mx-3"
      )}
    >
      <button
        id="overview-button"
        onClick={() => scrollToElement("hotel-detail-page-overview-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "hotel-detail-page-overview-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Overview
      </button>
      <button
        id="rooms-button"
        onClick={() => scrollToElement("hotel-detail-page-rooms-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "hotel-detail-page-rooms-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Rooms
      </button>
      <button
        id="hotels-nearby-button"
        onClick={() =>
          scrollToElement("hotel-detail-page-hotels-nearby-section")
        }
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "hotel-detail-page-hotels-nearby-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Hotels Nearby
      </button>
      <button
        id="reviews-button"
        onClick={() => scrollToElement("hotel-detail-page-reviews-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "hotel-detail-page-reviews-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Reviews
      </button>
      <button
        id="nearby-attractions-button"
        onClick={() =>
          scrollToElement("hotel-detail-page-nearby-attractions-section")
        }
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "hotel-detail-page-nearby-attractions-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Nearby Attractions
      </button>
      <button
        id="amentities-button"
        onClick={() => scrollToElement("hotel-detail-page-amentities-section")}
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "hotel-detail-page-amentities-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Amentities
      </button>
      <button
        id="hotel-policy-button"
        onClick={() =>
          scrollToElement("hotel-detail-page-hotel-policy-section")
        }
        className={cn(
          "inline-block font-bold text-sm py-2",
          activeSection === "hotel-detail-page-hotel-policy-section"
            ? "border-b-2 border-blue-800"
            : ""
        )}
      >
        Hotel Policy
      </button>
    </div>
  );
};

export default MenuBarHotelsPage;
