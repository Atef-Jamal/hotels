import { Document, Model, model, models, Schema } from "mongoose";

export interface IRoom extends Document {}

const roomSchema: Schema<IRoom> = new Schema<IRoom>({});

const Room: Model<IRoom> = models.Room || model<IRoom>("Room", roomSchema);
export default Room;
