import cron from "node-cron";
import Booking from "../models/Booking.js";
import { createZoomMeeting } from "../utils/createZoomMeeting.js";
import sendEmail from "../utils/sendEmail.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const tenMinLater = new Date(now.getTime() + 10 * 60000);

  const bookings = await Booking.find({
    status: "CONFIRMED",
    meetingCreated: false,
    meetingStartTime: {
      $gte: now,
      $lte: tenMinLater,
    },
  }).populate("user mentor slots");

  for (const booking of bookings) {
    try {
      const slot = booking.slots[0];

      const zoomLink = await createZoomMeeting({
        topic: `Mentorship with ${booking.mentor.name}`,
        startTime: booking.meetingStartTime.toISOString(),
        duration: booking.duration,
      });

      booking.meetingLink = zoomLink;
      booking.meetingProvider = "ZOOM";
      booking.meetingCreated = true;

      await booking.save();

      // 📧 Email USER
      await sendEmail({
        to: booking.user.email,
        subject: "⏰ Your session starts in 10 minutes",
        html: `
          <h3>Mentorship Session Reminder</h3>
          <p>Mentor: ${booking.mentor.name}</p>
          <p>Date: ${slot.date}</p>
          <p>Time: ${slot.startTime}</p>
          <a href="${zoomLink}">Join Zoom Meeting</a>
        `,
      });

      // 📧 Email MENTOR
      await sendEmail({
        to: booking.mentor.email,
        subject: "⏰ Mentoring session starting soon",
        html: `
          <h3>Upcoming Session</h3>
          <p>User: ${booking.user.name}</p>
          <a href="${zoomLink}">Start Zoom Meeting</a>
        `,
      });

      booking.meetingEmailSent = true;
      await booking.save();
      console.log("✅ Zoom meeting created & emails sent");

    } catch (err) {
      console.error("❌ Meeting creation failed:", err.message);
    }
  }
});
