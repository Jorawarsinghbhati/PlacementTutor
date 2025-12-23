import { Router } from "express";
import auth from "../middlewares/auth.js";
import { isMentor } from "../middlewares/isMentor.js";
import upload from "../middlewares/cloudinaryUpload.js";
import { getMentorStatus, applyMentor,
  getMyMentorProfile,getMentorAbout,getMentorTotalSessions,getMentorDashboardStats,Updateexpertise,updateSessionPrice} from "../controllers/mentorcontoller/mentorController.js";

import {getAllMentors,getMentorById,getMentorAvailabilityUser,getMentorDashboard,getMentorBookings} from "../controllers/mentorcontoller/mentorPublicController.js";

import { getUpcomingBooking,getMentorCompletedBookings } from "../controllers/mentorcontoller/mentorBookingController.js";
const router = Router();



//availibility routes
import {getMentorAvailability,addMentorAvailability,updateMentorAvailability,deleteMentorAvailability} from "../controllers/mentorcontoller/mentorAvailibilitycontroller.js";




router.post(
    "/apply",
    auth,
    upload.single("offerLetter"),
    applyMentor
  );
//private 
//availibility for mentor dashboard 
router.get("/availability",auth,getMentorAvailability);
router.post("/addavailability",auth,addMentorAvailability);
router.put("/updateavailability/:slotId",auth,updateMentorAvailability);
router.delete("/deleteavailability/:slotId",auth,deleteMentorAvailability);





router.get("/me", auth, getMyMentorProfile);
router.get("/status", auth, getMentorStatus);
router.get("/dashboard",(req, res, next) => {
  console.log("atleast reached here...");
  next();
}, auth, (req, res, next) => {
  console.log("✅ Auth passed, user:", req.user);
  next();
}, isMentor, (req, res, next) => {
  console.log("✅ isMentor passed");
  next();
}, getMentorDashboard);


router.put("/updateexpertise",auth,Updateexpertise);
router.put("/updateSessionPrice",auth,updateSessionPrice);

router.get("/getmentorabout",auth,getMentorAbout);
router.get("/mentortotalsession",auth,getMentorTotalSessions);
router.get("/getMentorDashboardStats",auth,getMentorDashboardStats);
//new one bhai
router.get("/bookings/upcoming",auth,getUpcomingBooking);
router.get("/bookings/completed",auth, getMentorCompletedBookings);



//public:
router.get("/:mentorId/availability", getMentorAvailabilityUser);
router.get("/Allmentor", getAllMentors);
router.get("/:id", getMentorById);
MENTOR_AVAILABILITY: (mentorId, date) =>
  `${BASE_URL}/mentor/${mentorId}/availability?date=${date}`,

router.get("/bookings",auth, isMentor,getMentorBookings)

export default router;
