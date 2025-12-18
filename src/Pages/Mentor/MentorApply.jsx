import React, { useState } from "react";
import { apiConnector } from "../../Service/apiConnector";
import { mentorEndpoints } from "../../Service/apis";
import { useNavigate } from "react-router-dom";

const MentorApply = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    currentCompany: "",
    jobTitle: "",
    yearsOfExperience: "",
    sessionPrice: "",
    expertise: [],
  });

  const [offerLetter, setOfferLetter] = useState(null);
  const [loading, setLoading] = useState(false);

  const expertiseOptions = [
    "DSA",
    "Web Development",
    "Machine Learning",
    "System Design",
    "Backend",
    "Frontend",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExpertiseChange = (skill) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(skill)
        ? prev.expertise.filter((s) => s !== skill)
        : [...prev.expertise, skill],
    }));
  };

  const handleSubmit = async () => {
    if (!offerLetter) {
      alert("Please upload offer letter");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // append normal fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });

      // append file
      data.append("offerLetter", offerLetter);

      await apiConnector(
        "POST",
        mentorEndpoints.APPLY_MENTOR,
        data
      );

      alert("Mentor application submitted for review");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Failed to submit mentor application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center py-10">
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">
          Apply to Become a Mentor
        </h1>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-900"
        />

        <input
          name="college"
          placeholder="College / University"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-900"
        />

        <input
          name="currentCompany"
          placeholder="Current Company"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-900"
        />

        <input
          name="jobTitle"
          placeholder="Job Title"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-900"
        />

        <input
          name="yearsOfExperience"
          type="number"
          placeholder="Years of Experience"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-900"
        />

        {/* Expertise */}
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-300">
            Expertise (select multiple)
          </p>
          <div className="flex flex-wrap gap-2">
            {expertiseOptions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleExpertiseChange(skill)}
                className={`px-3 py-1 rounded text-sm ${
                  formData.expertise.includes(skill)
                    ? "bg-[#c97b4a] text-black"
                    : "bg-gray-700"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <input
          name="sessionPrice"
          type="number"
          placeholder="Session Price (₹)"
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-900"
        />

        {/* Offer Letter */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-300">
            Upload Offer Letter (PDF/Image)
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => setOfferLetter(e.target.files[0])}
            className="w-full text-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#c97b4a] text-black py-2 rounded font-semibold"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Your application will be reviewed by admin
        </p>
      </div>
    </div>
  );
};

export default MentorApply;
