// import Booking from "../../models/Booking.js";

// export const getUpcomingBooking = async (req, res) => {
//   try {
//     const mentorId = req.user.id;
    
//     const today = new Date().toISOString().split("T")[0];
//     const now = new Date().toTimeString().slice(0, 5);
    
//     const bookings = await Booking.find({
//       mentor: mentorId,
//       status: { $in: ["PENDING", "CONFIRMED"] }
//     })
//       .populate({
//         path: "slot",
//         select: "date startTime endTime"
//       })
//       .populate({
//         path: "user",
//         select: "username email profilePicture"
//       })
//       .sort({ createdAt: -1 });

//     console.log("Fetched bookings:", bookings);
//     const upcomingBookings = bookings.filter((b) => {
//         if (!b.slot) return false;
      
//         // combine slot date + endTime into real Date
//         const slotEndDateTime = new Date(
//           `${b.slot.date}T${b.slot.endTime}:00`
//         );
      
//         return slotEndDateTime > new Date();
//       });

//     res.status(200).json({
//       success: true,
//       bookings: upcomingBookings
//     });

//   } catch (error) {
//     console.error("Error fetching upcoming mentor bookings:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
import Booking from "../../models/Booking.js";
import MentorAvailability from "../../models/MentorAvailability.js";

export const getUpcomingBooking = async (req, res) => {
  try {
    const mentorId = req.user.id;
    console.log("Fetching upcoming bookings for mentor ID:", mentorId);
    const bookingforcheck=await Booking.find({mentor:mentorId});
    console.log("All bookings for mentor:", bookingforcheck);
    const bookings = await Booking.find({
      mentor: mentorId,
      status: { $in: ["PENDING", "CONFIRMED"] }
    })
      .populate({
        path: "slot",
        select: "date startTime endTime"
      })
      .populate({
        path: "user",
        select: "username email phone college graduationYear"
      })
      .sort({ createdAt: -1 })
      .lean();

    const now = new Date();

    const upcomingBookings = bookings.filter(b => {
      if (!b.slot) return false;

      const slotEndDateTime = new Date(
        `${b.slot.date}T${b.slot.endTime}:00`
      );

      return slotEndDateTime > now;
    });

    res.status(200).json({
      success: true,
      count: upcomingBookings.length,
      bookings: upcomingBookings
    });

  } catch (error) {
    console.error("Error fetching upcoming mentor bookings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
export const getMentorCompletedBookings = async (req, res) => {
    try {
      const mentorId = req.user.id;
  
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const nowTime = new Date().toTimeString().slice(0, 5); // HH:mm
        
      // 1️⃣ Find all past slots of this mentor
      const completedSlots = await MentorAvailability.find({
        mentor: mentorId,
        $or: [
          { date: { $lt: today } }, // past date
          {
            date: today,
            endTime: { $lte: nowTime } // today but already ended
          }
        ]
      }).select("_id date startTime endTime");
      console.log("Completed slots found:", completedSlots);
      if (completedSlots.length === 0) {
        return res.status(200).json({
          success: true,
          bookings: []
        });
      }
  
      const slotIds = completedSlots.map(slot => slot._id);
  
      // 2️⃣ Get confirmed bookings for those slots
      const bookings = await Booking.find({
        mentor: mentorId,
        slot: { $in: slotIds },
        status: "CONFIRMED"
      })
        .populate({
          path: "user",
          select: "name email username college graduationYear"
        })
        .populate({
          path: "slot",
          select: "date startTime endTime"
        }).select(
          "serviceType amount status paymentId paymentProvider review createdAt updatedAt"
        )
        .sort({ createdAt: -1 }).lean();;
  
      // 3️⃣ Response
      res.status(200).json({
        success: true,
        count: bookings.length,
        bookings
      });
  
    } catch (error) {
      console.error("❌ Error fetching completed bookings:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch completed bookings"
      });
    }
  };
