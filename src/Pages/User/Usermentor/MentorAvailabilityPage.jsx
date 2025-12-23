import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../../../Service/apiConnector";
import { mentorEndpoints } from "../../../Service/apis";

const MentorAvailabilityPage = () => {
  const { mentorId } = useParams();

  const [mentor, setMentor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch mentor profile
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await apiConnector(
          "GET",
          mentorEndpoints.MENTOR_DETAIL(mentorId)
        );
        setMentor(res.data.mentor);
      } catch (err) {
        console.error("Fetch mentor error:", err);
      } finally {
        setLoading(false); // ✅ IMPORTANT
      }
    };
  
    fetchMentor();
  }, [mentorId]);

  // 🔹 Fetch availability when date changes
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      const res = await apiConnector(
        "GET",
        mentorEndpoints.MENTOR_AVAILABILITY(mentorId, selectedDate)
      );
      setSlots(res.data.slots);
    };

    fetchSlots();
  }, [mentorId, selectedDate]);

  if (!mentor || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex gap-8 p-8">
      {/* LEFT PANEL */}
      <div className="w-1/2 bg-[#f3f3f3] text-black rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-2">
          AMA on {mentor.expertise.join(", ")}
        </h1>

        <div className="flex items-center gap-4 mt-4">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
            👨‍🏫
          </div>

          <div>
            <p className="font-semibold text-lg">{mentor.name}</p>
            <p className="text-gray-600">
              {mentor.jobTitle} @ {mentor.currentCompany}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <span className="bg-white px-4 py-2 rounded-full">
            ₹{mentor.sessionPrice}
          </span>
          <span className="bg-white px-4 py-2 rounded-full">
            60 mins
          </span>
        </div>

        <p className="mt-6 text-gray-700">
          Personalized 1:1 mentorship to help you crack top
          product-based companies.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 bg-white text-black rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          When should we meet?
        </h2>

        {/* DATE SELECTOR */}
        <div className="flex gap-3 mb-6 overflow-x-auto">
          {getNextDays(5).map((date) => (
            <button
              key={date.value}
              onClick={() => setSelectedDate(date.value)}
              className={`px-4 py-2 rounded-lg border ${
                selectedDate === date.value
                  ? "border-black"
                  : "border-gray-300"
              }`}
            >
              <p className="text-sm">{date.label}</p>
            </button>
          ))}
        </div>

        {/* TIME SLOTS */}
        <h3 className="font-medium mb-3">
          Select time of day
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {slots.map((slot) => (
            <button
              key={slot._id}
              disabled={slot.isBooked}
              onClick={() => setSelectedSlot(slot)}
              className={`border px-4 py-2 rounded ${
                selectedSlot?._id === slot._id
                  ? "bg-black text-white"
                  : "border-gray-300"
              } ${
                slot.isBooked
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }`}
            >
              {slot.startTime}
            </button>
          ))}
        </div>

        {/* CONTINUE */}
        <button
          disabled={!selectedSlot}
          className="mt-8 w-full bg-black text-white py-3 rounded disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MentorAvailabilityPage;

/* ---------------- HELPERS ---------------- */

const getNextDays = (count) => {
  const days = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);

    days.push({
      label: d.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      value: d.toISOString().split("T")[0],
    });
  }
  return days;
};
