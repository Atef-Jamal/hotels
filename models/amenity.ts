import { IAmenityDoc } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

const amenitySchema: Schema<IAmenityDoc> = new Schema<IAmenityDoc>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Amenity: Model<IAmenityDoc> =
  models.Amenity || model<IAmenityDoc>("Amenity", amenitySchema);

export default Amenity;
