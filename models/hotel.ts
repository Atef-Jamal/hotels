import { IHotelDoc } from "@/types/types";
import { Schema, model, models, Model } from "mongoose";

const hotelSchema: Schema<IHotelDoc> = new Schema<IHotelDoc>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{ type: String, required: true }],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  amenities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Amenity",
    },
  ],
  paymentFacilities: {
    type: String,
    enum: ["Pay At Hotel", "Prepay Online"],
    required: true,
  },
  freeCancellation: { type: Boolean, default: false },
  nearbyAttractions: [{ type: Schema.Types.ObjectId, ref: "NearbyAttraction" }],
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Hotel: Model<IHotelDoc> =
  models.Hotel || model<IHotelDoc>("Hotel", hotelSchema);

export default Hotel;
