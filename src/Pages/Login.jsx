import React, { useState } from "react";
import { apiConnector } from "../Service/apiConnector";
import { authEndpoints } from "../Service/apis";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      setLoading(true);
      await apiConnector("POST", authEndpoints.SEND_OTP, { email });
      navigate("/otp", { state: { email } });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const res = await apiConnector(
      "GET",
      authEndpoints.GOOGLE_OAUTH + "/url"
    );
    window.location.href = res.data.url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-[360px] shadow-lg">
        <h1 className="text-white text-2xl font-bold text-center mb-6">
          PlacementTutor
        </h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full mb-3 p-2 rounded"
        />

        <button
          onClick={sendOtp}
          disabled={loading}
          className="w-full bg-white py-2 rounded"
        >
          Send OTP
        </button>

        <div className="text-center my-3 text-gray-400">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white py-2 rounded"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
