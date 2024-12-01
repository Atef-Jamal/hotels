"use client";
import React from "react";
import SearchBox from "./SearchBox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SearchWrapper = () => {
  const [color, setColor] = useState(false);
  const pathname = usePathname();
  const isHotelDetailPage = pathname.startsWith("/hotels/");

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
    <div
      className={cn(
        "transition-all hidden md:block py-1 relative -mb-8",
        !isHotelDetailPage && color && "bg-[#623af3]",
        !isHotelDetailPage && "sticky top-0 z-[1]"
      )}
    >
      <div className="w-[95%] lg:w-[90%] max-w-[1200px] mx-auto">
        <SearchBox />
      </div>
    </div>
  );
};

export default SearchWrapper;
