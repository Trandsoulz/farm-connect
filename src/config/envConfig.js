import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

export {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
};
