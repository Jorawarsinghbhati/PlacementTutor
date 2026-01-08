import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import AppNavbar from "./Components/Navbar.jsx";

const { Content } = Layout;

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      {/* 🔹 GLOBAL NAVBAR */}
      <AppNavbar />

      {/* 🔹 PAGE CONTENT */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;