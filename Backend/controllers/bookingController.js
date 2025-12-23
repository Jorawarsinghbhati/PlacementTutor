import MentorAvailability from "../models/MentorAvailability.js";
import Booking from "../models/Booking.js";
// export const lockSlot = async (req, res) => {
//   try {
//     const { slotId } = req.body;
//     const now = new Date();
//     const lockExpiry = new Date(now.getTime() + 10 * 60 * 1000); // 10 min

//     const slot = await MentorAvailability.findOneAndUpdate(
//       {
//         _id: slotId,
//         isBooked: false,
//         $or: [
//           { lockedUntil: null },
//           { lockedUntil: { $lt: now } },
//         ],
//       },
//       {
//         lockedUntil: lockExpiry,
//       },
//       { new: true }
//     );

//     if (!slot) {
//       return res.status(409).json({
//         success: false,
//         message: "Slot already locked or booked",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Slot locked for payment",
//       slot,
//       lockExpiresAt: lockExpiry,
//     });
//   } catch (err) {
//     console.error("Lock slot error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to lock slot",
//     });
//   }
// };
export const lockSlot = async (req, res) => {
  try {
    const { slotId, mentorId, serviceType, amount } = req.body;
    const userId = req.user._id;
    const now = new Date();
    const lockExpiry = new Date(now.getTime() + 15 * 60 * 1000);

    // 1. Check slot availability
    const slot = await MentorAvailability.findOne({
      _id: slotId,
      mentor: mentorId,
      isBooked: false,
      $or: [
        { lockedUntil: null },
        { lockedUntil: { $lt: now } },
      ],
    });

    if (!slot) {
      return res.status(409).json({
        success: false,
        message: "Slot is not available",
      });
    }

    // 2. Find or create booking
    let booking = await Booking.findOne({
      user: userId,
      slot: slotId,
      status: { $in: ["PENDING", "PAYMENT_PENDING", "FAILED"] },
    });

    if (!booking) {
      // Create new booking
      booking = await Booking.create({
        user: userId,
        mentor: mentorId,
        slot: slotId,
        serviceType: serviceType || "ONE_TO_ONE",
        amount: amount || 0,
        status: "PAYMENT_PENDING",
        createdAt: now,
      });
    } else {
      // Update existing booking
      booking.status = "PAYMENT_PENDING";
      booking.updatedAt = now;
      await booking.save();
    }

    // 3. Lock the slot
    await MentorAvailability.findByIdAndUpdate(slotId, {
      lockedUntil: lockExpiry,
    });

    res.status(200).json({
      success: true,
      message: booking.createdAt === booking.updatedAt 
        ? "Booking created and slot locked" 
        : "Existing booking updated",
      booking: {
        _id: booking._id,
        slotId: booking.slot,
        mentorId: booking.mentor,
        amount: booking.amount,
        status: booking.status,
        createdAt: booking.createdAt,
      },
      slot: {
        _id: slot._id,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
      lockExpiresAt: lockExpiry,
    });
  } catch (err) {
    console.error("Lock slot error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to lock slot",
      error: err.message,
    });
  }
};
export const confirmBooking = async (req, res) => {
  const { slotId, mentorId, serviceType, amount, paymentId } = req.body;

  // 🔐 Mark slot booked
  await MentorAvailability.findByIdAndUpdate(slotId, {
    isBooked: true,
    lockedUntil: null,
  });

  const booking = await Booking.create({
    user: req.user.id,
    mentor: mentorId,
    slot: slotId,
    serviceType,
    amount,
    paymentId,
    paymentProvider: "RAZORPAY",
    status: "CONFIRMED",
  });

  res.json({
    success: true,
    booking,
  });
};
export const getMyBookings = async (req, res) => {
  try {
    console.log("reaching at get my booking bro..")
    const userId = req.user.id;
    const now = new Date();

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "mentor",
        select: "name email",
      })
      .populate({
        path: "slot",
        select: "date startTime endTime",
      })
      .sort({ createdAt: -1 });

    const upcoming = [];
    const completed = [];

    bookings.forEach((booking) => {
      // convert slot date + time to Date object
      const slotDateTime = new Date(
        `${booking.slot.date}T${booking.slot.startTime}:00`
      );

      if (
        booking.status === "CONFIRMED" &&
        slotDateTime >= now
      ) {
        upcoming.push(booking);
      } else {
        completed.push(booking);
      }
    });

    return res.status(200).json({
      success: true,
      upcoming,
      completed,
    });
  } catch (err) {
    console.error("Get my bookings error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};