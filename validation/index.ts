import z from "zod";

import { BedTypeEnum, PaymentFacilities, RoomServices } from "@/app/generated/prisma/enums";

export const FilterRoomsSchema = z
  .object({
    page: z.coerce.number().int().positive().catch(1),
    adults: z.coerce.number().int().positive().min(1).catch(1),
    children: z.coerce.number().int().positive().min(0).catch(0),
    minPrice: z.coerce.number().min(0).max(700).nullish(),
    maxPrice: z.coerce.number().min(0).max(700).nullish(),
    breakfastIncluded: z.coerce.boolean().nullish(),
    bedType: z.enum(BedTypeEnum).nullish(),
    roomsCount: z.coerce.number().int().positive().min(1).catch(1),
    checkIn: z
      .preprocess((val) => {
        if (!val) return undefined;
        const date = new Date(val as string);
        return isNaN(date.getTime()) ? undefined : date;
      }, z.date())
      .catch(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      }),
    checkOut: z
      .preprocess((val) => {
        if (!val) return undefined;
        const date = new Date(val as string);
        return isNaN(date.getTime()) ? undefined : date;
      }, z.date())
      .catch(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return tomorrow;
      }),
    roomServices: z
      .preprocess(
        (val) => {
          if (!val) return [];
          return Array.isArray(val) ? val : [val];
        },
        z.array(z.enum(RoomServices)),
      )
      .catch([]),
  })
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.checkIn < today) {
      ctx.addIssue({
        message: "Check-in date cannot be in the past",
        path: ["checkIn"],
        code: "custom",
      });
    }

    if (data.checkOut <= data.checkIn) {
      ctx.addIssue({
        code: "custom",
        message: "Check-out must be after check-in",
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
    if (data.minPrice && data.maxPrice && data.minPrice > data.maxPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Min price must be less than Max price",
        path: ["maxPrice"],
      });
    }
  });

export const FilterHotelsSchema = FilterRoomsSchema.extend({
  hotelName: z.string().nullish(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  country: z.string().nullish(),
  averageRating: z.coerce.number().nullish(),
  cancellationPolicy: z.coerce.boolean().nullish(),
  paymentFacilities: z.enum(PaymentFacilities).nullish(),
});

export type IFilterRoomsSchema = z.infer<typeof FilterRoomsSchema>;
export type IFilterHotelsSchema = z.infer<typeof FilterHotelsSchema>;
