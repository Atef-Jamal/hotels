import z from "zod";
import { BedTypeEnum, PaymentFacilities, RoomServices } from "@/app/generated/prisma/enums";
import { addDays } from "date-fns";

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email("Invalid Email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  phone: z.string().optional(),
});

export const signInSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const roomsFilterSchema = z
  .object({
    page: z.coerce.number().int().positive().catch(1),
    roomsCount: z.coerce.number().int().positive().min(1).catch(1),
    adults: z.coerce.number().int().positive().min(1).catch(1),
    children: z.coerce.number().int().positive().min(0).catch(0),
    minPrice: z.coerce.number().min(0).max(700).catch(0),
    maxPrice: z.coerce.number().min(0).max(700).catch(700),
    breakfastIncluded: z.coerce.boolean().optional(),
    bedType: z
      .enum(BedTypeEnum)
      .optional()
      .catch(() => undefined),
    checkIn: z.coerce.date().catch(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }),
    checkOut: z.coerce.date().catch(() => {
      const tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }),
    roomServices: z.preprocess(
      (val) => {
        if (!val) return [];
        return Array.isArray(val) ? val : [val];
      },
      z.array(z.enum(RoomServices)),
    ),
  })
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.checkIn < today) {
      data.checkIn = today;
    }

    if (data.checkOut <= data.checkIn) {
      data.checkOut = addDays(data.checkIn, 1);
    }
    const nights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 3600 * 24));

    if (nights > 30) {
      ctx.addIssue({
        code: "custom",
        message: "Maximum stay is 30 nights",
        path: ["checkOut"],
      });
    }

    if (data.minPrice > data.maxPrice) {
      data.maxPrice = data.minPrice;
      data.minPrice = data.maxPrice;
    }
  });

export const hotelsFilterSchema = roomsFilterSchema.extend({
  hotelName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  cancellationPolicy: z.coerce.boolean().optional(),
  averageRating: z.coerce.number().optional(),
  paymentFacilities: z
    .enum(PaymentFacilities)
    .optional()
    .catch(() => undefined),
  sort: z
    .enum(["recommended", "rating", "top-reviewed", "distance"])
    .optional()
    .catch(() => undefined),
});

export const bookingOrderSchema = z
  .object({
    roomId: z.uuid("Invalid Room ID"),
    guestName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    guestEmail: z.email("Invalid Email"),
    guestPhone: z.string().min(10, { message: "Phone number must be at least 10 characters." }).optional(),
    checkIn: z.date(),
    checkOut: z.date(),
    roomsCount: z.coerce.number(),
    promoCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.checkIn < today) {
      ctx.addIssue({
        code: "custom",
        message: "Check-in date cannot be in the past",
        path: ["checkIn"],
      });
    }

    if (data.checkOut <= data.checkIn) {
      ctx.addIssue({
        code: "custom",
        message: "Check-out date must be after check-in date",
        path: ["checkOut"],
      });
    }
    const nights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 3600 * 24));

    if (nights > 30) {
      ctx.addIssue({
        code: "custom",
        message: "Maximum stay is 30 nights",
        path: ["checkOut"],
      });
    }

    if (data.roomsCount < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Number of rooms must be at least 1",
        path: ["roomsCount"],
      });
    }
  });

export const applyDiscountSchema = z
  .object({
    roomId: z.uuid("Invalid Room ID"),
    checkIn: z.date(),
    checkOut: z.date(),
    promoCode: z.string(),
  })
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.checkIn < today) {
      ctx.addIssue({
        code: "custom",
        message: "Check-in date cannot be in the past",
        path: ["checkIn"],
      });
    }

    if (data.checkOut <= data.checkIn) {
      ctx.addIssue({
        code: "custom",
        message: "Check-out date must be after check-in date",
        path: ["checkOut"],
      });
    }
    const nights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 3600 * 24));

    if (nights > 30) {
      ctx.addIssue({
        code: "custom",
        message: "Maximum stay is 30 nights",
        path: ["checkOut"],
      });
    }
  });
