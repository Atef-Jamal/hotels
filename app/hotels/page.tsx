import FilterHotels from "@/components/FilterHotels";
import Hotels from "@/components/Hotels";
import { Suspense } from "react";

function HotelsPage({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  return (
    <div className="mx-2 flex gap-x-2 lg:gap-x-4">
      <div
        style={{
          height: `calc(100vh - 70px)`,
        }}
        className="sticky top-[5.5rem] hidden w-[280px] overflow-y-auto overflow-x-hidden rounded-lg bg-white p-2 scrollbar-thin md:block"
      >
        <FilterHotels />
      </div>
      <div className="flex-1 pt-2 md:pt-0">
        <Suspense fallback={<p>Loading Hotels List...</p>}>
          <Hotels searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

export default HotelsPage;
