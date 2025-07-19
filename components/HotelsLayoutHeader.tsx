"use client";
import { useEffect, useState } from "react";
import HotelsListHeaderSmallScreen from "./HotelsListHeaderSmallScreen";
import SearchBox from "./SearchBox";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function HotelsLayoutHeader() {
  const [color, setColor] = useState(false);
  const pathname = usePathname();
  const isHotelListPage = pathname === "/hotels";

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
    <>
      <div
        className={cn(
          "hidden -translate-y-10 px-2 py-1 transition-all md:block",
          color && "bg-[#623af3]",
          isHotelListPage && "sticky top-10 z-[2]",
        )}
      >
        <div className="mx-auto max-w-[1186px]">
          <SearchBox />
        </div>
      </div>
      {isHotelListPage && (
        <div className="md:hidden">
          <HotelsListHeaderSmallScreen />
        </div>
      )}
    </>
  );
}

export default HotelsLayoutHeader;
