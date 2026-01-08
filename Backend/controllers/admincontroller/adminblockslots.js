import AdminGlobalBlock  from "../../models/AdminGlobalBlock.js"

export const createGlobalBlock = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { date, startTime, endTime, reason } = req.body;
    console.log("bhai le crateglobal block ke info",date, startTime, endTime, reason,adminId);
    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "date, startTime, endTime required",
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        success: false,
        message: "startTime must be before endTime",
      });
    }

    const block = await AdminGlobalBlock.create({
      date,
      startTime,
      endTime,
      reason,
      createdBy: adminId,
    });

    return res.status(201).json({
      success: true,
      message: "Global time block created",
      block,
    });

  } catch (err) {
    console.error("Create global block error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create global block",
    });
  }
};
export const getAllGlobalBlockedSlots = async (req, res) => {
  try {
    const blocks = await AdminGlobalBlock.find({})
      .sort({ date: -1, startTime: 1 });

    return res.status(200).json({
      success: true,
      count: blocks.length,
      data: blocks,
    });

  } catch (error) {
    console.error("Fetch global blocks error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch global blocked slots",
    });
  }
};
  