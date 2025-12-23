// Pages/Mentor/MentorBookings.jsx
import { useEffect, useState } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { mentorEndpoints } from "../../Service/apis";
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
  DollarSign,
  FileText,
  Video,
  CheckSquare,
  XCircle,
  AlertCircle,
  IndianRupee,
} from "lucide-react";

const MentorBookings = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState({ upcoming: true, completed: true });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
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
  }, []);

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

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
        return <Video className="w-5 h-5 text-blue-600" />;
      case "RESUME_REVIEW":
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <Video className="w-5 h-5 text-gray-600" />;
    }
  };

  // Loading state
  if (loading.upcoming && loading.completed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Error Loading Bookings
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage all your mentoring sessions - upcoming and completed
          </p>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{upcoming.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {upcoming.filter(b => b.status === 'CONFIRMED').length} Confirmed
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{completed.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {completed.reduce((sum, b) => sum + b.amount, 0)} Total Revenue
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{upcoming.length + completed.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {upcoming.filter(b => b.serviceType === 'ONE_TO_ONE').length + completed.filter(b => b.serviceType === 'ONE_TO_ONE').length} 1:1 Sessions
              </p>
            </div>
          </div>
        </div> */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {upcoming.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {upcoming.filter((b) => b.status === "CONFIRMED").length}{" "}
                Confirmed
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completed.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {completed.reduce((sum, b) => sum + b.amount, 0)} Total Revenue
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {upcoming.length + completed.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {upcoming.filter((b) => b.serviceType === "ONE_TO_ONE").length +
                  completed.filter((b) => b.serviceType === "ONE_TO_ONE")
                    .length}{" "}
                1:1 Sessions
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviews Received</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completed.filter((b) => b.review && b.review.rating).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
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
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "upcoming"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Upcoming Sessions
                  {upcoming.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {upcoming.length}
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "completed"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Completed Sessions
                  {completed.length > 0 && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {completed.length}
                    </span>
                  )}
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "upcoming" ? (
          <div>
            {loading.upcoming ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  Loading upcoming sessions...
                </p>
              </div>
            ) : upcoming.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  No Upcoming Sessions
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  You don't have any upcoming mentoring sessions scheduled.
                  Create availability slots to start receiving bookings.
                </p>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg">
                  Create Availability Slots
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcoming.map((booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    type="upcoming"
                    formatDate={formatDate}
                    formatTime={formatTime}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    getServiceIcon={getServiceIcon}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {loading.completed ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  Loading completed sessions...
                </p>
              </div>
            ) : completed.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckSquare className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  No Completed Sessions
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  You haven't completed any mentoring sessions yet. Completed
                  sessions will appear here.
                </p>
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
                >
                  View Upcoming Sessions
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {completed.map((booking) => (
                  <CompletedBookingCard
                    key={booking._id}
                    booking={booking}
                    formatDate={formatDate}
                    formatTime={formatTime}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    getServiceIcon={getServiceIcon}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Component for Upcoming Booking Card
const BookingCard = ({
  booking,
  type,
  formatDate,
  formatTime,
  getStatusColor,
  getStatusIcon,
  getServiceIcon,
}) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    {/* Card Header */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${getStatusColor(
                booking.status
              )}`}
            >
              {getStatusIcon(booking.status)}
              {booking.status}
            </span>
            <div className="flex items-center gap-1.5 text-blue-200">
              {getServiceIcon(booking.serviceType)}
              <span className="text-sm">
                {booking.serviceType === "ONE_TO_ONE"
                  ? "1:1 Session"
                  : "Resume Review"}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">
            {booking.user?.name || booking.user?.username}
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white flex items-center gap-1">
            <IndianRupee className="w-6 h-6" />
            {booking.amount}
          </div>
          <div className="text-blue-200 text-sm mt-1">Session Fee</div>
        </div>
      </div>
    </div>

    {/* Card Body */}
    <div className="p-6">
      {/* Student Info */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {booking.user?.username}
            </h4>
            <p className="text-sm text-gray-600">{booking.user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {booking.user?.college}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {booking.user?.phone || "N/A"}
            </span>
          </div>
          {booking.user?.graduationYear && (
            <div className="col-span-2 text-sm text-gray-600">
              Graduating in {booking.user?.graduationYear}
            </div>
          )}
        </div>
      </div>

      {/* Session Details */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Session Details
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-800">Date</span>
            </div>
            <p className="text-gray-700 font-medium">
              {formatDate(booking.slot?.date)}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-800">Time</span>
            </div>
            <p className="text-gray-700 font-medium">
              {formatTime(booking.slot?.startTime)} -{" "}
              {formatTime(booking.slot?.endTime)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {type === "upcoming" && (
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2">
            <Video className="w-4 h-4" />
            Join Session
          </button>
          <button className="px-4 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
            Reschedule
          </button>
          <button className="px-4 py-3 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition font-medium">
            Cancel
          </button>
        </div>
      )}
    </div>

    {/* Card Footer */}
    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          Booked on:{" "}
          {new Date(booking.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
            ID: {booking._id.slice(-6)}
          </span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
);

// Component for Completed Booking Card (List View)
// const CompletedBookingCard = ({ booking, formatDate, formatTime, getStatusColor, getStatusIcon, getServiceIcon }) => (
//   <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//     <div className="p-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         {/* Left Section */}
//         <div className="flex-1">
//           <div className="flex items-center gap-3 mb-3">
//             {getServiceIcon(booking.serviceType)}
//             <h3 className="text-lg font-semibold text-gray-900">
//               {booking.serviceType === 'ONE_TO_ONE' ? '1:1 Mentoring Session' : 'Resume Review'}
//             </h3>
//             <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${getStatusColor('COMPLETED')}`}>
//               {getStatusIcon('COMPLETED')}
//               COMPLETED
//             </span>
//           </div>

//           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
//             <div className="flex items-center gap-1.5">
//               <User className="w-4 h-4" />
//               <span className="font-medium">{booking.user?.name || booking.user?.username}</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <Calendar className="w-4 h-4" />
//               <span>{formatDate(booking.slot?.date)}</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <Clock className="w-4 h-4" />
//               <span>{formatTime(booking.slot?.startTime)}</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <GraduationCap className="w-4 h-4" />
//               <span>{booking.user?.college}</span>
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-6">
//           <div className="text-right">
//             <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
//               <IndianRupee className="w-5 h-5" />
//               {booking.amount}
//             </div>
//             <div className="text-sm text-gray-600">Amount Paid</div>
//           </div>

//           <div className="text-right">
//             <div className="text-sm font-medium text-gray-900">
//               {new Date(booking.createdAt).toLocaleDateString('en-US', {
//                 month: 'short',
//                 day: 'numeric'
//               })}
//             </div>
//             <div className="text-xs text-gray-600">Booked Date</div>
//           </div>

//           <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-sm">
//             View Details
//           </button>
//         </div>
//       </div>

//       {/* Payment Info (Collapsible) */}
//       <div className="mt-4 pt-4 border-t border-gray-100">
//         <div className="flex items-center justify-between text-sm">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-1.5">
//               <CreditCard className="w-4 h-4 text-gray-500" />
//               <span className="text-gray-600">Payment ID:</span>
//               <span className="font-mono text-gray-900">{booking.paymentId}</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <span className="text-gray-600">Provider:</span>
//               <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
//                 {booking.paymentProvider}
//               </span>
//             </div>
//           </div>
//           <div className="text-sm text-gray-500">
//             Completed on: {new Date(booking.updatedAt).toLocaleDateString('en-US', {
//               month: 'short',
//               day: 'numeric',
//               year: 'numeric'
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// Component for Completed Booking Card (List View)
const CompletedBookingCard = ({
  booking,
  formatDate,
  formatTime,
  getStatusColor,
  getStatusIcon,
  getServiceIcon,
}) => {
  const hasReview = booking.review && booking.review.rating;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              {getServiceIcon(booking.serviceType)}
              <h3 className="text-lg font-semibold text-gray-900">
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

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span className="font-medium">
                  {booking.user?.name || booking.user?.username}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(booking.slot?.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{formatTime(booking.slot?.startTime)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>{booking.user?.college}</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                <IndianRupee className="w-5 h-5" />
                {booking.amount}
              </div>
              <div className="text-sm text-gray-600">Amount Paid</div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {new Date(booking.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="text-xs text-gray-600">Booked Date</div>
            </div>

            <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-sm">
              View Details
            </button>
          </div>
        </div>

        {/* Review Section */}
        {hasReview && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Student Review
                </h4>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= booking.review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 fill-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-medium text-gray-700">
                    {booking.review.rating}/5
                  </span>
                </div>

                {/* Review Comment */}
                {booking.review.comment && (
                  <div className="mt-2">
                    <p className="text-gray-700 italic">
                      "{booking.review.comment}"
                    </p>
                  </div>
                )}

                {/* Review Date */}
                <div className="mt-3 text-sm text-gray-500">
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
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-gray-600">
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
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-mono text-gray-900">
                  {booking.paymentId}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-600">Provider:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {booking.paymentProvider}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
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
};
export default MentorBookings;
