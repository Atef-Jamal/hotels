"use server";
import {
  HotelLocationFindManyArgs,
  HotelWhereInput,
  RoomWhereInput,
} from "@/app/generated/prisma/internal/prismaNamespaceBrowser";

import prisma from "@/lib/prisma";
import { IFilterHotelsSchema, IFilterRoomsSchema } from "@/validation";

export type ISearchItem =
  | {
      type: "property-name";
      name: string;
      country: string;
      city: string;
    }
  | {
      type: "address";
      address: string;
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

export const getHotles = async (args: IFilterHotelsSchema) => {
  const {
    minPrice,
    maxPrice,
    hotelName,
    breakfastIncluded,
    roomServices,
    checkIn,
    checkOut,
    averageRating,
    cancellationPolicy,
    paymentFacilities,
    country,
    city,
    address,
    adults,
    children,
    page,
    bedType,
  } = args;

  const limitPerPage = 5;
  const skip = (page - 1) * limitPerPage;

  if (!hotelName && !country && !city && !address) {
    return { hasMore: false, hotels: [] };
  }

  const roomWhereInput: RoomWhereInput = {
    ...(roomServices ? { roomServices: { hasEvery: roomServices } } : {}),
    ...(bedType ? { beds: { some: { type: bedType } } } : {}),
    ...(adults ? { adults: { gte: adults } } : {}),
    ...(children ? { children: { gte: children } } : {}),
    ...(breakfastIncluded ? { breakfastIncluded: breakfastIncluded } : {}),
    ...(minPrice != null && maxPrice != null ? { pricePerNight: { gte: minPrice, lte: maxPrice } } : {}),
    ...(checkIn && checkOut
      ? { booking: { none: { checkIn: { lt: checkIn }, checkOut: { gt: checkOut } } } }
      : {}),
  };

  const hotelWhereInput: HotelWhereInput = {
    ...(hotelName ? { name: { equals: hotelName } } : {}),
    ...(averageRating ? { averageRating: { gte: averageRating } } : {}),
    ...(cancellationPolicy ? { policy: { cancellationPolicy: cancellationPolicy } } : {}),
    ...(paymentFacilities ? { paymentFacilities: paymentFacilities } : {}),
    ...(country || city || address
      ? {
          location: {
            ...(country ? { country: { equals: country } } : {}),
            ...(city ? { city: { equals: city } } : {}),
            ...(address ? { address: { equals: address } } : {}),
          },
        }
      : {}),
    rooms: {
      some: roomWhereInput,
    },
  };

  const hotels = await prisma.hotel.findMany({
    where: hotelWhereInput,
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
        take: 1,
      },
      policy: true,
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

  const hasMore = limitPerPage === hotels.length;

  return { hotels, hasMore };
};

export const getTotalHotelsCount = async (args: IFilterHotelsSchema) => {
  const {
    address,
    adults,
    averageRating,
    bedType,
    breakfastIncluded,
    cancellationPolicy,
    checkIn,
    checkOut,
    children,
    city,
    country,
    hotelName,
    maxPrice,
    minPrice,
    paymentFacilities,
    roomServices,
  } = args;

  if (!hotelName && !country && !city && !address) {
    return 0;
  }

  const roomWhereInput: RoomWhereInput = {
    ...(roomServices ? { roomServices: { hasEvery: roomServices } } : {}),
    ...(bedType ? { beds: { some: { type: bedType } } } : {}),
    ...(adults ? { adults: { gte: adults } } : {}),
    ...(children ? { children: { gte: children } } : {}),
    ...(breakfastIncluded ? { breakfastIncluded: breakfastIncluded } : {}),
    ...(minPrice != null && maxPrice != null ? { pricePerNight: { gte: minPrice, lte: maxPrice } } : {}),
    ...(checkIn && checkOut
      ? { booking: { none: { checkIn: { lt: checkIn }, checkOut: { gt: checkOut } } } }
      : {}),
  };
  const hotelWhereInput: HotelWhereInput = {
    ...(hotelName ? { name: { equals: hotelName } } : {}),
    ...(averageRating ? { averageRating: { gte: averageRating } } : {}),
    ...(cancellationPolicy ? { policy: { cancellationPolicy: cancellationPolicy } } : {}),
    ...(paymentFacilities ? { paymentFacilities: paymentFacilities } : {}),
    ...(country || city || address
      ? {
          location: {
            ...(country ? { country: { equals: country } } : {}),
            ...(city ? { city: { equals: city } } : {}),
            ...(address ? { address: { equals: address } } : {}),
          },
        }
      : {}),
    rooms: {
      some: roomWhereInput,
    },
  };

  const matchedHotelsCount = await prisma.hotel.count({
    where: hotelWhereInput,
  });

  return matchedHotelsCount;
};

export const getHotelDetails = async (slug: string) => {
  const hotel = await prisma.hotel.findUnique({
    where: {
      slug,
    },
    include: {
      nearbyAttractions: true,
      reviews: true,
    },
  });

  return hotel;
};

export const getPlaces = async ({
  city,
  country,
}: {
  city: IFilterHotelsSchema["city"];
  country: IFilterHotelsSchema["country"];
}) => {
  let query: HotelLocationFindManyArgs = {};

  if (city) {
    query = {
      where: {
        city,
      },
      select: {
        address: true,
      },
      distinct: ["country", "city", "address"],
    };
  } else if (country) {
    query = {
      where: {
        country,
      },
      distinct: ["city"],
      select: {
        city: true,
      },
    };
  } else {
    query = {
      distinct: ["country"],
      select: {
        country: true,
      },
    };
  }

  const distinations = await prisma.hotelLocation.findMany(query);

  const places = distinations.map((item) => {
    if (city) {
      return item.address;
    }
    if (country) {
      return item.city;
    }
    return item.country;
  });
  return places;
};

export const getDistinations = async (searchTerm: string): Promise<ISearchResult> => {
  try {
    const escapeRegex = (param: string) => param.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeInput = escapeRegex(searchTerm);

    if (safeInput.trim() === "") {
      const distinations = await prisma.hotelLocation.findMany({
        distinct: ["country", "city"],
        select: {
          country: true,
          city: true,
        },
        take: 20,
      });

      const countries = [...new Set(distinations.map((i) => i.country))].map((country) => ({
        type: "country",
        country,
      }));
      const cities = distinations.map((i) => ({
        type: "city",
        country: i.country,
        city: i.city,
      }));

      const result = [...countries, ...cities] as ISearchResult;

      return result;
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

    const searchHotelsByAdress = prisma.hotelLocation.findMany({
      where: {
        address: {
          startsWith: safeInput,
          mode: "insensitive",
        },
      },
      distinct: ["address"],
      select: {
        city: true,
        country: true,
        address: true,
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

    const [byCountry, byCity, byByAdress, byName] = await Promise.all([
      searchHotelsByCountry,
      searchHotelsByCity,
      searchHotelsByAdress,
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

    const transformByAdress: ISearchResult = byByAdress.map((hotel) => ({
      type: "address",
      address: hotel.address,
      city: hotel.city,
      country: hotel.country,
    }));

    const transformByHotelName: ISearchResult = byName.map((hotel) => ({
      type: "property-name",
      name: hotel.name,
      city: hotel.location?.city || "",
      country: hotel.location?.country || "",
    }));
    const results: ISearchResult = [
      ...transformByHotelName,
      ...transformByCity,
      ...transformByCountry,
      ...transformByAdress,
    ];

    return results;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const getHotelRooms = async ({
  slug,
  filterRooms,
}: {
  slug: string;
  filterRooms: IFilterRoomsSchema;
}) => {
  const {
    adults,
    checkIn,
    checkOut,
    children,
    page,
    roomServices,
    bedType,
    breakfastIncluded,
    maxPrice,
    minPrice,
  } = filterRooms;

  const limitPerPage = 10;
  const skip = (page - 1) * limitPerPage;

  const roomWhereInput: RoomWhereInput = {
    hotel: {
      slug,
    },
    ...(roomServices ? { roomServices: { hasEvery: roomServices } } : {}),
    ...(bedType ? { beds: { some: { type: bedType } } } : {}),
    ...(adults ? { adults: { gte: adults } } : {}),
    ...(children ? { children: { gte: children } } : {}),
    ...(breakfastIncluded ? { breakfastIncluded: breakfastIncluded } : {}),
    ...(minPrice != null && maxPrice != null ? { pricePerNight: { gte: minPrice, lte: maxPrice } } : {}),
    ...(checkIn && checkOut
      ? { booking: { none: { checkIn: { lt: checkIn }, checkOut: { gt: checkOut } } } }
      : {}),
  };

  const rooms = await prisma.room.findMany({
    where: roomWhereInput,
    include: {
      beds: true,
    },
    take: limitPerPage,
    skip,
    orderBy: {
      id: "asc",
    },
  });

  const hasMore = limitPerPage === rooms.length;

  return { rooms, hasMore };
};

export type IHotelListResponse = Awaited<ReturnType<typeof getHotles>>;

export type IHotelDetailResponse = Awaited<ReturnType<typeof getHotelDetails>>;
export type IHotelRoomsListResponse = Awaited<ReturnType<typeof getHotelRooms>>;
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
