import User from "../../models/User.js";

export const getAdminStats = async (req, res) => {
  try {
    console.log("Fetching admin stats");
    // Total users
    const totalUsers = await User.countDocuments();

    // Total mentors
    const totalMentors = await User.countDocuments({ role: "MENTOR" });

    // Total admins
    const totalAdmins = await User.countDocuments({ role: "ADMIN" });

    // Unique colleges count
    const colleges = await User.distinct("college", {
      college: { $ne: null },
    });

    // New users in last 7 days
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const newUsersLast7Days = await User.countDocuments({
      createdAt: { $gte: last7Days },
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalMentors,
        totalAdmins,
        totalColleges: colleges.length,
        newUsersLast7Days,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin stats",
    });
  }
};
import Booking from "../../models/Booking.js";

export const getAdminDashboardstats = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const nowTime = new Date().toTimeString().slice(0, 5); // HH:mm

    /* =======================
       1️⃣ OVERVIEW STATS
    ======================== */

    const [
      totalBookings,
      todaysBookings,
      totalUsers,
      completedRevenueAgg
    ] = await Promise.all([
      Booking.countDocuments(),

      Booking.countDocuments({
        createdAt: {
          $gte: new Date(`${today}T00:00:00.000Z`),
          $lte: new Date(`${today}T23:59:59.999Z`)
        }
      }),

      User.countDocuments(),

      // ✅ TOTAL REVENUE = COMPLETED SESSIONS ONLY
      Booking.aggregate([
        {
          $lookup: {
            from: "mentoravailabilities",
            localField: "slot",
            foreignField: "_id",
            as: "slot"
          }
        },
        { $unwind: "$slot" },
        {
          $match: {
            status: "CONFIRMED",
            $or: [
              { "slot.date": { $lt: today } },
              {
                "slot.date": today,
                "slot.endTime": { $lte: nowTime }
              }
            ]
          }
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" }
          }
        }
      ])
    ]);

    const totalRevenue = completedRevenueAgg[0]?.totalRevenue || 0;

    /* =======================
       2️⃣ MENTOR PERFORMANCE
    ======================== */

    const mentorPerformance = await Booking.aggregate([
      {
        $lookup: {
          from: "mentoravailabilities",
          localField: "slot",
          foreignField: "_id",
          as: "slot"
        }
      },
      { $unwind: "$slot" },

      {
        $match: {
          status: "CONFIRMED",
          $or: [
            { "slot.date": { $lt: today } },
            {
              "slot.date": today,
              "slot.endTime": { $lte: nowTime }
            }
          ]
        }
      },

      {
        $group: {
          _id: "$mentor",
          completedSessions: { $sum: 1 },
          totalRevenue: { $sum: "$amount" },
          avgRating: { $avg: "$review.rating" } // safe even if review missing
        }
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "mentor"
        }
      },
      { $unwind: "$mentor" },

      {
        $project: {
          mentorId: "$mentor._id",
          mentorName: "$mentor.name",
          mentorEmail: "$mentor.email",
          completedSessions: 1,
          totalRevenue: 1,
          avgRating: {
            $cond: [
              { $gt: ["$avgRating", 0] },
              { $round: ["$avgRating", 1] },
              null
            ]
          }
        }
      },

      { $sort: { totalRevenue: -1 } }
    ]);

    /* =======================
       3️⃣ POPULAR TIME SLOT
    ======================== */

    const popularSlotAgg = await Booking.aggregate([
      {
        $lookup: {
          from: "mentoravailabilities",
          localField: "slot",
          foreignField: "_id",
          as: "slot"
        }
      },
      { $unwind: "$slot" },
    
      {
        $match: {
          status: "CONFIRMED",
          $or: [
            { "slot.date": { $lt: today } },
            {
              "slot.date": today,
              "slot.endTime": { $lte: nowTime }
            }
          ]
        }
      },
    
      {
        $group: {
          _id: {
            startTime: "$slot.startTime",
            endTime: "$slot.endTime"
          },
          bookingsCount: { $sum: 1 }
        }
      },
    
      { $sort: { bookingsCount: -1 } },
      { $limit: 1 }
    ]);

    const popularTimeSlot = popularSlotAgg[0] || null;

    /* =======================
       FINAL RESPONSE
    ======================== */

    res.status(200).json({
      success: true,
      overview: {
        totalBookings,
        todaysBookings,
        totalRevenue,
        totalUsers
      },
      mentorPerformance,
      popularTimeSlot: popularTimeSlot? {
        startTime: popularTimeSlot._id.startTime,
        endTime: popularTimeSlot._id.endTime,
        bookings: popularTimeSlot.bookingsCount,
      }:null
    });

  } catch (error) {
    console.error("❌ Admin Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard"
    });
  }
};
export const getAllBookingsDetailed = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      // 🔗 Join slot (date & time)
      {
        $lookup: {
          from: "mentoravailabilities",
          localField: "slot",
          foreignField: "_id",
          as: "slot"
        }
      },
      { $unwind: "$slot" },

      // 🔗 Join user (who booked)
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },

      // 🔗 Join mentor (who is mentoring)
      {
        $lookup: {
          from: "users",
          localField: "mentor",
          foreignField: "_id",
          as: "mentor"
        }
      },
      { $unwind: "$mentor" },

      // 🎯 Final response shape
      {
        $project: {
          bookingId: "$_id",

          // User
          userId: "$user._id",
          userName: "$user.name",
          userEmail: "$user.email",

          // Mentor
          mentorId: "$mentor._id",
          mentorName: "$mentor.name",
          mentorEmail: "$mentor.email",

          // Slot info
          date: "$slot.date",
          startTime: "$slot.startTime",
          endTime: "$slot.endTime",

          // Booking info
          status: 1,
          serviceType: 1,
          amount: 1,
          createdAt: 1,

          // Review (optional)
          review: {
            rating: "$review.rating",
            comment: "$review.comment",
            reviewedAt: "$review.reviewedAt"
          }
        }
      },

      // 🧾 Latest bookings first
      { $sort: { createdAt: -1 } }
    ]);

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });

  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings"
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

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};