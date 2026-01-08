// import { useEffect, useState } from "react";
// import { apiConnector } from "../../Service/apiConnector";
// import { mentorEndpoints } from "../../Service/apis";
// import {
//   Briefcase,
//   GraduationCap,
//   DollarSign,
//   Award,
//   Calendar,
//   Star,
//   CheckCircle,
//   X,
//   Plus,
//   Edit2,
//   Save,
//   Loader2,
//   TrendingUp,
//   Users,
//   Clock
// } from "lucide-react";

// const expertiseOptions = [
//   "DSA",
//   "Web Development",
//   "Machine Learning",
//   "System Design",
//   "Backend",
//   "Frontend",
//   "React.js",
//   "Node.js",
//   "Python",
//   "Java",
//   "AWS",
//   "DevOps",
//   "Mobile Development",
//   "UI/UX Design",
//   "Data Science",
//   "Interview Preparation",
//   "Resume Review",
//   "Career Guidance",
// ];

// const MentorAbout = () => {
//   const [mentor, setMentor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [stat, setstat] = useState(null);
//   const [sessionT, setT] = useState(0);
//   const [showSkillSelector, setShowSkillSelector] = useState(false);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [addingSkills, setAddingSkills] = useState(false);

//   // Session price editing state
//   const [editingPrice, setEditingPrice] = useState(false);
//   const [newPrice, setNewPrice] = useState("");
//   const [updatingPrice, setUpdatingPrice] = useState(false);
//   const [priceError, setPriceError] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await apiConnector("GET", mentorEndpoints.ABOUT);
//         const totalsession = await apiConnector("GET", mentorEndpoints.Totalsession);
//         const Mentorstat = await apiConnector("GET", mentorEndpoints.Mentorstat);

//         console.log("res", Mentorstat);
//         setstat(Mentorstat.data.stats);
//         setT(totalsession.data.totalSessions);
//         setMentor(res.data.mentor);
//         // Initialize new price with current session price
//         if (res.data.mentor) {
//           setNewPrice(res.data.mentor.sessionPrice.toString());
//         }
//       } catch (error) {
//         console.error("Error loading mentor data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   // Filter out skills that mentor already has
//   const availableSkills = mentor ? expertiseOptions.filter(
//     skill => !mentor.expertise.includes(skill)
//   ) : [];

//   const handleAddSkillClick = () => {
//     setShowSkillSelector(true);
//     setSelectedSkills([]);
//   };

//   const handleSkillToggle = (skill) => {
//     setSelectedSkills(prev =>
//       prev.includes(skill)
//         ? prev.filter(s => s !== skill)
//         : [...prev, skill]
//     );
//   };

//   const handleSaveSkills = async () => {
//     if (selectedSkills.length === 0) return;

//     try {
//       setAddingSkills(true);

//       // API call to update mentor expertise
//       await apiConnector("PUT", mentorEndpoints.UPDATE_EXPERTISE, {
//         expertise: [...mentor.expertise, ...selectedSkills]
//       });

//       // Update local state
//       setMentor(prev => ({
//         ...prev,
//         expertise: [...prev.expertise, ...selectedSkills]
//       }));

//       // Close selector
//       setShowSkillSelector(false);
//       setSelectedSkills([]);
//       alert("Skills added successfully!");
//     } catch (error) {
//       console.error("Error adding skills:", error);
//       alert("Failed to add skills");
//     } finally {
//       setAddingSkills(false);
//     }
//   };

//   const handleRemoveSkill = async (skillToRemove) => {
//     try {
//       const updatedExpertise = mentor.expertise.filter(skill => skill !== skillToRemove);

//       // API call to update expertise
//       await apiConnector("PUT", mentorEndpoints.UPDATE_EXPERTISE, {
//         expertise: updatedExpertise
//       });

//       // Update local state
//       setMentor(prev => ({
//         ...prev,
//         expertise: updatedExpertise
//       }));

//       alert("Skill removed successfully!");
//     } catch (error) {
//       console.error("Error removing skill:", error);
//       alert("Failed to remove skill");
//     }
//   };

//   // Handle session price update
//   const handleStartEditPrice = () => {
//     setEditingPrice(true);
//     setPriceError("");
//     setNewPrice(mentor.sessionPrice.toString());
//   };

//   const handleCancelEditPrice = () => {
//     setEditingPrice(false);
//     setPriceError("");
//     setNewPrice(mentor.sessionPrice.toString());
//   };

//   const handleSavePrice = async () => {
//     // Validate input
//     if (!newPrice.trim()) {
//       setPriceError("Price is required");
//       return;
//     }

//     const priceNum = parseFloat(newPrice);
//     if (isNaN(priceNum) || priceNum < 0) {
//       setPriceError("Please enter a valid positive number");
//       return;
//     }

//     if (priceNum === mentor.sessionPrice) {
//       setEditingPrice(false);
//       return;
//     }

//     try {
//       setUpdatingPrice(true);
//       setPriceError("");

//       // API call to update session price
//       const response = await apiConnector(
//         "PUT",
//         mentorEndpoints.UPDATE_SESSION_PRICE,
//         { sessionPrice: priceNum }
//       );

//       if (response.data.success) {
//         // Update local state
//         setMentor(prev => ({
//           ...prev,
//           sessionPrice: priceNum
//         }));
//         setEditingPrice(false);
//         alert("Session price updated successfully!");
//       } else {
//         setPriceError(response.data.message || "Failed to update price");
//       }
//     } catch (error) {
//       console.error("Error updating session price:", error);
//       setPriceError(error.response?.data?.message || "Failed to update price");
//     } finally {
//       setUpdatingPrice(false);
//     }
//   };

//   const handlePriceInput = (e) => {
//     const value = e.target.value;
//     // Allow only numbers and decimal point
//     if (value === "" || /^\d*\.?\d*$/.test(value)) {
//       setNewPrice(value);
//       if (priceError) setPriceError("");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
//           <p className="mt-4 text-gray-600">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!mentor) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-8">
//         <div className="max-w-md mx-auto text-center">
//           <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Briefcase className="h-10 w-10 text-gray-400" />
//           </div>
//           <h3 className="text-xl font-semibold mb-2">No Profile Found</h3>
//           <p className="text-gray-600 mb-6">
//             Complete your mentor profile to start accepting sessions
//           </p>
//           <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
//             Setup Profile
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
//       {/* Skill Selector Modal */}
//       {showSkillSelector && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
//             {/* Header */}
//             <div className="px-6 py-4 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   Add Skills ({selectedSkills.length} selected)
//                 </h3>
//                 <button
//                   onClick={() => setShowSkillSelector(false)}
//                   className="p-2 hover:bg-gray-100 rounded-lg"
//                   disabled={addingSkills}
//                 >
//                   <X className="h-5 w-5 text-gray-500" />
//                 </button>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">
//                 Select skills from the list below. Skills you already have are hidden.
//               </p>
//             </div>

//             {/* Skill Grid */}
//             <div className="p-6 overflow-y-auto max-h-[50vh]">
//               {availableSkills.length > 0 ? (
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                   {availableSkills.map((skill) => (
//                     <button
//                       key={skill}
//                       onClick={() => handleSkillToggle(skill)}
//                       disabled={addingSkills}
//                       className={`p-3 rounded-lg border-2 transition-all ${
//                         selectedSkills.includes(skill)
//                           ? "border-indigo-500 bg-indigo-50 text-indigo-700"
//                           : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//                       } ${addingSkills ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <span className="font-medium">{skill}</span>
//                         {selectedSkills.includes(skill) && (
//                           <div className="h-5 w-5 bg-indigo-500 rounded-full flex items-center justify-center">
//                             <div className="h-2 w-2 bg-white rounded-full" />
//                           </div>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Award className="h-8 w-8 text-gray-400" />
//                   </div>
//                   <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                     All Skills Added
//                   </h4>
//                   <p className="text-gray-600">
//                     You've already added all available skills to your profile.
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//               <div className="flex items-center justify-between">
//                 <div>
//                   {selectedSkills.length > 0 && (
//                     <div className="flex flex-wrap gap-2">
//                       <span className="text-sm text-gray-600">Selected:</span>
//                       {selectedSkills.map(skill => (
//                         <span
//                           key={skill}
//                           className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowSkillSelector(false)}
//                     disabled={addingSkills}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSaveSkills}
//                     disabled={selectedSkills.length === 0 || addingSkills}
//                     className={`px-6 py-2 rounded-lg font-medium ${
//                       selectedSkills.length > 0 && !addingSkills
//                         ? "bg-indigo-600 hover:bg-indigo-700 text-white"
//                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                   >
//                     {addingSkills ? (
//                       <span className="flex items-center gap-2">
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         Adding...
//                       </span>
//                     ) : (
//                       `Add ${selectedSkills.length > 0 ? `(${selectedSkills.length})` : ""} Skills`
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor Dashboard</h1>
//           <p className="text-gray-600">
//             Manage your profile, skills, and session pricing
//           </p>
//         </div>

//         {/* Stats Grid
//         {stat && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Revenue</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">
//                     ₹{stat.totalEarnings || 0}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
//                   <TrendingUp className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Sessions</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">
//                     {sessionT || 0}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
//                   <Calendar className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </div>

//           </div>
//         )} */}

//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
//           {/* Profile Header */}
//           <div className="p-8 border-b border-gray-200">
//             <div className="flex flex-col md:flex-row md:items-start gap-6">
//               <div className="h-24 w-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
//                 {mentor.name.charAt(0)}
//               </div>

//               <div className="flex-1">
//                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-1">
//                       {mentor.name}
//                     </h2>
//                     <div className="flex flex-wrap items-center gap-3 mb-4">
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <Briefcase className="h-4 w-4 text-gray-500" />
//                         <span>{mentor.jobTitle}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <GraduationCap className="h-4 w-4 text-gray-500" />
//                         <span>{mentor.college}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-700">
//                         <Clock className="h-4 w-4 text-gray-500" />
//                         <span>{mentor.yearsOfExperience || 0} years exp</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Session Price Section */}
//                   <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 min-w-[280px]">
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                         <DollarSign className="h-5 w-5 text-green-600" />
//                         Session Price
//                       </h3>
//                       {!editingPrice && (
//                         <button
//                           onClick={handleStartEditPrice}
//                           className="p-1.5 hover:bg-green-100 rounded-lg transition"
//                           title="Edit price"
//                         >
//                           <Edit2 className="h-4 w-4 text-green-600" />
//                         </button>
//                       )}
//                     </div>

//                     {editingPrice ? (
//                       <div>
//                         <div className="relative mb-2">
//                           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">
//                             ₹
//                           </div>
//                           <input
//                             type="text"
//                             value={newPrice}
//                             onChange={handlePriceInput}
//                             placeholder="Enter new price"
//                             className="w-full pl-8 pr-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                             autoFocus
//                           />
//                         </div>
//                         {priceError && (
//                           <p className="text-red-600 text-sm mb-2">{priceError}</p>
//                         )}
//                         <div className="flex gap-2">
//                           <button
//                             onClick={handleCancelEditPrice}
//                             disabled={updatingPrice}
//                             className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm disabled:opacity-50"
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             onClick={handleSavePrice}
//                             disabled={updatingPrice || !newPrice.trim()}
//                             className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
//                           >
//                             {updatingPrice ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin" />
//                                 Updating...
//                               </>
//                             ) : (
//                               <>
//                                 <Save className="h-4 w-4" />
//                                 Save
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-3xl font-bold text-green-700">
//                             ₹{mentor.sessionPrice}
//                           </p>
//                           <p className="text-sm text-green-600 mt-1">
//                             Per hour session
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm text-gray-600">Current Rate</p>
//                           <p className="text-xs text-gray-500">
//                             Students see this price
//                           </p>
//                         </div>
//                       </div>
//                     )}

//                     {!editingPrice && (
//                       <div className="mt-3 pt-3 border-t border-green-200">
//                         <p className="text-xs text-gray-600">
//                           Tip: Competitive pricing can help attract more students
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <p className="text-gray-700">
//                     {mentor.currentCompany} • {mentor.yearsOfExperience || 0}+ years experience
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Expertise Section */}
//           <div className="p-8 border-b border-gray-200">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                 <Award className="h-5 w-5 text-indigo-600" />
//                 Expertise & Skills
//               </h3>
//               <button
//                 onClick={handleAddSkillClick}
//                 disabled={availableSkills.length === 0}
//                 className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition ${
//                   availableSkills.length > 0
//                     ? "bg-indigo-600 hover:bg-indigo-700 text-white"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 <Plus className="h-4 w-4" />
//                 Add Skill
//               </button>
//             </div>

//             {/* Current Skills */}
//             {mentor.expertise.length > 0 ? (
//               <div className="flex flex-wrap gap-3 mb-6">
//                 {mentor.expertise.map((skill, index) => (
//                   <div
//                     key={index}
//                     className="group relative px-4 py-2 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 text-indigo-700 rounded-lg font-medium flex items-center gap-2 hover:pr-8 transition-all"
//                   >
//                     <CheckCircle className="h-4 w-4 text-indigo-500" />
//                     {skill}
//                     <button
//                       onClick={() => handleRemoveSkill(skill)}
//                       className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-indigo-200 rounded"
//                       title="Remove skill"
//                     >
//                       <X className="h-3 w-3 text-indigo-500 hover:text-indigo-700" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-6 bg-gray-50 rounded-xl mb-6">
//                 <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                 <p className="text-gray-600 mb-2">No skills added yet</p>
//                 <p className="text-sm text-gray-500">
//                   Add skills to showcase your expertise to students
//                 </p>
//               </div>
//             )}

//             {/* Skills Stats */}
//             <div className="flex items-center gap-6 text-sm text-gray-600">
//               <div className="flex items-center gap-2">
//                 <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
//                 <span>{mentor.expertise.length} skills added</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
//                 <span>{availableSkills.length} more available</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="h-3 w-3 bg-green-500 rounded-full"></div>
//                 <span>Top skills attract 40% more bookings</span>
//               </div>
//             </div>
//           </div>

//           {/* Experience & Details Section */}
//           <div className="p-8">
//             <h3 className="text-lg font-semibold text-gray-900 mb-6">
//               Profile Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <Briefcase className="h-5 w-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Current Company</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {mentor.currentCompany}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                     <GraduationCap className="h-5 w-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">College</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {mentor.college}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
//                     <Clock className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Experience</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {mentor.yearsOfExperience || 0} years
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
//                     <Calendar className="h-5 w-5 text-yellow-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Total Sessions</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {sessionT || 0} completed
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Pricing Tips */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-8">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <TrendingUp className="h-5 w-5 text-blue-600" />
//             Pricing Strategy Tips
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="p-4 bg-white rounded-xl border border-blue-100">
//               <div className="text-blue-600 font-semibold mb-2">💰 Market Rates</div>
//               <p className="text-sm text-gray-700">
//                 Beginner mentors: ₹500-800/hour<br />
//                 Experienced: ₹800-1500/hour<br />
//                 Industry experts: ₹1500+/hour
//               </p>
//             </div>
//             <div className="p-4 bg-white rounded-xl border border-blue-100">
//               <div className="text-green-600 font-semibold mb-2">📈 Increase Gradually</div>
//               <p className="text-sm text-gray-700">
//                 Start competitive, increase by 10-20% as you get more reviews and bookings.
//               </p>
//             </div>
//             <div className="p-4 bg-white rounded-xl border border-blue-100">
//               <div className="text-purple-600 font-semibold mb-2">🎯 Value Proposition</div>
//               <p className="text-sm text-gray-700">
//                 Higher prices should match your expertise, availability, and success rate.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorAbout;

import { useEffect, useState } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { mentorEndpoints } from "../../Service/apis";
import {
  Briefcase,
  GraduationCap,
  DollarSign,
  Award,
  Calendar,
  Star,
  CheckCircle,
  X,
  Plus,
  Edit2,
  Save,
  Loader2,
  TrendingUp,
  Users,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Eye,
  EyeOff,
  FileText,
  BarChart3,
  CreditCard,
  User,
  BookOpen,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const expertiseOptions = [
  "DSA",
  "Web Development",
  "Machine Learning",
  "System Design",
  "Backend",
  "Frontend",
  "React.js",
  "Node.js",
  "Python",
  "Java",
  "AWS",
  "DevOps",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "Interview Preparation",
  "Resume Review",
  "Career Guidance",
];

const MentorAbout = () => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stat, setstat] = useState(null);
  const [sessionT, setT] = useState(0);
  const [showSkillSelector, setShowSkillSelector] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [addingSkills, setAddingSkills] = useState(false);

  // Session price editing state
  const [editingPrice, setEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [updatingPrice, setUpdatingPrice] = useState(false);
  const [priceError, setPriceError] = useState("");

  // Floating elements for background
  const FloatingElements = () => (
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

  const BoxesBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );

  const MeteorsEffect = ({ number = 10, className = "" }) => {
    const [meteors, setMeteors] = useState([]);

    useEffect(() => {
      const newMeteors = Array.from({ length: number }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
        size: 1 + Math.random() * 2,
      }));
      setMeteors(newMeteors);
    }, [number]);

    return (
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      >
        {meteors.map((meteor) => (
          <motion.div
            key={meteor.id}
            className="absolute h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full"
            style={{
              left: `${meteor.left}%`,
              top: "-10px",
              width: `${meteor.size * 50}px`,
              rotate: "45deg",
            }}
            animate={{
              top: ["-10px", "110%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: meteor.duration,
              delay: meteor.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiConnector("GET", mentorEndpoints.ABOUT);
        const totalsession = await apiConnector(
          "GET",
          mentorEndpoints.Totalsession
        );
        const Mentorstat = await apiConnector(
          "GET",
          mentorEndpoints.Mentorstat
        );

        console.log("res", Mentorstat);
        setstat(Mentorstat.data.stats);
        setT(totalsession.data.totalSessions);
        setMentor(res.data.mentor);
        // Initialize new price with current session price
        if (res.data.mentor) {
          setNewPrice(res.data.mentor.sessionPrice.toString());
        }
      } catch (error) {
        console.error("Error loading mentor data:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filter out skills that mentor already has
  const availableSkills = mentor
    ? expertiseOptions.filter((skill) => !mentor.expertise.includes(skill))
    : [];

  const handleAddSkillClick = () => {
    setShowSkillSelector(true);
    setSelectedSkills([]);
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSaveSkills = async () => {
    if (selectedSkills.length === 0) return;

    try {
      setAddingSkills(true);

      // API call to update mentor expertise
      await apiConnector("PUT", mentorEndpoints.UPDATE_EXPERTISE, {
        expertise: [...mentor.expertise, ...selectedSkills],
      });

      // Update local state
      setMentor((prev) => ({
        ...prev,
        expertise: [...prev.expertise, ...selectedSkills],
      }));

      // Close selector
      setShowSkillSelector(false);
      setSelectedSkills([]);
      alert("Skills added successfully!");
    } catch (error) {
      console.error("Error adding skills:", error);
      alert("Failed to add skills");
    } finally {
      setAddingSkills(false);
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    try {
      const updatedExpertise = mentor.expertise.filter(
        (skill) => skill !== skillToRemove
      );

      // API call to update expertise
      await apiConnector("PUT", mentorEndpoints.UPDATE_EXPERTISE, {
        expertise: updatedExpertise,
      });

      // Update local state
      setMentor((prev) => ({
        ...prev,
        expertise: updatedExpertise,
      }));

      alert("Skill removed successfully!");
    } catch (error) {
      console.error("Error removing skill:", error);
      alert("Failed to remove skill");
    }
  };

  // Handle session price update
  const handleStartEditPrice = () => {
    setEditingPrice(true);
    setPriceError("");
    setNewPrice(mentor.sessionPrice.toString());
  };

  const handleCancelEditPrice = () => {
    setEditingPrice(false);
    setPriceError("");
    setNewPrice(mentor.sessionPrice.toString());
  };

  const handleSavePrice = async () => {
    // Validate input
    if (!newPrice.trim()) {
      setPriceError("Price is required");
      return;
    }

    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum) || priceNum < 0) {
      setPriceError("Please enter a valid positive number");
      return;
    }

    if (priceNum === mentor.sessionPrice) {
      setEditingPrice(false);
      return;
    }

    try {
      setUpdatingPrice(true);
      setPriceError("");

      // API call to update session price
      const response = await apiConnector(
        "PUT",
        mentorEndpoints.UPDATE_SESSION_PRICE,
        { sessionPrice: priceNum }
      );

      if (response.data.success) {
        // Update local state
        setMentor((prev) => ({
          ...prev,
          sessionPrice: priceNum,
        }));
        setEditingPrice(false);
        alert("Session price updated successfully!");
      } else {
        setPriceError(response.data.message || "Failed to update price");
      }
    } catch (error) {
      console.error("Error updating session price:", error);
      setPriceError(error.response?.data?.message || "Failed to update price");
    } finally {
      setUpdatingPrice(false);
    }
  };

  const handlePriceInput = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setNewPrice(value);
      if (priceError) setPriceError("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="h-20 w-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Briefcase className="h-10 w-10 text-indigo-400" />
          </motion.div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Profile Found
          </h3>
          <p className="text-gray-300 mb-6">
            Complete your mentor profile to start accepting sessions
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
          >
            Setup Profile
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white relative overflow-hidden">
      <BoxesBackground />
      <MeteorsEffect number={8} />
      <FloatingElements />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
                Mentor Dashboard
              </span>
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Mentor Profile
            </h1>
            <p className="text-gray-300">
              Manage your profile, skills, and session pricing
            </p>
          </motion.div>

          {/* Stats Grid */}
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Profile Header */}
              <div className="p-6 md:p-8 border-b border-white/10">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {mentor.name.charAt(0)}
                    </div>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-4 border-[#1f2937]"
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {mentor.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Briefcase className="h-4 w-4 text-gray-400" />
                            <span>{mentor.jobTitle}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <GraduationCap className="h-4 w-4 text-gray-400" />
                            <span>{mentor.college}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>
                              {mentor.yearsOfExperience || 0} years exp
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>
                            {mentor.user.email || "Not provided"} 
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-400">
                          {mentor.currentCompany} •{" "}
                          {mentor.yearsOfExperience || 0}+ years experience
                        </p>
                      </div>

                      {/* Session Price Section */}
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20 min-w-[280px]">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-400" />
                            Session Price
                          </h3>
                          {!editingPrice && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleStartEditPrice}
                              className="p-1.5 hover:bg-green-500/10 rounded-lg transition"
                              title="Edit price"
                            >
                              <Edit2 className="h-4 w-4 text-green-400" />
                            </motion.button>
                          )}
                        </div>

                        {editingPrice ? (
                          <div>
                            <div className="relative mb-3">
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
                                ₹
                              </div>
                              <input
                                type="text"
                                value={newPrice}
                                onChange={handlePriceInput}
                                placeholder="Enter new price"
                                className="w-full pl-8 pr-4 py-2 bg-white/5 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                                autoFocus
                              />
                            </div>
                            {priceError && (
                              <p className="text-red-400 text-sm mb-2">
                                {priceError}
                              </p>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={handleCancelEditPrice}
                                disabled={updatingPrice}
                                className="flex-1 px-3 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition font-medium text-sm disabled:opacity-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSavePrice}
                                disabled={updatingPrice || !newPrice.trim()}
                                className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                              >
                                {updatingPrice ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Updating...
                                  </>
                                ) : (
                                  <>
                                    <Save className="h-4 w-4" />
                                    Save
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="text-3xl font-bold text-green-400">
                                  ₹{mentor.sessionPrice}
                                </p>
                                <p className="text-sm text-green-400/80 mt-1">
                                  Per hour session
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-400">
                                  Current Rate
                                </p>
                                <p className="text-xs text-gray-500">
                                  Students see this price
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-green-500/20">
                              <p className="text-xs text-gray-400">
                                Tip: Competitive pricing can help attract more
                                students
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expertise Section */}
              <div className="p-6 md:p-8 border-b border-white/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg">
                      <Award className="h-5 w-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Expertise & Skills
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddSkillClick}
                    disabled={availableSkills.length === 0}
                    className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition ${
                      availableSkills.length > 0
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        : "bg-white/5 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    Add Skill
                  </motion.button>
                </div>

                {/* Current Skills */}
                {mentor.expertise.length > 0 ? (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {mentor.expertise.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -2 }}
                        className="group relative"
                      >
                        <div className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl font-medium flex items-center gap-2 hover:pr-8 transition-all">
                          <CheckCircle className="h-4 w-4 text-indigo-400" />
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-indigo-500/20 rounded"
                            title="Remove skill"
                          >
                            <X className="h-3 w-3 text-indigo-400 hover:text-indigo-300" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-white/5 rounded-xl mb-6">
                    <Award className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 mb-2">No skills added yet</p>
                    <p className="text-sm text-gray-500">
                      Add skills to showcase your expertise to students
                    </p>
                  </div>
                )}

                {/* Skills Stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
                    <span>{mentor.expertise.length} skills added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
                    <span>{availableSkills.length} more available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span>Top skills attract 40% more bookings</span>
                  </div>
                </div>
              </div>

              {/* Experience & Details Section */}
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-indigo-400" />
                  Profile Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DetailCard
                    icon={Briefcase}
                    label="Current Company"
                    value={mentor.currentCompany}
                    color="blue"
                  />
                  <DetailCard
                    icon={GraduationCap}
                    label="College"
                    value={mentor.college}
                    color="purple"
                  />
                  <DetailCard
                    icon={Clock}
                    label="Experience"
                    value={`${mentor.yearsOfExperience || 0} years`}
                    color="green"
                  />
                  <DetailCard
                    icon={Calendar}
                    label="Total Sessions"
                    value={`${sessionT || 0} completed`}
                    color="yellow"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-400" />
                Pricing Strategy Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TipCard
                  title="💰 Market Rates"
                  color="blue"
                  tips={[
                    "Beginner mentors: ₹500-800/hour",
                    "Experienced: ₹800-1500/hour",
                    "Industry experts: ₹1500+/hour",
                  ]}
                />
                <TipCard
                  title="📈 Increase Gradually"
                  color="green"
                  tips={[
                    "Start competitive",
                    "Increase by 10-20% as you get more reviews",
                    "Adjust based on demand",
                  ]}
                />
                <TipCard
                  title="🎯 Value Proposition"
                  color="purple"
                  tips={[
                    "Higher prices = more expertise",
                    "Match your availability",
                    "Highlight success rate",
                  ]}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skill Selector Modal */}
      <AnimatePresence>
        {showSkillSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => !addingSkills && setShowSkillSelector(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      Add Skills
                    </h3>
                    <p className="text-sm text-gray-400">
                      Select skills from the list below. Skills you already have
                      are hidden.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSkillSelector(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition"
                    disabled={addingSkills}
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-indigo-400 font-medium">
                    {selectedSkills.length} selected
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">
                    {availableSkills.length} available
                  </span>
                </div>
              </div>

              {/* Skill Grid */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {availableSkills.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableSkills.map((skill) => (
                      <motion.button
                        key={skill}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSkillToggle(skill)}
                        disabled={addingSkills}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedSkills.includes(skill)
                            ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                            : "border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-300"
                        } ${
                          addingSkills ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill}</span>
                          {selectedSkills.includes(skill) && (
                            <div className="h-5 w-5 bg-indigo-500 rounded-full flex items-center justify-center">
                              <div className="h-2 w-2 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-gray-500" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      All Skills Added
                    </h4>
                    <p className="text-gray-400">
                      You've already added all available skills to your profile.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-white/5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    {selectedSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-400">Selected:</span>
                        {selectedSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowSkillSelector(false)}
                      disabled={addingSkills}
                      className="px-4 py-2 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 font-medium disabled:opacity-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveSkills}
                      disabled={selectedSkills.length === 0 || addingSkills}
                      className={`px-6 py-2 rounded-xl font-medium transition ${
                        selectedSkills.length > 0 && !addingSkills
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                          : "bg-white/10 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {addingSkills ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Adding...
                        </span>
                      ) : (
                        `Add ${selectedSkills.length} Skill${
                          selectedSkills.length !== 1 ? "s" : ""
                        }`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/20 text-blue-400",
    purple:
      "from-purple-500/20 to-pink-500/20 border-purple-500/20 text-purple-400",
    green:
      "from-green-500/20 to-emerald-500/20 border-green-500/20 text-green-400",
    yellow:
      "from-yellow-500/20 to-amber-500/20 border-yellow-500/20 text-yellow-400",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative group`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
      ></div>
      <div className="relative bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-xl p-5 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`p-2 bg-gradient-to-br ${colorClasses[color]} rounded-lg`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-lg font-semibold text-white">{value}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TipCard = ({ title, tips, color }) => {
  const colorClasses = {
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400",
    green:
      "from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-400",
    purple:
      "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-4 border backdrop-blur-sm`}
    >
      <div className="font-semibold mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-gray-300">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-current mt-1.5 flex-shrink-0 opacity-60"></div>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MentorAbout;
