import Booking from "../../models/Booking.js";
import MentorAvailability from "../../models/MentorAvailability.js";
import sendEmail from "../../utils/sendEmail.js";
import User from "../../models/User.js";
import MentorProfile from "../../models/MentorProfile.js";

export const requestRescheduleByMentor = async (req, res) => {
  try {
    const mentorId = req.user.id;
    const { bookingId } = req.params;
    const { date, startTime, reason } = req.body;
    console.log(
      "pahuch gya bhai",
      bookingId,
      date,
      startTime,
      reason,
      mentorId
    );
    if (!date || !startTime) {
      return res.status(400).json({
        success: false,
        message: "date and startTime are required",
      });
    }
    const booking = await Booking.findOne({
      _id: bookingId,
      mentor: mentorId,
      status: "CONFIRMED",
    });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or not eligible",
      });
    }

    if (booking.rescheduleRequest?.status === "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Reschedule already requested",
      });
    }
    const duration = booking.duration;
    if (!duration || duration % 15 !== 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking duration",
      });
    }

    const slotsNeeded = duration / 15;
    const now = new Date();
    const lockExpiry = new Date(now.getTime() + 15 * 60 * 1000);
    const slots = await MentorAvailability.find({
      mentor: mentorId,
      date,
      startTime: { $gte: startTime },
      isBooked: false,
      $or: [{ lockedUntil: null }, { lockedUntil: { $lt: now } }],
    })
      .sort({ startTime: 1 })
      .limit(slotsNeeded);

    console.log("bhai new slots  bhi mil gye re", slots);
    if (slots.length < slotsNeeded) {
      return res.status(409).json({
        success: false,
        message: "Not enough slots available",
      });
    }
    for (let i = 1; i < slots.length; i++) {
      if (slots[i - 1].endTime !== slots[i].startTime) {
        return res.status(409).json({
          success: false,
          message: "Slots are not contiguous",
        });
      }
    }

    const lastSlot = slots[slots.length - 1];
    const endDateTime = new Date(`${lastSlot.date}T${lastSlot.endTime}:00`);

    if (endDateTime <= now) {
      return res.status(400).json({
        success: false,
        message: "Cannot reschedule to past time",
      });
    }

    await MentorAvailability.updateMany(
      { _id: { $in: slots.map((s) => s._id) } },
      { lockedUntil: lockExpiry }
    );

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    booking.rescheduleRequest = {
      proposedSlots: slots.map((s) => s._id),
      oldSlots: booking.slots, // 🔴 IMPORTANT
      proposedDate: date,
      proposedStartTime: startTime,
      proposedBy: "MENTOR",
      reason,
      status: "PENDING",
      requestedAt: new Date(),
      expiresAt: expiresAt,
    };

    await booking.save();

    /* --------------------------------------------------
       8️⃣ Notify user (optional async)
    -------------------------------------------------- */
    // await sendEmail(booking.user.email, "Mentor proposed a new time")
    const user = await User.findById(booking.user).select("email name");

    console.log("bhai email bhejne wala hu user ko", user.email);
    await sendEmail({
      to: user.email,
      subject: "Changed timing of your mentoring session",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Your mentor has requested to reschedule your session</h2>
    
          <p><strong>New Proposed Date:</strong> ${date}</p>
          <p><strong>New Proposed Start Time:</strong> ${startTime}</p>
          <p><strong>Reason:</strong> ${reason || "Not specified"}</p>
    
          <p>
            Please log in to your account to
            <strong>accept or reject</strong> the proposed reschedule.
          </p>
    
          <br />
          <p>— Team PlacementTutor</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Reschedule request sent to user",
      expiresAt: lockExpiry,
    });
  } catch (error) {
    console.error("❌ Mentor reschedule error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to request reschedule",
    });
  }
};

export const acceptReschedule = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookingId } = req.params;
    /* --------------------------------------------------
       1️⃣ Fetch booking
    -------------------------------------------------- */
    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      status: "CONFIRMED",
    }).populate("slots");

    if (!booking || !booking.rescheduleRequest) {
      return res.status(404).json({
        success: false,
        message: "Reschedule request not found",
      });
    }

    if (booking.rescheduleRequest.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Reschedule already processed",
      });
    }

    const newSlotIds = booking.rescheduleRequest.proposedSlots;

    /* --------------------------------------------------
       2️⃣ Free OLD slots
    -------------------------------------------------- */

    await MentorAvailability.updateMany(
      { _id: { $in: booking.slots.map((s) => s._id) } },
      {
        isBooked: false,
        lockedUntil: null,
        bookingId: null,
      }
    );

    /* --------------------------------------------------
       3️⃣ Book NEW slots
    -------------------------------------------------- */
    await MentorAvailability.updateMany(
      { _id: { $in: newSlotIds } },
      {
        isBooked: true,
        lockedUntil: null,
        bookingId: booking._id,
      }
    );

    /* --------------------------------------------------
       4️⃣ Update booking
    -------------------------------------------------- */
    booking.slots = newSlotIds;
    booking.rescheduleRequest.status = "ACCEPTED";
    booking.rescheduleRequest.resolvedAt = new Date();

    // meetingStartTime = first slot start
    const firstSlot = await MentorAvailability.findById(newSlotIds[0]);
    booking.meetingStartTime = new Date(
      `${firstSlot.date}T${firstSlot.startTime}:00`
    );

    await booking.save();

    /* --------------------------------------------------
       5️⃣ Notify mentor (optional)
    -------------------------------------------------- */
    const mentorProfile = await MentorProfile.findOne({
      user: booking.mentor,
    }).populate("user", "email name");
    await sendEmail({
      to: mentorProfile.user.email,
      subject: "Changed timing of your mentoring session",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Reschedule Accepted 🎉</h2>

                <p>The user has <strong>accepted</strong> your reschedule request.</p>

                <p><strong>New Date:</strong> ${booking.rescheduleRequest.proposedDate}</p>
                <p><strong>New Start Time:</strong> ${booking.rescheduleRequest.proposedStartTime}</p>
                <p>Please be available on time.</p>

                <br />
                <p>— Team PlacementTutor</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Reschedule accepted successfully",
    });
  } catch (error) {
    console.error("❌ Accept reschedule error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to accept reschedule",
    });
  }
};

export const rejectReschedule = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookingId } = req.params;
    console.log("bhai reject reschedule me a gya", bookingId, userId);

    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      status: "CONFIRMED",
    });
    console.log("bhai booking mil gyi reject me", booking);

    if (!booking || !booking.rescheduleRequest) {
      return res.status(404).json({
        success: false,
        message: "Reschedule request not found",
      });
    }

    if (booking.rescheduleRequest.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Reschedule already processed",
      });
    }

    const proposedSlots = booking.rescheduleRequest.proposedSlots;

    await MentorAvailability.updateMany(
      { _id: { $in: proposedSlots } },
      { lockedUntil: null }
    );

    booking.rescheduleRequest.status = "REJECTED";
    booking.rescheduleRequest.resolvedAt = new Date();
    await booking.save();

    const mentorProfile = await MentorProfile.findOne({
      user: booking.mentor,
    }).populate("user", "email name");
    
    await sendEmail({
      to: mentorProfile.user.email,
      subject: "Changed timing of your mentoring session",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="color: #e11d48;">Reschedule Request Rejected</h2>

            <p>
              Unfortunately, the user has <strong>rejected</strong> your reschedule request
              for the mentoring session.
            </p>

            <hr style="margin: 16px 0;" />

            <p>
              <strong>Proposed Date:</strong> ${booking.rescheduleRequest.proposedDate}<br />
              <strong>Proposed Start Time:</strong> ${booking.rescheduleRequest.proposedStartTime}
            </p>

            <p>
              You may propose a new time or continue with the original scheduled session.
            </p>

            <p style="margin-top: 20px;">
              Please log in to your mentor dashboard to take the next action.
            </p>

            <br />

            <p style="color: #555;">
              — Team <strong>PlacementTutor</strong>
            </p>
          </div>

      `,
    });

    return res.status(200).json({
      success: true,
      message: "Reschedule rejected",
    });
  } catch (error) {
    console.error("❌ Reject reschedule error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reject reschedule",
    });
  }
};
