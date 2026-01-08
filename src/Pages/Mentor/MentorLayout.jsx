// // Pages/Mentor/MentorLayout.jsx
// import { NavLink, Outlet } from "react-router-dom";

// const MentorLayout = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Navbar */}
//       <nav className="border-b border-gray-800 px-8 py-4 flex gap-8">
//         {[
//           { to: "about", label: "About" },
//           { to: "bookings", label: "Bookings" },
//           { to: "availability", label: "Availability Management" },
//           { to: "payments", label: "Payments & Earnings" },
//         ].map((item) => (
//           <NavLink
//             key={item.to}
//             to={item.to}
//             className={({ isActive }) =>
//               `pb-1 ${
//                 isActive
//                   ? "border-b-2 border-indigo-500 text-indigo-400"
//                   : "text-gray-400 hover:text-white"
//               }`
//             }
//           >
//             {item.label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Page Content */}
//       <div className="p-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default MentorLayout;
// Pages/Mentor/MentorLayout.jsx
"use client";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  User,
  Calendar,
  DollarSign,
  Settings,
  HelpCircle,
  ChevronDown,
  Home,
  Clock,
  Shield,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiConnector } from "../../Service/apiConnector";
import { mentorEndpoints } from "../../Service/apis";

const MentorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [mentorData,setmentorData]=useState("");

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update active nav based on current path
  useEffect(
    () => {
    const path = location.pathname.split("/").pop() || "about";
    setActiveNav(path);
  }, [location]);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("mentorData");

    // Clear session storage
    sessionStorage.clear();

    // Redirect to login page
    navigate("/");

    // Close logout modal
    setShowLogoutConfirm(false);
  };

  const navItems = [
    {
      to: "about",
      label: "Profile",
      icon: User,
      description: "View your profile",
    },
    {
      to: "bookings",
      label: "Bookings",
      icon: Calendar,
      description: "Manage sessions",
    },
    {
      to: "availability",
      label: "Availability",
      icon: Clock,
      description: "Set your schedule",
    },
    {
      to: "payments",
      label: "Earnings",
      icon: DollarSign,
      description: "Track payments",
    },
  ];


  useEffect(()=>{
    const load=async()=>{
      try {
        const response= await apiConnector("GET",mentorEndpoints.ABOUT);
        setmentorData(response.data.mentor)
      } catch (error) {
        console.log("error in fetch Mentor",error);
      }
    }
    load();
  },[])
  // Mock mentor data (you can replace with actual data from context/API)

  // Get current page title
  const getPageTitle = () => {
    const currentItem = navItems.find((item) => item.to === activeNav);
    return currentItem ? currentItem.label : "Mentor Dashboard";
  };

  // Get current page description
  const getPageDescription = () => {
    const currentItem = navItems.find((item) => item.to === activeNav);
    return currentItem ? currentItem.description : "Manage your mentor account";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-b from-[#111827]/95 to-transparent backdrop-blur-lg px-4 sm:px-6 lg:px-8 py-4"
        >
          <div className="max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/mentor/about")}
                >
                  <div className="w-6 h-6 text-white font-bold">M</div>
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {getPageTitle()}
                  </h1>
                  <p className="text-xs text-gray-400">
                    {getPageDescription()}
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-4">
                {/* Help Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/help")}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
                >
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Help</span>
                </motion.button>

                {/* Profile Menu */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      
                    </div>
                    {!isMobile && (
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">
                          
                        </p>
                        <p className="text-xs text-gray-400">Mentor</p>
                      </div>
                    )}
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-64 bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
                      >
                        {/* Profile Header */}
                        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {mentorData.initials}
                            </div>
                            <div>
                              <p className="font-semibold text-white">
                                {mentorData.name}
                              </p>
                              <p className="text-sm text-gray-400">
                                {mentorData.user.email}
                              </p>
                            </div>
                          </div>

                  
                      
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={() => {
                              navigate("/");
                              setShowProfileMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-white/5 rounded-lg transition text-left"
                          >
                            <Home className="h-4 w-4" />
                            <div>
                              <p className="font-medium">Home</p>
                              <p className="text-xs text-gray-400">
                                Go to main site
                              </p>
                            </div>
                          </motion.button>

                          

                          <div className="border-t border-white/10 my-2"></div>

                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={() => {
                              setShowLogoutConfirm(true);
                              setShowProfileMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition text-left"
                          >
                            <LogOut className="h-4 w-4" />
                            <div>
                              <p className="font-medium">Logout</p>
                              <p className="text-xs text-red-400/70">
                                Sign out from dashboard
                              </p>
                            </div>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Bottom Bar */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1 mt-6"
              >
                {navItems.map((item) => {
                  const isActive = activeNav === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setActiveNav(item.to)}
                      className={({ isActive }) => {
                        const baseClasses =
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative";

                        if (isActive) {
                          return `${baseClasses} bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-white shadow-lg shadow-indigo-500/10`;
                        }

                        return `${baseClasses} text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105`;
                      }}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          activeNav === item.to ? "text-indigo-400" : ""
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>

                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </NavLink>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Mobile Navigation */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <div className="flex items-center justify-around bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                {navItems.slice(0, 4).map((item) => {
                  const isActive = activeNav === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setActiveNav(item.to)}
                      className={({ isActive }) => {
                        const baseClasses =
                          "flex flex-col items-center gap-1 px-2 py-3 rounded-lg transition-all duration-300 flex-1";

                        if (isActive) {
                          return `${baseClasses} bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white`;
                        }

                        return `${baseClasses} text-gray-400 hover:text-white`;
                      }}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          isActive ? "text-indigo-400" : ""
                        }`}
                      />
                      <span className="text-xs font-medium">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.nav>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setShowLogoutConfirm(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-xl flex items-center justify-center"
                  >
                    <LogOut className="h-6 w-6 text-red-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Confirm Logout
                    </h3>
                    <p className="text-sm text-gray-400">
                      Secure session ending
                    </p>
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-300 mb-6"
                >
                  Are you sure you want to logout from your mentor dashboard?
                  You'll need to sign in again to access your account.
                </motion.p>
              </div>

              {/* Modal Actions */}
              <div className="p-6 bg-gradient-to-b from-[#1f2937] to-[#111827]">
                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-5 py-2.5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                  >
                    Yes, Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-white/10 mt-8 py-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Mentor Dashboard
                </p>
                <p className="text-xs text-gray-400">
                  Powered by PlacementTutor
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Mentor Dashboard. All rights
                reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                v1.0.0 • Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default MentorLayout;
