
import { useEffect, useState, useCallback, memo } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { mentorEndpoints } from "../../Service/apis";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  GraduationCap,
  CreditCard,
  CheckCircle,
  Clock as ClockIcon,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  FileText,
  Video,
  CheckSquare,
  XCircle,
  AlertCircle,
  IndianRupee,
  X,
  Check,
  Loader2,
  Users,
  Star,
  Award,
  Shield,
  ExternalLink,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const MentorBookings = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState({ upcoming: true, completed: true });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [hasAnimated, setHasAnimated] = useState(false);

  const testimonials = [
    {
      name: "Priya Sharma",
      college: "BITS Pilani • Pre-final Year",
      rating: 5,
      review:
        "I was confused about whether to go for product-based or service-based companies. One session cleared all my doubts. Now I feel much more confident about my preparation.",
    },
    {
      name: "Arjun Patel",
      college: "IIT Delhi • Final Year",
      rating: 5,
      review:
        "Best mentorship I have received! Reviewed my projects and suggested improvements that made my portfolio stand out. Forever grateful 😊",
    },
  ];

  // Format date from "2025-12-25" to "Dec 25, 2025"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time from "18:00" to "6:00 PM"
  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Get status badge color - updated for dark theme
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "CANCELLED":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "COMPLETED":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle className="w-4 h-4" />;
      case "PENDING":
        return <ClockIcon className="w-4 h-4" />;
      case "COMPLETED":
        return <CheckSquare className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Get service type icon
  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case "ONE_TO_ONE":
        return <Video className="w-5 h-5 text-blue-400" />;
      case "RESUME_REVIEW":
        return <FileText className="w-5 h-5 text-purple-400" />;
      default:
        return <Video className="w-5 h-5 text-gray-400" />;
    }
  };

  // Initialize animations only once
  useEffect(() => {
    if (hasAnimated) return;

    const loadAllBookings = async () => {
      try {
        setLoading({ upcoming: true, completed: true });
        setError(null);

        // Load upcoming bookings
        const upcomingRes = await apiConnector(
          "GET",
          mentorEndpoints.MENTOR_BOOKINGS_UPCOMING
        );
        setUpcoming(upcomingRes.data?.bookings || []);
        
        // Load completed bookings
        const completedRes = await apiConnector(
          "GET",
          mentorEndpoints.MENTOR_COMPLETED_BOOKING
        );
        setCompleted(completedRes.data?.bookings || []);
      } catch (error) {
        console.log("Error while fetching bookings", error);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading({ upcoming: false, completed: false });
      }
    };

    loadAllBookings();
    setHasAnimated(true);

    const testimonialInterval = setInterval(() => {
      // Optional: Add testimonial rotation logic here
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, [hasAnimated]);

  // Handle refresh after reschedule
  const refreshBookings = async () => {
    try {
      const upcomingRes = await apiConnector(
        "GET",
        mentorEndpoints.MENTOR_BOOKINGS_UPCOMING
      );
      setUpcoming(upcomingRes.data?.bookings || []);
    } catch (error) {
      console.error("Error refreshing bookings:", error);
    }
  };

  // Loading state
  if (loading.upcoming && loading.completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#0b1220] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#0b1220] flex items-center justify-center">
        <div className="text-center p-8 bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-2xl shadow-2xl border border-white/10">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Error Loading Bookings
          </h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/30"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#0b1220] text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3"
          >
            My Bookings Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400"
          >
            Manage all your mentoring sessions - upcoming and completed
          </motion.p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Upcoming Sessions</p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {upcoming.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400">
                {upcoming.filter((b) => b.status === "CONFIRMED").length}{" "}
                Confirmed
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-green-500/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Completed Sessions</p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {completed.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400">
                ₹{completed.reduce((sum, b) => sum + (b.amount || 0), 0)} Total Revenue
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Total Sessions</p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {upcoming.length + completed.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400">
                {upcoming.filter((b) => b.serviceType === "ONE_TO_ONE").length +
                  completed.filter((b) => b.serviceType === "ONE_TO_ONE")
                    .length}{" "}
                1:1 Sessions
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Reviews Received</p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {completed.filter((b) => b.review && b.review.rating).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400">
                {completed.length > 0
                  ? `${Math.round(
                      (completed.filter((b) => b.review && b.review.rating)
                        .length /
                        completed.length) *
                        100
                    )}% review rate`
                  : "No reviews yet"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-white/10">
            <nav className="-mb-px flex space-x-8">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setActiveTab("upcoming")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === "upcoming"
                    ? "border-indigo-500 text-indigo-400"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>Upcoming Sessions</span>
                  {upcoming.length > 0 && (
                    <span className="bg-indigo-500/20 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {upcoming.length}
                    </span>
                  )}
                </div>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setActiveTab("completed")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === "completed"
                    ? "border-indigo-500 text-indigo-400"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-5 h-5" />
                  <span>Completed Sessions</span>
                  {completed.length > 0 && (
                    <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {completed.length}
                    </span>
                  )}
                </div>
              </motion.button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "upcoming" ? (
          <div>
            {loading.upcoming ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">
                  Loading upcoming sessions...
                </p>
              </div>
            ) : upcoming.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl shadow-2xl p-12 text-center border border-white/10"
              >
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No Upcoming Sessions
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  You don't have any upcoming mentoring sessions scheduled.
                  Create availability slots to start receiving bookings.
                </p>
                <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/30">
                  Create Availability Slots
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {upcoming.map((booking, index) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BookingCard
                      booking={booking}
                      type="upcoming"
                      formatDate={formatDate}
                      formatTime={formatTime}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                      getServiceIcon={getServiceIcon}
                      refreshBookings={refreshBookings}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {loading.completed ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">
                  Loading completed sessions...
                </p>
              </div>
            ) : completed.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl shadow-2xl p-12 text-center border border-white/10"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckSquare className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No Completed Sessions
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  You haven't completed any mentoring sessions yet. Completed
                  sessions will appear here.
                </p>
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/30"
                >
                  View Upcoming Sessions
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {completed.map((booking, index) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CompletedBookingCard
                      booking={booking}
                      formatDate={formatDate}
                      formatTime={formatTime}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                      getServiceIcon={getServiceIcon}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Reschedule Modal Component
const RescheduleModal = memo(({ booking, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    reason: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiConnector(
        "POST",
        mentorEndpoints.MENTOR_REQUEST_RESCHEDULE(booking._id),
        formData
      );

      if (response.data.success) {
        onSuccess();
        onClose();
      } else {
        setError(response.data.message || "Failed to request reschedule");
      }
    } catch (err) {
      console.error("Reschedule error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Time slots
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/10"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-b from-[#111827] to-[#0b1220] z-10 flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white">Reschedule Session</h3>
            <p className="text-sm text-gray-400 mt-1">
              Propose a new time for this session
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Current Booking Info */}
          <div className="mb-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400" />
              Current Session Time
            </h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-sm">
                  {new Date(booking.slots[0].date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm">
                  {booking.slots[0].startTime} - {booking.slots[0].endTime}
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Date Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Date
            </label>
            <input
              type="date"
              required
              min={minDate}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {/* Time Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Start Time
            </label>
            <select
              required
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
              <option value="" className="bg-[#111827]">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time} className="bg-[#111827]">
                  {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Reason Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reason for Reschedule (Optional)
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="e.g., Unexpected conflict, Availability change..."
              rows="3"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
            />
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-105"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Send Request
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
});

RescheduleModal.displayName = 'RescheduleModal';

// Component for Upcoming Booking Card
const BookingCard = memo(({
  booking,
  type,
  formatDate,
  formatTime,
  getStatusColor,
  getStatusIcon,
  getServiceIcon,
  refreshBookings,
}) => {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  // Check if reschedule is already requested
  const hasPendingReschedule = booking.rescheduleRequest?.status === "PENDING";
  const rescheduleByMentor = booking.rescheduleRequest?.proposedBy === "MENTOR";
  const rescheduleByUser = booking.rescheduleRequest?.proposedBy === "USER";

  // Handle reschedule request success
  const handleRescheduleSuccess = () => {
    refreshBookings();
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-indigo-500/20 hover:scale-[1.02]">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {getStatusIcon(booking.status)}
                  {booking.status}
                </span>
                {hasPendingReschedule && rescheduleByMentor && (
                  <span className="px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded-full text-sm font-semibold flex items-center gap-1.5 border border-yellow-500/20">
                    <ClockIcon className="w-4 h-4" />
                    Reschedule Pending
                  </span>
                )}
                {hasPendingReschedule && rescheduleByUser && (
                  <span className="px-3 py-1.5 bg-orange-500/10 text-orange-400 rounded-full text-sm font-semibold flex items-center gap-1.5 border border-orange-500/20">
                    <AlertCircle className="w-4 h-4" />
                    User Requested Reschedule
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-indigo-200">
                  {getServiceIcon(booking.serviceType)}
                  <span className="text-sm">
                    {booking.serviceType === "ONE_TO_ONE"
                      ? "1:1 Session"
                      : "Resume Review"}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">
                {booking.user?.name || booking.user?.username || "Anonymous User"}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white flex items-center gap-1">
                <IndianRupee className="w-6 h-6" />
                {booking.amount || 0}
              </div>
              <div className="text-indigo-200 text-sm mt-1">Session Fee</div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Student Info */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  {booking.user?.username || "Anonymous"}
                </h4>
                <p className="text-sm text-gray-400">{booking.user?.email || "No email provided"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">
                  {booking.user?.college || "College not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">
                  {booking.user?.phone || "N/A"}
                </span>
              </div>
              {booking.user?.graduationYear && (
                <div className="col-span-2 text-sm text-gray-400">
                  Graduating in {booking.user?.graduationYear}
                </div>
              )}
            </div>
          </div>

          {/* Session Details */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Session Details
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-500/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <span className="font-medium text-white">Date</span>
                </div>
                <p className="text-gray-300 font-medium">
                  {formatDate(booking.slots?.[0]?.date)}
                </p>
              </div>
              <div className="bg-indigo-500/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <span className="font-medium text-white">Time</span>
                </div>
                <p className="text-gray-300 font-medium">
                  {formatTime(booking.slots?.[0]?.startTime)} -{" "}
                  {formatTime(booking.slots?.[0]?.endTime)}
                </p>
              </div>
            </div>
            
            {/* Show proposed reschedule if pending */}
            {hasPendingReschedule && rescheduleByMentor && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <h5 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  Proposed New Time
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      {new Date(booking.rescheduleRequest.proposedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      {formatTime(booking.rescheduleRequest.proposedStartTime)}
                    </span>
                  </div>
                </div>
                {booking.rescheduleRequest.reason && (
                  <p className="mt-2 text-sm text-yellow-400">
                    <span className="font-medium">Reason: </span>
                    {booking.rescheduleRequest.reason}
                  </p>
                )}
                <p className="mt-2 text-xs text-yellow-400/70">
                  Waiting for user response
                </p>
              </div>
            )}

            {/* Show user reschedule request */}
            {hasPendingReschedule && rescheduleByUser && (
              <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <h5 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  User Requested Reschedule
                </h5>
                {booking.rescheduleRequest.reason && (
                  <p className="mb-3 text-sm text-orange-400">
                    <span className="font-medium">Reason: </span>
                    {booking.rescheduleRequest.reason}
                  </p>
                )}
                <p className="text-xs text-orange-400/70">
                  You need to take action on this request
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {type === "upcoming" && booking.status === "CONFIRMED" && (
            <div className="flex gap-3 pt-6 border-t border-white/10">
              {!hasPendingReschedule ? (
                <button
                  onClick={() => setShowRescheduleModal(true)}
                  className="px-4 py-3 bg-white/5 text-indigo-400 border border-indigo-500/50 rounded-xl hover:bg-indigo-500/10 transition-all duration-300 font-medium hover:scale-105"
                >
                  Reschedule
                </button>
              ) : rescheduleByMentor ? (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <ClockIcon className="w-4 h-4" />
                  Reschedule request sent
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-orange-400">
                  <AlertCircle className="w-4 h-4" />
                  User requested reschedule
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="bg-white/5 px-6 py-3 border-t border-white/10">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div>
              Booked on:{" "}
              {new Date(booking.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-xs bg-white/10 px-2 py-1 rounded">
                ID: {booking._id?.slice(-6)}
              </span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <RescheduleModal
          booking={booking}
          onClose={() => setShowRescheduleModal(false)}
          onSuccess={handleRescheduleSuccess}
        />
      )}
    </>
  );
});

BookingCard.displayName = 'BookingCard';

// Component for Completed Booking Card
const CompletedBookingCard = memo(({
  booking,
  formatDate,
  formatTime,
  getStatusColor,
  getStatusIcon,
  getServiceIcon,
}) => {
  const hasReview = booking.review && booking.review.rating;

  return (
    <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-xl shadow-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-indigo-500/20">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              {getServiceIcon(booking.serviceType)}
              <h3 className="text-lg font-semibold text-white">
                {booking.serviceType === "ONE_TO_ONE"
                  ? "1:1 Mentoring Session"
                  : "Resume Review"}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${getStatusColor(
                  "COMPLETED"
                )}`}
              >
                {getStatusIcon("COMPLETED")}
                COMPLETED
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span className="font-medium text-white">
                  {booking.user?.name || booking.user?.username || "Anonymous"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(booking.slots?.[0]?.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{formatTime(booking.slots?.[0]?.startTime)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>{booking.user?.college || "College not specified"}</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-white flex items-center gap-1">
                <IndianRupee className="w-5 h-5" />
                {booking.amount || 0}
              </div>
              <div className="text-sm text-gray-400">Amount Paid</div>
            </div>
            
            {/* Session Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-gray-300 text-sm">Date</span>
                </div>
                <p className="text-gray-300 font-medium text-sm">
                  {formatDate(booking.slots?.[0]?.date)}
                </p>
              </div>
              <div className="rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-gray-300 text-sm">Time</span>
                </div>
                <p className="text-gray-300 font-medium text-sm">
                  {formatTime(booking.slots?.[0]?.startTime)} -{" "}
                  {formatTime(booking.slots?.[0]?.endTime)}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-white">
                {new Date(booking.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="text-xs text-gray-400">Booked Date</div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        {hasReview && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/20">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Student Review
                </h4>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= booking.review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600 fill-gray-600"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-medium text-white">
                    {booking.review.rating}/5
                  </span>
                </div>

                {/* Review Comment */}
                {booking.review.comment && (
                  <div className="mt-2">
                    <p className="text-gray-300 italic">
                      "{booking.review.comment}"
                    </p>
                  </div>
                )}

                {/* Review Date */}
                <div className="mt-3 text-sm text-gray-400">
                  Reviewed on:{" "}
                  {new Date(booking.review.reviewedAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </div>
              </div>

              {/* Review Badge */}
              <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full text-sm font-semibold">
                Reviewed
              </div>
            </div>
          </div>
        )}

        {/* No Review Section */}
        {!hasReview && (
          <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-400">
                    No review yet from student
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Student hasn't provided feedback for this session
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Info */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">Payment ID:</span>
                <span className="font-mono text-gray-300">
                  {booking.paymentId || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400">Provider:</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium border border-green-500/20">
                  {booking.paymentProvider || "N/A"}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Completed on:{" "}
              {new Date(booking.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CompletedBookingCard.displayName = 'CompletedBookingCard';

export default MentorBookings;