import { IUserDoc } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

const userSchema: Schema<IUserDoc> = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    phone: { type: String },
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
  },
  { timestamps: true }
);

const User: Model<IUserDoc> =
  models.User || model<IUserDoc>("User", userSchema);

export default User;
