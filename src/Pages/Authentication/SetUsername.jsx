import React, { useState } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints } from "../../Service/apis";
import { useNavigate } from "react-router-dom";

const SetUsername = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await apiConnector(
        "POST",
        authEndpoints.SET_USERNAME,
        { username }
      );
      navigate("/graduation");
    } catch (err) {
      console.error(err);
      alert("Username already taken");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-105 bg-[#0e0e0e] p-8 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Set your username
        </h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="enter your username"
          className="w-full p-3 mb-4 rounded bg-[#1a1a1a] text-white outline-none"
        />

        <ul className="text-sm text-gray-400 mb-6 space-y-1">
          <li>✓ 3–20 characters</li>
          <li>✓ Letters, numbers, _ or .</li>
          <li className="text-green-400">
            ✓ No spaces allowed
          </li>
        </ul>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#c97b4a] text-black py-3 rounded font-semibold"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default SetUsername;
