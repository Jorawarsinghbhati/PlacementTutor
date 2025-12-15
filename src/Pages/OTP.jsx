import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiConnector } from "../Service/apiConnector";
import { authEndpoints } from "../Service/apis";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const res = await apiConnector("POST", authEndpoints.VERIFY_OTP, {
        email,
        otp,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
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
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default Otp;
