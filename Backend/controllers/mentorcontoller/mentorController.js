import Booking from "../../models/Booking.js";
import MentorProfile from "../../models/MentorProfile.js";
import sendEmail from "../../utils/sendEmail.js";
import {mentorApplicationTemplate} from "../../utils/emailTemplates.js";

export const applyMentor = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== "USER") {
      return res.status(403).json({
        success: false,
        message: "Only users can apply to become mentors",
      });
    }

    const alreadyApplied = await MentorProfile.findOne({ user: userId });
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Mentor application already exists",
      });
    }

    let {
      name,
      college,
      currentCompany,
      jobTitle,
      yearsOfExperience,
      expertise,
      sessionPrice,
    } = req.body;

    if (typeof expertise === "string") {
      expertise = JSON.parse(expertise);
    }

    yearsOfExperience = Number(yearsOfExperience);
    sessionPrice = Number(sessionPrice);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Offer letter file is required",
      });
    }

    const offerLetterUrl = req.file.path;

    const mentor = await MentorProfile.create({
      user: userId,
      name,
      college,
      currentCompany,
      jobTitle,
      yearsOfExperience,
      expertise,
      sessionPrice,
      offerLetterUrl,
      status: "PENDING",
    });
    console.log("mentor bhai ye le",mentor.user.email);
    await sendEmail({
      to: mentor.user.email ,
      subject: "🎓 Mentor Application Received - PlacementTutor",
      html: mentorApplicationTemplate({
        mentorName: mentor.name,
        currentCompany:mentor.currentCompany,
        jobTitle:mentor.jobTitle,
        yearsOfExperience:mentor.yearsOfExperience,
      }),
    });
    res.status(201).json({
      success: true,
      message: "Mentor application submitted successfully",
      mentor,
    });
  } catch (err) {
    console.error("Apply mentor error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to apply as mentor",
    });
  }
};


/**
 * ✅ GET LOGGED-IN MENTOR PROFILE
 * GET /mentor/me
 * Role: MENTOR
 */
export const getMyMentorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔐 Role safety
    if (req.user.role !== "MENTOR") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const mentor = await MentorProfile.findOne({ user: userId }).populate(
      "user",
      "email role"
    );

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor profile not found",
      });
    }

    return res.json({
      success: true,
      mentor,
    });
  } catch (err) {
    console.error("Get mentor profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch mentor profile",
    });
  }
};
export const getMentorStatus = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const mentor = await MentorProfile.findOne(
        { user: userId },
        { status: 1 } // fetch only status
      );
  
      // ❌ User never applied as mentor
      if (!mentor) {
        return res.status(200).json({
          status: null,
        });
      }
  
      // ✅ Mentor exists
      return res.status(200).json({
        status: mentor.status, // PENDING | APPROVED | REJECTED
      });
    } catch (err) {
      console.error("Mentor status error:", err);
      res.status(500).json({
        message: "Failed to fetch mentor status",
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
export const getMentorAbout = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId);
      // 🔐 Ensure mentor only
      if (req.user.role !== "MENTOR") {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
  
      const mentor = await MentorProfile.findOne({ user: userId })
        .populate("user", "email role createdAt");
  
      if (!mentor) {
        return res.status(404).json({
          success: false,
          message: "Mentor profile not found",
        });
      }
      console.log("bhej diya")
      return res.status(200).json({
        success: true,
        mentor: {
          id: mentor._id,
          name: mentor.name,
          college: mentor.college,
          currentCompany: mentor.currentCompany,
          jobTitle: mentor.jobTitle,
          yearsOfExperience: mentor.yearsOfExperience,
          expertise: mentor.expertise,
          sessionPrice: mentor.sessionPrice,
          offerLetterUrl: mentor.offerLetterUrl,
          status: mentor.status,
          user: {
            email: mentor.user.email,
            role: mentor.user.role,
            joinedAt: mentor.user.createdAt,
          },
          createdAt: mentor.createdAt,
        },
      });
    } catch (err) {
      console.error("Mentor about error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch mentor details",
      });
    }
  };
  export const getMentorTotalSessions = async (req, res) => {
    try {
      const mentorUserId = req.user.id; // from JWT
      console.log("yha pahuch gya  bhai...");
      // count only confirmed sessions
      const totalSessions = await Booking.countDocuments({
        mentor: mentorUserId,
        status: "CONFIRMED",
      });
  
      return res.status(200).json({
        success: true,
        totalSessions,
      });
    } catch (error) {
      console.error("Get mentor total sessions error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch mentor sessions",
      });
    }
  };
  export const getMentorDashboardStats = async (req, res) => {
    try {
      console.log("bhai stat lene pahuch gya bhai...");
      const mentorUserId = req.user.id;
      const now = new Date();
  
      const totalSessions = await Booking.countDocuments({
        mentor: mentorUserId,
        status: "CONFIRMED",
      });
  
      const upcomingSessions = await Booking.countDocuments({
        mentor: mentorUserId,
        status: "CONFIRMED",
        createdAt: { $gte: now },
      });
  
      const completedSessions = await Booking.countDocuments({
        mentor: mentorUserId,
        status: "CONFIRMED",
        createdAt: { $lt: now },
      });
  
      const earningsAgg = await Booking.aggregate([
        {
          $match: {
            mentor: mentorUserId,
            status: "CONFIRMED",
          },
        },
        {
          $group: {
            _id: null,
            totalEarnings: { $sum: "$amount" },
          },
        },
      ]);
  
      return res.status(200).json({
        success: true,
        stats: {
          totalSessions,
          upcomingSessions,
          completedSessions,
          totalEarnings: earningsAgg[0]?.totalEarnings || 0,
        },
      });
    } catch (error) {
      console.error("Mentor dashboard stats error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch mentor stats",
      });
    }
  };
  export const Updateexpertise = async (req, res) => {
    try {
      console.log("bhai update karne pahuch gya yrr");
      const mentorUserId = req.user.id;
  
      // Only mentor allowed
      if (req.user.role !== "MENTOR") {
        return res.status(403).json({
          success: false,
          message: "Only mentors can update expertise",
        });
      }
  
      let { expertise } = req.body;
  
      if (!expertise) {
        return res.status(400).json({
          success: false,
          message: "Expertise is required",
        });
      }
  
      // Normalize to array
      if (typeof expertise === "string") {
        expertise = [expertise];
      }
  
      // Clean values
      expertise = expertise.map((e) => e.trim()).filter(Boolean);
  
      if (expertise.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid expertise values",
        });
      }
  
      const mentor = await MentorProfile.findOne({ user: mentorUserId });
  
      if (!mentor) {
        return res.status(404).json({
          success: false,
          message: "Mentor profile not found",
        });
      }
  
      // 🔥 Add only unique skills
      const updatedExpertise = new Set([
        ...mentor.expertise,
        ...expertise,
      ]);
  
      mentor.expertise = Array.from(updatedExpertise);
      await mentor.save();
  
      return res.status(200).json({
        success: true,
        message: "Expertise updated successfully",
        expertise: mentor.expertise,
      });
    } catch (error) {
      console.error("Mentor about add skill error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update expertise",
      });
    }
  }
  export const updateSessionPrice = async (req, res) => {
    try {
      const userId = req.user.id; // from auth middleware
      const { sessionPrice } = req.body;
  
      // 1️⃣ Validate input
      if (sessionPrice === undefined) {
        return res.status(400).json({
          success: false,
          message: "sessionPrice is required"
        });
      }
  
      if (typeof sessionPrice !== "number" || sessionPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "sessionPrice must be a non-negative number"
        });
      }
  
      // 2️⃣ Update mentor profile
      const updatedProfile = await MentorProfile.findOneAndUpdate(
        { user: userId },
        { sessionPrice },
        { new: true, runValidators: true }
      ).select("sessionPrice");
  
      if (!updatedProfile) {
        return res.status(404).json({
          success: false,
          message: "Mentor profile not found"
        });
      }
  
      // 3️⃣ Response
      res.status(200).json({
        success: true,
        message: "Session price updated successfully",
        sessionPrice: updatedProfile.sessionPrice
      });
  
    } catch (error) {
      console.error("❌ Error updating session price:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update session price"
      });
    }
  };
