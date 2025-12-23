import { Router } from "express";
import auth from "../middlewares/auth.js";
import { lockSlot,confirmBooking,getMyBookings } from "../controllers/bookingController.js";

const router = Router();

router.post("/lock", auth, lockSlot);
router.post("/confirm", auth, confirmBooking);
router.get("/me",auth,getMyBookings);

export default router;
