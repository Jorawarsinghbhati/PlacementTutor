import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
  getRazorpayKey} from "../controllers/paymentcontroller/paymentcontroller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Protected routes (require authentication)
router.post("/create-order", auth, createRazorpayOrder);
router.post("/verify", auth, verifyPayment);
router.get("/key", auth, getRazorpayKey);

export default router;