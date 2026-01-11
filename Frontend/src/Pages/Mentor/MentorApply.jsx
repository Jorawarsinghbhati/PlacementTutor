
import React, { useState, useEffect, useRef } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { mentorEndpoints } from "../../Service/apis";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  School, 
  Building, 
  Briefcase, 
  Award, 
  IndianRupee,
  Upload,
  FileText,
  Sparkles,
  ArrowRight,
  Loader2,
  CheckCircle,
  XCircle,
  Target,
  BarChart3,
  Star,
  Shield,
  Globe,
  Zap
} from "lucide-react";

const MentorApply = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    currentCompany: "",
    jobTitle: "",
    yearsOfExperience: "",
    sessionPrice: "",
    expertise: [],
  });

  const [offerLetter, setOfferLetter] = useState(null);
  const [loading, setLoading] = useState(false);

  const expertiseOptions = [
    { value: "DSA", icon: "🧮", color: "from-purple-500 to-indigo-500" },
    { value: "Web Development", icon: "🌐", color: "from-blue-500 to-cyan-500" },
    { value: "Machine Learning", icon: "🤖", color: "from-green-500 to-emerald-500" },
    { value: "System Design", icon: "🏗️", color: "from-orange-500 to-amber-500" },
    { value: "Backend", icon: "⚙️", color: "from-red-500 to-pink-500" },
    { value: "Frontend", icon: "🎨", color: "from-yellow-500 to-orange-500" },
    { value: "Mobile Dev", icon: "📱", color: "from-indigo-500 to-purple-500" },
    { value: "DevOps", icon: "🚀", color: "from-gray-500 to-blue-500" },
    { value: "Data Science", icon: "📊", color: "from-teal-500 to-green-500" },
    { value: "Cloud", icon: "☁️", color: "from-sky-500 to-blue-500" },
  ];

  // Steps configuration
  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Professional", icon: Briefcase },
    { number: 3, title: "Expertise", icon: Award },
    { number: 4, title: "Pricing", icon: IndianRupee },
    { number: 5, title: "Verification", icon: Shield },
  ];

  // Handle input changes with animation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Animate the input field
    e.target.classList.add('animate-pulse-once');
    setTimeout(() => {
      e.target.classList.remove('animate-pulse-once');
    }, 300);
    
    // Update active step based on filled fields
    updateActiveStep();
  };

  const updateActiveStep = () => {
    let step = 1;
    if (formData.name && formData.college) step = 2;
    if (formData.currentCompany && formData.jobTitle && formData.yearsOfExperience) step = 3;
    if (formData.expertise.length > 0) step = 4;
    if (formData.sessionPrice && offerLetter) step = 5;
    setActiveStep(step);
  };

  useEffect(() => {
    updateActiveStep();
  }, [formData, offerLetter]);

  const handleExpertiseChange = (skill) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(skill)
        ? prev.expertise.filter((s) => s !== skill)
        : [...prev.expertise, skill],
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOfferLetter(file);
    
    // Show upload simulation
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Create preview for images
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFilePreview(reader.result);
            };
            reader.readAsDataURL(file);
          } else {
            setFilePreview(null);
          }
          
          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!offerLetter) {
      // Shake animation for error
      document.querySelector('.file-upload-section')?.classList.add('animate-shake');
      setTimeout(() => {
        document.querySelector('.file-upload-section')?.classList.remove('animate-shake');
      }, 500);
      return;
    }

    try {
      setLoading(true);
      
      // Create FormData
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });
      data.append("offerLetter", offerLetter);

      // Simulate API call with animation
      const submitBtn = document.querySelector('.submit-btn');
      submitBtn?.classList.add('submitting');
      
      await apiConnector("POST", mentorEndpoints.APPLY_MENTOR, data);

      // Show success animation
      setShowSuccess(true);
      submitBtn?.classList.remove('submitting');
      
      // Navigate after animation
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    } catch (err) {
      console.error(err);
      
      // Error animation
      formRef.current.classList.add('animate-pulse-once-error');
      setTimeout(() => {
        formRef.current.classList.remove('animate-pulse-once-error');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-900/20 to-gray-900 flex justify-center items-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating icons */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-amber-400/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: '2.5rem',
              animation: `float ${10 + Math.random() * 10}s ease-in-out infinite ${i * 0.5}s`,
            }}
          >
            {i % 3 === 0 ? '👨‍🏫' : i % 3 === 1 ? '💼' : '🎯'}
          </div>
        ))}
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 bg-gradient-to-br from-green-900/90 to-emerald-900/90 flex items-center justify-center animate-fadeIn">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-scaleUp">
              <CheckCircle size={80} className="text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-4 animate-slideUp">
              Application Submitted!
            </h3>
            <p className="text-xl text-white/80 animate-slideUp delay-300">
              Your mentor application is under review
            </p>
            <p className="text-lg text-white/60 mt-2 animate-slideUp delay-500">
              We'll notify you via email
            </p>
          </div>
        </div>
      )}

      <div className="relative z-30 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10 animate-slideDown">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center shadow-2xl">
              <Star className="text-white" size={36} />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-white to-amber-300 bg-clip-text text-transparent">
                Become a Mentor
              </h1>
              <p className="text-gray-400 text-sm">
                Share your knowledge, inspire careers, and earn recognition
              </p>
            </div>
          </div>

          {/* Steps Progress */}
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-8 relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-10 right-10 h-1 bg-gray-800 -z-10">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                style={{ width: `${(activeStep - 1) * 25}%` }}
              ></div>
            </div>
            
            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                    activeStep >= step.number 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30 scale-110' 
                      : 'bg-gray-800 border border-gray-700'
                  }`}>
                    <StepIcon size={20} className={activeStep >= step.number ? 'text-white' : 'text-gray-500'} />
                  </div>
                  <span className={`text-xs font-medium ${activeStep >= step.number ? 'text-orange-400' : 'text-gray-600'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form */}
        <div 
          ref={formRef}
          className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              {/* Personal Info Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User size={20} className="text-orange-400" />
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  <div className="group">
                    <input
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="group">
                    <input
                      name="college"
                      placeholder="College / University"
                      value={formData.college}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-blue-400" />
                  Professional Details
                </h3>
                
                <div className="space-y-4">
                  <div className="group">
                    <input
                      name="currentCompany"
                      placeholder="Current Company"
                      value={formData.currentCompany}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="group">
                    <input
                      name="jobTitle"
                      placeholder="Job Title / Role"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="group">
                    <input
                      name="yearsOfExperience"
                      type="number"
                      placeholder="Years of Experience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Expertise & Verification */}
            <div className="space-y-6">
              {/* Expertise Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Award size={20} className="text-purple-400" />
                  Areas of Expertise
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {expertiseOptions.map((skill) => {
                    const isSelected = formData.expertise.includes(skill.value);
                    return (
                      <button
                        key={skill.value}
                        type="button"
                        onClick={() => handleExpertiseChange(skill.value)}
                        className={`p-3 rounded-xl border transition-all duration-300 transform ${
                          isSelected
                            ? `border-transparent bg-gradient-to-r ${skill.color} text-white shadow-lg scale-105`
                            : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/50 hover:scale-102'
                        } flex flex-col items-center justify-center gap-2`}
                      >
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-sm font-medium">{skill.value}</span>
                        {isSelected && (
                          <CheckCircle size={14} className="text-white mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <IndianRupee size={20} className="text-green-400" />
                  Session Pricing
                </h3>
                
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <IndianRupee size={20} className="text-gray-500" />
                  </div>
                  <input
                    name="sessionPrice"
                    type="number"
                    placeholder="Set your hourly rate"
                    value={formData.sessionPrice}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Recommended range: ₹500 - ₹5000 per hour
                </p>
              </div>

              {/* File Upload Section */}
              <div className="file-upload-section">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-red-400" />
                  Verification Document
                </h3>
                
                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                  offerLetter 
                    ? 'border-green-500/50 bg-green-500/5' 
                    : 'border-gray-700 hover:border-orange-500/50 hover:bg-white/5'
                }`}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="offerLetter"
                  />
                  <label htmlFor="offerLetter" className="cursor-pointer">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                      {isUploading ? (
                        <Loader2 size={24} className="text-orange-400 animate-spin" />
                      ) : offerLetter ? (
                        <CheckCircle size={24} className="text-green-500" />
                      ) : (
                        <Upload size={24} className="text-gray-500" />
                      )}
                    </div>
                    
                    {isUploading ? (
                      <div className="mb-4">
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Uploading... {uploadProgress}%
                        </p>
                      </div>
                    ) : offerLetter ? (
                      <div>
                        <p className="text-green-400 font-medium mb-2">
                          ✓ Document Uploaded
                        </p>
                        <p className="text-sm text-gray-400 truncate">
                          {offerLetter.name}
                        </p>
                        {filePreview && (
                          <div className="mt-4">
                            <img 
                              src={filePreview} 
                              alt="Preview" 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium mb-2">
                          Upload Offer Letter
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                          PDF, JPG, or PNG (Max 5MB)
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                          <Upload size={16} />
                          <span>Choose File</span>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Required for verification. We keep your documents secure.
                </p>
              </div>
            </div>
          </div>

          {/* Mentor Benefits */}
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20">
            <h4 className="text-lg font-semibold text-orange-400 mb-4 flex items-center gap-2">
              <Sparkles size={20} />
              Benefits of Being a Mentor
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Zap size={20} className="text-orange-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-white">Earn Extra Income</h5>
                  <p className="text-sm text-gray-400">Set your own rates and earn while helping others</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Globe size={20} className="text-blue-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-white">Build Your Brand</h5>
                  <p className="text-sm text-gray-400">Establish yourself as an industry expert</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <BarChart3 size={20} className="text-green-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-white">Network Growth</h5>
                  <p className="text-sm text-gray-400">Connect with ambitious professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`submit-btn w-full mt-8 py-4 rounded-xl font-semibold transition-all duration-300 transform ${
              !loading && offerLetter
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-orange-500/30'
                : 'bg-gray-800 cursor-not-allowed'
            } flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                Submit Mentor Application
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Your application will be reviewed within 2-3 business days
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Shield size={12} className="text-green-500" />
              <span>Secure verification</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <Target size={12} className="text-orange-500" />
              <span>Quality mentorship</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <Star size={12} className="text-yellow-500" />
              <span>Premium community</span>
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
            transform: translateY(-30px) rotate(5deg); 
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
            box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
          }
          50% { 
            box-shadow: 0 0 0 4px rgba(255, 165, 0, 0.3);
          }
        }
        
        @keyframes pulseOnceError {
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
          animation: pulseOnce 0.3s ease-in-out;
        }
        
        .animate-pulse-once-error {
          animation: pulseOnceError 0.5s ease-in-out;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .hover-scale-102 {
          transform: scale(1.02);
        }
        
        .submitting {
          background: linear-gradient(to right, #6366f1, #8b5cf6) !important;
          position: relative;
          overflow: hidden;
        }
        
        .submitting::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default MentorApply;