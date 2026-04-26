// import { EnumRoomServices, EnumRoomType, IRoomDoc } from "@/types/types";
// import { Model, model, models, Schema } from "mongoose";

// const roomSchema: Schema<IRoomDoc> = new Schema<IRoomDoc>(
//   {
//     hotel: {
//       type: Schema.Types.ObjectId,
//       ref: "Hotel",
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: EnumRoomType,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     images: [{ type: String, required: true }],
//     roomServices: [
//       {
//         type: String,
//         enum: EnumRoomServices,
//         required: true,
//       },
//     ],
//     breakfastIncluded: { type: Boolean, default: false },
//     beds: [{ type: { type: String, required: true }, count: { type: Number, required: true } }],
//     pricePerNight: {
//       type: Number,
//       required: true,
//     },
//     capacity: {
//       adults: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 10,
//       },
//       children: {
//         type: Number,
//         min: 0,
//         max: 10,
//         default: 0,
//       },
//     },
//   },
//   { timestamps: true },
// );

// roomSchema.index({ hotel: 1 });
// roomSchema.index({ hotel: 1, "capacity.adults": 1, "capacity.children": 1 });
// roomSchema.index({ hotel: 1, "capacity.adults": 1, "capacity.children": 1, pricePerNight: 1 });
// roomSchema.index({ hotel: 1, "capacity.adults": 1, "capacity.children": 1, breakfastIncluded: 1 });
// roomSchema.index({ hotel: 1, "capacity.adults": 1, "capacity.children": 1, beds: 1 });
// roomSchema.index({ hotel: 1, "capacity.adults": 1, "capacity.children": 1, roomServices: 1 });

// const Room: Model<IRoomDoc> = models.Room || model<IRoomDoc>("Room", roomSchema);

// export default Room;
