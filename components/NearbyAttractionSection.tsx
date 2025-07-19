"use client";
import { cn } from "@/lib/utils";
import { INearbyAttraction, INearbyAttractionCategory } from "@/types/types";
import React, { useState } from "react";
import { MdAttractions } from "react-icons/md";

function NearbyAttractionSection({ attractions }: { attractions: INearbyAttraction[] }) {
  const tabs = [...new Set([...attractions.map((item) => item.category)])];
  const [activeTab, setActiveTab] = useState<INearbyAttractionCategory>(tabs[0]);
  const activeAttractionsList = attractions.filter((attraction) => attraction.category === activeTab);

  return (
    <div className="space-y-4 p-2 md:p-4">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        {tabs.map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-sm px-4 py-[2px] text-sm font-medium",
              activeTab === tab ? "bg-zinc-600 text-white" : "bg-zinc-200 text-black",
            )}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5">
        {activeAttractionsList.map((attraction, indx) => (
          <div key={indx} className="flex items-center gap-x-2">
            <MdAttractions size={20} />
            <span className="truncate font-medium text-muted-foreground">{attraction.name}</span>
            <span className="ml-auto truncate bg-[#d1cece] px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {attraction.travelTime}
            </span>
            <span className="whitespace-nowrap text-xs font-medium">{attraction.distance} KM</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearbyAttractionSection;
