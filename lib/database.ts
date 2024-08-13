import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

export const connectToDB = async () => {
  if (!MONGODB_URI) throw new Error("mongo uri is Required");
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("connected to DB successfully");
  } catch (error) {
    console.log("Failed to connect to DB");
  }
};
