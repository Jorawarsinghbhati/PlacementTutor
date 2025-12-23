// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiConnector } from "../../Service/apiConnector";
// import { bookingEndpoints } from "../../Service/apis";

// const Booking = () => {
//   const navigate = useNavigate();

//   const [activeType, setActiveType] = useState("ONE_TO_ONE");
//   const [activeTab, setActiveTab] = useState("UPCOMING");
//   const [upcoming, setUpcoming] = useState([]);
//   const [completed, setCompleted] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await apiConnector(
//           "GET",
//           bookingEndpoints.MY_BOOKINGS
//         );
//         console.log("res is coming this",res);
//         setUpcoming(res.data.upcoming || []);
//         setCompleted(res.data.completed || []);
//       } catch (err) {
//         console.error("Booking fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const currentList =
//     activeTab === "UPCOMING" ? upcoming : completed;

//   return (
//     <div className="min-h-screen bg-[#0b1220] text-white">
//       <div className="px-16 py-10">
//         {/* 🔹 Page Title */}
//         <h1 className="text-2xl font-semibold mb-6">
//           Bookings
//         </h1>

//         {/* 🔹 Booking Type Pills */}
//         <div className="flex gap-3 mb-8">
//           {[
//             { key: "ONE_TO_ONE", label: "1:1 Calls" },
//             { key: "Resume-Review", label: "Resume-Review" },
//           ].map((t) => (
//             <button
//               key={t.key}
//               onClick={() => setActiveType(t.key)}
//               className={`px-4 py-2 rounded-full border text-sm transition ${
//                 activeType === t.key
//                   ? "bg-indigo-600 border-indigo-600"
//                   : "border-white/20 hover:border-white/40"
//               }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>

//         {/* 🔹 Upcoming / Completed Tabs */}
//         <div className="flex gap-8 border-b border-white/10 mb-10">
//           {["UPCOMING", "COMPLETED"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-3 text-sm font-medium ${
//                 activeTab === tab
//                   ? "border-b-2 border-white text-white"
//                   : "text-gray-400"
//               }`}
//             >
//               {tab === "UPCOMING" ? "Upcoming" : "Completed"}
//             </button>
//           ))}
//         </div>

//         {/* 🔹 Content */}
//         {loading ? (
//           <p className="text-gray-400">Loading bookings...</p>
//         ) : currentList.length === 0 ? (
//           <EmptyState navigate={navigate} />
//         ) : (
//           <div className="space-y-4">
//             {currentList.map((b) => (
//               <BookingRow key={b._id} booking={b} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Booking;

// /* ================= COMPONENTS ================= */

// const EmptyState = ({ navigate }) => {
//   return (
//     <div className="flex flex-col items-center justify-center py-24 text-center">
//       <div className="w-24 h-24 mb-6 rounded-full bg-yellow-400/20 flex items-center justify-center">
//         <span className="text-3xl">📣</span>
//       </div>

//       <h2 className="text-xl font-semibold mb-2">
//         Share your page
//       </h2>
//       <p className="text-gray-400 max-w-sm mb-6">
//         A new booking might just be around the corner,
//         share your page today!
//       </p>

//       <button
//         onClick={() => navigate("/mentorprofile")}
//         className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200"
//       >
//         Share page
//       </button>
//     </div>
//   );
// };

// const BookingRow = ({ booking }) => {
//   return (
//     <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
//       <div>
//         <p className="font-semibold">
//           {booking.mentor?.name}
//         </p>
//         <p className="text-sm text-gray-400">
//           {booking.serviceType} · {booking.slot?.date} ·{" "}
//           {booking.slot?.startTime}
//         </p>
//       </div>

//       {booking.meetingLink && (
//         <a
//           href={booking.meetingLink}
//           target="_blank"
//           rel="noreferrer"
//           className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
//         >
//           Join
//         </a>
//       )}
//     </div>
//   );
// };
// Pages/Mentor/Booking.jsx
// Pages/Mentor/Booking.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../Service/apiConnector";
import { bookingEndpoints } from "../../Service/apis";
import { 
  Calendar, 
  Clock, 
  Video, 
  FileText, 
  CheckCircle, 
  Clock as PendingIcon,
  XCircle,
  ChevronRight,
  Filter,
  Share2,
  ExternalLink,
  CalendarDays,
  Users,
  Award,
  TrendingUp,
  Bell
} from "lucide-react";

const Booking = () => {
  const navigate = useNavigate();

  const [activeType, setActiveType] = useState("ALL");
  const [activeTab, setActiveTab] = useState("UPCOMING");
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUpcoming: 0,
    totalCompleted: 0,
    pendingConfirmations: 0,
    confirmedSessions: 0,
    totalSessions: 0,
    nextSession: null
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    // Calculate statistics when bookings change
    const pendingConfirmations = upcoming.filter(b => b.status === "PENDING").length;
    const confirmedSessions = upcoming.filter(b => b.status === "CONFIRMED").length;
    const totalSessions = upcoming.length + completed.length;
    
    // Find the next upcoming session
    const now = new Date();
    const upcomingSessions = upcoming
      .filter(b => b.status === "CONFIRMED")
      .sort((a, b) => {
        const dateA = new Date(`${a.slot?.date}T${a.slot?.startTime}`);
        const dateB = new Date(`${b.slot?.date}T${b.slot?.startTime}`);
        return dateA - dateB;
      });
    
    const nextSession = upcomingSessions.length > 0 ? upcomingSessions[0] : null;
    
    setStats({
      totalUpcoming: upcoming.length,
      totalCompleted: completed.length,
      pendingConfirmations,
      confirmedSessions,
      totalSessions,
      nextSession
    });
  }, [upcoming, completed]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await apiConnector("GET", bookingEndpoints.MY_BOOKINGS);
      console.log("Bookings response:", res.data);
      
      if (res.data.success) {
        setUpcoming(res.data.upcoming || []);
        setCompleted(res.data.completed || []);
      }
    } catch (err) {
      console.error("Booking fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = useMemo(() => {
    let list = activeTab === "UPCOMING" ? upcoming : completed;
    
    if (activeType !== "ALL") {
      list = list.filter(booking => 
        booking.serviceType === activeType || 
        (activeType === "RESUME_REVIEW" && booking.serviceType === "RESUME_REVIEW")
      );
    }
    
    return list.sort((a, b) => {
      // Sort by date and time
      const dateA = `${a.slot?.date} ${a.slot?.startTime}`;
      const dateB = `${b.slot?.date} ${b.slot?.startTime}`;
      return activeTab === "UPCOMING" 
        ? new Date(dateA) - new Date(dateB)
        : new Date(dateB) - new Date(dateA);
    });
  }, [activeTab, activeType, upcoming, completed]);

  const getStatusConfig = (status) => {
    switch(status) {
      case "CONFIRMED":
        return { 
          icon: CheckCircle, 
          color: "text-green-500", 
          bgColor: "bg-green-500/10",
          label: "Confirmed"
        };
      case "PENDING":
        return { 
          icon: PendingIcon, 
          color: "text-yellow-500", 
          bgColor: "bg-yellow-500/10",
          label: "Pending"
        };
      case "CANCELLED":
        return { 
          icon: XCircle, 
          color: "text-red-500", 
          bgColor: "bg-red-500/10",
          label: "Cancelled"
        };
      default:
        return { 
          icon: Clock, 
          color: "text-gray-500", 
          bgColor: "bg-gray-500/10",
          label: status
        };
    }
  };

  const getServiceTypeConfig = (serviceType) => {
    switch(serviceType) {
      case "ONE_TO_ONE":
        return { 
          icon: Video, 
          label: "1:1 Call",
          color: "text-purple-500",
          bgColor: "bg-purple-500/10"
        };
      case "RESUME_REVIEW":
        return { 
          icon: FileText, 
          label: "Resume Review",
          color: "text-blue-500",
          bgColor: "bg-blue-500/10"
        };
      default:
        return { 
          icon: FileText, 
          label: serviceType,
          color: "text-gray-500",
          bgColor: "bg-gray-500/10"
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not set";
    const date = new Date(`${dateString}T00:00:00`);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatAmount = (amount) => {
    return `₹${amount}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0a0f1a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My Bookings
              </h1>
              <p className="text-gray-400 mt-2">Track and manage your scheduled sessions</p>
            </div>
            
            <div className="flex gap-3">
              {stats.pendingConfirmations > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setActiveTab("UPCOMING")}
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Bell size={18} />
                    {stats.pendingConfirmations} Pending
                  </button>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                    {stats.pendingConfirmations}
                  </div>
                </div>
              )}
              
              <button
                onClick={() => navigate("/mentorprofile")}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Share2 size={18} />
                Share Profile
              </button>
            </div>
          </div>

          {/* Stats Cards - User Perspective */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Total Sessions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <CalendarDays size={20} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Sessions</p>
                  <p className="text-2xl font-bold">{stats.totalSessions}</p>
                </div>
              </div>
            </div>
            
            {/* Upcoming Sessions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <TrendingUp size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Upcoming</p>
                  <p className="text-2xl font-bold">{stats.totalUpcoming}</p>
                </div>
              </div>
            </div>
            
            {/* Completed Sessions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Award size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-2xl font-bold">{stats.totalCompleted}</p>
                </div>
              </div>
            </div>
            
            {/* Next Session */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Clock size={20} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Next Session</p>
                  <p className="text-lg font-bold">
                    {stats.nextSession ? formatDate(stats.nextSession.slot?.date) : "No sessions"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-white/5 rounded-xl mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-300">Confirmed: <span className="font-bold">{stats.confirmedSessions}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-300">Pending: <span className="font-bold">{stats.pendingConfirmations}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-300">Total Spent: <span className="font-bold">
                {formatAmount(upcoming.reduce((sum, b) => sum + (b.amount || 0), 0) + 
                           completed.reduce((sum, b) => sum + (b.amount || 0), 0))}
              </span></span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          {/* Tabs and Filters */}
          <div className="border-b border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6">
              {/* Tabs */}
              <div className="flex space-x-1 bg-white/5 rounded-lg p-1 mb-4 md:mb-0">
                {["UPCOMING", "COMPLETED"].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setActiveType("ALL");
                      }}
                      className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab === "UPCOMING" ? "Upcoming" : "Completed"}
                    </button>
                  );
                })}
              </div>

              {/* Service Type Filters */}
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
                  {[
                    { key: "ALL", label: "All" },
                    { key: "ONE_TO_ONE", label: "1:1 Calls" },
                    { key: "RESUME_REVIEW", label: "Resume Reviews" },
                  ].map((type) => {
                    const isActive = activeType === type.key;
                    const config = getServiceTypeConfig(type.key === "ALL" ? "" : type.key);
                    return (
                      <button
                        key={type.key}
                        onClick={() => setActiveType(type.key)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? `${config.bgColor} ${config.color}`
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <config.icon size={14} />
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
                <p className="text-gray-400">Loading your bookings...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <EmptyState 
                navigate={navigate} 
                activeTab={activeTab}
                activeType={activeType}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredBookings.map((booking) => {
                  const statusConfig = getStatusConfig(booking.status);
                  const serviceConfig = getServiceTypeConfig(booking.serviceType);
                  const StatusIcon = statusConfig.icon;
                  const ServiceIcon = serviceConfig.icon;
                  
                  return (
                    <BookingCard 
                      key={booking._id}
                      booking={booking}
                      statusConfig={statusConfig}
                      serviceConfig={serviceConfig}
                      StatusIcon={StatusIcon}
                      ServiceIcon={ServiceIcon}
                      formatDate={formatDate}
                      formatTime={formatTime}
                      formatAmount={formatAmount}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ navigate, activeTab, activeType }) => {
  const messages = {
    UPCOMING: {
      title: "No upcoming sessions",
      description: activeType !== "ALL" 
        ? `You don't have any upcoming ${activeType === "ONE_TO_ONE" ? "1:1 calls" : "resume reviews"} scheduled.`
        : "Share your profile to get more bookings!",
      action: "Share Profile",
      secondaryAction: "Browse Mentors"
    },
    COMPLETED: {
      title: "No completed sessions",
      description: activeType !== "ALL"
        ? `You haven't completed any ${activeType === "ONE_TO_ONE" ? "1:1 calls" : "resume reviews"} yet.`
        : "Your completed sessions will appear here.",
      action: "View Upcoming",
      secondaryAction: "Book a Session"
    }
  };

  const currentMessage = messages[activeTab];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <Calendar size={32} />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-3">{currentMessage.title}</h2>
      <p className="text-gray-400 max-w-md mb-8">
        {currentMessage.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/mentorprofile")}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {currentMessage.action}
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {currentMessage.secondaryAction}
        </button>
      </div>
    </div>
  );
};

const BookingCard = ({ 
  booking, 
  statusConfig, 
  serviceConfig, 
  StatusIcon, 
  ServiceIcon,
  formatDate,
  formatTime,
  formatAmount
}) => {
  const isUpcoming = booking.status === "CONFIRMED" || booking.status === "PENDING";
  const isConfirmed = booking.status === "CONFIRMED";
  const isPending = booking.status === "PENDING";
  
  return (
    <div className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl cursor-pointer">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${serviceConfig.bgColor} flex items-center justify-center`}>
                <ServiceIcon size={20} className={serviceConfig.color} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{serviceConfig.label}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusConfig.bgColor}`}>
                    <StatusIcon size={12} className={statusConfig.color} />
                    <span className={statusConfig.color}>{statusConfig.label}</span>
                  </div>
                  {booking.paymentId && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-500/10">
                      <CheckCircle size={12} className="text-green-400" />
                      <span className="text-green-400">Paid</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Amount */}
            <div className="text-right">
              <p className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {formatAmount(booking.amount)}
              </p>
              <p className="text-xs text-gray-400 mt-1">Session Fee</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            {/* Date & Time */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Calendar size={16} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="font-medium">{formatDate(booking.slot?.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="font-medium">
                    {booking.slot?.startTime ? formatTime(booking.slot.startTime) : ""} - {booking.slot?.endTime ? formatTime(booking.slot.endTime) : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Booked On</p>
                  <p className="font-medium">
                    {new Date(booking.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              {booking.paymentProvider && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <CheckCircle size={16} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Payment</p>
                    <p className="font-medium capitalize">{booking.paymentProvider.toLowerCase()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col gap-3">
          {isConfirmed && isUpcoming && (
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95">
              <Video size={16} />
              Join Session
            </button>
          )}
          
          {isPending && (
            <div className="space-y-2">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 w-full">
                <CheckCircle size={16} />
                Confirm Payment
              </button>
              <p className="text-xs text-yellow-400 text-center">Waiting for confirmation</p>
            </div>
          )}
          
          <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95">
            <ExternalLink size={16} />
            View Details
          </button>
          
          <button className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300">
            Session Notes
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Payment ID (if exists) */}
      {booking.paymentId && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Payment Confirmed: 
            <span className="text-gray-300 font-mono text-xs">ID: {booking.paymentId}</span>
          </p>
        </div>
      )}
    </div>
  );
};
export default Booking;