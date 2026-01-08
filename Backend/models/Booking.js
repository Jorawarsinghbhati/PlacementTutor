
import mongoose from "mongoose";


const rescheduleSchema = new mongoose.Schema(
  {

    proposedBy: {
      type: String,
      enum: ["MENTOR", "USER"],
      required: true,
    },


    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED", "EXPIRED"],
      default: "PENDING",
    },

    oldSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MentorAvailability",
      },
    ],


    proposedSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MentorAvailability",
      },
    ],

   
    proposedDate: {
      type: String, // "YYYY-MM-DD"
      required: true,
    },

    proposedStartTime: {
      type: String, // "HH:mm"
      required: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    requestedAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date, 
    },

    resolvedAt: {
      type: Date,
    },
  },
  { _id: false }
);




const reviewSchema = new mongoose.Schema(
  {
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
      default: Date.now,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

/* -----------------------------
   BOOKING SCHEMA
----------------------------- */
const bookingSchema = new mongoose.Schema(
  {
    /* -----------------------------
       CORE RELATIONS
    ----------------------------- */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /* -----------------------------
       SLOT DATA
    ----------------------------- */
    slots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MentorAvailability",
        required: true,
      },
    ],

    /* -----------------------------
       SESSION INFO
    ----------------------------- */
    serviceType: {
      type: String,
      enum: ["ONE_TO_ONE", "RESUME_REVIEW"],
      required: true,
    },

    duration: {
      type: Number, // minutes
      min: 15,
      max: 210,
      required: true,
    },

    meetingStartTime: {
      type: Date, // derived from first slot
    },

    meetingLink: {
      type: String,
      default: null,
    },

    meetingProvider: {
      type: String,
      enum: ["ZOOM"],
      default: null,
    },

    meetingCreated: {
      type: Boolean,
      default: false,
    },

    meetingEmailSent: {
      type: Boolean,
      default: false,
    },

    /* -----------------------------
       PAYMENT INFO
    ----------------------------- */
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "PAYMENT_PENDING",
        "CONFIRMED",
        "CANCELLED",
        "FAILED",
        "EXPIRED",
        "COMPLETED",
      ],
      default: "PENDING",
      index: true,
    },

    razorpayOrderId: {
      type: String,
      default: null,
      index: true,
      sparse: true,
    },

    paymentId: {
      type: String,
      default: null,
    },

    paymentProvider: {
      type: String,
      enum: ["RAZORPAY"],
      default: null,
    },

    paymentDetails: {
      method: String,
      cardId: String,
      bank: String,
      wallet: String,
      vpa: String,
    },

    paidAt: {
      type: Date,
    },

    paymentLockExpiry: {
      type: Date,
      index: true,
    },

    paymentAttempts: [
      {
        attempt: Number,
        razorpayOrderId: String,
        razorpayPaymentId: String,
        status: String,
        amount: Number,
        method: String,
        failureReason: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    /* -----------------------------
       RESCHEDULE
    ----------------------------- */
    rescheduleRequest: rescheduleSchema,

    /* -----------------------------
       REVIEW
    ----------------------------- */
    review: reviewSchema,
  },
  { timestamps: true }
);

/* -----------------------------
   INDEXES
----------------------------- */
bookingSchema.index({ mentor: 1, createdAt: -1 });
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ slots: 1 });

/* -----------------------------
   VIRTUALS
----------------------------- */
bookingSchema.virtual("isPaymentExpired").get(function () {
  return this.paymentLockExpiry && new Date() > this.paymentLockExpiry;
});

/* -----------------------------
   METHODS
----------------------------- */
bookingSchema.methods.addPaymentAttempt = function (attemptData) {
  this.paymentAttempts.push(attemptData);
  return this.save();
};

bookingSchema.methods.updatePaymentStatus = function (
  status,
  paymentData = {}
) {
  this.status = status;

  if (status === "CONFIRMED") {
    this.paidAt = new Date();
    this.paymentId = paymentData.paymentId || null;
    this.paymentProvider = "RAZORPAY";
    this.paymentDetails = paymentData.paymentDetails || {};
  }

  return this.save();
};

/* -----------------------------
   STATICS
----------------------------- */
bookingSchema.statics.findExpiredPayments = function () {
  return this.find({
    status: "PAYMENT_PENDING",
    paymentLockExpiry: { $lt: new Date() },
  });
};

export default mongoose.model("Booking", bookingSchema);
