import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../Service/apiConnector";
import { adminEndpoints } from "../../Service/apis";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingMentors, setPendingMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("DASHBOARD"); // DASHBOARD | MENTORS

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // 🔹 Fetch stats
        const statsRes = await apiConnector(
          "GET",
          adminEndpoints.ADMIN_STATS
        );
        setStats(statsRes.data.stats);
        console.log("Admin stats:", statsRes.data.stats);
        // 🔹 Fetch pending mentor requests
        const mentorsRes = await apiConnector(
          "GET",
          adminEndpoints.PENDING_MENTORS
        );
        setPendingMentors(mentorsRes.data.mentors || []);
      } catch (err) {
        console.error("Admin data error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleApprove = async (mentorId) => {
    await apiConnector(
      "POST",
      adminEndpoints.APPROVE_MENTOR(mentorId)
    );
    setPendingMentors(prev => prev.filter(m => m._id !== mentorId));
  };

  const handleReject = async (mentorId) => {
    await apiConnector(
      "POST",
      adminEndpoints.REJECT_MENTOR(mentorId)
    );
    setPendingMentors(prev => prev.filter(m => m._id !== mentorId));
  };

  const handleLogout = () => {
    localStorage.clear();
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
            <li
              onClick={() => setActiveTab("DASHBOARD")}
              className={`cursor-pointer ${
                activeTab === "DASHBOARD" ? "text-white" : ""
              }`}
            >
              Dashboard
            </li>
            <li
              onClick={() => setActiveTab("MENTORS")}
              className={`cursor-pointer ${
                activeTab === "MENTORS" ? "text-white" : ""
              }`}
            >
              Mentor Requests
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 py-2 rounded font-semibold"
        >
          Logout
        </button>
      </aside>

      {/* 🔹 Main Content */}
      <main className="flex-1 bg-gray-900 p-8 text-white">
        {activeTab === "DASHBOARD" && (
          <>
            <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
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
          </>
        )}

        {activeTab === "MENTORS" && (
          <>
            <h1 className="text-2xl font-bold mb-6">
              Pending Mentor Requests
            </h1>

            {pendingMentors.length === 0 ? (
              <p className="text-gray-400">No pending requests</p>
            ) : (
              <div className="space-y-4">
                {pendingMentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="bg-[#111] p-4 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{mentor.name}</p>
                      <p className="text-sm text-gray-400">
                        {mentor.college} · {mentor.currentCompany}
                      </p>
                      <a
                        href={mentor.offerLetterUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 text-sm underline"
                      >
                        View Offer Letter
                      </a>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(mentor._id)}
                        className="bg-green-600 px-4 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(mentor._id)}
                        className="bg-red-600 px-4 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

// 🔹 Reusable Card
const StatCard = ({ title, value }) => (
  <div className="bg-[#111] p-6 rounded-xl shadow-md">
    <p className="text-gray-400 text-sm mb-2">{title}</p>
    <h3 className="text-3xl font-bold">{value}</h3>
  </div>
);

export default AdminDashboard;

