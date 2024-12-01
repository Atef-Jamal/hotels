// "use client";
import HotelDetailCard from "@/components/HotelDetailCard";
import FilterHotels from "@/components/FilterHotels";
// import { useEffect } from "react";
import { getHotles } from "@/actions/actions";
// import { useSearchParams } from "next/navigation";

const HotelsPage = async ({ searchParams }: { searchParams: any }) => {
  const hotels = await getHotles({ destination: searchParams.destination });
  // const searchParams = useSearchParams()
  // const destination = searchParams.get("destination")
  // const gusts = searchParams.get("checkin-date")
  // const checkInDate = searchParams.get("checkin-date")
  // const checkOutDate = searchParams.get("checkout-date")

  // useEffect(() => {
  //   const fetchHotels = async () => {
  //     await getHotles()
  //   }
  //   fetchHotels()
  // }, []);

  return (
    <section className="md:flex md:justify-center md:gap-x-4 p-3">
      <p className="md:hidden text-[13px] font-bold mb-2">
        2671 Hotels Match your Search critiria
      </p>
      <FilterHotels />
      <div className="space-y-2 flex-1">
        <p className="hidden md:block text-sm font-bold text-white tracking-wide px-4 py-1 mb-2 bg-[#4451ff75] rounded-sm">
          2671 Hotels Match your Search critiria
        </p>
        {hotels.map((hotel, i) => (
          <HotelDetailCard hotel={hotel} key={i} />
        ))}
      </div>
    </section>
  );
};

export default HotelsPage;
