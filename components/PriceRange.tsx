// import { useQueryParams } from "@/hooks/useQueryParams";
// import { useState, useEffect, useRef } from "react";
// import RcSlider from "rc-slider";
// import "rc-slider/assets/index.css";
// import { Button } from "./ui/button";
// import { priceRanges } from "@/constants/constants";

// const PriceRange = () => {
//   const { queryParams, updateQueryParams } = useQueryParams();
//   const timeoutRef = useRef<NodeJS.Timeout>();

//   const [minMaxPrice, setMinMaxPrice] = useState({
//     min: queryParams.minPrice,
//     max: queryParams.maxPrice,
//   });

//   const handlePriceChange = (value: number | number[]) => {
//     if (Array.isArray(value)) {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//       timeoutRef.current = setTimeout(() => {
//         setMinMaxPrice({
//           min: value[0],
//           max: value[1],
//         });
//       }, 500);
//     }
//   };

//   //   useEffect(() => {
//   //     if (minMaxPrice.min && minMaxPrice.max) {
//   //       updateQueryParams([
//   //         { method: "set", key: "minPrice", value: minMaxPrice.min.toString() },
//   //         { method: "set", key: "maxPrice", value: minMaxPrice.max.toString() },
//   //       ]);
//   //     }
//   //     console.log("first");
//   //     return () => {
//   //       if (timeoutRef.current) {
//   //         clearTimeout(timeoutRef.current);
//   //       }
//   //     };
//   //   }, [minMaxPrice, updateQueryParams]);
//   return (
//     <div>
//       <div className="flex items-center gap-5 text-blue-700">
//         <span className="font-medium">SAR {minMaxPrice.min}</span>
//         <span className="h-0.5 w-8 bg-blue-700"></span>
//         <span className="font-medium">SAR {minMaxPrice.max}</span>
//       </div>
//       <RcSlider
//         id="atef"
//         range
//         min={0}
//         max={700}
//         step={1}
//         defaultValue={minMaxPrice.min && minMaxPrice.max ? [minMaxPrice.min, minMaxPrice.max] : undefined}
//         onChange={handlePriceChange}
//         styles={{
//           track: { background: "blue" },
//           handle: { background: "blue" },
//         }}
//       />
//       <div className="grid grid-cols-2 gap-x-1 gap-y-2">
//         {priceRanges.map((range) => (
//           <Button
//             key={range.max}
//             onClick={() => {
//               updateQueryParams([
//                 { method: "set", key: "minPrice", value: range.min.toString() },
//                 { method: "set", key: "maxPrice", value: range.max.toString() },
//               ]);
//             }}
//             size={"sm"}
//             className="text-blue-700"
//             variant={"secondary"}
//           >
//             {range.label}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PriceRange;
