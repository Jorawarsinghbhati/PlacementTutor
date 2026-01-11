import { Routes, Route } from "react-router-dom";
// metainfo pages 
import  ContactUs from "./Pages/Metainfo/ContactUs";
import PrivacyPolicy from "./Pages/Metainfo/Privacypolicy";
import TermsAndConditions from "./Pages/Metainfo/Termandconditions";
import RefundAndCancellation from "./Pages/Metainfo/Refundandcancellationpolicy";

// Auth
import Login from "./Pages/Authentication/Login";
import OAuthSuccess from "./Pages/Authentication/OAuthSuccess";
import Otp from "./Pages/Authentication/OTP";

// User
import MentorProfile from "./Pages/User/Mentorprofile";
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
import AdminUsersection from "./Pages/Admin/Components/AdminUsersection";
import Overview from "./Pages/Admin/Components/Overview";
import AllBooking from "./Pages/Admin/Components/AllBookings";
import MentorRequest from "./Pages/Admin/Components/MentorRequests";
import AdminGlobalBlock from "./Pages/Admin/Components/Adminglobalblockslot";
import AdminMentorSection from "./Pages/Admin/Components/AdminMentorSection";
import AdminReview from "./Pages/Admin/Components/AdminReview";

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
      
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
      <Route path="/RefundAndCancellation" element={<RefundAndCancellation />} />


      <Route path="/otp" element={<Otp />} />
      
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      <Route
        path="/choose-role"
        element={
          <ProtectedRoute>
            <ChooseRole />
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


      <Route
        path="/mentor/apply"
        element={
          <ProtectedRoute>
            <MentorApply />
          </ProtectedRoute>
        }
      />

      {/* userroutes  bro */}
      <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="Booking" element={<Booking />} />
        <Route path="MentorProfile" element={<MentorProfile />} />
        <Route path="about" element={<About />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>

      

      {/* 🧑‍🏫 MENTOR */}
      
      <Route
        path="/mentor"
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
      <Route  path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      >
        <Route index element={<Overview />} />
         <Route path="users" element={<AdminUsersection />} />
         <Route path="AllBooking" element={<AllBooking/>} />
         <Route path="MentorRequest" element={<MentorRequest/>} />
         <Route path="AdminGlobalBlock" element={<AdminGlobalBlock/>} />
        <Route path="AdminMentors" element={<AdminMentorSection/>} />
        <Route path="review" element={<AdminReview/>} />

      </Route>
      
    </Routes>
  );
}

export default App;
