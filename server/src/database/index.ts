import mongoose from "mongoose";
import { ENV } from "../configs/env-variables.js";
import { DB_NAME } from "../configs/constants.js";

// -------------------------------------------------------------

export async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(ENV.MONGODB_URI!, {
      dbName: DB_NAME,
    });

    if (connectionInstance) {
      console.log(
        `Database is connected on: ${connectionInstance.connection.host}`,
      );
    }
  } catch (error) {
    console.log(`Database connection failure: ${error}`);
    throw error;
  }
}
