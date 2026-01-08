import User from "../../models/User.js";
import Booking from "../../models/Booking.js";


export const getAdminDashboardstats = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [
      totalBookings,
      todaysBookings,
      totalUsers,
      completedRevenueAgg
    ] = await Promise.all([
      Booking.countDocuments(),

      Booking.countDocuments({
        createdAt: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      }),

      User.countDocuments(),

      Booking.aggregate([
        {
          $match: {
            status: { $in: ["CONFIRMED", "COMPLETED"] }, 
            paidAt: { $ne: null },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    const totalRevenue = completedRevenueAgg[0]?.totalRevenue || 0;

    res.status(200).json({
      success: true,
      val: {
        totalBookings,
        todaysBookings,
        totalRevenue,
        totalUsers,
      },
    });
  } catch (error) {
    console.error("❌ Admin Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
    });
  }
};

export const getAllBookingsDetailed = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      /* --------------------------------
         1️⃣ UNWIND slots (multi-slot support)
      -------------------------------- */
      { $unwind: "$slots" },

      /* --------------------------------
         2️⃣ SLOT DETAILS
      -------------------------------- */
      {
        $lookup: {
          from: "mentoravailabilities",
          localField: "slots",
          foreignField: "_id",
          as: "slot",
        },
      },
      { $unwind: "$slot" },

      /* --------------------------------
         3️⃣ USER DETAILS
      -------------------------------- */
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      /* --------------------------------
         4️⃣ MENTOR DETAILS
      -------------------------------- */
      {
        $lookup: {
          from: "users",
          localField: "mentor",
          foreignField: "_id",
          as: "mentor",
        },
      },
      { $unwind: "$mentor" },

      /* --------------------------------
         5️⃣ GROUP BACK → 1 BOOKING = 1 ROW
      -------------------------------- */
      {
        $group: {
          _id: "$_id",

          bookingId: { $first: "$_id" },

          // User
          userId: { $first: "$user._id" },
          userName: { $first: "$user.name" },
          userEmail: { $first: "$user.email" },

          // Mentor
          mentorId: { $first: "$mentor._id" },
          mentorName: { $first: "$mentor.name" },
          mentorEmail: { $first: "$mentor.email" },

          // Slot timing (important)
          date: { $first: "$slot.date" },
          startTime: { $min: "$slot.startTime" },
          endTime: { $max: "$slot.endTime" },

          // Booking info
          status: { $first: "$status" },
          serviceType: { $first: "$serviceType" },
          amount: { $first: "$amount" },
          duration: { $first: "$duration" },
          createdAt: { $first: "$createdAt" },

          // Review (optional)
          review: { $first: "$review" },

          // Reschedule (admin visibility)
          rescheduleRequest: { $first: "$rescheduleRequest" },
        },
      },

      /* --------------------------------
         6️⃣ SORT (Latest first)
      -------------------------------- */
      { $sort: { createdAt: -1 } },
    ]);

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("❌ getAllBookingsDetailed error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

export const getAllUsersDetailed = async (req, res) => {
  try {
    const users = await User.find({ role: "USER" }) // ✅ only users
      .select(
        " email username phone college graduationYear createdAt"
      )
      .sort({ createdAt: -1 });
    console.log(users);
    res.status(200).json({
      success: true,
      count: users.length,
      val: users
    });

  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

export const deleteUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Attempting to delete user with ID: ${userId}`);
    // 1️⃣ Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ❌ Prevent deleting admins
    if (user.role === "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin account cannot be deleted",
      });
    }

    // 2️⃣ Optional: block deletion if active bookings exist
    const activeBookings = await Booking.countDocuments({
      user: userId,
      status: { $in: ["CONFIRMED", "PAYMENT_PENDING"] },
    });

    if (activeBookings > 0) {
      return res.status(400).json({
        success: false,
        message: "User has active bookings, cannot delete",
      });
    }

    // 3️⃣ Delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};
export const getPopularTimeSlot = async (req, res) => {
  try {
    const popularSlotAgg = await Booking.aggregate([
      // only valid bookings
      {
        $match: {
          status: { $in: ["CONFIRMED", "COMPLETED"] },
        },
      },

      // each booking may have multiple slots
      { $unwind: "$slots" },

      // join slot details
      {
        $lookup: {
          from: "mentoravailabilities",
          localField: "slots",
          foreignField: "_id",
          as: "slot",
        },
      },
      { $unwind: "$slot" },

      // group by time slot
      {
        $group: {
          _id: {
            startTime: "$slot.startTime",
            endTime: "$slot.endTime",
          },
          totalBookings: { $sum: 1 },
        },
      },

      // most popular first
      { $sort: { totalBookings: -1 } },

      // only top 1
      { $limit: 1 },
    ]);

    if (!popularSlotAgg.length) {
      return res.status(200).json({
        success: true,
        popularTimeSlot: null,
      });
    }

    const slot = popularSlotAgg[0];

    res.status(200).json({
      success: true,
      popularTimeSlot: {
        startTime: slot._id.startTime,
        endTime: slot._id.endTime,
        bookings: slot.totalBookings,
      },
    });
  } catch (error) {
    console.error("❌ Popular Time Slot Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch popular time slot",
    });
  }
};