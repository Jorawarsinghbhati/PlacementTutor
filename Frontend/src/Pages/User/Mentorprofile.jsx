import React, { useEffect, useState } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { mentorEndpoints } from "../../Service/apis";
import BookingModal from "./Components/BookingModal";
import { 
  Search, 
  Filter,  
  Briefcase,  
  Award,
  TrendingUp,
  GraduationCap,
  Users,
  Clock,
  Sparkles
} from "lucide-react";

const Mentorprofile = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("all");
  const [expertiseList, setExpertiseList] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", mentorEndpoints.PUBLIC_MENTORS);
        console.log("le bhai",res);
        const mentorsData = res.data.mentors || [];
        setMentors(mentorsData);
        setFilteredMentors(mentorsData);
        
        // Extract unique expertise for filtering
        const allExpertise = mentorsData.flatMap(mentor => mentor.expertise || []);
        const uniqueExpertise = ["all", ...new Set(allExpertise)];
        setExpertiseList(uniqueExpertise);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  useEffect(() => {
    let filtered = mentors;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(mentor =>
        mentor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.currentCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.college?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by expertise
    if (selectedExpertise !== "all") {
      filtered = filtered.filter(mentor =>
        mentor.expertise?.includes(selectedExpertise)
      );
    }
    
    setFilteredMentors(filtered);
  }, [searchTerm, selectedExpertise, mentors]);

  const getExpertiseColor = (expertise) => {
    const colors = {
      "Data Structures": "from-blue-500 to-cyan-500",
      "Algorithms": "from-purple-500 to-pink-500",
      "React": "from-cyan-500 to-blue-500",
      "Node.js": "from-green-500 to-emerald-500",
      "Python": "from-yellow-500 to-orange-500",
      "Machine Learning": "from-red-500 to-pink-500",
      "System Design": "from-indigo-500 to-purple-500",
      "AWS": "from-orange-500 to-red-500",
      "DevOps": "from-gray-500 to-blue-500",
      "UI/UX": "from-pink-500 to-rose-500"
    };
    return colors[expertise] || "from-gray-500 to-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0a0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0a0f1a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-6 py-3 rounded-full mb-4">
            <Sparkles size={20} className="text-indigo-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Find Your Perfect Mentor
            </h1>
            <Sparkles size={20} className="text-purple-400" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with industry experts for personalized guidance and career growth
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Users size={20} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Mentors</p>
                <p className="text-2xl font-bold">{mentors.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Award size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Expertise Areas</p>
                <p className="text-2xl font-bold">{expertiseList.length - 1}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Briefcase size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Top Companies</p>
                <p className="text-2xl font-bold">
                  {new Set(mentors.map(m => m.currentCompany)).size}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Experience</p>
                <p className="text-2xl font-bold">
                  {Math.max(...mentors.map(m => m.yearsOfExperience || 0))}+ years
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
         <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search mentors by name, company, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                {expertiseList.map((expertise) => (
                  <option key={expertise} value={expertise}>
                    {expertise === "all" ? "All Expertise" : expertise}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Active filters display */}
          {(searchTerm || selectedExpertise !== "all") && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-400">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedExpertise !== "all" && (
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Expertise: {selectedExpertise}
                </span>
              )}
            </div>
          )}
        </div> 

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredMentors.length}</span> of {mentors.length} mentors
          </p>
          <p className="text-sm text-gray-400">
            Click on any mentor to book a session
          </p>
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-500/20 to-gray-700/20 flex items-center justify-center">
              <Search size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Try adjusting your search filters to find the perfect mentor for your needs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard 
                key={mentor._id} 
                mentor={mentor} 
                onSelect={setSelectedMentor}
                getExpertiseColor={getExpertiseColor}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <BookingModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
        />
      )}
    </div>
  );
};

const MentorCard = ({ mentor, onSelect, getExpertiseColor }) => {
  const [hover, setHover] = useState(false);

  return (
    <div 
      className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      onClick={() => onSelect(mentor)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getExpertiseColor(mentor.expertise?.[0] || "default")} flex items-center justify-center`}>
            <span className="text-xl font-bold">
              {mentor.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold group-hover:text-indigo-300 transition-colors">
              {mentor.name}
            </h3>
            <p className="text-sm text-gray-400">{mentor.jobTitle}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            ₹{mentor.sessionPrice}
          </p>
          <p className="text-xs text-gray-400">per hour</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-gray-400" />
          <span className="text-sm">{mentor.currentCompany}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-gray-400" />
          <span className="text-sm">{mentor.college}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span className="text-sm">{mentor.yearsOfExperience}+ years experience</span>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">Expertise</p>
        <div className="flex flex-wrap gap-2">
          {mentor.expertise?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getExpertiseColor(skill)}`}
            >
              {skill}
            </span>
          ))}
          {mentor.expertise?.length > 3 && (
            <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-gray-400">
              +{mentor.expertise.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <button className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
        hover 
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25" 
          : "bg-white/10 hover:bg-white/20"
      }`}>
        View Availability
      </button>
    </div>
  );
};

export default Mentorprofile;