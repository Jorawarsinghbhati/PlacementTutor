// Pages/Mentor/MentorAvailability.jsx
import { useState, useEffect } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { mentorEndpoints } from "../../Service/apis";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Loader2,
  Info,
  ExternalLink
} from "lucide-react";

const MentorAvailability = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [loading, setLoading] = useState({ fetch: false, action: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  
  // Form state
  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: ""
  });

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Initialize with today's date
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setSelectedDate(todayStr);
    setNewSlot(prev => ({ ...prev, date: todayStr }));
    generateCalendar(today);
  }, []);

  // Fetch availability when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate]);

  // Generate calendar days
  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of month
    const firstDay = new Date(year, month, 1);
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    // Day of week for first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      const dateStr = new Date(year, month - 1, day).toISOString().split('T')[0];
      days.push({
        date: dateStr,
        day,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Current month's days
    const todayStr = new Date().toISOString().split('T')[0];
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = new Date(year, month, day).toISOString().split('T')[0];
      days.push({
        date: dateStr,
        day,
        isCurrentMonth: true,
        isToday: dateStr === todayStr
      });
    }
    
    // Next month's days (to fill the grid)
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - days.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      const dateStr = new Date(year, month + 1, day).toISOString().split('T')[0];
      days.push({
        date: dateStr,
        day,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    setCalendarDays(days);
  };

  // Navigate calendar
  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
    generateCalendar(prev);
  };

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
    generateCalendar(next);
  };

  const goToToday = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setCurrentMonth(today);
    setSelectedDate(todayStr);
    setNewSlot(prev => ({ ...prev, date: todayStr }));
    generateCalendar(today);
  };

  // Fetch availability for selected date
  const fetchAvailability = async (date) => {
    try {
      setLoading(prev => ({ ...prev, fetch: true }));
      setError("");
      
      // ✅ CORRECT API CONNECTOR USAGE
      const response = await apiConnector(
        "GET",
        mentorEndpoints.GET_MY_AVAILABILITY,
        null, // No body for GET
        {}, // Headers (will be added by interceptor)
        { date } // Query params as 4th parameter
      );
      
      console.log("API Response:", response);
      
      if (response.data?.success) {
        setAvailabilitySlots(response.data.slots || []);
      } else {
        setError(response.data?.message || "Failed to fetch slots");
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      setError(error.response?.data?.message || "Failed to load availability slots");
    } finally {
      setLoading(prev => ({ ...prev, fetch: false }));
    }
  };

  // Add new availability slot
  const handleAddSlot = async () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      setError("Please fill all fields");
      return;
    }

    if (newSlot.startTime >= newSlot.endTime) {
      setError("End time must be after start time");
      return;
    }

    try {
      setLoading(prev => ({ ...prev, action: true }));
      setError("");
      
      // ✅ CORRECT API CONNECTOR USAGE
      const response = await apiConnector(
        "POST",
        mentorEndpoints.ADD_AVAILABILITY,
        newSlot, // Body data as 3rd parameter
        {} // Headers
      );
      
      if (response.data?.success) {
        setSuccess("Availability slot added successfully!");
        setShowAddForm(false);
        setNewSlot({
          date: selectedDate,
          startTime: "",
          endTime: ""
        });
        fetchAvailability(selectedDate);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.data?.message || "Failed to add slot");
      }
    } catch (error) {
      console.error("Error adding slot:", error);
      setError(error.response?.data?.message || "Failed to add availability slot");
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  // Update availability slot
  const handleUpdateSlot = async (slotId, updates) => {
    try {
      setLoading(prev => ({ ...prev, action: true }));
      setError("");
      
      // ✅ CORRECT API CONNECTOR USAGE
      const response = await apiConnector(
        "PUT",
        mentorEndpoints.UPDATE_AVAILABILITY(slotId),
        updates, // Body data
        {} // Headers
      );
      
      if (response.data?.success) {
        setSuccess("Slot updated successfully!");
        setEditingSlot(null);
        fetchAvailability(selectedDate);
        
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.data?.message || "Failed to update slot");
      }
    } catch (error) {
      console.error("Error updating slot:", error);
      setError(error.response?.data?.message || "Failed to update slot");
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  // Delete availability slot
  const handleDeleteSlot = async (slotId) => {
    if (!window.confirm("Are you sure you want to delete this availability slot?")) {
      return;
    }

    try {
      setLoading(prev => ({ ...prev, action: true }));
      setError("");
      
      // ✅ CORRECT API CONNECTOR USAGE
      const response = await apiConnector(
        "DELETE",
        mentorEndpoints.DELETE_AVAILABILITY(slotId),
        null, // No body for DELETE
        {} // Headers
      );
      
      if (response.data?.success) {
        setSuccess("Slot deleted successfully!");
        fetchAvailability(selectedDate);
        
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.data?.message || "Failed to delete slot");
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      setError(error.response?.data?.message || "Failed to delete slot");
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  // Quick update time (better UX than prompt)
  const handleQuickUpdate = (slot) => {
    const newStartTime = prompt(`Enter new start time (HH:mm) for ${formatDate(slot.date)}:`, slot.startTime);
    if (!newStartTime) return;
    
    const newEndTime = prompt(`Enter new end time (HH:mm) for ${formatDate(slot.date)}:`, slot.endTime);
    if (!newEndTime) return;
    
    if (newStartTime >= newEndTime) {
      setError("End time must be after start time");
      return;
    }
    
    handleUpdateSlot(slot._id, { startTime: newStartTime, endTime: newEndTime });
  };

  // Format time for display
  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    if (isNaN(hour)) return time;
    
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes.padStart(2, '0')} ${ampm}`;
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get month name
  const monthName = currentMonth.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  // Calculate duration in hours
  const calculateDuration = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const start = startHour + startMinute / 60;
    const end = endHour + endMinute / 60;
    
    const duration = end - start;
    return duration.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Availability Management</h1>
          <p className="text-gray-600">
            Manage your available time slots for mentoring sessions
          </p>
          <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Click on any date to view and manage slots for that day
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-medium">{success}</p>
            </div>
            <button
              onClick={() => setSuccess("")}
              className="text-green-600 hover:text-green-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
            <button
              onClick={() => setError("")}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              {/* Calendar Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CalendarIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>
                    <p className="text-sm text-gray-500">Select a date to manage slots</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevMonth}
                    disabled={loading.fetch}
                    className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToToday}
                    disabled={loading.fetch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50"
                  >
                    Today
                  </button>
                  <button
                    onClick={nextMonth}
                    disabled={loading.fetch}
                    className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="mb-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    const isSelected = day.date === selectedDate;
                    const hasSlots = availabilitySlots.some(slot => slot.date === day.date);
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedDate(day.date);
                          setNewSlot(prev => ({ ...prev, date: day.date }));
                        }}
                        disabled={loading.fetch}
                        className={`
                          relative h-14 rounded-lg transition-all duration-200
                          ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                          ${day.isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}
                          ${isSelected 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'hover:bg-gray-100'
                          }
                          flex flex-col items-center justify-center
                          disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                      >
                        <span className="text-sm font-medium">{day.day}</span>
                        {hasSlots && !isSelected && (
                          <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        )}
                        {day.isToday && !isSelected && (
                          <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Date Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Selected Date</h3>
                    <p className="text-gray-700">{formatDate(selectedDate)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      disabled={loading.action}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                    >
                      {showAddForm ? (
                        <>
                          <X className="w-4 h-4" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Add Slot
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Add Slot Form */}
              {showAddForm && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add New Time Slot
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={newSlot.startTime}
                          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={newSlot.endTime}
                          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    {newSlot.startTime && newSlot.endTime && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-700">
                          Slot duration: {calculateDuration(newSlot.startTime, newSlot.endTime)} hours
                        </p>
                      </div>
                    )}
                    
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleAddSlot}
                        disabled={loading.action || !newSlot.startTime || !newSlot.endTime}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading.action ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            Add Time Slot
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Availability Slots Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 h-full border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Time Slots</h2>
                  <p className="text-sm text-gray-500">{formatDate(selectedDate)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {loading.fetch ? (
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                  ) : (
                    <button
                      onClick={() => fetchAvailability(selectedDate)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="Refresh"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Stats */}
              {availabilitySlots.length > 0 && (
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <div className="text-2xl font-bold text-green-700">
                      {availabilitySlots.filter(s => !s.isBooked).length}
                    </div>
                    <div className="text-sm text-green-600">Available</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="text-2xl font-bold text-blue-700">
                      {availabilitySlots.filter(s => s.isBooked).length}
                    </div>
                    <div className="text-sm text-blue-600">Booked</div>
                  </div>
                </div>
              )}

              {/* Slots List */}
              {loading.fetch ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                  <p className="mt-4 text-gray-600">Loading slots...</p>
                </div>
              ) : availabilitySlots.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Time Slots</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't added any availability slots for this date.
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Add Your First Slot
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {availabilitySlots.map((slot) => (
                    <div
                      key={slot._id}
                      className={`p-4 rounded-xl border transition-all ${
                        slot.isBooked 
                          ? 'bg-gray-50 border-gray-200' 
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                      } ${slot.lockedUntil ? 'border-yellow-200 bg-yellow-50' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${slot.isBooked ? 'bg-red-500' : 'bg-green-500'}`} />
                            <span className={`text-sm font-medium ${slot.isBooked ? 'text-gray-600' : 'text-gray-900'}`}>
                              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({calculateDuration(slot.startTime, slot.endTime)}h)
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            {slot.isBooked ? (
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                Booked
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                Available
                              </span>
                            )}
                            {slot.lockedUntil && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                Locked
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {!slot.isBooked && !slot.lockedUntil && (
                            <>
                              <button
                                onClick={() => handleQuickUpdate(slot)}
                                disabled={loading.action}
                                className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600 disabled:opacity-50"
                                title="Edit slot"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteSlot(slot._id)}
                                disabled={loading.action}
                                className="p-2 hover:bg-red-50 rounded-lg transition text-red-600 disabled:opacity-50"
                                title="Delete slot"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {slot.isBooked && (
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
                              title="View booking details"
                              onClick={() => window.open(`/mentor/bookings?slot=${slot._id}`, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {slot.lockedUntil && !slot.isBooked && (
                        <div className="mt-3 pt-3 border-t border-yellow-100 text-xs text-yellow-700">
                          Locked until {new Date(slot.lockedUntil).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Tips */}
              {availabilitySlots.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Tips</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                      <span>Green dots indicate available slots</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5" />
                      <span>Red dots indicate booked slots</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span>Click calendar dates to view different days</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Best Practices for Availability
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-blue-700 font-semibold mb-3 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Schedule in Advance
              </div>
              <p className="text-sm text-gray-700">
                Add slots at least 2-3 days in advance to give students time to book. Consistent weekly schedules perform best.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-green-700 font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Optimal Slot Length
              </div>
              <p className="text-sm text-gray-700">
                60-90 minute sessions work best for mentoring. Consider offering both short (30 min) and long (120 min) options.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-purple-700 font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Avoid Overbooking
              </div>
              <p className="text-sm text-gray-700">
                Leave buffer time between sessions. Don't schedule back-to-back slots without breaks for preparation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorAvailability;