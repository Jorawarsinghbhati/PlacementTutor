import MentorAvailability from "../../models/MentorAvailability.js";

export const getMentorAvailability = async (req, res) => {
    try {
      const mentorId = req.user.id;
      const { date } = req.query;
      console.log("milai pdi bhau Fetching availability for mentor:", mentorId, "on date:", date);
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
  
      return res.status(200).json({
        success: true,
        date,
        slots,
      });
    } catch (err) {
      console.error("Get availability error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch availability",
      });
    }
  };
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
  
      // overlap check
      const conflict = await MentorAvailability.findOne({
        mentor: mentorId,
        date,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      });
  
      if (conflict) {
        return res.status(400).json({
          success: false,
          message: "Slot overlaps with existing availability",
        });
      }
  
      const slot = await MentorAvailability.create({
        mentor: mentorId,
        date,
        startTime,
        endTime,
      });
  
      res.status(201).json({
        success: true,
        slot,
      });
    } catch (err) {
      console.error("Add availability error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to add availability",
      });
    }
  };
export const updateMentorAvailability = async (req, res) => {
    try {
      const mentorId = req.user.id;
      const { slotId } = req.params;
      const { startTime, endTime } = req.body;
  
      if (!startTime || !endTime) {
        return res.status(400).json({
          success: false,
          message: "Start and end time required",
        });
      }
  
      const slot = await MentorAvailability.findOne({
        _id: slotId,
        mentor: mentorId,
        isBooked: false,
        lockedUntil: null,
      });
  
      if (!slot) {
        return res.status(400).json({
          success: false,
          message: "Slot cannot be modified",
        });
      }
  
      // overlap check (excluding current slot)
      const conflict = await MentorAvailability.findOne({
        mentor: mentorId,
        date: slot.date,
        _id: { $ne: slotId },
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      });
  
      if (conflict) {
        return res.status(400).json({
          success: false,
          message: "Updated time overlaps with another slot",
        });
      }
  
      slot.startTime = startTime;
      slot.endTime = endTime;
      await slot.save();
  
      res.json({
        success: true,
        slot,
      });
    } catch (err) {
      console.error("Update availability error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to update availability",
      });
    }
  };
export const deleteMentorAvailability = async (req, res) => {
    try {
      const mentorId = req.user.id;
      const { slotId } = req.params;
  
      const slot = await MentorAvailability.findOne({
        _id: slotId,
        mentor: mentorId,
        isBooked: false,
        lockedUntil: null,
      });
  
      if (!slot) {
        return res.status(400).json({
          success: false,
          message: "Slot cannot be deleted",
        });
      }
  
      await slot.deleteOne();
  
      res.json({
        success: true,
        message: "Availability slot deleted",
      });
    } catch (err) {
      console.error("Delete availability error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to delete availability",
      });
    }
};


  
    