import HotelsListHeaderSmallScreen from "@/components/HotelsListHeaderSmallScreen";
import SearchWrapper from "@/components/SearchWrapper";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HotelsListHeaderSmallScreen />
      <SearchWrapper />
      <div className="bg-[#fceeee] rounded-3xl md:pt-10 lg:pt-14">
        <div className="md:w-[95%] lg:w-[90%] max-w-[1200px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
