import { getHotles, getTotalHotelsCount } from "@/actions/actions";
import HotelList from "@/components/HotelList";

async function HotelsPage({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const [hotelsCount, initialFirstPage] = await Promise.all([
    getTotalHotelsCount(searchParams),
    getHotles(searchParams),
  ]);
  return (
    <div className="space-y-1 py-1 max-md:px-2">
      <div className="flex items-center gap-2 rounded-sm bg-blue-500 px-2 py-1 text-sm font-medium md:text-base">
        <span className="text-purple-50">{hotelsCount?.totalHotels}</span>
        <span className="text-purple-200">Hotels Match your Search critiria</span>
      </div>
      <HotelList initialFirstPageHotels={initialFirstPage} />
    </div>
  );
}

export default HotelsPage;
