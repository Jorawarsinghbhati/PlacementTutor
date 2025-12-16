import User from "../models/User.js";

export const getAdminStats = async (req, res) => {
  try {
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
