// models/MentorAvailability.js
import mongoose from "mongoose";

const mentorAvailabilitySchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    startTime: {
      type: String, // HH:mm (24h)
      required: true,
    },

    endTime: {
      type: String, // HH:mm
      required: true,
    },

    isBooked: {
      type: Boolean,
      default: false,
    },

    lockedUntil: {
      type: Date,
      default: null, // used during payment lock
    },
    // 🔴 ADDED FIELD TO TRACK BOOKING ID
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
  
  },
  {
    timestamps: true,
  }
);

mentorAvailabilitySchema.index(
  { mentor: 1, date: 1, startTime: 1 },
  { unique: true }
);
mentorAvailabilitySchema.index({ lockedUntil: 1 });

export default mongoose.model(
  "MentorAvailability",
  mentorAvailabilitySchema
);
