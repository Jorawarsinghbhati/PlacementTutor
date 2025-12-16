import User from "../models/User.js";

export const setUsername = async (req, res) => {
    try {
      const userId = req.user.id;
      const { username } = req.body;
  
      // format validation
      if (!/^[a-zA-Z0-9._]{3,20}$/.test(username)) {
        return res.status(400).json({ message: "Invalid username" });
      }
  
      const user = await User.findById(userId);
  
      // 🚫 prevent overwrite
      if (user.username) {
        return res.status(400).json({
          message: "Username already set and cannot be changed",
        });
      }
  
      const exists = await User.findOne({ username });
      if (exists) {
        return res.status(409).json({ message: "Username taken" });
      }
  
      user.username = username;
      await user.save();
  
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to set username" });
    }
  };

export const setGraduation = async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, college, graduationYear, phone } = req.body;
  
      if (!name || !college || !graduationYear) {
        return res.status(400).json({
          success: false,
          message: "Required fields missing",
        });
      }
  
      const user = await User.findById(userId);
  
      // 🚫 prevent overwrite
      if (user.college || user.graduationYear) {
        return res.status(400).json({
          success: false,
          message: "Graduation details already submitted",
        });
      }
  
      user.name = name;
      user.college = college;
      user.graduationYear = graduationYear;
      user.phone = phone;
  
      await user.save();
  
      console.log("Graduation details set for user:", userId);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to save graduation details",
      });
    }
  };

export const getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select(
        "email role username college graduationYear"
      );
  
      if (!user) {
        return res.status(404).json({ success: false });
      }
  
      res.json({
        success: true,
        user,
      });
    } catch (err) {
      console.error("getMe error:", err);
      res.status(500).json({ success: false });
    }
  };
  
