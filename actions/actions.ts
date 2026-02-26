"use server";
import { FormSchemaField } from "@/app/auth/sign-up/page";
import { connectToDB } from "@/lib/database";
import Discount from "@/models/discount";
import Hotel from "@/models/hotel";
import Room from "@/models/room";
import User from "@/models/user";
import { IHotelWithRoomsReviewsNearbyAttractions } from "@/types/types";
import bcrypt from "bcryptjs";

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

// type ISuccessAction<T> = {
//   success: true;
//   data: T;
// };

// type IFailedAction = {
//   success: false;
//   message: string;
// };

// type IActionResult<T> = ISuccessAction<T> | IFailedAction;

export const register = async (formData: FormSchemaField) => {
  try {
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const phone = formData.phone;

    if (!name || !email || !password || !phone) {
      return {
        error: {
          message: "all field required",
        },
      };
    }
    await connectToDB();
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return {
        error: {
          message: "this email already Exists, try to log in",
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    return {
      success: {
        message: "User succefully created",
      },
    };
  } catch (err) {
    let errorMessage = "an error occurred during sign up";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return {
      error: {
        message: errorMessage,
      },
    };
  }
};

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
}: IProps): Promise<{ hotels: IHotelWithRoomsReviewsNearbyAttractions[]; hasMore: boolean }> => {
  try {
    await connectToDB();
    const pageParam = Number(page) || 1;
    const limitPerPage = 10;
    const skip = (pageParam - 1) * limitPerPage;

    const hotelMatchStage: any = {};

    const roomMatchStage: any = {};

    if (!hotelName && !country && !city && !address) {
      return { hotels: [], hasMore: false };
    }

    if (hotelName) {
      hotelMatchStage["name"] = hotelName;
    } else {
      if (country) {
        hotelMatchStage["location.country"] = country;
      }
      if (city) {
        hotelMatchStage["location.city"] = city;
      }
      if (address) {
        hotelMatchStage["location.address"] = address;
      }
    }

    if (averageRating) {
      hotelMatchStage["averageRating"] = Number(averageRating);
    }

    if (cancellationPolicy) {
      if (cancellationPolicy === "true") {
        hotelMatchStage["policies.cancellationPolicy"] = true;
      }
      if (cancellationPolicy === "false") {
        hotelMatchStage["policies.cancellationPolicy"] = false;
      }
    }

    if (paymentFacilities) {
      hotelMatchStage["paymentFacilities"] = paymentFacilities;
    }

    if (minPrice && maxPrice) {
      roomMatchStage["pricePerNight"] = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }

    if (roomServices) {
      roomMatchStage["roomServices"] = { $all: Array.isArray(roomServices) ? roomServices : [roomServices] };
    }

    if (breakfastIncluded) {
      if (breakfastIncluded === "true") {
        roomMatchStage["breakfastIncluded"] = true;
      }
      if (breakfastIncluded === "false") {
        roomMatchStage["breakfastIncluded"] = false;
      }
    }

    if (adults) {
      roomMatchStage["capacity.adults"] = { $gte: Number(adults) };
    }
    if (children) {
      roomMatchStage["capacity.children"] = { $gte: Number(children) };
    }

    const findHotels = await Hotel.aggregate([
      { $match: hotelMatchStage },
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "hotel",
          as: "rooms",
          pipeline: [
            { $match: roomMatchStage },
            {
              $lookup: {
                from: "bookings",
                localField: "_id",
                foreignField: "roomId",
                as: "bookedRoom",
                pipeline: [{ $match: { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } } }],
              },
            },
            { $match: { bookedRoom: { $eq: [] } } },
            { $sort: { "capacity.adults": 1, pricePerNight: 1 } },
            { $limit: Number(roomsCount) },
          ],
        },
      },
      { $match: { $expr: { $gte: [{ $size: "$rooms" }, Number(roomsCount)] } } },

      {
        $lookup: {
          from: "nearbyattractions",
          // localField: "_id",
          // foreignField: "hotel",
          as: "nearbyAttractionsData",
          pipeline: [
            { $limit: 2 },
            {
              $project: {
                category: 1,
                name: 1,
                distance: 1,
                travelTime: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "reviews",
          // localField: "_id",
          // foreignField: "hotel",
          as: "reviews",
          pipeline: [
            {
              $limit: 10,
            },
          ],
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          images: 1,
          location: 1,
          amenities: 1,
          averageRating: 1,
          paymentFacilities: 1,
          policies: 1,
          rooms: 1,
          nearbyAttractions: "$nearbyAttractionsData",
          reviews: 1,
          createdAt: 1,
        },
      },
      { $skip: skip },
      { $limit: limitPerPage },
    ]);

    const hotels = JSON.parse(JSON.stringify(findHotels));
    const hasMore = limitPerPage === hotels.length;
    return { hotels, hasMore };
  } catch (error) {
    console.log(error);
    throw new Error("can't load hotels list");
  }
};

interface IParams {
  params: { hotelName: string };
  searchParams: Record<string, string | string[]>;
}

export const getHotelDetails = async ({ params, searchParams }: IParams) => {
  const { minPrice, maxPrice, roomServices, breakfastIncluded } = searchParams;
  const { adults, children, checkIn, checkOut } = searchParams;

  await connectToDB();
  const hotelNameSlug = params.hotelName.replaceAll("_", " ");

  const roomQueryFilter: any = {};

  if (minPrice && maxPrice) {
    roomQueryFilter["pricePerNight"] = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  }

  if (roomServices) {
    roomQueryFilter["roomServices"] = { $all: Array.isArray(roomServices) ? roomServices : [roomServices] };
  }

  if (breakfastIncluded) {
    if (breakfastIncluded === "true") {
      roomQueryFilter["breakfastIncluded"] = true;
    }
    if (breakfastIncluded === "false") {
      roomQueryFilter["breakfastIncluded"] = false;
    }
  }

  if (adults) {
    roomQueryFilter["capacity.adults"] = { $gte: Number(adults) };
  }
  if (children) {
    roomQueryFilter["capacity.children"] = { $gte: Number(children) };
  }

  const hotels: IHotelWithRoomsReviewsNearbyAttractions[] = await Hotel.aggregate([
    {
      $match: { name: hotelNameSlug },
    },
    {
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "hotel",
        as: "rooms",
        pipeline: [
          {
            $match: roomQueryFilter,
          },
          {
            $lookup: {
              localField: "_id",
              foreignField: "roomId",
              from: "bookings",
              as: "bookedRoom",
              pipeline: [{ $match: { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } } }],
            },
          },
          { $match: { bookedRoom: { $eq: [] } } },
          { $sort: { adults: 1, children: 1 } },
          { $limit: 10 },
        ],
      },
    },
    {
      $lookup: {
        from: "nearbyattractions",
        // localField: "_id",
        // foreignField: "hotel",
        as: "nearbyAttractions",
        pipeline: [{ $limit: 80 }],
      },
    },
    {
      $lookup: {
        from: "reviews",
        // localField: "_id",
        // foreignField: "hotel",
        as: "reviews",
        pipeline: [{ $limit: 10 }],
      },
    },
  ]);

  const hotel: IHotelWithRoomsReviewsNearbyAttractions = JSON.parse(JSON.stringify(hotels[0]));

  if (!hotel) throw new Error("Hotel not Found");
  return hotel;
};

export const getTotalHotelsCount = async ({
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
}: IProps): Promise<{ totalHotels: number }> => {
  try {
    await connectToDB();

    const hotelMatchStage: any = {};
    const roomMatchStage: any = {};

    if (!hotelName && !country && !city && !address) {
      return { totalHotels: 0 };
    }

    if (hotelName) {
      hotelMatchStage["name"] = hotelName;
    } else {
      if (country) {
        hotelMatchStage["location.country"] = country;
      }
      if (city) {
        hotelMatchStage["location.city"] = city;
      }
      if (address) {
        hotelMatchStage["location.address"] = address;
      }
    }
    if (averageRating) {
      hotelMatchStage["averageRating"] = Number(averageRating);
    }

    if (cancellationPolicy) {
      if (cancellationPolicy === "true") {
        hotelMatchStage["policies.cancellationPolicy"] = true;
      }
      if (cancellationPolicy === "false") {
        hotelMatchStage["policies.cancellationPolicy"] = false;
      }
    }

    if (paymentFacilities) {
      hotelMatchStage["paymentFacilities"] = paymentFacilities;
    }

    if (minPrice && maxPrice) {
      roomMatchStage["pricePerNight"] = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }

    if (roomServices) {
      roomMatchStage["roomServices"] = { $all: Array.isArray(roomServices) ? roomServices : [roomServices] };
    }

    if (breakfastIncluded) {
      if (breakfastIncluded === "true") {
        roomMatchStage["breakfastIncluded"] = true;
      }
      if (breakfastIncluded === "false") {
        roomMatchStage["breakfastIncluded"] = false;
      }
    }

    if (adults) {
      roomMatchStage["capacity.adults"] = { $gte: Number(adults) };
    }
    if (children) {
      roomMatchStage["capacity.children"] = { $gte: Number(children) };
    }
    const findHotels = await Hotel.aggregate([
      { $match: hotelMatchStage },
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "hotel",
          as: "rooms",
          pipeline: [
            { $match: roomMatchStage },
            {
              $lookup: {
                from: "bookings",
                localField: "_id",
                foreignField: "roomId",
                as: "bookedRoom",
                pipeline: [{ $match: { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } } }],
              },
            },
            { $match: { bookedRoom: { $eq: [] } } },
          ],
        },
      },
      { $match: { $expr: { $gte: [{ $size: "$rooms" }, Number(roomsCount)] } } },
      { $count: "total" },
    ]);

    return { totalHotels: findHotels.length > 0 ? findHotels[0].total : 0 };
  } catch (error) {
    console.log(error);
    throw new Error("can't get hotels count");
  }
};

export const getPlaces: GetPlacesFn = async ({ city, country }) => {
  await connectToDB();
  let distinations: any[] = [];
  if (!country && !city) {
    distinations = await Hotel.find({}).select("location.country");
    distinations = [...new Set(distinations.map((i) => i.location.country))];
  }
  if (country) {
    distinations = await Hotel.find({ "location.country": country }).select("location.city");
    distinations = [...new Set(distinations.map((i) => i.location.city))];
  }
  if (country && city) {
    distinations = await Hotel.find({ "location.country": country, "location.city": city }).select(
      "location.address",
    );
    distinations = [...new Set(distinations.map((i) => i.location.address))];
  }

  return distinations;
};

export const getDistinations = async (searchTerm: string) => {
  try {
    await connectToDB();

    const escapeRegex = (param: string) => param.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeInput = escapeRegex(searchTerm);
    const regex = new RegExp(`^${safeInput}`, "i");

    // const searchHotelsByCountry = Hotel.find({ "location.country": regex })
    //   .limit(2)
    //   .select("location.country");
    // const searchHotelsByCity = Hotel.find({ "location.city": regex }).select(
    //   "location.country location.city",
    // );
    const searchHotelsByCountry = Hotel.aggregate([
      { $match: { "location.country": regex } },
      {
        $group: {
          _id: "$location.country",
        },
      },
      {
        $project: {
          country: "$_id",
        },
      },
      { $limit: 2 },
    ]);

    const searchHotelsByCity = Hotel.aggregate([
      { $match: { "location.city": regex } },
      {
        $group: {
          _id: "$location.city",
          country: { $addToSet: "$location.country" },
        },
      },
      {
        $project: {
          city: "$_id",
          country: 1,
        },
      },
      { $limit: 2 },
    ]);
    const searchHotelsByName = Hotel.find({ name: regex })
      .limit(2)
      .select("location.country location.city name");

    const [byCountry, byCity, byName] = await Promise.all([
      searchHotelsByCountry,
      searchHotelsByCity,
      searchHotelsByName,
    ]);

    const transformByHotelName: ISearchResult = byName.map((hotel) => ({
      type: "property-name",
      name: hotel.name,
      city: hotel.location.city,
      country: hotel.location.country,
    }));

    const transformByCity: ISearchResult = byCity.map((hotel) => ({
      type: "city",
      city: hotel.city,
      country: hotel.country[0],
    }));

    const transformByCountry: ISearchResult = byCountry.map((hotel) => ({
      type: "country",
      country: hotel.country,
    }));

    const results: ISearchResult = [...transformByHotelName, ...transformByCity, ...transformByCountry];

    return results;
  } catch (error) {
    console.log(error);
    throw new Error("can not load distinations");
  }
};

type IPromoCodeSuccess = { status: "success"; newPrice: number };
type IPromoCodeFail = { status: "error"; message: string };
type IPromoCodeResult = IPromoCodeSuccess | IPromoCodeFail;

export const applyPromoCod = async ({
  roomId,
  discountId,
  promoCode,
}: {
  roomId: string;
  discountId: string | null;
  promoCode: string;
}): Promise<IPromoCodeResult> => {
  try {
    const discount = await Discount.findById(discountId);
    if (!discount || discount.type !== "promo-code")
      return { status: "error", message: "discount not found" };

    const isExpired = new Date(discount.expiredAt) <= new Date();

    if (isExpired) return { status: "error", message: "discount Expired" };

    const correctPromoCode = discount.code === promoCode;

    if (!correctPromoCode) return { status: "error", message: "Wrong promo code !" };

    const room = await Room.findById(roomId);
    if (!room) return { status: "error", message: "room not found" };

    let newPrice = room.pricePerNight;

    if (discount.amount.type === "percentage") {
      newPrice = Math.max(0, newPrice - newPrice * (discount.amount.amount / 100));
    }

    if (discount.amount.type === "fixed") {
      newPrice = Math.max(0, newPrice - discount.amount.amount);
    }

    return { status: "success", newPrice };
  } catch (error) {
    return { status: "error", message: "can not apply discount" };
  }
};
