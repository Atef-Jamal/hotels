import { IBookingDoc } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

const bookingSchema: Schema<IBookingDoc> = new Schema<IBookingDoc>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Booking: Model<IBookingDoc> =
  models.Booking || model<IBookingDoc>("Booking", bookingSchema);

export default Booking;
