import mongoose from "mongoose";
import { MONGO_URI } from "./envConfig.js";

async function connectDB(maxRetries = 5, initialDelay = 5000) {
  let attempt = 0;

  async function connectWithRetry() {
    try {
      console.log(`Attempt :${attempt + 1}. Trying to connect to DB`);

      await mongoose.connect(MONGO_URI);

      console.log(`Connected to DB`);
    } catch (error) {
      attempt + 1;
      console.log(`Error occured trying to connect to DB : ${error}`);

      if (attempt < maxRetries) {
        const delay = initialDelay * 2 ** (attempt - 1);
        console.log(`Retrying in ${delay / 1000} seconds`);
        await new Promise((resolve) => setTimeout(resolve, delay));

        return connectWithRetry();
      } else {
        console.error(
          `Max retries rechead. Could not connect to DB. Shutting down now...`
        );
        process.exit(1);
      }
    }
  }

  await connectWithRetry();
}

export default connectDB;
