import MentorProfile from "../../models/MentorProfile.js";
import Booking from "../../models/Booking.js";
import MentorAvailability from "../../models/MentorAvailability.js";


export const getAllMentors = async (req, res) => {
  try {
    const mentors = await MentorProfile.find(
      { status: "APPROVED" },
      {
        name: 1,
        college: 1,
        currentCompany: 1,
        jobTitle: 1,
        expertise: 1,
        sessionPrice: 1,
        user: 1,
        yearsOfExperience:1,
      }
    );

    res.json({ success: true, mentors });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load mentors" });
  }
};

export const getMentorById = async (req, res) => {
  try {
    const mentor = await MentorProfile.findOne({
      _id: req.params.id,
      status: "APPROVED",
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    res.json({ success: true, mentor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load mentor" });
  }
};

// export const getMentorAvailability = async (req, res) => {
//     const { id } = req.params;
//     const { date } = req.query;
  
//     const slots = await MentorAvailability.find({
//       mentor: id,
//       date,
//       lockedUntil: { $lt: new Date() },
//     }).sort({ startTime: 1 });
  
//     res.json({ slots });
//   };
export const getMentorAvailabilityUser = async (req, res) => {
  try {
    console.log("i am reaching here bro...")
    const { mentorId } = req.params;
    const { date } = req.query;
    console.log("mentor id ",mentorId);
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    
    const mentorProfile = await MentorProfile.findOne({
      user: mentorId,
      status: "APPROVED",
    });

    if (!mentorProfile) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found or not approved",
      });
    }

    const now = new Date();
    console.log("mentor id",mentorId);
    const slots = await MentorAvailability.find({
      mentor: mentorId,
      date,
      isBooked: false,
      $or: [
        { lockedUntil: null },
        { lockedUntil: { $lt: now } },
      ],
    })
      .select("startTime endTime")
      .sort({ startTime: 1 });
     console.log(slots);
    return res.status(200).json({
      success: true,
      mentor: {
        id: mentorProfile.user,
        name: mentorProfile.name,
        sessionPrice: mentorProfile.sessionPrice,
      },
      date,
      slots, 
    });
  } catch (err) {
    console.error("Get mentor availability error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch mentor availability",
    });
  }
};

export const getMentorDashboard = async (req, res) => {
  try {
    const mentorUserId = req.user.id;

    const mentor = await MentorProfile.findOne({ user: mentorUserId });
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const totalSessions = await Booking.countDocuments({
      mentor: mentor._id,
      status: "CONFIRMED",
    });

    const upcomingSessions = await Booking.countDocuments({
      mentor: mentor._id,
      status: "CONFIRMED",
      createdAt: { $gte: new Date() },
    });

    const earningsAgg = await Booking.aggregate([
      {
        $match: {
          mentor: mentor._id,
          status: "CONFIRMED",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      mentor,
      stats: {
        totalSessions,
        upcomingSessions,
        totalEarnings: earningsAgg[0]?.total || 0,
      },
    });
  } catch (err) {
    console.error("Mentor dashboard error:", err);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};
export const getMentorBookings = async (req, res) => {
  const bookings = await Booking.find({
    mentor: req.user.id,
  })
    .populate("user", "email")
    .populate("slot")
    .sort({ createdAt: -1 });

  res.json({ bookings });
};
