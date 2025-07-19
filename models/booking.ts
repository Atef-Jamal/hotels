import { IBookingDoc } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

const bookingSchema: Schema<IBookingDoc> = new Schema<IBookingDoc>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

bookingSchema.index({ user: 1 });
bookingSchema.index({ roomId: 1 });
bookingSchema.index({ roomId: 1, checkIn: 1, checkOut: 1 });
const Booking: Model<IBookingDoc> = models.Booking || model<IBookingDoc>("Booking", bookingSchema);

export default Booking;
