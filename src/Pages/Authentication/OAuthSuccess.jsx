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

      // 🔹 Save JWT
      localStorage.setItem("token", token);

      try {
        // 🔹 Fetch logged-in user
        const res = await apiConnector("GET", authEndpoints.ME);
        const user = res.data.user;

        // 🔹 Save role for route guards
        localStorage.setItem("role", user.role);

        const role = user.role?.trim().toUpperCase();

        // 🛡 ADMIN → admin dashboard
        if (role === "ADMIN") {
          navigate("/admin", { replace: true });
          return;
        }

        // 🧑‍🏫 APPROVED MENTOR → mentor dashboard
        if (role === "MENTOR") {
          navigate("/mentor/dashboard", { replace: true });
          return;
        }

        // 👤 NORMAL USER → choose how to continue
        // (User or Mentor path)
        navigate("/choose-role", { replace: true });

      } catch (err) {
        console.error("OAuth redirect error:", err);
        navigate("/", { replace: true });
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      Logging in...
    </div>
  );
};

export default OAuthSuccess;
