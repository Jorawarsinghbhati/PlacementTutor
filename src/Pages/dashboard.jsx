// useEffect(() => {
//   const fetchMentorStatus = async () => {
//     try {
//       const res = await apiConnector(
//         "GET",
//         mentorEndpoints.MY_MENTOR_STATUS
//       );
//       setMentorStatus(res.data.status); 
//     } catch (err) {
//       // user never applied as mentor → ignore
//     }
//   };

//   fetchMentorStatus();
// }, []);
 {/* ⏳ Mentor application pending banner */}
//  {mentorStatus === "PENDING" && (
//   <div className="bg-yellow-600/20 border border-yellow-500 p-4 rounded mb-6">
//     <p className="font-semibold text-yellow-400">
//       ⏳ Mentor application under review
//     </p>
//     <p className="text-sm text-gray-300">
//       You’ll be notified once approved
//     </p>
//   </div>
// )}



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../Service/apiConnector";
import { mentorEndpoints } from "../Service/apis";

const Dashboard = () => {
  const navigate = useNavigate();
  const [mentorStatus, setMentorStatus] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchMentorStatus = async () => {
      try {
        const res = await apiConnector(
          "GET",
          mentorEndpoints.MY_MENTOR_STATUS
        );
        setMentorStatus(res.data.status); 
      } catch (err) {
        // user never applied as mentor → ignore
      }
    };

    fetchMentorStatus();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 🔹 Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">PlacementTutor</h1>

        <div className="flex gap-3">
          {/* 🧑‍🏫 Switch to mentor dashboard */}
          {role === "MENTOR" && (
            <button
              onClick={() => navigate("/mentor/dashboard")}
              className="bg-indigo-600 px-4 py-1 rounded hover:bg-indigo-700"
            >
              Mentor Mode
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* 🔹 Main */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        {/* ⏳ Mentor application pending banner */}
        {mentorStatus === "PENDING" && (
          <div className="bg-yellow-600/20 border border-yellow-500 p-4 rounded mb-6">
            <p className="font-semibold text-yellow-400">
              ⏳ Mentor application under review
            </p>
            <p className="text-sm text-gray-300">
              You’ll be notified once approved
            </p>
          </div>
        )}

        {/* ➕ Apply as mentor CTA (only if not applied) */}
        {!mentorStatus && role !== "MENTOR" && (
          <div className="bg-[#111] p-4 rounded mb-6 flex justify-between items-center">
            <p>Want to become a mentor and help juniors?</p>
            <button
              onClick={() => navigate("/mentor/apply")}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Apply as Mentor
            </button>
          </div>
        )}

        {/* 🔹 Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Stat title="Total Sessions" value="12" />
          <Stat title="Upcoming Sessions" value="3" />
          <Stat title="Amount Spent" value="₹2400" />
        </div>

        {/* 🔹 Recent Activity */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>✔ Session booked with Abhishek Ranjhan</li>
            <li>✔ Resume review completed</li>
            <li>✔ Payment successful</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable stat card
const Stat = ({ title, value }) => (
  <div className="bg-gray-800 p-4 rounded">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;

