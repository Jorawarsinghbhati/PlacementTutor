import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints } from "../../Service/apis";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/", { replace: true });
        return;
      }

      // 🔹 Save token
      localStorage.setItem("token", token);

      try {
        // 🔹 Get user info
        const res = await apiConnector("GET", authEndpoints.ME);
        const user = res.data.user;
        console.log(user.role);
        // 🔹 ADMIN
        if (user.role?.trim().toUpperCase() === "ADMIN") {
          localStorage.setItem("role",user.role);
          navigate("/admin", { replace: true });
          return;
        }

        // 🔹 Onboarding flow
        if (!user.username) {
          navigate("/set-username", { replace: true });
          return;
        }

        if (!user.college) {
          navigate("/graduation", { replace: true });
          return;
        }

        // 🔹 Fully onboarded user
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("OAuth redirect error:", err);
        navigate("/", { replace: true });
      }
    };

    handleRedirect();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      Logging in...
    </div>
  );
};

export default OAuthSuccess;
