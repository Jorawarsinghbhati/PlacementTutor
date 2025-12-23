import { Router } from "express";
import auth from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";

import { getAdminStats,getAdminDashboardstats,getAllBookingsDetailed,getAllUsersDetailed} from "../controllers/admincontroller/adminController.js";
import {
  getPendingMentors,
  approveMentor,
  rejectMentor,
} from "../controllers/admincontroller/adminMentorController.js";

const router = Router();

/**
 * 🔹 Admin dashboard stats
 * GET /admin/stats
 */
// router.get("/stats", auth, isAdmin, getAdminStats);
router.get(
  "/stats",
  auth,
  isAdmin,
  getAdminStats
);
router.get("/getAdminDashboardstats", auth, isAdmin, getAdminDashboardstats);
router.get("/allBookingsDetailed", auth, isAdmin, getAllBookingsDetailed);
router.get("/getAllUsersDetailed",auth,isAdmin,getAllUsersDetailed);

router.get(
  "/mentors/pending",
  auth,
  isAdmin,
  getPendingMentors
);


router.post(
  "/mentors/:id/approve",
  auth,
  isAdmin,
  approveMentor
);


router.post(
  "/mentors/:id/reject",
  auth,
  isAdmin,
  rejectMentor
);

export default router;
