import { IReviewDoc } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

const reviewSchema: Schema<IReviewDoc> = new Schema<IReviewDoc>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cleanlness: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    location: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    amentities: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    service: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Review: Model<IReviewDoc> = models.Review || model<IReviewDoc>("Review", reviewSchema);

export default Review;
