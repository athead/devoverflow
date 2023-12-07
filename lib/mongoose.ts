import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL is not exists");

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "devflow" });
    isConnected = true;
    return console.log("MongoDB connected!");
  } catch (error) {
    return console.log(`MongoDB connection error: ${error}`);
  }
};
