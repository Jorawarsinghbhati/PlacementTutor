import { Router } from "express";
import auth from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";

import { getAdminStats } from "../controllers/adminController.js";
import {
  getPendingMentors,
  approveMentor,
  rejectMentor,
} from "../controllers/adminMentorController.js";

const router = Router();

/**
 * 🔹 Admin dashboard stats
 * GET /admin/stats
 */
// router.get("/stats", auth, isAdmin, getAdminStats);
router.get(
  "/stats",

  // 🔹 STEP 1: auth
  (req, res, next) => {
    console.log("➡️ /admin/stats hit");
    console.log("➡️ Before auth");
    next();
  },
  auth,
  (req, res, next) => {
    console.log("✅ Passed auth");
    console.log("User from auth:", req.user);
    next();
  },

  // 🔹 STEP 2: isAdmin
  (req, res, next) => {
    console.log("➡️ Before isAdmin");
    next();
  },
  isAdmin,
  (req, res, next) => {
    console.log("✅ Passed isAdmin");
    next();
  },

  // 🔹 STEP 3: controller
  (req, res, next) => {
    console.log("➡️ Before getAdminStats");
    next();
  },
  getAdminStats
);


/**
 * 🔹 Mentor management
 */

/**
 * GET /admin/mentors/pending
 * View all pending mentor applications
 */
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
