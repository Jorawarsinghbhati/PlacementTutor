
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Phone, Clock, MessageSquare, Send,
  CheckCircle, User, Globe, Rocket, Users,
  Info, HelpCircle, Zap, Shield, Star,
  ChevronRight, Linkedin, Instagram, Calendar,
  MapPin, Briefcase, ExternalLink, Award,
  Sparkles, Target, Users as UsersIcon, PhoneCall,
  ChevronDown, ChevronUp, Plus, Minus
} from "lucide-react";

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [activeSection, setActiveSection] = useState('contact');
  const [openFAQ, setOpenFAQ] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const contactInfo = [
    {
      id: 1,
      icon: Mail,
      title: "Email Support",
      value: "2023ucp1619@mnit.ac.in",
      description: "For general inquiries and support",
      gradient: "from-blue-500 to-cyan-500",
      action: () => window.location.href = "mailto:2023ucp1619@mnit.ac.in",
      badge: "Fast Response",
      responseTime: "Within 2-4 hours"
    },
    {
      id: 2,
      icon: Phone,
      title: "Phone Support",
      value: "+91 9680776189",
      description: "Direct line for urgent matters",
      gradient: "from-green-500 to-emerald-500",
      action: () => window.location.href = "tel:+919680776189",
      badge: "24/7 Available",
      responseTime: "Immediate"
    },
    {
      id: 3,
      icon: Calendar,
      title: "Schedule a Call",
      value: "Book Appointment",
      description: "Schedule a personalized consultation",
      gradient: "from-purple-500 to-pink-500",
      action: () => window.open('https://calendly.com', '_blank'),
      badge: "1-on-1 Session",
      responseTime: "Schedule within 24h"
    }
  ];

  const supportHours = [
    { day: "Monday - Friday", time: "10:00 AM – 6:00 PM IST", status: "active", icon: Clock },
    { day: "Saturday", time: "11:00 AM – 4:00 PM IST", status: "limited", icon: Users },
    { day: "Sunday", time: "Emergency Support Only", status: "emergency", icon: Shield },
  ];

  const departments = [
    {
      name: "Technical Support",
      icon: Rocket,
      color: "purple",
      email: "tech@placementtutor.com",
      response: "Within 24 hours",
      description: "Technical issues & platform support"
    },
    {
      name: "Mentor Relations",
      icon: UsersIcon,
      color: "blue",
      email: "mentors@placementtutor.com",
      response: "Within 36 hours",
      description: "Mentor onboarding & queries"
    },
  ];

  const faqItems = [
    {
      id: 1,
      question: "How fast will I get a response?",
      answer: "We typically respond within 2-4 hours during business hours and within 24 hours for all inquiries. Urgent matters via phone get immediate attention.",
      icon: Clock,
      details: [
        "Email responses: Within 2-4 hours (Mon-Fri)",
        "Phone support: Immediate for urgent issues",
        "Weekend responses: Within 24 hours",
        "Emergency line: 24/7 availability"
      ]
    },
    {
      id: 2,
      question: "Is phone support available?",
      answer: "Yes, phone support is available 24/7 for emergency technical issues. See support hours for detailed availability.",
      icon: PhoneCall,
      details: [
        "Primary number: +91 9680776189",
        "Available: 24/7 for emergencies",
        "Business hours: 10 AM - 6 PM IST",
        "Emergency response: Within 30 minutes"
      ]
    },
    
    {
      id: 3,
      question: "What information should I include?",
      answer: "Include your name, email, and detailed description of your inquiry or issue for fastest resolution. For technical issues, include screenshots if possible.",
      icon: Info,
      details: [
        "Required: Name, email, description",
        "Helpful: Screenshots, error messages",
        "Optional: Phone number for callback",
        "Priority: Mark urgent if needed"
      ]
    },
    
    
  ];

  const socialMedia = [
    { icon: Linkedin, label: "LinkedIn", color: "blue", link: "https://linkedin.com" },
    { icon: Instagram, label: "Instagram", color: "pink", link: "https://instagram.com" },
    { icon: Globe, label: "Website", color: "purple", link: "https://placementtutor.com" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-right';
      notification.innerHTML = `
        <div class="flex items-center gap-3">
          <CheckCircle class="w-6 h-6" />
          <div>
            <div class="font-bold">Message Sent Successfully!</div>
            <div class="text-sm opacity-90">We'll get back to you within 24 hours.</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 5000);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Scroll to success message
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
      
      // Auto reset submitted state
      setTimeout(() => {
        setSubmitted(false);
      }, 8000);
    } catch (error) {
      const errorNotification = document.createElement('div');
      errorNotification.className = 'fixed top-4 right-4 z-50 bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-right';
      errorNotification.innerHTML = `
        <div class="flex items-center gap-3">
          <Info class="w-6 h-6" />
          <div>
            <div class="font-bold">Failed to Send Message</div>
            <div class="text-sm opacity-90">Please try again or contact us directly.</div>
          </div>
        </div>
      `;
      document.body.appendChild(errorNotification);
      
      setTimeout(() => {
        errorNotification.remove();
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Collapsible FAQ Item Component
  const FAQItem = ({ faq, index, isOpen, onToggle }) => {
    const Icon = faq.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1 + 1.1 }}
        className="rounded-xl overflow-hidden border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm"
      >
        <motion.button
          onClick={() => onToggle(faq.id)}
          className="w-full p-6 text-left flex items-center justify-between group hover:bg-gray-800/30 transition-all duration-300"
          whileHover={{ x: 5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <Icon className="w-5 h-5 text-purple-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
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
                <div className="pl-14 border-l-2 border-purple-500/30">
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {faq.answer}
                  </p>
                  
                  {faq.details && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2 mt-4"
                    >
                      {faq.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-2 text-sm text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  
                  {/* Action buttons for specific FAQs */}
                  {faq.id === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 flex items-center gap-2 text-sm text-purple-400"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call now: +91 9680776189</span>
                    </motion.div>
                  )}
                  
                  {faq.id === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4"
                    >
                      <button
                        onClick={() => window.open('https://calendly.com', '_blank')}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-lg text-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
                      >
                        Schedule Now
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-x-hidden relative">
      {/* Background Elements */}
      <FloatingElements />
      
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:p-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20 pt-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isVisible ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm mb-8"
          >
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl">
                <MessageSquare className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 px-4">
            We're here to help! Reach out to our team for support, inquiries, or partnership opportunities
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8">
            {["Fast Response", "24/7 Support"].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm md:text-base font-medium backdrop-blur-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20"
        >
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={item.action}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative group cursor-pointer bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                  hoveredCard === item.id ? 'border-blue-500/50 shadow-xl shadow-blue-500/10' : ''
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.span
                      animate={{ 
                        scale: hoveredCard === item.id ? [1, 1.1, 1] : 1,
                        rotate: hoveredCard === item.id ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 2 }}
                      className="text-xs px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full text-gray-300"
                    >
                      {item.badge}
                    </motion.span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  
                  <div className="text-lg font-semibold mb-1">{item.value}</div>
                  <div className="text-sm text-gray-400 mb-4">{item.responseTime}</div>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredCard === item.id ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mb-4"
                  />
                  
                  <div className="flex items-center text-blue-400 text-sm">
                    <span>Click to contact</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Support Hours & Departments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20">
          {/* Support Hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400" />
              Support Hours
            </h2>
            
            <div className="space-y-4">
              {supportHours.map((slot, index) => {
                const StatusIcon = slot.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/30 hover:from-gray-800 hover:to-gray-900 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        slot.status === 'active' ? 'bg-green-500/20' :
                        slot.status === 'limited' ? 'bg-amber-500/20' :
                        'bg-red-500/20'
                      }`}>
                        <StatusIcon className={`w-4 h-4 ${
                          slot.status === 'active' ? 'text-green-400' :
                          slot.status === 'limited' ? 'text-amber-400' :
                          'text-red-400'
                        }`} />
                      </div>
                      <div>
                        <div className="font-semibold">{slot.day}</div>
                        <div className="text-sm text-gray-400">{slot.time}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      slot.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      slot.status === 'limited' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-400 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-300">Emergency Support</div>
                  <div className="text-sm text-gray-300 mt-1">
                    For critical issues outside business hours, contact our emergency line at +91 9680776189
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Departments */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <UsersIcon className="w-6 h-6 text-cyan-400" />
              Departments & Teams
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept, index) => {
                const DeptIcon = dept.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.9 }}
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-${dept.color}-500/20`}>
                        <DeptIcon className={`w-5 h-5 text-${dept.color}-400`} />
                      </div>
                      <div>
                        <div className="font-bold">{dept.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{dept.description}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 mb-1">{dept.email}</div>
                    <div className="text-xs text-gray-400">Response: {dept.response}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Send className="w-6 h-6 text-blue-400" />
              Send us a Message
            </h2>
            
            <AnimatePresence>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">Message Sent Successfully!</h3>
                  <p className="text-gray-300 mb-6">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-purple-400" />
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 mb-6">
                Find quick answers to common questions about our support services
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-8"
              >
                <HelpCircle className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300">
                  {openFAQ === null ? 'Click on any question to expand' : 'Click to collapse'}
                </span>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <FAQItem 
                  key={faq.id}
                  faq={faq}
                  index={index}
                  isOpen={openFAQ === faq.id}
                  onToggle={(id) => setOpenFAQ(openFAQ === id ? null : id)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social Media & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-cyan-400" />
              Connect With Us
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socialMedia.map((social, index) => {
                const SocialIcon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 1.3 }}
                    whileHover={{ y: -6, scale: 1.05 }}
                    className={`p-6 rounded-xl bg-gradient-to-br from-${social.color}-500/10 to-${social.color}-500/5 border border-${social.color}-500/20 flex flex-col items-center justify-center transition-all duration-300 hover:border-${social.color}-400/40`}
                  >
                    <SocialIcon className={`w-8 h-8 text-${social.color}-400 mb-3`} />
                    <div className="font-bold text-lg">{social.label}</div>
                    <ExternalLink className="w-4 h-4 mt-2 opacity-50" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
          
        </div>
      </div>

    </div>
  );
};

export default ContactUs;