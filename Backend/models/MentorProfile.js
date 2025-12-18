import mongoose from "mongoose";

const mentorProfileSchema = new mongoose.Schema(
  {
    // 🔹 Link to User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one mentor profile per user
    },

    // 🔹 Personal / Academic Info
    name: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },

    // 🔹 Professional Info
    currentCompany: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
    },

    // 🔹 Mentor Expertise
    expertise: [
      {
        type: String, // DSA, Web, ML, System Design
        required: true,
      },
    ],

    // 🔹 Pricing
    sessionPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // 🔹 Verification (Offer Letter)
    offerLetterUrl: {
      type: String, // Cloudinary / S3 URL
      required: true,
    },

    // 🔹 Admin Control
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

    // 🔹 Admin Feedback (optional)
    adminNote: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("MentorProfile", mentorProfileSchema);
