import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-10 py-5 border-b border-white/10">
      <h1 className="text-xl font-bold text-indigo-400">
        PlacementTutor
      </h1>

      <div className="flex gap-6 text-sm text-gray-300">
      <button onClick={() => navigate("/admin")}>Overview</button>
        <button onClick={() => navigate("/admin/AdminGlobalBlock")}>AdminGlobalBlock</button>
        <button onClick={() => navigate("/admin/users")}>AdminUsersection</button>
        <button onClick={() => navigate("/admin/AllBooking")}>
          AllBooking
        </button>
        <button onClick={() => navigate("/admin/MentorRequest")}>
          MentorRequest
        </button>
        <button onClick={() => navigate("/admin/Review")}>
           Review
        </button>
        <button onClick={() => navigate("/admin/AdminMentors")}>
        AdminMentorSection
        </button>


        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="text-red-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AppNavbar;
