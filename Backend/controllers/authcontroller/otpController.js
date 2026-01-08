import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import Otp from "../../models/Otp.js";
import mailSender from "../../utils/mailSender.js";


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 🔐 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔐 Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.findOneAndUpdate(
      { email },
      {
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
      },
      { upsert: true, new: true }
    );

    // 📧 Send OTP (RAW) via email
    await mailSender(
      email,
      "Your OTP for PlacementTutor",
      `
        <div style="font-family: Arial;">
          <h2>Your OTP: ${otp}</h2>
          <p>Valid for 5 minutes</p>
          <p><strong>Do not share this OTP with anyone.</strong></p>
        </div>
      `
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({
      success: false,
      message: "OTP send failed",
    });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP required",
      });
    }

    const record = await Otp.findOne({ email });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    // ⏰ Check expiry
    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // 🔐 Compare OTP securely
    const isOtpValid = await bcrypt.compare(otp, record.otp);

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 🔹 Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: email.split("@")[0],
        provider: "otp",
      });
    }

    // 🔐 Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ❌ Remove OTP after successful verification
    await Otp.deleteOne({ email });

    res.status(200).json({
      success: true,
      token,
    });

  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};
