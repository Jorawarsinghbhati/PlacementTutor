import React, { useState, useEffect } from "react";
import { apiConnector } from "../../../Service/apiConnector";
import { adminEndpoints } from "../../../Service/apis";
import dayjs from "dayjs";

const AdminMentorSection = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt_desc");
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    avgExperience: 0,
    avgPrice: 0,
  });

  // SVG Icons as React components
  const Icon = ({ name, className = "w-5 h-5" }) => {
    const icons = {
      team: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 01-4 4m4-4a4 4 0 00-4-4m4 4h2m-6-4a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      userDelete: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
        </svg>
      ),
      dollar: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      star: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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
      clock: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      eye: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      mail: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
      certificate: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      filter: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
      search: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      exclamation: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      arrowUp: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      ),
      arrowDown: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      ),
      sync: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      more: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
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

  useEffect(() => {
    fetchAllMentors();
  }, []);

  useEffect(() => {
    filterMentors();
    calculateStats();
  }, [mentors, searchText, statusFilter, sortBy]);

  const fetchAllMentors = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", adminEndpoints.GET_ALL_MENTOR);
      console.log(response);
      if (response.data.success) {
        const mentorsData = response.data.data || [];
        setMentors(mentorsData);
        setFilteredMentors(mentorsData);
        showNotification('success', 'Data Loaded', `✅ Loaded ${mentorsData.length} mentors`);
      } else {
        showNotification('error', 'Failed to Load', 'Failed to fetch mentors');
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
      showNotification('error', 'Error Loading', 'Error loading mentors');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (mentors.length === 0) {
      setStats({
        total: 0,
        approved: 0,
        pending: 0,
        rejected: 0,
        avgExperience: 0,
        avgPrice: 0,
      });
      return;
    }

    const total = mentors.length;
    const approved = mentors.filter(m => m.status === "APPROVED").length;
    const pending = mentors.filter(m => m.status === "PENDING").length;
    const rejected = mentors.filter(m => m.status === "REJECTED").length;
    const avgExperience = mentors.reduce((sum, m) => sum + (m.yearsOfExperience || 0), 0) / total;
    const avgPrice = mentors.reduce((sum, m) => sum + (m.sessionPrice || 0), 0) / total;

    setStats({
      total,
      approved,
      pending,
      rejected,
      avgExperience: parseFloat(avgExperience.toFixed(1)),
      avgPrice: Math.round(avgPrice),
    });
  };

  const filterMentors = () => {
    let filtered = [...mentors];

    // Search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(mentor =>
        mentor.name?.toLowerCase().includes(searchLower) ||
        mentor.email?.toLowerCase().includes(searchLower) ||
        mentor.college?.toLowerCase().includes(searchLower) ||
        mentor.currentCompany?.toLowerCase().includes(searchLower) ||
        mentor.expertise?.some(exp => exp.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(mentor => mentor.status === statusFilter);
    }

    // Sort mentors
    filtered.sort((a, b) => {
      const [field, order] = sortBy.split('_');
      const aValue = a[field] || 0;
      const bValue = b[field] || 0;
      
      if (order === 'desc') {
        return bValue - aValue;
      }
      return aValue - bValue;
    });

    setFilteredMentors(filtered);
  };

  const handleRejectMentor = async () => {
    if (!selectedMentor) return;

    setRejectLoading(true);
    try {
      const response = await apiConnector(
        "DELETE", 
        adminEndpoints.REJECT_MENTOR_AND_DEGRADETOUSER(selectedMentor.mentorId),
        { reason: rejectReason }
      );
      
      if (response.data.success) {
        showNotification('success', 'Action Successful', 'Mentor rejected and converted to regular user');
        
        // Update local state
        setMentors(prev => 
          prev.map(mentor => 
            mentor.mentorId === selectedMentor.mentorId 
              ? { ...mentor, status: "REJECTED", role: "USER" }
              : mentor
          )
        );
        
        setRejectModalVisible(false);
        setRejectReason("");
        setSelectedMentor(null);
      } else {
        showNotification('error', 'Action Failed', response.data.message || 'Failed to reject mentor');
      }
    } catch (error) {
      console.error("Error rejecting mentor:", error);
      showNotification('error', 'Error Rejecting', 'Error rejecting mentor');
    } finally {
      setRejectLoading(false);
    }
  };

  const showRejectModal = (mentor) => {
    setSelectedMentor(mentor);
    setRejectModalVisible(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      APPROVED: {
        color: "text-green-400 bg-green-500/10 border-green-500/30",
        icon: "✓",
      },
      PENDING: {
        color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
        icon: "⏳",
      },
      REJECTED: {
        color: "text-red-400 bg-red-500/10 border-red-500/30",
        icon: "✗",
      },
    };

    const config = statusConfig[status] || { color: "text-gray-400 bg-gray-500/10 border-gray-500/30", icon: "?" };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color} flex items-center gap-1`}>
        {config.icon} {status}
      </span>
    );
  };

  const getExpertiseTags = (expertise = []) => {
    if (!expertise.length) return (
      <span className="px-2 py-1 text-xs bg-gray-500/10 text-gray-400 rounded-full">
        No expertise
      </span>
    );
    
    return expertise.slice(0, 2).map((exp, idx) => (
      <span 
        key={idx} 
        className={`px-2 py-1 text-xs rounded-full ${
          idx % 5 === 0 ? 'bg-blue-500/20 text-blue-400' :
          idx % 5 === 1 ? 'bg-purple-500/20 text-purple-400' :
          idx % 5 === 2 ? 'bg-cyan-500/20 text-cyan-400' :
          idx % 5 === 3 ? 'bg-green-500/20 text-green-400' :
          'bg-orange-500/20 text-orange-400'
        }`}
      >
        {exp}
      </span>
    ));
  };

  const handleViewMentor = (mentor) => {
    setSelectedMentor(mentor);
    setViewModalVisible(true);
  };

  const handleEmailMentor = (mentor) => {
    showNotification('info', 'Email Demo', `Email sent to ${mentor.email} (demo)`);
  };

  const renderMentorDetails = (mentor) => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{mentor.yearsOfExperience || 0}</div>
          <div className="text-gray-400 text-sm">Years Experience</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">₹{mentor.sessionPrice || 0}</div>
          <div className="text-gray-400 text-sm">Session Price</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{mentor.expertise?.length || 0}</div>
          <div className="text-gray-400 text-sm">Expertise Areas</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-300 mb-3">Professional Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Company:</span>
                <span className="text-white">{mentor.currentCompany || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Job Title:</span>
                <span className="text-white">{mentor.jobTitle || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">College:</span>
                <span className="text-white">{mentor.college || "Not specified"}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-300 mb-3">Account Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status:</span>
                {getStatusBadge(mentor.status)}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Joined:</span>
                <span className="text-white">{dayjs(mentor.createdAt).format("MMM D, YYYY")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Role:</span>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  mentor.role === "MENTOR" 
                    ? "bg-blue-500/20 text-blue-400" 
                    : "bg-gray-500/20 text-gray-400"
                }`}>
                  {mentor.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-300 mb-3">Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise?.map((exp, idx) => (
              <span 
                key={idx} 
                className={`px-3 py-1 rounded-full text-sm ${
                  idx % 5 === 0 ? 'bg-blue-500/20 text-blue-400' :
                  idx % 5 === 1 ? 'bg-purple-500/20 text-purple-400' :
                  idx % 5 === 2 ? 'bg-cyan-500/20 text-cyan-400' :
                  idx % 5 === 3 ? 'bg-green-500/20 text-green-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}
              >
                {exp}
              </span>
            ))}
          </div>
        </div>

        {mentor.offerLetterUrl && (
          <div>
            <h4 className="font-semibold text-gray-300 mb-3">Offer Letter</h4>
            <button 
              onClick={() => window.open(mentor.offerLetterUrl, '_blank')}
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <Icon name="eye" className="w-5 h-5" />
              <span>View Offer Letter</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-4 sm:p-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-white/10 p-4 sm:p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mentor Management
            </h2>
            <p className="text-gray-400">Manage all registered mentors and their profiles</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={fetchAllMentors}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg flex items-center space-x-2 transition-all duration-300 disabled:opacity-50"
            >
              <Icon name="sync" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="team" className="w-4 h-4 text-blue-400" />
              <div className="text-gray-400 text-sm">Total Mentors</div>
            </div>
            <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="check" className="w-4 h-4 text-green-400" />
              <div className="text-gray-400 text-sm">Approved</div>
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/20 p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="clock" className="w-4 h-4 text-yellow-400" />
              <div className="text-gray-400 text-sm">Pending</div>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl border border-red-500/20 p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="close" className="w-4 h-4 text-red-400" />
              <div className="text-gray-400 text-sm">Rejected</div>
            </div>
            <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="dollar" className="w-4 h-4 text-purple-400" />
              <div className="text-gray-400 text-sm">Avg. Price</div>
            </div>
            <div className="text-2xl font-bold text-purple-400">₹{stats.avgPrice}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-white/10 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentors by name, email, company, or expertise..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="createdAt_desc">Newest First</option>
              <option value="createdAt_asc">Oldest First</option>
              <option value="sessionPrice_desc">Price: High to Low</option>
              <option value="sessionPrice_asc">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Mentors Table */}
        {loading ? (
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-b border-white/10">
              <div className="col-span-3 font-semibold text-white">MENTOR</div>
              <div className="col-span-2 font-semibold text-white">PROFILE</div>
              <div className="col-span-2 font-semibold text-white">EXPERTISE</div>
              <div className="col-span-1 font-semibold text-white">EXP.</div>
              <div className="col-span-1 font-semibold text-white">PRICE</div>
              <div className="col-span-1 font-semibold text-white">STATUS</div>
              <div className="col-span-2 font-semibold text-white">ACTIONS</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
              {filteredMentors.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon name="team" className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400">No mentors found</p>
                  {searchText && (
                    <p className="text-gray-500 text-sm mt-1">Try adjusting your search</p>
                  )}
                </div>
              ) : (
                filteredMentors.map((mentor) => (
                  <div key={mentor.mentorId} className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors">
                    {/* MENTOR */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {mentor.name?.charAt(0)?.toUpperCase() || "M"}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold truncate text-white">{mentor.name}</div>
                          <div className="text-xs text-gray-400 truncate">{mentor.email}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <Icon name="idcard" className="w-3 h-3 mr-1" />
                            Joined: {dayjs(mentor.createdAt).format("MMM D, YYYY")}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PROFILE */}
                    <div className="col-span-2">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Icon name="bank" className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="truncate text-white">{mentor.currentCompany || "Not specified"}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-400 mr-2">🎓</span>
                          <span className="truncate text-white">{mentor.college || "Not specified"}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-400 mr-2">💼</span>
                          <span className="truncate text-white">{mentor.jobTitle || "Not specified"}</span>
                        </div>
                      </div>
                    </div>

                    {/* EXPERTISE */}
                    <div className="col-span-2">
                      <div className="flex flex-wrap gap-1">
                        {getExpertiseTags(mentor.expertise)}
                        {mentor.expertise?.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded-full cursor-help" title={mentor.expertise.slice(2).join(", ")}>
                            +{mentor.expertise.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div className="col-span-1">
                      <div className="flex items-center">
                        <Icon name="star" className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="font-medium text-white">{mentor.yearsOfExperience || 0}y</span>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="col-span-1">
                      <div className="flex items-center font-medium text-green-400">
                        <Icon name="dollar" className="w-4 h-4 mr-2" />
                        ₹{mentor.sessionPrice || 0}
                      </div>
                    </div>

                    {/* STATUS */}
                    <div className="col-span-1">
                      {getStatusBadge(mentor.status)}
                    </div>

                    {/* ACTIONS */}
                    <div className="col-span-2">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewMentor(mentor)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Icon name="eye" className="w-4 h-4" />
                        </button>
                        
                        {mentor.status !== "REJECTED" && (
                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to reject ${mentor.name}? They will be converted back to a regular user.`)) {
                                showRejectModal(mentor);
                              }
                            }}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
                            title="Reject Mentor"
                          >
                            <Icon name="userDelete" className="w-4 h-4" />
                          </button>
                        )}
                        
                        <div className="relative group">
                          <button 
                            className="p-2 border border-white/10 hover:border-white/20 rounded-lg transition-colors"
                          >
                            <Icon name="more" className="w-4 h-4" />
                          </button>
                          
                          <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                            <button
                              onClick={() => handleViewMentor(mentor)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center space-x-2"
                            >
                              <Icon name="eye" className="w-4 h-4 text-blue-400" />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => handleEmailMentor(mentor)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center space-x-2"
                            >
                              <Icon name="mail" className="w-4 h-4 text-green-400" />
                              <span>Send Email</span>
                            </button>
                            {mentor.status !== "REJECTED" && (
                              <div className="border-t border-white/10 my-2"></div>
                            )}
                            {mentor.status !== "REJECTED" && (
                              <button
                                onClick={() => showRejectModal(mentor)}
                                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center space-x-2"
                              >
                                <Icon name="userDelete" className="w-4 h-4" />
                                <span>Reject & Convert to User</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredMentors.length > 0 && (
              <div className="px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-400">
                  Showing 1-{Math.min(filteredMentors.length, 10)} of {filteredMentors.length} mentors
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">
                    Previous
                  </button>
                  <span className="text-sm text-gray-400 px-2">Page 1</span>
                  <button className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reject Mentor Modal */}
      {rejectModalVisible && selectedMentor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => {
                setRejectModalVisible(false);
                setRejectReason("");
                setSelectedMentor(null);
              }}
            ></div>
            
            {/* Modal */}
            <div className="relative w-full max-w-lg bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10 rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-2 text-red-400">
                  <Icon name="exclamation" className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Reject Mentor</h3>
                </div>
              </div>
              
              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                    {selectedMentor.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-white">{selectedMentor.name}</div>
                    <div className="text-sm text-gray-400">{selectedMentor.email}</div>
                  </div>
                </div>

                <div className="text-gray-400">
                  <p className="mb-2">This action will:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Change mentor status to <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full">REJECTED</span></li>
                    <li>Convert user role from <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">MENTOR</span> to <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded-full">USER</span></li>
                    <li>Remove all mentor privileges</li>
                    <li>Keep user account active with regular user access</li>
                  </ul>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Reason for Rejection (Optional)</label>
                  <textarea
                    placeholder="Enter reason for rejecting this mentor..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">
                      This reason will be stored for reference but won't be shown to the user.
                    </p>
                    <span className="text-xs text-gray-500">{rejectReason.length}/500</span>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-white/10 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setRejectModalVisible(false);
                    setRejectReason("");
                    setSelectedMentor(null);
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRejectMentor}
                  disabled={rejectLoading}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg flex items-center space-x-2 transition-all duration-300 disabled:opacity-50"
                >
                  <Icon name="userDelete" className="w-4 h-4" />
                  <span>{rejectLoading ? 'Processing...' : 'Reject & Convert to User'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Mentor Modal */}
      {viewModalVisible && selectedMentor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => {
                setViewModalVisible(false);
                setSelectedMentor(null);
              }}
            ></div>
            
            {/* Modal */}
            <div className="relative w-full max-w-3xl bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10 rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                      {selectedMentor.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedMentor.name}</h3>
                      <p className="text-gray-400">{selectedMentor.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setViewModalVisible(false);
                      setSelectedMentor(null);
                    }}
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
              <div className="p-6 border-t border-white/10 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setViewModalVisible(false);
                    setSelectedMentor(null);
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-300"
                >
                  Close
                </button>
                {selectedMentor.status !== "REJECTED" && (
                  <button
                    onClick={() => {
                      setViewModalVisible(false);
                      showRejectModal(selectedMentor);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg flex items-center space-x-2 transition-all duration-300"
                  >
                    <Icon name="userDelete" className="w-4 h-4" />
                    <span>Reject Mentor</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMentorSection;