// import { useNavigate } from "react-router-dom";

// const ChooseRole = () => {
//   const navigate = useNavigate();

//   const chooseUser = () => {
//     navigate("/set-username");
//   };

//   const chooseMentor = () => {
//     navigate("/mentor/apply");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//       <div className="bg-gray-800 p-8 rounded-lg w-100 text-center">
//         <h2 className="text-2xl font-bold mb-6">
//           How do you want to continue?
//         </h2>

//         <button
//           onClick={chooseUser}
//           className="w-full bg-white text-black py-3 rounded mb-4 font-semibold"
//         >
//           Continue as User
//         </button>

//         <button
//           onClick={chooseMentor}
//           className="w-full bg-[#c97b4a] text-black py-3 rounded font-semibold"
//         >
//           Apply as Mentor
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChooseRole;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Briefcase, 
  ChevronRight, 
  Sparkles, 
  Target, 
  Rocket,
  Users,
  Star
} from "lucide-react";

const ChooseRole = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const chooseUser = () => {
    setSelectedRole("user");
    setTimeout(() => {
      navigate("/set-username");
    }, 800);
  };

  const chooseMentor = () => {
    setSelectedRole("mentor");
    setTimeout(() => {
      navigate("/mentor/apply");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Glowing orbs */}
        <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                             linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      {/* Selection Animation Overlay */}
      {selectedRole && (
        <div className={`absolute inset-0 z-40 flex items-center justify-center ${
          selectedRole === "user" 
            ? "bg-gradient-to-br from-purple-900/90 to-indigo-900/90" 
            : "bg-gradient-to-br from-orange-900/90 to-amber-900/90"
        } transition-all duration-800 ease-in-out`}>
          <div className="text-center animate-fadeIn">
            <div className="mb-8 animate-bounce">
              {selectedRole === "user" ? (
                <Users size={80} className="text-white mx-auto" />
              ) : (
                <Star size={80} className="text-white mx-auto" />
              )}
            </div>
            <h3 className="text-4xl font-bold text-white mb-4 animate-slideUp">
              {selectedRole === "user" ? "Welcome, Learner!" : "Welcome, Mentor!"}
            </h3>
            <p className="text-xl text-white/80 animate-slideUp delay-300">
              {selectedRole === "user" 
                ? "Starting your journey..." 
                : "Elevating careers..."}
            </p>
          </div>
        </div>
      )}

      <div className="relative z-30 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl">
              <Sparkles className="text-white" size={28} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-white to-indigo-300 bg-clip-text text-transparent">
              PlacementTutor
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose your path to career excellence. Whether you're learning or leading, 
            we're here to support your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* User Card */}
          <div 
            className={`relative p-8 rounded-3xl border-2 transition-all duration-500 ease-out transform ${
              hoveredRole === "user" 
                ? "scale-105 border-purple-500 bg-gradient-to-br from-purple-900/40 to-gray-900 shadow-2xl shadow-purple-500/20" 
                : "border-gray-700 bg-gray-900/50 hover:border-purple-400"
            } ${selectedRole ? "opacity-50 pointer-events-none" : "hover:scale-102"}`}
            onMouseEnter={() => setHoveredRole("user")}
            onMouseLeave={() => setHoveredRole(null)}
            onClick={chooseUser}
          >
            {/* Card Background Glow */}
            {hoveredRole === "user" && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl blur-xl"></div>
            )}
            
            {/* Card Content */}
            <div className="relative z-10">
              <div className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 ${
                hoveredRole === "user" 
                  ? "bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30" 
                  : "bg-gray-800"
              }`}>
                <User size={32} className={`transition-colors duration-300 ${
                  hoveredRole === "user" ? "text-white" : "text-purple-400"
                }`} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                Continue as User
                {hoveredRole === "user" && (
                  <ChevronRight className="text-purple-400 animate-pulse" size={20} />
                )}
              </h3>
              
              <p className="text-gray-400 mb-6">
                Join as a learner to access personalized mentorship, 
                career guidance, and skill development programs.
              </p>
              
              {/* Features List */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  Personalized career guidance
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  Access to expert mentors
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  Skill development programs
                </li>
              </ul>
              
              {/* Action Button */}
              <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform ${
                hoveredRole === "user" 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50" 
                  : "bg-gray-800 hover:bg-gray-700"
              } hover:scale-105 active:scale-95 flex items-center justify-center gap-2`}>
                Get Started
                <Rocket size={18} />
              </button>
            </div>
            
            {/* Decorative corner */}
            <div className={`absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 rounded-tr-3xl transition-colors duration-300 ${
              hoveredRole === "user" ? "border-purple-500" : "border-gray-700"
            }`}></div>
          </div>

          {/* Mentor Card */}
          <div 
            className={`relative p-8 rounded-3xl border-2 transition-all duration-500 ease-out transform ${
              hoveredRole === "mentor" 
                ? "scale-105 border-orange-500 bg-gradient-to-br from-orange-900/40 to-gray-900 shadow-2xl shadow-orange-500/20" 
                : "border-gray-700 bg-gray-900/50 hover:border-orange-400"
            } ${selectedRole ? "opacity-50 pointer-events-none" : "hover:scale-102"}`}
            onMouseEnter={() => setHoveredRole("mentor")}
            onMouseLeave={() => setHoveredRole(null)}
            onClick={chooseMentor}
          >
            {/* Card Background Glow */}
            {hoveredRole === "mentor" && (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl blur-xl"></div>
            )}
            
            {/* Card Content */}
            <div className="relative z-10">
              <div className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 ${
                hoveredRole === "mentor" 
                  ? "bg-gradient-to-br from-orange-600 to-amber-600 shadow-lg shadow-orange-500/30" 
                  : "bg-gray-800"
              }`}>
                <Briefcase size={32} className={`transition-colors duration-300 ${
                  hoveredRole === "mentor" ? "text-white" : "text-orange-400"
                }`} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                Apply as Mentor
                {hoveredRole === "mentor" && (
                  <ChevronRight className="text-orange-400 animate-pulse" size={20} />
                )}
              </h3>
              
              <p className="text-gray-400 mb-6">
                Share your expertise, guide aspiring professionals, 
                and make a lasting impact on careers while earning.
              </p>
              
              {/* Features List */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Share your industry expertise
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Flexible mentoring schedule
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Earn while making impact
                </li>
              </ul>
              
              {/* Action Button */}
              <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform ${
                hoveredRole === "mentor" 
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50" 
                  : "bg-gray-800 hover:bg-gray-700"
              } hover:scale-105 active:scale-95 flex items-center justify-center gap-2`}>
                Start Application
                <Target size={18} />
              </button>
            </div>
            
            {/* Decorative corner */}
            <div className={`absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 rounded-tr-3xl transition-colors duration-300 ${
              hoveredRole === "mentor" ? "border-orange-500" : "border-gray-700"
            }`}></div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 animate-fadeIn delay-300">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/login")} 
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Sign in here
            </button>
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span>Secure platform</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-300"></div>
              <span>24/7 Support</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-500"></div>
              <span>Trusted community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add these CSS animations to your global styles or component style tag */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .hover-scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default ChooseRole;