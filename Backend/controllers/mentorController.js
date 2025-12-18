import MentorProfile from "../models/MentorProfile.js";


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
