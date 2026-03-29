import mongoose from "mongoose";
import { ENV } from "../configs/env-variables";

// -------------------------------------------------------------

export async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(`${ENV.MONGODB_URI}`);

    if (connectionInstance) {
      console.log(
        `Database is connected on: ${connectionInstance.connection.host}`,
      );
    }
  } catch (error) {
    console.log(`Database connection failure: ${error}`);
    process.exit(1);
  }
}
