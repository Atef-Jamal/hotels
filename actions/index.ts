"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type {
  IHotelsFilter,
  IRoomsFilter,
  IBookingOrder,
  IDestinationResponse,
  IApplyDiscount,
} from "@/types";
import {
  hotelsFilterSchema,
  roomsFilterSchema,
  bookingOrderSchema,
  applyDiscountSchema,
} from "@/lib/validation";
import { cacheTag } from "next/cache";
import type {
  HotelLocationFindManyArgs,
  HotelWhereInput,
  RoomWhereInput,
} from "@/app/generated/prisma/models";
import {
  discountsCacheTag,
  hotelDetailsCacheTag,
  limitedHotelsPerPage,
  limitedRoomsPerPage,
  suggestedLocationCacheTag,
} from "@/constants/constants";
import Stripe from "stripe";

export const getHotelsList = async (queryFilters: IHotelsFilter) => {
  const validationResult = hotelsFilterSchema.safeParse(queryFilters);
  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }

  const {
    minPrice,
    maxPrice,
    checkIn,
    checkOut,
    roomServices,
    averageRating,
    breakfastIncluded,
    cancellationPolicy,
    paymentFacilities,
    page,
    sort,
    country,
    city,
    address,
    adults,
    children,
    bedType,
  } = validationResult.data;

  const skip = (page - 1) * limitedHotelsPerPage;

  if (!country && !city && !address) {
    return { hasMore: false, hotels: [] };
  }

  const roomWhereInput: RoomWhereInput = {
    booking: {
      none: {
        checkIn: { lt: checkOut },
        checkOut: { gt: checkIn },
        OR: [{ status: "CONFIRMED" }, { status: "PENDING", expiredAt: { gt: new Date() } }],
      },
    },
    pricePerNight: { gte: minPrice * 100, lte: maxPrice * 100 },
    ...(roomServices && { roomServices: { hasEvery: roomServices } }),
    ...(bedType && { beds: { some: { type: bedType } } }),
    ...(adults && { adults: { gte: adults } }),
    ...(children && { children: { gte: children } }),
    ...(breakfastIncluded && { breakfastIncluded: breakfastIncluded }),
  };

  const hotelWhereInput: HotelWhereInput = {
    ...(averageRating && { averageRating: { gte: averageRating } }),
    ...(cancellationPolicy && { policy: { cancellationPolicy: cancellationPolicy } }),
    ...(paymentFacilities && { paymentFacilities: paymentFacilities }),
    ...(country || city || address
      ? {
          location: {
            ...(country && { country: { equals: country } }),
            ...(city && { city: { equals: city } }),
            ...(address && { address: { equals: address } }),
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
    take: limitedHotelsPerPage,
    include: {
      rooms: {
        where: roomWhereInput,
        select: {
          type: true,
          breakfastIncluded: true,
          beds: true,
          pricePerNight: true,
          booking: true,
        },
        orderBy: [
          {
            adults: "asc",
          },
          {
            pricePerNight: "asc",
          },
        ],
        take: 1,
      },
      policy: true,
      nearbyAttractions: {
        take: 10,
        select: { category: true, name: true, distance: true, travelTime: true },
      },
      reviews: {
        take: 10,
      },
      location: true,
    },
    orderBy: {
      ...(sort === "rating" && {
        averageRating: "desc",
      }),
      ...(sort === "recommended" && {
        bookings: { _count: "desc" },
      }),
      ...(sort === "top-reviewed" && {
        reviews: { _count: "desc" },
      }),
      // TO DO
      // ...(sort === "distance" && {}),
    },
  });

  const hasMore = hotels.length === limitedHotelsPerPage;

  return { hotels, hasMore };
};

export const getTotalHotelsCount = async (queryFilters: IHotelsFilter) => {
  const validationResult = hotelsFilterSchema.safeParse(queryFilters);
  if (!validationResult.success) {
    return 0;
  }

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
    maxPrice,
    minPrice,
    paymentFacilities,
    roomServices,
  } = validationResult.data;

  if (!country && !city && !address) {
    return 0;
  }

  const roomWhereInput: RoomWhereInput = {
    booking: {
      none: {
        checkIn: { lt: checkOut },
        checkOut: { gt: checkIn },
        OR: [{ status: "CONFIRMED" }, { status: "PENDING", expiredAt: { gt: new Date() } }],
      },
    },
    pricePerNight: { gte: minPrice * 100, lte: maxPrice * 100 },
    ...(roomServices && { roomServices: { hasEvery: roomServices } }),
    ...(bedType && { beds: { some: { type: bedType } } }),
    ...(adults && { adults: { gte: adults } }),
    ...(children && { children: { gte: children } }),
    ...(breakfastIncluded && { breakfastIncluded }),
  };
  const hotelWhereInput: HotelWhereInput = {
    ...(averageRating && { averageRating: { gte: averageRating } }),
    ...(cancellationPolicy && { policy: { cancellationPolicy } }),
    ...(paymentFacilities && { paymentFacilities }),
    ...(country || city || address
      ? {
          location: {
            ...(country && { country: { equals: country } }),
            ...(city && { city: { equals: city } }),
            ...(address && { address: { equals: address } }),
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

export const getHotelDetails = async ({ hotelSlug }: { hotelSlug: string }) => {
  "use cache";
  cacheTag(hotelDetailsCacheTag, hotelSlug);

  const hotel = await prisma.hotel.findUnique({
    where: {
      slug: hotelSlug,
    },
    include: {
      nearbyAttractions: true,
      reviews: true,
    },
  });
  if (!hotel) throw new Error("Hotel Not Found");

  return hotel;
};

export const getHotelRooms = async ({
  hotelSlug,
  queryFilters,
}: {
  hotelSlug: string;
  queryFilters: IRoomsFilter;
}) => {
  const validatedResult = roomsFilterSchema.safeParse(queryFilters);
  if (!validatedResult.success) {
    throw new Error(validatedResult.error.message);
  }

  const { adults, checkIn, checkOut, children, page, bedType } = validatedResult.data;
  const { roomServices, breakfastIncluded, maxPrice, minPrice } = validatedResult.data;

  const skip = (page - 1) * limitedRoomsPerPage;

  const roomWhereInput: RoomWhereInput = {
    hotel: {
      slug: hotelSlug,
    },
    booking: {
      none: {
        checkIn: { lt: checkOut },
        checkOut: { gt: checkIn },
        OR: [{ status: "CONFIRMED" }, { status: "PENDING", expiredAt: { gt: new Date() } }],
      },
    },
    pricePerNight: { gte: minPrice * 100, lte: maxPrice * 100 },
    ...(roomServices && { roomServices: { hasEvery: roomServices } }),
    ...(bedType && { beds: { some: { type: bedType } } }),
    ...(adults && { adults: { gte: adults } }),
    ...(children && { children: { gte: children } }),
    ...(breakfastIncluded && { breakfastIncluded: breakfastIncluded }),
  };

  const rooms = await prisma.room.findMany({
    where: roomWhereInput,
    include: {
      beds: true,
    },
    orderBy: [
      {
        adults: "asc",
      },
      {
        pricePerNight: "asc",
      },
    ],
    take: limitedRoomsPerPage,
    skip,
  });

  const hasMore = rooms.length === limitedRoomsPerPage;

  return { rooms, hasMore };
};

export const checkRoomAvailability = async ({
  roomId,
  dates,
}: {
  roomId: string;
  dates: Pick<IRoomsFilter, "checkIn" | "checkOut">;
}) => {
  const [room, booking] = await prisma.$transaction([
    prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        hotel: { select: { slug: true } },
        beds: true,
      },
    }),
    prisma.booking.findFirst({
      where: {
        roomId: roomId,
        checkIn: { lt: dates.checkOut },
        checkOut: { gt: dates.checkIn },
        OR: [{ status: "CONFIRMED" }, { status: "PENDING", expiredAt: { gt: new Date() } }],
      },
    }),
  ]);

  if (booking) throw new Error("this Room is no longer available");
  if (!room) throw new Error("Room not found");

  return room;
};

export const getDestinations = async (searchTerm: string): Promise<IDestinationResponse> => {
  if (searchTerm.trim() === "") {
    const destinations = await prisma.hotelLocation.findMany({
      distinct: ["country", "city"],
      select: {
        country: true,
        city: true,
      },
      take: 20,
    });

    const countries = [...new Set(destinations.map((i) => i.country))].map((country) => ({
      type: "country",
      country,
    }));

    const cities = destinations.map((i) => ({
      type: "city",
      country: i.country,
      city: i.city,
    }));

    const result = [...countries, ...cities] as IDestinationResponse;

    return result;
  }

  const getCountriesPromise = prisma.hotelLocation.findMany({
    where: {
      country: {
        startsWith: searchTerm,
        mode: "insensitive",
      },
    },
    distinct: ["country"],
    select: {
      country: true,
    },
    take: 2,
  });

  const getCitiesPromise = prisma.hotelLocation.findMany({
    where: {
      city: {
        startsWith: searchTerm,
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

  const getAddressesPromise = prisma.hotelLocation.findMany({
    where: {
      address: {
        startsWith: searchTerm,
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

  const getHotelsPromise = prisma.hotel.findMany({
    where: {
      name: {
        startsWith: searchTerm,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      slug: true,
      location: {
        select: {
          city: true,
          country: true,
          address: true,
        },
      },
    },
    take: 5,
  });

  const [countries, cities, addresses, hotelsByName] = await Promise.all([
    getCountriesPromise,
    getCitiesPromise,
    getAddressesPromise,
    getHotelsPromise,
  ]);

  const mappedCountries: IDestinationResponse = countries.map((hotel) => ({
    type: "country",
    country: hotel.country,
  }));

  const mappedCities: IDestinationResponse = cities.map((hotel) => ({
    type: "city",
    city: hotel.city,
    country: hotel.country,
  }));

  const mappedAddresses: IDestinationResponse = addresses.map((hotel) => ({
    type: "address",
    address: hotel.address,
    city: hotel.city,
    country: hotel.country,
  }));

  const mappedHotels: IDestinationResponse = hotelsByName.map((hotel) => ({
    type: "property",
    name: hotel.name,
    hotelSlug: hotel.slug,
    address: hotel.location?.address || "",
    city: hotel.location?.city || "",
    country: hotel.location?.country || "",
  }));

  const results: IDestinationResponse = [
    ...mappedHotels,
    ...mappedAddresses,
    ...mappedCities,
    ...mappedCountries,
  ];

  return results;
};

export const suggestedLocations = async ({ country, city }: Pick<IHotelsFilter, "country" | "city">) => {
  "use cache";
  cacheTag(suggestedLocationCacheTag);
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

  const locations = await prisma.hotelLocation.findMany(query);

  const mappedLocations = locations.map((item) => {
    if (city) {
      return item.address;
    }
    if (country) {
      return item.city;
    }
    return item.country;
  });

  return mappedLocations;
};

export const bookNow = async (bookingDetails: IBookingOrder) => {
  const headerList = await headers();
  const validationResult = bookingOrderSchema.safeParse(bookingDetails);

  if (!validationResult.success) return { status: "error", message: validationResult.error.message };
  const { roomId, checkIn, checkOut, guestName, guestEmail, guestPhone, promoCode, specialRequests } =
    validationResult.data;

  const getAuth = await auth.api.getSession({ headers: headerList });
  const user = getAuth?.user;

  try {
    const payment = await prisma.$transaction(async (tx) => {
      const room = await tx.room.findUnique({
        where: { id: roomId },
        select: { id: true, pricePerNight: true, hotelId: true },
      });

      if (!room) throw new Error("Room Not Found");

      const existingBooking = await tx.booking.findFirst({
        where: {
          roomId: room.id,
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
          OR: [{ status: "CONFIRMED" }, { status: "PENDING", expiredAt: { gt: new Date() } }],
        },
        select: { id: true },
      });

      if (existingBooking) {
        throw new Error("Room are no longer available. choose another room");
      }

      const nights = Math.ceil(Math.abs(checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

      let newPrice = nights * room.pricePerNight;

      if (promoCode && promoCode.trim() !== "") {
        const discount = await tx.discount.findUnique({
          where: {
            hotelId_code: {
              hotelId: room.hotelId,
              code: promoCode.trim(),
            },
          },
        });

        if (!discount) throw new Error("Discount not exists");

        if (discount.endDate < new Date()) throw new Error("Discount Expired");
        if (discount.startDate > new Date())
          throw new Error(`Discount start in ${discount.startDate.toLocaleDateString("en-CA")}`);

        if (discount.usageLimit > 0) throw new Error("Discount reach to usage limit");

        if (discount.type === "FIXED") {
          newPrice = Math.max(newPrice - discount.amount, 0);
        } else if (discount.type === "PERCENTAGE") {
          newPrice = Math.max(newPrice * (1 - discount.amount / 100), 0);
        }
        await tx.discount.update({
          where: {
            hotelId_code: {
              hotelId: room.hotelId,
              code: promoCode.trim(),
            },
          },
          data: {
            usageLimit: { decrement: 1 },
          },
        });
      }

      const booking = await tx.booking.create({
        data: {
          hotelId: room.hotelId,
          roomId: room.id,
          checkIn: checkIn,
          checkOut: checkOut,
          guestName: guestName,
          guestEmail: guestEmail,
          ...(specialRequests && specialRequests.trim() !== "" ? { specialRequests } : {}),
          ...(guestPhone ? { guestPhone: guestPhone } : {}),
          ...(user ? { userId: user.id } : {}),
          status: "PENDING",
          expiredAt: new Date(Date.now() + 30 * 60 * 1000),
          payment: {
            create: {
              status: "PENDING",
              hotelId: room.hotelId,
              amount: newPrice,
              expiredAt: new Date(Date.now() + 30 * 60 * 1000),
            },
          },
        },
        select: {
          payment: {
            select: {
              id: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });

      return booking.payment[0];
    });
    return { status: "success", payment };
  } catch (error: any) {
    return { status: "error", message: error.message };
  }
};

export const hotelHasDiscount = async ({ hotelSlug }: { hotelSlug: string }) => {
  "use cache";
  cacheTag(hotelDetailsCacheTag, hotelSlug, discountsCacheTag);
  const discounts = await prisma.discount.count({ where: { hotel: { slug: hotelSlug } } });
  return discounts > 0;
};

export const applyDiscountTemporarily = async (discountArgs: IApplyDiscount) => {
  const validatedResult = applyDiscountSchema.safeParse(discountArgs);

  if (!validatedResult.success) {
    return { status: "error", message: validatedResult.error.message };
  }
  const { roomId, checkIn, checkOut, promoCode } = validatedResult.data;

  if (promoCode.trim() === "") return { status: "error", message: "Enter Promo code" };

  const room = await prisma.room.findUnique({ where: { id: roomId } });

  if (!room) return { status: "error", message: "Room Not Found !" };

  const discount = await prisma.discount.findUnique({
    where: {
      hotelId_code: {
        hotelId: room.hotelId,
        code: promoCode.trim(),
      },
    },
  });

  if (!discount) return { status: "error", message: "Discount Not Found !" };

  if (discount.startDate > new Date())
    return {
      status: "error",
      message: `Discount start in ${discount.startDate.toLocaleDateString("en-CA")}`,
    };

  if (discount.endDate <= new Date()) return { status: "error", message: "Discount Expired" };
  if (discount.usageLimit <= 0) return { status: "error", message: "Discount reach to usage limit" };

  const nights = Math.ceil(Math.abs(checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  let newPrice = room.pricePerNight * nights;

  if (discount.type === "FIXED") {
    newPrice = Math.max(newPrice - discount.amount, 0);
  } else if (discount.type === "PERCENTAGE") {
    newPrice = Math.max(newPrice * (1 - discount.amount / 100), 0);
  }

  return { status: "success", newPrice };
};

export const handlePaymentSuccess = async (paymentIntent: Stripe.PaymentIntent) => {
  const confirmBookingPromise = prisma.booking.update({
    where: {
      id: paymentIntent.metadata.bookingId,
    },
    data: {
      status: "CONFIRMED",
      expiredAt: undefined,
    },
  });
  const confirmPaymentPromise = prisma.payment.update({
    where: { id: paymentIntent.metadata.paymentId },
    data: {
      method: JSON.stringify(paymentIntent),
      status: "SUCCEEDED",
    },
  });
  await prisma.$transaction([confirmBookingPromise, confirmPaymentPromise]);
};

export const handlePaymentFailure = async (paymentIntent: Stripe.PaymentIntent) => {
  const failBookingPromise = prisma.booking.update({
    where: {
      id: paymentIntent.metadata.bookingId,
    },
    data: {
      status: "FAILED",
      expiredAt: undefined,
    },
  });
  const failPaymentPromise = prisma.payment.update({
    where: { id: paymentIntent.metadata.paymentId },
    data: {
      method: JSON.stringify(paymentIntent),
      status: "FAILED",
    },
  });
  await prisma.$transaction([failBookingPromise, failPaymentPromise]);
};

export const handlePaymentCancellation = async (paymentIntent: Stripe.PaymentIntent) => {
  const cancelBookingPromise = prisma.booking.update({
    where: {
      id: paymentIntent.metadata.bookingId,
    },
    data: {
      status: "CANCELLED",
      expiredAt: undefined,
    },
  });
  const cancelPaymentPromise = prisma.payment.update({
    where: { id: paymentIntent.metadata.paymentId },
    data: {
      method: JSON.stringify(paymentIntent),
      status: "CANCELLED",
    },
  });
  await prisma.$transaction([cancelBookingPromise, cancelPaymentPromise]);
};

export const isBookingExpired = async ({
  bookingId,
  paymentId,
}: {
  bookingId: string;
  paymentId: string;
}) => {
  const [booking, payment] = await prisma.$transaction([
    prisma.booking.findUnique({ where: { id: bookingId } }),
    prisma.payment.findUnique({ where: { id: paymentId } }),
  ]);

  if (!booking || !payment) {
    return true;
  }

  if (booking.expiredAt < new Date() || payment.expiredAt < new Date()) {
    await prisma.$transaction([
      prisma.booking.update({ where: { id: bookingId }, data: { status: "EXPIRED" } }),
      prisma.payment.update({ where: { id: paymentId }, data: { status: "EXPIRED" } }),
    ]);
    return true;
  }

  return false;
};

export const cleanupExpiredBookings = async () => {
  const expireBookingPromise = prisma.booking.updateMany({
    where: {
      status: "PENDING",
      expiredAt: { lt: new Date() },
    },
    data: { status: "EXPIRED" },
  });
  const expirePaymentsPromise = prisma.payment.updateMany({
    where: {
      status: "PENDING",
      expiredAt: { lt: new Date() },
    },
    data: { status: "EXPIRED" },
  });
  await Promise.all([expireBookingPromise, expirePaymentsPromise]);
};
