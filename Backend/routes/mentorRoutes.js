import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  applyMentor,
  getMyMentorProfile,
} from "../controllers/mentorController.js";
import upload from "../middlewares/cloudinaryUpload.js";
import { getMentorStatus } from "../controllers/mentorController.js";

const router = Router();


router.post(
    "/apply",
    auth,
    upload.single("offerLetter"),
    applyMentor
  );
  
router.get("/me", auth, getMyMentorProfile);
router.get("/status", auth, getMentorStatus);

export default router;
