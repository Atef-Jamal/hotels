import FilterHotels from "@/components/FilterHotels";
import HotelsListHeaderSmallScreen from "@/components/HotelsListHeaderSmallScreen";
import SearchBox from "@/components/SearchBox";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col md:gap-4">
      <div className="sticky top-5 z-[2] mx-2 hidden transition-all md:block">
        <SearchBox />
      </div>
      <div className="md:hidden">
        <HotelsListHeaderSmallScreen />
      </div>

      <div className="flex flex-1 gap-x-2 md:mx-2 lg:gap-x-4">
        <div
          style={{
            height: `calc(100dvh - 70px)`,
          }}
          className="sticky top-[5.5rem] hidden w-[280px] overflow-y-auto overflow-x-hidden rounded-lg bg-white p-2 scrollbar-thin md:block"
        >
          <FilterHotels />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
