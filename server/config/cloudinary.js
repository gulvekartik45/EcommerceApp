import dotenv from "dotenv";
dotenv.config(); // ✅ FORCE load env here

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("Cloudinary API key missing");
}

console.log(
  "Cloudinary connected with key:",
  process.env.CLOUDINARY_API_KEY
);

export default cloudinary;
