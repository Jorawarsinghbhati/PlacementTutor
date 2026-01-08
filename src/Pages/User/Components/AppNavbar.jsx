// import { useNavigate } from "react-router-dom";

// const AppNavbar = ({ username }) => {
//   const navigate = useNavigate();

//   return (
//     <nav className="flex justify-between items-center px-10 py-5 border-b border-white/10">
//       <h1 className="text-xl font-bold text-indigo-400">
//         PlacementTutor
//       </h1>

//       <div className="flex gap-6 text-sm text-gray-300">
//         <button onClick={() => navigate("/dashboard/about")}>About</button>
//         <button onClick={() => navigate("/dashboard/MentorProfile")}>Mentors</button>
//         <button onClick={() => navigate("/dashboard/Booking")}>
//           Booking
//         </button>
//         <button
//           onClick={() => {
//             localStorage.clear();
//             navigate("/");
//           }}
//           className="text-red-400"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default AppNavbar;
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LogOut, 
  Bell, 
  Search, 
  User, 
  ChevronDown,
  Menu,
  Home,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  Sparkles
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const AppNavbar = ({ user, onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const notifications = [
    { id: 1, title: "New booking request", time: "2 min ago", read: false, icon: Calendar },
    { id: 2, title: "Session reminder", time: "1 hour ago", read: true, icon: Clock },
    { id: 3, title: "Profile updated", time: "2 hours ago", read: true, icon: User },
    { id: 4, title: "New message", time: "5 hours ago", read: false, icon: MessageSquare },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: "/dashboard/about", label: "About", icon: Home },
    { path: "/dashboard/MentorProfile", label: "Mentors", icon: Users },
    { path: "/dashboard/Booking", label: "Booking", icon: Calendar },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 bg-gradient-to-r from-[#111827]/90 to-[#0b1220]/90 backdrop-blur-md border-b border-white/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Logo & Mobile Menu */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onMenuClick}
                className="lg:hidden w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center mr-3 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </motion.button>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111827]"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    PlacementTutor
                  </h1>
                  <p className="text-xs text-gray-400 hidden sm:block">Expert Mentorship Platform</p>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center ml-8 gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.button
                      key={item.path}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(item.path)}
                      className={`relative px-4 py-2 rounded-lg mx-1 transition-all duration-300 ${
                        isActive 
                          ? 'text-white bg-gradient-to-r from-indigo-500/20 to-purple-500/20' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right Section - Search & User Menu */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                className="hidden md:block relative"
              >
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search mentors, sessions..."
                      className="pl-10 pr-4 py-2 w-64 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    />
                  </div>
                </form>
              </motion.div>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center relative transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#111827]"
                  />
                </motion.button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", damping: 25 }}
                      className="absolute right-0 mt-2 w-80 bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-xl border border-white/10 shadow-2xl z-40 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {notifications.filter(n => !n.read).length} unread
                        </p>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                            className={`p-4 border-b border-white/5 transition-colors ${
                              !notification.read ? 'bg-indigo-500/5' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                <notification.icon className="w-4 h-4 text-indigo-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">{notification.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <button className="w-full py-3 text-center text-sm text-indigo-400 hover:text-indigo-300 border-t border-white/10 hover:bg-white/5 transition-colors">
                        View all notifications
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white truncate max-w-[120px]">
                      {user?.username || 'User'}
                    </p>
                    <p className="text-xs text-gray-400">Premium Member</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", damping: 25 }}
                      className="absolute right-0 mt-2 w-64 bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-xl border border-white/10 shadow-2xl z-40 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{user?.username}</p>
                            <p className="text-sm text-gray-400">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <button className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </button>
                        <button className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                          <HelpCircle className="w-4 h-4" />
                          <span>Help & Support</span>
                        </button>
                      </div>
                      
                      <div className="p-4 border-t border-white/10">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogout}
                          className="w-full px-4 py-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 text-red-400 hover:text-red-300 hover:border-red-400 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden border-t border-white/10 bg-gradient-to-r from-[#111827] to-[#0b1220]">
          <div className="flex items-center justify-around px-4 py-2">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.button
                  key={item.path}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    isActive 
                      ? 'text-indigo-400 bg-indigo-500/10' 
                      : 'text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Quick Actions Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-20 right-6 z-30 w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-2xl shadow-indigo-500/30 flex items-center justify-center lg:hidden"
        onClick={() => navigate("/dashboard/Booking")}
      >
        <Calendar className="w-6 h-6 text-white" />
      </motion.button>
    </>
  );
};

// Import Clock for notifications
const Clock = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// AnimatePresence component
const AnimatePresence = ({ children }) => children;

export default AppNavbar;