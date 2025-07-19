import { getHotles, getTotalHotelsCount } from "@/actions/actions";
import HotelList from "./HotelList";

async function Hotels({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const [hotelsCount, initialFirstPage] = await Promise.all([
    getTotalHotelsCount(searchParams),
    getHotles(searchParams),
  ]);
  return (
    <div className="space-y-2">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium md:text-base">
        <span className="text-blue-700">{hotelsCount?.totalHotels}</span>
        <span className="text-zinc-900/90">Hotels Match your Search critiria</span>
      </div>
      <HotelList initialFirstPageHotels={initialFirstPage} />
    </div>
  );
}

export default Hotels;
