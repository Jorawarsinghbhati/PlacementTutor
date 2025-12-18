// import { Routes, Route } from "react-router-dom";
// import Login from "./Pages/Authentication/Login";
// import OAuthSuccess from "./Pages/Authentication/OAuthSuccess";
// import Dashboard from "./Pages/dashboard";
// import Otp from "./Pages/Authentication/OTP";
// import SetUsername from "./Pages/Authentication/SetUsername";
// import Graduation from "./Pages/Authentication/Graduation";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminProtectionRoute";
// import AdminDashboard from "./Pages/Admin/AdminDashboard";
// import MentorApply from "./Pages/Mentor/MentorApply";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/oauth-success" element={<OAuthSuccess />} />
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route path="/otp" element={<Otp />} />
//       <Route
//         path="/set-username"
//         element={
//           <ProtectedRoute>
//             <SetUsername />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/graduation"
//         element={
//           <ProtectedRoute>
//             <Graduation />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/admin"
//         element={
//           <AdminRoute>
//             <AdminDashboard />
//           </AdminRoute>
//         }
//       />
//       <Route
//         path="/mentor/apply"
//         element={
//             <MentorApply />
//         }
//       />
//     </Routes>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";

// Auth
import Login from "./Pages/Authentication/Login";
import OAuthSuccess from "./Pages/Authentication/OAuthSuccess";
import Otp from "./Pages/Authentication/OTP";

// User
import Dashboard from "./Pages/dashboard";

// Onboarding
import SetUsername from "./Pages/Authentication/SetUsername";
import Graduation from "./Pages/Authentication/Graduation";

// Mentor
import MentorApply from "./Pages/Mentor/MentorApply";
import MentorDashboard from "./Pages/Mentor/MentorDashboard";

// Admin
import AdminDashboard from "./Pages/Admin/AdminDashboard";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminProtectionRoute";
import MentorRoute from "./components/MentorRoute";

import ChooseRole from "./Pages/Authentication/ChooseRole";

function App() {
  return (
    <Routes>
      {/* 🔐 AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      {/* 👤 USER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 🧩 ONBOARDING */}
      <Route
        path="/set-username"
        element={
          <ProtectedRoute>
            <SetUsername />
          </ProtectedRoute>
        }
      />

      <Route
        path="/graduation"
        element={
          <ProtectedRoute>
            <Graduation />
          </ProtectedRoute>
        }
      />

      {/* 🧑‍🏫 MENTOR */}
      <Route
        path="/mentor/apply"
        element={
          <ProtectedRoute>
            <MentorApply />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mentor/dashboard"
        element={
          <MentorRoute>
            <MentorDashboard />
          </MentorRoute>
        }
      />

      {/* 🛡 ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/choose-role"
        element={
          <ProtectedRoute>
            <ChooseRole />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
