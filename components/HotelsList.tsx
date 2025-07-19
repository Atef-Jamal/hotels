// "use client";
// import { useState } from "react";
// import { IHotelDoc } from "@/types/types";
// import HotelDetailCard from "./HotelDetailCard";
// import { getHotles } from "@/actions/actions";
// import { useSearchParams } from "next/navigation";

// const HotelsList = ({
//   initialData,
// }: {
//   initialData: { hotels: IHotelDoc[]; hasMore: boolean };
// }) => {
//   const [data, setData] = useState(initialData);
//   const [page, setPage] = useState(2);
//   const searchPramas = useSearchParams();

//   const getMoreHotels = async () => {
//     const newSearchParams = new URLSearchParams(searchPramas.toString());
//     newSearchParams.set("page", page.toString());
//     const obj = Object.fromEntries(newSearchParams.entries()) as any;
//     const response = await getHotles(obj);
//     if (response.success) {
//       setData((prev) => ({
//         hasMore: response.data.hasMore,
//         hotels: [...prev.hotels, ...response.data.hotels],
//       }));
//       setPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <div>
//       {initialData.hotels.map((hotel) => (
//         <HotelDetailCard hotel={hotel} key={hotel._id.toString()} />
//       ))}
//       {initialData.hasMore && (
//         <button onClick={getMoreHotels}>Load more</button>
//       )}
//     </div>
//   );
// };

// export default HotelsList;
