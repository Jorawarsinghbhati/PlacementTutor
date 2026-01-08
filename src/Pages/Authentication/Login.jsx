// // import React, { useState } from "react";
// // import { apiConnector } from "../../Service/apiConnector";
// // import { authEndpoints } from "../../Service/apis";
// // import { useNavigate } from "react-router-dom";
// // import { Mail, Lock, Loader2, Sparkles, ArrowRight, Shield } from "lucide-react";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const sendOtp = async () => {
// //     if (!email || !email.includes("@")) {
// //       setError("Please enter a valid email address");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError("");
// //       await apiConnector("POST", authEndpoints.SEND_OTP, { email });
// //       navigate("/otp", { state: { email } });
// //     } catch (e) {
// //       console.error(e);
// //       setError("Failed to send OTP. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleGoogleLogin = async () => {
// //     try {
// //       const res = await apiConnector("GET", authEndpoints.GOOGLE_OAUTH + "/url");
// //       window.location.href = res.data.url;
// //     } catch (error) {
// //       console.error(error);
// //       setError("Failed to connect with Google");
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       sendOtp();
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
// //       {/* Animated background elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
// //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
// //       </div>

// //       <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl w-full max-w-md overflow-hidden border border-white/10 shadow-2xl">
// //         {/* Header */}
// //         <div className="p-8 pb-6">
// //           <div className="flex items-center justify-center gap-3 mb-2">
// //             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
// //               <Sparkles className="text-white" size={24} />
// //             </div>
// //             <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
// //               PlacementTutor
// //             </h1>
// //           </div>
// //           <p className="text-gray-400 text-center text-sm">
// //             Unlock your career potential with expert guidance
// //           </p>
// //         </div>

// //         {/* Form Container */}
// //         <div className="p-8 pt-6">
// //           {/* Email Input */}
// //           <div className="mb-6">
// //             <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
// //               <Mail size={16} />
// //               Email Address
// //             </label>
// //             <div className="relative">
// //               <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
// //                 <Mail size={18} className="text-gray-500" />
// //               </div>
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => {
// //                   setEmail(e.target.value);
// //                   setError("");
// //                 }}
// //                 onKeyPress={handleKeyPress}
// //                 placeholder="Enter your email address"
// //                 className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
// //               />
// //             </div>
// //             {error && (
// //               <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
// //                 <Shield size={14} />
// //                 {error}
// //               </p>
// //             )}
// //           </div>

// //           {/* Send OTP Button */}
// //           <button
// //             onClick={sendOtp}
// //             disabled={loading}
// //             className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mb-4"
// //           >
// //             {loading ? (
// //               <>
// //                 <Loader2 className="animate-spin" size={20} />
// //                 Sending OTP...
// //               </>
// //             ) : (
// //               <>
// //                 Send OTP
// //                 <ArrowRight size={20} />
// //               </>
// //             )}
// //           </button>

// //           {/* Divider */}
// //           <div className="flex items-center my-6">
// //             <div className="flex-1 h-px bg-gray-700"></div>
// //             <span className="px-4 text-sm text-gray-500">or continue with</span>
// //             <div className="flex-1 h-px bg-gray-700"></div>
// //           </div>

// //           {/* Google Login Button */}
// //           <button
// //             onClick={handleGoogleLogin}
// //             className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
// //           >
// //             <svg className="w-5 h-5" viewBox="0 0 24 24">
// //               <path
// //                 fill="currentColor"
// //                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
// //               />
// //               <path
// //                 fill="currentColor"
// //                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
// //               />
// //               <path
// //                 fill="currentColor"
// //                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
// //               />
// //               <path
// //                 fill="currentColor"
// //                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
// //               />
// //             </svg>
// //             <span>Continue with Google</span>
// //           </button>

// //           {/* Footer */}
// //           <div className="mt-8 text-center">
// //             <p className="text-sm text-gray-500">
// //               By continuing, you agree to our{" "}
// //               <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
// //                 Terms
// //               </a>{" "}
// //               and{" "}
// //               <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
// //                 Privacy Policy
// //               </a>
// //             </p>
// //             <div className="mt-6 pt-6 border-t border-gray-800">
// //               <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
// //                 <div className="flex items-center gap-1">
// //                   <Shield size={12} />
// //                   <span>Secure Login</span>
// //                 </div>
// //                 <div className="w-px h-4 bg-gray-700"></div>
// //                 <div className="flex items-center gap-1">
// //                   <Lock size={12} />
// //                   <span>Encrypted Data</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Decorative bottom gradient */}
// //         <div className="h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600"></div>
// //       </div>

// //       {/* Floating particles animation */}
// //       <div className="absolute bottom-10 text-center w-full">
// //         <div className="inline-flex items-center gap-2 text-xs text-gray-500">
// //           <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
// //           <span>Trusted by 10,000+ students worldwide</span>
// //           <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { apiConnector } from "../../Service/apiConnector";
// import { authEndpoints } from "../../Service/apis";
// import { useNavigate } from "react-router-dom";
// import {
//   Mail, Lock, Loader2, X, ArrowRight, Shield, User,
//   CheckCircle, Star, Users, Award, BookOpen, ChevronRight,
//   Calendar, Clock, CreditCard, Check, MessageSquare, HelpCircle,
//   Linkedin, Instagram, ExternalLink, Sparkles, ChevronDown
// } from "lucide-react";

// const Login = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // FAQ state
//   const [openFaqIndex, setOpenFaqIndex] = useState(0);

//   // Testimonial animation state
//   const [testimonialIndex, setTestimonialIndex] = useState(0);

//   // Scroll lock when modal is open
//   useEffect(() => {
//     if (showLogin) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [showLogin]);

//   const sendOtp = async () => {
//     if (!email || !email.includes("@")) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       await apiConnector("POST", authEndpoints.SEND_OTP, { email });
//       setShowLogin(false);
//       navigate("/otp", { state: { email } });
//     } catch (e) {
//       console.error(e);
//       setError("Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const res = await apiConnector("GET", authEndpoints.GOOGLE_OAUTH + "/url");
//       setShowLogin(false);
//       window.location.href = res.data.url;
//     } catch (error) {
//       console.error(error);
//       setError("Failed to connect with Google");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendOtp();
//     }
//   };

//   // Close on escape key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape" && showLogin) {
//         setShowLogin(false);
//       }
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [showLogin]);

//   // Testimonial data
//   const testimonials = [
//     {
//       name: "Priya Sharma",
//       college: "BITS Pilani • Pre-final Year",
//       rating: 5,
//       review: "I was confused about whether to go for product-based or service-based companies. One session with Abhishek cleared all my doubts. He gave me a proper roadmap for DSA and development. Now I feel much more confident about my preparation."
//     },
//     {
//       name: "Arjun Patel",
//       college: "IIT Delhi • Final Year",
//       rating: 5,
//       review: "Best mentorship I have received! Abhishek reviewed my projects and suggested improvements that made my portfolio stand out. His system design tips helped me crack Razorpay. Forever grateful 😊"
//     },
//     {
//       name: "Sneha Reddy",
//       college: "NIT Trichy • 2nd Year",
//       rating: 5,
//       review: "Was struggling with competitive programming and felt demotivated. Abhishek not only helped with CP strategies but also motivated me to keep going. His practical approach to problem-solving is exceptional!"
//     },
//     {
//       name: "Rohan Mehta",
//       college: "IIIT Hyderabad • Final Year",
//       rating: 5,
//       review: "The resume review session was transformative. Abhishek pointed out critical improvements that I had missed. Got interview calls from 3 FAANG companies after implementing his suggestions!"
//     },
//     {
//       name: "Neha Gupta",
//       college: "DTU • 3rd Year",
//       rating: 5,
//       review: "Abhishek's guidance on system design was invaluable. He broke down complex concepts into digestible parts. Cracked my Amazon interview thanks to his mentorship!"
//     }
//   ];

//   // FAQ data
//   const faqItems = [
//     {
//       question: "How do I book a mentorship session?",
//       answer: "Simply click on 'Book Your Session' button, select your preferred date and time slot, complete the payment of ₹200, and you're all set! You'll receive a confirmation email with all the details."
//     },
//     {
//       question: "What topics can I discuss during the session?",
//       answer: "You can discuss anything related to career guidance, technical interview preparation, project guidance, DSA concepts, system design, resume review, and more.",
//       subAnswer: "How will I receive the meeting link? You'll receive the meeting link via email and WhatsApp immediately after booking confirmation."
//     },
//     {
//       question: "Can I reschedule or cancel my booking?",
//       answer: "Yes, you can reschedule or cancel your booking up to 24 hours before the scheduled session. Cancellations within 24 hours may be subject to a cancellation fee."
//     },
//     {
//       question: "What if I face payment issues?",
//       answer: "If you face any payment issues, please contact our support team at support@placementtutor.com. We'll help you resolve the issue within 24 hours."
//     },
//     {
//       question: "Is refund available?",
//       answer: "Full refunds are available for cancellations made 48 hours before the session. For cancellations within 48-24 hours, 50% refund is provided. No refund for cancellations within 24 hours."
//     },
//     {
//       question: "How long is each mentorship session?",
//       answer: "Each mentorship session is typically 1 hour long. However, you can book extended sessions if needed during the booking process."
//     },
//     {
//       question: "Do I need any prior experience?",
//       answer: "No prior experience is required. Our mentors tailor sessions based on your current skill level and learning goals."
//     },
//     {
//       question: "What's the cancellation policy?",
//       answer: "Cancellations can be made through your account dashboard. Full refund for 48+ hours notice, 50% refund for 24-48 hours notice, no refund for <24 hours notice."
//     }
//   ];

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   // Main page content with updated dark theme
//   const renderMainPage = () => (
//     <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white">
//       {/* Navigation */}
//       <nav className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#111827] to-transparent backdrop-blur-sm border-b border-white/10 z-40">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
//               <BookOpen className="text-white" size={22} />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               PlacementTutor
//             </span>
//           </div>

//           <div className="flex items-center gap-4">
//             <button className="text-gray-300 hover:text-white transition-colors px-4 py-2">
//               Mentors
//             </button>
//             <button className="text-gray-300 hover:text-white transition-colors px-4 py-2">
//               Testimonials
//             </button>
//             <button className="text-gray-300 hover:text-white transition-colors px-4 py-2">
//               FAQ
//             </button>
//             <button
//               onClick={() => setShowLogin(true)}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-indigo-500/30"
//             >
//               Book Session
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
//               Get the Correct Direction<br />
//               <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
//                 and Path from Our Guidance
//               </span>
//             </h1>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
//               We're here to support you and make you better. Book personalized 1:1 mentorship sessions
//               with experienced tech professionals and accelerate your career growth.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={() => setShowLogin(true)}
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-3 group"
//               >
//                 <Calendar size={22} />
//                 Book Your Session
//                 <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
//               </button>
//               <button className="bg-white/10 border border-white/20 hover:border-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 hover:bg-white/20">
//                 <ExternalLink size={22} />
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
//             <div className="text-center">
//               <div className="text-5xl font-bold text-white mb-2">200+</div>
//               <div className="text-gray-300">Students Mentored</div>
//             </div>
//             <div className="text-center">
//               <div className="text-5xl font-bold text-white mb-2">4.9★</div>
//               <div className="text-gray-300">Average Rating</div>
//             </div>
//             <div className="text-center">
//               <div className="text-5xl font-bold text-white mb-2">₹200</div>
//               <div className="text-gray-300">Per Session</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mentor Section */}
//       <section className="py-20 bg-gradient-to-b from-transparent to-white/5">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">Your Mentor</h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Meet Your Expert Guide
//             </p>
//             <p className="text-gray-300 mt-2">
//               Get personalized 1:1 mentorship from an industry expert who has helped hundreds of
//               students achieve their career goals.
//             </p>
//           </div>

//           <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-3xl shadow-2xl overflow-hidden border border-white/10">
//             <div className="md:flex">
//               {/* Mentor Image/Profile */}
//               <div className="md:w-2/5 bg-gradient-to-br from-indigo-500 to-purple-500 p-8 text-white relative">
//                 <div className="text-center">
//                   <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-sm">
//                     <User size={48} className="text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-2">Abhishek Ranjan</h3>
//                   <p className="text-white/80 mb-6">Founder & Lead Mentor</p>

//                   <div className="grid grid-cols-3 gap-4 mb-8">
//                     <div className="text-center">
//                       <div className="text-2xl font-bold">200+</div>
//                       <div className="text-sm opacity-90">Students</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold">4.9</div>
//                       <div className="text-sm opacity-90">Rating</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold">20+</div>
//                       <div className="text-sm opacity-90">Internships</div>
//                     </div>
//                   </div>

//                   <div className="flex justify-center gap-4">
//                     <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
//                       <Linkedin size={20} />
//                     </button>
//                     <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
//                       <Instagram size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Mentor Details */}
//               <div className="md:w-3/5 p-8 md:p-12">
//                 <div className="mb-8">
//                   <h4 className="text-2xl font-bold text-white mb-4">
//                     Founder of PlacementTutor
//                   </h4>
//                   <p className="text-gray-300 leading-relaxed mb-4">
//                     Cracked 20+ off-campus internships at top MNCs including Expedia (joining as SDE).
//                     Expert in full-stack development, system design & placement prep. Mentored 200+
//                     students to crack technical interviews and land top tech roles.
//                   </p>
//                   <p className="text-gray-300 leading-relaxed">
//                     Abhishek Ranjan is the founder of PlacementTutor, bringing over two years of hands-on
//                     experience in the technology industry. A passionate educator and mentor, he has guided
//                     more than 200 college students through their academic and early professional journeys.
//                   </p>
//                 </div>

//                 <div className="mb-8">
//                   <h5 className="text-lg font-semibold text-white mb-4">Areas of Expertise</h5>
//                   <div className="flex flex-wrap gap-3">
//                     {['Full-Stack Development', 'System Design', 'DSA', 'Career Guidance', 'Interview Prep'].map((skill) => (
//                       <span key={skill} className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setShowLogin(true)}
//                   className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2"
//                 >
//                   <MessageSquare size={20} />
//                   Book Session with Abhishek
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Book Now Section */}
//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">Book Now</h2>
//             <h3 className="text-2xl font-semibold text-gray-300 mb-6">
//               Book a 1:1 Session with Abhishek Ranjan and His Team
//             </h3>

//             <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-6">
//               <CreditCard size={28} className="text-indigo-400" />
//               <span>₹200</span>
//               <span className="text-lg text-gray-300 font-normal">/ Hour session</span>
//             </div>

//             <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
//               Get personalized mentorship from experienced tech professionals. Whether you're preparing for placements,
//               learning new technologies, or planning your career path, we're here to guide you.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Benefits */}
//             <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-lg">
//               <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
//                 <Sparkles className="text-indigo-400" />
//                 What You Get
//               </h3>
//               <ul className="space-y-4">
//                 {[
//                   "Personalized guidance tailored to your goals",
//                   "Career roadmap and planning",
//                   "Technical interview preparation",
//                   "Resume and portfolio review",
//                   "Doubt clearing sessions",
//                   "Project guidance"
//                 ].map((benefit, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
//                     <span className="text-gray-300">{benefit}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* How It Works */}
//             <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 border border-indigo-500/20">
//               <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
//                 <Clock className="text-indigo-400" />
//                 How It Works
//               </h3>
//               <ol className="space-y-6">
//                 {[
//                   { step: "1", title: "Choose Your Mentor", desc: "Select from our team of experienced mentors based on your needs." },
//                   { step: "2", title: "Pick a Date", desc: "Choose a convenient date from our available calendar." },
//                   { step: "3", title: "Select Time Slot", desc: "Pick from available 1-hour slots between 3 PM - 12 AM." },
//                   { step: "4", title: "Complete Payment", desc: "Pay securely via Razorpay and receive instant confirmation." }
//                 ].map((item) => (
//                   <li key={item.step} className="flex items-start gap-4">
//                     <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
//                       {item.step}
//                     </div>
//                     <div>
//                       <div className="font-medium text-white">{item.title}</div>
//                       <div className="text-gray-300 text-sm mt-1">{item.desc}</div>
//                     </div>
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </div>

//           <div className="text-center mt-12">
//             <button
//               onClick={() => setShowLogin(true)}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-indigo-500/30 flex items-center gap-3 mx-auto group"
//             >
//               <Calendar size={22} />
//               Start Your Journey Now
//               <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section with Slide Animation */}
//       <section className="py-20 bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">Testimonials</h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               What Our Students Say
//             </p>
//             <p className="text-gray-300 mt-2">
//               Real reviews from students who transformed their careers with PlacementTutor.
//             </p>
//           </div>

//           {/* Stats Bar */}
//           <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
//             <div className="flex items-center gap-2">
//               <div className="text-3xl font-bold text-white">4.9</div>
//               <div className="text-yellow-400">★★★★★</div>
//               <div className="text-gray-300 ml-2">Average Rating</div>
//             </div>
//             <div className="text-gray-300">•</div>
//             <div className="text-gray-300">
//               <span className="font-bold text-white">200+</span> Students Mentored
//             </div>
//             <div className="text-gray-300">•</div>
//             <div className="text-gray-300">
//               <span className="font-bold text-white">95%</span> Satisfaction Rate
//             </div>
//           </div>

//           {/* Testimonial Carousel */}
//           <div className="relative h-[400px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f2937] to-[#111827] border border-white/10 p-8">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={testimonialIndex}
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.5, ease: "easeInOut" }}
//                 className="absolute inset-0 p-8 flex flex-col items-center justify-center"
//               >
//                 <div className="text-center max-w-3xl mx-auto">
//                   <div className="flex justify-center text-yellow-400 text-2xl mb-6">
//                     {"★".repeat(testimonials[testimonialIndex].rating)}
//                   </div>
//                   <p className="text-gray-300 italic text-xl mb-8 leading-relaxed">
//                     "{testimonials[testimonialIndex].review}"
//                   </p>
//                   <div className="mt-6">
//                     <div className="font-semibold text-white text-lg">{testimonials[testimonialIndex].name}</div>
//                     <div className="text-sm text-gray-300">{testimonials[testimonialIndex].college}</div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Testimonial Navigation Dots */}
//             <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setTestimonialIndex(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === testimonialIndex
//                       ? "bg-indigo-500 w-8"
//                       : "bg-white/30 hover:bg-white/50"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Navigation Buttons */}
//             <button
//               onClick={() => setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
//             >
//               <ChevronDown className="rotate-90" size={24} />
//             </button>
//             <button
//               onClick={() => setTestimonialIndex(prev => (prev + 1) % testimonials.length)}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
//             >
//               <ChevronDown className="-rotate-90" size={24} />
//             </button>
//           </div>

//           {/* Additional Testimonial Cards Grid */}
//           <div className="grid md:grid-cols-3 gap-6 mt-12">
//             {testimonials.slice(0, 3).map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300"
//               >
//                 <div className="flex text-yellow-400 mb-4">
//                   {"★".repeat(testimonial.rating)}
//                 </div>
//                 <p className="text-gray-300 italic mb-6 line-clamp-4">
//                   "{testimonial.review}"
//                 </p>
//                 <div>
//                   <div className="font-semibold text-white">{testimonial.name}</div>
//                   <div className="text-sm text-gray-300">{testimonial.college}</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section with Accordion */}
//       <section className="py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">Got questions? We've got answers.</h2>
//             <p className="text-xl text-gray-300">
//               If you can't find what you're looking for, feel free to contact us.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {faqItems.map((faq, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl border border-white/10 overflow-hidden"
//               >
//                 <button
//                   onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
//                   className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
//                       <HelpCircle size={16} className="text-white" />
//                     </div>
//                     <span className="font-semibold text-lg text-white">{faq.question}</span>
//                   </div>
//                   <motion.div
//                     animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="ml-4 flex-shrink-0"
//                   >
//                     <ChevronDown size={20} className="text-gray-400" />
//                   </motion.div>
//                 </button>

//                 <AnimatePresence>
//                   {openFaqIndex === index && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="px-6 pb-5 pt-2 border-t border-white/10">
//                         <p className="text-gray-300 mb-3">{faq.answer}</p>
//                         {faq.subAnswer && (
//                           <div className="mt-4 pl-4 border-l-2 border-indigo-500/50">
//                             <h4 className="font-medium text-white mb-2">
//                               How will I receive the meeting link?
//                             </h4>
//                             <p className="text-gray-300">{faq.subAnswer}</p>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </div>

//           {/* Contact Support */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="mt-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 border border-indigo-500/20 text-center"
//           >
//             <h3 className="text-xl font-semibold text-white mb-4">Still have questions?</h3>
//             <p className="text-gray-300 mb-6">
//               Can't find the answer you're looking for? Please chat with our friendly team.
//             </p>
//             <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
//               Contact Support
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="py-20 bg-gradient-to-br from-indigo-500 to-purple-500">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Ready to Transform Your Career?
//           </h2>
//           <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
//             Join 200+ students who've successfully cracked their dream placements with our guidance.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => setShowLogin(true)}
//               className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3 group"
//             >
//               <Calendar size={22} />
//               Book Your First Session
//               <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
//             </button>
//             <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95">
//               Speak to Our Team
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gradient-to-b from-[#0b1220] to-[#000000] text-white py-12 border-t border-white/10">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center gap-3 mb-6 md:mb-0">
//               <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
//                 <BookOpen className="text-white" size={22} />
//               </div>
//               <span className="text-xl font-bold">PlacementTutor</span>
//             </div>

//             <div className="flex gap-6">
//               <button className="text-gray-400 hover:text-white transition-colors">
//                 Terms
//               </button>
//               <button className="text-gray-400 hover:text-white transition-colors">
//                 Privacy
//               </button>
//               <button className="text-gray-400 hover:text-white transition-colors">
//                 Contact
//               </button>
//             </div>

//             <button
//               onClick={() => setShowLogin(true)}
//               className="mt-6 md:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
//             >
//               Get Started
//             </button>
//           </div>

//           <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
//             © {new Date().getFullYear()} PlacementTutor. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );

//   // Login Modal Component with updated theme
//   const LoginModal = () => (
//     <AnimatePresence>
//       {showLogin && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//         >
//           {/* Backdrop Blur */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-black/70 backdrop-blur-md"
//             onClick={() => setShowLogin(false)}
//           />

//           {/* Modal Content */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="relative w-full max-w-4xl bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10"
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setShowLogin(false)}
//               className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
//             >
//               <X size={20} className="text-gray-300 group-hover:text-white" />
//             </button>

//             <div className="flex flex-col lg:flex-row h-full">
//               {/* Left Side - Info */}
//               <div className="lg:w-2/5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
//                 <div className="relative z-10">
//                   <div className="flex items-center gap-3 mb-8">
//                     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                       <BookOpen size={24} className="text-white" />
//                     </div>
//                     <h1 className="text-2xl font-bold">PlacementTutor</h1>
//                   </div>

//                   <div className="mb-8">
//                     <h2 className="text-3xl font-bold mb-4">
//                       Start Your Journey Today
//                     </h2>
//                     <p className="text-white/90 leading-relaxed">
//                       Sign in to book your personalized mentorship session with industry experts.
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-8">
//                     <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//                       <div className="text-2xl font-bold">200+</div>
//                       <div className="text-sm opacity-90">Students</div>
//                     </div>
//                     <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//                       <div className="text-2xl font-bold">4.9★</div>
//                       <div className="text-sm opacity-90">Rating</div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3">
//                       <CheckCircle className="text-emerald-300" size={20} />
//                       <span>Personalized 1:1 Sessions</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <CheckCircle className="text-emerald-300" size={20} />
//                       <span>Expert Career Guidance</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <CheckCircle className="text-emerald-300" size={20} />
//                       <span>Instant Booking Confirmation</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Side - Login Form */}
//               <div className="lg:w-3/5 p-8 lg:p-12">
//                 <div className="max-w-md mx-auto">
//                   <div className="text-center mb-8">
//                     <h2 className="text-2xl font-bold text-white">Welcome to PlacementTutor</h2>
//                     <p className="text-gray-300 mt-2">Sign in to book your session</p>
//                   </div>

//                   {/* Email Input */}
//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Email Address
//                     </label>
//                     <div className="relative">
//                       <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                         <Mail size={20} className="text-gray-400" />
//                       </div>
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => {
//                           setEmail(e.target.value);
//                           setError("");
//                         }}
//                         onKeyPress={handleKeyPress}
//                         placeholder="student@example.com"
//                         className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                     <AnimatePresence>
//                       {error && (
//                         <motion.p
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="mt-2 text-sm text-red-400 flex items-center gap-2"
//                         >
//                           <Shield size={14} />
//                           {error}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Send OTP Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={sendOtp}
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <Loader2 className="animate-spin" size={20} />
//                         Sending OTP...
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-2">
//                         Send OTP
//                         <ArrowRight size={20} />
//                       </span>
//                     )}
//                   </motion.button>

//                   {/* Divider */}
//                   <div className="flex items-center my-6">
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                     <span className="px-4 text-sm text-gray-400">or continue with</span>
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                   </div>

//                   {/* Google Login */}
//                   <motion.button
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleGoogleLogin}
//                     className="w-full bg-white/10 border border-white/20 hover:border-indigo-500 text-gray-300 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/20"
//                   >
//                     <svg className="w-5 h-5" viewBox="0 0 24 24">
//                       <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                       <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                       <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                       <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                     </svg>
//                     <span>Continue with Google</span>
//                   </motion.button>

//                   {/* Footer */}
//                   <div className="mt-8 pt-6 border-t border-gray-700 text-center">
//                     <p className="text-sm text-gray-400">
//                       By continuing, you agree to our{" "}
//                       <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
//                         Terms
//                       </a>{" "}
//                       and{" "}
//                       <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
//                         Privacy Policy
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div className={showLogin ? "overflow-hidden" : ""}>
//       {renderMainPage()}
//       <LoginModal />
//     </div>
//   );
// };

// export default Login;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { apiConnector } from "../../Service/apiConnector";
// import { authEndpoints } from "../../Service/apis";
// import { useNavigate } from "react-router-dom";
// import {
//   Mail, Loader2, X, ArrowRight, Shield, User,
//   CheckCircle, BookOpen, ChevronDown,
//   Calendar, Clock as ClockIcon, CreditCard, Check, MessageSquare, HelpCircle,
//   Linkedin, Instagram, ExternalLink, Sparkles, Users, Star,
//   Quote, ChevronUp, ChevronLeft, ChevronRight, Minus, Plus
// } from "lucide-react";

// const Login = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [animatedStats, setAnimatedStats] = useState({
//     students: 0,
//     rating: 0,
//     price: 0
//   });

//   const [openFAQ, setOpenFAQ] = useState(null);
//   const [testimonialIndex, setTestimonialIndex] = useState(0);

//   const testimonials = [
//     {
//       name: "Priya Sharma",
//       college: "BITS Pilani • Pre-final Year",
//       rating: 5,
//       review: "I was confused about whether to go for product-based or service-based companies. One session with Abhishek cleared all my doubts. He gave me a proper roadmap for DSA and development. Now I feel much more confident about my preparation."
//     },
//     {
//       name: "Arjun Patel",
//       college: "IIT Delhi • Final Year",
//       rating: 5,
//       review: "Best mentorship I have received! Abhishek reviewed my projects and suggested improvements that made my portfolio stand out. His system design tips helped me crack Razorpay. Forever grateful 😊"
//     },
//     {
//       name: "Sneha Reddy",
//       college: "NIT Trichy • 2nd Year",
//       rating: 5,
//       review: "Was struggling with competitive programming and felt demotivated. Abhishek not only helped with CP strategies but also motivated me to keep going. His practical approach to problem-solving is exceptional!"
//     },
//     {
//       name: "Rohan Verma",
//       college: "IIIT Hyderabad • 3rd Year",
//       rating: 5,
//       review: "The career guidance session was transformative. Abhishek helped me identify my strengths and created a personalized roadmap. Landed my first internship at Amazon!"
//     },
//     {
//       name: "Anjali Singh",
//       college: "DTU • Final Year",
//       rating: 5,
//       review: "Resume review session was eye-opening. Abhishek pointed out critical improvements that I had missed. My callback rate increased by 300% after implementing his suggestions."
//     }
//   ];

//   const faqData = [
//     {
//       question: "How do I book a mentorship session?",
//       answer: "Simply click on 'Book Your Session' button, select your preferred date and time slot, complete the payment of ₹200, and you're all set! You'll receive a confirmation email with all the details."
//     },
//     {
//       question: "What topics can I discuss during the session?",
//       answer: "You can discuss anything related to career guidance, technical interview preparation, project guidance, DSA concepts, system design, resume review, placement strategies, mock interviews, and more. Our mentors are experienced in various domains of software engineering and product management."
//     },
//     {
//       question: "How will I receive the meeting link?",
//       answer: "You'll receive the meeting link via email and WhatsApp immediately after booking confirmation. The link will be active 10 minutes before your scheduled session. We recommend joining 5 minutes early to ensure everything is working properly."
//     },
//     {
//       question: "Can I reschedule or cancel my booking?",
//       answer: "Yes, you can reschedule or cancel your session up to 24 hours before the scheduled time. Please contact our support team or use the reschedule option in your confirmation email. Cancellations within 24 hours may be subject to a cancellation fee."
//     },
//     {
//       question: "What if I face payment issues?",
//       answer: "If you encounter any payment issues, please try again after 10 minutes. If the problem persists, contact our support team at support@placementtutor.com or WhatsApp us at +91-XXXXXXXXXX. We accept all major credit/debit cards, UPI, and net banking."
//     },
//     {
//       question: "Is refund available?",
//       answer: "Yes, full refunds are available for cancellations made at least 24 hours before the session. For technical issues during the session, we offer rescheduling or partial refunds based on the situation. Please refer to our refund policy for detailed information."
//     },
//     {
//       question: "How long is each mentorship session?",
//       answer: "Each mentorship session is 60 minutes long. This includes 50 minutes of dedicated discussion time and 10 minutes for Q&A and summary. You can book back-to-back sessions if you need more time."
//     },
//     {
//       question: "Do I need any prior experience?",
//       answer: "No prior experience is required! Our mentors tailor the session based on your current level, whether you're a beginner, intermediate, or advanced. We work with students from all backgrounds and experience levels."
//     }
//   ];

//   useEffect(() => {
//     const animateNumbers = () => {
//       const duration = 2000;
//       const steps = 100;
//       const interval = duration / steps;

//       let currentStep = 0;
//       const timer = setInterval(() => {
//         currentStep++;
//         const progress = currentStep / steps;

//         setAnimatedStats({
//           students: Math.floor(200 * progress),
//           rating: 4.9 * progress,
//           price: Math.floor(200 * progress)
//         });

//         if (currentStep >= steps) {
//           clearInterval(timer);
//           setAnimatedStats({
//             students: 200,
//             rating: 4.9,
//             price: 200
//           });
//         }
//       }, interval);

//       return () => clearInterval(timer);
//     };

//     animateNumbers();

//     const testimonialInterval = setInterval(() => {
//       setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(testimonialInterval);
//   }, []);

//   const BoxesBackground = () => (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <pattern
//             id="grid"
//             width="40"
//             height="40"
//             patternUnits="userSpaceOnUse"
//           >
//             <path
//               d="M 40 0 L 0 0 0 40"
//               fill="none"
//               stroke="rgba(255, 255, 255, 0.05)"
//               strokeWidth="1"
//             />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />
//       </svg>
//     </div>
//   );

//   const MeteorsEffect = ({ number = 10, className = "" }) => {
//     const [meteors, setMeteors] = useState([]);

//     useEffect(() => {
//       const newMeteors = Array.from({ length: number }).map((_, i) => ({
//         id: i,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: 2 + Math.random() * 3,
//         size: 1 + Math.random() * 2
//       }));
//       setMeteors(newMeteors);
//     }, [number]);

//     return (
//       <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
//         {meteors.map((meteor) => (
//           <motion.div
//             key={meteor.id}
//             className="absolute h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full"
//             style={{
//               left: `${meteor.left}%`,
//               top: "-10px",
//               width: `${meteor.size * 50}px`,
//               rotate: "45deg"
//             }}
//             animate={{
//               top: ["-10px", "110%"],
//               opacity: [0, 1, 0]
//             }}
//             transition={{
//               duration: meteor.duration,
//               delay: meteor.delay,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   const FAQAccordion = ({ faq, index }) => {
//     const isOpen = openFAQ === index;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.1 }}
//         className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300"
//       >
//         <motion.button
//           onClick={() => setOpenFAQ(isOpen ? null : index)}
//           className="w-full p-6 text-left flex items-center justify-between group hover:bg-white/5 transition-colors duration-300"
//           whileHover={{ x: 5 }}
//         >
//           <div className="flex items-center gap-4">
//             <motion.div
//               animate={{ rotate: isOpen ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//               className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0"
//             >
//               <span className="text-white font-semibold">{index + 1}</span>
//             </motion.div>
//             <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
//               {faq.question}
//             </h3>
//           </div>
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//             className="text-gray-400 group-hover:text-white"
//           >
//             {isOpen ? <Minus size={20} /> : <Plus size={20} />}
//           </motion.div>
//         </motion.button>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <div className="px-6 pb-6">
//                 <div className="pl-12 border-l-2 border-indigo-500/30">
//                   <p className="text-gray-300 leading-relaxed">
//                     {faq.answer}
//                   </p>
//                   {index === 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="mt-4 flex items-center gap-2 text-sm text-indigo-400"
//                     >
//                       <CheckCircle size={14} />
//                       <span>Instant confirmation • No waiting time</span>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     );
//   };

//   const TestimonialCarousel = () => {
//     const [direction, setDirection] = useState(0);

//     const slideVariants = {
//       enter: (direction) => ({
//         x: direction > 0 ? 1000 : -1000,
//         opacity: 0
//       }),
//       center: {
//         x: 0,
//         opacity: 1
//       },
//       exit: (direction) => ({
//         x: direction < 0 ? 1000 : -1000,
//         opacity: 0
//       })
//     };

//     const paginate = (newDirection) => {
//       setDirection(newDirection);
//       setTestimonialIndex((prev) => {
//         let nextIndex = prev + newDirection;
//         if (nextIndex < 0) nextIndex = testimonials.length - 1;
//         if (nextIndex >= testimonials.length) nextIndex = 0;
//         return nextIndex;
//       });
//     };

//     return (
//       <div className="relative">
//         <div className="flex justify-center items-center gap-6 mb-8">
//           <motion.button
//             whileHover={{ scale: 1.1, x: -5 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => paginate(-1)}
//             className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
//           >
//             <ChevronLeft className="text-white" />
//           </motion.button>

//           <div className="flex gap-2">
//             {testimonials.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   setDirection(idx > testimonialIndex ? 1 : -1);
//                   setTestimonialIndex(idx);
//                 }}
//                 className="relative"
//               >
//                 <motion.div
//                   className={`w-3 h-3 rounded-full transition-colors ${
//                     idx === testimonialIndex
//                       ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
//                       : 'bg-white/20'
//                   }`}
//                   animate={{
//                     scale: idx === testimonialIndex ? [1, 1.2, 1] : 1
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     repeatDelay: 1
//                   }}
//                 />
//               </button>
//             ))}
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.1, x: 5 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => paginate(1)}
//             className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
//           >
//             <ChevronRight className="text-white" />
//           </motion.button>
//         </div>

//         <div className="relative h-[400px] overflow-hidden">
//           <AnimatePresence custom={direction} mode="wait">
//             <motion.div
//               key={testimonialIndex}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 x: { type: "spring", stiffness: 300, damping: 30 },
//                 opacity: { duration: 0.2 }
//               }}
//               className="absolute inset-0"
//             >
//               <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl h-full">
//                 <div className="flex flex-col h-full">
//                   <div className="mb-6">
//                     <motion.div
//                       initial={{ scale: 0, rotate: -180 }}
//                       animate={{ scale: 1, rotate: 0 }}
//                       transition={{ delay: 0.2, type: "spring" }}
//                       className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center"
//                     >
//                       <Quote className="w-6 h-6 text-indigo-400" />
//                     </motion.div>
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="flex text-yellow-400 text-2xl mb-6"
//                   >
//                     {Array(testimonials[testimonialIndex].rating).fill().map((_, i) => (
//                       <motion.span
//                         key={i}
//                         initial={{ scale: 0, rotate: -180 }}
//                         animate={{ scale: 1, rotate: 0 }}
//                         transition={{ delay: i * 0.1 + 0.4 }}
//                         whileHover={{ scale: 1.2, rotate: 180 }}
//                         className="cursor-pointer"
//                       >
//                         ★
//                       </motion.span>
//                     ))}
//                   </motion.div>

//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="text-gray-300 text-lg italic leading-relaxed mb-8 flex-grow"
//                   >
//                     "{testimonials[testimonialIndex].review}"
//                   </motion.p>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6 }}
//                     className="flex items-center justify-between"
//                   >
//                     <div>
//                       <div className="font-semibold text-white text-xl">
//                         {testimonials[testimonialIndex].name}
//                       </div>
//                       <div className="text-gray-300">
//                         {testimonials[testimonialIndex].college}
//                       </div>
//                     </div>
//                     <motion.div
//                       animate={{
//                         rotate: [0, 10, -10, 0],
//                         scale: [1, 1.1, 1]
//                       }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                         repeatDelay: 3
//                       }}
//                       className="w-12 h-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center border border-white/10"
//                     >
//                       <User className="w-5 h-5 text-indigo-400" />
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-wrap justify-center items-center gap-6 mt-8 text-gray-300"
//         >
//           <div className="flex items-center gap-2">
//             <motion.div
//               animate={{ scale: [1, 1.1, 1] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-2 h-2 bg-green-400 rounded-full"
//             />
//             <span>Testimonial {testimonialIndex + 1} of {testimonials.length}</span>
//           </div>
//           <div className="hidden md:block">•</div>
//           <div>Slide to read more testimonials</div>
//         </motion.div>
//       </div>
//     );
//   };

//   const InteractiveStatCard = ({ number, label, icon: Icon, delay = 0 }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.5 }}
//       whileHover={{ scale: 1.05, y: -5 }}
//       className="relative bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 cursor-pointer group"
//       onMouseEnter={() => setHoveredCard(label)}
//       onMouseLeave={() => setHoveredCard(null)}
//     >
//       <div className="relative z-10 flex items-center justify-between mb-4">
//         <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
//           <Icon className="w-6 h-6 text-indigo-400" />
//         </div>
//         <motion.div
//           animate={{
//             rotate: hoveredCard === label ? 360 : 0,
//             scale: hoveredCard === label ? 1.2 : 1
//           }}
//           transition={{ duration: 0.5 }}
//           className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
//         />
//       </div>
//       <div className="relative z-10 text-4xl font-bold text-white mb-2">
//         {number}
//         {label === "Rating" && "★"}
//         {label === "Price" && <span className="text-lg">₹</span>}
//       </div>
//       <div className="relative z-10 text-gray-300">{label}</div>
//     </motion.div>
//   );

//   const FloatingElements = () => (
//     <div className="fixed inset-0 pointer-events-none z-0">
//       {Array.from({ length: 15 }).map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-4 h-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, -20, 0],
//             x: [0, Math.random() * 20 - 10, 0],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: 3 + Math.random() * 2,
//             delay: Math.random() * 2,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//       ))}
//     </div>
//   );

//   const sendOtp = async () => {
//     if (!email || !email.includes("@")) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       await apiConnector("POST", authEndpoints.SEND_OTP, { email });
//       setShowLogin(false);
//       navigate("/otp", { state: { email } });
//     } catch (e) {
//       console.error(e);
//       setError("Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const res = await apiConnector("GET", authEndpoints.GOOGLE_OAUTH + "/url");
//       setShowLogin(false);
//       window.location.href = res.data.url;
//     } catch (error) {
//       console.error(error);
//       setError("Failed to connect with Google");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendOtp();
//     }
//   };

//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape" && showLogin) {
//         setShowLogin(false);
//       }
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [showLogin]);

//   useEffect(() => {
//     if (showLogin) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [showLogin]);

//   const renderMainPage = () => (
//     <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white overflow-hidden relative">
//       <BoxesBackground />
//       <MeteorsEffect number={8} />
//       <FloatingElements />

//       <nav className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#111827]/90 to-transparent backdrop-blur-md border-b border-white/10 z-40">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-3"
//           >
//             <motion.div
//               whileHover={{ rotate: 180 }}
//               transition={{ duration: 0.5 }}
//               className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
//             >
//               <BookOpen className="text-white" size={22} />
//             </motion.div>
//             <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               PlacementTutor
//             </span>
//           </motion.div>

//           <div className="flex items-center gap-4">
//             <motion.button
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               className="text-gray-300 hover:text-white transition-colors px-4 py-2"
//             >
//               Mentors
//             </motion.button>
//             <motion.button
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               className="text-gray-300 hover:text-white transition-colors px-4 py-2"
//             >
//               Testimonials
//             </motion.button>
//             <motion.button
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               className="text-gray-300 hover:text-white transition-colors px-4 py-2"
//             >
//               FAQ
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
//             >
//               Book Session
//             </motion.button>
//           </div>
//         </div>
//       </nav>

//       <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
//             >
//               Get the Correct Direction<br />
//               <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
//                 and Path from Our Guidance
//               </span>
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
//             >
//               We're here to support you and make you better. Book personalized 1:1 mentorship sessions
//               with experienced tech professionals and accelerate your career growth.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowLogin(true)}
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-3 group relative overflow-hidden"
//               >
//                 <motion.span
//                   className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
//                 />
//                 <Calendar size={22} />
//                 Book Your Session
//                 <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white/10 border border-white/20 hover:border-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 hover:bg-white/20"
//               >
//                 <ExternalLink size={22} />
//                 Learn More
//               </motion.button>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
//           >
//             <InteractiveStatCard
//               number={animatedStats.students}
//               label="Students Mentored"
//               icon={Users}
//               delay={0.1}
//             />
//             <InteractiveStatCard
//               number={animatedStats.rating.toFixed(1)}
//               label="Rating"
//               icon={Star}
//               delay={0.2}
//             />
//             <InteractiveStatCard
//               number={animatedStats.price}
//               label="Per Session"
//               icon={CreditCard}
//               delay={0.3}
//             />
//           </motion.div>
//         </div>
//       </section>

//       <section className="py-20 bg-gradient-to-b from-white/5 to-transparent">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-4xl font-bold text-white mb-4"
//             >
//               What Our Students Say
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//             >
//               Real reviews from students who transformed their careers with PlacementTutor.
//             </motion.p>
//           </div>

//           <TestimonialCarousel />
//         </div>
//       </section>

//       <section className="py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-4xl font-bold text-white mb-4"
//             >
//               Frequently Asked Questions
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               className="text-xl text-gray-300 mb-10"
//             >
//               Everything you need to know about our mentorship sessions
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-6 py-3 mb-8"
//             >
//               <HelpCircle className="w-5 h-5 text-indigo-400" />
//               <span className="text-indigo-300">
//                 {openFAQ === null ? 'Click on any question to expand' : 'Click to collapse'}
//               </span>
//             </motion.div>
//           </div>

//           <div className="space-y-4">
//             {faqData.map((faq, index) => (
//               <FAQAccordion key={index} faq={faq} index={index} />
//             ))}
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mt-12"
//           >
//             <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 border border-indigo-500/20">
//               <h3 className="text-xl font-semibold text-white mb-4">Still have questions?</h3>
//               <p className="text-gray-300 mb-6">
//                 Can't find the answer you're looking for? Please chat with our friendly team.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
//               >
//                 Get in touch
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <section className="py-20 bg-gradient-to-br from-indigo-500 to-purple-500 relative overflow-hidden">
//         <MeteorsEffect number={15} className="opacity-30" />
//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl font-bold text-white mb-6"
//           >
//             Ready to Transform Your Career?
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto"
//           >
//             Join 200+ students who've successfully cracked their dream placements with our guidance.
//           </motion.p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <motion.button
//               whileHover={{ scale: 1.05, y: -5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden"
//             >
//               <motion.span
//                 className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
//               />
//               <Calendar size={22} />
//               Book Your First Session
//               <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
//             >
//               Speak to Our Team
//             </motion.button>
//           </div>
//         </div>
//       </section>

//       <footer className="bg-gradient-to-b from-[#0b1220] to-[#000000] text-white py-12 border-t border-white/10">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="flex flex-col md:flex-row justify-between items-center"
//           >
//             <div className="flex items-center gap-3 mb-6 md:mb-0">
//               <motion.div
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
//               >
//                 <BookOpen className="text-white" size={22} />
//               </motion.div>
//               <span className="text-xl font-bold">PlacementTutor</span>
//             </div>

//             <div className="flex gap-6">
//               {["Terms", "Privacy", "Contact"].map((item, i) => (
//                 <motion.button
//                   key={item}
//                   initial={{ opacity: 0, y: 10 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   whileHover={{ y: -2 }}
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   {item}
//                 </motion.button>
//               ))}
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="mt-6 md:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
//             >
//               Get Started
//             </motion.button>
//           </motion.div>

//           <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
//             © {new Date().getFullYear()} PlacementTutor. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );

//   const LoginModal = () => (
//     <AnimatePresence>
//       {showLogin && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-black/70 backdrop-blur-md"
//             onClick={() => setShowLogin(false)}
//           />

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="relative w-full max-w-4xl bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10"
//           >
//             <MeteorsEffect number={3} />

//             <button
//               onClick={() => setShowLogin(false)}
//               className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
//             >
//               <X size={20} className="text-gray-300 group-hover:text-white" />
//             </button>

//             <div className="flex flex-col lg:flex-row h-full">
//               <div className="lg:w-2/5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
//                 <BoxesBackground />
//                 <div className="relative z-10">
//                   <div className="flex items-center gap-3 mb-8">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                       className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
//                     >
//                       <BookOpen size={24} className="text-white" />
//                     </motion.div>
//                     <h1 className="text-2xl font-bold">PlacementTutor</h1>
//                   </div>

//                   <div className="mb-8">
//                     <h2 className="text-3xl font-bold mb-4">
//                       Start Your Journey Today
//                     </h2>
//                     <p className="text-white/90 leading-relaxed">
//                       Sign in to book your personalized mentorship session with industry experts.
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-8">
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
//                     >
//                       <div className="text-2xl font-bold">200+</div>
//                       <div className="text-sm opacity-90">Students</div>
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
//                     >
//                       <div className="text-2xl font-bold">4.9★</div>
//                       <div className="text-sm opacity-90">Rating</div>
//                     </motion.div>
//                   </div>

//                   <div className="space-y-4">
//                     {[
//                       "Personalized 1:1 Sessions",
//                       "Expert Career Guidance",
//                       "Instant Booking Confirmation"
//                     ].map((item, i) => (
//                       <motion.div
//                         key={item}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.1 }}
//                         className="flex items-center gap-3"
//                       >
//                         <motion.div
//                           whileHover={{ rotate: 180 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <CheckCircle className="text-emerald-300" size={20} />
//                         </motion.div>
//                         <span>{item}</span>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="lg:w-3/5 p-8 lg:p-12">
//                 <div className="max-w-md mx-auto">
//                   <div className="text-center mb-8">
//                     <h2 className="text-2xl font-bold text-white">Welcome to PlacementTutor</h2>
//                     <p className="text-gray-300 mt-2">Sign in to book your session</p>
//                   </div>

//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Email Address
//                     </label>
//                     <div className="relative">
//                       <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                         <Mail size={20} className="text-gray-400" />
//                       </div>
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => {
//                           setEmail(e.target.value);
//                           setError("");
//                         }}
//                         onKeyPress={handleKeyPress}
//                         placeholder="student@example.com"
//                         className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                     <AnimatePresence>
//                       {error && (
//                         <motion.p
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="mt-2 text-sm text-red-400 flex items-center gap-2"
//                         >
//                           <Shield size={14} />
//                           {error}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={sendOtp}
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <Loader2 className="animate-spin" size={20} />
//                         Sending OTP...
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-2">
//                         Send OTP
//                         <ArrowRight size={20} />
//                       </span>
//                     )}
//                   </motion.button>

//                   <div className="flex items-center my-6">
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                     <span className="px-4 text-sm text-gray-400">or continue with</span>
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                   </div>

//                   <motion.button
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleGoogleLogin}
//                     className="w-full bg-white/10 border border-white/20 hover:border-indigo-500 text-gray-300 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/20"
//                   >
//                     <motion.svg
//                       animate={{ rotate: [0, 360] }}
//                       transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//                       className="w-5 h-5"
//                       viewBox="0 0 24 24"
//                     >
//                       <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                       <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                       <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                       <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                     </motion.svg>
//                     <span>Continue with Google</span>
//                   </motion.button>

//                   <div className="mt-8 pt-6 border-t border-gray-700 text-center">
//                     <p className="text-sm text-gray-400">
//                       By continuing, you agree to our{" "}
//                       <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
//                         Terms
//                       </a>{" "}
//                       and{" "}
//                       <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
//                         Privacy Policy
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div className={showLogin ? "overflow-hidden" : ""}>
//       {renderMainPage()}
//       <LoginModal />
//     </div>
//   );
// };

// export default Login;
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { apiConnector } from "../../Service/apiConnector";
// import { authEndpoints } from "../../Service/apis";
// import { useNavigate } from "react-router-dom";
// import {
//   Mail,
//   Loader2,
//   X,
//   ArrowRight,
//   Shield,
//   User,
//   CheckCircle,
//   BookOpen,
//   ChevronDown,
//   Calendar,
//   Clock as ClockIcon,
//   CreditCard,
//   Check,
//   MessageSquare,
//   HelpCircle,
//   Linkedin,
//   Instagram,
//   ExternalLink,
//   Sparkles,
//   Users,
//   Star,
//   Quote,
//   ChevronUp,
//   ChevronLeft,
//   ChevronRight,
//   Minus,
//   Plus,
//   Target,
//   Award,
//   Briefcase,
//   GraduationCap,
// } from "lucide-react";

// const Login = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [animatedStats, setAnimatedStats] = useState({
//     students: 0,
//     rating: 0,
//     price: 0,
//   });

//   const [openFAQ, setOpenFAQ] = useState(null);
//   const [testimonialIndex, setTestimonialIndex] = useState(0);

//   const testimonials = [
//     {
//       name: "Priya Sharma",
//       college: "BITS Pilani • Pre-final Year",
//       rating: 5,
//       review:
//         "I was confused about whether to go for product-based or service-based companies. One session with Abhishek cleared all my doubts. He gave me a proper roadmap for DSA and development. Now I feel much more confident about my preparation.",
//     },
//     {
//       name: "Arjun Patel",
//       college: "IIT Delhi • Final Year",
//       rating: 5,
//       review:
//         "Best mentorship I have received! Abhishek reviewed my projects and suggested improvements that made my portfolio stand out. His system design tips helped me crack Razorpay. Forever grateful 😊",
//     },
//     {
//       name: "Sneha Reddy",
//       college: "NIT Trichy • 2nd Year",
//       rating: 5,
//       review:
//         "Was struggling with competitive programming and felt demotivated. Abhishek not only helped with CP strategies but also motivated me to keep going. His practical approach to problem-solving is exceptional!",
//     },
//     {
//       name: "Rohan Verma",
//       college: "IIIT Hyderabad • 3rd Year",
//       rating: 5,
//       review:
//         "The career guidance session was transformative. Abhishek helped me identify my strengths and created a personalized roadmap. Landed my first internship at Amazon!",
//     },
//     {
//       name: "Anjali Singh",
//       college: "DTU • Final Year",
//       rating: 5,
//       review:
//         "Resume review session was eye-opening. Abhishek pointed out critical improvements that I had missed. My callback rate increased by 300% after implementing his suggestions.",
//     },
//   ];

//   const faqData = [
//     {
//       question: "How do I book a mentorship session?",
//       answer: "Simply click on the 'Book Your Session' button, select your preferred date and time slot, complete the payment as per your mentor's rate, and you're all set! You'll receive a confirmation email with all the details."
//     },
//     {
//       question: "What topics can I discuss during the session?",
//       answer:
//         "You can discuss anything related to career guidance, technical interview preparation, project guidance, DSA concepts, system design, resume review, placement strategies, mock interviews, and more. Our mentors are experienced in various domains of software engineering and product management.",
//     },
//     {
//       question: "How will I receive the meeting link?",
//       answer: "The meeting link will be sent to you via email just 10 minutes before your scheduled session starts. We recommend joining 5 minutes early to ensure everything is working properly."
//     },
//     {
//       question: "Can I reschedule or cancel my booking?",
//       answer: "No, students cannot reschedule  or cancel booked sessions. Only mentors can initiate rescheduling requests, and it requires student approval. If a mentor needs to reschedule, you'll receive a request via email and dashboard notification. If you approve, the rescheduling will be confirmed and confirmation emails will be sent to both you and the mentor. If you decline, the original session timing remains unchanged."
//     },
//     {
//       question: "What if I face payment issues?",
//       answer:
//         "If you encounter any payment issues, please try again after 10 minutes. and if it will be solve by razorpay",
//     },
//     {
//       question: "How long is each mentorship session?",
//       answer: "The minimum session duration is 15 minutes. You can book longer sessions (30 min, 45 min, 60 min, etc.) based on mentor availability shown on the booking calendar. Maximum duration depends on the mentor's schedule - you can book multiple consecutive slots for extended discussions."
//     },
//     {
//       question: "Do I need any prior experience?",
//       answer:
//         "No prior experience is required! Our mentors tailor the session based on your current level, whether you're a beginner, intermediate, or advanced. We work with students from all backgrounds and experience levels.",
//     },
//   ];

//   const achievements = [
//     {
//       icon: Target,
//       number: "20+",
//       label: "High-Paying Internships",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       icon: Briefcase,
//       number: "Expedia",
//       label: "SDE Role (Joining)",
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       icon: GraduationCap,
//       number: "200+",
//       label: "Students Mentored",
//       color: "from-green-500 to-emerald-500",
//     },
//     {
//       icon: Award,
//       number: "Full-Stack",
//       label: "Expertise",
//       color: "from-orange-500 to-red-500",
//     },
//   ];

//   useEffect(() => {
//     const animateNumbers = () => {
//       const duration = 2000;
//       const steps = 100;
//       const interval = duration / steps;

//       let currentStep = 0;
//       const timer = setInterval(() => {
//         currentStep++;
//         const progress = currentStep / steps;

//         setAnimatedStats({
//           students: Math.floor(200 * progress),
//           rating: 4.9 * progress,
//           price: Math.floor(200 * progress),
//         });

//         if (currentStep >= steps) {
//           clearInterval(timer);
//           setAnimatedStats({
//             students: 200,
//             rating: 4.9,
//             price: 200,
//           });
//         }
//       }, interval);

//       return () => clearInterval(timer);
//     };

//     animateNumbers();

//     const testimonialInterval = setInterval(() => {
//       setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(testimonialInterval);
//   }, []);

//   const BookNowsection = () => {
//     return (
//       // Add this section right after the AboutAbhishekSection component in your renderMainPage function

//       <section className="py-20 bg-gradient-to-b from-transparent to-[#0b1220] relative overflow-hidden">
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10"></div>
//           <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           {/* Section Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 mb-4">
//               <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
//               <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
//                 Book 1:1 Session
//               </span>
//               <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Book a 1:1 Session with Abhishek Ranjan and His Team
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Left Column - Pricing & Benefits */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//               className="space-y-8"
//             >
//               {/* Pricing Card */}
//               <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-3xl font-bold text-white flex items-center gap-3">
//                       <span className="text-4xl">📞️</span>
//                       200
//                     </h3>
//                     <p className="text-gray-400 mt-1">/ Hour session</p>
//                   </div>
//                   <motion.div
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.5 }}
//                     className="w-16 h-16 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center"
//                   >
//                     <CreditCard size={28} className="text-indigo-400" />
//                   </motion.div>
//                 </div>

//                 <p className="text-gray-300 text-lg leading-relaxed mb-8">
//                   Get personalized mentorship from experienced tech
//                   professionals. Whether you're preparing for placements,
//                   learning new technologies, or planning your career path, we're
//                   here to guide you.
//                 </p>

//                 <div className="space-y-4">
//                   {[
//                     "Personalized guidance tailored to your goals",
//                     "Career roadmap and planning",
//                     "Technical interview preparation",
//                     "Resume and portfolio review",
//                   ].map((benefit, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-start gap-4 group"
//                     >
//                       <motion.div
//                         whileHover={{ scale: 1.2, rotate: 180 }}
//                         transition={{ duration: 0.3 }}
//                         className="w-6 h-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
//                       >
//                         <CheckCircle size={14} className="text-green-400" />
//                       </motion.div>
//                       <span className="text-gray-300 group-hover:text-white transition-colors">
//                         {benefit}
//                       </span>
//                     </motion.div>
//                   ))}
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.05, y: -5 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowLogin(true)}
//                   className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-3 group relative overflow-hidden"
//                 >
//                   <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//                   <Calendar size={22} />
//                   Book Session Now
//                   <ArrowRight
//                     size={22}
//                     className="group-hover:translate-x-1 transition-transform"
//                   />
//                 </motion.button>
//               </div>
//             </motion.div>

//             {/* Right Column - How It Works */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//               className="space-y-8"
//             >
//               <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 border border-indigo-500/20">
//                 <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
//                   <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
//                     <Calendar size={22} className="text-white" />
//                   </div>
//                   How It Works
//                 </h3>

//                 <div className="space-y-8">
//                   {[
//                     {
//                       step: 1,
//                       title: "Choose Your Mentor",
//                       description:
//                         "Select from our team of experienced mentors based on your needs.",
//                       icon: Users,
//                     },
//                     {
//                       step: 2,
//                       title: "Pick a Date",
//                       description:
//                         "Choose a convenient date from our available calendar.",
//                       icon: Calendar,
//                     },
//                     {
//                       step: 3,
//                       title: "Select Time Slot",
//                       description:
//                         "Pick from available 1-hour slots between 3 PM - 12 AM.",
//                       icon: ClockIcon,
//                     },
//                     {
//                       step: 4,
//                       title: "Complete Payment",
//                       description:
//                         "Pay securely via Razorpay and receive instant confirmation.",
//                       icon: CreditCard,
//                     },
//                   ].map((item, index) => (
//                     <motion.div
//                       key={item.step}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.15 }}
//                       className="flex gap-6 group"
//                     >
//                       <div className="relative">
//                         <motion.div
//                           whileHover={{ scale: 1.2 }}
//                           className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300"
//                         >
//                           <span className="text-2xl font-bold text-white">
//                             {item.step}
//                           </span>
//                         </motion.div>
//                         {index < 3 && (
//                           <div className="absolute left-1/2 top-full -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-indigo-500/30 to-purple-500/30"></div>
//                         )}
//                       </div>

//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <item.icon size={20} className="text-indigo-400" />
//                           <h4 className="text-xl font-semibold text-white">
//                             {item.title}
//                           </h4>
//                         </div>
//                         <p className="text-gray-300 leading-relaxed">
//                           {item.description}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.8 }}
//                   className="mt-10 pt-8 border-t border-white/10"
//                 >
//                   <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-4">
//                     <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
//                       <Shield size={24} className="text-green-400" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-white">
//                         Secure & Hassle-Free
//                       </h4>
//                       <p className="text-sm text-gray-300">
//                         Instant confirmation • 24/7 support • Easy rescheduling
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>

//           {/* CTA Button at Bottom */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="text-center mt-16"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05, y: -5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-indigo-500/40 flex items-center gap-4 mx-auto group relative overflow-hidden"
//             >
//               <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <MessageSquare size={26} />
//               Start Your Journey Now - Book Your First Session
//               <ArrowRight
//                 size={26}
//                 className="group-hover:translate-x-2 transition-transform"
//               />
//             </motion.button>
//             <p className="text-gray-400 mt-4">
//               Limited slots available. Book now to secure your session!
//             </p>
//           </motion.div>
//         </div>
//       </section>
//     );
//   };
//   // Custom About Abhishek Section
//   // const AboutAbhishekSection = () => {
//   //   const [isVisible, setIsVisible] = useState(false);
//   //   const sectionRef = useRef(null);

//   //   useEffect(() => {
//   //     const observer = new IntersectionObserver(
//   //       ([entry]) => {
//   //         if (entry.isIntersecting) {
//   //           setIsVisible(true);
//   //         }
//   //       },
//   //       { threshold: 0.1,once: true  }
//   //     );

//   //     if (sectionRef.current) {
//   //       observer.observe(sectionRef.current);
//   //     }

//   //     return () => {
//   //       if (sectionRef.current) {
//   //         observer.unobserve(sectionRef.current);
//   //       }
//   //     };
//   //   }, []);

//   //   return (
//   //     <section
//   //       ref={sectionRef}
//   //       className="py-20 bg-gradient-to-b from-transparent to-[#0b1220] relative overflow-hidden"
//   //     >
//   //       {/* Background Pattern */}
//   //       <div className="absolute inset-0 opacity-5">
//   //         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10"></div>
//   //         <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
//   //         <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
//   //       </div>

//   //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//   //         {/* Section Header */}
//   //         <motion.div
//   //           initial={{ opacity: 0, y: 30 }}
//   //           animate={isVisible ? { opacity: 1, y: 0 } : {}}
//   //           transition={{ duration: 0.6 }}
//   //           className="text-center mb-16"
//   //         >
//   //           <div className="inline-flex items-center gap-2 mb-4">
//   //             <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
//   //             <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
//   //               About the Founder
//   //             </span>
//   //             <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
//   //           </div>
//   //           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//   //             Abhishek Ranjan
//   //             <span className="block text-2xl md:text-3xl text-gray-300 font-normal mt-2">
//   //               Founder & Lead Mentor
//   //             </span>
//   //           </h2>
//   //           <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
//   //         </motion.div>

//   //         <div className="grid lg:grid-cols-2 gap-12 items-center">
//   //           {/* Left Column - Content */}
//   //           <motion.div
//   //             initial={{ opacity: 0, x: -50 }}
//   //             animate={isVisible ? { opacity: 1, x: 0 } : {}}
//   //             transition={{ duration: 0.8, delay: 0.2 }}
//   //             className="space-y-6"
//   //           >
//   //             {/* Introduction */}
//   //             <motion.div
//   //               initial={{ opacity: 0 }}
//   //               animate={isVisible ? { opacity: 1 } : {}}
//   //               transition={{ duration: 0.6, delay: 0.4 }}
//   //               className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl"
//   //             >
//   //               <p className="text-gray-300 text-lg leading-relaxed mb-6">
//   //                 Abhishek Ranjan is the founder of{" "}
//   //                 <span className="text-indigo-300 font-semibold">
//   //                   Collegemate
//   //                 </span>
//   //                 , bringing over two years of hands-on experience in the
//   //                 technology industry. A passionate educator and mentor, he has
//   //                 guided more than 200 college students through their academic
//   //                 and early professional journeys.
//   //               </p>

//   //               <motion.div
//   //                 initial={{ opacity: 0, y: 10 }}
//   //                 animate={isVisible ? { opacity: 1, y: 0 } : {}}
//   //                 transition={{ duration: 0.5, delay: 0.6 }}
//   //                 className="flex items-center gap-3 text-indigo-300 mb-6"
//   //               >
//   //                 <div className="w-6 h-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
//   //                   <Target size={14} />
//   //                 </div>
//   //                 <span className="font-medium">Mission-Driven Mentorship</span>
//   //               </motion.div>

//   //               <p className="text-gray-300 text-lg leading-relaxed mb-6">
//   //                 His expertise spans full-stack development, system design, and
//   //                 career mentorship. Abhishek focuses on placement preparation,
//   //                 technical interview coaching, and helping students build
//   //                 strong portfolios and resumes that stand out to leading tech
//   //                 companies.
//   //               </p>
//   //             </motion.div>

//   //             {/* Achievements */}
//   //             <motion.div
//   //               initial={{ opacity: 0, y: 20 }}
//   //               animate={isVisible ? { opacity: 1, y: 0 } : {}}
//   //               transition={{ duration: 0.6, delay: 0.8 }}
//   //               className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20"
//   //             >
//   //               <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
//   //                 <Sparkles className="text-indigo-400" />
//   //                 Key Achievements
//   //               </h3>
//   //               <div className="grid grid-cols-2 gap-4">
//   //                 {achievements.map((achievement, index) => (
//   //                   <motion.div
//   //                     key={index}
//   //                     initial={{ opacity: 0, scale: 0.8 }}
//   //                     animate={isVisible ? { opacity: 1, scale: 1 } : {}}
//   //                     transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
//   //                     whileHover={{ y: -5, scale: 1.05 }}
//   //                     className={`bg-gradient-to-br ${
//   //                       achievement.color
//   //                     }/10 to-transparent rounded-xl p-4 border border-white/5 hover:border-${
//   //                       achievement.color.split("-")[1]
//   //                     }-500/30 transition-all duration-300 cursor-pointer group`}
//   //                   >
//   //                     <div className="flex items-center gap-3 mb-3">
//   //                       <div
//   //                         className={`p-2 bg-gradient-to-br ${achievement.color}/20 rounded-lg`}
//   //                       >
//   //                         <achievement.icon className="w-5 h-5 text-white" />
//   //                       </div>
//   //                       <div className="text-2xl font-bold text-white">
//   //                         {achievement.number}
//   //                       </div>
//   //                     </div>
//   //                     <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
//   //                       {achievement.label}
//   //                     </div>
//   //                   </motion.div>
//   //                 ))}
//   //               </div>
//   //             </motion.div>
//   //           </motion.div>

//   //           {/* Right Column - Image & Details */}
//   //           <motion.div
//   //             initial={{ opacity: 0, x: 50 }}
//   //             animate={isVisible ? { opacity: 1, x: 0 } : {}}
//   //             transition={{ duration: 0.8, delay: 0.3 }}
//   //             className="space-y-8"
//   //           >
//   //             {/* Profile Image Card */}
//   //             <motion.div
//   //               initial={{ opacity: 0, y: 30 }}
//   //               animate={isVisible ? { opacity: 1, y: 0 } : {}}
//   //               transition={{ duration: 0.6, delay: 0.5 }}
//   //               className="relative group"
//   //             >
//   //               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
//   //               <div className="relative bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-3xl p-2 border border-white/10 overflow-hidden">
//   //                 <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
//   //                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30"></div>
//   //                   <div className="absolute inset-0 flex items-center justify-center">
//   //                     <motion.div
//   //                       animate={{
//   //                         scale: [1, 1.1, 1],
//   //                         rotate: [0, 5, -5, 0],
//   //                       }}
//   //                       transition={{
//   //                         duration: 10,
//   //                         repeat: Infinity,
//   //                         repeatType: "reverse",
//   //                       }}
//   //                       className="w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//   //                     >
//   //                       <User size={96} className="text-white opacity-80" />
//   //                     </motion.div>
//   //                   </div>
//   //                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
//   //                     <div className="flex items-center justify-between">
//   //                       <div>
//   //                         <div className="text-2xl font-bold text-white">
//   //                           Abhishek Ranjan
//   //                         </div>
//   //                         <div className="text-indigo-300">
//   //                           Founder & Tech Mentor
//   //                         </div>
//   //                       </div>
//   //                       <motion.div
//   //                         whileHover={{ rotate: 360 }}
//   //                         transition={{ duration: 0.5 }}
//   //                         className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
//   //                       >
//   //                         <BookOpen size={20} className="text-white" />
//   //                       </motion.div>
//   //                     </div>
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </motion.div>

//   //             {/* Career Journey */}
//   //             <motion.div
//   //               initial={{ opacity: 0, y: 20 }}
//   //               animate={isVisible ? { opacity: 1, y: 0 } : {}}
//   //               transition={{ duration: 0.6, delay: 0.7 }}
//   //               className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl"
//   //             >
//   //               <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
//   //                 <Briefcase className="text-indigo-400" />
//   //                 Career Journey
//   //               </h3>

//   //               <div className="space-y-6">
//   //                 <motion.div
//   //                   initial={{ opacity: 0, x: -20 }}
//   //                   animate={isVisible ? { opacity: 1, x: 0 } : {}}
//   //                   transition={{ duration: 0.5, delay: 0.9 }}
//   //                   className="flex items-start gap-4 group"
//   //                 >
//   //                   <motion.div
//   //                     whileHover={{ scale: 1.2, rotate: 180 }}
//   //                     transition={{ duration: 0.3 }}
//   //                     className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
//   //                   >
//   //                     <CheckCircle size={18} className="text-green-400" />
//   //                   </motion.div>
//   //                   <div>
//   //                     <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
//   //                       Cracked 20+ Off-Campus Internships
//   //                     </div>
//   //                     <p className="text-gray-300 mt-1">
//   //                       Successfully secured high-paying internships through
//   //                       strategic preparation and networking.
//   //                     </p>
//   //                   </div>
//   //                 </motion.div>

//   //                 <motion.div
//   //                   initial={{ opacity: 0, x: -20 }}
//   //                   animate={isVisible ? { opacity: 1, x: 0 } : {}}
//   //                   transition={{ duration: 0.5, delay: 1 }}
//   //                   className="flex items-start gap-4 group"
//   //                 >
//   //                   <motion.div
//   //                     whileHover={{ scale: 1.2, rotate: 180 }}
//   //                     transition={{ duration: 0.3 }}
//   //                     className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
//   //                   >
//   //                     <Award size={18} className="text-blue-400" />
//   //                   </motion.div>
//   //                   <div>
//   //                     <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
//   //                       Expedia SDE (Joining)
//   //                     </div>
//   //                     <p className="text-gray-300 mt-1">
//   //                       Secured Software Development Engineer role at Expedia
//   //                       through exceptional technical skills.
//   //                     </p>
//   //                   </div>
//   //                 </motion.div>

//   //                 <motion.div
//   //                   initial={{ opacity: 0, x: -20 }}
//   //                   animate={isVisible ? { opacity: 1, x: 0 } : {}}
//   //                   transition={{ duration: 0.5, delay: 1.1 }}
//   //                   className="flex items-start gap-4 group"
//   //                 >
//   //                   <motion.div
//   //                     whileHover={{ scale: 1.2, rotate: 180 }}
//   //                     transition={{ duration: 0.3 }}
//   //                     className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
//   //                   >
//   //                     <GraduationCap size={18} className="text-purple-400" />
//   //                   </motion.div>
//   //                   <div>
//   //                     <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
//   //                       Mission-Driven Education
//   //                     </div>
//   //                     <p className="text-gray-300 mt-1">
//   //                       Committed to making quality tech education accessible
//   //                       and helping students become industry-ready.
//   //                     </p>
//   //                   </div>
//   //                 </motion.div>
//   //               </div>

//   //               <motion.div
//   //                 initial={{ opacity: 0, y: 20 }}
//   //                 animate={isVisible ? { opacity: 1, y: 0 } : {}}
//   //                 transition={{ duration: 0.5, delay: 1.3 }}
//   //                 className="mt-8 pt-6 border-t border-white/10"
//   //               >
//   //                 <p className="text-gray-300 italic text-center">
//   //                   "Driven by a mission to make quality tech education
//   //                   accessible and goal-oriented."
//   //                 </p>
//   //               </motion.div>
//   //             </motion.div>
//   //           </motion.div>
//   //         </div>

//   //         {/* CTA Button */}
//   //         <motion.div
//   //           initial={{ opacity: 0, y: 30 }}
//   //           animate={isVisible ? { opacity: 1, y: 0 } : {}}
//   //           transition={{ duration: 0.6, delay: 1.5 }}
//   //           className="text-center mt-16"
//   //         >
//   //           <motion.button
//   //             whileHover={{ scale: 1.05, y: -5 }}
//   //             whileTap={{ scale: 0.95 }}
//   //             onClick={() => setShowLogin(true)}
//   //             className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center gap-3 mx-auto group relative overflow-hidden"
//   //           >
//   //             <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//   //             <MessageSquare size={22} />
//   //             Book Session with Abhishek
//   //             <ArrowRight
//   //               size={22}
//   //               className="group-hover:translate-x-1 transition-transform"
//   //             />
//   //           </motion.button>
//   //         </motion.div>
//   //       </div>
//   //     </section>
//   //   );
//   // };
//   const AboutAbhishekSection = () => {
//     return (
//       <section id="about-section"  className="py-20 bg-gradient-to-b from-transparent to-[#0b1220] relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10"></div>
//           <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           {/* Section Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.1 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 mb-4">
//               <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
//               <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
//                 About the Founder
//               </span>
//               <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Abhishek Ranjan
//               <span className="block text-2xl md:text-3xl text-gray-300 font-normal mt-2">
//                 Founder & Lead Mentor
//               </span>
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Column - Content */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="space-y-6"
//             >
//               {/* Introduction */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true, amount: 0.1 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//                 className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl"
//               >
//                 <p className="text-gray-300 text-lg leading-relaxed mb-6">
//                   Abhishek Ranjan is the founder of{" "}
//                   <span className="text-indigo-300 font-semibold">
//                     Collegemate
//                   </span>
//                   , bringing over two years of hands-on experience in the
//                   technology industry. A passionate educator and mentor, he has
//                   guided more than 200 college students through their academic
//                   and early professional journeys.
//                 </p>

//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, amount: 0.1 }}
//                   transition={{ duration: 0.5, delay: 0.6 }}
//                   className="flex items-center gap-3 text-indigo-300 mb-6"
//                 >
//                   <div className="w-6 h-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
//                     <Target size={14} />
//                   </div>
//                   <span className="font-medium">Mission-Driven Mentorship</span>
//                 </motion.div>

//                 <p className="text-gray-300 text-lg leading-relaxed mb-6">
//                   His expertise spans full-stack development, system design, and
//                   career mentorship. Abhishek focuses on placement preparation,
//                   technical interview coaching, and helping students build
//                   strong portfolios and resumes that stand out to leading tech
//                   companies.
//                 </p>
//               </motion.div>

//               {/* Achievements */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.1 }}
//                 transition={{ duration: 0.6, delay: 0.8 }}
//                 className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20"
//               >
//                 <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
//                   <Sparkles className="text-indigo-400" />
//                   Key Achievements
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {achievements.map((achievement, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       viewport={{ once: true, amount: 0.1 }}
//                       transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
//                       whileHover={{ y: -5, scale: 1.05 }}
//                       className={`bg-gradient-to-br ${
//                         achievement.color
//                       }/10 to-transparent rounded-xl p-4 border border-white/5 hover:border-${
//                         achievement.color.split("-")[1]
//                       }-500/30 transition-all duration-300 cursor-pointer group`}
//                     >
//                       <div className="flex items-center gap-3 mb-3">
//                         <div
//                           className={`p-2 bg-gradient-to-br ${achievement.color}/20 rounded-lg`}
//                         >
//                           <achievement.icon className="w-5 h-5 text-white" />
//                         </div>
//                         <div className="text-2xl font-bold text-white">
//                           {achievement.number}
//                         </div>
//                       </div>
//                       <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
//                         {achievement.label}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Right Column - Image & Details */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.1 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="space-y-8"
//             >
//               {/* Profile Image Card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.1 }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//                 className="relative group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
//                 <div className="relative bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-3xl p-2 border border-white/10 overflow-hidden">
//                   <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <motion.div
//                         animate={{
//                           scale: [1, 1.1, 1],
//                           rotate: [0, 5, -5, 0],
//                         }}
//                         transition={{
//                           duration: 10,
//                           repeat: Infinity,
//                           repeatType: "reverse",
//                         }}
//                         className="w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                       >
//                         <User size={96} className="text-white opacity-80" />
//                       </motion.div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <div className="text-2xl font-bold text-white">
//                             Abhishek Ranjan
//                           </div>
//                           <div className="text-indigo-300">
//                             Founder & Tech Mentor
//                           </div>
//                         </div>
//                         <motion.div
//                           whileHover={{ rotate: 360 }}
//                           transition={{ duration: 0.5 }}
//                           className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
//                         >
//                           <BookOpen size={20} className="text-white" />
//                         </motion.div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Career Journey */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.1 }}
//                 transition={{ duration: 0.6, delay: 0.7 }}
//                 className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl"
//               >
//                 <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
//                   <Briefcase className="text-indigo-400" />
//                   Career Journey
//                 </h3>

//                 <div className="space-y-6">
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true, amount: 0.1 }}
//                     transition={{ duration: 0.5, delay: 0.9 }}
//                     className="flex items-start gap-4 group"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.2, rotate: 180 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
//                     >
//                       <CheckCircle size={18} className="text-green-400" />
//                     </motion.div>
//                     <div>
//                       <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
//                         Cracked 20+ Off-Campus Internships
//                       </div>
//                       <p className="text-gray-300 mt-1">
//                         Successfully secured high-paying internships through
//                         strategic preparation and networking.
//                       </p>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true, amount: 0.1 }}
//                     transition={{ duration: 0.5, delay: 1 }}
//                     className="flex items-start gap-4 group"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.2, rotate: 180 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
//                     >
//                       <Award size={18} className="text-blue-400" />
//                     </motion.div>
//                     <div>
//                       <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
//                         Expedia SDE (Joining)
//                       </div>
//                       <p className="text-gray-300 mt-1">
//                         Secured Software Development Engineer role at Expedia
//                         through exceptional technical skills.
//                       </p>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true, amount: 0.1 }}
//                     transition={{ duration: 0.5, delay: 1.1 }}
//                     className="flex items-start gap-4 group"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.2, rotate: 180 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
//                     >
//                       <GraduationCap size={18} className="text-purple-400" />
//                     </motion.div>
//                     <div>
//                       <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
//                         Mission-Driven Education
//                       </div>
//                       <p className="text-gray-300 mt-1">
//                         Committed to making quality tech education accessible
//                         and helping students become industry-ready.
//                       </p>
//                     </div>
//                   </motion.div>
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, amount: 0.1 }}
//                   transition={{ duration: 0.5, delay: 1.3 }}
//                   className="mt-8 pt-6 border-t border-white/10"
//                 >
//                   <p className="text-gray-300 italic text-center">
//                     "Driven by a mission to make quality tech education
//                     accessible and goal-oriented."
//                   </p>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* CTA Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.1 }}
//             transition={{ duration: 0.6, delay: 1.5 }}
//             className="text-center mt-16"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05, y: -5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center gap-3 mx-auto group relative overflow-hidden"
//             >
//               <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <MessageSquare size={22} />
//               Book Session with Abhishek
//               <ArrowRight
//                 size={22}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>
//     );
//   };

//   // Rest of the components remain the same...
//   const BoxesBackground = () => (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <pattern
//             id="grid"
//             width="40"
//             height="40"
//             patternUnits="userSpaceOnUse"
//           >
//             <path
//               d="M 40 0 L 0 0 0 40"
//               fill="none"
//               stroke="rgba(255, 255, 255, 0.05)"
//               strokeWidth="1"
//             />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />
//       </svg>
//     </div>
//   );

//   const MeteorsEffect = ({ number = 10, className = "" }) => {
//     const [meteors, setMeteors] = useState([]);

//     useEffect(() => {
//       const newMeteors = Array.from({ length: number }).map((_, i) => ({
//         id: i,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: 2 + Math.random() * 3,
//         size: 1 + Math.random() * 2,
//       }));
//       setMeteors(newMeteors);
//     }, [number]);

//     return (
//       <div
//         className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
//       >
//         {meteors.map((meteor) => (
//           <motion.div
//             key={meteor.id}
//             className="absolute h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full"
//             style={{
//               left: `${meteor.left}%`,
//               top: "-10px",
//               width: `${meteor.size * 50}px`,
//               rotate: "45deg",
//             }}
//             animate={{
//               top: ["-10px", "110%"],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: meteor.duration,
//               delay: meteor.delay,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   const FAQAccordion = ({ faq, index }) => {
//     const isOpen = openFAQ === index;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.1 }}
//         className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300"
//       >
//         <motion.button
//           onClick={() => setOpenFAQ(isOpen ? null : index)}
//           className="w-full p-6 text-left flex items-center justify-between group hover:bg-white/5 transition-colors duration-300"
//           whileHover={{ x: 5 }}
//         >
//           <div className="flex items-center gap-4">
//             <motion.div
//               animate={{ rotate: isOpen ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//               className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0"
//             >
//               <span className="text-white font-semibold">{index + 1}</span>
//             </motion.div>
//             <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
//               {faq.question}
//             </h3>
//           </div>
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//             className="text-gray-400 group-hover:text-white"
//           >
//             {isOpen ? <Minus size={20} /> : <Plus size={20} />}
//           </motion.div>
//         </motion.button>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <div className="px-6 pb-6">
//                 <div className="pl-12 border-l-2 border-indigo-500/30">
//                   <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
//                   {index === 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="mt-4 flex items-center gap-2 text-sm text-indigo-400"
//                     >
//                       <CheckCircle size={14} />
//                       <span>Instant confirmation • No waiting time</span>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     );
//   };

//   const TestimonialCarousel = () => {
//     const [direction, setDirection] = useState(0);

//     const slideVariants = {
//       enter: (direction) => ({
//         x: direction > 0 ? 1000 : -1000,
//         opacity: 0,
//       }),
//       center: {
//         x: 0,
//         opacity: 1,
//       },
//       exit: (direction) => ({
//         x: direction < 0 ? 1000 : -1000,
//         opacity: 0,
//       }),
//     };

//     const paginate = (newDirection) => {
//       setDirection(newDirection);
//       setTestimonialIndex((prev) => {
//         let nextIndex = prev + newDirection;
//         if (nextIndex < 0) nextIndex = testimonials.length - 1;
//         if (nextIndex >= testimonials.length) nextIndex = 0;
//         return nextIndex;
//       });
//     };

//     return (
//       <div  id="testimonial-section" className="relative">
//         <div className="flex justify-center items-center gap-6 mb-8">
//           <motion.button
//             whileHover={{ scale: 1.1, x: -5 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => paginate(-1)}
//             className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
//           >
//             <ChevronLeft className="text-white" />
//           </motion.button>

//           <div className="flex gap-2">
//             {testimonials.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   setDirection(idx > testimonialIndex ? 1 : -1);
//                   setTestimonialIndex(idx);
//                 }}
//                 className="relative"
//               >
//                 <motion.div
//                   className={`w-3 h-3 rounded-full transition-colors ${
//                     idx === testimonialIndex
//                       ? "bg-gradient-to-r from-indigo-500 to-purple-500"
//                       : "bg-white/20"
//                   }`}
//                   animate={{
//                     scale: idx === testimonialIndex ? [1, 1.2, 1] : 1,
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     repeatDelay: 1,
//                   }}
//                 />
//               </button>
//             ))}
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.1, x: 5 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => paginate(1)}
//             className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
//           >
//             <ChevronRight className="text-white" />
//           </motion.button>
//         </div>

//         <div className="relative h-[400px] overflow-hidden">
//           <AnimatePresence custom={direction} mode="wait">
//             <motion.div
//               key={testimonialIndex}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 x: { type: "spring", stiffness: 300, damping: 30 },
//                 opacity: { duration: 0.2 },
//               }}
//               className="absolute inset-0"
//             >
//               <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl h-full">
//                 <div className="flex flex-col h-full">
//                   <div className="mb-6">
//                     <motion.div
//                       initial={{ scale: 0, rotate: -180 }}
//                       animate={{ scale: 1, rotate: 0 }}
//                       transition={{ delay: 0.2, type: "spring" }}
//                       className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center"
//                     >
//                       <Quote className="w-6 h-6 text-indigo-400" />
//                     </motion.div>
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="flex text-yellow-400 text-2xl mb-6"
//                   >
//                     {Array(testimonials[testimonialIndex].rating)
//                       .fill()
//                       .map((_, i) => (
//                         <motion.span
//                           key={i}
//                           initial={{ scale: 0, rotate: -180 }}
//                           animate={{ scale: 1, rotate: 0 }}
//                           transition={{ delay: i * 0.1 + 0.4 }}
//                           whileHover={{ scale: 1.2, rotate: 180 }}
//                           className="cursor-pointer"
//                         >
//                           ★
//                         </motion.span>
//                       ))}
//                   </motion.div>

//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="text-gray-300 text-lg italic leading-relaxed mb-8 flex-grow"
//                   >
//                     "{testimonials[testimonialIndex].review}"
//                   </motion.p>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6 }}
//                     className="flex items-center justify-between"
//                   >
//                     <div>
//                       <div className="font-semibold text-white text-xl">
//                         {testimonials[testimonialIndex].name}
//                       </div>
//                       <div className="text-gray-300">
//                         {testimonials[testimonialIndex].college}
//                       </div>
//                     </div>
//                     <motion.div
//                       animate={{
//                         rotate: [0, 10, -10, 0],
//                         scale: [1, 1.1, 1],
//                       }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                         repeatDelay: 3,
//                       }}
//                       className="w-12 h-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center border border-white/10"
//                     >
//                       <User className="w-5 h-5 text-indigo-400" />
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-wrap justify-center items-center gap-6 mt-8 text-gray-300"
//         >
//           <div className="flex items-center gap-2">
//             <motion.div
//               animate={{ scale: [1, 1.1, 1] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-2 h-2 bg-green-400 rounded-full"
//             />
//             <span>
//               Testimonial {testimonialIndex + 1} of {testimonials.length}
//             </span>
//           </div>
//           <div className="hidden md:block">•</div>
//           <div>Slide to read more testimonials</div>
//         </motion.div>
//       </div>
//     );
//   };

//   const InteractiveStatCard = ({ number, label, icon: Icon, delay = 0 }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.5 }}
//       whileHover={{ scale: 1.05, y: -5 }}
//       className="relative bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 cursor-pointer group"
//       onMouseEnter={() => setHoveredCard(label)}
//       onMouseLeave={() => setHoveredCard(null)}
//     >
//       <div className="relative z-10 flex items-center justify-between mb-4">
//         <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
//           <Icon className="w-6 h-6 text-indigo-400" />
//         </div>
//         <motion.div
//           animate={{
//             rotate: hoveredCard === label ? 360 : 0,
//             scale: hoveredCard === label ? 1.2 : 1,
//           }}
//           transition={{ duration: 0.5 }}
//           className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
//         />
//       </div>
//       <div className="relative z-10 text-4xl font-bold text-white mb-2">
//         {number}
//         {label === "Rating" && "★"}
//         {label === "Price" && <span className="text-lg">₹</span>}
//       </div>
//       <div className="relative z-10 text-gray-300">{label}</div>
//     </motion.div>
//   );

//   const FloatingElements = () => (
//     <div className="fixed inset-0 pointer-events-none z-0">
//       {Array.from({ length: 15 }).map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-4 h-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, -20, 0],
//             x: [0, Math.random() * 20 - 10, 0],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: 3 + Math.random() * 2,
//             delay: Math.random() * 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );

//   const sendOtp = async () => {
//     if (!email || !email.includes("@")) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       await apiConnector("POST", authEndpoints.SEND_OTP, { email });
//       setShowLogin(false);
//       navigate("/otp", { state: { email } });
//     } catch (e) {
//       console.error(e);
//       setError("Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const res = await apiConnector(
//         "GET",
//         authEndpoints.GOOGLE_OAUTH + "/url"
//       );
//       setShowLogin(false);
//       window.location.href = res.data.url;
//     } catch (error) {
//       console.error(error);
//       setError("Failed to connect with Google");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendOtp();
//     }
//   };

//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape" && showLogin) {
//         setShowLogin(false);
//       }
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [showLogin]);

//   useEffect(() => {
//     if (showLogin) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [showLogin]);

//   const renderMainPage = () => (
//     <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white overflow-hidden relative">
//       <BoxesBackground />
//       <MeteorsEffect number={8} />
//       <FloatingElements />

//       <nav className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#111827]/90 to-transparent backdrop-blur-md border-b border-white/10 z-50">
//   <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="flex items-center gap-3 cursor-pointer"
//       onClick={() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }}
//     >
//       <motion.div
//         whileHover={{ rotate: 180 }}
//         transition={{ duration: 0.5 }}
//         className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
//       >
//         <BookOpen className="text-white" size={22} />
//       </motion.div>
//       <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//         PlacementTutor
//       </span>
//     </motion.div>

//     <div className="flex items-center gap-4">
//       <motion.button
//         whileHover={{ y: -2 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => {
//           const aboutSection = document.querySelector('#about-section');
//           if (aboutSection) {
//             aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//           }
//         }}
//         className="text-gray-300 hover:text-white transition-colors px-4 py-2"
//       >
//         Mentors
//       </motion.button>

//       <motion.button
//         whileHover={{ y: -2 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => {
//           const testimonialSection = document.querySelector('#testimonial-section');
//           if (testimonialSection) {
//             testimonialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//           }
//         }}
//         className="text-gray-300 hover:text-white transition-colors px-4 py-2"
//       >
//         Testimonials
//       </motion.button>

//       <motion.button
//         whileHover={{ y: -2 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => {
//           const faqSection = document.querySelector('#faq-section');
//           if (faqSection) {
//             faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//           }
//         }}
//         className="text-gray-300 hover:text-white transition-colors px-4 py-2"
//       >
//         FAQ
//       </motion.button>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setShowLogin(true)}
//         className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
//       >
//         Book Session
//       </motion.button>
//     </div>
//   </div>
// </nav>

//       <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
//             >
//               Get the Correct Direction
//               <br />
//               <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
//                 and Path from Our Guidance
//               </span>
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
//             >
//               We're here to support you and make you better. Book personalized
//               1:1 mentorship sessions with experienced tech professionals and
//               accelerate your career growth.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowLogin(true)}
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-3 group relative overflow-hidden"
//               >
//                 <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//                 <Calendar size={22} />
//                 Book Your Session
//                 <ArrowRight
//                   size={22}
//                   className="group-hover:translate-x-1 transition-transform"
//                 />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white/10 border border-white/20 hover:border-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 hover:bg-white/20"
//               >
//                 <ExternalLink size={22} />
//                 Learn More
//               </motion.button>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
//           >
//             <InteractiveStatCard
//               number={animatedStats.students}
//               label="Students Mentored"
//               icon={Users}
//               delay={0.1}
//             />
//             <InteractiveStatCard
//               number={animatedStats.rating.toFixed(1)}
//               label="Rating"
//               icon={Star}
//               delay={0.2}
//             />
//             <InteractiveStatCard
//               number={animatedStats.price}
//               label="Per Session"
//               icon={CreditCard}
//               delay={0.3}
//             />
//           </motion.div>
//         </div>
//       </section>

//       {/* Add About Abhishek Section Here */}
//       <AboutAbhishekSection />
//       <BookNowsection/>
//       <section className="py-20 bg-gradient-to-b from-white/5 to-transparent">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-4xl font-bold text-white mb-4"
//             >
//               What Our Students Say
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//             >
//               Real reviews from students who transformed their careers with
//               PlacementTutor.
//             </motion.p>
//           </div>

//           <TestimonialCarousel />
//         </div>
//       </section>

//       <section id="faq-section" className="py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-4xl font-bold text-white mb-4"
//             >
//               Frequently Asked Questions
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               className="text-xl text-gray-300 mb-10"
//             >
//               Everything you need to know about our mentorship sessions
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-6 py-3 mb-8"
//             >
//               <HelpCircle className="w-5 h-5 text-indigo-400" />
//               <span className="text-indigo-300">
//                 {openFAQ === null
//                   ? "Click on any question to expand"
//                   : "Click to collapse"}
//               </span>
//             </motion.div>
//           </div>

//           <div className="space-y-4">
//             {faqData.map((faq, index) => (
//               <FAQAccordion key={index} faq={faq} index={index} />
//             ))}
//           </div>

//           {/* <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mt-12"
//           >
//             <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 border border-indigo-500/20">
//               <h3 className="text-xl font-semibold text-white mb-4">
//                 Still have questions?
//               </h3>
//               <p className="text-gray-300 mb-6">
//                 Can't find the answer you're looking for? Please chat with our
//                 friendly team.
//               </p>
//               {/* <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
//               >
//                 Get in touch
//               </motion.button> */}
//             {/* </div>
//           </motion.div>  */}
//         </div>
//       </section>

//       {/* <section className="py-20 bg-gradient-to-br from-indigo-500 to-purple-500 relative overflow-hidden">
//         <MeteorsEffect number={15} className="opacity-30" />
//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl font-bold text-white mb-6"
//           >
//             Ready to Transform Your Career?
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto"
//           >
//             Join 200+ students who've successfully cracked their dream
//             placements with our guidance.
//           </motion.p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <motion.button
//               whileHover={{ scale: 1.05, y: -5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden"
//             >
//               <motion.span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <Calendar size={22} />
//               Book Your First Session
//               <ArrowRight
//                 size={22}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
//             >
//               Speak to Our Team
//             </motion.button>
//           </div>
//         </div>
//       </section> */}

// <footer className="bg-gradient-to-b from-[#0b1220] to-[#000000] text-white py-12 border-t border-white/10">
//   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       className="flex flex-col md:flex-row justify-between items-center"
//     >
//       <div className="flex items-center gap-3 mb-6 md:mb-0">
//         <motion.div
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//           className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
//         >
//           <BookOpen className="text-white" size={22} />
//         </motion.div>
//         <span className="text-xl font-bold">PlacementTutor</span>
//       </div>

//       <div className="flex gap-6">
//         {[
//           { name: "ContactUs", path: "/ContactUs" },
//           { name: "PrivacyPolicy", path: "/privacy-policy" },
//           { name: "RefundAndCancellation", path: "/RefundAndCancellation" },
//           { name: "TermsAndConditions", path: "/TermsAndConditions" }

//         ].map((item, i) => (
//           <motion.button
//             key={item.name}
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: i * 0.1 }}
//             whileHover={{ y: -2 }}
//             onClick={() => navigate(item.path)}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             {item.name}
//           </motion.button>
//         ))}
//       </div>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setShowLogin(true)}
//         className="mt-6 md:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
//       >
//         Get Started
//       </motion.button>
//     </motion.div>

//     <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
//       © {new Date().getFullYear()} PlacementTutor. All rights reserved.
//     </div>
//   </div>
// </footer>
//     </div>
//   );

//   const LoginModal = () => (
//     <AnimatePresence>
//       {showLogin && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-black/70 backdrop-blur-md"
//             onClick={() => setShowLogin(false)}
//           />

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="relative w-full max-w-4xl bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10"
//           >
//             <MeteorsEffect number={3} />

//             <button
//               onClick={() => setShowLogin(false)}
//               className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
//             >
//               <X size={20} className="text-gray-300 group-hover:text-white" />
//             </button>

//             <div className="flex flex-col lg:flex-row h-full">
//               <div className="lg:w-2/5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
//                 <BoxesBackground />
//                 <div className="relative z-10">
//                   <div className="flex items-center gap-3 mb-8">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{
//                         duration: 20,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                       className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
//                     >
//                       <BookOpen size={24} className="text-white" />
//                     </motion.div>
//                     <h1 className="text-2xl font-bold">PlacementTutor</h1>
//                   </div>

//                   <div className="mb-8">
//                     <h2 className="text-3xl font-bold mb-4">
//                       Start Your Journey Today
//                     </h2>
//                     <p className="text-white/90 leading-relaxed">
//                       Sign in to book your personalized mentorship session with
//                       industry experts.
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-8">
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
//                     >
//                       <div className="text-2xl font-bold">200+</div>
//                       <div className="text-sm opacity-90">Students</div>
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
//                     >
//                       <div className="text-2xl font-bold">4.9★</div>
//                       <div className="text-sm opacity-90">Rating</div>
//                     </motion.div>
//                   </div>

//                   <div className="space-y-4">
//                     {[
//                       "Personalized 1:1 Sessions",
//                       "Expert Career Guidance",
//                       "Instant Booking Confirmation",
//                     ].map((item, i) => (
//                       <motion.div
//                         key={item}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.1 }}
//                         className="flex items-center gap-3"
//                       >
//                         <motion.div
//                           whileHover={{ rotate: 180 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <CheckCircle className="text-emerald-300" size={20} />
//                         </motion.div>
//                         <span>{item}</span>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="lg:w-3/5 p-8 lg:p-12">
//                 <div className="max-w-md mx-auto">
//                   <div className="text-center mb-8">
//                     <h2 className="text-2xl font-bold text-white">
//                       Welcome to PlacementTutor
//                     </h2>
//                     <p className="text-gray-300 mt-2">
//                       Sign in to book your session
//                     </p>
//                   </div>

//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Email Address
//                     </label>
//                     <div className="relative">
//                       <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                         <Mail size={20} className="text-gray-400" />
//                       </div>
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => {
//                           setEmail(e.target.value);
//                           setError("");
//                         }}
//                         onKeyPress={handleKeyPress}
//                         placeholder="student@example.com"
//                         className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                     <AnimatePresence>
//                       {error && (
//                         <motion.p
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="mt-2 text-sm text-red-400 flex items-center gap-2"
//                         >
//                           <Shield size={14} />
//                           {error}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={sendOtp}
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <Loader2 className="animate-spin" size={20} />
//                         Sending OTP...
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-2">
//                         Send OTP
//                         <ArrowRight size={20} />
//                       </span>
//                     )}
//                   </motion.button>

//                   <div className="flex items-center my-6">
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                     <span className="px-4 text-sm text-gray-400">
//                       or continue with
//                     </span>
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                   </div>

//                   <motion.button
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleGoogleLogin}
//                     className="w-full bg-white/10 border border-white/20 hover:border-indigo-500 text-gray-300 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/20"
//                   >
//                     <motion.svg
//                       animate={{ rotate: [0, 360] }}
//                       transition={{
//                         duration: 5,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                       className="w-5 h-5"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         fill="currentColor"
//                         d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                       />
//                       <path
//                         fill="currentColor"
//                         d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                       />
//                       <path
//                         fill="currentColor"
//                         d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                       />
//                       <path
//                         fill="currentColor"
//                         d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                       />
//                     </motion.svg>
//                     <span>Continue with Google</span>
//                   </motion.button>

//                   <div className="mt-8 pt-6 border-t border-gray-700 text-center">
//                     <p className="text-sm text-gray-400">
//                       By continuing, you agree to our{" "}
//                       <a
//                         href="/TermsAndConditions"
//                         className="text-indigo-400 hover:text-indigo-300 font-medium"
//                       >
//                         Terms
//                       </a>{" "}
//                       and{" "}
//                       <a
//                         href="/privacy-policy"
//                         className="text-indigo-400 hover:text-indigo-300 font-medium"
//                       >
//                         Privacy Policy
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div className={showLogin ? "overflow-hidden" : ""}>
//       {renderMainPage()}
//       <LoginModal />
//     </div>
//   );
// };

// export default Login;

// "use client";
// import React, { useState, useEffect, useRef, useCallback, memo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { apiConnector } from "../../Service/apiConnector";
// import { authEndpoints } from "../../Service/apis";
// import { useNavigate } from "react-router-dom";
// import {
//   Mail,
//   Loader2,
//   X,
//   ArrowRight,
//   Shield,
//   User,
//   CheckCircle,
//   BookOpen,
//   Calendar,
//   Clock as ClockIcon,
//   CreditCard,
//   Check,
//   MessageSquare,
//   HelpCircle,
//   Linkedin,
//   Instagram,
//   ExternalLink,
//   Sparkles,
//   Users,
//   Star,
//   Quote,
//   ChevronLeft,
//   ChevronRight,
//   Minus,
//   Plus,
//   Target,
//   Award,
//   Briefcase,
//   GraduationCap,
// } from "lucide-react";

// // Memoized Login Modal Component
// const LoginModal = memo(({
//   showLogin,
//   setShowLogin,
//   email,
//   setEmail,
//   loading,
//   setLoading,
//   error,
//   setError,
//   navigate
// }) => {
//   const sendOtp = async () => {
//     if (!email || !email.includes("@")) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       await apiConnector("POST", authEndpoints.SEND_OTP, { email });
//       setShowLogin(false);
//       navigate("/otp", { state: { email } });
//     } catch (e) {
//       console.error(e);
//       setError("Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const res = await apiConnector("GET", authEndpoints.GOOGLE_OAUTH + "/url");
//       setShowLogin(false);
//       window.location.href = res.data.url;
//     } catch (error) {
//       console.error(error);
//       setError("Failed to connect with Google");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendOtp();
//     }
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     if (error) setError("");
//   };

//   // Background Effects Components
//   const BoxesBackground = () => (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <pattern
//             id="grid"
//             width="40"
//             height="40"
//             patternUnits="userSpaceOnUse"
//           >
//             <path
//               d="M 40 0 L 0 0 0 40"
//               fill="none"
//               stroke="rgba(255, 255, 255, 0.05)"
//               strokeWidth="1"
//             />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />
//       </svg>
//     </div>
//   );

//   const MeteorsEffect = () => {
//     const [meteors, setMeteors] = useState([]);

//     useEffect(() => {
//       const newMeteors = Array.from({ length: 3 }).map((_, i) => ({
//         id: i,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: 2 + Math.random() * 3,
//         size: 1 + Math.random() * 2,
//       }));
//       setMeteors(newMeteors);
//     }, []);

//     return (
//       <div className={`absolute inset-0 overflow-hidden pointer-events-none`}>
//         {meteors.map((meteor) => (
//           <motion.div
//             key={meteor.id}
//             className="absolute h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full"
//             style={{
//               left: `${meteor.left}%`,
//               top: "-10px",
//               width: `${meteor.size * 50}px`,
//               rotate: "45deg",
//             }}
//             animate={{
//               top: ["-10px", "110%"],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: meteor.duration,
//               delay: meteor.delay,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <AnimatePresence>
//       {showLogin && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-black/70 backdrop-blur-md"
//             onClick={() => setShowLogin(false)}
//           />

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="relative w-full max-w-4xl bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10"
//           >
//             <MeteorsEffect />

//             <button
//               onClick={() => setShowLogin(false)}
//               className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
//             >
//               <X size={20} className="text-gray-300 group-hover:text-white" />
//             </button>

//             <div className="flex flex-col lg:flex-row h-full">
//               <div className="lg:w-2/5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
//                 <BoxesBackground />
//                 <div className="relative z-10">
//                   <div className="flex items-center gap-3 mb-8">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{
//                         duration: 20,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                       className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
//                     >
//                       <BookOpen size={24} className="text-white" />
//                     </motion.div>
//                     <h1 className="text-2xl font-bold">PlacementTutor</h1>
//                   </div>

//                   <div className="mb-8">
//                     <h2 className="text-3xl font-bold mb-4">
//                       Start Your Journey Today
//                     </h2>
//                     <p className="text-white/90 leading-relaxed">
//                       Sign in to book your personalized mentorship session with
//                       industry experts.
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-8">
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
//                     >
//                       <div className="text-2xl font-bold">200+</div>
//                       <div className="text-sm opacity-90">Students</div>
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
//                     >
//                       <div className="text-2xl font-bold">4.9★</div>
//                       <div className="text-sm opacity-90">Rating</div>
//                     </motion.div>
//                   </div>

//                   <div className="space-y-4">
//                     {[
//                       "Personalized 1:1 Sessions",
//                       "Expert Career Guidance",
//                       "Instant Booking Confirmation",
//                     ].map((item, i) => (
//                       <motion.div
//                         key={item}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.1 }}
//                         className="flex items-center gap-3"
//                       >
//                         <motion.div
//                           whileHover={{ rotate: 180 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <CheckCircle className="text-emerald-300" size={20} />
//                         </motion.div>
//                         <span>{item}</span>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="lg:w-3/5 p-8 lg:p-12">
//                 <div className="max-w-md mx-auto">
//                   <div className="text-center mb-8">
//                     <h2 className="text-2xl font-bold text-white">
//                       Welcome to PlacementTutor
//                     </h2>
//                     <p className="text-gray-300 mt-2">
//                       Sign in to book your session
//                     </p>
//                   </div>

//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Email Address
//                     </label>
//                     <div className="relative">
//                       <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                         <Mail size={20} className="text-gray-400" />
//                       </div>
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={handleEmailChange}
//                         onKeyPress={handleKeyPress}
//                         placeholder="student@example.com"
//                         className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                     <AnimatePresence>
//                       {error && (
//                         <motion.p
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="mt-2 text-sm text-red-400 flex items-center gap-2"
//                         >
//                           <Shield size={14} />
//                           {error}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={sendOtp}
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <Loader2 className="animate-spin" size={20} />
//                         Sending OTP...
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-2">
//                         Send OTP
//                         <ArrowRight size={20} />
//                       </span>
//                     )}
//                   </motion.button>

//                   <div className="flex items-center my-6">
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                     <span className="px-4 text-sm text-gray-400">
//                       or continue with
//                     </span>
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                   </div>

//                   <motion.button
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleGoogleLogin}
//                     className="w-full bg-white/10 border border-white/20 hover:border-indigo-500 text-gray-300 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/20"
//                   >
//                     <motion.svg
//                       animate={{ rotate: [0, 360] }}
//                       transition={{
//                         duration: 5,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                       className="w-5 h-5"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         fill="currentColor"
//                         d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                       />
//                       <path
//                         fill="currentColor"
//                         d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                       />
//                       <path
//                         fill="currentColor"
//                         d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                       />
//                       <path
//                         fill="currentColor"
//                         d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                       />
//                     </motion.svg>
//                     <span>Continue with Google</span>
//                   </motion.button>

//                   <div className="mt-8 pt-6 border-t border-gray-700 text-center">
//                     <p className="text-sm text-gray-400">
//                       By continuing, you agree to our{" "}
//                       <a
//                         href="/TermsAndConditions"
//                         className="text-indigo-400 hover:text-indigo-300 font-medium"
//                       >
//                         Terms
//                       </a>{" "}
//                       and{" "}
//                       <a
//                         href="/privacy-policy"
//                         className="text-indigo-400 hover:text-indigo-300 font-medium"
//                       >
//                         Privacy Policy
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// });

// LoginModal.displayName = 'LoginModal';

// // Main Component
// const Login = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Interactive states
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [animatedStats, setAnimatedStats] = useState({
//     students: 0,
//     rating: 0,
//     price: 0,
//   });

//   const [openFAQ, setOpenFAQ] = useState(null);
//   const [testimonialIndex, setTestimonialIndex] = useState(0);
//   const [hasAnimated, setHasAnimated] = useState(false);

//   const testimonials = [
//     {
//       name: "Priya Sharma",
//       college: "BITS Pilani • Pre-final Year",
//       rating: 5,
//       review:
//         "I was confused about whether to go for product-based or service-based companies. One session with Abhishek cleared all my doubts. He gave me a proper roadmap for DSA and development. Now I feel much more confident about my preparation.",
//     },
//     {
//       name: "Arjun Patel",
//       college: "IIT Delhi • Final Year",
//       rating: 5,
//       review:
//         "Best mentorship I have received! Abhishek reviewed my projects and suggested improvements that made my portfolio stand out. His system design tips helped me crack Razorpay. Forever grateful 😊",
//     },
//     {
//       name: "Sneha Reddy",
//       college: "NIT Trichy • 2nd Year",
//       rating: 5,
//       review:
//         "Was struggling with competitive programming and felt demotivated. Abhishek not only helped with CP strategies but also motivated me to keep going. His practical approach to problem-solving is exceptional!",
//     },
//     {
//       name: "Rohan Verma",
//       college: "IIIT Hyderabad • 3rd Year",
//       rating: 5,
//       review:
//         "The career guidance session was transformative. Abhishek helped me identify my strengths and created a personalized roadmap. Landed my first internship at Amazon!",
//     },
//     {
//       name: "Anjali Singh",
//       college: "DTU • Final Year",
//       rating: 5,
//       review:
//         "Resume review session was eye-opening. Abhishek pointed out critical improvements that I had missed. My callback rate increased by 300% after implementing his suggestions.",
//     },
//   ];

//   const faqData = [
//     {
//       question: "How do I book a mentorship session?",
//       answer: "Simply click on the 'Book Your Session' button, select your preferred date and time slot, complete the payment as per your mentor's rate, and you're all set! You'll receive a confirmation email with all the details."
//     },
//     {
//       question: "What topics can I discuss during the session?",
//       answer:
//         "You can discuss anything related to career guidance, technical interview preparation, project guidance, DSA concepts, system design, resume review, placement strategies, mock interviews, and more. Our mentors are experienced in various domains of software engineering and product management.",
//     },
//     {
//       question: "How will I receive the meeting link?",
//       answer: "The meeting link will be sent to you via email just 10 minutes before your scheduled session starts. We recommend joining 5 minutes early to ensure everything is working properly."
//     },
//     {
//       question: "Can I reschedule or cancel my booking?",
//       answer: "No, students cannot reschedule  or cancel booked sessions. Only mentors can initiate rescheduling requests, and it requires student approval. If a mentor needs to reschedule, you'll receive a request via email and dashboard notification. If you approve, the rescheduling will be confirmed and confirmation emails will be sent to both you and the mentor. If you decline, the original session timing remains unchanged."
//     },
//     {
//       question: "What if I face payment issues?",
//       answer:
//         "If you encounter any payment issues, please try again after 10 minutes. and if it will be solve by razorpay",
//     },
//     {
//       question: "How long is each mentorship session?",
//       answer: "The minimum session duration is 15 minutes. You can book longer sessions (30 min, 45 min, 60 min, etc.) based on mentor availability shown on the booking calendar. Maximum duration depends on the mentor's schedule - you can book multiple consecutive slots for extended discussions."
//     },
//     {
//       question: "Do I need any prior experience?",
//       answer:
//         "No prior experience is required! Our mentors tailor the session based on your current level, whether you're a beginner, intermediate, or advanced. We work with students from all backgrounds and experience levels.",
//     },
//   ];

//   const achievements = [
//     {
//       icon: Target,
//       number: "20+",
//       label: "High-Paying Internships",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       icon: Briefcase,
//       number: "Expedia",
//       label: "SDE Role (Joining)",
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       icon: GraduationCap,
//       number: "200+",
//       label: "Students Mentored",
//       color: "from-green-500 to-emerald-500",
//     },
//     {
//       icon: Award,
//       number: "Full-Stack",
//       label: "Expertise",
//       color: "from-orange-500 to-red-500",
//     },
//   ];

//   // Initialize animations only once
//   useEffect(() => {
//     if (hasAnimated) return;

//     const animateNumbers = () => {
//       const duration = 2000;
//       const steps = 100;
//       const interval = duration / steps;

//       let currentStep = 0;
//       const timer = setInterval(() => {
//         currentStep++;
//         const progress = currentStep / steps;

//         setAnimatedStats({
//           students: Math.floor(200 * progress),
//           rating: 4.9 * progress,
//           price: Math.floor(200 * progress),
//         });

//         if (currentStep >= steps) {
//           clearInterval(timer);
//           setAnimatedStats({
//             students: 200,
//             rating: 4.9,
//             price: 200,
//           });
//         }
//       }, interval);

//       return () => clearInterval(timer);
//     };

//     animateNumbers();
//     setHasAnimated(true);

//     const testimonialInterval = setInterval(() => {
//       setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(testimonialInterval);
//   }, [hasAnimated, testimonials.length]);

//   // Scroll lock when modal is open
//   useEffect(() => {
//     if (showLogin) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [showLogin]);

//   // Close on escape key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape" && showLogin) {
//         setShowLogin(false);
//       }
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [showLogin]);

//   // Memoized components
//   const BookNowSection = memo(() => {
//     return (
//       <section className="py-20 bg-gradient-to-b from-transparent to-[#0b1220] relative overflow-hidden">
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10"></div>
//           <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 mb-4">
//               <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
//               <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
//                 Book 1:1 Session
//               </span>
//               <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Book a 1:1 Session with Abhishek Ranjan and His Team
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-12">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="space-y-8"
//             >
//               <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="text-3xl font-bold text-white flex items-center gap-3">
//                       <span className="text-4xl">📞️</span>
//                       200
//                     </h3>
//                     <p className="text-gray-400 mt-1">/ Hour session</p>
//                   </div>
//                   <motion.div
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.5 }}
//                     className="w-16 h-16 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center"
//                   >
//                     <CreditCard size={28} className="text-indigo-400" />
//                   </motion.div>
//                 </div>

//                 <p className="text-gray-300 text-lg leading-relaxed mb-8">
//                   Get personalized mentorship from experienced tech
//                   professionals. Whether you're preparing for placements,
//                   learning new technologies, or planning your career path, we're
//                   here to guide you.
//                 </p>

//                 <div className="space-y-4">
//                   {[
//                     "Personalized guidance tailored to your goals",
//                     "Career roadmap and planning",
//                     "Technical interview preparation",
//                     "Resume and portfolio review",
//                   ].map((benefit, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="flex items-start gap-4 group"
//                     >
//                       <motion.div
//                         whileHover={{ scale: 1.2, rotate: 180 }}
//                         transition={{ duration: 0.3 }}
//                         className="w-6 h-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
//                       >
//                         <CheckCircle size={14} className="text-green-400" />
//                       </motion.div>
//                       <span className="text-gray-300 group-hover:text-white transition-colors">
//                         {benefit}
//                       </span>
//                     </motion.div>
//                   ))}
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.05, y: -5 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowLogin(true)}
//                   className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-3 group relative overflow-hidden"
//                 >
//                   <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//                   <Calendar size={22} />
//                   Book Session Now
//                   <ArrowRight
//                     size={22}
//                     className="group-hover:translate-x-1 transition-transform"
//                   />
//                 </motion.button>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="space-y-8"
//             >
//               <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 border border-indigo-500/20">
//                 <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
//                   <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
//                     <Calendar size={22} className="text-white" />
//                   </div>
//                   How It Works
//                 </h3>

//                 <div className="space-y-8">
//                   {[
//                     {
//                       step: 1,
//                       title: "Choose Your Mentor",
//                       description:
//                         "Select from our team of experienced mentors based on your needs.",
//                       icon: Users,
//                     },
//                     {
//                       step: 2,
//                       title: "Pick a Date",
//                       description:
//                         "Choose a convenient date from our available calendar.",
//                       icon: Calendar,
//                     },
//                     {
//                       step: 3,
//                       title: "Select Time Slot",
//                       description:
//                         "Pick from available 1-hour slots between 3 PM - 12 AM.",
//                       icon: ClockIcon,
//                     },
//                     {
//                       step: 4,
//                       title: "Complete Payment",
//                       description:
//                         "Pay securely via Razorpay and receive instant confirmation.",
//                       icon: CreditCard,
//                     },
//                   ].map((item, index) => (
//                     <motion.div
//                       key={item.step}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.15 }}
//                       className="flex gap-6 group"
//                     >
//                       <div className="relative">
//                         <motion.div
//                           whileHover={{ scale: 1.2 }}
//                           className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300"
//                         >
//                           <span className="text-2xl font-bold text-white">
//                             {item.step}
//                           </span>
//                         </motion.div>
//                         {index < 3 && (
//                           <div className="absolute left-1/2 top-full -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-indigo-500/30 to-purple-500/30"></div>
//                         )}
//                       </div>

//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <item.icon size={20} className="text-indigo-400" />
//                           <h4 className="text-xl font-semibold text-white">
//                             {item.title}
//                           </h4>
//                         </div>
//                         <p className="text-gray-300 leading-relaxed">
//                           {item.description}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 }}
//                   className="mt-10 pt-8 border-t border-white/10"
//                 >
//                   <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-4">
//                     <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
//                       <Shield size={24} className="text-green-400" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-white">
//                         Secure & Hassle-Free
//                       </h4>
//                       <p className="text-sm text-gray-300">
//                         Instant confirmation • 24/7 support • Easy rescheduling
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="text-center mt-16"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05, y: -5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-indigo-500/40 flex items-center gap-4 mx-auto group relative overflow-hidden"
//             >
//               <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <MessageSquare size={26} />
//               Start Your Journey Now - Book Your First Session
//               <ArrowRight
//                 size={26}
//                 className="group-hover:translate-x-2 transition-transform"
//               />
//             </motion.button>
//             <p className="text-gray-400 mt-4">
//               Limited slots available. Book now to secure your session!
//             </p>
//           </motion.div>
//         </div>
//       </section>
//     );
//   });

//   BookNowSection.displayName = 'BookNowSection';

//   const AboutAbhishekSection = memo(() => {
//     return (
//       <section id="about-section" className="py-20 bg-gradient-to-b from-transparent to-[#0b1220] relative overflow-hidden">
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10"></div>
//           <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 mb-4">
//               <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
//               <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
//                 About the Founder
//               </span>
//               <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Abhishek Ranjan
//               <span className="block text-2xl md:text-3xl text-gray-300 font-normal mt-2">
//                 Founder & Lead Mentor
//               </span>
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="space-y-6"
//             >
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//                 className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl"
//               >
//                 <p className="text-gray-300 text-lg leading-relaxed mb-6">
//                   Abhishek Ranjan is the founder of{" "}
//                   <span className="text-indigo-300 font-semibold">
//                     Collegemate
//                   </span>
//                   , bringing over two years of hands-on experience in the
//                   technology industry. A passionate educator and mentor, he has
//                   guided more than 200 college students through their academic
//                   and early professional journeys.
//                 </p>

//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.6 }}
//                   className="flex items-center gap-3 text-indigo-300 mb-6"
//                 >
//                   <div className="w-6 h-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
//                     <Target size={14} />
//                   </div>
//                   <span className="font-medium">Mission-Driven Mentorship</span>
//                 </motion.div>

//                 <p className="text-gray-300 text-lg leading-relaxed mb-6">
//                   His expertise spans full-stack development, system design, and
//                   career mentorship. Abhishek focuses on placement preparation,
//                   technical interview coaching, and helping students build
//                   strong portfolios and resumes that stand out to leading tech
//                   companies.
//                 </p>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.8 }}
//                 className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20"
//               >
//                 <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
//                   <Sparkles className="text-indigo-400" />
//                   Key Achievements
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {achievements.map((achievement, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
//                       whileHover={{ y: -5, scale: 1.05 }}
//                       className={`bg-gradient-to-br ${
//                         achievement.color
//                       }/10 to-transparent rounded-xl p-4 border border-white/5 hover:border-${
//                         achievement.color.split("-")[1]
//                       }-500/30 transition-all duration-300 cursor-pointer group`}
//                     >
//                       <div className="flex items-center gap-3 mb-3">
//                         <div
//                           className={`p-2 bg-gradient-to-br ${achievement.color}/20 rounded-lg`}
//                         >
//                           <achievement.icon className="w-5 h-5 text-white" />
//                         </div>
//                         <div className="text-2xl font-bold text-white">
//                           {achievement.number}
//                         </div>
//                       </div>
//                       <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
//                         {achievement.label}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="space-y-8"
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//                 className="relative group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
//                 <div className="relative bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-3xl p-2 border border-white/10 overflow-hidden">
//                   <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <motion.div
//                         animate={{
//                           scale: [1, 1.1, 1],
//                           rotate: [0, 5, -5, 0],
//                         }}
//                         transition={{
//                           duration: 10,
//                           repeat: Infinity,
//                           repeatType: "reverse",
//                         }}
//                         className="w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                       >
//                         <User size={96} className="text-white opacity-80" />
//                       </motion.div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <div className="text-2xl font-bold text-white">
//                             Abhishek Ranjan
//                           </div>
//                           <div className="text-indigo-300">
//                             Founder & Tech Mentor
//                           </div>
//                         </div>
//                         <motion.div
//                           whileHover={{ rotate: 360 }}
//                           transition={{ duration: 0.5 }}
//                           className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
//                         >
//                           <BookOpen size={20} className="text-white" />
//                         </motion.div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.7 }}
//                 className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl"
//               >
//                 <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
//                   <Briefcase className="text-indigo-400" />
//                   Career Journey
//                 </h3>

//                 <div className="space-y-6">
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: 0.9 }}
//                     className="flex items-start gap-4 group"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.2, rotate: 180 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
//                     >
//                       <CheckCircle size={18} className="text-green-400" />
//                     </motion.div>
//                     <div>
//                       <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
//                         Cracked 20+ Off-Campus Internships
//                       </div>
//                       <p className="text-gray-300 mt-1">
//                         Successfully secured high-paying internships through
//                         strategic preparation and networking.
//                       </p>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: 1 }}
//                     className="flex items-start gap-4 group"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.2, rotate: 180 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
//                     >
//                       <Award size={18} className="text-blue-400" />
//                     </motion.div>
//                     <div>
//                       <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
//                         Expedia SDE (Joining)
//                       </div>
//                       <p className="text-gray-300 mt-1">
//                         Secured Software Development Engineer role at Expedia
//                         through exceptional technical skills.
//                       </p>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: 1.1 }}
//                     className="flex items-start gap-4 group"
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.2, rotate: 180 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
//                     >
//                       <GraduationCap size={18} className="text-purple-400" />
//                     </motion.div>
//                     <div>
//                       <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
//                         Mission-Driven Education
//                       </div>
//                       <p className="text-gray-300 mt-1">
//                         Committed to making quality tech education accessible
//                         and helping students become industry-ready.
//                       </p>
//                     </div>
//                   </motion.div>
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 1.3 }}
//                   className="mt-8 pt-6 border-t border-white/10"
//                 >
//                   <p className="text-gray-300 italic text-center">
//                     "Driven by a mission to make quality tech education
//                     accessible and goal-oriented."
//                   </p>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 1.5 }}
//             className="text-center mt-16"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05, y: -5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center gap-3 mx-auto group relative overflow-hidden"
//             >
//               <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <MessageSquare size={22} />
//               Book Session with Abhishek
//               <ArrowRight
//                 size={22}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>
//     );
//   });

//   AboutAbhishekSection.displayName = 'AboutAbhishekSection';

//   const BoxesBackgroundStatic = memo(() => (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <pattern
//             id="grid"
//             width="40"
//             height="40"
//             patternUnits="userSpaceOnUse"
//           >
//             <path
//               d="M 40 0 L 0 0 0 40"
//               fill="none"
//               stroke="rgba(255, 255, 255, 0.05)"
//               strokeWidth="1"
//             />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />
//       </svg>
//     </div>
//   ));

//   BoxesBackgroundStatic.displayName = 'BoxesBackgroundStatic';

//   const MeteorsEffectStatic = memo(() => {
//     const [meteors, setMeteors] = useState([]);

//     useEffect(() => {
//       const newMeteors = Array.from({ length: 8 }).map((_, i) => ({
//         id: i,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: 2 + Math.random() * 3,
//         size: 1 + Math.random() * 2,
//       }));
//       setMeteors(newMeteors);
//     }, []);

//     return (
//       <div className={`absolute inset-0 overflow-hidden pointer-events-none`}>
//         {meteors.map((meteor) => (
//           <motion.div
//             key={meteor.id}
//             className="absolute h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full"
//             style={{
//               left: `${meteor.left}%`,
//               top: "-10px",
//               width: `${meteor.size * 50}px`,
//               rotate: "45deg",
//             }}
//             animate={{
//               top: ["-10px", "110%"],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: meteor.duration,
//               delay: meteor.delay,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>
//     );
//   });

//   MeteorsEffectStatic.displayName = 'MeteorsEffectStatic';

//   const FAQAccordionItem = memo(({ faq, index, isOpen, onClick }) => {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.1 }}
//         className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300"
//       >
//         <motion.button
//           onClick={() => onClick(index)}
//           className="w-full p-6 text-left flex items-center justify-between group hover:bg-white/5 transition-colors duration-300"
//           whileHover={{ x: 5 }}
//         >
//           <div className="flex items-center gap-4">
//             <motion.div
//               animate={{ rotate: isOpen ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//               className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0"
//             >
//               <span className="text-white font-semibold">{index + 1}</span>
//             </motion.div>
//             <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
//               {faq.question}
//             </h3>
//           </div>
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//             className="text-gray-400 group-hover:text-white"
//           >
//             {isOpen ? <Minus size={20} /> : <Plus size={20} />}
//           </motion.div>
//         </motion.button>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <div className="px-6 pb-6">
//                 <div className="pl-12 border-l-2 border-indigo-500/30">
//                   <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
//                   {index === 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="mt-4 flex items-center gap-2 text-sm text-indigo-400"
//                     >
//                       <CheckCircle size={14} />
//                       <span>Instant confirmation • No waiting time</span>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     );
//   });

//   FAQAccordionItem.displayName = 'FAQAccordionItem';

//   const TestimonialCarouselComponent = memo(() => {
//     const [direction, setDirection] = useState(0);

//     const slideVariants = {
//       enter: (direction) => ({
//         x: direction > 0 ? 1000 : -1000,
//         opacity: 0,
//       }),
//       center: {
//         x: 0,
//         opacity: 1,
//       },
//       exit: (direction) => ({
//         x: direction < 0 ? 1000 : -1000,
//         opacity: 0,
//       }),
//     };

//     const paginate = useCallback((newDirection) => {
//       setDirection(newDirection);
//       setTestimonialIndex((prev) => {
//         let nextIndex = prev + newDirection;
//         if (nextIndex < 0) nextIndex = testimonials.length - 1;
//         if (nextIndex >= testimonials.length) nextIndex = 0;
//         return nextIndex;
//       });
//     }, []);

//     const handleDotClick = useCallback((idx) => {
//       setDirection(idx > testimonialIndex ? 1 : -1);
//       setTestimonialIndex(idx);
//     }, [testimonialIndex]);

//     return (
//       <div id="testimonial-section" className="relative">
//         <div className="flex justify-center items-center gap-6 mb-8">
//           <motion.button
//             whileHover={{ scale: 1.1, x: -5 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => paginate(-1)}
//             className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
//           >
//             <ChevronLeft className="text-white" />
//           </motion.button>

//           <div className="flex gap-2">
//             {testimonials.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleDotClick(idx)}
//                 className="relative"
//               >
//                 <motion.div
//                   className={`w-3 h-3 rounded-full transition-colors ${
//                     idx === testimonialIndex
//                       ? "bg-gradient-to-r from-indigo-500 to-purple-500"
//                       : "bg-white/20"
//                   }`}
//                   animate={{
//                     scale: idx === testimonialIndex ? [1, 1.2, 1] : 1,
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     repeatDelay: 1,
//                   }}
//                 />
//               </button>
//             ))}
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.1, x: 5 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => paginate(1)}
//             className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
//           >
//             <ChevronRight className="text-white" />
//           </motion.button>
//         </div>

//         <div className="relative h-[400px] overflow-hidden">
//           <AnimatePresence custom={direction} mode="wait">
//             <motion.div
//               key={testimonialIndex}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 x: { type: "spring", stiffness: 300, damping: 30 },
//                 opacity: { duration: 0.2 },
//               }}
//               className="absolute inset-0"
//             >
//               <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl h-full">
//                 <div className="flex flex-col h-full">
//                   <div className="mb-6">
//                     <motion.div
//                       initial={{ scale: 0, rotate: -180 }}
//                       animate={{ scale: 1, rotate: 0 }}
//                       transition={{ delay: 0.2, type: "spring" }}
//                       className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center"
//                     >
//                       <Quote className="w-6 h-6 text-indigo-400" />
//                     </motion.div>
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="flex text-yellow-400 text-2xl mb-6"
//                   >
//                     {Array(testimonials[testimonialIndex].rating)
//                       .fill()
//                       .map((_, i) => (
//                         <motion.span
//                           key={i}
//                           initial={{ scale: 0, rotate: -180 }}
//                           animate={{ scale: 1, rotate: 0 }}
//                           transition={{ delay: i * 0.1 + 0.4 }}
//                           whileHover={{ scale: 1.2, rotate: 180 }}
//                           className="cursor-pointer"
//                         >
//                           ★
//                         </motion.span>
//                       ))}
//                   </motion.div>

//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="text-gray-300 text-lg italic leading-relaxed mb-8 flex-grow"
//                   >
//                     "{testimonials[testimonialIndex].review}"
//                   </motion.p>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6 }}
//                     className="flex items-center justify-between"
//                   >
//                     <div>
//                       <div className="font-semibold text-white text-xl">
//                         {testimonials[testimonialIndex].name}
//                       </div>
//                       <div className="text-gray-300">
//                         {testimonials[testimonialIndex].college}
//                       </div>
//                     </div>
//                     <motion.div
//                       animate={{
//                         rotate: [0, 10, -10, 0],
//                         scale: [1, 1.1, 1],
//                       }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                         repeatDelay: 3,
//                       }}
//                       className="w-12 h-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center border border-white/10"
//                     >
//                       <User className="w-5 h-5 text-indigo-400" />
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-wrap justify-center items-center gap-6 mt-8 text-gray-300"
//         >
//           <div className="flex items-center gap-2">
//             <motion.div
//               animate={{ scale: [1, 1.1, 1] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-2 h-2 bg-green-400 rounded-full"
//             />
//             <span>
//               Testimonial {testimonialIndex + 1} of {testimonials.length}
//             </span>
//           </div>
//           <div className="hidden md:block">•</div>
//           <div>Slide to read more testimonials</div>
//         </motion.div>
//       </div>
//     );
//   });

//   TestimonialCarouselComponent.displayName = 'TestimonialCarouselComponent';

//   const InteractiveStatCardComponent = memo(({ number, label, icon: Icon, delay = 0 }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.5 }}
//       whileHover={{ scale: 1.05, y: -5 }}
//       className="relative bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 cursor-pointer group"
//       onMouseEnter={() => setHoveredCard(label)}
//       onMouseLeave={() => setHoveredCard(null)}
//     >
//       <div className="relative z-10 flex items-center justify-between mb-4">
//         <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
//           <Icon className="w-6 h-6 text-indigo-400" />
//         </div>
//         <motion.div
//           animate={{
//             rotate: hoveredCard === label ? 360 : 0,
//             scale: hoveredCard === label ? 1.2 : 1,
//           }}
//           transition={{ duration: 0.5 }}
//           className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
//         />
//       </div>
//       <div className="relative z-10 text-4xl font-bold text-white mb-2">
//         {number}
//         {label === "Rating" && "★"}
//         {label === "Price" && <span className="text-lg">₹</span>}
//       </div>
//       <div className="relative z-10 text-gray-300">{label}</div>
//     </motion.div>
//   ));

//   InteractiveStatCardComponent.displayName = 'InteractiveStatCardComponent';

//   const FloatingElementsStatic = memo(() => (
//     <div className="fixed inset-0 pointer-events-none z-0">
//       {Array.from({ length: 15 }).map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-4 h-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, -20, 0],
//             x: [0, Math.random() * 20 - 10, 0],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: 3 + Math.random() * 2,
//             delay: Math.random() * 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   ));

//   FloatingElementsStatic.displayName = 'FloatingElementsStatic';

//   const handleFAQClick = useCallback((index) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   }, [openFAQ]);

//   const renderMainPage = () => (
//     <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white overflow-hidden relative">
//       <BoxesBackgroundStatic />
//       <MeteorsEffectStatic />
//       <FloatingElementsStatic />

//       <nav className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#111827]/90 to-transparent backdrop-blur-md border-b border-white/10 z-50">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-3 cursor-pointer"
//             onClick={() => {
//               window.scrollTo({ top: 0, behavior: 'smooth' });
//             }}
//           >
//             <motion.div
//               whileHover={{ rotate: 180 }}
//               transition={{ duration: 0.5 }}
//               className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
//             >
//               <BookOpen className="text-white" size={22} />
//             </motion.div>
//             <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               PlacementTutor
//             </span>
//           </motion.div>

//           <div className="flex items-center gap-4">
//             <motion.button
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => {
//                 document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//               }}
//               className="text-gray-300 hover:text-white transition-colors px-4 py-2"
//             >
//               Mentors
//             </motion.button>

//             <motion.button
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => {
//                 document.getElementById('testimonial-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//               }}
//               className="text-gray-300 hover:text-white transition-colors px-4 py-2"
//             >
//               Testimonials
//             </motion.button>

//             <motion.button
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => {
//                 document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//               }}
//               className="text-gray-300 hover:text-white transition-colors px-4 py-2"
//             >
//               FAQ
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
//             >
//               Book Session
//             </motion.button>
//           </div>
//         </div>
//       </nav>

//       <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
//             >
//               Get the Correct Direction
//               <br />
//               <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
//                 and Path from Our Guidance
//               </span>
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
//             >
//               We're here to support you and make you better. Book personalized
//               1:1 mentorship sessions with experienced tech professionals and
//               accelerate your career growth.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowLogin(true)}
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-3 group relative overflow-hidden"
//               >
//                 <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//                 <Calendar size={22} />
//                 Book Your Session
//                 <ArrowRight
//                   size={22}
//                   className="group-hover:translate-x-1 transition-transform"
//                 />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white/10 border border-white/20 hover:border-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 hover:bg-white/20"
//               >
//                 <ExternalLink size={22} />
//                 Learn More
//               </motion.button>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
//           >
//             <InteractiveStatCardComponent
//               number={animatedStats.students}
//               label="Students Mentored"
//               icon={Users}
//               delay={0.1}
//             />
//             <InteractiveStatCardComponent
//               number={animatedStats.rating.toFixed(1)}
//               label="Rating"
//               icon={Star}
//               delay={0.2}
//             />
//             <InteractiveStatCardComponent
//               number={animatedStats.price}
//               label="Per Session"
//               icon={CreditCard}
//               delay={0.3}
//             />
//           </motion.div>
//         </div>
//       </section>

//       <AboutAbhishekSection />
//       <BookNowSection />

//       <section className="py-20 bg-gradient-to-b from-white/5 to-transparent">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-4xl font-bold text-white mb-4"
//             >
//               What Our Students Say
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//             >
//               Real reviews from students who transformed their careers with
//               PlacementTutor.
//             </motion.p>
//           </div>

//           <TestimonialCarouselComponent />
//         </div>
//       </section>

//       <section id="faq-section" className="py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-4xl font-bold text-white mb-4"
//             >
//               Frequently Asked Questions
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-xl text-gray-300 mb-10"
//             >
//               Everything you need to know about our mentorship sessions
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-6 py-3 mb-8"
//             >
//               <HelpCircle className="w-5 h-5 text-indigo-400" />
//               <span className="text-indigo-300">
//                 {openFAQ === null
//                   ? "Click on any question to expand"
//                   : "Click to collapse"}
//               </span>
//             </motion.div>
//           </div>

//           <div className="space-y-4">
//             {faqData.map((faq, index) => (
//               <FAQAccordionItem
//                 key={index}
//                 faq={faq}
//                 index={index}
//                 isOpen={openFAQ === index}
//                 onClick={handleFAQClick}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       <footer className="bg-gradient-to-b from-[#0b1220] to-[#000000] text-white py-12 border-t border-white/10">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col md:flex-row justify-between items-center"
//           >
//             <div className="flex items-center gap-3 mb-6 md:mb-0">
//               <motion.div
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
//               >
//                 <BookOpen className="text-white" size={22} />
//               </motion.div>
//               <span className="text-xl font-bold">PlacementTutor</span>
//             </div>

//             <div className="flex gap-6">
//               {[
//                 { name: "ContactUs", path: "/ContactUs" },
//                 { name: "PrivacyPolicy", path: "/privacy-policy" },
//                 { name: "RefundAndCancellation", path: "/RefundAndCancellation" },
//                 { name: "TermsAndConditions", path: "/TermsAndConditions" }
//               ].map((item, i) => (
//                 <motion.button
//                   key={item.name}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   whileHover={{ y: -2 }}
//                   onClick={() => navigate(item.path)}
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   {item.name}
//                 </motion.button>
//               ))}
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowLogin(true)}
//               className="mt-6 md:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
//             >
//               Get Started
//             </motion.button>
//           </motion.div>

//           <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
//             © {new Date().getFullYear()} PlacementTutor. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );

//   return (
//     <div className={showLogin ? "overflow-hidden" : ""}>
//       {renderMainPage()}
//       <LoginModal
//         showLogin={showLogin}
//         setShowLogin={setShowLogin}
//         email={email}
//         setEmail={setEmail}
//         loading={loading}
//         setLoading={setLoading}
//         error={error}
//         setError={setError}
//         navigate={navigate}
//       />
//     </div>
//   );
// };

// export default Login;

// "use client";
// import React, { useState, useEffect, useRef, useCallback, memo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { apiConnector } from "../../Service/apiConnector";
// import { authEndpoints, PublicEndpoints } from "../../Service/apis"; // Add PublicEndpoints import
// import { useNavigate } from "react-router-dom";
// import {
//   Mail,
//   Loader2,
//   X,
//   ArrowRight,
//   Shield,
//   User,
//   CheckCircle,
//   BookOpen,
//   Calendar,
//   Clock as ClockIcon,
//   CreditCard,
//   Check,
//   MessageSquare,
//   HelpCircle,
//   Linkedin,
//   Instagram,
//   ExternalLink,
//   Sparkles,
//   Users,
//   Star,
//   Quote,
//   ChevronLeft,
//   ChevronRight,
//   Minus,
//   Plus,
//   Target,
//   Award,
//   Briefcase,
//   GraduationCap,
//   Building, // Add Building icon for company/college
//   BriefcaseIcon, // For job title
// } from "lucide-react";

// // Memoized Login Modal Component
// const LoginModal = memo(({
//   showLogin,
//   setShowLogin,
//   email,
//   setEmail,
//   loading,
//   setLoading,
//   error,
//   setError,
//   navigate
// }) => {
//   const sendOtp = async () => {
//     if (!email || !email.includes("@")) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       await apiConnector("POST", authEndpoints.SEND_OTP, { email });
//       setShowLogin(false);
//       navigate("/otp", { state: { email } });
//     } catch (e) {
//       console.error(e);
//       setError("Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const res = await apiConnector("GET", authEndpoints.GOOGLE_OAUTH + "/url");
//       setShowLogin(false);
//       window.location.href = res.data.url;
//     } catch (error) {
//       console.error(error);
//       setError("Failed to connect with Google");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendOtp();
//     }
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     if (error) setError("");
//   };

//   // Background Effects Components
//   const BoxesBackground = () => (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <pattern
//             id="grid"
//             width="40"
//             height="40"
//             patternUnits="userSpaceOnUse"
//           >
//             <path
//               d="M 40 0 L 0 0 0 40"
//               fill="none"
//               stroke="rgba(255, 255, 255, 0.05)"
//               strokeWidth="1"
//             />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#grid)" />
//       </svg>
//     </div>
//   );

//   const MeteorsEffect = () => {
//     const [meteors, setMeteors] = useState([]);

//     useEffect(() => {
//       const newMeteors = Array.from({ length: 3 }).map((_, i) => ({
//         id: i,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: 2 + Math.random() * 3,
//         size: 1 + Math.random() * 2,
//       }));
//       setMeteors(newMeteors);
//     }, []);

//     return (
//       <div className={`absolute inset-0 overflow-hidden pointer-events-none`}>
//         {meteors.map((meteor) => (
//           <motion.div
//             key={meteor.id}
//             className="absolute h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full"
//             style={{
//               left: `${meteor.left}%`,
//               top: "-10px",
//               width: `${meteor.size * 50}px`,
//               rotate: "45deg",
//             }}
//             animate={{
//               top: ["-10px", "110%"],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: meteor.duration,
//               delay: meteor.delay,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <AnimatePresence>
//       {showLogin && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute inset-0 bg-black/70 backdrop-blur-md"
//             onClick={() => setShowLogin(false)}
//           />

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="relative w-full max-w-4xl bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10"
//           >
//             <MeteorsEffect />

//             <button
//               onClick={() => setShowLogin(false)}
//               className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
//             >
//               <X size={20} className="text-gray-300 group-hover:text-white" />
//             </button>

//             <div className="flex flex-col lg:flex-row h-full">
//               <div className="lg:w-2/5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
//                 <BoxesBackground />
//                 <div className="relative z-10">
//                   <div className="flex items-center gap-3 mb-8">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{
//                         duration: 20,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                       className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
//                     >
//                       <BookOpen size={24} className="text-white" />
//                     </motion.div>
//                     <h1 className="text-2xl font-bold">PlacementTutor</h1>
//                   </div>

//                   <div className="mb-8">
//                     <h2 className="text-3xl font-bold mb-4">
//                       Start Your Journey Today
//                     </h2>
//                     <p className="text-white/90 leading-relaxed">
//                       Sign in to book your personalized mentorship session with
//                       industry experts.
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-8">
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
//                     >
//                       <div className="text-2xl font-bold">200+</div>
//                       <div className="text-sm opacity-90">Students</div>
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
//                     >
//                       <div className="text-2xl font-bold">4.9★</div>
//                       <div className="text-sm opacity-90">Rating</div>
//                     </motion.div>
//                   </div>

//                   <div className="space-y-4">
//                     {[
//                       "Personalized 1:1 Sessions",
//                       "Expert Career Guidance",
//                       "Instant Booking Confirmation",
//                     ].map((item, i) => (
//                       <motion.div
//                         key={item}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.1 }}
//                         className="flex items-center gap-3"
//                       >
//                         <motion.div
//                           whileHover={{ rotate: 180 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <CheckCircle className="text-emerald-300" size={20} />
//                         </motion.div>
//                         <span>{item}</span>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="lg:w-3/5 p-8 lg:p-12">
//                 <div className="max-w-md mx-auto">
//                   <div className="text-center mb-8">
//                     <h2 className="text-2xl font-bold text-white">
//                       Welcome to PlacementTutor
//                     </h2>
//                     <p className="text-gray-300 mt-2">
//                       Sign in to book your session
//                     </p>
//                   </div>

//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       Email Address
//                     </label>
//                     <div className="relative">
//                       <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                         <Mail size={20} className="text-gray-400" />
//                       </div>
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={handleEmailChange}
//                         onKeyPress={handleKeyPress}
//                         placeholder="student@example.com"
//                         className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//                       />
//                     </div>
//                     <AnimatePresence>
//                       {error && (
//                         <motion.p
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="mt-2 text-sm text-red-400 flex items-center gap-2"
//                         >
//                           <Shield size={14} />
//                           {error}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={sendOtp}
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <Loader2 className="animate-spin" size={20} />
//                         Sending OTP...
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-2">
//                         Send OTP
//                         <ArrowRight size={20} />
//                       </span>
//                     )}
//                   </motion.button>

//                   <div className="flex items-center my-6">
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                     <span className="px-4 text-sm text-gray-400">
//                       or continue with
//                     </span>
//                     <div className="flex-1 h-px bg-gray-700"></div>
//                   </div>

//                   <motion.button
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleGoogleLogin}
//                     className="w-full bg-white/10 border border-white/20 hover:border-indigo-500 text-gray-300 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/20"
//                   >
//                     <motion.svg
//                       animate={{ rotate: [0, 360] }}
//                       transition={{
//                         duration: 5,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                       className="w-5 h-5"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         fill="currentColor"
//                         d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                       />
//                       <path
//                         fill="currentColor"
//                         d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                       />
//                       <path
//                         fill="currentColor"
//                         d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                       />
//                       <path
//                         fill="currentColor"
//                         d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                       />
//                     </motion.svg>
//                     <span>Continue with Google</span>
//                   </motion.button>

//                   <div className="mt-8 pt-6 border-t border-gray-700 text-center">
//                     <p className="text-sm text-gray-400">
//                       By continuing, you agree to our{" "}
//                       <a
//                         href="/TermsAndConditions"
//                         className="text-indigo-400 hover:text-indigo-300 font-medium"
//                       >
//                         Terms
//                       </a>{" "}
//                       and{" "}
//                       <a
//                         href="/privacy-policy"
//                         className="text-indigo-400 hover:text-indigo-300 font-medium"
//                       >
//                         Privacy Policy
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// });

// LoginModal.displayName = 'LoginModal';

// // Updated TestimonialCarouselComponent to use API data
// const TestimonialCarouselComponent = memo(({ reviews, loading }) => {
//   const [direction, setDirection] = useState(0);
//   const [testimonialIndex, setTestimonialIndex] = useState(0);

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction) => ({
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//   };

//   const paginate = useCallback((newDirection) => {
//     setDirection(newDirection);
//     setTestimonialIndex((prev) => {
//       let nextIndex = prev + newDirection;
//       if (nextIndex < 0) nextIndex = reviews.length - 1;
//       if (nextIndex >= reviews.length) nextIndex = 0;
//       return nextIndex;
//     });
//   }, [reviews.length]);

//   const handleDotClick = useCallback((idx) => {
//     setDirection(idx > testimonialIndex ? 1 : -1);
//     setTestimonialIndex(idx);
//   }, [testimonialIndex]);

//   // Format date for review
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="relative h-[400px] flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full"
//         />
//       </div>
//     );
//   }

//   // Empty state
//   if (!reviews || reviews.length === 0) {
//     return (
//       <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl">
//         <div className="text-center py-12">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
//             <Quote className="w-10 h-10 text-indigo-400" />
//           </div>
//           <h3 className="text-2xl font-semibold text-white mb-3">
//             No Reviews Yet
//           </h3>
//           <p className="text-gray-300">
//             Be the first to share your experience with our mentorship!
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const currentReview = reviews[testimonialIndex];

//   return (
//     <div id="testimonial-section" className="relative">
//       <div className="flex justify-center items-center gap-6 mb-8">
//         <motion.button
//           whileHover={{ scale: 1.1, x: -5 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => paginate(-1)}
//           className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
//         >
//           <ChevronLeft className="text-white" />
//         </motion.button>

//         <div className="flex gap-2">
//           {reviews.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleDotClick(idx)}
//               className="relative"
//             >
//               <motion.div
//                 className={`w-3 h-3 rounded-full transition-colors ${
//                   idx === testimonialIndex
//                     ? "bg-gradient-to-r from-indigo-500 to-purple-500"
//                     : "bg-white/20"
//                 }`}
//                 animate={{
//                   scale: idx === testimonialIndex ? [1, 1.2, 1] : 1,
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   repeatDelay: 1,
//                 }}
//               />
//             </button>
//           ))}
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.1, x: 5 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => paginate(1)}
//           className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
//         >
//           <ChevronRight className="text-white" />
//         </motion.button>
//       </div>

//       <div className="relative h-[450px] overflow-hidden">
//         <AnimatePresence custom={direction} mode="wait">
//           <motion.div
//             key={testimonialIndex}
//             custom={direction}
//             variants={slideVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{
//               x: { type: "spring", stiffness: 300, damping: 30 },
//               opacity: { duration: 0.2 },
//             }}
//             className="absolute inset-0"
//           >
//             <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl h-full">
//               <div className="flex flex-col h-full">
//                 <div className="mb-6">
//                   <motion.div
//                     initial={{ scale: 0, rotate: -180 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     transition={{ delay: 0.2, type: "spring" }}
//                     className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center"
//                   >
//                     <Quote className="w-6 h-6 text-indigo-400" />
//                   </motion.div>
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="flex text-yellow-400 text-2xl mb-6"
//                 >
//                   {Array(Math.floor(currentReview.rating || 5))
//                     .fill()
//                     .map((_, i) => (
//                       <motion.span
//                         key={i}
//                         initial={{ scale: 0, rotate: -180 }}
//                         animate={{ scale: 1, rotate: 0 }}
//                         transition={{ delay: i * 0.1 + 0.4 }}
//                         whileHover={{ scale: 1.2, rotate: 180 }}
//                         className="cursor-pointer"
//                       >
//                         ★
//                       </motion.span>
//                     ))}
//                 </motion.div>

//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                   className="text-gray-300 text-lg italic leading-relaxed mb-8 flex-grow"
//                 >
//                   "{currentReview.comment || "Excellent mentorship experience!"}"
//                 </motion.p>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                   className="space-y-4"
//                 >
//                   {/* Student/Mentor Info */}
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="font-semibold text-white text-xl">
//                         {currentReview.mentorName || "Anonymous Student"}
//                       </div>
//                       <div className="text-gray-300">
//                         Mentored by experienced professional
//                       </div>
//                     </div>
//                     <motion.div
//                       animate={{
//                         rotate: [0, 10, -10, 0],
//                         scale: [1, 1.1, 1],
//                       }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                         repeatDelay: 3,
//                       }}
//                       className="w-12 h-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center border border-white/10"
//                     >
//                       <User className="w-5 h-5 text-indigo-400" />
//                     </motion.div>
//                   </div>

//                   {/* Mentor Details */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
//                     {currentReview.mentorCollege && (
//                       <div className="flex items-center gap-2 text-gray-400">
//                         <Building className="w-4 h-4" />
//                         <span className="truncate">{currentReview.mentorCollege}</span>
//                       </div>
//                     )}

//                     {currentReview.mentorCompany && (
//                       <div className="flex items-center gap-2 text-gray-400">
//                         <BriefcaseIcon className="w-4 h-4" />
//                         <span className="truncate">{currentReview.mentorCompany}</span>
//                       </div>
//                     )}

//                     {currentReview.mentorJobTitle && (
//                       <div className="flex items-center gap-2 text-gray-400">
//                         <Award className="w-4 h-4" />
//                         <span className="truncate">{currentReview.mentorJobTitle}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Review Date */}
//                   {currentReview.reviewedAt && (
//                     <div className="text-sm text-gray-500 flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       {formatDate(currentReview.reviewedAt)}
//                     </div>
//                   )}
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-wrap justify-center items-center gap-6 mt-8 text-gray-300"
//       >
//         <div className="flex items-center gap-2">
//           <motion.div
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="w-2 h-2 bg-green-400 rounded-full"
//           />
//           <span>
//             Review {testimonialIndex + 1} of {reviews.length}
//           </span>
//         </div>
//         <div className="hidden md:block">•</div>
//         <div>Slide to read more reviews</div>
//       </motion.div>
//     </div>
//   );
// });

// TestimonialCarouselComponent.displayName = 'TestimonialCarouselComponent';

// // Main Component
// const Login = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Interactive states
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [animatedStats, setAnimatedStats] = useState({
//     students: 0,
//     rating: 0,
//     price: 0,
//   });

//   const [openFAQ, setOpenFAQ] = useState(null);
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const [approvedReviews, setApprovedReviews] = useState([]);
//   const [reviewsLoading, setReviewsLoading] = useState(true);
//   const [reviewsError, setReviewsError] = useState(null);

//   // Fetch approved reviews on component mount
//   useEffect(() => {
//     const fetchApprovedReviews = async () => {
//       try {
//         setReviewsLoading(true);
//         setReviewsError(null);

//         const response = await apiConnector(
//           "GET",
//           PublicEndpoints.public_review // Using the public endpoint
//         );

//         console.log("Approved reviews response:", response.data);

//         if (response.data.success) {
//           // Take only first 5 reviews (as per admin selection)
//           const firstFiveReviews = response.data.data.slice(0, 5);
//           setApprovedReviews(firstFiveReviews);

//           // Update animated stats with real average rating
//           if (firstFiveReviews.length > 0) {
//             const avgRating = firstFiveReviews.reduce(
//               (sum, review) => sum + (review.rating || 0),
//               0
//             ) / firstFiveReviews.length;

//             setAnimatedStats(prev => ({
//               ...prev,
//               rating: parseFloat(avgRating.toFixed(1))
//             }));
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching approved reviews:", error);
//         setReviewsError("Failed to load reviews. Please try again later.");
//       } finally {
//         setReviewsLoading(false);
//       }
//     };

//     fetchApprovedReviews();
//   }, []);

//   const faqData = [
//     {
//       question: "How do I book a mentorship session?",
//       answer: "Simply click on the 'Book Your Session' button, select your preferred date and time slot, complete the payment as per your mentor's rate, and you're all set! You'll receive a confirmation email with all the details."
//     },
//     {
//       question: "What topics can I discuss during the session?",
//       answer:
//         "You can discuss anything related to career guidance, technical interview preparation, project guidance, DSA concepts, system design, resume review, placement strategies, mock interviews, and more. Our mentors are experienced in various domains of software engineering and product management.",
//     },
//     {
//       question: "How will I receive the meeting link?",
//       answer: "The meeting link will be sent to you via email just 10 minutes before your scheduled session starts. We recommend joining 5 minutes early to ensure everything is working properly."
//     },
//     {
//       question: "Can I reschedule or cancel my booking?",
//       answer: "No, students cannot reschedule  or cancel booked sessions. Only mentors can initiate rescheduling requests, and it requires student approval. If a mentor needs to reschedule, you'll receive a request via email and dashboard notification. If you approve, the rescheduling will be confirmed and confirmation emails will be sent to both you and the mentor. If you decline, the original session timing remains unchanged."
//     },
//     {
//       question: "What if I face payment issues?",
//       answer:
//         "If you encounter any payment issues, please try again after 10 minutes. and if it will be solve by razorpay",
//     },
//     {
//       question: "How long is each mentorship session?",
//       answer: "The minimum session duration is 15 minutes. You can book longer sessions (30 min, 45 min, 60 min, etc.) based on mentor availability shown on the booking calendar. Maximum duration depends on the mentor's schedule - you can book multiple consecutive slots for extended discussions."
//     },
//     {
//       question: "Do I need any prior experience?",
//       answer:
//         "No prior experience is required! Our mentors tailor the session based on your current level, whether you're a beginner, intermediate, or advanced. We work with students from all backgrounds and experience levels.",
//     },
//   ];

//   const achievements = [
//     {
//       icon: Target,
//       number: "20+",
//       label: "High-Paying Internships",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       icon: Briefcase,
//       number: "Expedia",
//       label: "SDE Role (Joining)",
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       icon: GraduationCap,
//       number: "200+",
//       label: "Students Mentored",
//       color: "from-green-500 to-emerald-500",
//     },
//     {
//       icon: Award,
//       number: "Full-Stack",
//       label: "Expertise",
//       color: "from-orange-500 to-red-500",
//     },
//   ];

//   // Initialize animations only once
//   useEffect(() => {
//     if (hasAnimated) return;

//     const animateNumbers = () => {
//       const duration = 2000;
//       const steps = 100;
//       const interval = duration / steps;

//       let currentStep = 0;
//       const timer = setInterval(() => {
//         currentStep++;
//         const progress = currentStep / steps;

//         setAnimatedStats({
//           students: Math.floor(200 * progress),
//           rating: animatedStats.rating > 0 ? animatedStats.rating : 4.9 * progress,
//           price: Math.floor(200 * progress),
//         });

//         if (currentStep >= steps) {
//           clearInterval(timer);
//           setAnimatedStats(prev => ({
//             students: 200,
//             rating: prev.rating > 0 ? prev.rating : 4.9,
//             price: 200,
//           }));
//         }
//       }, interval);

//       return () => clearInterval(timer);
//     };

//     animateNumbers();
//     setHasAnimated(true);

//   }, [hasAnimated, animatedStats.rating]);

//   // Scroll lock when modal is open
//   useEffect(() => {
//     if (showLogin) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [showLogin]);

//   // Close on escape key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape" && showLogin) {
//         setShowLogin(false);
//       }
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [showLogin]);

//   // Memoized components (other sections remain the same as your original code)
//   // ... [Keep all other memoized components exactly as in your original code]

//   const handleFAQClick = useCallback((index) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   }, [openFAQ]);

//   const renderMainPage = () => (
//     <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white overflow-hidden relative">
//       {/* Your existing JSX remains the same until the Testimonials section */}
//       {/* ... [Keep all existing JSX structure] */}

//       {/* Updated Testimonials Section */}
//       <section className="py-20 bg-gradient-to-b from-white/5 to-transparent">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-4xl font-bold text-white mb-4"
//             >
//               What Our Students Say
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//             >
//               Real reviews from students who transformed their careers with
//               PlacementTutor.
//             </motion.p>

//             {/* Show loading or error state */}
//             {reviewsLoading && (
//               <div className="mt-8 flex justify-center">
//                 <div className="flex items-center gap-3 text-indigo-300">
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full"
//                   />
//                   <span>Loading reviews...</span>
//                 </div>
//               </div>
//             )}

//             {reviewsError && (
//               <div className="mt-8 text-amber-300">
//                 {reviewsError}
//               </div>
//             )}
//           </div>

//           <TestimonialCarouselComponent
//             reviews={approvedReviews}
//             loading={reviewsLoading}
//           />
//         </div>
//       </section>

//       {/* ... [Rest of your JSX remains the same] */}
//     </div>
//   );

//   return (
//     <div className={showLogin ? "overflow-hidden" : ""}>
//       {renderMainPage()}
//       <LoginModal
//         showLogin={showLogin}
//         setShowLogin={setShowLogin}
//         email={email}
//         setEmail={setEmail}
//         loading={loading}
//         setLoading={setLoading}
//         error={error}
//         setError={setError}
//         navigate={navigate}
//       />
//     </div>
//   );
// };

// export default Login;

"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiConnector } from "../../Service/apiConnector";
import { authEndpoints, PublicEndpoints } from "../../Service/apis";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Loader2,
  X,
  ArrowRight,
  Shield,
  User,
  CheckCircle,
  BookOpen,
  Calendar,
  Clock as ClockIcon,
  CreditCard,
  Check,
  MessageSquare,
  HelpCircle,
  Linkedin,
  Instagram,
  ExternalLink,
  Sparkles,
  Users,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Target,
  Award,
  Briefcase,
  GraduationCap,
  Building,
  BriefcaseIcon,
} from "lucide-react";

// Memoized Login Modal Component
const LoginModal = memo(
  ({
    showLogin,
    setShowLogin,
    email,
    setEmail,
    loading,
    setLoading,
    error,
    setError,
    navigate,
  }) => {
    const sendOtp = async () => {
      if (!email || !email.includes("@")) {
        setError("Please enter a valid email address");
        return;
      }

      try {
        setLoading(true);
        setError("");
        await apiConnector("POST", authEndpoints.SEND_OTP, { email });
        setShowLogin(false);
        navigate("/otp", { state: { email } });
      } catch (e) {
        console.error(e);
        setError("Failed to send OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const handleGoogleLogin = async () => {
      try {
        const res = await apiConnector(
          "GET",
          authEndpoints.GOOGLE_OAUTH + "/url"
        );
        setShowLogin(false);
        window.location.href = res.data.url;
      } catch (error) {
        console.error(error);
        setError("Failed to connect with Google");
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        sendOtp();
      }
    };

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      if (error) setError("");
    };

    // Background Effects Components
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

    const MeteorsEffect = () => {
      const [meteors, setMeteors] = useState([]);

      useEffect(() => {
        const newMeteors = Array.from({ length: 3 }).map((_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 2 + Math.random() * 3,
          size: 1 + Math.random() * 2,
        }));
        setMeteors(newMeteors);
      }, []);

      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none`}>
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

    return (
      <AnimatePresence>
        {showLogin && (
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
              onClick={() => setShowLogin(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-gradient-to-b from-[#111827] to-[#0b1220] rounded-2xl shadow-2xl overflow-hidden z-10 border border-white/10"
            >
              <MeteorsEffect />

              <button
                onClick={() => setShowLogin(false)}
                className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
              >
                <X size={20} className="text-gray-300 group-hover:text-white" />
              </button>

              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-2/5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
                  <BoxesBackground />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      >
                        <BookOpen size={24} className="text-white" />
                      </motion.div>
                      <h1 className="text-2xl font-bold">PlacementTutor</h1>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-3xl font-bold mb-4">
                        Start Your Journey Today
                      </h2>
                      <p className="text-white/90 leading-relaxed">
                        Sign in to book your personalized mentorship session
                        with industry experts.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                      >
                        <div className="text-2xl font-bold">200+</div>
                        <div className="text-sm opacity-90">Students</div>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                      >
                        <div className="text-2xl font-bold">4.9★</div>
                        <div className="text-sm opacity-90">Rating</div>
                      </motion.div>
                    </div>

                    <div className="space-y-4">
                      {[
                        "Personalized 1:1 Sessions",
                        "Expert Career Guidance",
                        "Instant Booking Confirmation",
                      ].map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle
                              className="text-emerald-300"
                              size={20}
                            />
                          </motion.div>
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-3/5 p-8 lg:p-12">
                  <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white">
                        Welcome to PlacementTutor
                      </h2>
                      <p className="text-gray-300 mt-2">
                        Sign in to book your session
                      </p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Mail size={20} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          onKeyPress={handleKeyPress}
                          placeholder="student@example.com"
                          className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                      </div>
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-sm text-red-400 flex items-center gap-2"
                          >
                            <Shield size={14} />
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={sendOtp}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin" size={20} />
                          Sending OTP...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send OTP
                          <ArrowRight size={20} />
                        </span>
                      )}
                    </motion.button>

                    <div className="flex items-center my-6">
                      <div className="flex-1 h-px bg-gray-700"></div>
                      <span className="px-4 text-sm text-gray-400">
                        or continue with
                      </span>
                      <div className="flex-1 h-px bg-gray-700"></div>
                    </div>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGoogleLogin}
                      className="w-full bg-white/10 border border-white/20 hover:border-indigo-500 text-gray-300 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/20"
                    >
                      <motion.svg
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </motion.svg>
                      <span>Continue with Google</span>
                    </motion.button>

                    <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                      <p className="text-sm text-gray-400">
                        By continuing, you agree to our{" "}
                        <a
                          href="/TermsAndConditions"
                          className="text-indigo-400 hover:text-indigo-300 font-medium"
                        >
                          Terms
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacy-policy"
                          className="text-indigo-400 hover:text-indigo-300 font-medium"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

LoginModal.displayName = "LoginModal";

// Updated TestimonialCarouselComponent to use API data
const TestimonialCarouselComponent = memo(({ reviews, loading }) => {
  const [direction, setDirection] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setTestimonialIndex((prev) => {
        let nextIndex = prev + newDirection;
        if (nextIndex < 0) nextIndex = reviews.length - 1;
        if (nextIndex >= reviews.length) nextIndex = 0;
        return nextIndex;
      });
    },
    [reviews.length]
  );

  const handleDotClick = useCallback(
    (idx) => {
      setDirection(idx > testimonialIndex ? 1 : -1);
      setTestimonialIndex(idx);
    },
    [testimonialIndex]
  );

  // Format date for review
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative h-[400px] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full"
        />
      </div>
    );
  }

  // Empty state
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl">
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
            <Quote className="w-10 h-10 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">
            No Reviews Yet
          </h3>
          <p className="text-gray-300">
            Be the first to share your experience with our mentorship!
          </p>
        </div>
      </div>
    );
  }

  const currentReview = reviews[testimonialIndex];

  return (
    <div id="testimonial-section" className="relative">
      <div className="flex justify-center items-center gap-6 mb-8">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
        >
          <ChevronLeft className="text-white" />
        </motion.button>

        <div className="flex gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className="relative"
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === testimonialIndex
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                    : "bg-white/20"
                }`}
                animate={{
                  scale: idx === testimonialIndex ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/10 hover:border-indigo-500 transition-colors"
        >
          <ChevronRight className="text-white" />
        </motion.button>
      </div>

      <div className="relative h-[450px] overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={testimonialIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl h-full">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center"
                  >
                    <Quote className="w-6 h-6 text-indigo-400" />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex text-yellow-400 text-2xl mb-6"
                >
                  {Array(Math.floor(currentReview.rating || 5))
                    .fill()
                    .map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 + 0.4 }}
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        className="cursor-pointer"
                      >
                        ★
                      </motion.span>
                    ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-300 text-lg italic leading-relaxed mb-8 flex-grow"
                >
                  "{currentReview.comment || "Excellent mentorship experience!"}
                  "
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  {/* Student/Mentor Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-xl">
                        {currentReview.mentorName || "Anonymous Student"}
                      </div>
                      <div className="text-gray-300">
                        Mentored by experienced professional
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="w-12 h-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center border border-white/10"
                    >
                      <User className="w-5 h-5 text-indigo-400" />
                    </motion.div>
                  </div>

                  {/* Mentor Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    {currentReview.mentorCollege && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Building className="w-4 h-4" />
                        <span className="truncate">
                          {currentReview.mentorCollege}
                        </span>
                      </div>
                    )}

                    {currentReview.mentorCompany && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <BriefcaseIcon className="w-4 h-4" />
                        <span className="truncate">
                          {currentReview.mentorCompany}
                        </span>
                      </div>
                    )}

                    {currentReview.mentorJobTitle && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Award className="w-4 h-4" />
                        <span className="truncate">
                          {currentReview.mentorJobTitle}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Review Date */}
                  {currentReview.reviewedAt && (
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(currentReview.reviewedAt)}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center items-center gap-6 mt-8 text-gray-300"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
          <span>
            Review {testimonialIndex + 1} of {reviews.length}
          </span>
        </div>
        <div className="hidden md:block">•</div>
        <div>Slide to read more reviews</div>
      </motion.div>
    </div>
  );
});

TestimonialCarouselComponent.displayName = "TestimonialCarouselComponent";

// Main Component
const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Interactive states
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    rating: 0,
    price: 0,
  });

  const [openFAQ, setOpenFAQ] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const [avgreview, setavgreview] = useState(5);

  // Fetch approved reviews on component mount
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        setReviewsLoading(true);
        setReviewsError(null);

        const response = await apiConnector(
          "GET",
          PublicEndpoints.public_review
        );

        console.log("Approved reviews response:", response.data);

        if (response.data.success) {
          const firstFiveReviews = response.data.data.slice(0, 5);
          setApprovedReviews(firstFiveReviews);

          // Update animated stats with real average rating
          if (firstFiveReviews.length > 0) {
            const avgRating =
              firstFiveReviews.reduce(
                (sum, review) => sum + (review.rating || 0),
                0
              ) / firstFiveReviews.length;

            setavgreview(avgRating);
          }
        }
      } catch (error) {
        console.error("Error fetching approved reviews:", error);
        setReviewsError("Failed to load reviews. Please try again later.");
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchApprovedReviews();
  }, []);

  const faqData = [
    {
      question: "How do I book a mentorship session?",
      answer:
        "Simply click on the 'Book Your Session' button, select your preferred date and time slot, complete the payment as per your mentor's rate, and you're all set! You'll receive a confirmation email with all the details.",
    },
    {
      question: "What topics can I discuss during the session?",
      answer:
        "You can discuss anything related to career guidance, technical interview preparation, project guidance, DSA concepts, system design, resume review, placement strategies, mock interviews, and more. Our mentors are experienced in various domains of software engineering and product management.",
    },
    {
      question: "How will I receive the meeting link?",
      answer:
        "The meeting link will be sent to you via email just 10 minutes before your scheduled session starts. We recommend joining 5 minutes early to ensure everything is working properly.",
    },
    {
      question: "Can I reschedule or cancel my booking?",
      answer:
        "No, students cannot reschedule  or cancel booked sessions. Only mentors can initiate rescheduling requests, and it requires student approval. If a mentor needs to reschedule, you'll receive a request via email and dashboard notification. If you approve, the rescheduling will be confirmed and confirmation emails will be sent to both you and the mentor. If you decline, the original session timing remains unchanged.",
    },
    {
      question: "What if I face payment issues?",
      answer:
        "If you encounter any payment issues, please try again after 10 minutes. and if it will be solve by razorpay",
    },
    {
      question: "How long is each mentorship session?",
      answer:
        "The minimum session duration is 15 minutes. You can book longer sessions (30 min, 45 min, 60 min, etc.) based on mentor availability shown on the booking calendar. Maximum duration depends on the mentor's schedule - you can book multiple consecutive slots for extended discussions.",
    },
    {
      question: "Do I need any prior experience?",
      answer:
        "No prior experience is required! Our mentors tailor the session based on your current level, whether you're a beginner, intermediate, or advanced. We work with students from all backgrounds and experience levels.",
    },
  ];

  const achievements = [
    {
      icon: Target,
      number: "20+",
      label: "High-Paying Internships",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Briefcase,
      number: "Expedia",
      label: "SDE Role (Joining)",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: GraduationCap,
      number: "200+",
      label: "Students Mentored",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      number: "Full-Stack",
      label: "Expertise",
      color: "from-orange-500 to-red-500",
    },
  ];

  // Initialize animations only once
  useEffect(() => {
    if (hasAnimated) return;

    const animateNumbers = () => {
      const duration = 2000;
      const steps = 100;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedStats({
          students: Math.floor(200 * progress),
          rating:
            animatedStats.rating > 0 ? animatedStats.rating : 4.9 * progress,
          price: Math.floor(200 * progress),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedStats((prev) => ({
            students: 200,
            rating: prev.rating > 0 ? prev.rating : 4.9,
            price: 200,
          }));
        }
      }, interval);

      return () => clearInterval(timer);
    };

    animateNumbers();
    setHasAnimated(true);
  }, [hasAnimated, animatedStats.rating]);

  // Scroll lock when modal is open
  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showLogin]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && showLogin) {
        setShowLogin(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showLogin]);

  // Memoized components
  const BookNowSection = memo(() => {
    return (
      <section className="py-20 bg-gradient-to-b from-transparent to-[#0b1220] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
                Book 1:1 Session
              </span>
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Book a 1:1 Session with Abhishek Ranjan and His Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                      <span className="text-4xl">📞️</span>
                      200
                    </h3>
                    <p className="text-gray-400 mt-1">/ Hour session</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center"
                  >
                    <CreditCard size={28} className="text-indigo-400" />
                  </motion.div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Get personalized mentorship from experienced tech
                  professionals. Whether you're preparing for placements,
                  learning new technologies, or planning your career path, we're
                  here to guide you.
                </p>

                <div className="space-y-4">
                  {[
                    "Personalized guidance tailored to your goals",
                    "Career roadmap and planning",
                    "Technical interview preparation",
                    "Resume and portfolio review",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                      >
                        <CheckCircle size={14} className="text-green-400" />
                      </motion.div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogin(true)}
                  className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Calendar size={22} />
                  Book Session Now
                  <ArrowRight
                    size={22}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-8 border border-indigo-500/20">
                <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                    <Calendar size={22} className="text-white" />
                  </div>
                  How It Works
                </h3>

                <div className="space-y-8">
                  {[
                    {
                      step: 1,
                      title: "Choose Your Mentor",
                      description:
                        "Select from our team of experienced mentors based on your needs.",
                      icon: Users,
                    },
                    {
                      step: 2,
                      title: "Pick a Date",
                      description:
                        "Choose a convenient date from our available calendar.",
                      icon: Calendar,
                    },
                    {
                      step: 3,
                      title: "Select Time Slot",
                      description:
                        "Pick from available 1-hour slots between 3 PM - 12 AM.",
                      icon: ClockIcon,
                    },
                    {
                      step: 4,
                      title: "Complete Payment",
                      description:
                        "Pay securely via Razorpay and receive instant confirmation.",
                      icon: CreditCard,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex gap-6 group"
                    >
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300"
                        >
                          <span className="text-2xl font-bold text-white">
                            {item.step}
                          </span>
                        </motion.div>
                        {index < 3 && (
                          <div className="absolute left-1/2 top-full -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-indigo-500/30 to-purple-500/30"></div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <item.icon size={20} className="text-indigo-400" />
                          <h4 className="text-xl font-semibold text-white">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-10 pt-8 border-t border-white/10"
                >
                  <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-4">
                    <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                      <Shield size={24} className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        Secure & Hassle-Free
                      </h4>
                      <p className="text-sm text-gray-300">
                        Instant confirmation • 24/7 support • Easy rescheduling
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-indigo-500/40 flex items-center gap-4 mx-auto group relative overflow-hidden"
            >
              <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <MessageSquare size={26} />
              Start Your Journey Now - Book Your First Session
              <ArrowRight
                size={26}
                className="group-hover:translate-x-2 transition-transform"
              />
            </motion.button>
            <p className="text-gray-400 mt-4">
              Limited slots available. Book now to secure your session!
            </p>
          </motion.div>
        </div>
      </section>
    );
  });

  BookNowSection.displayName = "BookNowSection";

  const AboutAbhishekSection = memo(() => {
    return (
      <section
        id="about-section"
        className="py-20 bg-gradient-to-b from-transparent to-[#0b1220] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
                About the Founder
              </span>
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Abhishek Ranjan
              <span className="block text-2xl md:text-3xl text-gray-300 font-normal mt-2">
                Founder & Lead Mentor
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl"
              >
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Abhishek Ranjan is the founder of{" "}
                  <span className="text-indigo-300 font-semibold">
                    PlacementTutor
                  </span>
                  , bringing over two years of hands-on experience in the
                  technology industry. A passionate educator and mentor, he has
                  guided more than 200 college students through their academic
                  and early professional journeys.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center gap-3 text-indigo-300 mb-6"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <Target size={14} />
                  </div>
                  <span className="font-medium">Mission-Driven Mentorship</span>
                </motion.div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  His expertise spans full-stack development, system design, and
                  career mentorship. Abhishek focuses on placement preparation,
                  technical interview coaching, and helping students build
                  strong portfolios and resumes that stand out to leading tech
                  companies.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20"
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Sparkles className="text-indigo-400" />
                  Key Achievements
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className={`bg-gradient-to-br ${
                        achievement.color
                      }/10 to-transparent rounded-xl p-4 border border-white/5 hover:border-${
                        achievement.color.split("-")[1]
                      }-500/30 transition-all duration-300 cursor-pointer group`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2 bg-gradient-to-br ${achievement.color}/20 rounded-lg`}
                        >
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {achievement.number}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {achievement.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-3xl p-2 border border-white/10 overflow-hidden">
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                      >
                        <User size={96} className="text-white opacity-80" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            Abhishek Ranjan
                          </div>
                          <div className="text-indigo-300">
                            Founder & Tech Mentor
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
                        >
                          <BookOpen size={20} className="text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl p-8 border border-white/10 shadow-xl"
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Briefcase className="text-indigo-400" />
                  Career Journey
                </h3>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="flex items-start gap-4 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    >
                      <CheckCircle size={18} className="text-green-400" />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        Cracked 20+ Off-Campus Internships
                      </div>
                      <p className="text-gray-300 mt-1">
                        Successfully secured high-paying internships through
                        strategic preparation and networking.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="flex items-start gap-4 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    >
                      <Award size={18} className="text-blue-400" />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        Expedia SDE (Joining)
                      </div>
                      <p className="text-gray-300 mt-1">
                        Secured Software Development Engineer role at Expedia
                        through exceptional technical skills.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    >
                      <GraduationCap size={18} className="text-purple-400" />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        Mission-Driven Education
                      </div>
                      <p className="text-gray-300 mt-1">
                        Committed to making quality tech education accessible
                        and helping students become industry-ready.
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="mt-8 pt-6 border-t border-white/10"
                >
                  <p className="text-gray-300 italic text-center">
                    "Driven by a mission to make quality tech education
                    accessible and goal-oriented."
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center gap-3 mx-auto group relative overflow-hidden"
            >
              <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <MessageSquare size={22} />
              Book Session with Abhishek
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  });

  AboutAbhishekSection.displayName = "AboutAbhishekSection";

  const BoxesBackgroundStatic = memo(() => (
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
  ));

  BoxesBackgroundStatic.displayName = "BoxesBackgroundStatic";

  const MeteorsEffectStatic = memo(() => {
    const [meteors, setMeteors] = useState([]);

    useEffect(() => {
      const newMeteors = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
        size: 1 + Math.random() * 2,
      }));
      setMeteors(newMeteors);
    }, []);

    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none`}>
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
  });

  MeteorsEffectStatic.displayName = "MeteorsEffectStatic";

  const FAQAccordionItem = memo(({ faq, index, isOpen, onClick }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300"
      >
        <motion.button
          onClick={() => onClick(index)}
          className="w-full p-6 text-left flex items-center justify-between group hover:bg-white/5 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <span className="text-white font-semibold">{index + 1}</span>
            </motion.div>
            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
              {faq.question}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 group-hover:text-white"
          >
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="pl-12 border-l-2 border-indigo-500/30">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  {index === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4 flex items-center gap-2 text-sm text-indigo-400"
                    >
                      <CheckCircle size={14} />
                      <span>Instant confirmation • No waiting time</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  });

  FAQAccordionItem.displayName = "FAQAccordionItem";

  const InteractiveStatCardComponent = memo(
    ({ number, label, icon: Icon, delay = 0 }) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="relative bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 cursor-pointer group"
        onMouseEnter={() => setHoveredCard(label)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
            <Icon className="w-6 h-6 text-indigo-400" />
          </div>
          <motion.div
            animate={{
              rotate: hoveredCard === label ? 360 : 0,
              scale: hoveredCard === label ? 1.2 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </div>
        <div className="relative z-10 text-4xl font-bold text-white mb-2">
          {number}
          {label === "Rating" && "★"}
          {label === "Price" && <span className="text-lg">₹</span>}
        </div>
        <div className="relative z-10 text-gray-300">{label}</div>
      </motion.div>
    )
  );

  InteractiveStatCardComponent.displayName = "InteractiveStatCardComponent";

  const FloatingElementsStatic = memo(() => (
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
  ));

  FloatingElementsStatic.displayName = "FloatingElementsStatic";

  const handleFAQClick = useCallback(
    (index) => {
      setOpenFAQ(openFAQ === index ? null : index);
    },
    [openFAQ]
  );

  const renderMainPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#0b1220] text-white overflow-hidden relative">
      <BoxesBackgroundStatic />
      <MeteorsEffectStatic />
      <FloatingElementsStatic />

      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#111827]/90 to-transparent backdrop-blur-md border-b border-white/10 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
            >
              <BookOpen className="text-white" size={22} />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              PlacementTutor
            </span>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .getElementById("about-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              Mentors
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .getElementById("testimonial-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              Testimonials
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .getElementById("faq-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              FAQ
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
            >
              Book Session
            </motion.button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Get the Correct Direction
              <br />
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                and Path from Our Guidance
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
            >
              We're here to support you and make you better. Book personalized
              1:1 mentorship sessions with experienced tech professionals and
              accelerate your career growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <motion.span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Calendar size={22} />
                Book Your Session
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 border border-white/20 hover:border-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 hover:bg-white/20"
              >
                <ExternalLink size={22} />
                Learn More
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            <InteractiveStatCardComponent
              number={animatedStats.students}
              label="Students Mentored"
              icon={Users}
              delay={0.1}
            />
            <InteractiveStatCardComponent
              number={avgreview}
              label="Rating"
              icon={Star}
              delay={0.2}
            />
            <InteractiveStatCardComponent
              number={animatedStats.price}
              label="Per Session"
              icon={CreditCard}
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      <AboutAbhishekSection />
      <BookNowSection />

      <section className="py-20 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-white mb-4"
            >
              What Our Students Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Real reviews from students who transformed their careers with
              PlacementTutor.
            </motion.p>

            {reviewsLoading && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-3 text-indigo-300">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full"
                  />
                  <span>Loading reviews...</span>
                </div>
              </div>
            )}

            {reviewsError && (
              <div className="mt-8 text-amber-300">{reviewsError}</div>
            )}
          </div>

          <TestimonialCarouselComponent
            reviews={approvedReviews}
            loading={reviewsLoading}
          />
        </div>
      </section>

      <section id="faq-section" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 mb-10"
            >
              Everything you need to know about our mentorship sessions
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-6 py-3 mb-8"
            >
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-300">
                {openFAQ === null
                  ? "Click on any question to expand"
                  : "Click to collapse"}
              </span>
            </motion.div>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQAccordionItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFAQ === index}
                onClick={handleFAQClick}
              />
            ))}
          </div>
        </div>
      </section>

      
      <footer className="bg-gradient-to-b from-[#0b1220] to-[#000000] text-white py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start"
          >
            {/* Left Section - Logo and Tagline */}
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center"
                >
                  <BookOpen className="text-white" size={22} />
                </motion.div>
                <span className="text-xl font-bold">PlacementTutor</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Get the correct direction and path from our guidance. We're here
                to support you and make you better in your tech career journey.
              </p>
            </div>

            {/* Center Section - Quick Links */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Contact Us", path: "/ContactUs" },
                  { name: "Privacy Policy", path: "/privacy-policy" },
                  {
                    name: "Refund & Cancellation",
                    path: "/RefundAndCancellation",
                  },
                  { name: "Terms & Conditions", path: "/TermsAndConditions" },
                ].map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <button
                      onClick={() => navigate(item.path)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right Section - Contact Info and Get Started Button */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3 text-gray-400">
                <p>2022ucp1326@mnit.ac.in</p>
                <p>+91 6207065181</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLogin(true)}
                className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 w-full md:w-auto"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>

          {/* Footer Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} PlacementTutor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className={showLogin ? "overflow-hidden" : ""}>
      {renderMainPage()}
      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        email={email}
        setEmail={setEmail}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        navigate={navigate}
      />
    </div>
  );
};

export default Login;
