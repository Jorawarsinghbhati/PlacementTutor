// Pages/Mentor/MentorLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

const MentorLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-8 py-4 flex gap-8">
        {[
          { to: "about", label: "About" },
          { to: "bookings", label: "Bookings" },
          { to: "availability", label: "Availability Management" },
          { to: "payments", label: "Payments & Earnings" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `pb-1 ${
                isActive
                  ? "border-b-2 border-indigo-500 text-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Page Content */}
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MentorLayout;
