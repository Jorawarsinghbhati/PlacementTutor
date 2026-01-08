
// import { useState, useEffect } from "react";
// import { apiConnector } from "../../Service/apiConnector";
// import { mentorEndpoints } from "../../Service/apis";
// import { 
//   Calendar as CalendarIcon, 
//   Clock, 
//   Plus, 
//   Edit, 
//   Trash2, 
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Check,
//   AlertCircle,
//   Loader2,
//   Info,
//   ExternalLink,
//   Users,
//   Zap
// } from "lucide-react";

// const MentorAvailability = () => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [groupedSlots, setGroupedSlots] = useState([]);
//   const [loading, setLoading] = useState({ fetch: false, action: false });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
  
//   // Form state
//   const [newTimeRange, setNewTimeRange] = useState({
//     date: "",
//     startTime: "",
//     endTime: ""
//   });

//   // Calendar state
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [calendarDays, setCalendarDays] = useState([]);

//   // Initialize with today's date
//   useEffect(() => {
//     const today = new Date();
//     const todayStr = today.toISOString().split('T')[0];
//     setSelectedDate(todayStr);
//     setNewTimeRange(prev => ({ ...prev, date: todayStr }));
//     generateCalendar(today);
//   }, []);

//   // Fetch availability when date changes
//   useEffect(() => {
//     if (selectedDate) {
//       fetchAvailability(selectedDate);
//     }
//   }, [selectedDate]);

//   // Generate calendar days
//   const generateCalendar = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
    
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const firstDayOfWeek = firstDay.getDay();
    
//     const days = [];
    
//     const prevMonthLastDay = new Date(year, month, 0).getDate();
//     for (let i = firstDayOfWeek; i > 0; i--) {
//       const day = prevMonthLastDay - i + 1;
//       const dateStr = new Date(year, month - 1, day).toISOString().split('T')[0];
//       days.push({
//         date: dateStr,
//         day,
//         isCurrentMonth: false,
//         isToday: false
//       });
//     }
    
//     const todayStr = new Date().toISOString().split('T')[0];
//     for (let day = 1; day <= lastDay.getDate(); day++) {
//       const dateStr = new Date(year, month, day).toISOString().split('T')[0];
//       days.push({
//         date: dateStr,
//         day,
//         isCurrentMonth: true,
//         isToday: dateStr === todayStr
//       });
//     }
    
//     const totalCells = 42;
//     const nextMonthDays = totalCells - days.length;
//     for (let day = 1; day <= nextMonthDays; day++) {
//       const dateStr = new Date(year, month + 1, day).toISOString().split('T')[0];
//       days.push({
//         date: dateStr,
//         day,
//         isCurrentMonth: false,
//         isToday: false
//       });
//     }
    
//     setCalendarDays(days);
//   };

//   // Navigate calendar
//   const prevMonth = () => {
//     const prev = new Date(currentMonth);
//     prev.setMonth(prev.getMonth() - 1);
//     setCurrentMonth(prev);
//     generateCalendar(prev);
//   };

//   const nextMonth = () => {
//     const next = new Date(currentMonth);
//     next.setMonth(next.getMonth() + 1);
//     setCurrentMonth(next);
//     generateCalendar(next);
//   };

//   const goToToday = () => {
//     const today = new Date();
//     const todayStr = today.toISOString().split('T')[0];
//     setCurrentMonth(today);
//     setSelectedDate(todayStr);
//     setNewTimeRange(prev => ({ ...prev, date: todayStr }));
//     generateCalendar(today);
//   };

//   // ✅ FETCH AVAILABILITY
//   const fetchAvailability = async (date) => {
//     try {
//       setLoading(prev => ({ ...prev, fetch: true }));
//       setError("");
      
//       const response = await apiConnector(
//         "GET",
//         mentorEndpoints.GET_MY_AVAILABILITY,
//         null,
//         {},
//         { date }
//       );
      
//       console.log("API Response:", response);
      
//       if (response.data?.success) {
//         setGroupedSlots(response.data.availability || []);
//       } else {
//         setError(response.data?.message || "Failed to fetch slots");
//       }
//     } catch (error) {
//       console.error("Error fetching availability:", error);
//       setError(error.response?.data?.message || "Failed to load availability slots");
//     } finally {
//       setLoading(prev => ({ ...prev, fetch: false }));
//     }
//   };

//   // ✅ ADD TIME RANGE
//   const handleAddTimeRange = async () => {
//     if (!newTimeRange.date || !newTimeRange.startTime || !newTimeRange.endTime) {
//       setError("Please fill all fields");
//       return;
//     }

//     if (newTimeRange.startTime >= newTimeRange.endTime) {
//       setError("End time must be after start time");
//       return;
//     }

//     // Minimum 15 minutes
//     const duration = calculateDuration(newTimeRange.startTime, newTimeRange.endTime);
//     if (duration < 0.25) {
//       setError("Minimum time range is 15 minutes");
//       return;
//     }

//     try {
//       setLoading(prev => ({ ...prev, action: true }));
//       setError("");
      
//       const response = await apiConnector(
//         "POST",
//         mentorEndpoints.ADD_AVAILABILITY,
//         newTimeRange
//       );
      
//       if (response.data?.success) {
//         setSuccess(`Added ${response.data.slotsCreated} slots successfully!`);
//         setShowAddForm(false);
//         setNewTimeRange({
//           date: selectedDate,
//           startTime: "",
//           endTime: ""
//         });
//         fetchAvailability(selectedDate);
        
//         setTimeout(() => setSuccess(""), 3000);
//       } else {
//         setError(response.data?.message || "Failed to add time range");
//       }
//     } catch (error) {
//       console.error("Error adding time range:", error);
//       setError(error.response?.data?.message || "Failed to add availability");
//     } finally {
//       setLoading(prev => ({ ...prev, action: false }));
//     }
//   };

//   // ✅ UPDATE TIME RANGE - FIXED!
//   const handleUpdateGroup = async (group) => {
//     // Extract slots from group (handling different data structures)
//     const slots = Array.isArray(group) ? group : 
//                  (group && group.slots ? group.slots : [group]);
    
//     if (slots.length === 0) {
//       setError("No slots found in this group");
//       return;
//     }
    
//     const groupStartTime = slots[0].startTime;
//     const groupEndTime = slots[slots.length - 1].endTime;
    
//     const newStartTime = prompt(`Enter new start time (HH:mm) for this time range:`, groupStartTime);
//     if (!newStartTime) return;
    
//     const newEndTime = prompt(`Enter new end time (HH:mm) for this time range:`, groupEndTime);
//     if (!newEndTime) return;
    
//     if (newStartTime >= newEndTime) {
//       setError("End time must be after start time");
//       return;
//     }

//     try {
//       setLoading(prev => ({ ...prev, action: true }));
//       setError("");
      
//       const response = await apiConnector(
//         "PUT",
//         mentorEndpoints.UPDATE_AVAILABILITY,
//         {
//           date: selectedDate,
//           startTime: groupStartTime,
//           endTime: groupEndTime,
//           newStartTime,
//           newEndTime
//         }
//       );
      
//       if (response.data?.success) {
//         setSuccess("Time range updated successfully!");
//         fetchAvailability(selectedDate);
        
//         setTimeout(() => setSuccess(""), 3000);
//       } else {
//         setError(response.data?.message || "Failed to update time range");
//       }
//     } catch (error) {
//       console.error("Error updating time range:", error);
//       setError(error.response?.data?.message || "Failed to update time range");
//     } finally {
//       setLoading(prev => ({ ...prev, action: false }));
//     }
//   };

//   // ✅ DELETE TIME RANGE - FIXED!
//   const handleDeleteGroup = async (group) => {
//     // Extract slots from group (handling different data structures)
//     const slots = Array.isArray(group) ? group : 
//                  (group && group.slots ? group.slots : [group]);
    
//     if (slots.length === 0) {
//       setError("No slots found in this group");
//       return;
//     }
    
//     const groupStartTime = slots[0].startTime;
//     const groupEndTime = slots[slots.length - 1].endTime;
    
//     if (!window.confirm(`Are you sure you want to delete time range ${formatTime(groupStartTime)} - ${formatTime(groupEndTime)}?`)) {
//       return;
//     }

//     try {
//       setLoading(prev => ({ ...prev, action: true }));
//       setError("");
      
//       const response = await apiConnector(
//         "DELETE",
//         mentorEndpoints.DELETE_AVAILABILITY,
//         {
//           date: selectedDate,
//           startTime: groupStartTime,
//           endTime: groupEndTime
//         }
//       );
      
//       if (response.data?.success) {
//         setSuccess(`Deleted ${response.data.slotsDeleted} slots successfully!`);
//         fetchAvailability(selectedDate);
        
//         setTimeout(() => setSuccess(""), 3000);
//       } else {
//         setError(response.data?.message || "Failed to delete time range");
//       }
//     } catch (error) {
//       console.error("Error deleting time range:", error);
//       setError(error.response?.data?.message || "Failed to delete time range");
//     } finally {
//       setLoading(prev => ({ ...prev, action: false }));
//     }
//   };

//   // Format time for display
//   const formatTime = (time) => {
//     if (!time) return "";
//     const [hours, minutes] = time.split(':');
//     const hour = parseInt(hours, 10);
//     if (isNaN(hour)) return time;
    
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minutes.padStart(2, '0')} ${ampm}`;
//   };

//   // Format date for display
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return dateStr;
    
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Get month name
//   const monthName = currentMonth.toLocaleDateString('en-US', { 
//     month: 'long', 
//     year: 'numeric' 
//   });

//   // Calculate duration in hours
//   const calculateDuration = (startTime, endTime) => {
//     const [startHour, startMinute] = startTime.split(':').map(Number);
//     const [endHour, endMinute] = endTime.split(':').map(Number);
    
//     const start = startHour + startMinute / 60;
//     const end = endHour + endMinute / 60;
    
//     const duration = end - start;
//     return parseFloat(duration.toFixed(2));
//   };

//   // Calculate stats for a group
//   const calculateGroupStats = (group) => {
//     // Handle different data structures
//     const slots = Array.isArray(group) ? group : 
//                  (group && group.slots ? group.slots : [group]);
    
//     const totalSlots = slots.length;
//     const bookedSlots = slots.filter(slot => slot && slot.isBooked).length;
//     const availableSlots = totalSlots - bookedSlots;
//     const totalHours = (totalSlots * 0.25).toFixed(2);
//     const availableHours = (availableSlots * 0.25).toFixed(2);
    
//     return {
//       totalSlots,
//       bookedSlots,
//       availableSlots,
//       totalHours,
//       availableHours,
//       hasBooked: bookedSlots > 0,
//       hasLocked: slots.some(slot => slot && slot.lockedUntil)
//     };
//   };

//   // Check if group can be edited (no booked slots)
//   const canEditGroup = (group) => {
//     // Handle different data structures
//     const slots = Array.isArray(group) ? group : 
//                  (group && group.slots ? group.slots : [group]);
    
//     return !slots.some(slot => slot && (slot.isBooked || slot.lockedUntil));
//   };

//   // Get total stats for all groups
//   const getTotalStats = () => {
//     let totalSlots = 0;
//     let bookedSlots = 0;
    
//     if (Array.isArray(groupedSlots)) {
//       groupedSlots.forEach(item => {
//         // Check if item is an array of slots
//         if (Array.isArray(item)) {
//           item.forEach(slot => {
//             if (slot && typeof slot === 'object') {
//               totalSlots++;
//               if (slot.isBooked) bookedSlots++;
//             }
//           });
//         } 
//         // Check if item is an object with slots property
//         else if (item && typeof item === 'object') {
//           if (Array.isArray(item.slots)) {
//             item.slots.forEach(slot => {
//               totalSlots++;
//               if (slot.isBooked) bookedSlots++;
//             });
//           } 
//           // If it's a single slot object
//           else if (item.startTime && item.endTime) {
//             totalSlots++;
//             if (item.isBooked) bookedSlots++;
//           }
//         }
//       });
//     }
    
//     return {
//       totalSlots,
//       bookedSlots,
//       availableSlots: totalSlots - bookedSlots,
//       totalHours: (totalSlots * 0.25).toFixed(2),
//       availableHours: ((totalSlots - bookedSlots) * 0.25).toFixed(2)
//     };
//   };

//   // Helper to extract slots from a group item
//   const extractSlots = (item) => {
//     if (Array.isArray(item)) {
//       return item;
//     } else if (item && typeof item === 'object') {
//       if (Array.isArray(item.slots)) {
//         return item.slots;
//       } else if (item.startTime && item.endTime) {
//         return [item];
//       }
//     }
//     return [];
//   };

//   // Check if date has any slots
//   const hasSlots = groupedSlots.length > 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Availability Management</h1>
//           <p className="text-gray-600">
//             Manage your 15-minute time slots
//           </p>
//           <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
//             <Info className="w-4 h-4" />
//             Time ranges are automatically split into 15-minute slots
//           </div>
//         </div>

//         {/* Success/Error Messages */}
//         {success && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Check className="w-5 h-5 text-green-600" />
//               <p className="text-green-700 font-medium">{success}</p>
//             </div>
//             <button
//               onClick={() => setSuccess("")}
//               className="text-green-600 hover:text-green-800"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         )}

//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <AlertCircle className="w-5 h-5 text-red-600" />
//               <p className="text-red-700 font-medium">{error}</p>
//             </div>
//             <button
//               onClick={() => setError("")}
//               className="text-red-600 hover:text-red-800"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         )}

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Calendar Section */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
//               {/* Calendar Header */}
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <CalendarIcon className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>
//                     <p className="text-sm text-gray-500">Select a date to manage time ranges</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={prevMonth}
//                     disabled={loading.fetch}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={goToToday}
//                     disabled={loading.fetch}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50"
//                   >
//                     Today
//                   </button>
//                   <button
//                     onClick={nextMonth}
//                     disabled={loading.fetch}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Calendar Grid */}
//               <div className="mb-6">
//                 {/* Day Headers */}
//                 <div className="grid grid-cols-7 gap-1 mb-2">
//                   {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//                     <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
//                       {day}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Calendar Days */}
//                 <div className="grid grid-cols-7 gap-1">
//                   {calendarDays.map((day, index) => {
//                     const isSelected = day.date === selectedDate;
                    
//                     return (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           setSelectedDate(day.date);
//                           setNewTimeRange(prev => ({ ...prev, date: day.date }));
//                         }}
//                         disabled={loading.fetch}
//                         className={`
//                           relative h-14 rounded-lg transition-all duration-200
//                           ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
//                           ${day.isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}
//                           ${isSelected 
//                             ? 'bg-blue-600 text-white hover:bg-blue-700' 
//                             : 'hover:bg-gray-100'
//                           }
//                           flex flex-col items-center justify-center
//                           disabled:opacity-50 disabled:cursor-not-allowed
//                         `}
//                       >
//                         <span className="text-sm font-medium">{day.day}</span>
//                         {day.isToday && !isSelected && (
//                           <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Selected Date Info */}
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                   <div>
//                     <h3 className="font-semibold text-gray-900 mb-1">Selected Date</h3>
//                     <p className="text-gray-700">{formatDate(selectedDate)}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setShowAddForm(!showAddForm)}
//                       disabled={loading.action}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
//                     >
//                       {showAddForm ? (
//                         <>
//                           <X className="w-4 h-4" />
//                           Cancel
//                         </>
//                       ) : (
//                         <>
//                           <Plus className="w-4 h-4" />
//                           Add Time Range
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Add Time Range Form */}
//               {showAddForm && (
//                 <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
//                   <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                     <Plus className="w-4 h-4" />
//                     Add New Time Range
//                   </h3>
                  
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Start Time
//                         </label>
//                         <input
//                           type="time"
//                           step="900"
//                           value={newTimeRange.startTime}
//                           onChange={(e) => setNewTimeRange({ ...newTimeRange, startTime: e.target.value })}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           End Time
//                         </label>
//                         <input
//                           type="time"
//                           step="900"
//                           value={newTimeRange.endTime}
//                           onChange={(e) => setNewTimeRange({ ...newTimeRange, endTime: e.target.value })}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           required
//                         />
//                       </div>
//                     </div>
                    
//                     {newTimeRange.startTime && newTimeRange.endTime && (
//                       <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-100">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <p className="text-sm text-gray-600">Total Duration</p>
//                             <p className="text-lg font-semibold text-blue-700">
//                               {calculateDuration(newTimeRange.startTime, newTimeRange.endTime)} hours
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-600">15-min Slots Created</p>
//                             <p className="text-lg font-semibold text-green-700">
//                               {(calculateDuration(newTimeRange.startTime, newTimeRange.endTime) * 4).toFixed(0)} slots
//                             </p>
//                           </div>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-2">
//                           System will automatically create 15-minute slots within this time range
//                         </p>
//                       </div>
//                     )}
                    
//                     <div className="flex gap-3 pt-2">
//                       <button
//                         onClick={handleAddTimeRange}
//                         disabled={loading.action || !newTimeRange.startTime || !newTimeRange.endTime}
//                         className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
//                       >
//                         {loading.action ? (
//                           <>
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                             Creating Slots...
//                           </>
//                         ) : (
//                           <>
//                             <Check className="w-4 h-4" />
//                             Create Time Range
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Time Ranges Section */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-6 h-full border border-gray-200">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">Time Ranges</h2>
//                   <p className="text-sm text-gray-500">{formatDate(selectedDate)}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {loading.fetch ? (
//                     <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
//                   ) : (
//                     <button
//                       onClick={() => fetchAvailability(selectedDate)}
//                       className="p-2 hover:bg-gray-100 rounded-lg transition"
//                       title="Refresh"
//                     >
//                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                       </svg>
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Stats */}
//               {hasSlots && (
//                 <div className="mb-6 grid grid-cols-2 gap-3">
//                   <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
//                     <div className="text-2xl font-bold text-green-700">
//                       {getTotalStats().availableSlots}
//                     </div>
//                     <div className="text-sm text-green-600">Available Slots</div>
//                   </div>
//                   <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
//                     <div className="text-2xl font-bold text-blue-700">
//                       {groupedSlots.length}
//                     </div>
//                     <div className="text-sm text-blue-600">Time Ranges</div>
//                   </div>
//                 </div>
//               )}

//               {/* Time Ranges List */}
//               {loading.fetch ? (
//                 <div className="text-center py-12">
//                   <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
//                   <p className="mt-4 text-gray-600">Loading time ranges...</p>
//                 </div>
//               ) : !hasSlots ? (
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Clock className="w-8 h-8 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">No Time Ranges</h3>
//                   <p className="text-gray-600 mb-6">
//                     Add a time range to create 15-minute slots automatically.
//                   </p>
//                   <button
//                     onClick={() => setShowAddForm(true)}
//                     className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-medium"
//                   >
//                     Add Your First Time Range
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {groupedSlots.map((item, groupIndex) => {
//                     // Extract slots from the item
//                     const slots = extractSlots(item);
//                     const stats = calculateGroupStats(item);
//                     const canEdit = canEditGroup(item);
                    
//                     if (slots.length === 0) return null;
                    
//                     const groupStartTime = slots[0].startTime;
//                     const groupEndTime = slots[slots.length - 1].endTime;
                    
//                     return (
//                       <div
//                         key={groupIndex}
//                         className={`p-4 rounded-xl border transition-all ${
//                           stats.hasBooked 
//                             ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200' 
//                             : 'bg-gradient-to-br from-white to-blue-50 border-blue-200 hover:border-blue-300 hover:shadow-sm'
//                         }`}
//                       >
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             {/* Time Range Header */}
//                             <div className="flex items-center gap-2 mb-3">
//                               <div className={`w-2 h-2 rounded-full ${stats.hasBooked ? 'bg-red-500' : 'bg-green-500'}`} />
//                               <span className={`font-semibold ${stats.hasBooked ? 'text-gray-700' : 'text-gray-900'}`}>
//                                 {formatTime(groupStartTime)} - {formatTime(groupEndTime)}
//                               </span>
//                               <span className="text-xs text-gray-500">
//                                 ({stats.totalHours}h total)
//                               </span>
//                             </div>
                            
//                             {/* Slot Statistics */}
//                             <div className="grid grid-cols-3 gap-2 mb-3">
//                               <div className="text-center">
//                                 <div className="text-lg font-bold text-gray-900">{stats.totalSlots}</div>
//                                 <div className="text-xs text-gray-500">Total</div>
//                               </div>
//                               <div className="text-center">
//                                 <div className="text-lg font-bold text-green-600">{stats.availableSlots}</div>
//                                 <div className="text-xs text-green-500">Available</div>
//                               </div>
//                               <div className="text-center">
//                                 <div className="text-lg font-bold text-red-600">{stats.bookedSlots}</div>
//                                 <div className="text-xs text-red-500">Booked</div>
//                               </div>
//                             </div>
                            
//                             {/* Status Badges */}
//                             <div className="flex flex-wrap gap-2">
//                               {stats.hasBooked && (
//                                 <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center gap-1">
//                                   <Users className="w-3 h-3" />
//                                   Booked
//                                 </span>
//                               )}
//                               {stats.hasLocked && (
//                                 <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center gap-1">
//                                   <Clock className="w-3 h-3" />
//                                   Locked
//                                 </span>
//                               )}
//                               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
//                                 <Clock className="w-3 h-3" />
//                                 15-min slots
//                               </span>
//                             </div>
//                           </div>
                          
//                           {/* Action Buttons */}
//                           <div className="flex flex-col gap-1 ml-2">
//                             {canEdit && (
//                               <>
//                                 <button
//                                   onClick={() => handleUpdateGroup(item)}
//                                   disabled={loading.action}
//                                   className="p-2 hover:bg-blue-50 rounded-lg transition text-blue-600 disabled:opacity-50"
//                                   title="Edit time range"
//                                 >
//                                   <Edit className="w-4 h-4" />
//                                 </button>
//                                 <button
//                                   onClick={() => handleDeleteGroup(item)}
//                                   disabled={loading.action}
//                                   className="p-2 hover:bg-red-50 rounded-lg transition text-red-600 disabled:opacity-50"
//                                   title="Delete time range"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </button>
//                               </>
//                             )}
//                             {stats.hasBooked && (
//                               <button
//                                 className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
//                                 title="View bookings"
//                                 onClick={() => window.open(`/mentor/bookings?date=${selectedDate}`, '_blank')}
//                               >
//                                 <ExternalLink className="w-4 h-4" />
//                               </button>
//                             )}
//                           </div>
//                         </div>
                        
//                         {stats.availableSlots > 0 && (
//                           <div className="mt-2 text-xs text-green-600">
//                             {stats.availableHours} hours available for booking
//                           </div>
//                         )}
                        
//                         {!canEdit && stats.hasBooked && (
//                           <div className="mt-2 text-xs text-gray-500">
//                             Contains booked slots - cannot edit/delete
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* Quick Tips */}
//               {hasSlots && (
//                 <div className="mt-8 pt-6 border-t border-gray-200">
//                   <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                     <Info className="w-4 h-4" />
//                     How It Works
//                   </h4>
//                   <ul className="space-y-2 text-sm text-gray-600">
//                     <li className="flex items-start gap-2">
//                       <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
//                       <span>Each time range is split into 15-minute slots</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
//                       <span>Students can book 15, 30, 45, or 60 minute sessions</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
//                       <span>Edit/Delete only when no slots are booked</span>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Tips Section */}
//         <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
//             <Zap className="w-5 h-5 text-blue-600" />
//             Best Practices
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
//               <div className="text-blue-700 font-semibold mb-3 flex items-center gap-2">
//                 <Clock className="w-5 h-5" />
//                 Optimal Time Blocks
//               </div>
//               <p className="text-sm text-gray-700">
//                 Create 2-4 hour blocks. System creates 15-min slots for flexible booking.
//               </p>
//             </div>
//             <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
//               <div className="text-green-700 font-semibold mb-3 flex items-center gap-2">
//                 <CalendarIcon className="w-5 h-5" />
//                 Consistent Schedule
//               </div>
//               <p className="text-sm text-gray-700">
//                 Set same hours weekly (e.g., every Wednesday 2-6 PM) for predictable availability.
//               </p>
//             </div>
//             <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
//               <div className="text-purple-700 font-semibold mb-3 flex items-center gap-2">
//                 <Users className="w-5 h-5" />
//                 Buffer Time
//               </div>
//               <p className="text-sm text-gray-700">
//                 Leave 15-30 minutes between time ranges for preparation between sessions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorAvailability;
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ExternalLink,
  Users,
  Zap,
  Sparkles,
  Target,
  Briefcase,
  Star
} from "lucide-react";

const MentorAvailability = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [groupedSlots, setGroupedSlots] = useState([]);
  const [loading, setLoading] = useState({ fetch: false, action: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Form state
  const [newTimeRange, setNewTimeRange] = useState({
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
    const todayStr = formatDateForAPI(today);
    setSelectedDate(todayStr);
    setNewTimeRange(prev => ({ ...prev, date: todayStr }));
    generateCalendar(today);
  }, []);

  // Fetch availability when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate]);

  // FIXED: Proper date formatting functions
  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (dateStr) => {
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

  const parseDateFromString = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Generate calendar days
  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      const dateStr = formatDateForAPI(new Date(year, month - 1, day));
      days.push({
        date: dateStr,
        day,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    const todayStr = formatDateForAPI(new Date());
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = formatDateForAPI(new Date(year, month, day));
      days.push({
        date: dateStr,
        day,
        isCurrentMonth: true,
        isToday: dateStr === todayStr
      });
    }
    
    const totalCells = 42;
    const nextMonthDays = totalCells - days.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      const dateStr = formatDateForAPI(new Date(year, month + 1, day));
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
    const todayStr = formatDateForAPI(today);
    setCurrentMonth(today);
    setSelectedDate(todayStr);
    setNewTimeRange(prev => ({ ...prev, date: todayStr }));
    generateCalendar(today);
  };

  // ✅ FETCH AVAILABILITY
  const fetchAvailability = async (date) => {
    try {
      setLoading(prev => ({ ...prev, fetch: true }));
      setError("");
      
      const response = await apiConnector(
        "GET",
        mentorEndpoints.GET_MY_AVAILABILITY,
        null,
        {},
        { date }
      );
      
      console.log("API Response:", response);
      
      if (response.data?.success) {
        setGroupedSlots(response.data.availability || []);
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

  // ✅ ADD TIME RANGE
  const handleAddTimeRange = async () => {
    if (!newTimeRange.date || !newTimeRange.startTime || !newTimeRange.endTime) {
      setError("Please fill all fields");
      return;
    }

    if (newTimeRange.startTime >= newTimeRange.endTime) {
      setError("End time must be after start time");
      return;
    }

    // Minimum 15 minutes
    const duration = calculateDuration(newTimeRange.startTime, newTimeRange.endTime);
    if (duration < 0.25) {
      setError("Minimum time range is 15 minutes");
      return;
    }

    try {
      setLoading(prev => ({ ...prev, action: true }));
      setError("");
      
      const response = await apiConnector(
        "POST",
        mentorEndpoints.ADD_AVAILABILITY,
        newTimeRange
      );
      
      if (response.data?.success) {
        setSuccess(`Added ${response.data.slotsCreated} slots successfully!`);
        setShowAddForm(false);
        setNewTimeRange({
          date: selectedDate,
          startTime: "",
          endTime: ""
        });
        fetchAvailability(selectedDate);
        
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.data?.message || "Failed to add time range");
      }
    } catch (error) {
      console.error("Error adding time range:", error);
      setError(error.response?.data?.message || "Failed to add availability");
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  // ✅ UPDATE TIME RANGE
  const handleUpdateGroup = async (group) => {
    const slots = extractSlots(group);
    if (slots.length === 0) {
      setError("No slots found in this group");
      return;
    }
    
    const groupStartTime = slots[0].startTime;
    const groupEndTime = slots[slots.length - 1].endTime;
    
    const newStartTime = prompt(`Enter new start time (HH:mm) for this time range:`, groupStartTime);
    if (!newStartTime) return;
    
    const newEndTime = prompt(`Enter new end time (HH:mm) for this time range:`, groupEndTime);
    if (!newEndTime) return;
    
    if (newStartTime >= newEndTime) {
      setError("End time must be after start time");
      return;
    }

    try {
      setLoading(prev => ({ ...prev, action: true }));
      setError("");
      
      const response = await apiConnector(
        "PUT",
        mentorEndpoints.UPDATE_AVAILABILITY,
        {
          date: selectedDate,
          startTime: groupStartTime,
          endTime: groupEndTime,
          newStartTime,
          newEndTime
        }
      );
      
      if (response.data?.success) {
        setSuccess("Time range updated successfully!");
        fetchAvailability(selectedDate);
        
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.data?.message || "Failed to update time range");
      }
    } catch (error) {
      console.error("Error updating time range:", error);
      setError(error.response?.data?.message || "Failed to update time range");
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  // ✅ DELETE TIME RANGE
  const handleDeleteGroup = async (group) => {
    const slots = extractSlots(group);
    if (slots.length === 0) {
      setError("No slots found in this group");
      return;
    }
    
    const groupStartTime = slots[0].startTime;
    const groupEndTime = slots[slots.length - 1].endTime;
    
    if (!window.confirm(`Are you sure you want to delete time range ${formatTime(groupStartTime)} - ${formatTime(groupEndTime)}?`)) {
      return;
    }

    try {
      setLoading(prev => ({ ...prev, action: true }));
      setError("");
      
      const response = await apiConnector(
        "DELETE",
        mentorEndpoints.DELETE_AVAILABILITY,
        {
          date: selectedDate,
          startTime: groupStartTime,
          endTime: groupEndTime
        }
      );
      
      if (response.data?.success) {
        setSuccess(`Deleted ${response.data.slotsDeleted} slots successfully!`);
        fetchAvailability(selectedDate);
        
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.data?.message || "Failed to delete time range");
      }
    } catch (error) {
      console.error("Error deleting time range:", error);
      setError(error.response?.data?.message || "Failed to delete time range");
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
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
    return parseFloat(duration.toFixed(2));
  };

  // Calculate stats for a group
  const calculateGroupStats = (group) => {
    const slots = extractSlots(group);
    const totalSlots = slots.length;
    const bookedSlots = slots.filter(slot => slot && slot.isBooked).length;
    const availableSlots = totalSlots - bookedSlots;
    const totalHours = (totalSlots * 0.25).toFixed(2);
    const availableHours = (availableSlots * 0.25).toFixed(2);
    
    return {
      totalSlots,
      bookedSlots,
      availableSlots,
      totalHours,
      availableHours,
      hasBooked: bookedSlots > 0,
      hasLocked: slots.some(slot => slot && slot.lockedUntil)
    };
  };

  // Check if group can be edited (no booked slots)
  const canEditGroup = (group) => {
    const slots = extractSlots(group);
    return !slots.some(slot => slot && (slot.isBooked || slot.lockedUntil));
  };

  // Get total stats for all groups
  const getTotalStats = () => {
    let totalSlots = 0;
    let bookedSlots = 0;
    
    groupedSlots.forEach(item => {
      const slots = extractSlots(item);
      slots.forEach(slot => {
        totalSlots++;
        if (slot.isBooked) bookedSlots++;
      });
    });
    
    return {
      totalSlots,
      bookedSlots,
      availableSlots: totalSlots - bookedSlots,
      totalHours: (totalSlots * 0.25).toFixed(2),
      availableHours: ((totalSlots - bookedSlots) * 0.25).toFixed(2)
    };
  };

  // Helper to extract slots from a group item
  const extractSlots = (item) => {
    if (Array.isArray(item)) {
      return item;
    } else if (item && typeof item === 'object') {
      if (Array.isArray(item.slots)) {
        return item.slots;
      } else if (item.startTime && item.endTime) {
        return [item];
      }
    }
    return [];
  };

  // Check if date has any slots
  const hasSlots = groupedSlots.length > 0;

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 }
  };

  // Background animation component
  const AnimatedBackground = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white overflow-hidden relative">
      <AnimatedBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
            >
              <CalendarIcon className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Availability Management
              </h1>
              <p className="text-gray-400">
                Manage your 15-minute time slots
              </p>
            </div>
          </div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </motion.div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Check className="w-5 h-5 text-green-400" />
                </motion.div>
                <p className="text-green-300 font-medium">{success}</p>
              </div>
              <button
                onClick={() => setSuccess("")}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </motion.div>
                <p className="text-red-300 font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-2xl shadow-2xl overflow-hidden border border-white/10"
            >
              {/* Calendar Header */}
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg"
                    >
                      <CalendarIcon className="w-6 h-6 text-indigo-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{monthName}</h2>
                      <p className="text-sm text-gray-400">Select a date to manage time ranges</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05, x: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevMonth}
                      disabled={loading.fetch}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goToToday}
                      disabled={loading.fetch}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
                    >
                      Today
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextMonth}
                      disabled={loading.fetch}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    const isSelected = day.date === selectedDate;
                    const isToday = day.isToday;
                    
                    return (
                      <motion.button
                        key={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.01 }}
                        onClick={() => {
                          setSelectedDate(day.date);
                          setNewTimeRange(prev => ({ ...prev, date: day.date }));
                        }}
                        disabled={loading.fetch || !day.isCurrentMonth}
                        className={`
                          relative h-14 rounded-xl transition-all duration-300
                          ${!day.isCurrentMonth ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300'}
                          ${isToday ? 'ring-2 ring-indigo-500 ring-inset' : ''}
                          ${isSelected 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                            : 'hover:bg-white/10 hover:scale-105'
                          }
                          flex flex-col items-center justify-center
                          disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                      >
                        <span className="text-lg font-medium">{day.day}</span>
                        {isToday && !isSelected && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-indigo-500"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Date Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border-t border-white/10 bg-gradient-to-r from-[#1f2937] to-[#111827]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Selected Date</h3>
                    <p className="text-gray-300">{formatDateForDisplay(selectedDate)}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddForm(!showAddForm)}
                    disabled={loading.action}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 disabled:opacity-50"
                  >
                    {showAddForm ? (
                      <>
                        <X className="w-4 h-4" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add Time Range
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Add Time Range Form */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 border-t border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Plus className="w-5 h-5 text-indigo-400" />
                        </motion.div>
                        Add New Time Range
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                              Start Time
                            </label>
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="time"
                              step="900"
                              value={newTimeRange.startTime}
                              onChange={(e) => setNewTimeRange({ ...newTimeRange, startTime: e.target.value })}
                              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                              End Time
                            </label>
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="time"
                              step="900"
                              value={newTimeRange.endTime}
                              onChange={(e) => setNewTimeRange({ ...newTimeRange, endTime: e.target.value })}
                              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                        
                        {newTimeRange.startTime && newTimeRange.endTime && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-6 rounded-xl border border-indigo-500/30"
                          >
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <p className="text-sm text-gray-300">Total Duration</p>
                                <p className="text-2xl font-bold text-indigo-400">
                                  {calculateDuration(newTimeRange.startTime, newTimeRange.endTime)} hours
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-300">15-min Slots Created</p>
                                <p className="text-2xl font-bold text-purple-400">
                                  {(calculateDuration(newTimeRange.startTime, newTimeRange.endTime) * 4).toFixed(0)} slots
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-4">
                              System will automatically create 15-minute slots within this time range
                            </p>
                          </motion.div>
                        )}
                        
                        <div className="flex gap-4">
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddTimeRange}
                            disabled={loading.action || !newTimeRange.startTime || !newTimeRange.endTime}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-3 disabled:opacity-50"
                          >
                            {loading.action ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating Slots...
                              </>
                            ) : (
                              <>
                                <Check className="w-5 h-5" />
                                Create Time Range
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Time Ranges Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-2xl shadow-2xl h-full border border-white/10"
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Time Ranges</h2>
                    <p className="text-sm text-gray-400">{formatDateForDisplay(selectedDate)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {loading.fetch ? (
                      <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                    ) : (
                      <motion.button
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => fetchAvailability(selectedDate)}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                        title="Refresh"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Stats */}
                {hasSlots && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 grid grid-cols-2 gap-4"
                  >
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 rounded-xl border border-green-500/20">
                      <div className="text-2xl font-bold text-green-400">
                        {getTotalStats().availableSlots}
                      </div>
                      <div className="text-sm text-green-300">Available Slots</div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-4 rounded-xl border border-indigo-500/20">
                      <div className="text-2xl font-bold text-indigo-400">
                        {groupedSlots.length}
                      </div>
                      <div className="text-sm text-indigo-300">Time Ranges</div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Time Ranges List */}
              <div className="p-6 h-[calc(100%-140px)] overflow-y-auto">
                {loading.fetch ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-4" />
                    <p className="text-gray-400">Loading time ranges...</p>
                  </div>
                ) : !hasSlots ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Clock className="w-8 h-8 text-gray-400" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-3">No Time Ranges</h3>
                    <p className="text-gray-400 mb-6">
                      Add a time range to create 15-minute slots automatically.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddForm(true)}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
                    >
                      Add Your First Time Range
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {groupedSlots.map((item, groupIndex) => {
                      const slots = extractSlots(item);
                      const stats = calculateGroupStats(item);
                      const canEdit = canEditGroup(item);
                      
                      if (slots.length === 0) return null;
                      
                      const groupStartTime = slots[0].startTime;
                      const groupEndTime = slots[slots.length - 1].endTime;
                      
                      return (
                        <motion.div
                          key={groupIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: groupIndex * 0.1 }}
                          whileHover={{ y: -2 }}
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            stats.hasBooked 
                              ? 'bg-gradient-to-br from-[#1f2937] to-[#111827] border-gray-700' 
                              : 'bg-gradient-to-br from-[#1f2937] to-[#111827] border-indigo-500/30 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              {/* Time Range Header */}
                              <div className="flex items-center gap-3 mb-4">
                                <motion.div
                                  animate={{ 
                                    scale: stats.hasBooked ? [1, 1.2, 1] : [1, 1.1, 1],
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className={`w-2 h-2 rounded-full ${stats.hasBooked ? 'bg-red-500' : 'bg-green-500'}`}
                                />
                                <span className={`text-lg font-semibold ${stats.hasBooked ? 'text-gray-300' : 'text-white'}`}>
                                  {formatTime(groupStartTime)} - {formatTime(groupEndTime)}
                                </span>
                                <span className="text-xs text-gray-400">
                                  ({stats.totalHours}h total)
                                </span>
                              </div>
                              
                              {/* Slot Statistics */}
                              <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="text-center">
                                  <div className="text-xl font-bold text-gray-300">{stats.totalSlots}</div>
                                  <div className="text-xs text-gray-400">Total</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-green-400">{stats.availableSlots}</div>
                                  <div className="text-xs text-green-300">Available</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-red-400">{stats.bookedSlots}</div>
                                  <div className="text-xs text-red-300">Booked</div>
                                </div>
                              </div>
                              
                              {/* Status Badges */}
                              <div className="flex flex-wrap gap-2">
                                {stats.hasBooked && (
                                  <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs flex items-center gap-1"
                                  >
                                    <Users className="w-3 h-3" />
                                    Booked
                                  </motion.span>
                                )}
                                {stats.hasLocked && (
                                  <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs flex items-center gap-1"
                                  >
                                    <Clock className="w-3 h-3" />
                                    Locked
                                  </motion.span>
                                )}
                                <motion.span
                                  whileHover={{ scale: 1.05 }}
                                  className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs flex items-center gap-1"
                                >
                                  <Clock className="w-3 h-3" />
                                  15-min slots
                                </motion.span>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 ml-2">
                              {canEdit && (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleUpdateGroup(item)}
                                    disabled={loading.action}
                                    className="w-10 h-10 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                                    title="Edit time range"
                                  >
                                    <Edit className="w-4 h-4 text-indigo-400" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDeleteGroup(item)}
                                    disabled={loading.action}
                                    className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                                    title="Delete time range"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                  </motion.button>
                                </>
                              )}
                              {stats.hasBooked && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-10 h-10 rounded-xl bg-gray-500/20 hover:bg-gray-500/30 flex items-center justify-center transition-all duration-300"
                                  title="View bookings"
                                  onClick={() => window.open(`/mentor/bookings?date=${selectedDate}`, '_blank')}
                                >
                                  <ExternalLink className="w-4 h-4 text-gray-400" />
                                </motion.button>
                              )}
                            </div>
                          </div>
                          
                          {stats.availableSlots > 0 && (
                            <div className="mt-3 text-sm text-green-400">
                              {stats.availableHours} hours available for booking
                            </div>
                          )}
                          
                          {!canEdit && stats.hasBooked && (
                            <div className="mt-3 text-xs text-gray-500">
                              Contains booked slots - cannot edit/delete
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-2xl shadow-2xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-6 h-6 text-indigo-400" />
            </motion.div>
            Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 rounded-xl border border-indigo-500/20"
            >
              <div className="text-indigo-400 font-semibold mb-4 flex items-center gap-3">
                <Clock className="w-5 h-5" />
                Optimal Time Blocks
              </div>
              <p className="text-gray-300 text-sm">
                Create 2-4 hour blocks. System creates 15-min slots for flexible booking.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20"
            >
              <div className="text-green-400 font-semibold mb-4 flex items-center gap-3">
                <CalendarIcon className="w-5 h-5" />
                Consistent Schedule
              </div>
              <p className="text-gray-300 text-sm">
                Set same hours weekly (e.g., every Wednesday 2-6 PM) for predictable availability.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl border border-purple-500/20"
            >
              <div className="text-purple-400 font-semibold mb-4 flex items-center gap-3">
                <Users className="w-5 h-5" />
                Buffer Time
              </div>
              <p className="text-gray-300 text-sm">
                Leave 15-30 minutes between time ranges for preparation between sessions.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorAvailability;