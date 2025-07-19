import { IPaymentDoc } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

const paymentSchema: Schema<IPaymentDoc> = new Schema<IPaymentDoc>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["credit_card", "paypal", "bank_transfer", "crypto"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Payment: Model<IPaymentDoc> =
  models.Payment || model<IPaymentDoc>("Payment", paymentSchema);

export default Payment;
