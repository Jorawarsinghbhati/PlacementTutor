import { Router } from "express";
import auth from "../middlewares/auth.js";
import { lockSlot,getMyBookings ,submitBookingReview} from "../controllers/bookingController.js";


const router = Router();

router.post("/lock", auth, lockSlot);
router.get("/me",auth,getMyBookings);
router.post("/:bookingId/review", auth, submitBookingReview);
export default router;
