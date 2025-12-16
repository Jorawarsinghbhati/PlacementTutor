import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import OAuthSuccess from "./Pages/Authentication/OAuthSuccess";
import Dashboard from "./Pages/dashboard";
import Otp from "./Pages/Authentication/OTP";
import SetUsername from "./Pages/Authentication/SetUsername";
import Graduation from "./Pages/Authentication/Graduation";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminProtectionRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/otp" element={<Otp />} />
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
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
