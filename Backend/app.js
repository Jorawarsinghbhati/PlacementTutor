import "dotenv/config";   
import express from "express";
import passport from "passport";
import cors from "cors";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import "./cron/createMeetingBefore10Min.js";
import publicRoutes from "./routes/publicRoutes.js"
// import "./cron/expireRescheduleRequests.js";

connectDB();
const app = express();
app.use(
  cors({
      origin: process.env.CLIENT_URL, // 👈 exact frontend URL
      credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/mentor", mentorRoutes);
app.use("/booking", bookingRoutes);
app.use("/user", userRoutes);
app.use("/payment", paymentRoutes);
app.use("/public",publicRoutes);



export default app;
