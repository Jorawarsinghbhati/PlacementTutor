import MentorAvailability from "../models/MentorAvailability.js";
import Booking from "../models/Booking.js";
import MentorProfile from "../models/MentorProfile.js";

// export const lockSlot = async (req, res) => {
//   try {
//     console.log("Locking slot.......");
//     const { slotId, mentorId, serviceType, duration } = req.body; // Added duration
    
//     const userId = req.user.id;
//     const now = new Date();
//     const lockExpiry = new Date(now.getTime() + 15 * 60 * 1000);
    
//     console.log("Locking slot:", slotId, "for user:", mentorId, "duration:", duration);

//     // 1. Validate duration
//     if (!duration || duration < 15) {
//       return res.status(400).json({
//         success: false,
//         message: "Minimum booking duration is 15 minutes"
//       });
//     }

//     // 2. Check slot availability
//     const slot = await MentorAvailability.findOne({
//       _id: slotId,
//       mentor: mentorId,
//       isBooked: false,
//       $or: [
//         { lockedUntil: null },
//         { lockedUntil: { $lt: now } },
//       ],
//     });

//     console.log("Slot found:", slot);

//     if (!slot) {
//       return res.status(409).json({
//         success: false,
//         message: "Slot is not available",
//       });
//     }
//     const mentorProfile = await MentorProfile.findOne({ user: mentorId });
    
//     if (!mentorProfile) {
//       return res.status(404).json({
//         success: false,
//         message: "Mentor not found",
//       });
//     }

//     // 4. Calculate amount based on duration
//     const hourlyRate = mentorProfile.sessionPrice;
//     const perMinuteRate = hourlyRate / 60;
//     const amount = Math.round(perMinuteRate * duration);
    
//     // Validate duration against slot constraints
//     const slotStartTime = new Date(`${slot.date}T${slot.startTime}`);
//     const slotEndTime = new Date(`${slot.date}T${slot.endTime}`);
//     const slotDurationMinutes = (slotEndTime - slotStartTime) / (1000 * 60);
    
//     if (duration > slotDurationMinutes) {
//       return res.status(400).json({
//         success: false,
//         message: `Selected duration (${duration} minutes) exceeds available slot duration (${slotDurationMinutes} minutes)`
//       });
//     }

//     // 5. Check/create booking
//     let booking = await Booking.findOne({
//       user: userId,
//       slot: slotId,
//       status: { $in: ["PENDING", "PAYMENT_PENDING", "FAILED"] },
//     });
    
//     console.log("Existing booking:", booking);

//     if (!booking) {
//       // Create new booking with duration
//       booking = await Booking.create({
//         user: userId,
//         mentor: mentorId,
//         slot: slotId,
//         serviceType: serviceType || "ONE_TO_ONE",
//         duration: duration,
//         amount: amount,
//         status: "PAYMENT_PENDING",
//         createdAt: now,
//       });
//     } else {
//       // Update existing booking
//       booking.duration = duration;
//       booking.amount = amount;
//       booking.status = "PAYMENT_PENDING";
//       booking.updatedAt = now;
//       await booking.save();
//     }

//     // 6. Lock the slot
//     await MentorAvailability.findByIdAndUpdate(slotId, {
//       lockedUntil: lockExpiry,
//     });

//     res.status(200).json({
//       success: true,
//       message: booking.createdAt === booking.updatedAt 
//         ? "Booking created and slot locked" 
//         : "Existing booking updated",
//       booking: {
//         _id: booking._id,
//         slotId: booking.slot,
//         mentorId: booking.mentor,
//         duration: booking.duration,
//         amount: booking.amount,
//         status: booking.status,
//         createdAt: booking.createdAt,
//       },
//       slot: {
//         _id: slot._id,
//         date: slot.date,
//         startTime: slot.startTime,
//         endTime: slot.endTime,
//         availableDuration: slotDurationMinutes,
//       },
//       lockExpiresAt: lockExpiry,
//     });
//   } catch (err) {
//     console.error("Lock slot error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to lock slot",
//       error: err.message,
//     });
//   }
// };
export const lockSlot = async (req, res) => {
  try {
    const { mentorId, date, startTime, duration, serviceType } = req.body;
    const userId = req.user.id;
    console.log("Locking slot for user:", userId, "mentor:", mentorId, "date:", date, "startTime:", startTime, "duration:", duration);
    const now = new Date();
    const lockExpiry = new Date(now.getTime() + 15 * 60 * 1000);

    if (!date || !startTime || !duration) {
      return res.status(400).json({
        success: false,
        message: "date, startTime and duration are required",
      });
    }

    if (duration < 15 || duration % 15 !== 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be in 15 minute multiples",
      });
    }

    const slotsNeeded = duration / 15;
    const bufferSlots = 1; // 15 min buffer
    
    // 🔹 Fetch all atomic slots starting from startTime
    const slots = await MentorAvailability.find({
      mentor: mentorId,
      date,
      startTime: { $gte: startTime },
      isBooked: false,
      $or: [{ lockedUntil: null }, { lockedUntil: { $lt: now } }],
    })
      .sort({ startTime: 1 })
      .limit(slotsNeeded + bufferSlots);
    console.log("Fetched slots:", slots);
    if (slots.length < slotsNeeded) {
      return res.status(409).json({
        success: false,
        message: "Not enough contiguous slots available",
      });
    }

    // 🔹 Ensure continuity (15-min gap check)
    for (let i = 1; i < slotsNeeded; i++) {
      if (slots[i].startTime !== slots[i - 1].endTime) {
        return res.status(409).json({
          success: false,
          message: "Slots are not contiguous",
        });
      }
    }

    const bookingSlots = slots.slice(0, slotsNeeded);
    const bufferSlot = slots[slotsNeeded] || null;

    // 🔹 Price calculation
    const mentorProfile = await MentorProfile.findOne({ user: mentorId });
    const perMinute = mentorProfile.sessionPrice / 60;
    const amount = Math.round(perMinute * duration);

    // 🔹 Create booking
    const booking = await Booking.create({
      user: userId,
      mentor: mentorId,
      slots: bookingSlots.map(s => s._id),
      serviceType: serviceType || "ONE_TO_ONE",
      duration,
      amount,
      status: "PAYMENT_PENDING",
      paymentLockExpiry: lockExpiry,
    });

    // 🔹 Mark booking slots as booked
    await MentorAvailability.updateMany(
      { _id: { $in: bookingSlots.map(s => s._id) } },
      { lockedUntil: lockExpiry }
    );

    // 🔹 Lock buffer slot
    if (bufferSlot) {
      await MentorAvailability.findByIdAndUpdate(bufferSlot._id, {
        lockedUntil: lockExpiry,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Slots locked for payment",
      booking,
      lockExpiresAt: lockExpiry,
    });

  } catch (err) {
    console.error("Lock slot error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to lock slot",
    });
  }
};
// export const getMyBookings = async (req, res) => {
//   try {
//     console.log("📘 getMyBookings hit");
//     const userId = req.user.id;
//     const now = new Date();

//     const bookings = await Booking.find({ user: userId })
//       .populate({
//         path: "mentor",
//         select: "name email username",
//       })
//       .populate({
//         path: "slots",
//         select: "date startTime endTime",
//       })
//       .sort({ createdAt: -1 });

//     const upcoming = [];
//     const completed = [];

//     bookings.forEach((booking) => {
//       if (!booking.slots?.length) return;

//       // 🔥 get LAST slot (important)
//       const lastSlot = booking.slots.reduce((latest, slot) =>
//         slot.endTime > latest.endTime ? slot : latest
//       );

//       const sessionEndTime = new Date(
//         `${lastSlot.date}T${lastSlot.endTime}:00`
//       );

//       // ✅ UPCOMING
//       if (
//         booking.status === "CONFIRMED" &&
//         sessionEndTime >= now
//       ) {
//         upcoming.push(booking);
//       }

//       // ✅ COMPLETED (only confirmed & finished)
//       else if (
//         booking.status === "CONFIRMED" &&
//         sessionEndTime < now
//       ) {
//         completed.push(booking);
//       }
//     });

//     return res.status(200).json({
//       success: true,
//       upcoming,
//       completed,
//     });

//   } catch (err) {
//     console.error("❌ Get my bookings error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch bookings",
//     });
//   }
// };

export const getMyBookings = async (req, res) => {
  try {
    console.log("📘 getMyBookings hit");
    const userId = req.user.id;
    const now = new Date();

    const bookings = await Booking.find({
      user: userId,
      status: { $in: ["CONFIRMED", "PENDING"] },
    })
      .populate({
        path: "mentor",
        select: "name email username",
      })
      .populate({
        path: "slots",
        select: "date startTime endTime",
      })
      .populate({
        path: "rescheduleRequest.proposedSlots",
        select: "date startTime endTime",
      })
      .sort({ createdAt: -1 });

    const upcoming = [];
    const completed = [];

    for (const booking of bookings) {
      if (!booking.slots || booking.slots.length === 0) continue;

      // 🔥 Sort slots by endTime
      const sortedSlots = [...booking.slots].sort((a, b) =>
        a.endTime.localeCompare(b.endTime)
      );

      const lastSlot = sortedSlots[sortedSlots.length - 1];

      const sessionEndTime = new Date(
        `${lastSlot.date}T${lastSlot.endTime}:00`
      );

      /* ----------------------------------
         UPCOMING CONDITIONS
      ---------------------------------- */
      if (
        booking.status === "CONFIRMED" &&
        sessionEndTime >= now
      ) {
        upcoming.push(booking);
        continue;
      }

      // 🔁 Mentor proposed reschedule (still upcoming)
      if (
        booking.rescheduleRequest &&
        booking.rescheduleRequest.status === "PENDING" &&
        booking.rescheduleRequest.proposedBy === "MENTOR"
      ) {
        upcoming.push(booking);
        continue;
      }

      /* ----------------------------------
         COMPLETED CONDITIONS
      ---------------------------------- */
      if (
        booking.status === "CONFIRMED" &&
        sessionEndTime < now
      ) {
        completed.push(booking);
      }
    }

    return res.status(200).json({
      success: true,
      upcoming,
      completed,
    });

  } catch (err) {
    console.error("❌ Get my bookings error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

export const submitBookingReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookingId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      status: "CONFIRMED",
    }).populate("slots");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Prevent double review
    if (booking.review?.rating) {
      return res.status(400).json({
        success: false,
        message: "Review already submitted",
      });
    }

    // Check session completion
    const lastSlot = booking.slots.reduce((latest, slot) =>
      slot.endTime > latest.endTime ? slot : latest
    );

    const sessionEnd = new Date(
      `${lastSlot.date}T${lastSlot.endTime}:00`
    );

    if (sessionEnd > new Date()) {
      return res.status(400).json({
        success: false,
        message: "You can review only after session completion",
      });
    }

    // Save review
    booking.review = {
      rating,
      comment: comment || "",
      reviewedAt: new Date(),
    };

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      review: booking.review,
    });

  } catch (err) {
    console.error("Submit review error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
};
