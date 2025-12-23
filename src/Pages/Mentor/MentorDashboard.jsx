// // pages/mentor/MentorDashboard.jsx
// import React, { useEffect, useState } from "react";
// import { apiConnector } from "../../Service/apiConnector";
// import { mentorEndpoints } from "../../Service/apis";

// const MentorDashboard = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const res = await apiConnector(
//         "GET",
//         mentorEndpoints.DASHBOARD
//       );
//       setData(res.data);
//     };
//     fetchDashboard();
//   }, []);

//   if (!data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         Loading...
//       </div>
//     );
//   }

//   const { mentor, stats } = data;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-2xl font-bold mb-6">
//         Mentor Dashboard
//       </h1>

//       {/* Stats */}
//       <div className="grid md:grid-cols-3 gap-4 mb-6">
//         <Stat title="Total Sessions" value={stats.totalSessions} />
//         <Stat title="Upcoming Sessions" value={stats.upcomingSessions} />
//         <Stat title="Total Earnings" value={`₹${stats.totalEarnings}`} />
//       </div>

//       {/* Profile */}
//       <div className="bg-gray-800 p-6 rounded">
//         <h2 className="text-xl font-semibold">{mentor.name}</h2>
//         <p className="text-gray-400">
//           {mentor.jobTitle} @ {mentor.currentCompany}
//         </p>
//         <p className="mt-2">
//           ₹{mentor.sessionPrice} / hour
//         </p>
//       </div>
//     </div>
//   );
// };

// const Stat = ({ title, value }) => (
//   <div className="bg-gray-800 p-4 rounded">
//     <p className="text-gray-400 text-sm">{title}</p>
//     <p className="text-2xl font-bold">{value}</p>
//   </div>
// );

// export default MentorDashboard;
