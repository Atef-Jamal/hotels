import { Document, Model, model, models, Schema } from "mongoose";

export interface IUser extends Document {}

const userSchema: Schema<IUser> = new Schema<IUser>({});

const User: Model<IUser> = models.User || model<IUser>("User", userSchema);
export default User;
