import { Routes, Route } from "react-router-dom";
// Auth
import Login from "./Pages/Authentication/Login";
import OAuthSuccess from "./Pages/Authentication/OAuthSuccess";
import Otp from "./Pages/Authentication/OTP";
// User
import Dashboard from "./Pages/User/dashboard";
import MentorProfile from "./Pages/User/Usermentor/Mentorprofile";
import MentorAvailabilityPage from "./Pages/User/Usermentor/MentorAvailabilityPage";
import Booking from "./Pages/User/Booking";
import AppLayout from "./Pages/User/AppLayout";
import About from "./Pages/User/About";
// Onboarding
import SetUsername from "./Pages/Authentication/SetUsername";
import Graduation from "./Pages/Authentication/Graduation";
// Mentor
import MentorApply from "./Pages/Mentor/MentorApply";
// import MentorDashboard from "./Pages/Mentor/MentorDashboard";
import MentorBookings from "./Pages/Mentor/MentorBookings";
import MentorPayments from "./Pages/Mentor/MentorPayments";
import MentorAbout from "./Pages/Mentor/MentorAbout";
import MentorLayout from "./Pages/Mentor/MentorLayout";
import MentorAvailability from "./Pages/Mentor/MentorAvailability"
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
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/MentorProfile" element={<MentorProfile />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>

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
            <MentorLayout />
          </MentorRoute>
        }
      >
        <Route path="about" element={<MentorAbout />} />
        <Route path="bookings" element={<MentorBookings />} />
        <Route path="availability" element={<MentorAvailability />} />
        <Route path="payments" element={<MentorPayments />} />
      </Route>
      
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
      <Route path="/mentor/:mentorId" element={<MentorAvailabilityPage />} />
    </Routes>
  );
}

export default App;
