// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MentorAvailability",
      required: true,
      unique: true, // 🔐 CRITICAL: one slot → one booking only
    },

    serviceType: {
      type: String,
      enum: ["ONE_TO_ONE", "RESUME_REVIEW"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // status: {
    //   type: String,
    //   enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    //   default: "PENDING",
    // },
    status: {
      type: String,
      enum: ["PENDING", "PAYMENT_PENDING", "CONFIRMED", "CANCELLED", "FAILED", "EXPIRED"],
      default: "PENDING",
    },
    //new one bro
    razorpayOrderId: {
      type: String,
      default: null,
    },

    paymentId: {
      type: String, // Razorpay / Stripe / UPI txn id
      default: null,
    },

    paymentProvider: {
      type: String,
      enum: ["RAZORPAY", "STRIPE", "UPI"],
      default: null,
    },

    review: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        trim: true,
      },
      reviewedAt: {
        type: Date,
      },
    },

    //new one
    paymentDetails: {
      method: {
        type: String, // card, upi, netbanking, wallet
        default: null,
      },
      cardId: {
        type: String, // Razorpay card ID
        default: null,
      },
      bank: {
        type: String, // Bank name for netbanking
        default: null,
      },
      wallet: {
        type: String, // Wallet name
        default: null,
      },
      vpa: {
        type: String, // UPI ID
        default: null,
      },
    },
    paidAt: {
      type: Date,
      default: null,
    },

    // 🔴 ADDED LOCK EXPIRY FOR PAYMENT
    paymentLockExpiry: {
      type: Date,
      default: null,
    },
    paymentAttempts: [
      {
        attempt: Number,
        razorpayOrderId: String,
        razorpayPaymentId: String,
        status: String, // initiated, success, failed
        amount: Number,
        method: String,
        failureReason: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],


  },
  {
    timestamps: true,
  }
);



// A user cannot create two active bookings for same slot
bookingSchema.index(
  { user: 1, slot: 1 },
  { unique: true }
);

// Fast queries for dashboards
bookingSchema.index({ mentor: 1, createdAt: -1 });
bookingSchema.index({ user: 1, createdAt: -1 });

// 🔴 ADDED NEW INDEXES FOR PAYMENT QUERIES
bookingSchema.index({ status: 1, createdAt: -1 }); // For pending payments
bookingSchema.index({ razorpayOrderId: 1 }, { sparse: true }); // For payment verification
bookingSchema.index({ paymentLockExpiry: 1 }); // For cleanup of expired payments

// 🔴 ADD VIRTUAL FIELD TO CHECK IF PAYMENT IS EXPIRED
bookingSchema.virtual("isPaymentExpired").get(function () {
  if (!this.paymentLockExpiry) return false;
  return new Date() > this.paymentLockExpiry;
});

// 🔴 ADD METHOD TO ADD PAYMENT ATTEMPT
bookingSchema.methods.addPaymentAttempt = function (attemptData) {
  this.paymentAttempts.push(attemptData);
  return this.save();
};

// 🔴 ADD METHOD TO UPDATE PAYMENT STATUS
bookingSchema.methods.updatePaymentStatus = function (status, paymentData = {}) {
  this.status = status;
  
  if (status === "CONFIRMED") {
    this.paidAt = new Date();
    this.paymentId = paymentData.paymentId || null;
    this.paymentProvider = paymentData.paymentProvider || "RAZORPAY";
    this.paymentDetails = paymentData.paymentDetails || {};
  }
  
  return this.save();
};

// 🔴 ADD STATIC METHOD TO FIND EXPIRED PAYMENTS
bookingSchema.statics.findExpiredPayments = function () {
  return this.find({
    status: "PAYMENT_PENDING",
    paymentLockExpiry: { $lt: new Date() },
  });
};

export default mongoose.model("Booking", bookingSchema);
