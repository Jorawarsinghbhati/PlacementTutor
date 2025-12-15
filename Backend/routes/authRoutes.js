import { Router } from "express";
import passport from "passport";
import {
  sendOtp,
  verifyOtp,
} from "../controllers/otpController.js";

const router = Router();

/**
 * ✅ 1. THIS ROUTE IS CALLED BY AXIOS (apiConnector)
 * Frontend hits: GET /auth/google/url
 */
router.get("/google/url", (req, res) => {
  res.json({
    success: true,
    url: `${process.env.BASE_URL}/auth/google`,
  });
});

/**
 * ✅ 2. GOOGLE OAUTH START (browser redirect)
 * Frontend NEVER calls this via axios directly
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * ✅ 3. GOOGLE CALLBACK
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${req.user.jwtToken}`
    );
  }
);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
