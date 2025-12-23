import User from "../../models/User.js";

export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      email,
      username,
      college,
      graduationYear,
      phone,
    } = req.body;

    // 🔹 Build update object dynamically
    const updateFields = {};

    if (name !== undefined) updateFields.name = name;
    if (college !== undefined) updateFields.college = college;
    if (graduationYear !== undefined)
      updateFields.graduationYear = graduationYear;
    if (phone !== undefined) updateFields.phone = phone;

    // 🔐 Email update (check uniqueness)
    if (email !== undefined) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: userId },
      });
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Email already in use",
        });
      }
      updateFields.email = email;
    }

    // 🔐 Username update (check uniqueness)
    if (username !== undefined) {
      // validation
      if (!/^[a-zA-Z0-9._]{3,20}$/.test(username)) {
        return res.status(400).json({
          success: false,
          message: "Invalid username format",
        });
      }

      const usernameExists = await User.findOne({
        username,
        _id: { $ne: userId },
      });
      if (usernameExists) {
        return res.status(409).json({
          success: false,
          message: "Username already taken",
        });
      }

      updateFields.username = username;
    }

    // ❌ Nothing to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    // ✅ Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-__v");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "name  username college graduationYear phone role  createdAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Fetch user profile error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
};
