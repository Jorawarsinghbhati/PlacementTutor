import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔴 Case 3: Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 🔴 Case 2: Logged in but not admin
  if (role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Case 1: Admin
  return children;
};

export default AdminRoute;
