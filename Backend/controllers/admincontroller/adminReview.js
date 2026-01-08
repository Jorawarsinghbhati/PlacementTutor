import Booking from "../../models/Booking.js";

export const getAllReviewsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      // only bookings having review
      {
        $match: {
          "review.rating": { $exists: true },
        },
      },

      // join USER (student)
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // join MENTOR (user table)
      {
        $lookup: {
          from: "users",
          localField: "mentor",
          foreignField: "_id",
          as: "mentorUser",
        },
      },
      { $unwind: "$mentorUser" },

      // join MENTOR PROFILE (college, company, etc.)
      {
        $lookup: {
          from: "mentorprofiles",
          localField: "mentor",
          foreignField: "user",
          as: "mentorProfile",
        },
      },
      {
        $unwind: {
          path: "$mentorProfile",
          preserveNullAndEmptyArrays: true,
        },
      },

      // final shape
      {
        $project: {
          bookingId: "$_id",

          rating: "$review.rating",
          comment: "$review.comment",
          reviewedAt: "$review.reviewedAt",
          isApproved: "$review.isApproved",
          isHidden: "$review.isHidden",

          // student
          student: {
            name: "$user.name",
            college: "$user.college",
            graduationYear: "$user.graduationYear",
          },

          // mentor
          mentor: {
            name: "$mentorUser.name",
            college: "$mentorProfile.college",
            currentCompany: "$mentorProfile.currentCompany",
          },
        },
      },

      { $sort: { reviewedAt: -1 } },
    ]);

    res.status(200).json({
      success: true,
      count: bookings.length,
      reviews: bookings,
    });
  } catch (error) {
    console.error("❌ Admin fetch reviews error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

export const deleteReviewAdmin = async (req, res) => {
    try {
      const { bookingId } = req.params;
  
      const booking = await Booking.findById(bookingId);
  
      if (!booking || !booking.review?.rating) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }
  
      booking.review = undefined;
      await booking.save();
  
      res.status(200).json({
        success: true,
        message: "✅ Review deleted successfully",
      });
    } catch (error) {
      console.error("❌ Admin delete review error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete review",
      });
    }
};

  