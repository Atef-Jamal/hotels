import { EnumAmenityName, IHotelDoc } from "@/types/types";
import { Model, Schema, model, models } from "mongoose";

const hotelSchema = new Schema<IHotelDoc>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    location: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    paymentFacilities: {
      type: String,
      enum: ["Pay At Hotel", "Prepay Online"],
      required: true,
    },
    policies: {
      checkIn: { type: String, required: true },
      checkOut: { type: String, required: true },
      cancellationPolicy: { type: Boolean, required: true },
    },
    nearbyAttractions: [
      {
        type: Schema.Types.ObjectId,
        ref: "NearbyAttraction",
      },
    ],
    amenities: [{ type: String, enum: EnumAmenityName }],
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true },
);

hotelSchema.index({ name: "text" });
hotelSchema.index({ "location.country": 1 });
hotelSchema.index({ "location.city": 1 });

hotelSchema.index({ "location.country": 1, "policies.cancellationPolicy": 1 });
hotelSchema.index({ "location.city": 1, "policies.cancellationPolicy": 1 });

hotelSchema.index({ "location.country": 1, averageRating: 1 });
hotelSchema.index({ "location.city": 1, averageRating: 1 });

const Hotel: Model<IHotelDoc> = models.Hotel || model<IHotelDoc>("Hotel", hotelSchema);

export default Hotel;
