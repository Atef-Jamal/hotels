import { Document, Model, model, models, Schema } from "mongoose";

export interface IReview extends Document {}

const reviewSchema: Schema<IReview> = new Schema<IReview>({});

const Review: Model<IReview> =
  models.Review || model<IReview>("Review", reviewSchema);
export default Review;
