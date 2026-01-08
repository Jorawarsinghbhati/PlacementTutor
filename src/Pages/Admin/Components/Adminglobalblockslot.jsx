import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Calendar,
  Clock,
  AlertTriangle,
  Lock,
  Loader,
  Plus,
  Minus,
  Shield,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  List,
  RefreshCw,
  Info,
  X,
  Search,
  Save,
  Check,
  AlertCircle,
  Settings,
} from "lucide-react";
import { apiConnector } from "../../../Service/apiConnector";
import { adminEndpoints } from "../../../Service/apis";


const AdminGlobalBlock = () => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    reason: "Platform maintenance",
});



  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdBlock, setCreatedBlock] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [viewMode, setViewMode] = useState("create");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterReason, setFilterReason] = useState("all");
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [sortBy, setSortBy] = useState("date_desc");

useEffect(() => {
  const updateCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
  };
  updateCurrentTime();
  const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    // Set start time to current time rounded up to next 15 minutes
    const now = new Date();
    const currentMinutes = now.getMinutes();
    const roundedMinutes = Math.ceil(currentMinutes / 15) * 15;
    let hours = now.getHours();
    
    if (roundedMinutes === 60) {
      hours += 1;
    }
    
    const startHours = String(hours).padStart(2, '0');
    const startMinutes = String(roundedMinutes % 60).padStart(2, '0');
    const startTime = `${startHours}:${startMinutes}`;
    
    // Set end time to 1 hour after start time
    let endHours = hours + 1;
    if (endHours >= 24) endHours = 23;
    const endTime = `${String(endHours).padStart(2, '0')}:${startMinutes}`;
    
    setFormData({
      date: formattedDate,
      startTime: startTime,
      endTime: endTime,
      reason: "Platform maintenance",
      customReason: ""
    });
    
    // Load existing blocks
    fetchGlobalBlocks();
  }, []);

  const fetchGlobalBlocks = async () => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "GET",
        adminEndpoints.GET_ALL_BLOCKSLOT
      );
      
      if (response.data.success) {
        setBlocks(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching global blocks:", error);
      toast.error("❌ Failed to load global blocks");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    
    if (name === "date") {
      const today = new Date().toISOString().split('T')[0];
      if (value === today && updatedData.startTime < currentTime) {
        updatedData.startTime = currentTime;
      }
    }
    
    setFormData(updatedData);
  };

  const handleTimeChange = (type, increment) => {
    const time = formData[type];
    const [hours, minutes] = time.split(":").map(Number);
    
    let newHours = hours;
    let newMinutes = minutes;
    
    newMinutes += increment ? 15 : -15;
    
    if (newMinutes >= 60) {
      newHours += 1;
      newMinutes = 0;
    } else if (newMinutes < 0) {
      newHours -= 1;
      newMinutes = 45;
    }
    
    if (newHours >= 24) {
      newHours = 0;
    } else if (newHours < 0) {
      newHours = 23;
    }
    
    const newTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    
    const today = new Date().toISOString().split('T')[0];
    const isToday = formData.date === today;
    
    if (type === "startTime") {
      if (isToday && newTime < currentTime) {
        toast.error("❌ Start time cannot be in the past for today");
        return;
      }
    } else if (type === "endTime") {
      if (newTime <= formData.startTime) {
        toast.error("❌ End time must be after start time");
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [type]: newTime }));
  };

  const validateForm = () => {
    if (!formData.date || !formData.startTime || !formData.endTime) {
      toast.error("❌ Date, start time, and end time are required");
      return false;
    }

    const start = new Date(`2000-01-01T${formData.startTime}`);
    const end = new Date(`2000-01-01T${formData.endTime}`);
    
    if (start >= end) {
      toast.error("❌ End time must be after start time");
      return false;
    }

    const duration = (end - start) / (1000 * 60 * 60);
    if (duration > 24) {
      toast.error("❌ Block duration cannot exceed 24 hours");
      return false;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error("❌ Cannot create block for past dates");
      return false;
    }

    const isToday = formData.date === new Date().toISOString().split('T')[0];
    if (isToday && formData.startTime < currentTime) {
      toast.error("❌ Start time cannot be in the past for today");
      return false;
    }

    if (formData.reason === "Other" && (!formData.customReason || formData.customReason.trim() === "")) {
      toast.error("❌ Please specify a reason for the block");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const blockData = {
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      reason: formData.reason === "Other" ? formData.customReason : formData.reason
    };
    
    setSubmitting(true);
    try {
      const response = await apiConnector(
        "POST",
        adminEndpoints.GLOBAL_BLOCK,
        blockData
      );
      
      if (response.data.success) {
        setCreatedBlock(response.data.block);
        setShowSuccess(true);
        
        // Reset form with tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
        
        setFormData({
          date: formattedDate,
          startTime: "09:00",
          endTime: "10:00",
          reason: "Platform maintenance",
          customReason: ""
        });
        
        // Refresh blocks list
        fetchGlobalBlocks();
        
        toast.success("✅ Global time block created successfully!");
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error creating global block:", error);
      const errorMsg = error.response?.data?.message || "Failed to create global block";
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMinutes = Math.round((end - start) / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    if (hours === 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (minutes === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  };

  const isTodaySelected = () => {
    const today = new Date().toISOString().split('T')[0];
    return formData.date === today;
  };

  const getMinTime = () => {
    if (isTodaySelected()) {
      return currentTime;
    }
    return "00:00";
  };

  const isTimeInPast = (time) => {
    if (!isTodaySelected()) return false;
    return time < currentTime;
  };

  const getFilteredBlocks = () => {
    let filtered = [...blocks];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(block => 
        block.date.toLowerCase().includes(term) ||
        block.reason.toLowerCase().includes(term) ||
        formatTime(block.startTime).toLowerCase().includes(term) ||
        formatTime(block.endTime).toLowerCase().includes(term)
      );
    }

    // Apply date filter
    if (filterDate) {
      filtered = filtered.filter(block => block.date === filterDate);
    }

    // Apply reason filter
    if (filterReason !== "all") {
      filtered = filtered.filter(block => block.reason === filterReason);
    }

    // Apply sorting
    switch (sortBy) {
      case "date_asc":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date_desc":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "time_asc":
        filtered.sort((a, b) => a.startTime.localeCompare(b.startTime));
        break;
      case "time_desc":
        filtered.sort((a, b) => b.startTime.localeCompare(a.startTime));
        break;
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  };

  const getReasons = () => {
    const reasons = new Set();
    blocks.forEach(block => reasons.add(block.reason));
    return Array.from(reasons);
  };

  const isBlockActive = (block) => {
    const now = new Date();
    const blockDate = new Date(block.date);
    const isPastDate = blockDate < now.setHours(0, 0, 0, 0);
    
    if (isPastDate) return false;
    
    if (blockDate.toDateString() === now.toDateString()) {
      const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      return currentTimeStr >= block.startTime && currentTimeStr <= block.endTime;
    }
    
    return false;
  };

  const isFutureBlock = (block) => {
    const now = new Date();
    const blockDate = new Date(block.date);
    return blockDate > now.setHours(0, 0, 0, 0);
  };

  const renderCreateForm = () => (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && createdBlock && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20 animate-in slide-in-from-top">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-400 mb-2">
                ✅ Global Block Created Successfully!
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">
                    Date: <span className="font-semibold">{createdBlock.date}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">
                    Time: <span className="font-semibold">
                      {formatTime(createdBlock.startTime)} - {formatTime(createdBlock.endTime)}
                    </span>
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Block ID: {createdBlock._id?.slice(-8)}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Warning Alert */}
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-6 border border-red-500/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              ⚠️ Important Notice
            </h3>
            <p className="text-gray-300">
              Creating a global time block will make the platform unavailable for ALL users during the specified time period.
              This includes blocking all mentor availability slots, preventing new bookings, and restricting access to
              scheduled sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Current Time Display */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl p-6 border border-indigo-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-indigo-400" />
            <div>
              <p className="text-sm text-gray-400">Current Time</p>
              <p className="text-lg font-semibold text-indigo-300">{formatTime(currentTime)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Today's Date</p>
            <p className="font-semibold text-indigo-300">{new Date().toISOString().split('T')[0]}</p>
          </div>
        </div>
      </div>

      {/* Create Block Form */}
      <div className="bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-2xl border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Create New Block</h2>
            <p className="text-gray-400 text-sm">Configure global time restrictions</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Block Date
              <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
              required
              min={new Date().toISOString().split('T')[0]}
            />
            <div className="flex items-center gap-2 text-sm">
              {isTodaySelected() ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-red-400">
                    ⚠️ Today selected - Time restrictions apply
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-green-400">
                    ✓ Future date - No time restrictions
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Time Selection Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Start Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Start Time
                <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTimeChange("startTime", false)}
                  disabled={isTodaySelected() && isTimeInPast(formData.startTime)}
                  className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={20} />
                </button>
                
                <div className="flex-1">
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    min={getMinTime()}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 text-center text-lg"
                    required
                    step="900"
                  />
                  <p className="text-center text-sm text-gray-400 mt-1">
                    {formatTime(formData.startTime)}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleTimeChange("startTime", true)}
                  className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <Plus size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-400 text-center">
                {isTodaySelected() 
                  ? `Select time after ${formatTime(currentTime)}`
                  : "Use buttons or type to adjust time"}
              </p>
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                End Time
                <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTimeChange("endTime", false)}
                  disabled={formData.endTime <= formData.startTime}
                  className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={20} />
                </button>
                
                <div className="flex-1">
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    min={formData.startTime}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 text-center text-lg"
                    required
                    step="900"
                  />
                  <p className="text-center text-sm text-gray-400 mt-1">
                    {formatTime(formData.endTime)}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleTimeChange("endTime", true)}
                  className="w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <Plus size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-400 text-center">
                Must be after start time
              </p>
            </div>
          </div>

          {/* Duration Display */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Block Duration</p>
                <p className="text-2xl font-bold text-red-400">
                  {calculateDuration(formData.startTime, formData.endTime)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Time Range</p>
                <p className="text-lg font-semibold text-indigo-300">
                  {formatTime(formData.startTime)} - {formatTime(formData.endTime)}
                </p>
              </div>
            </div>
          </div>

          {/* Reason Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Reason for Block
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
            >
              <option value="Platform maintenance">🚧 Platform maintenance</option>
              <option value="Server upgrade">⚡ Server upgrade</option>
              <option value="Holiday">🎄 Holiday</option>
              <option value="System update">🔄 System update</option>
              <option value="Emergency maintenance">🚨 Emergency maintenance</option>
              <option value="Other">📝 Other (specify below)</option>
            </select>
          </div>

          {/* Custom Reason */}
          {formData.reason === "Other" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Specify Reason
              </label>
              <textarea
                name="customReason"
                value={formData.customReason || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, customReason: e.target.value }))}
                placeholder="Please provide details about why you're blocking this time..."
                rows="2"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 resize-none"
                required
              />
            </div>
          )}

          {/* Summary Card */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20">
            <h3 className="font-bold text-lg mb-4 text-red-400 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Block Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Date:</span>
                <span className="font-semibold">{formData.date}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Time:</span>
                <span className="font-semibold">
                  {formatTime(formData.startTime)} - {formatTime(formData.endTime)}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Duration:</span>
                <span className="font-semibold text-red-400">
                  {calculateDuration(formData.startTime, formData.endTime)}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Reason:</span>
                <span className="font-semibold">{formData.reason === "Other" ? formData.customReason : formData.reason}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={submitting || (isTodaySelected() && isTimeInPast(formData.startTime))}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg ${
                submitting || (isTodaySelected() && isTimeInPast(formData.startTime))
                  ? "bg-gray-700 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:scale-105 shadow-red-500/20"
              }`}
            >
              {submitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating Block...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Create Global Time Block
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderBlocksList = () => {
    const filteredBlocks = getFilteredBlocks();
    const reasons = getReasons();
  
    // Categorize blocks
    const categorizedBlocks = {
      active: [],
      upcoming: [],
      past: []
    };
  
    filteredBlocks.forEach(block => {
      const now = new Date();
      const blockDate = new Date(block.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Check if it's the same date
      const isSameDate = blockDate.toDateString() === now.toDateString();
      
      if (isSameDate) {
        const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        if (currentTimeStr >= block.startTime && currentTimeStr <= block.endTime) {
          categorizedBlocks.active.push(block);
        } else if (currentTimeStr < block.startTime) {
          categorizedBlocks.upcoming.push(block);
        } else {
          categorizedBlocks.past.push(block);
        }
      } else if (blockDate > today) {
        categorizedBlocks.upcoming.push(block);
      } else {
        categorizedBlocks.past.push(block);
      }
    });
  
    // Sort within categories
    const sortBlocks = (blocks) => {
      return blocks.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        if (dateA.getTime() === dateB.getTime()) {
          return a.startTime.localeCompare(b.startTime);
        }
        return sortBy.includes('desc') ? dateB - dateA : dateA - dateB;
      });
    };
  
    categorizedBlocks.active = sortBlocks(categorizedBlocks.active);
    categorizedBlocks.upcoming = sortBlocks(categorizedBlocks.upcoming);
    categorizedBlocks.past = sortBlocks(categorizedBlocks.past);
  
    const renderCategory = (title, blocks, icon, color, borderColor) => (
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {icon}
            {title} <span className="text-sm text-gray-400">({blocks.length})</span>
          </h3>
        </div>
        
        {blocks.length === 0 ? (
          <div className="text-center py-6 bg-white/5 rounded-xl border border-white/10">
            <p className="text-gray-400">No {title.toLowerCase()} blocks</p>
          </div>
        ) : (
          blocks.map((block) => (
            <div
              key={block._id}
              className={`rounded-xl border ${borderColor} overflow-hidden transition-all duration-200 hover:scale-[1.02]`}
            >
              <div 
                className="p-4 cursor-pointer hover:bg-white/5 transition"
                onClick={() => setExpandedBlock(expandedBlock === block._id ? null : block._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${color.replace('bg-', '')}`}></div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{block.date}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-lg">
                          {formatTime(block.startTime)} - {formatTime(block.endTime)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">{block.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                      title === 'Active'
                        ? "bg-red-500 text-white"
                        : title === 'Upcoming'
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}>
                      {title.toUpperCase()}
                    </span>
                    {expandedBlock === block._id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              
              {expandedBlock === block._id && (
                <div className="px-6 pb-6 border-t border-white/10 pt-6 bg-black/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-semibold text-lg">{calculateDuration(block.startTime, block.endTime)}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Created</p>
                      <p className="font-semibold text-lg">
                        {new Date(block.createdAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Block ID</p>
                      <p className="font-semibold font-mono text-lg text-indigo-300">{block._id?.slice(-8)}</p>
                    </div>
                  </div>
                  
                  {/* Time status info */}
                  <div className="mt-4 p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-400">Current Time: </span>
                        <span className="font-semibold">{formatTime(currentTime)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-400">Block Time: </span>
                        <span className="font-semibold">
                          {block.date === new Date().toISOString().split('T')[0] 
                            ? "Today"
                            : new Date(block.date).toLocaleDateString('en-US', { weekday: 'short' })
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    );
  
    return (
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Now</p>
                <p className="text-3xl font-bold text-red-400">{categorizedBlocks.active.length}</p>
                <p className="text-xs text-gray-400 mt-1">Currently blocking</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Upcoming</p>
                <p className="text-3xl font-bold text-blue-400">
                  {categorizedBlocks.upcoming.length}
                </p>
                <p className="text-xs text-gray-400 mt-1">Future blocks</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-500/10 to-gray-700/10 rounded-xl p-6 border border-gray-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Past Blocks</p>
                <p className="text-3xl font-bold text-gray-400">
                  {categorizedBlocks.past.length}
                </p>
                <p className="text-xs text-gray-400 mt-1">Completed</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
  
        {/* Filters */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blocks by date, time, or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  placeholder="Filter by date"
                />
              </div>
              
              <select
                value={filterReason}
                onChange={(e) => setFilterReason(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              >
                <option value="all">All Reasons</option>
                {reasons.map((reason, index) => (
                  <option key={index} value={reason}>{reason}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              >
                <option value="date_desc">Date: Newest First</option>
                <option value="date_asc">Date: Oldest First</option>
                <option value="time_asc">Time: Earliest First</option>
                <option value="time_desc">Time: Latest First</option>
              </select>
              
              <button
                onClick={fetchGlobalBlocks}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center gap-2 transition hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
            <Info className="w-4 h-4" />
            <span>
              Showing {filteredBlocks.length} blocks • 
              <span className="text-red-400 ml-2">Active: {categorizedBlocks.active.length}</span> • 
              <span className="text-blue-400 ml-2">Upcoming: {categorizedBlocks.upcoming.length}</span> • 
              <span className="text-gray-400 ml-2">Past: {categorizedBlocks.past.length}</span>
            </span>
          </div>
        </div>
  
        {/* Blocks List */}
        <div className="bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-2xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <List className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">All Global Blocks</h2>
                <p className="text-gray-400 text-sm">Categorized by current time status</p>
              </div>
            </div>
            <span className="bg-red-500/20 text-red-400 text-sm px-3 py-2 rounded-full font-medium">
              {filteredBlocks.length} total blocks
            </span>
          </div>
  
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
              <p className="text-gray-400">Loading blocks...</p>
            </div>
          ) : filteredBlocks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Shield className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No Blocks Found</h3>
              <p className="text-gray-500">
                {blocks.length === 0 
                  ? "Create your first global block to get started" 
                  : "No blocks match your filters"}
              </p>
            </div>
          ) : (
            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2">
              {/* Active Blocks */}
              {categorizedBlocks.active.length > 0 && renderCategory(
                'Active',
                categorizedBlocks.active,
                <div className="w-5 h-5 text-red-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                </div>,
                'bg-red-500 animate-pulse',
                'border-red-500 bg-red-500/10'
              )}
              
              {/* Upcoming Blocks */}
              {categorizedBlocks.upcoming.length > 0 && renderCategory(
                'Upcoming',
                categorizedBlocks.upcoming,
                <Calendar className="w-5 h-5 text-blue-400" />,
                'bg-blue-500',
                'border-blue-500 bg-blue-500/10'
              )}
              
              {/* Past Blocks */}
              {categorizedBlocks.past.length > 0 && renderCategory(
                'Past',
                categorizedBlocks.past,
                <Clock className="w-5 h-5 text-gray-400" />,
                'bg-gray-500',
                'border-white/10 bg-white/5'
              )}
            </div>
          )}
        </div>
        
        {/* Time Legend */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h4 className="font-semibold mb-3 text-gray-300">Time Status Legend</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm text-gray-300">Active Now</span>
              <span className="text-xs text-gray-400 ml-auto">Currently blocking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-300">Upcoming</span>
              <span className="text-xs text-gray-400 ml-auto">Future blocks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-sm text-gray-300">Past</span>
              <span className="text-xs text-gray-400 ml-auto">Completed blocks</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#0b1220] text-gray-100 p-4 md:p-6">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        theme="dark"
        className="mt-16"
      />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Global Time Blocks
              </h1>
              <p className="text-gray-400 mt-2">
                Create and manage global time blocks to make platform unavailable for all users
              </p>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setViewMode("create")}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition ${
                viewMode === "create"
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              <Plus className="w-4 h-4" />
              Create Block
            </button>
            <button
              onClick={() => setViewMode("view")}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition ${
                viewMode === "view"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              <Eye className="w-4 h-4" />
              View Blocks
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {viewMode === "create" ? renderCreateForm() : renderBlocksList()}
      </div>
    </div>
  );
};

export default AdminGlobalBlock;