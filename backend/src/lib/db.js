import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MONGODB CONNECTED: ", conn.connection.host);
  } catch (error) {
    console.error("Failed to connect to database: ", error);
    process.exit(1);
  }
};
