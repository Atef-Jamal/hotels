"use server";
import {
  HotelLocationFindManyArgs,
  HotelWhereInput,
  RoomWhereInput,
} from "@/app/generated/prisma/internal/prismaNamespaceBrowser";
import { ISearchData } from "@/context/searchProvider";
import prisma from "@/lib/prisma";

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

// type GetPlacesFn = (argu: GetPlacesParams) => Promise<string[]>;

export type IHotelListResponse = Awaited<ReturnType<typeof getHotles>>;

export const getHotles = async ({
  minPrice,
  maxPrice,
  hotelName,
  breakfastIncluded,
  roomsCount,
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
}: ISearchData) => {
  try {
    const pageParam = Number(page) || 1;
    const limitPerPage = 10;
    const skip = (pageParam - 1) * limitPerPage;

    if (!hotelName && !country && !city && !address) {
      return { matchedHotelsCount: 0, hotels: [], hasMore: false };
    }

    const hotelWhereInput: HotelWhereInput = {};
    const roomWhereInput: RoomWhereInput = {};

    if (hotelName) {
      hotelWhereInput.name = { equals: hotelName };
    } else {
      hotelWhereInput.location = {
        ...(country ? { country: { equals: country } } : {}),
        ...(city ? { city: { equals: city } } : {}),
        ...(address ? { address: { equals: address } } : {}),
      };
    }
    if (averageRating) {
      hotelWhereInput.averageRating = { lte: averageRating };
    }
    if (cancellationPolicy) {
      if (cancellationPolicy) {
        hotelWhereInput.policy = { cancellationPolicy: { equals: true } };
      }
      if (!cancellationPolicy) {
        hotelWhereInput.policy = { cancellationPolicy: { equals: false } };
      }
    }
    if (paymentFacilities) {
      if (paymentFacilities === "Pay_At_Hotel") {
        hotelWhereInput.paymentFacilities = { equals: "Pay_At_Hotel" };
      }
      if (paymentFacilities === "Prepay_Online") {
        hotelWhereInput.paymentFacilities = { equals: "Prepay_Online" };
      }
    }

    roomWhereInput.booking = {
      none: { checkIn: { lt: checkOut }, checkOut: { gt: checkIn } },
    };

    roomWhereInput.pricePerNight = { gte: minPrice, lte: maxPrice };
    roomWhereInput.adults = { gte: adults };
    roomWhereInput.children = { gte: children };

    if (roomServices) {
      roomWhereInput.roomServices = {
        hasEvery: roomServices,
      };
    }

    if (bedType) {
      roomWhereInput.beds = {
        some: {
          type: bedType,
        },
      };
    }

    if (breakfastIncluded) {
      if (breakfastIncluded) {
        roomWhereInput.breakfastIncluded = { equals: true };
      }
      if (!breakfastIncluded) {
        roomWhereInput.breakfastIncluded = { equals: false };
      }
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
          take: roomsCount,
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

    const hasMore = limitPerPage === hotels.length;

    return { matchedHotelsCount, hotels, hasMore };
  } catch (error) {
    console.log(error);
    throw new Error("can't load hotels list");
  }
};

export const getPlaces = async ({
  city,
  country,
}: {
  city: ISearchData["city"];
  country: ISearchData["country"];
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

      // const countries = await prisma.hotelLocation.findMany({
      //   distinct: ["country"],
      //   select: {
      //     country: true,
      //   },
      // });
      // const cities = await prisma.hotelLocation.findMany({
      //   distinct: ["country", "city"],
      //   select: {
      //     country: true,
      //     city: true,
      //   },
      //   take: 10,
      // });
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
