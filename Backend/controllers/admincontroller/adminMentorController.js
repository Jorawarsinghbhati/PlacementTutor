import MentorProfile from "../../models/MentorProfile.js";
import User from "../../models/User.js";


export const getPendingMentors = async (req, res) => {
  try {
    const mentors = await MentorProfile.find({
      status: "PENDING",
    }).populate("user", "email");

    res.json({
      success: true,
      mentors,
    });
  } catch (err) {
    console.error("Fetch pending mentors error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentor requests",
    });
  }
};
export const approveMentor = async (req, res) => {
  try {
    console.log("Approving mentor");
    const mentorId = req.params.id;

    const mentor = await MentorProfile.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor request not found",
      });
    }

    // 🔒 Prevent double approval/rejection
    if (mentor.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Mentor request already processed",
      });
    }

    // ✅ Approve mentor
    mentor.status = "APPROVED";
    await mentor.save();

    // ✅ Upgrade user role
    await User.findByIdAndUpdate(mentor.user, {
      role: "MENTOR",
    });

    res.json({
      success: true,
      message: "Mentor approved successfully",
    });
  } catch (err) {
    console.error("Approve mentor error:", err);
    res.status(500).json({
      success: false,
      message: "Mentor approval failed",
    });
  }
};
export const rejectMentor = async (req, res) => {
  try {
    const mentorId = req.params.id;

    const mentor = await MentorProfile.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor request not found",
      });
    }
    if (mentor.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Mentor request already processed",
      });
    }

    mentor.status="REJECTED";
    await mentor.save();

    res.json({
      success: true,
      message: "Mentor rejected successfully",
    });
  } catch (err) {
    console.error("Reject mentor error:", err);
      res.status(500).json({
        success: false,
        message: "Mentor rejection failed",
      });
  }
};

export const getAllMentorsForAdmin = async (req, res) => {
  try {
    const mentors = await MentorProfile.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $project: {
          mentorId: "$user._id",

          // User info
          name: "$user.name",
          email: "$user.email",
          role: "$user.role",
          createdAt: "$user.createdAt",

          // Mentor profile
          college: 1,
          currentCompany: 1,
          jobTitle: 1,
          yearsOfExperience: 1,
          expertise: 1,
          sessionPrice: 1,
          offerLetterUrl: 1,
          status: 1, // PENDING / APPROVED / REJECTED
        },
      },

      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (error) {
    console.error("Admin get mentors error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentors",
    });
  }
};
export const rejectMentorAndConvertToUser = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { reason } = req.body;
    console.log("bhai pahuch to rha hu yrr baki tu dekh..");
    // 1️⃣ Find mentor profile
    const mentorProfile = await MentorProfile.findOne({
      user: mentorId,
    });
    console.log("ye le bhai ",mentorProfile)
    if (!mentorProfile) {
      return res.status(404).json({
        success: false,
        message: "Mentor profile not found",
      });
    }

    // 2️⃣ Update mentor profile status
    mentorProfile.status = "REJECTED";
    if (reason) mentorProfile.rejectionReason = reason;
    await mentorProfile.save();

    // 3️⃣ Downgrade role → USER
    await User.findByIdAndUpdate(mentorId, {
      role: "USER",
    });

    res.status(200).json({
      success: true,
      message: "Mentor rejected and converted back to USER",
    });
  } catch (error) {
    console.error("Reject mentor error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject mentor",
    });
  }
};
