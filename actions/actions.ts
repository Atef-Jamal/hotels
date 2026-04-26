"use server";
import { HotelWhereInput, RoomWhereInput } from "@/app/generated/prisma/internal/prismaNamespaceBrowser";
import prisma from "@/lib/prisma";
// import Discount from "@/models/discount";
// import Hotel from "@/models/hotel";
// import Room from "@/models/room";
// import { IHotelWithRoomsReviewsNearbyAttractions } from "@/types/types";

type IProps = Record<string, string | string[] | undefined>;

export type ISearchItem =
  | {
      type: "property-name";
      name: string;
      country: string;
      city: string;
    }
  | {
      type: "city";
      city: string;
      country: string;
    }
  | { type: "country"; country: string };

type ISearchResult = ISearchItem[];

export type GetPlacesParams = { city?: string; country?: string };

type GetPlacesFn = (argu: GetPlacesParams) => Promise<string[]>;

export type IHotelListResponse = Awaited<ReturnType<typeof getHotles>>;

export const getHotles = async ({
  minPrice,
  maxPrice,
  hotelName,
  breakfastIncluded,
  roomsCount = "1",
  roomServices,
  checkIn = new Date().toISOString().split("T")[0],
  checkOut = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
  averageRating,
  cancellationPolicy,
  paymentFacilities,
  country,
  city,
  address,
  adults = "1",
  children = "0",
  page = "1",
}: IProps) => {
  try {
    const pageParam = Number(page) || 1;
    const limitPerPage = 10;
    const skip = (pageParam - 1) * limitPerPage;

    if (!hotelName && !country && !city && !address) {
      return { matchedHotelsCount: 0, hotels: [], hasMore: false };
    }

    const hotelWhereInput: HotelWhereInput = {};
    const roomWhereInput: RoomWhereInput = {};

    if (hotelName && typeof hotelName === "string") {
      hotelWhereInput.name = { equals: hotelName };
    } else {
      hotelWhereInput.location = {
        ...(country && typeof country === "string" ? { country: { equals: country } } : {}),
        ...(city && typeof city === "string" ? { city: { equals: city } } : {}),
        ...(address && typeof address === "string" ? { address: { equals: address } } : {}),
      };
    }
    if (averageRating && typeof averageRating === "string") {
      hotelWhereInput.averageRating = { equals: averageRating };
    }
    if (cancellationPolicy && typeof cancellationPolicy === "string") {
      if (cancellationPolicy === "true") {
        hotelWhereInput.policy = { cancellationPolicy: { equals: true } };
      }
      if (cancellationPolicy === "false") {
        hotelWhereInput.policy = { cancellationPolicy: { equals: false } };
      }
    }
    if (paymentFacilities && typeof paymentFacilities === "string") {
      if (paymentFacilities === "Pay_At_Hotel") {
        hotelWhereInput.paymentFacilities = { equals: "Pay_At_Hotel" };
      }
      if (paymentFacilities === "Prepay_Online") {
        hotelWhereInput.paymentFacilities = { equals: "Prepay_Online" };
      }
    }

    if (typeof checkIn === "string" && typeof checkOut === "string") {
      roomWhereInput.booking = {
        none: { checkIn: { lt: new Date(checkOut) }, checkOut: { gt: new Date(checkIn) } },
      };
    }

    if (minPrice && maxPrice) {
      roomWhereInput.pricePerNight = { gte: Number(minPrice), lte: Number(maxPrice) };
    } else if (minPrice) {
      roomWhereInput.pricePerNight = { gte: Number(minPrice) };
    } else if (maxPrice) {
      roomWhereInput.pricePerNight = { lte: Number(maxPrice) };
    }

    if (roomServices) {
      roomWhereInput.roomServices = {
        hasSome: Array.isArray(roomServices) ? roomServices : [roomServices],
      } as any;
    }

    if (breakfastIncluded && typeof breakfastIncluded === "string") {
      if (breakfastIncluded === "true") {
        roomWhereInput.breakfastIncluded = { equals: true };
      }
      if (breakfastIncluded === "false") {
        roomWhereInput.breakfastIncluded = { equals: false };
      }
    }

    if (adults && typeof adults === "string") {
      roomWhereInput.adults = { gte: Number(adults) };
    }

    if (children && typeof children === "string") {
      roomWhereInput.children = { gte: Number(children) };
    }

    const hotels = await prisma.hotel.findMany({
      where: { ...hotelWhereInput, rooms: { some: roomWhereInput } },
      skip: skip,
      take: limitPerPage,
      include: {
        rooms: {
          where: roomWhereInput,
          orderBy: [
            {
              adults: "asc",
            },
            {
              pricePerNight: "asc",
            },
          ],
          select: {
            type: true,
            breakfastIncluded: true,
            beds: true,
            pricePerNight: true,
          },
          ...(roomsCount && typeof roomsCount === "string" ? { take: Number(roomsCount) } : {}),
        },
        nearbyAttractions: {
          take: 80,
          select: { category: true, name: true, distance: true, travelTime: true },
        },
        reviews: {
          take: 10,
        },
        location: true,
      },
    });

    const matchedHotelsCount = await prisma.hotel.count({
      where: { ...hotelWhereInput, rooms: { some: roomWhereInput } },
    });

    // const hotelMatchStage: any = {};

    // const roomMatchStage: any = {};

    // if (!hotelName && !country && !city && !address) {
    //   return { hotels: [], hasMore: false };
    // }

    // if (hotelName) {
    //   hotelMatchStage["name"] = hotelName;
    // } else {
    //   if (country) {
    //     hotelMatchStage["location.country"] = country;
    //   }
    //   if (city) {
    //     hotelMatchStage["location.city"] = city;
    //   }
    //   if (address) {
    //     hotelMatchStage["location.address"] = address;
    //   }
    // }

    // if (averageRating) {
    //   hotelMatchStage["averageRating"] = Number(averageRating);
    // }

    // if (cancellationPolicy) {
    //   if (cancellationPolicy === "true") {
    //     hotelMatchStage["policies.cancellationPolicy"] = true;
    //   }
    //   if (cancellationPolicy === "false") {
    //     hotelMatchStage["policies.cancellationPolicy"] = false;
    //   }
    // }

    // if (paymentFacilities) {
    //   hotelMatchStage["paymentFacilities"] = paymentFacilities;
    // }

    // if (minPrice && maxPrice) {
    //   roomMatchStage["pricePerNight"] = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    // }

    // if (roomServices) {
    //   roomMatchStage["roomServices"] = { $all: Array.isArray(roomServices) ? roomServices : [roomServices] };
    // }

    // if (breakfastIncluded) {
    //   if (breakfastIncluded === "true") {
    //     roomMatchStage["breakfastIncluded"] = true;
    //   }
    //   if (breakfastIncluded === "false") {
    //     roomMatchStage["breakfastIncluded"] = false;
    //   }
    // }

    // if (adults) {
    //   roomMatchStage["capacity.adults"] = { $gte: Number(adults) };
    // }
    // if (children) {
    //   roomMatchStage["capacity.children"] = { $gte: Number(children) };
    // }

    // const findHotels = await Hotel.aggregate([
    //   { $match: hotelMatchStage },
    //   {
    //     $lookup: {
    //       from: "rooms",
    //       localField: "_id",
    //       foreignField: "hotel",
    //       as: "rooms",
    //       pipeline: [
    //         { $match: roomMatchStage },
    //         {
    //           $lookup: {
    //             from: "bookings",
    //             localField: "_id",
    //             foreignField: "roomId",
    //             as: "bookedRoom",
    //             pipeline: [{ $match: { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } } }],
    //           },
    //         },
    //         { $match: { bookedRoom: { $eq: [] } } },
    //         { $sort: { "capacity.adults": 1, pricePerNight: 1 } },
    //         { $limit: Number(roomsCount) },
    //       ],
    //     },
    //   },
    //   { $match: { $expr: { $gte: [{ $size: "$rooms" }, Number(roomsCount)] } } },

    //   {
    //     $lookup: {
    //       from: "nearbyattractions",
    //       // localField: "_id",
    //       // foreignField: "hotel",
    //       as: "nearbyAttractionsData",
    //       pipeline: [
    //         { $limit: 2 },
    //         {
    //           $project: {
    //             category: 1,
    //             name: 1,
    //             distance: 1,
    //             travelTime: 1,
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "reviews",
    //       // localField: "_id",
    //       // foreignField: "hotel",
    //       as: "reviews",
    //       pipeline: [
    //         {
    //           $limit: 10,
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     $project: {
    //       name: 1,
    //       description: 1,
    //       images: 1,
    //       location: 1,
    //       amenities: 1,
    //       averageRating: 1,
    //       paymentFacilities: 1,
    //       policies: 1,
    //       rooms: 1,
    //       nearbyAttractions: "$nearbyAttractionsData",
    //       reviews: 1,
    //       createdAt: 1,
    //     },
    //   },
    //   { $skip: skip },
    //   { $limit: limitPerPage },
    // ]);
    // const hotels = JSON.parse(JSON.stringify(findHotels));

    const hasMore = limitPerPage === hotels.length;

    return { matchedHotelsCount, hotels, hasMore };
  } catch (error) {
    console.log(error);
    throw new Error("can't load hotels list");
  }
};

// interface IParams {
//   params: { hotelName: string };
//   searchParams: Record<string, string | string[]>;
// }

// export const getHotelDetails = async ({ params, searchParams }: IParams) => {
//   const { minPrice, maxPrice, roomServices, breakfastIncluded } = searchParams;
//   const { adults, children, checkIn, checkOut } = searchParams;

//   await connectToDB();
//   const hotelNameSlug = params.hotelName.replaceAll("_", " ");

//   const roomQueryFilter: any = {};

//   if (minPrice && maxPrice) {
//     roomQueryFilter["pricePerNight"] = { $gte: Number(minPrice), $lte: Number(maxPrice) };
//   }

//   if (roomServices) {
//     roomQueryFilter["roomServices"] = { $all: Array.isArray(roomServices) ? roomServices : [roomServices] };
//   }

//   if (breakfastIncluded) {
//     if (breakfastIncluded === "true") {
//       roomQueryFilter["breakfastIncluded"] = true;
//     }
//     if (breakfastIncluded === "false") {
//       roomQueryFilter["breakfastIncluded"] = false;
//     }
//   }

//   if (adults) {
//     roomQueryFilter["capacity.adults"] = { $gte: Number(adults) };
//   }
//   if (children) {
//     roomQueryFilter["capacity.children"] = { $gte: Number(children) };
//   }

//   const hotels: IHotelWithRoomsReviewsNearbyAttractions[] = await Hotel.aggregate([
//     {
//       $match: { name: hotelNameSlug },
//     },
//     {
//       $lookup: {
//         from: "rooms",
//         localField: "_id",
//         foreignField: "hotel",
//         as: "rooms",
//         pipeline: [
//           {
//             $match: roomQueryFilter,
//           },
//           {
//             $lookup: {
//               localField: "_id",
//               foreignField: "roomId",
//               from: "bookings",
//               as: "bookedRoom",
//               pipeline: [{ $match: { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } } }],
//             },
//           },
//           { $match: { bookedRoom: { $eq: [] } } },
//           { $sort: { adults: 1, children: 1 } },
//           { $limit: 10 },
//         ],
//       },
//     },
//     {
//       $lookup: {
//         from: "nearbyattractions",
//         // localField: "_id",
//         // foreignField: "hotel",
//         as: "nearbyAttractions",
//         pipeline: [{ $limit: 80 }],
//       },
//     },
//     {
//       $lookup: {
//         from: "reviews",
//         // localField: "_id",
//         // foreignField: "hotel",
//         as: "reviews",
//         pipeline: [{ $limit: 10 }],
//       },
//     },
//   ]);

//   const hotel: IHotelWithRoomsReviewsNearbyAttractions = JSON.parse(JSON.stringify(hotels[0]));

//   if (!hotel) throw new Error("Hotel not Found");
//   return hotel;
// };

// export const getTotalHotelsCount = async ({
//   minPrice,
//   maxPrice,
//   hotelName,
//   breakfastIncluded,
//   roomsCount = "1",
//   roomServices,
//   checkIn = new Date().toISOString().split("T")[0],
//   checkOut = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
//   averageRating,
//   cancellationPolicy,
//   paymentFacilities,
//   country,
//   city,
//   address,
//   adults = "1",
//   children = "0",
// }: IProps): Promise<{ totalHotels: number }> => {
//   try {
//     await connectToDB();

//     const hotelMatchStage: any = {};
//     const roomMatchStage: any = {};

//     if (!hotelName && !country && !city && !address) {
//       return { totalHotels: 0 };
//     }

//     if (hotelName) {
//       hotelMatchStage["name"] = hotelName;
//     } else {
//       if (country) {
//         hotelMatchStage["location.country"] = country;
//       }
//       if (city) {
//         hotelMatchStage["location.city"] = city;
//       }
//       if (address) {
//         hotelMatchStage["location.address"] = address;
//       }
//     }
//     if (averageRating) {
//       hotelMatchStage["averageRating"] = Number(averageRating);
//     }

//     if (cancellationPolicy) {
//       if (cancellationPolicy === "true") {
//         hotelMatchStage["policies.cancellationPolicy"] = true;
//       }
//       if (cancellationPolicy === "false") {
//         hotelMatchStage["policies.cancellationPolicy"] = false;
//       }
//     }

//     if (paymentFacilities) {
//       hotelMatchStage["paymentFacilities"] = paymentFacilities;
//     }

//     if (minPrice && maxPrice) {
//       roomMatchStage["pricePerNight"] = { $gte: Number(minPrice), $lte: Number(maxPrice) };
//     }

//     if (roomServices) {
//       roomMatchStage["roomServices"] = { $all: Array.isArray(roomServices) ? roomServices : [roomServices] };
//     }

//     if (breakfastIncluded) {
//       if (breakfastIncluded === "true") {
//         roomMatchStage["breakfastIncluded"] = true;
//       }
//       if (breakfastIncluded === "false") {
//         roomMatchStage["breakfastIncluded"] = false;
//       }
//     }

//     if (adults) {
//       roomMatchStage["capacity.adults"] = { $gte: Number(adults) };
//     }
//     if (children) {
//       roomMatchStage["capacity.children"] = { $gte: Number(children) };
//     }
//     const findHotels = await Hotel.aggregate([
//       { $match: hotelMatchStage },
//       {
//         $lookup: {
//           from: "rooms",
//           localField: "_id",
//           foreignField: "hotel",
//           as: "rooms",
//           pipeline: [
//             { $match: roomMatchStage },
//             {
//               $lookup: {
//                 from: "bookings",
//                 localField: "_id",
//                 foreignField: "roomId",
//                 as: "bookedRoom",
//                 pipeline: [{ $match: { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } } }],
//               },
//             },
//             { $match: { bookedRoom: { $eq: [] } } },
//           ],
//         },
//       },
//       { $match: { $expr: { $gte: [{ $size: "$rooms" }, Number(roomsCount)] } } },
//       { $count: "total" },
//     ]);

//     return { totalHotels: findHotels.length > 0 ? findHotels[0].total : 0 };
//   } catch (error) {
//     console.log(error);
//     throw new Error("can't get hotels count");
//   }
// };

export const getPlaces: GetPlacesFn = async ({ city, country }) => {
  // await connectToDB();
  let distinations: any[] = [];
  if (!country && !city) {
    // distinations = await Hotel.find({}).select("location.country");
    distinations = await prisma.hotelLocation.findMany({
      select: {
        country: true,
      },
      distinct: ["country"],
    });
    distinations = distinations.map((i) => i.country);
  }
  if (country && city) {
    // distinations = await Hotel.find({ "location.country": country, "location.city": city }).select(
    //   "location.address",
    // );
    distinations = await prisma.hotelLocation.findMany({
      where: {
        country,
        city,
      },
      select: {
        address: true,
      },
    });
    distinations = distinations.map((i) => i.address);
  }
  if (country) {
    // distinations = await Hotel.find({ "location.country": country }).select("location.city");
    distinations = await prisma.hotelLocation.findMany({
      where: {
        country,
      },
      distinct: ["city"],
      select: {
        city: true,
      },
    });
    distinations = distinations.map((i) => i.city);
  }

  return distinations;
};

export const getDistinations = async (searchTerm: string): Promise<ISearchResult> => {
  try {
    const escapeRegex = (param: string) => param.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeInput = escapeRegex(searchTerm);

    if (safeInput.trim() === "") {
      const countries = await prisma.hotelLocation.findMany({
        distinct: ["country"],
        select: {
          country: true,
        },
      });
      const cities = await prisma.hotelLocation.findMany({
        distinct: ["country", "city"],
        select: {
          country: true,
          city: true,
        },
        take: 10,
      });
      const result = [
        ...countries.map((i) => ({ type: "country", country: i.country })),
        ...cities.map((i) => ({ type: "city", country: i.country, city: i.city })),
      ];

      return result as ISearchResult;
    }

    const searchHotelsByCountry = prisma.hotelLocation.findMany({
      where: {
        country: {
          startsWith: safeInput,
          mode: "insensitive",
        },
      },
      distinct: ["country"],
      select: {
        country: true,
      },
      take: 2,
    });

    const searchHotelsByCity = prisma.hotelLocation.findMany({
      where: {
        city: {
          startsWith: safeInput,
          mode: "insensitive",
        },
      },
      distinct: ["city"],
      select: {
        city: true,
        country: true,
      },
      take: 2,
    });

    const searchHotelsByName = prisma.hotel.findMany({
      where: {
        name: {
          startsWith: safeInput,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
        location: {
          select: {
            city: true,
            country: true,
          },
        },
      },
      take: 5,
    });

    const [byCountry, byCity, byName] = await Promise.all([
      searchHotelsByCountry,
      searchHotelsByCity,
      searchHotelsByName,
    ]);

    const transformByCountry: ISearchResult = byCountry.map((hotel) => ({
      type: "country",
      country: hotel.country,
    }));

    const transformByCity: ISearchResult = byCity.map((hotel) => ({
      type: "city",
      city: hotel.city,
      country: hotel.country,
    }));

    const transformByHotelName: ISearchResult = byName.map((hotel) => ({
      type: "property-name",
      name: hotel.name,
      city: hotel.location?.city || "",
      country: hotel.location?.country || "",
    }));
    const results: ISearchResult = [...transformByHotelName, ...transformByCity, ...transformByCountry];

    return results;
  } catch (error) {
    console.log(error);
    throw new Error("can not load distinations");
  }
};

// type IPromoCodeSuccess = { status: "success"; newPrice: number };
// type IPromoCodeFail = { status: "error"; message: string };
// type IPromoCodeResult = IPromoCodeSuccess | IPromoCodeFail;

// export const applyPromoCod = async ({
//   roomId,
//   discountId,
//   promoCode,
// }: {
//   roomId: string;
//   discountId: string | null;
//   promoCode: string;
// }): Promise<IPromoCodeResult> => {
//   try {
//     const discount = await Discount.findById(discountId);
//     if (!discount || discount.type !== "promo-code")
//       return { status: "error", message: "discount not found" };

//     const isExpired = new Date(discount.expiredAt) <= new Date();

//     if (isExpired) return { status: "error", message: "discount Expired" };

//     const correctPromoCode = discount.code === promoCode;

//     if (!correctPromoCode) return { status: "error", message: "Wrong promo code !" };

//     const room = await Room.findById(roomId);
//     if (!room) return { status: "error", message: "room not found" };

//     let newPrice = room.pricePerNight;

//     if (discount.amount.type === "percentage") {
//       newPrice = Math.max(0, newPrice - newPrice * (discount.amount.amount / 100));
//     }

//     if (discount.amount.type === "fixed") {
//       newPrice = Math.max(0, newPrice - discount.amount.amount);
//     }

//     return { status: "success", newPrice };
//   } catch (error) {
//     return { status: "error", message: "can not apply discount" };
//   }
// };
