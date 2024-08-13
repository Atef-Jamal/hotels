import { Schema, model, models, Model, Document } from "mongoose";

export interface IHotel extends Document {}

const hotelSchema: Schema<IHotel> = new Schema({});

const Hotel: Model<IHotel> =
  models.Hotel || model<IHotel>("Hotel", hotelSchema);
export default Hotel;
