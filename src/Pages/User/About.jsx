import { useState, useEffect } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { userEndpoints } from "../../Service/apis";
import { Edit2, Phone, Calendar, GraduationCap, Building, User as UserIcon, Mail, Shield, UserCircle } from "lucide-react";

const About = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    college: "",
    graduationYear: "",
    phone: "",
    createdAt: "",
    role: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Individual field editing states
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await apiConnector("GET", userEndpoints.GET_PROFILE);
      console.log("Fetched user data:", res.data);
      if (res.data.success) {
        setUserData(res.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    
    // Format like: 1:53PM, 17th Dec 2025
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    // Add ordinal suffix to day
    const getOrdinalSuffix = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${formattedHours}:${formattedMinutes}${ampm}, ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  const startEditing = (field, value) => {
    setEditingField(field);
    setTempValue(value || "");
    setError("");
  };

  const cancelEditing = () => {
    setEditingField(null);
    setTempValue("");
    setError("");
  };

  const handleFieldChange = (e) => {
    const value = e.target.value;
    setTempValue(value);
    
    // Validation for specific fields
    if (editingField === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      const numericValue = value.replace(/\D/g, '');
      if (!phoneRegex.test(numericValue)) {
        setError("Please enter a valid 10-digit phone number");
      } else {
        setError("");
      }
    } else if (editingField === "username") {
      const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
      if (!usernameRegex.test(value)) {
        setError("Username must be 3-20 characters (letters, numbers, ., _)");
      } else {
        setError("");
      }
    } else if (editingField === "graduationYear") {
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear + 5) {
        setError("Please enter a valid graduation year");
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  };

  const saveField = async () => {
    if (error) return;
    
    try {
      setSaving(true);
      
      const updateData = { [editingField]: tempValue };
      console.log("Updating field:", updateData);
      await apiConnector("PATCH", userEndpoints.UPDATE_PROFILE, updateData);
      
      setUserData(prev => ({
        ...prev,
        [editingField]: tempValue
      }));
      
      cancelEditing();
      
    } catch (error) {
      console.error("Failed to update field:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to update. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const InputField = ({ icon: Icon, label, value, field, placeholder, type = "text" }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
          <Icon size={20} className="text-indigo-400" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
          
          {editingField === field ? (
            <div className="space-y-2">
              <input
                type={type}
                value={tempValue}
                onChange={handleFieldChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={placeholder}
                autoFocus
                maxLength={field === "phone" ? 10 : undefined}
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex gap-2">
                <button
                  onClick={saveField}
                  disabled={saving || !!error}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg text-white">
                  {value || (
                    <span className="text-gray-400 italic">
                      {field === "phone" ? "No phone number" : 
                       field === "username" ? "No username set" : 
                       field === "college" ? "No college added" : 
                       field === "graduationYear" ? "No graduation year" : ""}
                    </span>
                  )}
                </span>
                {field === "phone" && value && (
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">Verified</span>
                )}
              </div>
              <button
                onClick={() => startEditing(field, value)}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium group"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition">
                  <Edit2 size={14} />
                </div>
                {value ? "Edit" : "Add"}
              </button>
            </div>
          )}
        </div>
      </div>
      {editingField !== field && <div className="h-px bg-white/5 mt-3"></div>}
    </div>
  );

  const InfoCard = ({ icon: Icon, label, value, isDate = false }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
          <Icon size={20} className="text-gray-400" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
          <div className="flex items-center justify-between">
            <span className="text-lg text-white">
              {isDate ? formatDate(value) : value}
            </span>
            {label === "Email address" && (
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                {userData.provider === "google" ? "Google Account" : "Email Account"}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="h-px bg-white/5 mt-3"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0a0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0a0f1a] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Header with user avatar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <UserCircle size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {userData.name}
            </h1>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Your details section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={20} className="text-indigo-400" />
              <h2 className="text-xl font-semibold">Account Information</h2>
            </div>
            
            <div className="space-y-6">
              {/* Email (Read-only) */}
              <InfoCard 
                icon={Mail} 
                label="Email address" 
                value={userData.email} 
              />
              
              {/* Mobile Number (Editable) */}
              <InputField
                icon={Phone}
                label="Mobile number"
                value={userData.phone}
                field="phone"
                placeholder="Enter 10-digit phone number"
                type="tel"
              />
              
              {/* User Since (Read-only) */}
              <InfoCard 
                icon={Calendar} 
                label="User Since" 
                value={userData.createdAt} 
                isDate={true}
              />
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <UserIcon size={20} className="text-indigo-400" />
              <h2 className="text-xl font-semibold">Profile Details</h2>
            </div>
            
            <div className="space-y-6">
              {/* Username (Editable) */}
              <InputField
                icon={UserIcon}
                label="Username"
                value={userData.username}
                field="username"
                placeholder="Choose a username (3-20 characters)"
              />
              
              {/* College (Editable) */}
              <InputField
                icon={Building}
                label="College/University"
                value={userData.college}
                field="college"
                placeholder="Enter your college name"
              />
              
              {/* Graduation Year (Editable) */}
              <InputField
                icon={GraduationCap}
                label="Graduation Year"
                value={userData.graduationYear}
                field="graduationYear"
                placeholder="e.g., 2025"
                type="number"
              />
            </div>
          </div>

          {/* Role Badge */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-4 border border-indigo-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Shield size={20} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Account Type</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      userData.role === "MENTOR" 
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                        : userData.role === "ADMIN"
                        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                        : "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                    }`}>
                      {userData.role}
                    </span>
                    {userData.role === "MENTOR" && (
                      <span className="text-xs text-gray-400">• Mentor account with booking features</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Status</p>
                <span className="inline-flex items-center gap-1 text-sm text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Profile Completion</p>
              <div className="flex items-center justify-between">
                <div className="w-3/4 bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(() => {
                      const fields = ['phone', 'username', 'college', 'graduationYear'];
                      const filled = fields.filter(f => userData[f]).length;
                      return (filled / fields.length) * 100;
                    })()}%` }}
                  ></div>
                </div>
                <span className="text-lg font-semibold">
                  {(() => {
                    const fields = ['phone', 'username', 'college', 'graduationYear'];
                    const filled = fields.filter(f => userData[f]).length;
                    return Math.round((filled / fields.length) * 100);
                  })()}%
                </span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Last Updated</p>
              <p className="text-lg font-semibold">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Member Since</p>
              <p className="text-lg font-semibold">
                {new Date(userData.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Help Text */}
          {/* has to do bro... */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Need help? <a href="#" className="text-indigo-400 hover:text-indigo-300">Contact support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;