// useEffect(() => {
//   const fetchMentorStatus = async () => {
//     try {
//       const res = await apiConnector(
//         "GET",
//         mentorEndpoints.MY_MENTOR_STATUS
//       );
//       setMentorStatus(res.data.status); 
//     } catch (err) {
//       // user never applied as mentor → ignore
//     }
//   };

//   fetchMentorStatus();
// }, []);
 {/* ⏳ Mentor application pending banner */}
//  {mentorStatus === "PENDING" && (
//   <div className="bg-yellow-600/20 border border-yellow-500 p-4 rounded mb-6">
//     <p className="font-semibold text-yellow-400">
//       ⏳ Mentor application under review
//     </p>
//     <p className="text-sm text-gray-300">
//       You’ll be notified once approved
//     </p>
//   </div>
// )}



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiConnector } from "../../Service/apiConnector";
// import { mentorEndpoints, bookingEndpoints } from "../../Service/apis";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const role = localStorage.getItem("role");
//   const [mentorStatus, setMentorStatus] = useState(null);

//   const [upcomingBookings, setUpcomingBookings] = useState([]);
//   const [completedBookings, setCompletedBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

  

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // 🔹 Mentor status
//         const mentorRes = await apiConnector(
//           "GET",
//           mentorEndpoints.MY_MENTOR_STATUS
//         );
//         setMentorStatus(mentorRes.data.status);

//         // 🔹 User bookings
//         const bookingRes = await apiConnector(
//           "GET",
//           bookingEndpoints.MY_BOOKINGS
//         );

//         setUpcomingBookings(bookingRes.data.upcoming || []);
//         setCompletedBookings(bookingRes.data.completed || []);
//       } catch (err) {
//         console.log("Dashboard fetch issue:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/", { replace: true });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         Loading dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* 🔹 Navbar */}
//       <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold">PlacementTutor</h1>

//         <div className="flex gap-3">
//           {role === "MENTOR" && (
//             <button
//               onClick={() => navigate("/mentor/dashboard")}
//               className="bg-indigo-600 px-4 py-1 rounded hover:bg-indigo-700"
//             >
//               Mentor Mode
//             </button>
//           )}

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* 🔹 Main */}
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold mb-6">
//           User Dashboard
//         </h2>

//         {/* ⏳ Mentor pending banner */}
//         {mentorStatus === "PENDING" && (
//           <div className="bg-yellow-600/20 border border-yellow-500 p-4 rounded mb-6">
//             <p className="font-semibold text-yellow-400">
//               ⏳ Mentor application under review
//             </p>
//             <p className="text-sm text-gray-300">
//               You’ll be notified once approved
//             </p>
//           </div>
//         )}

//         {/* ➕ Apply as mentor CTA */}
//         {!mentorStatus && role !== "MENTOR" && (
//           <div className="bg-[#111] p-4 rounded mb-6 flex justify-between items-center">
//             <p>Want to help juniors and earn?</p>
//             <button
//               onClick={() => navigate("/mentor/apply")}
//               className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
//             >
//               Apply as Mentor
//             </button>
//           </div>
//         )}

//         {/* 🔹 Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <Stat title="Upcoming Sessions" value={upcomingBookings.length} />
//           <Stat title="Completed Sessions" value={completedBookings.length} />
//           <Stat title="Total Spent" value="₹—" />
//         </div>

//         {/* 🔹 Find Mentor CTA */}
//         <div className="bg-gray-800 p-6 rounded mb-8 flex justify-between items-center">
//           <div>
//             <h3 className="text-lg font-semibold">
//               Book a 1:1 session
//             </h3>
//             <p className="text-sm text-gray-400">
//               Talk to seniors from top companies
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/Mentorprofile")}
//             className="bg-indigo-600 px-5 py-2 rounded hover:bg-indigo-700"
//           >
//             Find Mentors
//           </button>
//         </div>

//         {/* 🔹 Upcoming Bookings */}
//         <Section title="Upcoming Sessions">
//           {upcomingBookings.length === 0 ? (
//             <Empty text="No upcoming sessions" />
//           ) : (
//             upcomingBookings.map((b) => (
//               <BookingCard key={b._id} booking={b} />
//             ))
//           )}
//         </Section>

//         {/* 🔹 Completed Bookings */}
//         <Section title="Completed Sessions">
//           {completedBookings.length === 0 ? (
//             <Empty text="No completed sessions yet" />
//           ) : (
//             completedBookings.map((b) => (
//               <BookingCard key={b._id} booking={b} completed />
//             ))
//           )}
//         </Section>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// const Stat = ({ title, value }) => (
//   <div className="bg-gray-800 p-4 rounded">
//     <p className="text-gray-400 text-sm">{title}</p>
//     <p className="text-2xl font-bold">{value}</p>
//   </div>
// );

// const Section = ({ title, children }) => (
//   <div className="mb-8">
//     <h3 className="text-lg font-semibold mb-4">{title}</h3>
//     <div className="space-y-3">{children}</div>
//   </div>
// );

// const BookingCard = ({ booking, completed }) => (
//   <div className="bg-gray-800 p-4 rounded flex justify-between items-center">
//     <div>
//       <p className="font-semibold">{booking.mentor?.name}</p>
//       <p className="text-sm text-gray-400">
//         {booking.serviceType} · {booking.slot?.date} ·{" "}
//         {booking.slot?.startTime}
//       </p>
//     </div>

//     {!completed && booking.meetingLink && (
//       <a
//         href={booking.meetingLink}
//         target="_blank"
//         rel="noreferrer"
//         className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
//       >
//         Join
//       </a>
//     )}
//   </div>
// );

// const Empty = ({ text }) => (
//   <p className="text-gray-400 text-sm">{text}</p>
// );
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./Components/AppNavbar";
import EmptyBookingState from "./Components/EmptyBookingState"
import { apiConnector } from "../../Service/apiConnector";
import { bookingEndpoints, authEndpoints } from "../../Service/apis";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const me = await apiConnector("GET", authEndpoints.ME);
      setUser(me.data.user);

      const res = await apiConnector(
        "GET",
        bookingEndpoints.MY_BOOKINGS
      );
      setBookings(res.data.upcoming || []);
    };
    load();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      {/* <AppNavbar username={user.username} /> */}

      <div className="px-16 py-12">
        <h1 className="text-3xl font-bold mb-1">
          Welcome, {user.username}!
        </h1>
        <p className="text-gray-400 mb-10">
          Manage your mentorship sessions
        </p>

        {bookings.length === 0 ? (
          <EmptyBookingState
            onAction={() => navigate("/book-session")}
          />
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white/5 backdrop-blur p-4 rounded-xl flex justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {b.mentor?.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {b.slot?.date} · {b.slot?.startTime}
                  </p>
                </div>

                {b.meetingLink && (
                  <a
                    href={b.meetingLink}
                    target="_blank"
                    className="bg-indigo-600 px-4 py-1 rounded"
                  >
                    Join
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

