// import React, { useState } from "react";
// import { apiConnector } from "../../Service/apiConnector";
// import { authEndpoints } from "../../Service/apis";
// import { useNavigate } from "react-router-dom";

// const Graduation = () => {
//   const [name, setName] = useState("");
//   const [college, setCollege] = useState("");
//   const [graduationYear, setGraduationYear] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       await apiConnector(
//         "POST",
//         authEndpoints.SET_GRADUATION,
//         {
//           name,
//           college,
//           graduationYear,
//           phone,
//         }
//       );

//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black">
//       <div className="w-105 bg-[#0e0e0e] p-8 rounded-xl shadow-lg">
//         <h2 className="text-white text-2xl font-semibold mb-6">
//           Graduation Information
//         </h2>

//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter your full name"
//           className="w-full p-3 mb-3 rounded bg-[#1a1a1a] text-white outline-none"
//         />

//         <input
//           value={college}
//           onChange={(e) => setCollege(e.target.value)}
//           placeholder="Enter your college / university"
//           className="w-full p-3 mb-3 rounded bg-[#1a1a1a] text-white outline-none"
//         />

//         <select
//           value={graduationYear}
//           onChange={(e) => setGraduationYear(e.target.value)}
//           className="w-full p-3 mb-3 rounded bg-[#1a1a1a] text-white outline-none"
//         >
//           <option value="">Choose graduation year</option>
//           {[2023, 2024, 2025, 2026, 2027, 2028].map((y) => (
//             <option key={y} value={y}>{y}</option>
//           ))}
//         </select>

//         <input
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           placeholder="Phone number (optional)"
//           className="w-full p-3 mb-6 rounded bg-[#1a1a1a] text-white outline-none"
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-[#c97b4a] text-black py-3 rounded font-semibold"
//         >
//           {loading ? "Saving..." : "Continue"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Graduation;
import React, { useState, useEffect, useRef } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints } from "../../Service/apis";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  GraduationCap, 
  User, 
  School, 
  Calendar, 
  Phone, 
  ArrowRight, 
  Loader2,
  Sparkles,
  CheckCircle,
  Award,
  BookOpen,
  Target,
  ChevronDown
} from "lucide-react";

const Graduation = () => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  // Get username from location state
  const username = location.state?.username || "";

  // Generate graduation years from current year to next 6 years
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from(
    { length: 7 }, 
    (_, i) => currentYear + i
  );

  // Validate form
  useEffect(() => {
    const valid = name.trim() && college.trim() && graduationYear;
    setIsValid(valid);
  }, [name, college, graduationYear]);

  // Animate steps
  useEffect(() => {
    if (name) setCurrentStep(2);
    if (college) setCurrentStep(3);
    if (graduationYear) setCurrentStep(4);
    if (phone) setCurrentStep(5);
  }, [name, college, graduationYear, phone]);

  const handleSubmit = async () => {
    if (!isValid) {
      // Shake animation for invalid form
      formRef.current.classList.add('animate-shake');
      setTimeout(() => {
        formRef.current.classList.remove('animate-shake');
      }, 500);
      return;
    }

    try {
      setLoading(true);
      
      await apiConnector(
        "POST",
        authEndpoints.SET_GRADUATION,
        { name, college, graduationYear, phone }
      );

      // Show success animation
      setShowSuccess(true);
      
      // Navigate after animation
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      
    } catch (err) {
      console.error(err);
      
      // Error animation
      document.querySelector('.error-pulse')?.classList.add('animate-pulse-once');
      setTimeout(() => {
        document.querySelector('.error-pulse')?.classList.remove('animate-pulse-once');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isValid) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Animated graduation caps */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-400/10"
            style={{
              left: `${10 + i * 10}%`,
              top: `${Math.random() * 100}%`,
              fontSize: '3rem',
              animation: `float ${8 + Math.random() * 8}s ease-in-out infinite ${i * 0.5}s`,
            }}
          >
            <GraduationCap size={40} />
          </div>
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                             linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 bg-gradient-to-br from-green-900/90 to-emerald-900/90 flex items-center justify-center animate-fadeIn">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-scaleUp">
              <CheckCircle size={80} className="text-white" />
            </div>
            <h3 className="text-5xl font-bold text-white mb-4 animate-slideUp">
              Profile Complete!
            </h3>
            <p className="text-xl text-white/80 animate-slideUp delay-300">
              Welcome to your dashboard, {name.split(' ')[0]}!
            </p>
          </div>
        </div>
      )}

      <div className="relative z-30 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10 animate-slideDown">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-2xl">
              <GraduationCap className="text-white" size={36} />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-white to-cyan-300 bg-clip-text text-transparent">
                Academic Profile
              </h1>
              <p className="text-gray-400 text-sm">
                {username && `@${username} • `}Complete your academic details
              </p>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-sm text-gray-300">
              This helps us personalize your learning journey
            </span>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-md mx-auto mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30' 
                    : 'bg-gray-800 border border-gray-700'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle size={16} className="text-white" />
                  ) : (
                    <span className={`text-sm font-semibold ${
                      currentStep >= step ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                  )}
                </div>
                <span className={`text-xs ${currentStep >= step ? 'text-blue-400' : 'text-gray-600'}`}>
                  {step === 1 ? 'Name' : step === 2 ? 'College' : step === 3 ? 'Year' : step === 4 ? 'Phone' : 'Submit'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div 
          ref={formRef}
          className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl error-pulse"
        >
          <div className="space-y-6">
            {/* Name Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <User size={16} className="text-blue-400" />
                Full Name
                {name && (
                  <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle size={12} />
                    Valid
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User size={20} className="text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  disabled={loading}
                />
              </div>
            </div>

            {/* College Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <School size={16} className="text-purple-400" />
                College / University
                {college && (
                  <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle size={12} />
                    Valid
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <School size={20} className="text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your college or university name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Graduation Year Dropdown */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Calendar size={16} className="text-cyan-400" />
                Expected Graduation Year
                {graduationYear && (
                  <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle size={12} />
                    Selected
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Calendar size={20} className="text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <ChevronDown size={20} className="text-gray-500" />
                </div>
                <select
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 appearance-none text-lg cursor-pointer"
                  disabled={loading}
                >
                  <option value="" className="bg-gray-800">Choose graduation year</option>
                  {graduationYears.map((year) => (
                    <option 
                      key={year} 
                      value={year}
                      className="bg-gray-800 py-2"
                    >
                      {year} - Class of {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Phone size={16} className="text-green-400" />
                Phone Number (Optional)
                {phone && (
                  <span className="ml-auto text-xs text-blue-400 flex items-center gap-1">
                    <CheckCircle size={12} />
                    Added
                  </span>
                )}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Phone size={20} className="text-gray-500 group-focus-within:text-green-400 transition-colors" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="+91 98765 43210"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-lg"
                  disabled={loading}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                We'll use this for important updates and verification
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <Award size={16} />
                Benefits of completing your profile:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Personalized career recommendations
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  College-specific opportunities
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Alumni network access
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Graduation year cohort updates
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !isValid}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform mt-6 ${
                !loading && isValid
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-blue-500/30'
                  : 'bg-gray-800 cursor-not-allowed'
              } flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating Your Profile...
                </>
              ) : (
                <>
                  Complete Profile & Continue
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <BookOpen size={12} className="text-blue-500" />
              <span>Academic tracking</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <Target size={12} className="text-green-500" />
              <span>Career goals</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <Award size={12} className="text-yellow-500" />
              <span>Certification ready</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Your information is secure and will be used to enhance your learning experience
          </p>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-40px) rotate(5deg); 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleUp {
          from {
            transform: scale(0.3);
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
        
        @keyframes pulseOnce {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
          50% { 
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        
        .animate-scaleUp {
          animation: scaleUp 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-pulse-once {
          animation: pulseOnce 0.5s ease-in-out;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Graduation;