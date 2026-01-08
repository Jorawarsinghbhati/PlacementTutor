import { Router } from "express";
import auth from "../middlewares/auth.js";
import {createGlobalBlock,getAllGlobalBlockedSlots} from "../controllers/admincontroller/adminblockslots.js"
import {
  getAllReviewsAdmin,
  deleteReviewAdmin,
} from "../controllers/admincontroller/adminReview.js";
import isAdmin from "../middlewares/isAdmin.js";
import { getAdminDashboardstats,getAllBookingsDetailed,getAllUsersDetailed,deleteUserByAdmin,getPopularTimeSlot} from "../controllers/admincontroller/adminController.js";
import {
  getPendingMentors,
  approveMentor,
  rejectMentor,
  getAllMentorsForAdmin,
  rejectMentorAndConvertToUser,

} from "../controllers/admincontroller/adminMentorController.js";



import {updateReviewStatus} from "../controllers/Reviewcontroller/reviewcontroller.js";
const router = Router();




router.get("/getAdminDashboardstats", auth, isAdmin, getAdminDashboardstats);
router.get("/getPopularTimeSlot",auth,isAdmin,getPopularTimeSlot)

router.get("/allBookingsDetailed", auth, isAdmin, getAllBookingsDetailed);

router.get("/getAllUsersDetailed",auth,isAdmin,getAllUsersDetailed);


router.delete(
  "/users/:userId",
  auth,
  isAdmin,
  deleteUserByAdmin
);

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

router.post("/globalblock", auth,isAdmin,createGlobalBlock);
router.get("/getAllGlobalBlockedSlots",auth,isAdmin,getAllGlobalBlockedSlots);



//mentordetail for admin
router.get("/reviews", auth, isAdmin, getAllReviewsAdmin);
router.delete("/reviews/:bookingId", auth, isAdmin, deleteReviewAdmin);
router.get("/getallmentor",auth,isAdmin,getAllMentorsForAdmin);
router.delete("/mentorss/:mentorId/reject",auth,isAdmin,rejectMentorAndConvertToUser);



router.patch(
  "/reviews/:bookingId/status",
  auth,
  isAdmin,
  updateReviewStatus
);






export default router;
