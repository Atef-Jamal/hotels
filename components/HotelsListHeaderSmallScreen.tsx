import { ArrowDown, SearchIcon } from "lucide-react";
import React from "react";

const HotelsListHeaderSmallScreen = () => {
  return (
    <header className="py-1 md:hidden sticky top-0 z-[1] bg-[#623af3]">
      <div className="flex items-center justify-between mb-2 mx-3 py-1 px-3 bg-white rounded-sm">
        <div>
          <p className="text-[13px] font-bold">Dubai, Untited Arab Emirates</p>
          <p className="text-[13px] font-medium">Aug 15 - Aug 16 | 2 Adults</p>
        </div>
        <SearchIcon />
      </div>
      <div className="w-screen px-3 flex flex-nowrap gap-x-2 overflow-auto scrollbar-thin">
        <button className="flex items-center justify-center py-[3px] px-[6px] font-bold rounded-sm text-[13px] bg-white text-blue-950">
          Filter
          <ArrowDown size={18} className="ml-1 min-w-fit" />
        </button>
        <button className="flex items-center justify-center py-[3px] px-[6px] font-bold rounded-sm text-[13px] bg-white text-blue-950">
          Location
          <ArrowDown size={18} className="ml-1 min-w-fit" />
        </button>
        <button className="flex items-center justify-center py-[3px] px-[6px] font-bold rounded-sm text-[13px] bg-white text-blue-950">
          Sort
          <ArrowDown size={18} className="ml-1 min-w-fit" />
        </button>

        <span className="py-[3px] px-[6px] min-w-fit rounded-sm text-[13px] bg-[#daeeff3b] text-white font-normal">
          Breakfast Included
        </span>
        <span className="py-[3px] px-[6px] min-w-fit rounded-sm text-sm bg-[#daeeff3b] text-white font-normal">
          Free Cancellation
        </span>
      </div>
    </header>
  );
};

export default HotelsListHeaderSmallScreen;
