// import { useEffect, useState } from "react";
// import { apiConnector } from "../../Service/apiConnector";
// import { mentorEndpoints } from "../../Service/apis";
// import { Briefcase, GraduationCap, DollarSign, Award, Calendar, Star, CheckCircle, X, Plus } from "lucide-react";

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

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await apiConnector("GET", mentorEndpoints.ABOUT);
//         const totalsession = await apiConnector(
//           "Get",
//           mentorEndpoints.Totalsession
//         );
//         const Mentorstat = await apiConnector(
//           "Get",
//           mentorEndpoints.Mentorstat
//         );
//         console.log("res", Mentorstat);
//         setstat(Mentorstat.data.stats);
//         setT(totalsession.data.totalSessions);
//         setMentor(res.data.mentor);
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

//   if (loading) {
//     return (
//       <div className="p-8">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
//           <div className="h-64 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!mentor) {
//     return (
//       <div className="p-8 text-center">
//         <div className="max-w-md mx-auto">
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
//     <div className="p-8">
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
//                         <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">About You</h1>
//           <p className="text-gray-600">
//             Manage your mentor profile and expertise
//           </p>
//         </div>
//         <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
//           Edit Profile
//         </button>
//       </div>

//       {/* Profile Card */}
//       <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">
//         <div className="p-8">
//           <div className="flex items-start gap-6">
//             <div className="h-24 w-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
//               {mentor.name.charAt(0)}
//             </div>

//             <div className="flex-1">
//               <h2 className="text-2xl font-bold text-gray-900 mb-1">
//                 {mentor.name}
//               </h2>
//               <div className="flex items-center gap-2 mb-4">
//                 <Briefcase className="h-4 w-4 text-gray-500" />
//                 <p className="text-gray-700">
//                   {mentor.jobTitle} @ {mentor.currentCompany}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2 mb-4">
//                 <GraduationCap className="h-4 w-4 text-gray-500" />
//                 <p className="text-gray-700">{mentor.college}</p>
//               </div>

//               {/* Price Badge */}
//               <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-lg">
//                 <DollarSign className="h-5 w-5 text-green-600" />
//                 <span className="text-lg font-bold text-green-700">
//                   ₹{mentor.sessionPrice}
//                 </span>
//                 <span className="text-green-600">/ hour</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Expertise Section */}
//         <div className="border-t border-gray-200 p-8">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <Award className="h-5 w-5 text-indigo-600" />
//               Expertise & Skills
//             </h3>
//             <button
//               onClick={handleAddSkillClick}
//               disabled={availableSkills.length === 0}
//               className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
//                 availableSkills.length > 0
//                   ? "bg-indigo-600 hover:bg-indigo-700 text-white"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               <Plus className="h-4 w-4" />
//               Add Skill
//             </button>
//           </div>
          
//           {/* Current Skills */}
//           <div className="flex flex-wrap gap-3 mb-4">
//             {mentor.expertise.map((skill, index) => (
//               <div
//                 key={index}
//                 className="group relative px-4 py-2 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 text-indigo-700 rounded-lg font-medium flex items-center gap-2 hover:pr-8 transition-all"
//               >
//                 {skill}
//                 <button
//                   onClick={() => handleRemoveSkill(skill)}
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-indigo-200 rounded"
//                 >
//                   <X className="h-3 w-3 text-indigo-500 hover:text-indigo-700" />
//                 </button>
//               </div>
//             ))}
//             {mentor.expertise.length === 0 && (
//               <p className="text-gray-500 italic">No skills added yet</p>
//             )}
//           </div>

//           {/* Skills Counter */}
//           <div className="flex items-center gap-4 text-sm text-gray-600">
//             <div className="flex items-center gap-2">
//               <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
//               <span>{mentor.expertise.length} skills added</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
//               <span>{availableSkills.length} skills available</span>
//             </div>
//           </div>
//         </div>

//         {/* Experience Details */}
//         <div className="border-t border-gray-200 p-8">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">
//             Experience Details
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gray-50 rounded-xl p-4">
//               <p className="text-sm text-gray-500 mb-1">Years of Experience</p>
//               <p className="text-xl font-semibold text-gray-900">
//                 {mentor.yearsOfExperience || "Not specified"}
//               </p>
//             </div>
//             <div className="bg-gray-50 rounded-xl p-4">
//               <p className="text-sm text-gray-500 mb-1">Total Sessions</p>
//               <p className="text-xl font-semibold text-gray-900">{sessionT}</p>
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
  Clock
} from "lucide-react";

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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiConnector("GET", mentorEndpoints.ABOUT);
        const totalsession = await apiConnector("GET", mentorEndpoints.Totalsession);
        const Mentorstat = await apiConnector("GET", mentorEndpoints.Mentorstat);
        
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
  const availableSkills = mentor ? expertiseOptions.filter(
    skill => !mentor.expertise.includes(skill)
  ) : [];

  const handleAddSkillClick = () => {
    setShowSkillSelector(true);
    setSelectedSkills([]);
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSaveSkills = async () => {
    if (selectedSkills.length === 0) return;
    
    try {
      setAddingSkills(true);
      
      // API call to update mentor expertise
      await apiConnector("PUT", mentorEndpoints.UPDATE_EXPERTISE, {
        expertise: [...mentor.expertise, ...selectedSkills]
      });
      
      // Update local state
      setMentor(prev => ({
        ...prev,
        expertise: [...prev.expertise, ...selectedSkills]
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
      const updatedExpertise = mentor.expertise.filter(skill => skill !== skillToRemove);
      
      // API call to update expertise
      await apiConnector("PUT", mentorEndpoints.UPDATE_EXPERTISE, {
        expertise: updatedExpertise
      });
      
      // Update local state
      setMentor(prev => ({
        ...prev,
        expertise: updatedExpertise
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
        setMentor(prev => ({
          ...prev,
          sessionPrice: priceNum
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Profile Found</h3>
          <p className="text-gray-600 mb-6">
            Complete your mentor profile to start accepting sessions
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Setup Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Skill Selector Modal */}
      {showSkillSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add Skills ({selectedSkills.length} selected)
                </h3>
                <button
                  onClick={() => setShowSkillSelector(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  disabled={addingSkills}
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Select skills from the list below. Skills you already have are hidden.
              </p>
            </div>

            {/* Skill Grid */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {availableSkills.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      disabled={addingSkills}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedSkills.includes(skill)
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      } ${addingSkills ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill}</span>
                        {selectedSkills.includes(skill) && (
                          <div className="h-5 w-5 bg-indigo-500 rounded-full flex items-center justify-center">
                            <div className="h-2 w-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    All Skills Added
                  </h4>
                  <p className="text-gray-600">
                    You've already added all available skills to your profile.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  {selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-600">Selected:</span>
                      {selectedSkills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm"
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
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSkills}
                    disabled={selectedSkills.length === 0 || addingSkills}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      selectedSkills.length > 0 && !addingSkills
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {addingSkills ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adding...
                      </span>
                    ) : (
                      `Add ${selectedSkills.length > 0 ? `(${selectedSkills.length})` : ""} Skills`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor Dashboard</h1>
          <p className="text-gray-600">
            Manage your profile, skills, and session pricing
          </p>
        </div>

        {/* Stats Grid
        {stat && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ₹{stat.totalEarnings || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {sessionT || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            

            
          </div>
        )} */}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          {/* Profile Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="h-24 w-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {mentor.name.charAt(0)}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {mentor.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span>{mentor.jobTitle}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <span>{mentor.college}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{mentor.yearsOfExperience || 0} years exp</span>
                      </div>
                    </div>
                  </div>

                  {/* Session Price Section */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 min-w-[280px]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Session Price
                      </h3>
                      {!editingPrice && (
                        <button
                          onClick={handleStartEditPrice}
                          className="p-1.5 hover:bg-green-100 rounded-lg transition"
                          title="Edit price"
                        >
                          <Edit2 className="h-4 w-4 text-green-600" />
                        </button>
                      )}
                    </div>

                    {editingPrice ? (
                      <div>
                        <div className="relative mb-2">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">
                            ₹
                          </div>
                          <input
                            type="text"
                            value={newPrice}
                            onChange={handlePriceInput}
                            placeholder="Enter new price"
                            className="w-full pl-8 pr-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            autoFocus
                          />
                        </div>
                        {priceError && (
                          <p className="text-red-600 text-sm mb-2">{priceError}</p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={handleCancelEditPrice}
                            disabled={updatingPrice}
                            className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm disabled:opacity-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSavePrice}
                            disabled={updatingPrice || !newPrice.trim()}
                            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
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
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-green-700">
                            ₹{mentor.sessionPrice}
                          </p>
                          <p className="text-sm text-green-600 mt-1">
                            Per hour session
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Current Rate</p>
                          <p className="text-xs text-gray-500">
                            Students see this price
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {!editingPrice && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-xs text-gray-600">
                          Tip: Competitive pricing can help attract more students
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700">
                    {mentor.currentCompany} • {mentor.yearsOfExperience || 0}+ years experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" />
                Expertise & Skills
              </h3>
              <button
                onClick={handleAddSkillClick}
                disabled={availableSkills.length === 0}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition ${
                  availableSkills.length > 0
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Plus className="h-4 w-4" />
                Add Skill
              </button>
            </div>
            
            {/* Current Skills */}
            {mentor.expertise.length > 0 ? (
              <div className="flex flex-wrap gap-3 mb-6">
                {mentor.expertise.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative px-4 py-2 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 text-indigo-700 rounded-lg font-medium flex items-center gap-2 hover:pr-8 transition-all"
                  >
                    <CheckCircle className="h-4 w-4 text-indigo-500" />
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-indigo-200 rounded"
                      title="Remove skill"
                    >
                      <X className="h-3 w-3 text-indigo-500 hover:text-indigo-700" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-xl mb-6">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">No skills added yet</p>
                <p className="text-sm text-gray-500">
                  Add skills to showcase your expertise to students
                </p>
              </div>
            )}

            {/* Skills Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-indigo-500 rounded-full"></div>
                <span>{mentor.expertise.length} skills added</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
                <span>{availableSkills.length} more available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span>Top skills attract 40% more bookings</span>
              </div>
            </div>
          </div>

          {/* Experience & Details Section */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Profile Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Company</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {mentor.currentCompany}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">College</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {mentor.college}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {mentor.yearsOfExperience || 0} years
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Sessions</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {sessionT || 0} completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Pricing Strategy Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="text-blue-600 font-semibold mb-2">💰 Market Rates</div>
              <p className="text-sm text-gray-700">
                Beginner mentors: ₹500-800/hour<br />
                Experienced: ₹800-1500/hour<br />
                Industry experts: ₹1500+/hour
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="text-green-600 font-semibold mb-2">📈 Increase Gradually</div>
              <p className="text-sm text-gray-700">
                Start competitive, increase by 10-20% as you get more reviews and bookings.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="text-purple-600 font-semibold mb-2">🎯 Value Proposition</div>
              <p className="text-sm text-gray-700">
                Higher prices should match your expertise, availability, and success rate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorAbout;