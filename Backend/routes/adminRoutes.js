import { Router } from "express";
import auth from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAdminStats } from "../controllers/adminController.js";

const router = Router();

router.get("/stats", auth, isAdmin, getAdminStats);

export default router;
