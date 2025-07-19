"use client";
import React from "react";
import SearchBox from "./SearchBox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const SearchWrapper = () => {
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
    <div
      className={cn(
        "sticky top-10 z-[2] hidden -translate-y-10 px-2 py-1 transition-all md:block",
        color && "bg-[#623af3]",
      )}
    >
      <div className="mx-auto max-w-[1200px]">
        <SearchBox />
      </div>
    </div>
  );
};

export default SearchWrapper;
