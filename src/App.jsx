import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import OAuthSuccess from "./Pages/OAuthSuccess";
import Dashboard from "./Pages/dashboard";
import Otp from "./Pages/OTP";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/otp" element={<Otp />} />
    </Routes>
  );
}

export default App;
