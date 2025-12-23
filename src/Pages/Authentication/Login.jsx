// import React, { useState } from "react";
// import { apiConnector } from "../../Service/apiConnector";
// import { authEndpoints } from "../../Service/apis";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const sendOtp = async () => {
//     try {
//       setLoading(true);
//       await apiConnector("POST", authEndpoints.SEND_OTP, { email });
//       navigate("/otp", { state: { email } });
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     const res = await apiConnector(
//       "GET",
//       authEndpoints.GOOGLE_OAUTH + "/url"
//     );
//     window.location.href = res.data.url;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg w-[360px] shadow-lg">
//         <h1 className="text-white text-2xl font-bold text-center mb-6">
//           PlacementTutor
//         </h1>

//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter email"
//           className="w-full mb-3 p-2 rounded"
//         />

//         <button
//           onClick={sendOtp}
//           disabled={loading}
//           className="w-full bg-white py-2 rounded"
//         >
//           Send OTP
//         </button>

//         <div className="text-center my-3 text-gray-400">OR</div>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-white py-2 rounded"
//         >
//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints } from "../../Service/apis";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, Sparkles, ArrowRight, Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await apiConnector("POST", authEndpoints.SEND_OTP, { email });
      navigate("/otp", { state: { email } });
    } catch (e) {
      console.error(e);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await apiConnector("GET", authEndpoints.GOOGLE_OAUTH + "/url");
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      setError("Failed to connect with Google");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendOtp();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl w-full max-w-md overflow-hidden border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="p-8 pb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
              PlacementTutor
            </h1>
          </div>
          <p className="text-gray-400 text-center text-sm">
            Unlock your career potential with expert guidance
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8 pt-6">
          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <Mail size={16} />
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <Shield size={14} />
                {error}
              </p>
            )}
          </div>

          {/* Send OTP Button */}
          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mb-4"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending OTP...
              </>
            ) : (
              <>
                Send OTP
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Privacy Policy
              </a>
            </p>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield size={12} />
                  <span>Secure Login</span>
                </div>
                <div className="w-px h-4 bg-gray-700"></div>
                <div className="flex items-center gap-1">
                  <Lock size={12} />
                  <span>Encrypted Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom gradient */}
        <div className="h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600"></div>
      </div>

      {/* Floating particles animation */}
      <div className="absolute bottom-10 text-center w-full">
        <div className="inline-flex items-center gap-2 text-xs text-gray-500">
          <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
          <span>Trusted by 10,000+ students worldwide</span>
          <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;