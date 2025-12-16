import "dotenv/config";   
import express from "express";
import passport from "passport";
import cors from "cors";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
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


export default app;
