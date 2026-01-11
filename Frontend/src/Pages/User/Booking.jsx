import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../Service/apiConnector";
import { bookingEndpoints, mentorEndpoints } from "../../Service/apis";
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
  Bell,
  Star,
  MessageSquare,
  Send,
  Check,
  X,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

const Booking = () => {
  const navigate = useNavigate();

  const [activeType, setActiveType] = useState("ALL");
  const [activeTab, setActiveTab] = useState("UPCOMING");
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  
  // Reschedule Notification States
  const [showRescheduleNotification, setShowRescheduleNotification] = useState(false);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(""); // "pending", "accepted", "rejected"
  const [pendingReschedules, setPendingReschedules] = useState([]);

  const [stats, setStats] = useState({
    totalUpcoming: 0,
    totalCompleted: 0,
    pendingConfirmations: 0,
    confirmedSessions: 0,
    totalSessions: 0,
    nextSession: null,
    sessionsWithReviews: 0,
  });

  useEffect(() => {
    fetchBookings();
    checkRescheduleNotifications();
  }, []);

  // Check for pending reschedule requests
  const checkRescheduleNotifications = async () => {
    try {
      const res = await apiConnector("GET", bookingEndpoints.MY_BOOKINGS);
      if (res.data.success) {
        const allBookings = [...(res.data.upcoming || []), ...(res.data.completed || [])];
        const pendingRequests = allBookings.filter(
          booking => 
            booking.status === "CONFIRMED" &&
            booking.rescheduleRequest?.status === "PENDING" &&
            booking.rescheduleRequest?.proposedBy === "MENTOR"
        );
        
        setPendingReschedules(pendingRequests);
        
        // If there are pending requests, show notification for the first one
        if (pendingRequests.length > 0 && !showRescheduleNotification) {
          setRescheduleBooking(pendingRequests[0]);
          setNotificationStatus("pending");
          setShowRescheduleNotification(true);
        }
      }
    } catch (error) {
      console.error("Error checking reschedule notifications:", error);
    }
  };

  useEffect(() => {
    console.log("Upcoming bookings:", upcoming);

    // Calculate statistics when bookings change
    const pendingConfirmations = upcoming.filter(
      (b) => b.status === "PENDING"
    ).length;
    const confirmedSessions = upcoming.filter(
      (b) => b.status === "CONFIRMED"
    ).length;
    const totalSessions = upcoming.length + completed.length;
    const sessionsWithReviews = completed.filter(
      (b) => b.review?.rating
    ).length;

    // Find the next upcoming session
    const now = new Date();
    let nextSession = null;

    // Filter and sort upcoming confirmed sessions
    const upcomingSessions = upcoming
      .filter((b) => b.status === "CONFIRMED")
      .filter((b) => {
        // Check if meetingStartTime exists and is a future date
        if (!b.meetingStartTime) return false;

        try {
          const sessionDate = new Date(b.meetingStartTime);
          return sessionDate > now;
        } catch (e) {
          console.warn("Invalid meetingStartTime:", b.meetingStartTime);
          return false;
        }
      })
      .sort((a, b) => {
        try {
          const dateA = new Date(a.meetingStartTime);
          const dateB = new Date(b.meetingStartTime);
          return dateA - dateB;
        } catch (e) {
          return 0;
        }
      });

    console.log("Upcoming sessions:", upcomingSessions);

    // Get the next session (closest future session)
    if (upcomingSessions.length > 0) {
      nextSession = upcomingSessions[0];
    }

    setStats({
      totalUpcoming: upcoming.length,
      totalCompleted: completed.length,
      pendingConfirmations,
      confirmedSessions,
      totalSessions,
      nextSession,
      sessionsWithReviews,
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

  // Handle accept reschedule
  const handleAcceptReschedule = async () => {
    if (!rescheduleBooking?._id) return;
    
    setRescheduleLoading(true);
    try {
      const res = await apiConnector(
        "POST",
        mentorEndpoints.ACCEPT_RESCHEDULE(rescheduleBooking._id)
      );

      if (res.data.success) {
        setNotificationStatus("accepted");
        // Refresh bookings
        fetchBookings();
        checkRescheduleNotifications();
        
        // Close notification after 3 seconds
        setTimeout(() => {
          setShowRescheduleNotification(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error accepting reschedule:", error);
      alert(error.response?.data?.message || "Failed to accept reschedule");
    } finally {
      setRescheduleLoading(false);
    }
  };

  // Handle reject reschedule
  const handleRejectReschedule = async () => {
    if (!rescheduleBooking?._id) return;
    
    if (!window.confirm("Are you sure you want to reject the new time?")) return;
    
    setRescheduleLoading(true);
    try {
      const res = await apiConnector(
        "POST",
        mentorEndpoints.REJECT_RESCHEDULE(rescheduleBooking._id)
      );
      console.log("Reject reschedule response:", res.data);
      if (res.data.success) {
        setNotificationStatus("rejected");
        // Refresh bookings
        fetchBookings();
        checkRescheduleNotifications();
        
        // Close notification after 3 seconds
        setTimeout(() => {
          setShowRescheduleNotification(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error rejecting reschedule:", error);
      alert(error.response?.data?.message || "Failed to reject reschedule");
    } finally {
      setRescheduleLoading(false);
    }
  };

  const submitReview = async (bookingId, rating, comment) => {
    try {
      setSubmittingReview(true);

      // Call the function with bookingId to get the URL
      const res = await apiConnector(
        "POST",
        bookingEndpoints.SUBMIT_REVIEW(bookingId), // Call the function here
        { rating, comment }
      );

      if (res.data.success) {
        // Update the booking in completed list
        setCompleted((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, review: res.data.review }
              : booking
          )
        );

        alert("Review submitted successfully!");
      }
    } catch (error) {
      console.error("Review submission error:", error);
      alert(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const filteredBookings = useMemo(() => {
    let list = activeTab === "UPCOMING" ? upcoming : completed;

    if (activeType !== "ALL") {
      list = list.filter(
        (booking) =>
          booking.serviceType === activeType ||
          (activeType === "RESUME_REVIEW" &&
            booking.serviceType === "RESUME_REVIEW")
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
    switch (status) {
      case "CONFIRMED":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          label: "Confirmed",
        };
      case "PENDING":
        return {
          icon: PendingIcon,
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          label: "Pending",
        };
      case "CANCELLED":
        return {
          icon: XCircle,
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          label: "Cancelled",
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-500",
          bgColor: "bg-gray-500/10",
          label: status,
        };
    }
  };

  const getServiceTypeConfig = (serviceType) => {
    switch (serviceType) {
      case "ONE_TO_ONE":
        return {
          icon: Video,
          label: "1:1 Call",
          color: "text-purple-500",
          bgColor: "bg-purple-500/10",
        };
      case "RESUME_REVIEW":
        return {
          icon: FileText,
          label: "Resume Review",
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
        };
      default:
        return {
          icon: FileText,
          label: serviceType,
          color: "text-gray-500",
          bgColor: "bg-gray-500/10",
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
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatAmount = (amount) => {
    return `₹${amount}`;
  };

  // Format date for notification display
  const formatNotificationDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Render Reschedule Notification Component
  const RescheduleNotification = () => {
    if (!showRescheduleNotification || !rescheduleBooking) return null;

    const rescheduleRequest = rescheduleBooking.rescheduleRequest;
    const currentSlot = rescheduleBooking.slots?.[0];
    const proposedDate = rescheduleRequest?.proposedDate;
    const proposedStartTime = rescheduleRequest?.proposedStartTime;
    const reason = rescheduleRequest?.reason;

    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-b from-[#111827] to-[#0b1220] w-full max-w-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Notification Header */}
          <div className={`p-6 border-b ${
            notificationStatus === "pending" 
              ? "border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10" 
              : notificationStatus === "accepted"
              ? "border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
              : "border-red-500/30 bg-gradient-to-r from-red-500/10 to-rose-500/10"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  notificationStatus === "pending" 
                    ? "bg-gradient-to-br from-amber-500 to-orange-500" 
                    : notificationStatus === "accepted"
                    ? "bg-gradient-to-br from-green-500 to-emerald-500"
                    : "bg-gradient-to-br from-red-500 to-rose-500"
                }`}>
                  {notificationStatus === "pending" ? (
                    <AlertTriangle size={24} className="text-white" />
                  ) : notificationStatus === "accepted" ? (
                    <Check size={24} className="text-white" />
                  ) : (
                    <X size={24} className="text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {notificationStatus === "pending" ? "Schedule Change Request" :
                     notificationStatus === "accepted" ? "Reschedule Accepted" :
                     "Reschedule Rejected"}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {notificationStatus === "pending" ? "Mentor has proposed a new time" :
                     notificationStatus === "accepted" ? "New time has been confirmed" :
                     "Session remains at original time"}
                  </p>
                </div>
              </div>
              {notificationStatus === "pending" && (
                <button
                  onClick={() => setShowRescheduleNotification(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Notification Body */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Mentor Info */}
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="font-bold">{rescheduleBooking.mentor?.name?.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold">{rescheduleBooking.mentor?.name}</p>
                  <p className="text-sm text-gray-400">{rescheduleBooking.serviceType === "ONE_TO_ONE" ? "1:1 Session" : "Resume Review"}</p>
                </div>
              </div>

              {/* Current Time Slot */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={18} className="text-blue-400" />
                  <h4 className="font-semibold text-gray-300">Current Schedule</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-semibold">
                      {currentSlot?.date ? formatNotificationDate(currentSlot.date) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Time:</span>
                    <span className="font-semibold">
                      {currentSlot?.startTime ? formatTime(currentSlot.startTime) : 'N/A'}
                      {currentSlot?.endTime && ` - ${formatTime(currentSlot.endTime)}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Proposed Time Slot */}
              {notificationStatus === "pending" && (
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <RotateCcw size={18} className="text-amber-400" />
                    <h4 className="font-semibold text-amber-300">Proposed New Time</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-300">Date:</span>
                      <span className="font-semibold">
                        {proposedDate ? formatNotificationDate(proposedDate) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-300">Time:</span>
                      <span className="font-semibold">
                        {proposedStartTime ? formatTime(proposedStartTime) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reason (if provided) */}
              {reason && notificationStatus === "pending" && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={18} className="text-blue-400" />
                    <h4 className="font-semibold text-gray-300">Mentor's Reason</h4>
                  </div>
                  <p className="text-gray-300 text-sm italic">"{reason}"</p>
                </div>
              )}

              {/* Action Buttons (only for pending requests) */}
              {notificationStatus === "pending" && (
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={handleRejectReschedule}
                    disabled={rescheduleLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {rescheduleLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <X size={18} />
                        Reject
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleAcceptReschedule}
                    disabled={rescheduleLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {rescheduleLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Check size={18} />
                        Accept
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Success/Rejected Message */}
              {(notificationStatus === "accepted" || notificationStatus === "rejected") && (
                <div className={`p-4 rounded-xl border ${
                  notificationStatus === "accepted" 
                    ? "bg-green-500/10 border-green-500/20" 
                    : "bg-red-500/10 border-red-500/20"
                }`}>
                  <p className="text-center font-medium">
                    {notificationStatus === "accepted" 
                      ? "✅ Schedule updated successfully!" 
                      : "❌ Request rejected. Session remains unchanged."}
                  </p>
                  <button
                    onClick={() => setShowRescheduleNotification(false)}
                    className="mt-3 w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition"
                  >
                    Continue to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Pending Reschedules Counter */}
          {pendingReschedules.length > 1 && notificationStatus === "pending" && (
            <div className="p-4 border-t border-white/10 bg-black/30">
              <p className="text-center text-sm text-gray-400">
                You have {pendingReschedules.length - 1} more reschedule request{pendingReschedules.length - 1 > 1 ? 's' : ''} pending
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0a0f1a] text-white">
      {/* Reschedule Notification */}
      <RescheduleNotification />
      
      {/* Show notification badge if there are pending reschedules */}
      {pendingReschedules.length > 0 && !showRescheduleNotification && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={() => {
              setRescheduleBooking(pendingReschedules[0]);
              setNotificationStatus("pending");
              setShowRescheduleNotification(true);
            }}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg animate-pulse"
          >
            <AlertTriangle size={18} />
            {pendingReschedules.length} Schedule Change{pendingReschedules.length > 1 ? 's' : ''}
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My Bookings
              </h1>
              <p className="text-gray-400 mt-2">
                Track and manage your scheduled sessions
              </p>
              {pendingReschedules.length > 0 && (
                <p className="text-amber-400 text-sm mt-1 flex items-center gap-1">
                  <AlertTriangle size={14} />
                  You have {pendingReschedules.length} pending schedule change request{pendingReschedules.length > 1 ? 's' : ''}
                </p>
              )}
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
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

            {/* Reviews Given */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Star size={20} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Reviews Given</p>
                  <p className="text-2xl font-bold">
                    {stats.sessionsWithReviews}/{stats.totalCompleted}
                  </p>
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
                    {stats.nextSession ? (
                      <span>
                        {new Date(
                          stats.nextSession.meetingStartTime
                        ).toLocaleString("en-IN", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    ) : (
                      "No upcoming sessions"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-white/5 rounded-xl mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-300">
                Confirmed:{" "}
                <span className="font-bold">{stats.confirmedSessions}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-300">
                Pending:{" "}
                <span className="font-bold">{stats.pendingConfirmations}</span>
              </span>
            </div>
            {pendingReschedules.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-sm text-amber-300">
                  Schedule Changes:{" "}
                  <span className="font-bold">{pendingReschedules.length}</span>
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-300">
                Total Spent:{" "}
                <span className="font-bold">
                  {formatAmount(
                    upcoming.reduce((sum, b) => sum + (b.amount || 0), 0) +
                      completed.reduce((sum, b) => sum + (b.amount || 0), 0)
                  )}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-300">
                Reviews:{" "}
                <span className="font-bold">
                  {stats.sessionsWithReviews}/{stats.totalCompleted}
                </span>
              </span>
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
                    const config = getServiceTypeConfig(
                      type.key === "ALL" ? "" : type.key
                    );
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
                  const serviceConfig = getServiceTypeConfig(
                    booking.serviceType
                  );
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
                      activeTab={activeTab}
                      submitReview={submitReview}
                      submittingReview={submittingReview}
                      // Pass reschedule info to booking card
                      hasPendingReschedule={booking.rescheduleRequest?.status === "PENDING" && booking.rescheduleRequest?.proposedBy === "MENTOR"}
                      onViewReschedule={() => {
                        setRescheduleBooking(booking);
                        setNotificationStatus("pending");
                        setShowRescheduleNotification(true);
                      }}
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
      description:
        activeType !== "ALL"
          ? `You don't have any upcoming ${
              activeType === "ONE_TO_ONE" ? "1:1 calls" : "resume reviews"
            } scheduled.`
          : "Share your profile to get more bookings!",
      action: "Share Profile",
      secondaryAction: "Browse Mentors",
    },
    COMPLETED: {
      title: "No completed sessions",
      description:
        activeType !== "ALL"
          ? `You haven't completed any ${
              activeType === "ONE_TO_ONE" ? "1:1 calls" : "resume reviews"
            } yet.`
          : "Your completed sessions will appear here.",
      action: "View Upcoming",
      secondaryAction: "Book a Session",
    },
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
  formatAmount,
  activeTab,
  submitReview,
  submittingReview,
  hasPendingReschedule,
  onViewReschedule,
}) => {
  const isUpcoming = activeTab === "UPCOMING";
  const isCompleted = activeTab === "COMPLETED";
  const hasReview = booking.review?.rating;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    submitReview(booking._id, rating, comment);
    setShowReviewForm(false);
    setRating(0);
    setComment("");
  };

  return (
    <div className={`group bg-white/5 border rounded-xl p-5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${
      hasPendingReschedule 
        ? "border-amber-500/50 animate-pulse" 
        : "border-white/10 hover:border-indigo-500/30"
    }`}>
      {/* Pending Reschedule Badge */}
      {hasPendingReschedule && (
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20">
            <RotateCcw size={14} className="text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">Schedule Change Requested</span>
          </div>
          <button
            onClick={onViewReschedule}
            className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1"
          >
            View Request
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg ${serviceConfig.bgColor} flex items-center justify-center`}
              >
                <ServiceIcon size={20} className={serviceConfig.color} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{serviceConfig.label}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusConfig.bgColor}`}
                  >
                    <StatusIcon size={12} className={statusConfig.color} />
                    <span className={statusConfig.color}>
                      {statusConfig.label}
                    </span>
                  </div>
                  {booking.paymentId && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-500/10">
                      <CheckCircle size={12} className="text-green-400" />
                      <span className="text-green-400">Paid</span>
                    </div>
                  )}
                  {isCompleted && hasReview && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-yellow-500/10">
                      <Star size={12} className="text-yellow-400" />
                      <span className="text-yellow-400">
                        Reviewed: {booking.review.rating}/5
                      </span>
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
                  <p className="font-medium">
                    {formatDate(booking.slots[0]?.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="font-medium">
                    {booking.slots[0]?.startTime
                      ? formatTime(booking.slots[0].startTime)
                      : ""}{" "}
                    -{" "}
                    {booking.slots[0]?.endTime
                      ? formatTime(booking.slots[0].endTime)
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Mentor Info */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center">
                <Users size={16} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Mentor</p>
                <p className="font-medium">{booking.mentor?.name}</p>
              </div>
            </div>

            {/* Booked Date */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Booked On</p>
                <p className="font-medium">
                  {new Date(booking.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            {booking.paymentProvider && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <CheckCircle size={16} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment</p>
                  <p className="font-medium capitalize">
                    {booking.paymentProvider.toLowerCase()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Review Section - For Completed Sessions */}
          {isCompleted && (
            <div className="mt-4 pt-4 border-t border-white/10">
              {hasReview ? (
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-400" />
                      <span className="font-semibold">Your Review</span>
                    </div>
                    <span className="text-sm text-yellow-400">
                      {new Date(booking.review.reviewedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= booking.review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-300">
                      {booking.review.rating}/5
                    </span>
                  </div>
                  {booking.review.comment && (
                    <p className="text-sm text-gray-300 italic">
                      "{booking.review.comment}"
                    </p>
                  )}
                </div>
              ) : showReviewForm ? (
                <div className="bg-indigo-500/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm">
                      Submit Your Review
                    </h4>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          className={
                            star <= (hoverRating || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-400"
                          }
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-300">
                      {rating}/5
                    </span>
                  </div>

                  {/* Comment */}
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this session (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white mb-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    rows="3"
                  />

                  <button
                    onClick={handleSubmitReview}
                    disabled={submittingReview || rating === 0}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                  >
                    {submittingReview ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Review
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 w-full"
                >
                  <Star size={16} />
                  Rate This Session
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col gap-3">
          {isUpcoming && booking.status === "PENDING" && (
            <div className="space-y-2">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 w-full">
                <CheckCircle size={16} />
                Confirm Payment
              </button>
              <p className="text-xs text-yellow-400 text-center">
                Waiting for confirmation
              </p>
            </div>
          )}
          
          {/* Reschedule Button */}
          {hasPendingReschedule && isUpcoming && (
            <button
              onClick={onViewReschedule}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 w-full"
            >
              <RotateCcw size={16} />
              Review Schedule Change
            </button>
          )}
        </div>
      </div>

      {/* Payment ID (if exists) */}
      {booking.paymentId && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Payment Confirmed:
            <span className="text-gray-300 font-mono text-xs">
              ID: {booking.paymentId}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Booking;


