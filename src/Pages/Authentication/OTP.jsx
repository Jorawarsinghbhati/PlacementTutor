import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints } from "../../Service/apis";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const verifyOtp = async () => {
    if (!email) {
      navigate("/", { replace: true });
      return;
    }

    try {
      setLoading(true);

      // 🔹 Verify OTP
      const res = await apiConnector("POST", authEndpoints.VERIFY_OTP, {
        email,
        otp,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      // 🔹 Fetch user info
      const meRes = await apiConnector("GET", authEndpoints.ME);
      const user = meRes.data.user;

      // 🔹 Store role
      localStorage.setItem("role", user.role);

      const role = user.role?.trim().toUpperCase();

      // 🛡 ADMIN
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
        return;
      }

      // 🧑‍🏫 APPROVED MENTOR
      if (role === "MENTOR") {
        navigate("/mentor/dashboard", { replace: true });
        return;
      }

      // 👤 NORMAL USER → choose path
      navigate("/choose-role", { replace: true });

    } catch (e) {
      console.error("OTP verification error:", e);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-[360px] shadow-lg">
        <h1 className="text-white text-xl font-bold text-center mb-6">
          Verify OTP
        </h1>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full mb-3 p-2 rounded"
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-white py-2 rounded"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default Otp;
