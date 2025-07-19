import { EnumNearbyAttraction, INearbyAttractionDoc } from "@/types/types";
import { model, Model, models, Schema } from "mongoose";

const nearbyAttractionSchema: Schema<INearbyAttractionDoc> = new Schema<INearbyAttractionDoc>(
  {
    category: { type: String, enum: EnumNearbyAttraction, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    distance: { type: Number, required: true },
    travelTime: { type: String, required: true },
    rating: { type: Number, default: 0 },
    images: [String],
    website: { type: String, required: true },
    openingHours: { type: String, required: true },
    priceRange: { type: String, required: true },
  },
  { timestamps: true },
);

const NearbyAttraction: Model<INearbyAttractionDoc> =
  models.NearbyAttraction || model<INearbyAttractionDoc>("NearbyAttraction", nearbyAttractionSchema);

export default NearbyAttraction;
