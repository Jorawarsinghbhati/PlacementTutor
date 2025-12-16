import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName || email.split("@")[0],
            email,
            provider: "google",
            role: "USER",
          });
        }

        // 🔹 Do NOT generate JWT here
        // JWT should be generated in callback route
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
