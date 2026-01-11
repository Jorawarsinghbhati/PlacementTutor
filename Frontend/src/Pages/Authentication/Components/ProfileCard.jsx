import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Sparkles,
  Target,
  Rocket,
  CheckCircle,
  ChevronRight
} from "lucide-react";

const ProfileCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const stats = [
    { icon: <User size={20} />, label: "Students Mentored", value: "200+" },
    { icon: <Briefcase size={20} />, label: "Internships", value: "20+" },
    { icon: <Award size={20} />, label: "Rating", value: "4.9/5" },
    { icon: <GraduationCap size={20} />, label: "Companies", value: "Expedia" }
  ];

  const achievements = [
    "Cracked 20+ off-campus internships",
    "Expedia SDE (Joining)",
    "200+ students mentored",
    "Full-stack development expert",
    "System design specialist",
    "Placement preparation coach"
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={containerVariants}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5" />
        
        {/* Header Section */}
        <div className="relative p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Profile Image / Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-2xl bg-[#0f172a] flex items-center justify-center">
                  <User size={60} className="text-indigo-400" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Sparkles size={10} />
                Founder
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-2"
                  >
                    <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Abhishek Ranjan
                    </h1>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 mb-6"
                  >
                    <div className="px-4 py-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/30">
                      <span className="text-indigo-300 font-medium">Founder & Lead Mentor</span>
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                      <span className="text-green-300 font-medium">Collegemate</span>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <button className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95">
                    <span className="flex items-center gap-2">
                      <Mail size={18} />
                      Contact
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  
                  <button className="group relative overflow-hidden px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20">
                    <span className="flex items-center gap-2">
                      View Profile
                      <ExternalLink size={18} />
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-white/5 to-transparent p-4 rounded-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                        <div className="text-indigo-400">
                          {stat.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mt-8"
          >
            <button className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-400/20 border border-blue-500/30 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
              <Linkedin size={20} className="text-blue-400 group-hover:text-blue-300" />
            </button>
            <button className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800/20 to-gray-600/20 border border-gray-500/30 flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
              <Github size={20} className="text-gray-400 group-hover:text-gray-300" />
            </button>
            <div className="h-4 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
            <span className="text-gray-400 text-sm">Follow for updates</span>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="px-8 md:px-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>

        {/* Expandable Content Section */}
        <div className="p-8 md:p-10">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300 mb-6 border border-white/10 hover:border-indigo-500/30 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Target size={20} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">View Full Profile & Achievements</div>
                <div className="text-sm text-gray-400">Click to {isExpanded ? "collapse" : "expand"}</div>
              </div>
            </div>
            <ChevronRight 
              size={20} 
              className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
            />
          </motion.button>

          <motion.div
            variants={contentVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            className="overflow-hidden"
          >
            {/* Bio Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                <h2 className="text-2xl font-bold text-white">About Abhishek</h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Abhishek Ranjan is the founder of Collegemate, bringing over two years of hands-on 
                  experience in the technology industry. A passionate educator and mentor, he has guided 
                  more than 200 college students through their academic and early professional journeys.
                </p>
                
                <p>
                  His expertise spans full-stack development, system design, and career mentorship. 
                  Abhishek focuses on placement preparation, technical interview coaching, and helping 
                  students build strong portfolios and resumes that stand out to leading tech companies.
                </p>
                
                <p>
                  He has successfully cracked over 20 off-campus, high-paying internship opportunities 
                  and has interned with leading multinational companies, including Expedia. He is set to 
                  join Expedia as a Software Development Engineer (SDE).
                </p>
                
                <p>
                  Driven by a mission to make quality tech education accessible and goal-oriented, 
                  Abhishek and the Collegemate team are committed to providing clear learning paths 
                  and consistent motivation, enabling aspiring developers to become industry-ready professionals.
                </p>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                <h2 className="text-2xl font-bold text-white">Key Achievements</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle size={18} className="text-green-400" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-2xl" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Rocket size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Mission Statement</h3>
                  <p className="text-gray-300">
                    "To make quality tech education accessible and goal-oriented, providing clear learning 
                    paths and consistent motivation to transform aspiring developers into industry-ready professionals."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Skills / Expertise */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full" />
                <h2 className="text-2xl font-bold text-white">Areas of Expertise</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {[
                  "Full-Stack Development",
                  "System Design",
                  "DSA & Algorithms",
                  "Career Mentorship",
                  "Interview Preparation",
                  "Portfolio Building",
                  "Resume Optimization",
                  "Placement Guidance"
                ].map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium hover:from-yellow-500/20 hover:to-amber-500/20 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-8 md:p-10 border-t border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <GraduationCap size={16} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Currently mentoring at</div>
                <div className="font-bold text-white">Collegemate</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Next role</div>
                <div className="font-bold text-green-400">Expedia • SDE</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                <Briefcase size={18} className="text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;