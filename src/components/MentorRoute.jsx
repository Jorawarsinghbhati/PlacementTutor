import { Navigate } from "react-router-dom";

const MentorRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;
  if (role !== "MENTOR") return <Navigate to="/dashboard" replace />;

  return children;
};

export default MentorRoute;
