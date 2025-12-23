import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { sendOtp, verifyOtp } from "../controllers/authcontroller/otpController.js";
import auth from "../middlewares/auth.js";
import { getMe ,setUsername, setGraduation } from "../controllers/authcontroller/userController.js";

const router = Router();


router.get("/google/url", (req, res) => {
  res.json({
    success: true,
    url: `${process.env.BASE_URL}/auth/google`,
  });
});


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const step = !user.username
      ? "USERNAME"
      : !user.college
      ? "GRADUATION"
      : "DONE";

    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${token}&step=${step}`
    );
  }
);


router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);


router.post("/set-username", auth, setUsername);
router.post("/set-graduation", auth, setGraduation);
router.get("/me", auth, getMe);

export default router;
