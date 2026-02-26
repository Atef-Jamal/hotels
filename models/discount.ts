import { IDiscountDoc } from "@/types/types";
import mongoose, { Model, model, models, Schema } from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    type: { type: String, enum: ["promo-code", "first-deal"], required: true },
    code: { type: String },
    expiredAt: { type: Date, required: true },
    amount: {
      type: { type: String, enum: ["percentage", "fixed"], required: true },
      amount: { type: Number, required: true, min: 0 },
    },
  },
  { timestamps: true },
);

discountSchema.index({ hotel: 1 });
const Discount: Model<IDiscountDoc> = models.Discount || model<IDiscountDoc>("Discount", discountSchema);

export default Discount;
