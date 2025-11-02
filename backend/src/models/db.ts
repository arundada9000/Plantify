import mongoose from "mongoose";
import { env } from "../../env";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
