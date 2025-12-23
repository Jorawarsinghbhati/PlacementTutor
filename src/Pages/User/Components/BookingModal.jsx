import React, { useState,useEffect } from "react";
import { apiConnector } from "../../../Service/apiConnector";
import { mentorEndpoints, bookingEndpoints } from "../../../Service/apis";
import { useNavigate } from "react-router-dom";
import {
  X,
  Calendar,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  User,
  Briefcase,
  Video,
  FileText,
  Loader,  // ADD THIS
  Shield,  // ADD THIS
  CreditCard,  // ADD THIS
  Smartphone,  // ADD THIS
  Wallet,  // ADD THIS
  Check,  // ADD THIS
  XCircle,  // ADD THIS
  RefreshCw,  // ADD THIS
} from "lucide-react";

const BookingModal = ({ mentor, onClose }) => {
  const navigate = useNavigate();
  const mentorUserId = mentor.user;
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  //new one bro
  const [booking, setBooking] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, processing, success, failed
  const [razorpayKey, setRazorpayKey] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const fetchSlots = async (date) => {
    if (!mentorUserId || !date) return;

    setLoading(true);
    try {
      const res = await apiConnector(
        "GET",
        mentorEndpoints.MENTOR_AVAILABILITY(mentorUserId, date)
      );
      console.log("Fetched slots:", res);
      setSlots(res.data.slots || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (day) => {
    const selectedDate = formatDate(currentYear, currentMonth, day);
    setDate(selectedDate);
    fetchSlots(selectedDate);
  };

  // const handleContinue = () => {
  //   // if (!selectedSlot) return;
  //   // setStep(2);
  //   //new one bro...

  // };
  //new one yrr
  // REPLACE your existing handleContinue function (around line 80-90):
  const handleContinue = async () => {
    if (!selectedSlot) return;

    setLoading(true);
    try {
      // Create booking first
      const bookingRes = await apiConnector(
        "POST",
        bookingEndpoints.LOCK_SLOT,
        {
          slotId: selectedSlot._id,
          mentorId: mentor._id,
          serviceType: mentor.serviceType,
          amount: mentor.sessionPrice,
        }
      );

      setBooking(bookingRes.data.booking);
      setStep(2); // Move to confirmation step
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handlePayment = async () => {
  //   try {
  //     const res = await apiConnector("POST", bookingEndpoints.LOCK_SLOT, {
  //       slotId: selectedSlot._id,
  //     });

  //     navigate("/payment", {
  //       state: {
  //         mentor,
  //         slot: res.data.slot,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error locking slot:", error);
  //   }
  // };
  // DELETE your old handlePayment function and ADD this NEW one:
  const handlePayment = async () => {
    if (!booking || !razorpayKey) return;

    setLoading(true);
    setPaymentStatus("processing");

    try {
      // 1. Create Razorpay order
      const orderRes = await apiConnector("POST", "/payment/create-order", {
        slotId: selectedSlot._id,
        amount: mentor.sessionPrice,
        bookingId: booking._id,
      });

      const order = orderRes.data.order;

      // 2. Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        const options = {
          key: razorpayKey,
          amount: order.amount,
          currency: order.currency,
          name: "Mentor Session Booking",
          description: `Session with ${mentor.name}`,
          order_id: order.id,
          handler: async function (response) {
            // Payment successful
            try {
              // Verify payment on backend
              const verifyRes = await apiConnector("POST", "/payment/verify", {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking._id,
              });

              if (verifyRes.data.success) {
                setPaymentStatus("success");
                setStep(3); // Move to success step
              } else {
                setPaymentStatus("failed");
              }
            } catch (error) {
              console.error("Payment verification failed:", error);
              setPaymentStatus("failed");
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name: localStorage.getItem("userName") || "",
            email: localStorage.getItem("userEmail") || "",
            contact: "",
          },
          notes: {
            bookingId: booking._id,
            mentorId: mentor._id,
          },
          theme: {
            color: "#4f46e5",
          },
          modal: {
            ondismiss: function () {
              // User closed the modal without payment
              setPaymentStatus("pending");
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };

      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        setPaymentStatus("failed");
        setLoading(false);
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setPaymentStatus("failed");
      setLoading(false);
    }
  };
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isDateInPast = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
  };

  const isDateSelected = (day) => {
    if (!date || !day) return false;
    const [year, month, selectedDay] = date.split("-").map(Number);
    return (
      year === currentYear && month === currentMonth + 1 && selectedDay === day
    );
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  useEffect(() => {
    const loadRazorpayKey = async () => {
      try {
        // You need to create this endpoint - see step 6 below
        const response = await apiConnector("GET", "/payment/key");
        setRazorpayKey(response.data.key);
      } catch (error) {
        console.error("Error loading Razorpay key:", error);
      }
    };
    loadRazorpayKey();
  }, []);
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-[#111827] to-[#0b1220] w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Modal Header */}
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-lg font-bold">
                  {mentor.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  Book Session with {mentor.name}
                </h2>
                {/* <p className="text-gray-400 text-sm">Step {step} of 2</p> */}
                <p className="text-gray-400 text-sm">
                  {step === 1 && "Step 1: Select Date & Time"}
                  {step === 2 && "Step 2: Confirm Booking & Payment"}
                  {step === 3 &&
                    paymentStatus === "success" &&
                    "✅ Booking Confirmed!"}
                  {step === 3 &&
                    paymentStatus === "failed" &&
                    "❌ Payment Failed"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{
                width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
              }}
            ></div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* STEP 1: Select Date & Time */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar Section */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={20} className="text-indigo-400" />
                      <h3 className="text-lg font-semibold">Select Date</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevMonth}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="font-semibold min-w-[120px] text-center">
                        {months[currentMonth]} {currentYear}
                      </span>
                      <button
                        onClick={handleNextMonth}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Week Days Header */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {daysOfWeek.map((day) => (
                      <div
                        key={day}
                        className="text-center text-sm text-gray-400 font-medium"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {generateCalendarDays().map((day, index) => {
                      if (!day) {
                        return <div key={index} className="h-10"></div>;
                      }

                      const past = isDateInPast(day);
                      const selected = isDateSelected(day);

                      return (
                        <button
                          key={index}
                          onClick={() => !past && handleDateSelect(day)}
                          disabled={past}
                          className={`h-10 rounded-lg flex items-center justify-center font-medium transition-all duration-300
                            ${
                              past
                                ? "text-gray-500 cursor-not-allowed"
                                : selected
                                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                                : "text-gray-300 hover:bg-white/10 hover:scale-105"
                            }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Section */}
                {/* <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock size={20} className="text-blue-400" />
                    <div>
                      <h3 className="text-lg font-semibold">Available Slots</h3>
                      <p className="text-sm text-gray-400">
                        {date ? `Available time slots for ${date}` : 'Select a date first'}
                      </p>
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4"></div>
                      <p className="text-gray-400">Loading available slots...</p>
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                        <Clock size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-400">
                        {date 
                          ? 'No available slots for this date'
                          : 'Select a date to view available time slots'
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {slots.map((slot) => (
                        <button
                          key={slot._id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            selectedSlot?._id === slot._id
                              ? 'border-indigo-500 bg-indigo-500/10'
                              : 'border-white/10 hover:border-indigo-500/50 hover:bg-white/5'
                          }`}
                        >
                          <div className="text-center">
                            <p className="font-semibold text-lg">
                              {formatTime(slot.startTime)}
                            </p>
                            <p className="text-sm text-gray-400">to {formatTime(slot.endTime)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div> */}
                {/* Time Slots Section */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock size={20} className="text-blue-400" />
                    <div>
                      <h3 className="text-lg font-semibold">Available Slots</h3>
                      <p className="text-sm text-gray-400">
                        {date
                          ? `Available time slots for ${date}`
                          : "Select a date first"}
                      </p>
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4"></div>
                      <p className="text-gray-400">
                        Loading available slots...
                      </p>
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                        <Clock size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-400">
                        {date
                          ? "No available slots for this date"
                          : "Select a date to view available time slots"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {slots.map((slot) => (
                        <button
                          key={slot._id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            selectedSlot?._id === slot._id
                              ? "border-indigo-500 bg-indigo-500/10"
                              : "border-white/10 hover:border-indigo-500/50 hover:bg-white/5"
                          }`}
                        >
                          <div className="text-center">
                            <p className="font-semibold">
                              {formatTime(slot.startTime)} to{" "}
                              {formatTime(slot.endTime)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex justify-end">
                {/* <button
                  onClick={handleContinue}
                  disabled={!selectedSlot}
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedSlot
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105"
                      : "bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  Continue to Payment
                  <ChevronRight size={20} />
                </button> */}
                <button
                  onClick={handleContinue}
                  disabled={!selectedSlot || loading}
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedSlot && !loading
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105"
                      : "bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Creating Booking...
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Confirm Booking */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Session Details Card */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-6 border border-indigo-500/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {mentor.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{mentor.name}</h3>
                      <p className="text-gray-300">
                        {mentor.jobTitle} @ {mentor.currentCompany}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      ₹{mentor.sessionPrice}
                    </p>
                    <p className="text-sm text-gray-400">One Hour Session</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Calendar size={20} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Session Date</p>
                        <p className="font-semibold">{date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Clock size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Time Slot</p>
                        <p className="font-semibold">
                          {formatTime(selectedSlot?.startTime)} -{" "}
                          {formatTime(selectedSlot?.endTime)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <DollarSign size={20} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Payment Status</p>
                        <p className="font-semibold text-green-400">
                          To be processed
                        </p>
                      </div>
                    </div> */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <DollarSign size={20} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Payment Status</p>
                        <p
                          className={`font-semibold ${
                            paymentStatus === "success"
                              ? "text-green-400"
                              : paymentStatus === "failed"
                              ? "text-red-400"
                              : paymentStatus === "processing"
                              ? "text-yellow-400"
                              : "text-blue-400"
                          }`}
                        >
                          {paymentStatus === "success" && "✅ Paid"}
                          {paymentStatus === "failed" && "❌ Failed"}
                          {paymentStatus === "processing" && "⏳ Processing"}
                          {paymentStatus === "pending" && "⏳ Pending"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        {mentor.serviceType === "ONE_TO_ONE" ? (
                          <Video size={20} className="text-purple-400" />
                        ) : (
                          <FileText size={20} className="text-purple-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Session Type</p>
                        <p className="font-semibold">
                          {mentor.serviceType === "ONE_TO_ONE"
                            ? "1:1 Video Call"
                            : "Resume Review"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ADD this NEW section in Step 2 AFTER the Session Details Card */}
              {/* Payment Methods */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Payment Methods</h3>
                    <p className="text-sm text-gray-400">
                      Choose your preferred payment method
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <Shield size={18} />
                    <span className="text-sm">100% Secure</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer">
                    <CreditCard size={24} className="mb-2" />
                    <span className="text-sm">Credit Card</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer">
                    <CreditCard size={24} className="mb-2" />
                    <span className="text-sm">Debit Card</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer">
                    <Smartphone size={24} className="mb-2" />
                    <span className="text-sm">UPI</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer">
                    <Wallet size={24} className="mb-2" />
                    <span className="text-sm">Wallets</span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 text-center">
                  * All payments are processed securely via Razorpay
                </p>
              </div>
              {/* Payment Status Alerts */}
              {paymentStatus === "processing" && (
                <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <Loader className="w-8 h-8 animate-spin text-blue-400" />
                    <div>
                      <h3 className="text-lg font-semibold">
                        Processing Payment
                      </h3>
                      <p className="text-blue-300">
                        Please wait while we process your payment...
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {paymentStatus === "failed" && (
                <div className="bg-red-900/20 border border-red-800 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <XCircle size={32} className="text-red-400" />
                    <div>
                      <h3 className="text-lg font-semibold">Payment Failed</h3>
                      <p className="text-red-300">
                        Your payment could not be processed. Please try again.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Action Buttons */}
              {/* <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>

                <button
                  onClick={handlePayment}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
                >
                  <CheckCircle size={20} />
                  Pay ₹{mentor.sessionPrice}
                </button>
              </div> */}
              {/* //new one */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>

                {paymentStatus === "failed" ? (
                  <button
                    onClick={handleRetryPayment}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105"
                  >
                    <RefreshCw size={20} />
                    Try Again
                  </button>
                ) : (
                  <button
                    onClick={handlePayment}
                    disabled={loading || paymentStatus === "processing"}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : paymentStatus === "processing" ? (
                      "Processing..."
                    ) : (
                      <>
                        <CheckCircle size={20} />
                        Pay ₹{mentor.sessionPrice}
                      </>
                    )}
                  </button>
                )}
              </div>
              {/* // ADD this WHOLE NEW section after Step 2: */}
              {/* STEP 3: Success/Failure */}
              {step === 3 && (
                <div className="space-y-6">
                  {/* Success Card */}
                  {paymentStatus === "success" && (
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-8 border border-green-500/20">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6">
                          <Check size={48} className="text-white" />
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                          🎉 Booking Confirmed!
                        </h3>
                        <p className="text-gray-300 mb-6">
                          Your session with {mentor.name} has been successfully
                          booked.
                        </p>

                        <div className="bg-white/5 rounded-xl p-6 w-full max-w-md">
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Booking ID</span>
                              <span className="font-mono font-semibold">
                                {booking?._id?.slice(-8)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Date & Time</span>
                              <span className="font-semibold">
                                {date} • {formatTime(selectedSlot?.startTime)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Amount Paid</span>
                              <span className="font-bold text-green-400">
                                ₹{mentor.sessionPrice}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Session Type
                              </span>
                              <span className="font-semibold">
                                {mentor.serviceType === "ONE_TO_ONE"
                                  ? "1:1 Video Call"
                                  : "Resume Review"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-400 mt-6">
                          A confirmation email has been sent to your registered
                          email address.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Failure Card */}
                  {paymentStatus === "failed" && (
                    <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-xl p-8 border border-red-500/20">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mb-6">
                          <XCircle size={48} className="text-white" />
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                          ❌ Payment Failed
                        </h3>
                        <p className="text-gray-300 mb-6">
                          We couldn't process your payment. Please try again or
                          use a different payment method.
                        </p>

                        <div className="space-y-4 w-full max-w-md">
                          <button
                            onClick={handleRetryPayment}
                            className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                          >
                            <RefreshCw size={20} className="inline mr-2" />
                            Try Payment Again
                          </button>

                          <button
                            onClick={handleNewBooking}
                            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                          >
                            Start New Booking
                          </button>
                        </div>

                        <p className="text-sm text-gray-400 mt-6">
                          Need help? Contact support@mentorconnect.com
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    {paymentStatus === "success" ? (
                      <>
                        <button
                          onClick={onClose}
                          className="px-6 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            // You can add navigation here if needed
                          }}
                          className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                        >
                          View My Bookings
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                      >
                        Back to Calendar
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add these NEW functions after your existing functions:
const handleRetryPayment = () => {
  setPaymentStatus("pending");
  handlePayment();
};

const handleNewBooking = () => {
  setStep(1);
  setBooking(null);
  setPaymentStatus("pending");
  setSelectedSlot(null);
  setDate("");
};

export default BookingModal;
