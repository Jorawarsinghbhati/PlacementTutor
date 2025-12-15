import "dotenv/config";   
import express from "express";
import passport from "passport";
import cors from "cors";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
connectDB();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);
export default app;
