import React, { useState, useEffect, useMemo } from "react";
import { apiConnector } from "../../../Service/apiConnector";
import { adminEndpoints } from "../../../Service/apis";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Infinity },
  },
};

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState(["", ""]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [statsLoading, setStatsLoading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    setLoading(true);
    setStatsLoading(true);
    try {
      const response = await apiConnector(
        "GET",
        adminEndpoints.ALL_BOOKINGS_DETAILED
      );
      if (response.data.success) {
        const bookings = response.data.data || [];
        setAllBookings(bookings);
        setPagination((prev) => ({
          ...prev,
          total: response.data.count || bookings.length,
        }));
        showNotification('success', 'Bookings Loaded', `✅ Loaded ${bookings.length} bookings`);
      }
    } catch (error) {
      showNotification('error', 'Failed to Load', '❌ Failed to load bookings');
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  };

  // Format functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
  };

  const getStatusConfig = (status) => {
    const configs = {
      CONFIRMED: {
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        icon: "✓",
        glow: "shadow-green-500/20",
      },
      COMPLETED: {
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        icon: "✓",
        glow: "shadow-blue-500/20",
      },
      PENDING: {
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        icon: "⏳",
        glow: "shadow-yellow-500/20",
      },
      CANCELLED: {
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        icon: "✗",
        glow: "shadow-red-500/20",
      },
      FAILED: {
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        icon: "⚠️",
        glow: "shadow-rose-500/20",
      },
      IN_PROGRESS: {
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        icon: "⟳",
        glow: "shadow-purple-500/20",
      },
    };
    return (
      configs[status] || {
        color: "text-gray-400",
        bg: "bg-gray-500/10",
        border: "border-gray-500/30",
        icon: "⏳",
        glow: "shadow-gray-500/20",
      }
    );
  };

  // Show notification
  const showNotification = (type, title, message) => {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 z-50 p-4 rounded-xl shadow-2xl border-l-4 transform transition-all duration-300 translate-x-0 ${
      type === 'success' 
        ? 'bg-emerald-900/20 border-emerald-500' 
        : 'bg-rose-900/20 border-rose-500'
    } backdrop-blur-lg`;
    
    notification.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 rounded-full ${
            type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20'
          } flex items-center justify-center">
            ${type === 'success' 
              ? '✓' 
              : '✗'
            }
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

  // Booking statistics
  const calculateStats = useMemo(() => {
    if (!allBookings.length) return null;
    const completedBookings=allBookings.filter(
      (b) => b.status === "COMPLETED"
    );
    const completed = completedBookings.length;
    const confirmBookings=allBookings.filter(
      (b) => b.status === "CONFIRMED"
    )
    const confirmed = confirmBookings.length;
    const pending = allBookings.filter((b) => b.status === "PENDING").length;
    const cancelled = allBookings.filter(
      (b) => b.status === "CANCELLED"
    ).length;
    const failed = allBookings.filter((b) => b.status === "FAILED").length;
    const totalRevenue = confirmBookings.reduce(
      (sum, b) => sum + (b.amount || 0),
      0
    );
    const todayBookings = allBookings.filter((b) => {
      const bookingDate = new Date(b.date);
      const today = new Date();
      return bookingDate.toDateString() === today.toDateString();
    }).length;

    return {
      totalBookings: allBookings.length,
      completed,
      confirmed,
      pending,
      cancelled,
      failed,
      todayBookings,
      totalRevenue,
      conversionRate:
        allBookings.length > 0
          ? (((completed + confirmed) / allBookings.length) * 100).toFixed(1)
          : 0,
      avgRevenue: totalRevenue / allBookings.length,
    };
  }, [allBookings]);

  // Filtered and sorted bookings
  const filteredBookings = useMemo(() => {
    let result = allBookings;

    // Filter by search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.userName?.toLowerCase().includes(searchLower) ||
          booking.mentorName?.toLowerCase().includes(searchLower) ||
          booking.userEmail?.toLowerCase().includes(searchLower) ||
          booking.mentorEmail?.toLowerCase().includes(searchLower) ||
          booking.bookingId?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date range
    if (dateRange[0] && dateRange[1]) {
      result = result.filter((booking) => {
        const bookingDate = new Date(booking.date);
        const startDate = new Date(dateRange[0]);
        const endDate = new Date(dateRange[1]);
        endDate.setHours(23, 59, 59, 999);
        return bookingDate >= startDate && bookingDate <= endDate;
      });
    }

    // Filter by status
    if (selectedStatus !== "all") {
      result = result.filter((booking) => booking.status === selectedStatus);
    }

    // Sort bookings
    switch (sortBy) {
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        );
        break;
      case "amount-high":
        result.sort((a, b) => (b.amount || 0) - (a.amount || 0));
        break;
      case "amount-low":
        result.sort((a, b) => (a.amount || 0) - (b.amount || 0));
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date)
        );
        break;
      default:
        break;
    }

    return result;
  }, [allBookings, searchText, dateRange, selectedStatus, sortBy]);

  // Handler functions
  const handleExport = () => {
    const dataStr = JSON.stringify(filteredBookings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `bookings_export_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('success', 'Export Successful', '✅ Export completed successfully!');
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleStatusFilter = (value) => {
    setSelectedStatus(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleRefresh = () => {
    fetchAllBookings();
    showNotification('info', 'Refreshed', 'Bookings refreshed!');
  };

  const handleClearFilters = () => {
    setSearchText("");
    setDateRange(["", ""]);
    setSelectedStatus("all");
    setSortBy("recent");
    showNotification('info', 'Filters Cleared', '🧹 Filters cleared');
  };

  // Custom SVG Icons
  const Icon = ({ name, className = "w-5 h-5" }) => {
    const icons = {
      calendar: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      dollar: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      clock: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      close: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      search: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      user: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      mail: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      star: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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
      refresh: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      filter: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
    };
    return icons[name] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-4 md:p-6">
      {/* Header Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl backdrop-blur-sm"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Bookings Management
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Monitor and manage all booking sessions across the platform
            </p>
          </div>

          {/* Filters Section */}
          <div className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Icon name="search" className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">📊 All Status</option>
                <option value="PENDING">⏳ Pending</option>
                <option value="CONFIRMED">✅ Confirmed</option>
                <option value="COMPLETED">🏁 Completed</option>
                <option value="CANCELLED">❌ Cancelled</option>
                <option value="FAILED">💥 Failed</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="recent">🕐 Most Recent</option>
                <option value="oldest">📅 Oldest First</option>
                <option value="amount-high">💰 Amount: High-Low</option>
                <option value="amount-low">💸 Amount: Low-High</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateRange[0]}
                  onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={dateRange[1]}
                  onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl hover:border-blue-400/40 hover:bg-blue-500/20 transition-all flex items-center justify-center"
                >
                  <Icon name="refresh" className={`w-5 h-5 text-blue-400 ${loading ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleClearFilters}
                  className="p-3 bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 rounded-xl hover:border-gray-400/40 hover:bg-gray-500/20 transition-all flex items-center justify-center"
                >
                  <Icon name="filter" className="w-5 h-5 text-gray-300" />
                </button>

                <button
                  onClick={handleExport}
                  className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2"
                >
                  <span>⬇ Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {calculateStats && (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Bookings */}
              <motion.div variants={scaleIn}>
                <div className="rounded-2xl p-6 bg-gradient-to-b from-[#111827] to-[#0b1220] border border-white/10 hover:border-indigo-500/40 transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-indigo-500/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                        <Icon name="calendar" className="w-4 h-4 text-indigo-400" />
                        Total Bookings
                      </p>
                      <motion.p
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                      >
                        {calculateStats.totalBookings}
                      </motion.p>
                      <p className="text-indigo-300 text-xs mt-2">
                        {calculateStats.todayBookings} today
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Icon name="calendar" className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                </div>
              </motion.div>

              {/* Total Revenue */}
              <motion.div variants={scaleIn}>
                <div className="rounded-2xl p-6 bg-gradient-to-b from-[#111827] to-[#0b1220] border border-white/10 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-green-500/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                        <Icon name="dollar" className="w-4 h-4 text-green-400" />
                        Total Revenue
                      </p>
                      <motion.p
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                      >
                        ₹{calculateStats.totalRevenue.toLocaleString()}
                      </motion.p>
                      <p className="text-green-300 text-xs mt-2">
                        Avg: ₹{calculateStats.avgRevenue.toFixed(0)}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <Icon name="dollar" className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" />
                </div>
              </motion.div>

              {/* Active Bookings */}
              <motion.div variants={scaleIn}>
                <div className="rounded-2xl p-6 bg-gradient-to-b from-[#111827] to-[#0b1220] border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-blue-500/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                        <Icon name="clock" className="w-4 h-4 text-blue-400" />
                        Confirm Bookings
                      </p>
                      <motion.p
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                      >
                        {calculateStats.confirmed}
                      </motion.p>
                      <p className="text-blue-300 text-xs mt-2">
                        {calculateStats.conversionRate}% conversion
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                      <Icon name="clock" className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full" />
                </div>
              </motion.div>

              {/* Failed / Cancelled */}
              <motion.div variants={scaleIn}>
                <div className="rounded-2xl p-6 bg-gradient-to-b from-[#111827] to-[#0b1220] border border-white/10 hover:border-red-500/40 transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-red-500/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                        <Icon name="close" className="w-4 h-4 text-red-400" />
                        Failed / Cancelled
                      </p>
                      <motion.p
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent"
                      >
                        {calculateStats.failed + calculateStats.cancelled}
                      </motion.p>
                      <p className="text-red-300 text-xs mt-2">
                        {calculateStats.failed} failed • {calculateStats.cancelled} cancelled
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                      <Icon name="close" className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 h-1 w-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Bookings Table */}
        <motion.div variants={fadeInUp} className="overflow-x-auto rounded-2xl border border-white/10">
          <div className="min-w-full">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">BOOKING ID</span>
                <Icon name="arrowUp" className="w-4 h-4 text-gray-400" />
              </div>
              <div className="font-semibold text-white">USER</div>
              <div className="font-semibold text-white">MENTOR</div>
              <div className="font-semibold text-white">SESSION</div>
              <div className="font-semibold text-white">AMOUNT</div>
              <div className="font-semibold text-white">STATUS</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
              {loading ? (
                <div className="py-12 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <p className="text-gray-400">Loading bookings...</p>
                  </div>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                      <Icon name="calendar" className="w-8 h-8 text-gray-500" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-white mb-2">No bookings found</h3>
                      <p className="text-gray-400">
                        {searchText ? "Try adjusting your search criteria" : "No bookings available"}
                      </p>
                    </div>
                    <button
                      onClick={() => fetchAllBookings()}
                      className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300"
                    >
                      Refresh Data
                    </button>
                  </div>
                </div>
              ) : (
                filteredBookings.slice(
                  (pagination.current - 1) * pagination.pageSize,
                  pagination.current * pagination.pageSize
                ).map((booking, index) => {
                  const statusConfig = getStatusConfig(booking.status);
                  return (
                    <div
                      key={booking._id || booking.bookingId}
                      className={`grid grid-cols-6 gap-4 p-6 transition-all duration-300 ${
                        hoveredRow === index
                          ? "bg-gradient-to-r from-white/10 to-white/5"
                          : index % 2 === 0
                          ? "bg-white/[0.02]"
                          : "bg-white/[0.01]"
                      }`}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {/* Booking ID */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-indigo-300 rounded-xl font-mono text-sm border border-indigo-500/20 hover:border-indigo-400/40 cursor-pointer transition-all duration-300"
                        onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                          <span>{booking.bookingId?.slice(-8) || "N/A"}</span>
                        </div>
                      </motion.div>

                      {/* User */}
                      <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-3 cursor-pointer group">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg relative z-10">
                            {booking.userName?.[0]?.toUpperCase() || "U"}
                          </div>
                        </motion.div>
                        <div className="group-hover:translate-x-1 transition-transform duration-300">
                          <div className="font-medium text-white group-hover:text-blue-300 transition-colors">
                            {booking.userName || "N/A"}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-blue-200">
                            <Icon name="mail" className="w-3 h-3" />
                            {booking.userEmail?.slice(0, 20) || "N/A"}
                            {booking.userEmail?.length > 20 && "..."}
                          </div>
                        </div>
                      </motion.div>

                      {/* Mentor */}
                      <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-3 cursor-pointer group">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg relative z-10">
                            {booking.mentorName?.[0]?.toUpperCase() || "M"}
                          </div>
                          {booking.mentorRating && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-xs font-bold text-white flex items-center">
                                <Icon name="star" className="w-2 h-2 mr-1" />
                                {booking.mentorRating}
                              </span>
                            </div>
                          )}
                        </motion.div>
                        <div className="group-hover:translate-x-1 transition-transform duration-300">
                          <div className="font-medium text-white group-hover:text-purple-300 transition-colors">
                            {booking.mentorName || "N/A"}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-purple-200">
                            <Icon name="mail" className="w-3 h-3" />
                            {booking.mentorEmail?.slice(0, 20) || "N/A"}
                            {booking.mentorEmail?.length > 20 && "..."}
                          </div>
                        </div>
                      </motion.div>

                      {/* Session */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-white">
                          <Icon name="calendar" className="w-4 h-4 text-indigo-400 animate-pulse" />
                          <span className="font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {formatDate(booking.date)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Icon name="clock" className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">
                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </span>
                        </div>
                        {booking.duration && (
                          <div className="text-xs text-gray-500 bg-gray-500/10 px-2 py-1 rounded-lg inline-block">
                            ⏱️ {booking.duration} mins
                          </div>
                        )}
                      </div>

                      {/* Amount */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        variants={pulseAnimation}
                        initial="initial"
                        animate="animate"
                        className="flex items-center space-x-2 font-bold text-lg bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 px-4 py-3 rounded-xl border border-green-500/20 hover:border-green-400/40 cursor-pointer transition-all duration-300"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <span className="text-white text-sm">₹</span>
                        </div>
                        <span className="text-green-300 drop-shadow-lg">
                          ₹{booking.amount?.toLocaleString() || 0}
                        </span>
                      </motion.div>

                      {/* Status */}
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`px-4 py-2 rounded-xl border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.glow} flex items-center gap-2 shadow-lg`}
                        >
                          <span>{statusConfig.icon}</span>
                          <span className={`font-semibold ${statusConfig.color}`}>
                            {booking.status?.replace("_", " ") || "UNKNOWN"}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Pagination */}
          {filteredBookings.length > 0 && (
            <div className="px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                Showing <span className="font-semibold text-white">
                  {(pagination.current - 1) * pagination.pageSize + 1}
                </span> to{' '}
                <span className="font-semibold text-white">
                  {Math.min(pagination.current * pagination.pageSize, filteredBookings.length)}
                </span> of{' '}
                <span className="font-semibold text-white">{filteredBookings.length}</span> bookings
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
                  disabled={pagination.current === 1}
                  className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-400 px-2">Page {pagination.current}</span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
                  disabled={pagination.current * pagination.pageSize >= filteredBookings.length}
                  className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AllBookings;