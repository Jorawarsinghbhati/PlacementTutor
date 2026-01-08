import Booking from "../../models/Booking.js";


export const getApprovedReviewsPublic = async (req, res) => {
    try {
      const reviews = await Booking.aggregate([
        /* ✅ only bookings having approved review */
        {
          $match: {
            "review.approved": true,
            "review.rating": { $exists: true },
            status: { $in: ["CONFIRMED", "COMPLETED"] },
          },
        },
  
        /* 🔗 join mentor (User) */
        {
          $lookup: {
            from: "users",
            localField: "mentor",
            foreignField: "_id",
            as: "mentor",
          },
        },
        { $unwind: "$mentor" },
  
        /* 🔗 join mentor profile (college, company) */
        {
          $lookup: {
            from: "mentorprofiles",
            localField: "mentor._id",
            foreignField: "user",
            as: "mentorProfile",
          },
        },
        { $unwind: "$mentorProfile" },
  
        /* 🎯 final shape */
        {
          $project: {
            _id: 0,
  
            rating: "$review.rating",
            comment: "$review.comment",
            reviewedAt: "$review.reviewedAt",
  
            mentorName: "$mentorProfile.name",
            mentorCollege: "$mentorProfile.college",
            mentorCompany: "$mentorProfile.currentCompany",
            mentorJobTitle: "$mentorProfile.jobTitle",
          },
        },
  
        /* 🧾 latest reviews first */
        { $sort: { reviewedAt: -1 } },
  
        /* 🧠 limit for landing page */
        { $limit: 10 },
      ]);
  
      res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    } catch (error) {
      console.error("❌ Fetch approved reviews error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to load reviews",
      });
    }
};

export const updateReviewStatus = async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { approved } = req.body;
      console.log("booking bhai ",bookingId);
      console.log("approve",approved);
      if (typeof approved !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "approved must be boolean",
        });
      }
  
      const booking = await Booking.findById(bookingId);
  
      if (!booking || !booking.review?.rating) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }
  
      booking.review.approved = approved;
      await booking.save();
  
      res.status(200).json({
        success: true,
        message: approved
          ? "✅ Review approved"
          : "❌ Review rejected",
      });
    } catch (error) {
      console.error("❌ Review approval error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update review",
      });
    }
  };