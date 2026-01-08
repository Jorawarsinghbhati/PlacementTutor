import React, { useState, useEffect } from "react";
import { apiConnector } from "../../../Service/apiConnector";
import { adminEndpoints } from "../../../Service/apis";

// SVG Icons as React components
const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    calendar: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    team: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 01-4 4m4-4a4 4 0 00-4-4m4 4h2m-6-4a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    close: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    dollar: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    user: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    arrowUp: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    ),
    arrowDown: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    ),
    book: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    checkCircle: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    closeCircle: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    shoppingCart: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    lineChart: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    trendingUp: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    trendingDown: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    fire: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// Notification component
const showNotification = (type, title, message) => {
  const notification = document.createElement('div');
  notification.className = `fixed bottom-4 right-4 z-50 p-4 rounded-xl shadow-2xl border-l-4 transform transition-all duration-300 translate-x-0 ${
    type === 'success' 
      ? 'bg-emerald-900/20 border-emerald-500' 
      : type === 'error'
      ? 'bg-rose-900/20 border-rose-500'
      : 'bg-blue-900/20 border-blue-500'
  } backdrop-blur-lg`;
  
  notification.innerHTML = `
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <div class="w-10 h-10 rounded-full ${
          type === 'success' ? 'bg-emerald-500/20' : 
          type === 'error' ? 'bg-rose-500/20' : 'bg-blue-500/20'
        } flex items-center justify-center">
          ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
        </div>
      </div>
      <div>
        <h3 class="font-semibold text-white">${title}</h3>
        <p class="text-sm text-gray-300 mt-1">${message}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

const Overview = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [popularTimeSlot, setPopularTimeSlot] = useState(null);
  const [mentorRequests, setMentorRequests] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState({
    stats: false,
    mentors: false,
    bookings: false,
    timeSlot: false,
  });

  /* -------------------- FETCH DATA -------------------- */
  useEffect(() => {
    fetchDashboardStats();
    fetchPopularTimeSlot();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading((p) => ({ ...p, stats: true }));
    try {
      const res = await apiConnector("GET", adminEndpoints.ADMIN_DASHBOARD_STATS);
      console.log("Dashboard stats response:", res);
      setDashboardStats(res.data.val);
    } catch {
      showNotification('error', 'Failed to Load', '❌ Failed to load dashboard statistics');
    } finally {
      setLoading((p) => ({ ...p, stats: false }));
    }
  };

  const fetchPopularTimeSlot = async () => {
    setLoading((p) => ({ ...p, timeSlot: true }));
    try {
      const res = await apiConnector("GET", adminEndpoints.POPULAR_TIME_SLOT);
      console.log("Popular time slot response:", res);
      if (res.data.success) {
        setPopularTimeSlot(res.data.popularTimeSlot);
      }
    } catch (error) {
      console.error("Error fetching popular time slot:", error);
      showNotification('error', 'Failed to Load', '❌ Failed to load popular time slot');
    } finally {
      setLoading((p) => ({ ...p, timeSlot: false }));
    }
  };

  /* -------------------- HELPERS -------------------- */
  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  const formatTime = (t) => {
    if (!t) return "N/A";
    const [h, m] = t.split(":");
    const hr = parseInt(h, 10);
    const minutes = m ? `:${m}` : "";
    return `${hr % 12 || 12}${minutes} ${hr >= 12 ? "PM" : "AM"}`;
  };

  const calculateBookingStats = () => {
    if (!allBookings.length) return null;
    
    return {
      totalBookings: allBookings.length,
      completed: allBookings.filter(b => b.status === "COMPLETED").length,
      totalRevenue: allBookings.reduce((sum, b) => sum + (b.amount || 0), 0),
      cancelled: allBookings.filter(b => b.status === "CANCELLED").length,
      pending: allBookings.filter(b => b.status === "PENDING").length,
    };
  };

  const bookingStats = calculateBookingStats();
  const mentorPreview = mentorRequests.slice(0, 3);

  /* -------------------- RENDER FUNCTIONS -------------------- */
  const renderPopularTimeSlot = () => {
    if (loading.timeSlot) {
      return (
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Icon name="fire" className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Popular Time Slot</h3>
              <div className="text-sm text-gray-400">Loading...</div>
            </div>
          </div>
          <div className="h-4 bg-gray-700/50 rounded animate-pulse w-3/4"></div>
        </div>
      );
    }

    if (!popularTimeSlot) {
      return (
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Icon name="fire" className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Popular Time Slot</h3>
              <div className="text-sm text-gray-400">No data available</div>
            </div>
          </div>
          <div className="text-gray-400 text-sm">No booking data found</div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
            <Icon name="fire" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Popular Time Slot</h3>
            <div className="text-sm text-gray-400">Most booked time period</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="clock" className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300">Time Slot:</span>
            </div>
            <div className="text-lg font-bold text-white">
              {formatTime(popularTimeSlot.startTime)} - {formatTime(popularTimeSlot.endTime)}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="team" className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300">Total Bookings:</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">
              {popularTimeSlot.bookings}
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Popularity Level</span>
              <span>{Math.min(Math.round((popularTimeSlot.bookings || 0) / 10 * 100), 100)}%</span>
            </div>
            <div className="w-full bg-gray-700/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.round((popularTimeSlot.bookings || 0) / 10 * 100), 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-orange-500/20">
          <div className="flex items-center space-x-2 text-sm text-orange-300">
            <Icon name="trendingUp" className="w-4 h-4" />
            <span>This is the most preferred booking slot by users</span>
          </div>
        </div>
      </div>
    );
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-4 sm:p-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20 p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
              Welcome back, Abhishek Ranjan 👋
            </h2>
            <p className="text-gray-300">
              Here's what's happening with your platform today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              {formatDate(new Date())}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Icon name="user" className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Total Users</div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                {loading.stats ? (
                  <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                ) : (
                  dashboardStats?.totalUsers || 0
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-blue-300">
            <Icon name="trendingUp" className="w-4 h-4 mr-1" />
            <span>Active platform users</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Icon name="team" className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Today's Bookings</div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                {loading.stats ? (
                  <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                ) : (
                  dashboardStats?.todaysBookings || 0
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-purple-300">
            <Icon name="calendar" className="w-4 h-4 mr-1" />
            <span>Bookings scheduled for today</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Icon name="book" className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Total Bookings</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-400">
                {loading.stats ? (
                  <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                ) : (
                  dashboardStats?.totalBookings || 0
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-green-300">
            <Icon name="trendingUp" className="w-4 h-4 mr-1" />
            <span>All time bookings</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Icon name="dollar" className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Total Revenue</div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-400">
                {loading.stats ? (
                  <div className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                ) : (
                  dashboardStats?.totalRevenue || 0
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-orange-300">
            <Icon name="trendingUp" className="w-4 h-4 mr-1" />
            <span>Total platform revenue</span>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Popular Time Slot Card */}
        {renderPopularTimeSlot()}
        
       </div>
    </div>
  );
};

export default Overview;