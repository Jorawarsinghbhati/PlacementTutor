// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { apiConnector } from "../../Service/apiConnector";
// import { authEndpoints } from "../../Service/apis";

// const Otp = () => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const email = state?.email;

//   const verifyOtp = async () => {
//     if (!email) {
//       navigate("/", { replace: true });
//       return;
//     }

//     try {
//       setLoading(true);

//       // 🔹 Verify OTP
//       const res = await apiConnector("POST", authEndpoints.VERIFY_OTP, {
//         email,
//         otp,
//       });

//       const token = res.data.token;
//       localStorage.setItem("token", token);

//       // 🔹 Fetch user info
//       const meRes = await apiConnector("GET", authEndpoints.ME);
//       const user = meRes.data.user;

//       // 🔹 Store role
//       localStorage.setItem("role", user.role);

//       const role = user.role?.trim().toUpperCase();

//       // 🛡 ADMIN
//       if (role === "ADMIN") {
//         navigate("/admin", { replace: true });
//         return;
//       }

//       // 🧑‍🏫 APPROVED MENTOR
//       if (role === "MENTOR") {
//         navigate("/mentor/dashboard", { replace: true });
//         return;
//       }
//       if(user.college && user.graduationYear){
//         navigate("/dashboard",{ replace: true });
//         return;
//       }
//       // 👤 NORMAL USER → choose path
//       navigate("/choose-role", { replace: true });

//     } catch (e) {
//       console.error("OTP verification error:", e);
//       alert("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg w-100 shadow-lg">
//         <h1 className="text-white text-xl font-bold text-center mb-6">
//           Verify OTP
//         </h1>

//         <input
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           placeholder="Enter OTP"
//           className="w-full mb-3 p-2 rounded"
//         />

//         <button
//           onClick={verifyOtp}
//           disabled={loading}
//           className="w-full bg-white py-2 rounded"
//         >
//           {loading ? "Verifying..." : "Verify OTP"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Otp;
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints } from "../../Service/apis";
import { 
  Lock, 
  Key, 
  Loader2, 
  CheckCircle, 
  XCircle,
  Shield,
  Sparkles,
  ArrowRight,
  Mail,
  Clock,
  RefreshCw,
  User,
  GraduationCap,
  Briefcase,
  Crown
} from "lucide-react";

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // null, "success", "error"
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";

  // Format time left
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer for OTP expiry
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Initialize refs for each input
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, otp.length);
  }, [otp.length]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow single digit numbers
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all digits are filled
    if (newOtp.every(digit => digit !== "") && index === otp.length - 1) {
      setTimeout(() => {
        handleSubmit();
      }, 300);
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    
    // Move to previous input on left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    
    // Move to next input on right arrow
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length);
    const pasteArray = pasteData.split("");
    
    const newOtp = [...otp];
    pasteArray.forEach((char, index) => {
      if (/^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the last filled input
    const lastFilledIndex = pasteArray.length - 1;
    if (lastFilledIndex < otp.length) {
      otpRefs.current[lastFilledIndex]?.focus();
    }
  };

  const resendOtp = async () => {
    if (!canResend) return;

    try {
      await apiConnector("POST", authEndpoints.SEND_OTP, { email });
      setTimeLeft(300);
      setCanResend(false);
      setOtp(Array(6).fill(""));
      otpRefs.current[0]?.focus();
      
      // Show success message for resend
      document.querySelector('.resend-success')?.classList.remove('opacity-0');
      setTimeout(() => {
        document.querySelector('.resend-success')?.classList.add('opacity-0');
      }, 2000);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join("");
    if (!email || otpString.length !== 6) {
      // Shake animation for invalid OTP
      document.querySelector('.otp-inputs')?.classList.add('animate-shake');
      setTimeout(() => {
        document.querySelector('.otp-inputs')?.classList.remove('animate-shake');
      }, 500);
      return;
    }

    if (!email) {
      navigate("/", { replace: true });
      return;
    }

    try {
      setLoading(true);
      setVerifying(true);

      // 🔹 Verify OTP
      const res = await apiConnector("POST", authEndpoints.VERIFY_OTP, {
        email,
        otp: otpString,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      // Show success animation
      setVerificationStatus("success");
      
      // 🔹 Fetch user info
      const meRes = await apiConnector("GET", authEndpoints.ME);
      const user = meRes.data.user;

      // 🔹 Store role
      localStorage.setItem("role", user.role);

      const role = user.role?.trim().toUpperCase();

      // Role-based navigation after animation
      setTimeout(() => {
        // 🛡 ADMIN
        if (role === "ADMIN") {
          navigate("/admin", { replace: true });
          return;
        }

        // 🧑‍🏫 APPROVED MENTOR
        if (role === "MENTOR") {
          navigate("/mentor/dashboard", { replace: true });
          return;
        }
        
        if (user.college && user.graduationYear) {
          navigate("/dashboard", { replace: true });
          return;
        }
        
        // 👤 NORMAL USER → choose path
        navigate("/choose-role", { replace: true });
      }, 1500);

    } catch (e) {
      console.error("OTP verification error:", e);
      setVerificationStatus("error");
      
      // Error animation
      document.querySelector('.otp-container')?.classList.add('animate-error-pulse');
      setTimeout(() => {
        document.querySelector('.otp-container')?.classList.remove('animate-error-pulse');
      }, 500);
      
      // Reset after delay
      setTimeout(() => {
        setVerificationStatus(null);
        setVerifying(false);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Animated security icons */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-purple-400/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: '2.5rem',
              animation: `float ${6 + Math.random() * 6}s ease-in-out infinite ${i * 0.5}s`,
            }}
          >
            {i % 4 === 0 ? '🔐' : i % 4 === 1 ? '🔒' : i % 4 === 2 ? '🛡️' : '🔑'}
          </div>
        ))}
        
        {/* Animated OTP digits in background */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(50)].map((_, i) => (
            <span
              key={i}
              className="absolute text-lg font-mono font-bold"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${8 + Math.random() * 8}s ease-in-out infinite ${i * 0.2}s`,
              }}
            >
              {Math.floor(Math.random() * 10)}
            </span>
          ))}
        </div>
      </div>

      {/* Role Transition Overlays */}
      {verificationStatus === "success" && (
        <div className="absolute inset-0 z-50 bg-gradient-to-br from-green-900/90 to-emerald-900/90 flex items-center justify-center animate-fadeIn">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-scaleUp">
              <CheckCircle size={80} className="text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-4 animate-slideUp">
              Verified Successfully!
            </h3>
            <div className="flex items-center justify-center gap-4 mt-6 animate-slideUp delay-300">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <Shield size={32} className="text-white" />
              </div>
              <ArrowRight size={24} className="text-white/50" />
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                {email.includes("admin") ? (
                  <Crown size={32} className="text-yellow-400" />
                ) : email.includes("mentor") ? (
                  <Briefcase size={32} className="text-orange-400" />
                ) : (
                  <User size={32} className="text-purple-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {verificationStatus === "error" && (
        <div className="absolute inset-0 z-50 bg-gradient-to-br from-red-900/90 to-pink-900/90 flex items-center justify-center animate-fadeIn">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center animate-scaleUp">
              <XCircle size={80} className="text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-4 animate-slideUp">
              Invalid OTP
            </h3>
            <p className="text-xl text-white/80 animate-slideUp delay-300">
              Please try again
            </p>
          </div>
        </div>
      )}

      <div className="relative z-30 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-slideDown">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl">
              <Lock className="text-white" size={32} />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-white to-indigo-300 bg-clip-text text-transparent">
                Secure Verification
              </h1>
              <p className="text-gray-400 text-sm">
                Enter the OTP sent to your email
              </p>
            </div>
          </div>
          
          {/* Email Display */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
            <Mail size={16} className="text-purple-400" />
            <span className="text-sm text-gray-300 truncate max-w-xs">
              {email || "No email provided"}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl otp-container">
          {/* OTP Input Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Key size={20} className="text-purple-400" />
                Enter 6-digit OTP
              </h3>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                timeLeft > 60 ? 'bg-green-500/10 text-green-400' : 
                timeLeft > 30 ? 'bg-yellow-500/10 text-yellow-400' : 
                'bg-red-500/10 text-red-400'
              }`}>
                <Clock size={14} />
                <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* OTP Input Boxes */}
            <div className="otp-inputs flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  onKeyPress={handleKeyPress}
                  className={`w-16 h-16 text-3xl font-bold text-center bg-gray-800/80 border-2 rounded-xl text-white transition-all duration-300 focus:outline-none focus:border-purple-500 focus:scale-110 ${
                    verifying ? 'border-purple-500/50' :
                    verificationStatus === "error" ? 'border-red-500' :
                    digit ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  disabled={loading || verifying}
                  autoFocus={index === 0 && !loading}
                />
              ))}
            </div>

            {/* Auto-fill hint */}
            <p className="text-center text-sm text-gray-500 mb-2">
              Paste the OTP to auto-fill all boxes
            </p>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                onClick={resendOtp}
                disabled={!canResend || loading}
                className={`text-sm flex items-center justify-center gap-2 mx-auto ${
                  canResend 
                    ? 'text-purple-400 hover:text-purple-300' 
                    : 'text-gray-600 cursor-not-allowed'
                } transition-colors`}
              >
                <RefreshCw size={14} className={canResend ? 'animate-spin-once' : ''} />
                {canResend ? 'Resend OTP' : 'Resend OTP in ' + formatTime(timeLeft)}
              </button>
              
              <div className="resend-success opacity-0 transition-opacity duration-300 mt-2">
                <p className="text-sm text-green-400 flex items-center justify-center gap-1">
                  <CheckCircle size={14} />
                  New OTP sent to your email
                </p>
              </div>
            </div>
          </div>

          {/* Role Preview */}
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
            <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <Sparkles size={16} />
              Based on your email, you'll be redirected to:
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Crown size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Admin Portal</p>
                    <p className="text-xs text-gray-400">For platform administrators</p>
                  </div>
                </div>
                {email.includes("admin") && (
                  <div className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                    Detected
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Briefcase size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Mentor Dashboard</p>
                    <p className="text-xs text-gray-400">For approved mentors</p>
                  </div>
                </div>
                {email.includes("mentor") && (
                  <div className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs">
                    Detected
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <GraduationCap size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Student Dashboard</p>
                    <p className="text-xs text-gray-400">For learners and students</p>
                  </div>
                </div>
                {!email.includes("admin") && !email.includes("mentor") && (
                  <div className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                    Detected
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || verifying || otp.some(digit => !digit)}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform ${
              !loading && !verifying && otp.every(digit => digit)
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-purple-500/30'
                : 'bg-gray-800 cursor-not-allowed'
            } flex items-center justify-center gap-2`}
          >
            {verifying ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Verifying OTP...
              </>
            ) : loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Verify OTP
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Security Note */}
          <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-start gap-3">
              <Shield size={16} className="text-green-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">Secure Verification</p>
                <p className="text-xs text-gray-400 mt-1">
                  This OTP expires in 5 minutes. Never share your OTP with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Shield size={12} className="text-green-500" />
              <span>End-to-end encrypted</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <Clock size={12} className="text-purple-500" />
              <span>5-minute expiry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(2deg); 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleUp {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes errorPulse {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
          50% { 
            box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.2);
          }
        }
        
        @keyframes spinOnce {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        
        .animate-scaleUp {
          animation: scaleUp 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-error-pulse {
          animation: errorPulse 0.5s ease-in-out;
        }
        
        .animate-spin-once {
          animation: spinOnce 0.5s ease-in-out;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Otp;