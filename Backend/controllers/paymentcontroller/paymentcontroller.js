import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../../models/Booking.js";
import MentorAvailability from "../../models/MentorAvailability.js";
import MentorProfile from "../../models/MentorProfile.js";
import sendEmail from "../../utils/sendEmail.js";
import {
  userBookingConfirmedTemplate,
  mentorBookingConfirmedTemplate,
} from "../../utils/emailTemplates.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



export const getRazorpayKey = (req, res) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID,
  });
};


export const createRazorpayOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.id;

    // 1️⃣ Verify booking
    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      status: "PAYMENT_PENDING",
    }).populate("slots");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or already processed",
      });
    }

    // 2️⃣ Check payment lock expiry
    if (booking.paymentLockExpiry && new Date() > booking.paymentLockExpiry) {
      booking.status = "EXPIRED";
      await booking.save();

      // 🔓 Release locked slots
      await MentorAvailability.updateMany(
        { _id: { $in: booking.slots } },
        { lockedUntil: null }
      );

      // 🧹 Remove buffer slots
      await MentorAvailability.deleteMany({
        isBuffer: true,
        bufferForBooking: booking._id,
      });

      return res.status(400).json({
        success: false,
        message: "Payment session expired",
      });
    }

    // 3️⃣ Amount from booking (single source of truth)
    const amount = booking.amount;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${bookingId}`,
      notes: {
        bookingId: bookingId.toString(),
        userId: userId.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    // 4️⃣ Save order attempt
    booking.razorpayOrderId = order.id;
    booking.paymentAttempts.push({
      attempt: booking.paymentAttempts.length + 1,
      razorpayOrderId: order.id,
      status: "initiated",
      amount,
    });

    await booking.save();

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      bookingId: booking._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    console.log("🟡 Verifying payment:", bookingId);

    /* --------------------------------------------------
       1️⃣ Verify Razorpay signature
    -------------------------------------------------- */
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await markBookingFailed(bookingId, {
        razorpay_order_id,
        razorpay_payment_id,
        reason: "invalid_signature",
      });

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    /* --------------------------------------------------
       2️⃣ Fetch payment details from Razorpay
    -------------------------------------------------- */
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      await markBookingFailed(bookingId, {
        razorpay_order_id,
        razorpay_payment_id,
        reason: payment.error_description || "payment_not_captured",
      });

      return res.status(400).json({
        success: false,
        message: "Payment not captured",
      });
    }

    /* --------------------------------------------------
       3️⃣ Fetch booking WITH slots
    -------------------------------------------------- */
    const booking = await Booking.findById(bookingId).populate("slots");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "PAYMENT_PENDING") {
      return res.status(400).json({
        success: false,
        message: "Booking already processed",
      });
    }

    /* --------------------------------------------------
       4️⃣ Amount validation
    -------------------------------------------------- */
    const expectedAmount = booking.amount * 100; // paise
    if (payment.amount !== expectedAmount) {
      await markBookingFailed(bookingId, {
        razorpay_order_id,
        razorpay_payment_id,
        reason: "amount_mismatch",
      });

      return res.status(400).json({
        success: false,
        message: "Payment amount mismatch",
      });
    }
    console.log("Amount validated");
    /* --------------------------------------------------
       5️⃣ Find BUFFER SLOT dynamically
       (last slot endTime → buffer startTime)
    -------------------------------------------------- */
    const bookedSlots = await MentorAvailability.find({
      _id: { $in: booking.slots },
    });
    const sortedSlots = bookedSlots.sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );
    const lastSlot = sortedSlots[sortedSlots.length - 1];
    console.log("Last booked slot:", lastSlot);
    const bufferSlot = await MentorAvailability.findOne({
      mentor: booking.mentor,
      date: lastSlot.date,
      startTime: lastSlot.endTime,
    });
    console.log("Buffer slot found:", bufferSlot);
    /* --------------------------------------------------
       6️⃣ Finalize booking
    -------------------------------------------------- */
    booking.status = "CONFIRMED";
    booking.paymentId = razorpay_payment_id;
    booking.paymentProvider = "RAZORPAY";
    booking.paidAt = new Date();
    booking.paymentLockExpiry = null;

    booking.paymentAttempts = booking.paymentAttempts || [];
    booking.paymentAttempts.push({
      attempt: booking.paymentAttempts.length + 1,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: "success",
      amount: booking.amount,
      method: payment.method,
      timestamp: new Date(),
    });
    const slot = booking.slots[0];

    const meetingStartTime = new Date(`${slot.date}T${slot.startTime}:00`);
    booking.meetingStartTime = meetingStartTime;
    await booking.save();

    /* --------------------------------------------------
       7️⃣ Mark SESSION slots as booked
    -------------------------------------------------- */
    await MentorAvailability.updateMany(
      { _id: { $in: booking.slots.map((s) => s._id) } },
      {
        isBooked: true,
        lockedUntil: null,
        bookingId: booking._id,
      }
    );

    /* --------------------------------------------------
       8️⃣ DELETE buffer slot permanently
       (buffer time is wasted intentionally)
    -------------------------------------------------- */
    if (bufferSlot) {
      await MentorAvailability.findByIdAndDelete(bufferSlot._id);
    }
    await booking.populate("user mentor");
    console.log("booking ka user", booking.user);
    console.log("user ka email", booking.user.email);
    await sendEmail({
      to: booking.user.email,
      subject: "🎉 Your booking is confirmed",
      html: userBookingConfirmedTemplate({
        userName: booking.user.name,
        mentorName: booking.mentor.name,
        date: booking.slots[0].date,
        time: booking.slots[0].startTime,
        duration: booking.duration,
      }),
    });
    console.log("booking ka mentor", booking.mentor);
    console.log("booking mentor's email..", booking.mentor.email);
    await sendEmail({
      to: booking.mentor.email,
      subject: "📅 New mentoring session booked",
      html: mentorBookingConfirmedTemplate({
        mentorName: booking.mentor.name,
        userName: booking.user.name,
        date: booking.slots[0].date,
        time: booking.slots[0].startTime,
        duration: booking.duration,
      }),
    });
    console.log("✅ Payment verified & booking confirmed");

    return res.status(200).json({
      success: true,
      message: "Payment verified and booking confirmed",
      booking: {
        _id: booking._id,
        status: booking.status,
        amount: booking.amount,
        duration: booking.duration,
        paidAt: booking.paidAt,
      },
    });
  } catch (error) {
    console.error("🔴 verifyPayment error:", error);

    try {
      await markBookingFailed(req.body.bookingId, {
        razorpay_order_id: req.body.razorpay_order_id,
        razorpay_payment_id: req.body.razorpay_payment_id,
        reason: error.message,
      });
    } catch (_) {}

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


async function markBookingFailed(bookingId, meta) {
  const booking = await Booking.findById(bookingId);
  if (!booking) return;

  booking.status = "FAILED";
  booking.paymentAttempts = booking.paymentAttempts || [];

  booking.paymentAttempts.push({
    attempt: booking.paymentAttempts.length + 1,
    razorpayOrderId: meta.razorpay_order_id,
    razorpayPaymentId: meta.razorpay_payment_id,
    status: "failed",
    failureReason: meta.reason,
    timestamp: new Date(),
  });

  await booking.save();
}
