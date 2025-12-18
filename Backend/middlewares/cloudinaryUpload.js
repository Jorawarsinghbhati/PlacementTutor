import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path"; // 👈 add this

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const fileNameWithoutExt = path.parse(file.originalname).name;

    return {
      folder: "mentor_offer_letters",
      resource_type: "raw",
      type: "upload",  
      public_id: `${Date.now()}-${fileNameWithoutExt}`, // ✅ no extension
      access_mode: "public",
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;