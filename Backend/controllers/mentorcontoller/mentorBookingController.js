import Booking from "../../models/Booking.js";


export const getUpcomingBooking = async (req, res) => {
  try {
    const mentorId = req.user.id;
    const now = new Date();

    const bookings = await Booking.find({
      mentor: mentorId,
      status: { $in: ["PENDING", "CONFIRMED"] }
    })
      .populate({
        path: "slots",
        select: "date startTime endTime",
      })
      .populate({
        path: "user",
        select: "username email phone college graduationYear",
      })
      .sort({ createdAt: -1 });

    const upcomingBookings = bookings.filter((booking) => {
      if (!booking.slots || booking.slots.length === 0) return false;

      // sort slots by startTime
      const sortedSlots = booking.slots.sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );

      const lastSlot = sortedSlots[sortedSlots.length - 1];

      const endDateTime = new Date(
        `${lastSlot.date}T${lastSlot.endTime}:00`
      );

      return endDateTime >= now;
    });

    res.status(200).json({
      success: true,
      count: upcomingBookings.length,
      bookings: upcomingBookings,
    });

  } catch (error) {
    console.error("❌ Error fetching upcoming mentor bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming bookings",
    });
  }
};
export const getMentorCompletedBookings = async (req, res) => {
  try {
    const mentorId = req.user.id;
    const now = new Date();

    const bookings = await Booking.find({
      mentor: mentorId,
      status: "CONFIRMED",
    })
      .populate({
        path: "slots",
        select: "date startTime endTime",
      })
      .populate({
        path: "user",
        select: "name email username college graduationYear",
      })
      .select(
        "serviceType amount status paymentId paymentProvider review createdAt updatedAt slots"
      )
      .sort({ createdAt: -1 });

    const completedBookings = bookings.filter((booking) => {
      if (!booking.slots || booking.slots.length === 0) return false;

      const sortedSlots = booking.slots.sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );

      const lastSlot = sortedSlots[sortedSlots.length - 1];

      const endDateTime = new Date(
        `${lastSlot.date}T${lastSlot.endTime}:00`
      );

      return endDateTime < now;
    });

    res.status(200).json({
      success: true,
      count: completedBookings.length,
      bookings: completedBookings,
    });

  } catch (error) {
    console.error("❌ Error fetching completed mentor bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch completed bookings",
    });
  }
};


