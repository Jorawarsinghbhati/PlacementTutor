import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔴 Remove auth data
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // 🔴 Redirect to login
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">PlacementTutor</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Main */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded">
            <p className="text-gray-400 text-sm">Total Sessions</p>
            <p className="text-2xl font-bold">12</p>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <p className="text-gray-400 text-sm">Upcoming Sessions</p>
            <p className="text-2xl font-bold">3</p>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <p className="text-gray-400 text-sm">Amount Spent</p>
            <p className="text-2xl font-bold">₹2400</p>
          </div>
        </div>

        {/* Recent Activity */}
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

export default Dashboard;
