import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔹 Basic identity
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // 🔹 Username (onboarding step 1)
    username: {
      type: String,
      unique: true,
      sparse: true, // allows null until set
      trim: true,
    },

    // 🔹 Graduation details (onboarding step 2)
    college: {
      type: String,
      trim: true,
    },

    graduationYear: {
      type: Number,
    },

    phone: {
      type: String,
      trim: true,
    },

    // 🔹 Auth & roles
    role: {
      type: String,
      enum: ["USER", "MENTOR", "ADMIN"],
      default: "USER",
    },

    provider: {
      type: String,
      enum: ["google", "otp"],
      default: "google",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
