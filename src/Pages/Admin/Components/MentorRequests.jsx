import React, { useState, useEffect } from "react";
import { apiConnector } from "../../../Service/apiConnector";
import { adminEndpoints } from "../../../Service/apis";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const MentorRequests = () => {
  const [mentorRequests, setMentorRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    avgExperience: 0,
    totalPrice: 0
  });
  const [isMobile, setIsMobile] = useState(false);

  // SVG Icons as React components
  const Icon = ({ name, className = "w-5 h-5" }) => {
    const icons = {
      team: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 01-4 4m4-4a4 4 0 00-4-4m4 4h2m-6-4a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      idcard: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      bank: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      check: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      close: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      sync: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      file: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      dollar: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      mail: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      user: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      clock: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      certificate: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      appstore: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      audit: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      read: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      build: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      rocket: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      star: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      experiment: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      more: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      ),
      filter: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
      eye: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      phone: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      chevronDown: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      ),
    };
    return icons[name] || null;
  };

  // Show notification
  const showNotification = (type, title, message) => {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 z-50 p-4 rounded-xl shadow-2xl border-l-4 transform transition-all duration-300 translate-x-0 ${
      type === 'success' 
        ? 'bg-emerald-900/20 border-emerald-500' 
        : type === 'error'
        ? 'bg-rose-900/20 border-rose-500'
        : 'bg-blue-900/20 border-blue-500'
    } backdrop-blur-lg`;
    
    notification.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 rounded-full ${
            type === 'success' ? 'bg-emerald-500/20' : 
            type === 'error' ? 'bg-rose-500/20' : 'bg-blue-500/20'
          } flex items-center justify-center">
            ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-white">${title}</h3>
          <p class="text-sm text-gray-300 mt-1">${message}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchMentorRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [mentorRequests, selectedExpertise, selectedStatus]);

  useEffect(() => {
    calculateStats();
  }, [mentorRequests]);

  const fetchMentorRequests = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", adminEndpoints.PENDING_MENTORS);
      let requests = [];
      
      if (Array.isArray(response.data)) {
        requests = response.data;
      } else if (response.data?.data) {
        requests = response.data.data;
      } else if (response.data?.mentors) {
        requests = response.data.mentors;
      } else if (response.data) {
        requests = [response.data];
      }
      
      setMentorRequests(requests);
      showNotification('success', 'Data Loaded', `✅ Loaded ${requests.length} mentor applications`);
    } catch (error) {
      console.error("Fetch mentor requests error:", error);
      showNotification('error', 'Failed to Load', '❌ Failed to load mentor requests');
      setMentorRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = [...mentorRequests];
    
    if (selectedExpertise) {
      filtered = filtered.filter(mentor => 
        mentor.expertise?.some(exp => 
          exp.toLowerCase().includes(selectedExpertise.toLowerCase())
        )
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(mentor => mentor.status === selectedStatus);
    }
    
    setFilteredRequests(filtered);
  };

  const calculateStats = () => {
    if (mentorRequests.length === 0) {
      setStats({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        avgExperience: 0,
        totalPrice: 0
      });
      return;
    }
    
    const total = mentorRequests.length;
    const pending = mentorRequests.filter(m => m.status === "PENDING").length;
    const approved = mentorRequests.filter(m => m.status === "APPROVED").length;
    const rejected = mentorRequests.filter(m => m.status === "REJECTED").length;
    const avgExperience = mentorRequests.reduce((sum, m) => 
      sum + (m.yearsOfExperience || 0), 0) / total;
    const totalPrice = mentorRequests.reduce((sum, m) => 
      sum + (m.sessionPrice || 0), 0);
    
    setStats({
      total,
      pending,
      approved,
      rejected,
      avgExperience: parseFloat(avgExperience.toFixed(1)),
      totalPrice
    });
  };

  const handleMentorAction = async (mentorId, action) => {
    try {
      const endpoint = action === "approve" 
        ? adminEndpoints.APPROVE_MENTOR(mentorId)
        : adminEndpoints.REJECT_MENTOR(mentorId);
      
      const response = await apiConnector("POST", endpoint);
      
      if (response.data.success) {
        // Update local state immediately for better UX
        setMentorRequests(prev => 
          prev.map(mentor => 
            mentor._id === mentorId 
              ? { ...mentor, status: action.toUpperCase() }
              : mentor
          )
        );
        showNotification('success', 'Action Successful', `✅ Mentor ${action}d successfully!`);
      } else {
        showNotification('error', 'Action Failed', `❌ Failed to ${action} mentor: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Mentor action error:", error);
      showNotification('error', 'Action Failed', `❌ Failed to ${action} mentor`);
    }
  };

  const handleViewMentor = (mentor) => {
    setSelectedMentor(mentor);
    setViewDrawerVisible(true);
  };

  const renderMentorDetails = (mentor) => (
    <div className="space-y-6 pt-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20 p-3 text-center">
          <div className="text-xl font-bold text-blue-400">
            {mentor.yearsOfExperience || 0}
          </div>
          <div className="text-gray-400 text-xs">Years Exp</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 p-3 text-center">
          <div className="text-xl font-bold text-green-400">
            ₹{mentor.sessionPrice || 0}
          </div>
          <div className="text-gray-400 text-xs">Price</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 p-3 text-center">
          <div className="text-xl font-bold text-purple-400">
            {mentor.expertise?.length || 0}
          </div>
          <div className="text-gray-400 text-xs">Expertise</div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-3 text-gray-300 text-sm flex items-center">
              <Icon name="bank" className="w-4 h-4 mr-2" />
              Professional Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Company:</span>
                <span className="font-medium text-right">{mentor.currentCompany || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Job Title:</span>
                <span className="font-medium text-right">{mentor.jobTitle || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">College:</span>
                <span className="font-medium text-right">{mentor.college || "N/A"}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-gray-300 text-sm flex items-center">
              <Icon name="clock" className="w-4 h-4 mr-2" />
              Application Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Applied:</span>
                <span className="font-medium">
                  {dayjs(mentor.createdAt).format('MMM D, YYYY')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Updated:</span>
                <span className="font-medium">
                  {dayjs(mentor.updatedAt).format('MMM D, YYYY')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  mentor.status === "PENDING" 
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : mentor.status === "APPROVED"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>
                  {mentor.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-300 text-sm flex items-center">
            <Icon name="certificate" className="w-4 h-4 mr-2" />
            Expertise Areas
          </h4>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise?.map((exp, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs rounded-full text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][idx % 5]}, ${['#60a5fa', '#c084fc', '#34d399', '#fbbf24', '#f87171'][idx % 5]})`
                }}
              >
                {exp}
              </span>
            ))}
          </div>
        </div>

        {/* Offer Letter */}
        {mentor.offerLetterUrl && (
          <div>
            <h4 className="font-semibold mb-3 text-gray-300 text-sm flex items-center">
              <Icon name="file" className="w-4 h-4 mr-2" />
              Offer Letter
            </h4>
            <button 
              onClick={() => window.open(mentor.offerLetterUrl, '_blank')}
              className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <Icon name="file" className="w-4 h-4" />
              <span>Download Offer Letter</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const handleDownloadOfferLetter = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      showNotification('warning', 'No Offer Letter', 'No offer letter available');
    }
  };

  const getExpertiseColor = (expertise) => {
    const colorMap = {
      'Machine Learning': 'from-purple-500 to-pink-500',
      'System Design': 'from-blue-500 to-cyan-500',
      'USA': 'from-green-500 to-emerald-500',
      'DSA': 'from-orange-500 to-red-500',
      'Web Development': 'from-indigo-500 to-purple-500',
      'Mobile Development': 'from-teal-500 to-green-500',
      'Interview Prep': 'from-yellow-500 to-amber-500',
      'Resume Review': 'from-gray-500 to-slate-500'
    };
    
    for (const [key, value] of Object.entries(colorMap)) {
      if (expertise?.includes(key)) {
        return value;
      }
    }
    
    return 'from-indigo-500 to-purple-500';
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      APPROVED: 'text-green-400 bg-green-500/10 border-green-500/30',
      REJECTED: 'text-red-400 bg-red-500/10 border-red-500/30'
    };
    return colors[status] || 'text-gray-400 bg-gray-500/10 border-gray-500/30';
  };

  const getStatusIcon = (status) => {
    const icons = {
      PENDING: '⏳',
      APPROVED: '✓',
      REJECTED: '✗'
    };
    return icons[status] || '⏳';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-4 sm:p-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-white/10 p-4 sm:p-6 shadow-xl transition-all duration-500">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Mentor Applications
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
              Review and manage mentor applications
            </p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 w-full lg:w-auto">
            {/* Mobile Filter Button */}
            {isMobile && (
              <button 
                onClick={() => {/* Open filter modal */}}
                className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all duration-300"
              >
                <Icon name="filter" className="w-4 h-4 text-gray-300" />
              </button>
            )}
            
            {/* Desktop Filter */}
            {!isMobile && (
              <div className="flex gap-2">
                <select
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="">Filter expertise</option>
                  <option value="Machine Learning">🤖 ML</option>
                  <option value="System Design">🏗️ System Design</option>
                  <option value="USA">🇺🇸 USA</option>
                  <option value="DSA">⚡ DSA</option>
                  <option value="Web Development">🌐 Web</option>
                  <option value="Mobile Development">📱 Mobile</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="all">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            )}
            
            <button 
              onClick={fetchMentorRequests}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg flex items-center space-x-2 transition-all duration-300 disabled:opacity-50"
            >
              <Icon name="sync" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{isMobile ? "" : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Applications */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg sm:rounded-xl border border-blue-500/20 p-3 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="team" className="w-4 h-4 text-blue-400" />
                <span className="text-xs sm:text-sm text-gray-400">Total</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-blue-400">{stats.total}</div>
            </div>

            {/* Pending Applications */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-lg sm:rounded-xl border border-yellow-500/20 p-3 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="clock" className="w-4 h-4 text-yellow-400" />
                <span className="text-xs sm:text-sm text-gray-400">Pending</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-yellow-400">{stats.pending}</div>
            </div>

            {/* Average Experience */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg sm:rounded-xl border border-green-500/20 p-3 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="idcard" className="w-4 h-4 text-green-400" />
                <span className="text-xs sm:text-sm text-gray-400">Avg. Exp</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-green-400">
                {stats.avgExperience}yrs
              </div>
            </div>

            {/* Average Price */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg sm:rounded-xl border border-purple-500/20 p-3 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="dollar" className="w-4 h-4 text-purple-400" />
                <span className="text-xs sm:text-sm text-gray-400">Avg. Price</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-purple-400">
                ₹{Math.round(stats.totalPrice / Math.max(stats.total, 1))}
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="mt-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg sm:rounded-xl border border-white/10 p-3 transition-all duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm text-gray-400">Status Distribution</span>
              <span className="text-xs text-gray-500">{stats.total} total</span>
            </div>
            <div className="w-full bg-gray-700/30 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.round((stats.pending / Math.max(stats.total, 1)) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                <span className="text-yellow-400">P: {stats.pending}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span className="text-green-400">A: {stats.approved}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <span className="text-red-400">R: {stats.rejected}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Cards Grid - Mobile Optimized */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl border border-white/10 p-4 animate-pulse">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-20 h-4 bg-gray-700 rounded"></div>
                  <div className="w-16 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
                    <div className="w-1/2 h-3 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="w-3/4 h-3 bg-gray-700 rounded mb-2"></div>
                <div className="w-1/2 h-3 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredRequests.map((mentor) => (
              <div 
                key={mentor._id || mentor.id} 
                className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/20"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mentor.status)}`}>
                    {getStatusIcon(mentor.status)} {mentor.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {dayjs(mentor.createdAt).fromNow()}
                  </span>
                </div>

                {/* Profile Header */}
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="relative">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl border-2 border-indigo-500/30 ${
                      mentor.status === "PENDING" ? 'bg-yellow-500' : 
                      mentor.status === "APPROVED" ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {mentor.name?.[0]?.toUpperCase() || "M"}
                    </div>
                    {!isMobile && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <Icon name="star" className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-lg truncate text-white">
                      {mentor.name || "Unnamed Mentor"}
                    </h3>
                    <div className="flex items-center text-xs sm:text-sm text-gray-400 truncate mt-1">
                      <Icon name="mail" className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{mentor.email || "No email"}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-400 mt-1 truncate">
                      <Icon name="bank" className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{mentor.currentCompany || "Not specified"}</span>
                    </div>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="mb-3 sm:mb-4">
                  <div className="text-xs text-gray-500 mb-1 sm:mb-2 flex items-center">
                    <Icon name="certificate" className="w-3 h-3 mr-1" />
                    Expertise
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise?.slice(0, isMobile ? 2 : 3).map((exp, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${getExpertiseColor(exp)} text-white`}
                      >
                        {isMobile && exp.length > 8 ? `${exp.substring(0, 8)}...` : exp}
                      </span>
                    ))}
                    {mentor.expertise?.length > (isMobile ? 2 : 3) && (
                      <span className="px-2 py-1 text-xs border border-white/20 bg-transparent text-gray-400 rounded-full">
                        +{mentor.expertise.length - (isMobile ? 2 : 3)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Icon name="read" className="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500">College</div>
                      <div className="text-xs sm:text-sm truncate text-white">{mentor.college || "N/A"}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Icon name="dollar" className="text-green-400 w-3 h-3 sm:w-4 sm:h-4" />
                    <div>
                      <div className="text-xs text-gray-500">Price</div>
                      <div className="text-xs sm:text-sm font-semibold text-green-400">₹{mentor.sessionPrice || 0}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Icon name="idcard" className="text-blue-400 w-3 h-3 sm:w-4 sm:h-4" />
                    <div>
                      <div className="text-xs text-gray-500">Exp</div>
                      <div className="text-xs sm:text-sm text-white">{mentor.yearsOfExperience || 0}y</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Icon name="audit" className="text-purple-400 w-3 h-3 sm:w-4 sm:h-4" />
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500">Job</div>
                      <div className="text-xs sm:text-sm truncate text-white">{mentor.jobTitle || "N/A"}</div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 my-3 sm:my-4"></div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewMentor(mentor)}
                    className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs sm:text-sm flex items-center justify-center space-x-1 transition-all duration-300"
                  >
                    <Icon name="eye" className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>View</span>
                  </button>
                  
                  <button
                    onClick={() => handleMentorAction(mentor._id || mentor.id, "approve")}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg text-xs sm:text-sm flex items-center justify-center space-x-1 transition-all duration-300"
                  >
                    <Icon name="check" className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Approve</span>
                  </button>
                  
                  <button
                    onClick={() => handleMentorAction(mentor._id || mentor.id, "reject")}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg text-xs sm:text-sm flex items-center justify-center space-x-1 transition-all duration-300"
                  >
                    <Icon name="close" className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 sm:py-16 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="team" className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
            </div>
            <p className="text-gray-400 text-sm sm:text-lg mb-2">
              No mentor applications found
              {selectedExpertise && ` for "${selectedExpertise}"`}
            </p>
            <button 
              onClick={() => {
                setSelectedExpertise(null);
                setSelectedStatus("all");
                fetchMentorRequests();
              }}
              className="px-4 py-2 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <Icon name="sync" className="w-4 h-4" />
              <span>{selectedExpertise ? "Clear Filter" : "Refresh"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Mentor Details Modal */}
      {viewDrawerVisible && selectedMentor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setViewDrawerVisible(false)}
            ></div>
            
            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10 rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                      selectedMentor.status === "PENDING" ? 'bg-yellow-500' : 
                      selectedMentor.status === "APPROVED" ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {selectedMentor.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{selectedMentor.name}</h3>
                      <p className="text-sm text-gray-400">{selectedMentor.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewDrawerVisible(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Icon name="close" className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              {/* Body */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {renderMentorDetails(selectedMentor)}
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setViewDrawerVisible(false)}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all duration-300"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleMentorAction(selectedMentor._id || selectedMentor.id, "reject");
                      setViewDrawerVisible(false);
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Icon name="close" className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => {
                      handleMentorAction(selectedMentor._id || selectedMentor.id, "approve");
                      setViewDrawerVisible(false);
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Icon name="check" className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorRequests;