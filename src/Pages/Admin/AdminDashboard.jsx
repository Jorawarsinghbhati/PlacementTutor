import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../Service/apiConnector";
import { adminEndpoints } from "../../Service/apis";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await apiConnector(
          "GET",
          adminEndpoints.ADMIN_STATS
        );
        setStats(res.data.stats);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const handleLogout = () => {
    // 🔴 Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // 🔴 Redirect to login
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* 🔹 Sidebar */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-white cursor-pointer">Dashboard</li>
            <li className="hover:text-white cursor-pointer">Users</li>
            <li className="hover:text-white cursor-pointer">Mentors</li>
            <li className="hover:text-white cursor-pointer">Stats</li>
          </ul>
        </div>

        {/* 🔹 Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 bg-red-600 hover:bg-red-700 py-2 rounded text-white font-semibold"
        >
          Logout
        </button>
      </aside>

      {/* 🔹 Main Content */}
      <main className="flex-1 bg-gray-900 p-8 text-white">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

        {/* 🔹 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Total Mentors" value={stats.totalMentors} />
          <StatCard title="Total Admins" value={stats.totalAdmins} />
          <StatCard title="Total Colleges" value={stats.totalColleges} />
          <StatCard
            title="New Users (Last 7 Days)"
            value={stats.newUsersLast7Days}
          />
        </div>
      </main>
    </div>
  );
};

// 🔹 Reusable Card Component
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-[#111] p-6 rounded-xl shadow-md">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
};

export default AdminDashboard;
