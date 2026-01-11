// import { useEffect, useState, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { adminEndpoints } from "../../../Service/apis";
// import { apiConnector } from "../../../Service/apiConnector";
// import { 
//   Trash2, 
//   Filter, 
//   Search, 
//   Star, 
//   Calendar, 
//   User, 
//   Building, 
//   GraduationCap, 
//   ChevronDown,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   Shield,
//   MessageSquare,
//   ChevronUp,
//   ChevronRight,
//   Sparkles,
//   Eye,
//   EyeOff,
//   TrendingUp,
//   Clock,
//   BarChart3
// } from "lucide-react";
// import debounce from 'lodash/debounce';

// const AdminReview = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedReviews, setSelectedReviews] = useState(new Set());
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all"); 
//   const [sortBy, setSortBy] = useState("newest");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [expandedReview, setExpandedReview] = useState(null);
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [approveornot,setapproveornot]=useState(false);

//   // Fetch all reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const response = await apiConnector("GET", adminEndpoints.GET_REVIEW);
//       console.log("Response:", response);
//       if (response.data.success) {
//         setReviews(response.data.reviews || []);
//       }
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete review
//   const handleDeleteReview = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to delete this review?")) return;

//     try {
//       await apiConnector("DELETE", adminEndpoints.DELETE_REVIEW(bookingId));
      
//       setReviews(reviews.filter(review => review.bookingId !== bookingId));
//       const newSelected = new Set(selectedReviews);
//       newSelected.delete(bookingId);
//       setSelectedReviews(newSelected);
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   // Delete selected reviews
//   const handleDeleteSelected = async () => {
//     if (selectedReviews.size === 0) return;
    
//     if (window.confirm(`Delete ${selectedReviews.size} selected review${selectedReviews.size !== 1 ? 's' : ''}?`)) {
//       try {
//         const deletePromises = Array.from(selectedReviews).map(id =>
//           apiConnector("DELETE", adminEndpoints.DELETE_REVIEW(id))
//         );
        
//         await Promise.all(deletePromises);
        
//         setReviews(reviews.filter(review => !selectedReviews.has(review.bookingId)));
//         setSelectedReviews(new Set());
//       } catch (error) {
//         console.error("Error deleting selected reviews:", error);
//       }
//     }
//   };

//   // Toggle review selection
//   const toggleReviewSelection = (bookingId) => {
//     const newSelected = new Set(selectedReviews);
//     if (newSelected.has(bookingId)) {
//       newSelected.delete(bookingId);
//     } else {
//       newSelected.add(bookingId);
//     }
//     setSelectedReviews(newSelected);
//   };

//   // Select all visible reviews
//   const selectAllVisible = async (bookingId) => {
//     const visibleIds = filteredReviews.map(r => r.bookingId);
//     setSelectedReviews(new Set(visibleIds));
//   };
//   // const SelectReviewforlogin =async (bookingId,)=>{
//   //   try {
//   //     await apiConnector("PATCH",adminEndpoints.ReviewApprove(bookingId),{ approved:   })
//   //   } catch (error) {
//   //     console.error("Error while selectReviewforLogin", error);
//   //   }
//   // }
//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get graduation year label
//   const getGraduationLabel = (graduationYear) => {
//     if (!graduationYear) return "";
    
//     const currentYear = new Date().getFullYear();
//     const diff = graduationYear - currentYear;
    
//     if (diff <= 0) return "Graduated";
//     if (diff === 1) return "Final Year";
//     if (diff === 2) return "Pre-final Year";
//     return `${graduationYear}`;
//   };

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     debounce((query) => {
//       setSearchQuery(query);
//     }, 300),
//     []
//   );

//   // Filter and sort reviews
//   const filteredReviews = reviews
//     .filter(review => {
//       if (!review) return false;
      
//       const matchesSearch = searchQuery === "" || 
//         (review.student?.name && review.student.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         (review.mentor?.name && review.mentor.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         (review.comment && review.comment.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         (review.student?.college && review.student.college.toLowerCase().includes(searchQuery.toLowerCase()));
      
//       const matchesStatus = statusFilter === "all" || 
//         (statusFilter === "approved" && review.isApproved) ||
//         (statusFilter === "pending" && !review.isApproved);
      
//       return matchesSearch && matchesStatus;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "newest":
//           return new Date(b.reviewedAt || 0) - new Date(a.reviewedAt || 0);
//         case "oldest":
//           return new Date(a.reviewedAt || 0) - new Date(b.reviewedAt || 0);
//         case "rating-high":
//           return (b.rating || 0) - (a.rating || 0);
//         case "rating-low":
//           return (a.rating || 0) - (b.rating || 0);
//         default:
//           return 0;
//       }
//     });

//   // Statistics
//   const stats = {
//     total: reviews.length,
//     approved: reviews.filter(r => r.isApproved).length,
//     pending: reviews.filter(r => !r.isApproved).length,
//     averageRating: reviews.length > 0 
//       ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
//       : 0
//   };

//   const searchResults = filteredReviews.length;
//   const hasSearchResults = searchQuery && searchResults > 0;

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 sm:p-6 lg:p-8">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex flex-col items-center justify-center min-h-[60vh]"
//           >
//             <div className="relative mb-8">
//               <div className="w-32 h-32 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <Shield className="w-16 h-16 text-indigo-400 animate-pulse" />
//               </div>
//             </div>
//             <motion.p
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ repeat: Infinity, duration: 1.5 }}
//               className="text-xl text-gray-400 font-medium"
//             >
//               Loading reviews...
//             </motion.p>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
//                   <Shield className="w-6 h-6 text-indigo-400" />
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
//                   Reviews Dashboard
//                 </h1>
//               </div>
//               <p className="text-gray-400 mt-2 max-w-2xl">
//                 Manage and moderate student reviews. Track feedback, approve content, and maintain quality standards.
//               </p>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={fetchReviews}
//                 className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 flex items-center gap-3 group"
//               >
//                 <RefreshCw className="w-4 h-4 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
//                 <span className="text-sm font-semibold text-gray-300">Refresh Data</span>
//               </motion.button>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
//           >
//             <motion.div variants={itemVariants}>
//               <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-indigo-500/30 transition-all duration-300 group">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-400 mb-1">Total Reviews</p>
//                     <p className="text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors">{stats.total}</p>
//                   </div>
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <MessageSquare className="w-6 h-6 text-blue-400" />
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t border-gray-700/50">
//                   <div className="flex items-center gap-2">
//                     <BarChart3 className="w-4 h-4 text-gray-500" />
//                     <span className="text-xs text-gray-500">All time reviews</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-purple-500/30 transition-all duration-300 group">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-400 mb-1">Avg. Rating</p>
//                     <div className="flex items-center gap-3">
//                       <p className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">{stats.averageRating}</p>
//                       <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-4 h-4 ${
//                               i < Math.floor(stats.averageRating)
//                                 ? "text-yellow-400 fill-yellow-400 group-hover:fill-yellow-300 group-hover:text-yellow-300"
//                                 : "text-gray-600"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <Star className="w-6 h-6 text-purple-400" />
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t border-gray-700/50">
//                   <div className="flex items-center gap-2">
//                     <Sparkles className="w-4 h-4 text-purple-500" />
//                     <span className="text-xs text-purple-500">Overall quality</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </motion.div>

//         {/* Enhanced Controls Bar */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 mb-8 shadow-xl"
//         >
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//             {/* Enhanced Search Bar */}
//             <div className="flex-1 max-w-2xl">
//               <div className="relative">
//                 <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
//                   searchFocused ? 'text-indigo-400' : 'text-gray-400'
//                 }`}>
//                   <Search className="w-5 h-5" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search reviews by student name, mentor, college, or content..."
//                   defaultValue={searchQuery}
//                   onChange={(e) => debouncedSearch(e.target.value)}
//                   onFocus={() => setSearchFocused(true)}
//                   onBlur={() => setSearchFocused(false)}
//                   className="w-full pl-12 pr-24 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300 text-lg"
//                 />
//                 {hasSearchResults && (
//                   <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//                     <span className="px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
//                       {searchResults} found
//                     </span>
//                   </div>
//                 )}
//               </div>
//               {searchQuery && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   className="mt-3"
//                 >
//                   <p className="text-sm text-gray-400">
//                     Searching for: <span className="text-indigo-300 font-medium">"{searchQuery}"</span>
//                   </p>
//                 </motion.div>
//               )}
//             </div>

//             {/* Enhanced Filters and Actions */}
//             <div className="flex items-center gap-4">
//               {/* Status Filter */}
//               <div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsFilterOpen(!isFilterOpen)}
//                   className="flex items-center gap-3 px-5 py-3.5 bg-gray-900/50 border border-gray-700 rounded-2xl text-gray-300 hover:border-indigo-500/50 hover:text-white transition-all duration-300"
//                 >
//                   <Filter className="w-4 h-4" />
//                   <span className="text-sm font-semibold">
//                     {statusFilter === "all" ? "All Status" : 
//                      statusFilter === "approved" ? "Approved Only" : "Pending Only"}
//                   </span>
//                   <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
//                 </motion.button>
                
//                 <AnimatePresence>
//                   {isFilterOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       className="absolute right-0 mt-3 w-56 bg-gray-900/95 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm z-50 overflow-hidden"
//                     >
//                       <div className="p-2 space-y-1">
//                         {[
//                           { value: "all", label: "All Reviews", icon: <MessageSquare className="w-4 h-4" /> },
//                           { value: "approved", label: "Approved Only", icon: <CheckCircle className="w-4 h-4" /> },
//                           { value: "pending", label: "Pending Only", icon: <AlertCircle className="w-4 h-4" /> }
//                         ].map((filter) => (
//                           <motion.button
//                             key={filter.value}
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => {
//                               setStatusFilter(filter.value);
//                               setIsFilterOpen(false);
//                             }}
//                             className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl text-left transition-all duration-200 ${
//                               statusFilter === filter.value
//                                 ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
//                                 : "text-gray-300 hover:bg-gray-800/50"
//                             }`}
//                           >
//                             <div className={`p-1.5 rounded-lg ${
//                               statusFilter === filter.value 
//                                 ? "bg-indigo-500/30" 
//                                 : "bg-gray-800"
//                             }`}>
//                               {filter.icon}
//                             </div>
//                             {filter.label}
//                           </motion.button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Enhanced Sort Dropdown */}
//               <div className="relative group">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-5 py-3.5 bg-gray-900/50 border border-gray-700 rounded-2xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent appearance-none cursor-pointer pr-12 hover:border-indigo-500/50 transition-all duration-300"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                   <option value="rating-high">Highest Rating</option>
//                   <option value="rating-low">Lowest Rating</option>
//                 </select>
//                 <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                   <ChevronDown className="w-4 h-4 text-gray-400" />
//                 </div>
//                 <div className="absolute -bottom-8 left-0 bg-gray-900 text-gray-300 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
//                   Sort reviews
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Reviews List */}
//         <AnimatePresence mode="wait">
//           {filteredReviews.length === 0 ? (
//             <motion.div
//               key="empty"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.3 }}
//               className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-12 text-center"
//             >
//               <motion.div
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ repeat: Infinity, duration: 2 }}
//                 className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center"
//               >
//                 <MessageSquare className="w-12 h-12 text-gray-500" />
//               </motion.div>
//               <h3 className="text-2xl font-semibold text-gray-300 mb-3">
//                 {searchQuery ? "No matching reviews found" : "No reviews yet"}
//               </h3>
//               <p className="text-gray-500 max-w-md mx-auto mb-8">
//                 {searchQuery 
//                   ? `No reviews match your search for "${searchQuery}". Try different keywords.`
//                   : "Reviews will appear here once students submit feedback."}
//               </p>
//               {searchQuery && (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     setSearchQuery("");
//                     setStatusFilter("all");
//                   }}
//                   className="px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 rounded-xl hover:border-indigo-500/50 transition-all duration-300"
//                 >
//                   Clear Search & Filters
//                 </motion.button>
//               )}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="list"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-6"
//             >
//               {/* Search Results Header */}
//               {searchQuery && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center justify-between mb-2"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
//                       <Search className="w-5 h-5 text-indigo-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-white">
//                         Search Results
//                       </h3>
//                       <p className="text-sm text-gray-400">
//                         Found {searchResults} review{searchResults !== 1 ? 's' : ''} for "{searchQuery}"
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setSearchQuery("")}
//                     className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
//                   >
//                     Clear search
//                   </button>
//                 </motion.div>
//               )}

//               {/* Reviews Grid */}
//               <div className="grid gap-6">
//                 {filteredReviews.map((review, index) => (
//                   <motion.div
//                     key={review.bookingId}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     whileHover={{ y: -5 }}
//                     className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border backdrop-blur-sm overflow-hidden group transition-all duration-300 ${
//                       selectedReviews.has(review.bookingId)
//                         ? "border-indigo-500/50 bg-indigo-500/10 shadow-2xl shadow-indigo-500/20"
//                         : "border-gray-700/50 hover:border-gray-600/50 hover:shadow-xl"
//                     }`}
//                   >
//                     <div className="p-6">
//                       {/* Review Header */}
//                       <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
//                         <div className="flex items-start gap-4 flex-1">
//                           {/* Student Avatar */}
//                           <div className="relative">
//                             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
//                               <span className="text-xl font-bold text-white">
//                                 {review.student?.name?.charAt(0).toUpperCase() || "A"}
//                               </span>
//                             </div>
//                             <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center ${
//                               review.isApproved ? "bg-green-500" : "bg-yellow-500"
//                             }`}>
//                               {review.isApproved ? (
//                                 <CheckCircle className="w-3.5 h-3.5 text-white" />
//                               ) : (
//                                 <AlertCircle className="w-3.5 h-3.5 text-white" />
//                               )}
//                             </div>
//                           </div>

//                           {/* Student Info */}
//                           <div className="flex-1">
//                             <div className="flex items-start justify-between mb-3">
//                               <div>
//                                 <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
//                                   {review.student?.name || "Anonymous Student"}
//                                 </h4>
//                                 <div className="flex flex-wrap items-center gap-3 mt-2">
                                  
//                                   <span className="flex items-center gap-1.5 text-sm text-gray-400">
//                                     <Calendar className="w-4 h-4" />
//                                     {formatDate(review.reviewedAt)}
//                                   </span>
//                                 </div>
//                               </div>
                              
//                               {/* Rating Badge */}
//                               <div className="text-right">
//                                 <div className="flex items-center gap-2">
//                                   <div className="flex">
//                                     {[...Array(5)].map((_, i) => (
//                                       <Star
//                                         key={i}
//                                         className={`w-4 h-4 ${
//                                           i < Math.floor(review.rating || 0)
//                                             ? "text-yellow-400 fill-yellow-400"
//                                             : "text-gray-600"
//                                         }`}
//                                       />
//                                     ))}
//                                   </div>
//                                   <span className="text-lg font-bold text-white">
//                                     {review.rating || 0}/5
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {/* Student Details */}
//                             <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
//                               <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/50">
//                                 <Building className="w-4 h-4" />
//                                 <span>{review.student?.college || "Unknown College"}</span>
//                               </div>
//                               <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/50">
//                                 <GraduationCap className="w-4 h-4" />
//                                 <span>{getGraduationLabel(review.student?.graduationYear)}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Actions */}
//                         <div className="flex items-center gap-3">
//                           <label className="flex items-center gap-3 cursor-pointer select-none">
//                             <div className="relative">
//                               <input
//                                 type="checkbox"
//                                 checked={selectedReviews.has(review.bookingId)}
//                                 onChange={() => toggleReviewSelection(review.bookingId)}
//                                 className="w-6 h-6 rounded-lg border-gray-600 bg-gray-800 checked:bg-indigo-500 checked:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 appearance-none"
//                               />
//                               {selectedReviews.has(review.bookingId) && (
//                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                                   <CheckCircle className="w-4 h-4 text-white" />
//                                 </div>
//                               )}
//                             </div>
//                             <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
//                               Select
//                             </span>
//                           </label>
                          
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => handleDeleteReview(review.bookingId)}
//                             className="px-5 py-2.5 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-red-400 hover:border-red-500/40 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 flex items-center gap-2"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             <span className="text-sm font-semibold">Delete</span>
//                           </motion.button>
//                         </div>
//                       </div>

//                       {/* Divider */}
//                       <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>

//                       {/* Review Content */}
//                       <div className="mb-8">
//                         <div className="relative">
//                           <div className="absolute -left-3 top-0 text-7xl text-gray-800/30 select-none">"</div>
//                           <p className="text-gray-300 text-lg leading-relaxed pl-8 pr-8 italic">
//                             {review.comment || "No comment provided"}
//                           </p>
//                           <div className="absolute -right-3 bottom-0 text-7xl text-gray-800/30 select-none">"</div>
//                         </div>
//                       </div>

//                       {/* Mentor Info */}
//                       <div className="bg-gray-900/30 rounded-2xl border border-gray-700/50 p-6">
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
//                               <User className="w-6 h-6 text-white" />
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-400 mb-1">Mentor</p>
//                               <p className="font-semibold text-lg text-white">
//                                 {review.mentor?.name || "Unknown Mentor"}
//                               </p>
//                             </div>
//                           </div>
//                           {review.mentor?.currentCompany && (
//                             <div className="text-right">
//                               <p className="text-sm text-gray-400">Current Company</p>
//                               <p className="font-medium text-gray-300">{review.mentor.currentCompany}</p>
//                             </div>
//                           )}
//                           {review.mentor?.college && (
//                             <div className="text-right">
//                               <p className="text-sm text-gray-400">college</p>
//                               <p className="font-medium text-gray-300">{review.mentor.college}</p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Enhanced Bulk Actions Footer */}
//         {selectedReviews.size > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl z-50"
//           >
//             <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-6 backdrop-blur-sm">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
//                 <div className="flex items-center gap-4">
//                   <motion.div
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
//                     className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center"
//                   >
//                     <Shield className="w-7 h-7 text-indigo-400" />
//                   </motion.div>
//                   <div>
//                     <h3 className="text-xl font-bold text-white">Selected Reviews</h3>
//                     <p className="text-sm text-gray-400">
//                       {selectedReviews.size} review{selectedReviews.size !== 1 ? 's' : ''} selected • {Math.round((selectedReviews.size / filteredReviews.length) * 100)}% of visible results
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-3">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={selectAllVisible}
//                     className="px-5 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white rounded-xl transition-all duration-300 flex items-center gap-2"
//                   >
//                     <span className="text-sm font-semibold">Select All Visible</span>
//                   </motion.button>
                  
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setSelectedReviews(new Set())}
//                     className="px-5 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white rounded-xl transition-all duration-300"
//                   >
//                     <span className="text-sm font-semibold">Clear</span>
//                   </motion.button>
                  
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleDeleteSelected}
//                     className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-red-500/20"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                     <span className="font-bold">Delete Selected</span>
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Results Footer */}
//         {filteredReviews.length > 0 && selectedReviews.size === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="mt-12 pt-8 border-t border-gray-800/50"
//           >
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
//                   <MessageSquare className="w-6 h-6 text-gray-400" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-400">Showing results</p>
//                   <p className="text-lg font-semibold text-white">
//                     {filteredReviews.length} of {reviews.length} reviews
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={selectAllVisible}
//                   className="px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-400 hover:border-indigo-500/40 hover:text-indigo-300 rounded-xl transition-all duration-300 flex items-center gap-3"
//                 >
//                   <span className="font-semibold">Select All</span>
//                 </motion.button>
                
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={fetchReviews}
//                   className="px-6 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white rounded-xl transition-all duration-300 flex items-center gap-3"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   <span className="font-semibold">Refresh</span>
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminReview;
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminEndpoints } from "../../../Service/apis";
import { apiConnector } from "../../../Service/apiConnector";
import { 
  Trash2, 
  Filter, 
  Search, 
  Star, 
  Calendar, 
  User, 
  Building, 
  GraduationCap, 
  ChevronDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Shield,
  MessageSquare,
  ChevronUp,
  ChevronRight,
  Sparkles,
  Eye,
  EyeOff,
  TrendingUp,
  Clock,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Check,
  X,
  ShieldAlert,
  Globe,
  Lock,
  Unlock,
  Send,
  AlertTriangle,
  UserCheck,
  UserX
} from "lucide-react";
import debounce from 'lodash/debounce';

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReviews, setSelectedReviews] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); 
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedReview, setExpandedReview] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [approvingId, setApprovingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await apiConnector("GET", adminEndpoints.GET_REVIEW);
      console.log("Reviews Response:", response);
      
      if (response.data.success) {
        // Ensure each review has proper status flags
        const formattedReviews = response.data.reviews?.map(review => ({
          ...review,
          isApproved: review.review?.approved || false,
          isRejected: review.review?.approved === false,
          showOnHomepage: review.review?.approved === true
        })) || [];
        
        setReviews(formattedReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Approve review (show on homepage)
  const handleApproveReview = async (bookingId) => {
    setApprovingId(bookingId);
    try {
      const response = await apiConnector(
        "PATCH", 
        adminEndpoints.ReviewApprove(bookingId), 
        { approved: true }
      );
      
      if (response.data.success) {
        // Update local state
        setReviews(prev => prev.map(review => 
          review.bookingId === bookingId 
            ? { 
                ...review, 
                review: { ...review.review, approved: true },
                isApproved: true,
                isRejected: false,
                showOnHomepage: true
              } 
            : review
        ));
      }
    } catch (error) {
      console.error("Error approving review:", error);
      alert("Failed to approve review. Please try again.");
    } finally {
      setApprovingId(null);
    }
  };

  // Reject review (don't show on homepage)
  const handleRejectReview = async (bookingId) => {
    setRejectingId(bookingId);
    try {
      const response = await apiConnector(
        "PATCH", 
        adminEndpoints.ReviewApprove(bookingId), 
        { approved: false }
      );
      
      if (response.data.success) {
        // Update local state
        setReviews(prev => prev.map(review => 
          review.bookingId === bookingId 
            ? { 
                ...review, 
                review: { ...review.review, approved: false },
                isApproved: false,
                isRejected: true,
                showOnHomepage: false
              } 
            : review
        ));
      }
    } catch (error) {
      console.error("Error rejecting review:", error);
      alert("Failed to reject review. Please try again.");
    } finally {
      setRejectingId(null);
    }
  };

  // Bulk approve selected reviews
  const handleBulkApprove = async () => {
    if (selectedReviews.size === 0) return;
    
    if (window.confirm(`Approve ${selectedReviews.size} selected review${selectedReviews.size !== 1 ? 's' : ''} to show on homepage?`)) {
      try {
        const approvePromises = Array.from(selectedReviews).map(id =>
          apiConnector("PATCH", adminEndpoints.ReviewApprove(id), { approved: true })
        );
        
        await Promise.all(approvePromises);
        
        // Update local state
        setReviews(prev => prev.map(review => 
          selectedReviews.has(review.bookingId)
            ? { 
                ...review, 
                review: { ...review.review, approved: true },
                isApproved: true,
                isRejected: false,
                showOnHomepage: true
              } 
            : review
        ));
        
        // Clear selection
        setSelectedReviews(new Set());
      } catch (error) {
        console.error("Error bulk approving reviews:", error);
        alert("Failed to approve some reviews. Please try again.");
      }
    }
  };

  // Bulk reject selected reviews
  const handleBulkReject = async () => {
    if (selectedReviews.size === 0) return;
    
    if (window.confirm(`Reject ${selectedReviews.size} selected review${selectedReviews.size !== 1 ? 's' : ''} (won't show on homepage)?`)) {
      try {
        const rejectPromises = Array.from(selectedReviews).map(id =>
          apiConnector("PATCH", adminEndpoints.ReviewApprove(id), { approved: false })
        );
        
        await Promise.all(rejectPromises);
        
        // Update local state
        setReviews(prev => prev.map(review => 
          selectedReviews.has(review.bookingId)
            ? { 
                ...review, 
                review: { ...review.review, approved: false },
                isApproved: false,
                isRejected: true,
                showOnHomepage: false
              } 
            : review
        ));
        
        // Clear selection
        setSelectedReviews(new Set());
      } catch (error) {
        console.error("Error bulk rejecting reviews:", error);
        alert("Failed to reject some reviews. Please try again.");
      }
    }
  };

  // Delete review
  const handleDeleteReview = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await apiConnector("DELETE", adminEndpoints.DELETE_REVIEW(bookingId));
      
      setReviews(reviews.filter(review => review.bookingId !== bookingId));
      const newSelected = new Set(selectedReviews);
      newSelected.delete(bookingId);
      setSelectedReviews(newSelected);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Delete selected reviews
  const handleDeleteSelected = async () => {
    if (selectedReviews.size === 0) return;
    
    if (window.confirm(`Delete ${selectedReviews.size} selected review${selectedReviews.size !== 1 ? 's' : ''}?`)) {
      try {
        const deletePromises = Array.from(selectedReviews).map(id =>
          apiConnector("DELETE", adminEndpoints.DELETE_REVIEW(id))
        );
        
        await Promise.all(deletePromises);
        
        setReviews(reviews.filter(review => !selectedReviews.has(review.bookingId)));
        setSelectedReviews(new Set());
      } catch (error) {
        console.error("Error deleting selected reviews:", error);
      }
    }
  };

  // Toggle review selection
  const toggleReviewSelection = (bookingId) => {
    const newSelected = new Set(selectedReviews);
    if (newSelected.has(bookingId)) {
      newSelected.delete(bookingId);
    } else {
      newSelected.add(bookingId);
    }
    setSelectedReviews(newSelected);
  };

  // Select all visible reviews
  const selectAllVisible = () => {
    const visibleIds = filteredReviews.map(r => r.bookingId);
    setSelectedReviews(new Set(visibleIds));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get graduation year label
  const getGraduationLabel = (graduationYear) => {
    if (!graduationYear) return "";
    
    const currentYear = new Date().getFullYear();
    const diff = graduationYear - currentYear;
    
    if (diff <= 0) return "Graduated";
    if (diff === 1) return "Final Year";
    if (diff === 2) return "Pre-final Year";
    return `${graduationYear}`;
  };

  // Get status badge component
  const getStatusBadge = (review) => {
    if (review.isApproved) {
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">Approved</span>
        </span>
      );
    } else if (review.isRejected) {
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Rejected</span>
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">Pending</span>
        </span>
      );
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => {
      if (!review) return false;
      
      const matchesSearch = searchQuery === "" || 
        (review.student?.name && review.student.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (review.mentor?.name && review.mentor.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (review.comment && review.comment.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (review.student?.college && review.student.college.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || 
        (statusFilter === "approved" && review.isApproved) ||
        (statusFilter === "pending" && !review.isApproved && !review.isRejected) ||
        (statusFilter === "rejected" && review.isRejected);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.reviewedAt || 0) - new Date(a.reviewedAt || 0);
        case "oldest":
          return new Date(a.reviewedAt || 0) - new Date(b.reviewedAt || 0);
        case "rating-high":
          return (b.rating || 0) - (a.rating || 0);
        case "rating-low":
          return (a.rating || 0) - (b.rating || 0);
        case "status-approved":
          return (b.isApproved ? 1 : 0) - (a.isApproved ? 1 : 0);
        default:
          return 0;
      }
    });

  // Statistics
  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.isApproved).length,
    pending: reviews.filter(r => !r.isApproved && !r.isRejected).length,
    rejected: reviews.filter(r => r.isRejected).length,
    averageRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0
  };

  const searchResults = filteredReviews.length;
  const hasSearchResults = searchQuery && searchResults > 0;

  useEffect(() => {
    fetchReviews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh]"
          >
            <div className="relative mb-8">
              <div className="w-32 h-32 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-16 h-16 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-xl text-gray-400 font-medium"
            >
              Loading reviews...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                  <Shield className="w-6 h-6 text-indigo-400" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Reviews Moderation
                </h1>
              </div>
              <p className="text-gray-400 mt-2 max-w-2xl">
                Approve or reject reviews to control what appears on the homepage. Manage feedback quality and visibility.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchReviews}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 flex items-center gap-3 group"
              >
                <RefreshCw className="w-4 h-4 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-sm font-semibold text-gray-300">Refresh Data</span>
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
          >
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Reviews</p>
                    <p className="text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-500">All reviews</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-green-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Approved</p>
                    <p className="text-3xl font-bold text-white group-hover:text-green-300 transition-colors">{stats.approved}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ThumbsUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-500">On homepage</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-yellow-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Pending</p>
                    <p className="text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors">{stats.pending}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-yellow-500">Awaiting action</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-red-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Rejected</p>
                    <p className="text-3xl font-bold text-white group-hover:text-red-300 transition-colors">{stats.rejected}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ThumbsDown className="w-6 h-6 text-red-400" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-500">Hidden</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 hover:border-purple-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Avg. Rating</p>
                    <div className="flex items-center gap-3">
                      <p className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">{stats.averageRating}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(stats.averageRating)
                                ? "text-yellow-400 fill-yellow-400 group-hover:fill-yellow-300 group-hover:text-yellow-300"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-xs text-purple-500">Overall quality</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Controls Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6 mb-8 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                  searchFocused ? 'text-indigo-400' : 'text-gray-400'
                }`}>
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search reviews by student name, mentor, college, or content..."
                  defaultValue={searchQuery}
                  onChange={(e) => debouncedSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-12 pr-24 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300 text-lg"
                />
                {hasSearchResults && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <span className="px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {searchResults} found
                    </span>
                  </div>
                )}
              </div>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3"
                >
                  <p className="text-sm text-gray-400">
                    Searching for: <span className="text-indigo-300 font-medium">"{searchQuery}"</span>
                  </p>
                </motion.div>
              )}
            </div>

            {/* Enhanced Filters and Actions */}
            <div className="flex items-center gap-4">
              {/* Status Filter */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-3 px-5 py-3.5 bg-gray-900/50 border border-gray-700 rounded-2xl text-gray-300 hover:border-indigo-500/50 hover:text-white transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {statusFilter === "all" ? "All Status" : 
                     statusFilter === "approved" ? "Approved Only" : 
                     statusFilter === "pending" ? "Pending Only" : "Rejected Only"}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
                </motion.button>
                
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-gray-900/95 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm z-50 overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        {[
                          { value: "all", label: "All Reviews", icon: <MessageSquare className="w-4 h-4" />, color: "text-gray-400" },
                          { value: "approved", label: "Approved Only", icon: <ThumbsUp className="w-4 h-4 text-green-400" />, color: "text-green-400" },
                          { value: "pending", label: "Pending Only", icon: <AlertTriangle className="w-4 h-4 text-yellow-400" />, color: "text-yellow-400" },
                          { value: "rejected", label: "Rejected Only", icon: <ThumbsDown className="w-4 h-4 text-red-400" />, color: "text-red-400" }
                        ].map((filter) => (
                          <motion.button
                            key={filter.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setStatusFilter(filter.value);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl text-left transition-all duration-200 ${
                              statusFilter === filter.value
                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                : "text-gray-300 hover:bg-gray-800/50"
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg ${
                              statusFilter === filter.value 
                                ? "bg-indigo-500/30" 
                                : "bg-gray-800"
                            }`}>
                              {filter.icon}
                            </div>
                            <span className={filter.color}>{filter.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Sort Dropdown */}
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-5 py-3.5 bg-gray-900/50 border border-gray-700 rounded-2xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent appearance-none cursor-pointer pr-12 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating-high">Highest Rating</option>
                  <option value="rating-low">Lowest Rating</option>
                  <option value="status-approved">Approved First</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="absolute -bottom-8 left-0 bg-gray-900 text-gray-300 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Sort reviews
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        <AnimatePresence mode="wait">
          {filteredReviews.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-12 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center"
              >
                <MessageSquare className="w-12 h-12 text-gray-500" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-3">
                {searchQuery ? "No matching reviews found" : "No reviews yet"}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                {searchQuery 
                  ? `No reviews match your search for "${searchQuery}". Try different keywords.`
                  : "Reviews will appear here once students submit feedback."}
              </p>
              {searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 rounded-xl hover:border-indigo-500/50 transition-all duration-300"
                >
                  Clear Search & Filters
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Search Results Header */}
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between mb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <Search className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Search Results
                      </h3>
                      <p className="text-sm text-gray-400">
                        Found {searchResults} review{searchResults !== 1 ? 's' : ''} for "{searchQuery}"
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    Clear search
                  </button>
                </motion.div>
              )}

              {/* Reviews Grid */}
              <div className="grid gap-6">
                {filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.bookingId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border backdrop-blur-sm overflow-hidden group transition-all duration-300 ${
                      selectedReviews.has(review.bookingId)
                        ? "border-indigo-500/50 bg-indigo-500/10 shadow-2xl shadow-indigo-500/20"
                        : "border-gray-700/50 hover:border-gray-600/50 hover:shadow-xl"
                    }`}
                  >
                    <div className="p-6">
                      {/* Review Header */}
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Student Avatar with Status */}
                          <div className="relative">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform ${
                              review.isApproved 
                                ? "bg-gradient-to-br from-green-500 to-emerald-500"
                                : review.isRejected
                                ? "bg-gradient-to-br from-red-500 to-rose-500"
                                : "bg-gradient-to-br from-yellow-500 to-amber-500"
                            }`}>
                              <span className="text-xl font-bold text-white">
                                {review.student?.name?.charAt(0).toUpperCase() || "A"}
                              </span>
                            </div>
                            <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center ${
                              review.isApproved 
                                ? "bg-green-500" 
                                : review.isRejected
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}>
                              {review.isApproved ? (
                                <ThumbsUp className="w-3.5 h-3.5 text-white" />
                              ) : review.isRejected ? (
                                <ThumbsDown className="w-3.5 h-3.5 text-white" />
                              ) : (
                                <AlertTriangle className="w-3.5 h-3.5 text-white" />
                              )}
                            </div>
                          </div>

                          {/* Student Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                                  {review.student?.name || "Anonymous Student"}
                                </h4>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                  {/* Status Badge */}
                                  {getStatusBadge(review)}
                                  
                                  <span className="flex items-center gap-1.5 text-sm text-gray-400">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(review.reviewedAt)}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Rating Badge */}
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < Math.floor(review.rating || 0)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-600"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-lg font-bold text-white">
                                    {review.rating || 0}/5
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Student Details */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                <Building className="w-4 h-4" />
                                <span>{review.student?.college || "Unknown College"}</span>
                              </div>
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                <GraduationCap className="w-4 h-4" />
                                <span>{getGraduationLabel(review.student?.graduationYear)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          {/* Selection Checkbox */}
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedReviews.has(review.bookingId)}
                                onChange={() => toggleReviewSelection(review.bookingId)}
                                className="w-6 h-6 rounded-lg border-gray-600 bg-gray-800 checked:bg-indigo-500 checked:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 appearance-none"
                              />
                              {selectedReviews.has(review.bookingId) && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                            <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                              Select
                            </span>
                          </label>
                          
                          {/* Approve/Reject Buttons */}
                          <div className="flex items-center gap-2">
                            {!review.isApproved && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleApproveReview(review.bookingId)}
                                disabled={approvingId === review.bookingId}
                                className="px-4 py-2.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-400 hover:border-green-500/40 hover:text-green-300 hover:bg-green-500/20 rounded-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {approvingId === review.bookingId ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-sm font-semibold">Approving...</span>
                                  </>
                                ) : (
                                  <>
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Approve</span>
                                  </>
                                )}
                              </motion.button>
                            )}
                            
                            {!review.isRejected && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRejectReview(review.bookingId)}
                                disabled={rejectingId === review.bookingId}
                                className="px-4 py-2.5 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-red-400 hover:border-red-500/40 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {rejectingId === review.bookingId ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-sm font-semibold">Rejecting...</span>
                                  </>
                                ) : (
                                  <>
                                    <ThumbsDown className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Reject</span>
                                  </>
                                )}
                              </motion.button>
                            )}
                            
                            {/* Toggle Status if already approved/rejected */}
                            {(review.isApproved || review.isRejected) && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => 
                                  review.isApproved 
                                    ? handleRejectReview(review.bookingId)
                                    : handleApproveReview(review.bookingId)
                                }
                                className="px-4 py-2.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-400 hover:border-indigo-500/40 hover:text-indigo-300 hover:bg-indigo-500/20 rounded-xl transition-all duration-300 flex items-center gap-2"
                              >
                                <RefreshCw className="w-4 h-4" />
                                <span className="text-sm font-semibold">
                                  {review.isApproved ? "Mark as Rejected" : "Mark as Approved"}
                                </span>
                              </motion.button>
                            )}
                          </div>
                          
                          {/* Delete Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteReview(review.bookingId)}
                            className="px-4 py-2.5 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-red-400 hover:border-red-500/40 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-semibold">Delete</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>

                      {/* Review Content */}
                      <div className="mb-8">
                        <div className="relative">
                          <div className="absolute -left-3 top-0 text-7xl text-gray-800/30 select-none">"</div>
                          <p className="text-gray-300 text-lg leading-relaxed pl-8 pr-8 italic">
                            {review.comment || "No comment provided"}
                          </p>
                          <div className="absolute -right-3 bottom-0 text-7xl text-gray-800/30 select-none">"</div>
                        </div>
                      </div>

                      {/* Mentor Info */}
                      <div className="bg-gray-900/30 rounded-2xl border border-gray-700/50 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Mentor</p>
                              <p className="font-semibold text-lg text-white">
                                {review.mentor?.name || "Unknown Mentor"}
                              </p>
                            </div>
                          </div>
                          {review.mentor?.currentCompany && (
                            <div className="text-right">
                              <p className="text-sm text-gray-400">Current Company</p>
                              <p className="font-medium text-gray-300">{review.mentor.currentCompany}</p>
                            </div>
                          )}
                          {review.mentor?.college && (
                            <div className="text-right">
                              <p className="text-sm text-gray-400">college</p>
                              <p className="font-medium text-gray-300">{review.mentor.college}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Bulk Actions Footer */}
        {selectedReviews.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl z-50"
          >
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl p-6 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center"
                  >
                    <Shield className="w-7 h-7 text-indigo-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Selected Reviews</h3>
                    <p className="text-sm text-gray-400">
                      {selectedReviews.size} review{selectedReviews.size !== 1 ? 's' : ''} selected • {Math.round((selectedReviews.size / filteredReviews.length) * 100)}% of visible results
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={selectAllVisible}
                    className="px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white rounded-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="text-sm font-semibold">Select All Visible</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedReviews(new Set())}
                    className="px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white rounded-xl transition-all duration-300"
                  >
                    <span className="text-sm font-semibold">Clear</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBulkApprove}
                    className="px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-green-500/20"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span className="font-bold">Approve Selected</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBulkReject}
                    className="px-5 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-yellow-500/20"
                  >
                    <ThumbsDown className="w-5 h-5" />
                    <span className="font-bold">Reject Selected</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDeleteSelected}
                    className="px-5 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-red-500/20"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="font-bold">Delete Selected</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Footer */}
        {filteredReviews.length > 0 && selectedReviews.size === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-gray-800/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
                  <MessageSquare className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Showing results</p>
                  <p className="text-lg font-semibold text-white">
                    {filteredReviews.length} of {reviews.length} reviews
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={selectAllVisible}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-400 hover:border-indigo-500/40 hover:text-indigo-300 rounded-xl transition-all duration-300 flex items-center gap-3"
                >
                  <span className="font-semibold">Select All</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchReviews}
                  className="px-6 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white rounded-xl transition-all duration-300 flex items-center gap-3"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="font-semibold">Refresh</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminReview;