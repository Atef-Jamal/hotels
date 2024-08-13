import { Document, Model, model, models, Schema } from "mongoose";

export interface IBooking extends Document {}

const bookingSchema: Schema<IBooking> = new Schema<IBooking>({});

const Booking: Model<IBooking> =
  models.Booking || model<IBooking>("Booking", bookingSchema);

export default Booking;
