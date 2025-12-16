import React, { useState } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints } from "../../Service/apis";
import { useNavigate } from "react-router-dom";

const Graduation = () => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await apiConnector(
        "POST",
        authEndpoints.SET_GRADUATION,
        {
          name,
          college,
          graduationYear,
          phone,
        }
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-105 bg-[#0e0e0e] p-8 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Graduation Information
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full p-3 mb-3 rounded bg-[#1a1a1a] text-white outline-none"
        />

        <input
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          placeholder="Enter your college / university"
          className="w-full p-3 mb-3 rounded bg-[#1a1a1a] text-white outline-none"
        />

        <select
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-[#1a1a1a] text-white outline-none"
        >
          <option value="">Choose graduation year</option>
          {[2023, 2024, 2025, 2026, 2027, 2028].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number (optional)"
          className="w-full p-3 mb-6 rounded bg-[#1a1a1a] text-white outline-none"
        />

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

export default Graduation;
