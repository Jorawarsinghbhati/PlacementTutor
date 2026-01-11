import { Outlet } from "react-router-dom";
import AppNavbar from "./Components/AppNavbar";
import { useEffect, useState } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints } from "../../Service/apis";

const AppLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await apiConnector("GET", authEndpoints.ME);
        setUser(res.data.user);
      } catch (err) {
        console.log("User not logged in");
      }
    };
    loadUser();
  }, []);

  if (!user) return null; // or loader

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      {/* 🔹 GLOBAL NAVBAR */}
      <AppNavbar username={user.username} />

      {/* 🔹 PAGE CONTENT */}
      <Outlet />
    </div>
  );
};

export default AppLayout;



