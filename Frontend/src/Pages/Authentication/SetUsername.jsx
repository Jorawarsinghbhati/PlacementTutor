
import React, { useState, useEffect } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints } from "../../Service/apis";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  User, 
  Check, 
  X, 
  Sparkles, 
  ArrowRight, 
  Loader2,
  Lock,
  CheckCircle,
  AlertCircle,
  Star
} from "lucide-react";

const SetUsername = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    chars: false,
    spaces: true,
    available: null
  });
  const [pulse, setPulse] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state for welcome message
  const email = location.state?.email || "";

  // Validate username in real-time
  useEffect(() => {
    if (username.length === 0) {
      setValidation({
        length: false,
        chars: false,
        spaces: true,
        available: null
      });
      return;
    }

    const lengthValid = username.length >= 3 && username.length <= 20;
    const charsValid = /^[a-zA-Z0-9_.]+$/.test(username);
    const noSpaces = !/\s/.test(username);
    
    setValidation(prev => ({
      ...prev,
      length: lengthValid,
      chars: charsValid,
      spaces: noSpaces
    }));

    // Debounced availability check
    if (lengthValid && charsValid && noSpaces && username.length > 2) {
      setIsChecking(true);
      const timer = setTimeout(async () => {
        try {
          // Here you could add an API call to check username availability
          // For now, we'll simulate it
          const isAvailable = Math.random() > 0.3; // Simulating 70% availability
          setValidation(prev => ({ ...prev, available: isAvailable }));
        } catch (error) {
          console.error("Error checking username:", error);
        } finally {
          setIsChecking(false);
        }
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setIsChecking(false);
      setValidation(prev => ({ ...prev, available: null }));
    }
  }, [username]);

  const handleSubmit = async () => {
    if (!validation.length || !validation.chars || !validation.spaces) {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
      return;
    }

    try {
      setLoading(true);
      await apiConnector(
        "POST",
        authEndpoints.SET_USERNAME,
        { username }
      );
      
      // Success animation before navigation
      document.querySelector('.success-overlay')?.classList.remove('hidden');
      setTimeout(() => {
        navigate("/graduation", { state: { username, email } });
      }, 1200);
      
    } catch (err) {
      console.error(err);
      setValidation(prev => ({ ...prev, available: false }));
      
      // Error animation
      document.querySelector('.error-shake')?.classList.add('animate-shake');
      setTimeout(() => {
        document.querySelector('.error-shake')?.classList.remove('animate-shake');
      }, 500);
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
        {/* Floating gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                             linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Success Overlay Animation */}
      <div className="success-overlay hidden absolute inset-0 z-50 bg-gradient-to-br from-green-900/90 to-emerald-900/90 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-scaleUp">
            <Check size={64} className="text-white" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-4">Username Set!</h3>
          <p className="text-xl text-white/80">Welcome to PlacementTutor</p>
        </div>
      </div>

      <div className="relative z-30 w-full max-w-lg">
        {/* Welcome Header */}
        <div className="text-center mb-10 animate-slideDown">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl">
              <User className="text-white" size={28} />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-white to-indigo-300 bg-clip-text text-transparent">
                Welcome {email ? `, ${email.split('@')[0]}` : ''}!
              </h1>
              <p className="text-gray-400 text-sm">Let's create your unique identity</p>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-sm text-gray-300">Choose a username that represents you</span>
          </div>
        </div>

        {/* Main Card */}
        <div className={`bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl ${
          pulse ? 'animate-pulse-once border-red-500/50' : ''
        } ${loading ? 'opacity-80' : ''}`}>
          {/* Input Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <Lock size={16} />
              Choose Your Username
            </label>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <User size={20} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your username"
                className="w-full pl-12 pr-10 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg font-medium"
                disabled={loading}
              />
              
              {username && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  {isChecking ? (
                    <Loader2 size={20} className="text-purple-400 animate-spin" />
                  ) : validation.available === true ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : validation.available === false ? (
                    <X size={20} className="text-red-500" />
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Validation Rules */}
          <div className="mb-8 error-shake">
            <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
              <AlertCircle size={16} />
              Username Requirements
            </h3>
            
            <div className="space-y-3">
              {/* Length requirement */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    validation.length 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-gray-800 border border-gray-700'
                  }`}>
                    {validation.length ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                    )}
                  </div>
                  <span className={`text-sm ${validation.length ? 'text-green-400' : 'text-gray-400'}`}>
                    3–20 characters
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {username.length}/20
                </span>
              </div>

              {/* Character requirement */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    validation.chars 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-gray-800 border border-gray-700'
                  }`}>
                    {validation.chars ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                    )}
                  </div>
                  <span className={`text-sm ${validation.chars ? 'text-green-400' : 'text-gray-400'}`}>
                    Letters, numbers, _ or .
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {validation.chars ? 'Valid' : 'Invalid chars'}
                </span>
              </div>

              {/* Spaces requirement */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    validation.spaces 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-red-500/20 border border-red-500/30'
                  }`}>
                    {validation.spaces ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <X size={12} className="text-red-500" />
                    )}
                  </div>
                  <span className={`text-sm ${validation.spaces ? 'text-green-400' : 'text-red-400'}`}>
                    No spaces allowed
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Required
                </span>
              </div>

              {/* Availability requirement */}
              {validation.available !== null && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      validation.available 
                        ? 'bg-green-500/20 border border-green-500/30' 
                        : 'bg-red-500/20 border border-red-500/30'
                    }`}>
                      {validation.available ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                    </div>
                    <span className={`text-sm ${validation.available ? 'text-green-400' : 'text-red-400'}`}>
                      Username {validation.available ? 'available' : 'already taken'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Real-time check
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !validation.length || !validation.chars || !validation.spaces || validation.available === false}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform ${
              !loading && validation.length && validation.chars && validation.spaces && validation.available !== false
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-orange-500/30'
                : 'bg-gray-800 cursor-not-allowed'
            } flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Setting Username...
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Username Preview */}
          {username && validation.length && validation.chars && validation.spaces && (
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
              <p className="text-sm text-gray-400 mb-2">Preview your profile URL:</p>
              <p className="font-mono text-purple-300 break-all">
                placementtutor.com/@{username.toLowerCase()}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Your username is permanent. Choose wisely!
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Star size={12} className="text-yellow-500" />
              <span>Unique identity</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <Lock size={12} className="text-green-500" />
              <span>Secure & private</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
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
        
        @keyframes pulseOnce {
          0%, 100% { border-color: rgba(255, 255, 255, 0.1); }
          50% { border-color: rgba(239, 68, 68, 0.5); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-scaleUp {
          animation: scaleUp 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-pulse-once {
          animation: pulseOnce 0.5s ease-in-out;
        }
        
        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SetUsername;