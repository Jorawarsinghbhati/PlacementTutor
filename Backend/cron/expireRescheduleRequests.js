import cron from "node-cron";
import Booking from "../models/Booking.js";
import MentorAvailability from "../models/MentorAvailability.js";

cron.schedule("*/10 * * * *", async () => {
  try {
    const now = new Date();

    console.log("⏳ Running reschedule expiry cron...");

    const expiredBookings = await Booking.find({
      "rescheduleRequest.status": "PENDING",
      "rescheduleRequest.expiresAt": { $lt: now },
    });

    if (expiredBookings.length === 0) {
      console.log("✅ No expired reschedule requests");
      return;
    }

    for (const booking of expiredBookings) {
      const { proposedSlots } = booking.rescheduleRequest;

      // 🔓 Unlock proposed slots
      await MentorAvailability.updateMany(
        { _id: { $in: proposedSlots } },
        { lockedUntil: null }
      );

      // ❌ Mark request expired
      booking.rescheduleRequest.status = "EXPIRED";
      booking.rescheduleRequest.resolvedAt = now;

      await booking.save();

      console.log(
        `❌ Reschedule expired for booking ${booking._id}`
      );
    }

  } catch (err) {
    console.error("❌ Reschedule expiry cron failed:", err);
  }
});
