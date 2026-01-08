import MentorAvailability from "../../models/MentorAvailability.js";
import { splitIntoSlots } from "../../utils/splitSlots.js";
import { groupConsecutiveSlots } from "../../utils/groupSlots.js";

// export const getMentorAvailability = async (req, res) => {
//     try {
//       const mentorId = req.user.id;
//       const { date } = req.query;
//       console.log("milai pdi bhau Fetching availability for mentor:", mentorId, "on date:", date);
//       if (!date) {
//         return res.status(400).json({
//           success: false,
//           message: "Date is required",
//         });
//       }
  
//       const slots = await MentorAvailability.find({
//         mentor: mentorId,
//         date,
//       }).sort({ startTime: 1 });
  
//       return res.status(200).json({
//         success: true,
//         date,
//         slots,
//       });
//     } catch (err) {
//       console.error("Get availability error:", err);
//       res.status(500).json({
//         success: false,
//         message: "Failed to fetch availability",
//       });
//     }
//   };
  //done
  export const getMentorAvailability = async (req, res) => {
    try {
      const mentorId = req.user.id;
      const { date } = req.query;
  
      if (!date) {
        return res.status(400).json({
          success: false,
          message: "Date is required",
        });
      }
  
      const slots = await MentorAvailability.find({
        mentor: mentorId,
        date,
      }).sort({ startTime: 1 });
      console.log("Fetched slots:", slots);
      const groupedSlots = groupConsecutiveSlots(slots);
      console.log("Grouped slots:", groupedSlots);
      return res.status(200).json({
        success: true,
        date,
        availability: groupedSlots,
      });
    } catch (err) {
      console.error("Get availability error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch availability",
      });
    }
  };


  
  //new one
export const addMentorAvailability = async (req, res) => {
    try {
      const mentorId = req.user.id;
      const { date, startTime, endTime } = req.body;
  
      if (!date || !startTime || !endTime) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      if (startTime >= endTime) {
        return res.status(400).json({
          success: false,
          message: "End time must be after start time",
        });
      }
      console.log("Adding availability for mentor:", mentorId, "on date:", date, "from", startTime, "to", endTime);
      // 🔥 split into 15-min slots
      const slots = splitIntoSlots(startTime, endTime, 15);
      console.log("Generated slots:", slots);
      const docs = slots.map((slot) => ({
        mentor: mentorId,
        date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }));
  
      // unique index prevents duplicates automatically
      await MentorAvailability.insertMany(docs, { ordered: false });
      
      return res.status(201).json({
        success: true,
        message: "Availability added successfully",
        slotsCreated: docs.length,
      });
    } catch (err) {
      console.error("Add availability error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to add availability",
      });
    }
};
//add mentor working fine...
// export const updateMentorAvailability = async (req, res) => {
//     try {
//       const mentorId = req.user.id;
//       const { slotId } = req.params;
//       const { startTime, endTime } = req.body;
  
//       if (!startTime || !endTime) {
//         return res.status(400).json({
//           success: false,
//           message: "Start and end time required",
//         });
//       }
  
//       const slot = await MentorAvailability.findOne({
//         _id: slotId,
//         mentor: mentorId,
//         isBooked: false,
//         lockedUntil: null,
//       });
  
//       if (!slot) {
//         return res.status(400).json({
//           success: false,
//           message: "Slot cannot be modified",
//         });
//       }
  
//       // overlap check (excluding current slot)
//       const conflict = await MentorAvailability.findOne({
//         mentor: mentorId,
//         date: slot.date,
//         _id: { $ne: slotId },
//         startTime: { $lt: endTime },
//         endTime: { $gt: startTime },
//       });
  
//       if (conflict) {
//         return res.status(400).json({
//           success: false,
//           message: "Updated time overlaps with another slot",
//         });
//       }
  
//       slot.startTime = startTime;
//       slot.endTime = endTime;
//       await slot.save();
  
//       res.json({
//         success: true,
//         slot,
//       });
//     } catch (err) {
//       console.error("Update availability error:", err);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update availability",
//       });
//     }
//   };
// export const deleteMentorAvailability = async (req, res) => {
//     try {
//       const mentorId = req.user.id;
//       const { slotId } = req.params;
  
//       const slot = await MentorAvailability.findOne({
//         _id: slotId,
//         mentor: mentorId,
//         isBooked: false,
//         lockedUntil: null,
//       });
  
//       if (!slot) {
//         return res.status(400).json({
//           success: false,
//           message: "Slot cannot be deleted",
//         });
//       }
  
//       await slot.deleteOne();
  
//       res.json({
//         success: true,
//         message: "Availability slot deleted",
//       });
//     } catch (err) {
//       console.error("Delete availability error:", err);
//       res.status(500).json({
//         success: false,
//         message: "Failed to delete availability",
//       });
//     }
// };
export const updateMentorAvailability = async (req, res) => {
  try {
    const mentorId = req.user.id;
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "date, startTime and endTime are required",
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time",
      });
    }

    // 🔍 STEP 1: find all overlapping or touching slots
    const overlappingSlots = await MentorAvailability.find({
      mentor: mentorId,
      date,
      isBooked: false,
      lockedUntil: null,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    }).sort({ startTime: 1 });

    // 🔥 STEP 2: calculate merged range
    let mergedStart = startTime;
    let mergedEnd = endTime;

    if (overlappingSlots.length > 0) {
      mergedStart = overlappingSlots[0].startTime;
      mergedEnd = overlappingSlots[overlappingSlots.length - 1].endTime;
    }

    // 🔒 STEP 3: check conflict with OTHER availability
    const conflict = await MentorAvailability.findOne({
      mentor: mentorId,
      date,
      startTime: { $lt: mergedEnd },
      endTime: { $gt: mergedStart },
      _id: { $nin: overlappingSlots.map(s => s._id) },
    });

    if (conflict) {
      return res.status(400).json({
        success: false,
        message: "Updated availability overlaps with existing availability",
      });
    }

    // 🧹 STEP 4: delete old overlapping slots
    await MentorAvailability.deleteMany({
      _id: { $in: overlappingSlots.map(s => s._id) },
    });

    // 🧱 STEP 5: create new merged slots
    const newSlots = splitIntoSlots(mergedStart, mergedEnd, 15);

    const docs = newSlots.map(slot => ({
      mentor: mentorId,
      date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));

    await MentorAvailability.insertMany(docs, { ordered: false });

    return res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      finalRange: {
        startTime: mergedStart,
        endTime: mergedEnd,
      },
    });

  } catch (err) {
    console.error("Update availability error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update availability",
    });
  }
};
export const deleteMentorAvailability = async (req, res) => {
  try {
    const mentorId = req.user.id;
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "date, startTime and endTime are required",
      });
    }

    // 🔍 Find all slots in this grouped range
    const slots = await MentorAvailability.find({
      mentor: mentorId,
      date,
      startTime: { $gte: startTime },
      endTime: { $lte: endTime },
      isBooked: false,
      lockedUntil: null,
    });

    if (slots.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No deletable slots found in this range",
      });
    }

    // 🔥 Delete ALL consecutive slots
    const slotIds = slots.map(s => s._id);

    await MentorAvailability.deleteMany({
      _id: { $in: slotIds },
    });

    return res.status(200).json({
      success: true,
      message: "Availability deleted successfully",
      slotsDeleted: slotIds.length,
    });

  } catch (err) {
    console.error("Delete availability error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete availability",
    });
  }
};


  
    