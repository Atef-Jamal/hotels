import { getDestinations, suggestedLocations } from "@/actions";
import FilterHotels from "@/components/hotels/FilterHotels";
import HotelsListHeaderMobile from "@/components/hotels/HotelsListHeaderMobile";
import SearchBox from "@/components/shared/SearchBox";
import { Suspense } from "react";

export default async function HotelsListingLayout({ children }: { children: React.ReactNode }) {
  const [initialDestinations, initialSuggestedLocations] = await Promise.all([
    getDestinations(),
    suggestedLocations({}),
  ]);
  return (
    <div className="flex flex-1 flex-col md:gap-4">
      <div className="sticky top-5 z-2 mx-2 hidden transition-all md:block">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBox initialDestinations={initialDestinations} />
        </Suspense>
      </div>
      <div className="md:hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <HotelsListHeaderMobile
            initialDestinations={initialDestinations}
            initialSuggestedLocations={initialSuggestedLocations}
          />
        </Suspense>
      </div>

      <div className="flex flex-1 gap-x-2 md:mx-2 lg:gap-x-4">
        <div
          style={{
            height: `calc(100dvh - 70px)`,
          }}
          className="scrollbar-thin sticky top-22 hidden w-70 overflow-x-hidden overflow-y-auto rounded-lg bg-white p-2 md:block"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <FilterHotels initialSuggestedLocations={initialSuggestedLocations} />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
