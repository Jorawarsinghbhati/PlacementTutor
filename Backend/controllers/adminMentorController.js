import MentorProfile from "../models/MentorProfile.js";
import User from "../models/User.js";


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
