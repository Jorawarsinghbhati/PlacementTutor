// routes/userRoutes.js
import { Router } from "express";
import auth from "../middlewares/auth.js";
import { updateMyProfile,getMyProfile } from "../controllers/usercontroller/usercontroller.js";

const router = Router();

router.patch("/me", auth, updateMyProfile);
router.get("/getprofile", auth, getMyProfile);

export default router;
