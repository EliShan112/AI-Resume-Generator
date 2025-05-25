"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";


const steps = [
  "Full Name",
  "Email & Phone",
  "Job Title & Location",
  "Summary",
  "Skills",
  "Experience",
  "Education",
  "Projects",
  "Preview",
];

const Form = () => {
const { data: session } = useSession();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    location: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
    linkedin: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const validateStep = (step: number) => {
    switch (step) {
      case 0:
        if (!formData.fullName.trim()) {
          toast.error("Full name is required");
          return false;
        }
        break;
      case 1:
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
          toast.error("Valid email is required");
          return false;
        }
        if (!formData.phone.trim()) {
          toast.error("Phone number is required");
          return false;
        }
        break;
      case 2:
        if (!formData.jobTitle.trim()) {
          toast.error("Job title is required");
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!validateStep(step)) return;

    const generateRes = await fetch("/api/generate-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Check if generate response is OK
    if (!generateRes.ok) {
      const error = await generateRes.json();
      toast.error(error.error || "Failed to generate resume");
      return;
    }

    const { resume: generatedResume } = await generateRes.json();


      const res = await fetch(`/api/resume?id=${session?.user?.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, generatedResume }),
      });


      if (res.ok) {
        toast.success("🎉 Resume saved successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          jobTitle: "",
          location: "",
          summary: "",
          skills: "",
          experience: "",
          education: "",
          projects: "",
          linkedin: "",
        });
        setStep(0);
      } else {
        toast.error("❌ Error saving resume. Try again.");
      }
    } catch (error) {
      toast.error("🚨 Something went wrong.");
    }
  };

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step < steps.length - 1) {
        e.preventDefault();
        next();
      }
      // if it's the last step, let it fall through to submit
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [step, formData]);



  return (
    <form
      onSubmit={handleSubmit}
      className="w-[70vw] max-w-3xl mx-auto mt-20 rounded-xl shadow-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 text-white p-12 md:p-10 h-[70vh] flex flex-col"
    >
      <h2 className="text-3xl font-extrabold mb-4 text-center drop-shadow-lg">
        {steps[step]}
      </h2>

      {/* Progress Bar */}
      <div className="w-full bg-white/30 rounded-full h-2 mb-8 overflow-hidden">
        <div
          className="bg-white rounded-full h-2 transition-all duration-500"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="flex-grow overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            {step === 0 && (
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 mb-6 text-white placeholder-white/70"
                required
              />
            )}
            {step === 1 && (
              <>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 mb-6 text-white placeholder-white/70"
                  required
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 text-white placeholder-white/70"
                  required
                />
              </>
            )}
            {step === 2 && (
              <>
                <input
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Job Title (e.g., Software Engineer)"
                  className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 mb-6 text-white placeholder-white/70"
                  required
                />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location (City, Country)"
                  className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 text-white placeholder-white/70"
                />
              </>
            )}
            {step === 3 && (
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={4}
                className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 text-white placeholder-white/70 resize-y"
              />
            )}
            {step === 4 && (
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js..."
                rows={3}
                className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 text-white placeholder-white/70 resize-y"
              />
            )}
            {step === 5 && (
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Your work experience..."
                rows={4}
                className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 text-white placeholder-white/70 resize-y"
              />
            )}
            {step === 6 && (
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Your education background..."
                rows={3}
                className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 text-white placeholder-white/70 resize-y"
              />
            )}
            {step === 7 && (
              <textarea
                name="projects"
                value={formData.projects}
                onChange={handleChange}
                placeholder="Project details..."
                rows={4}
                className="w-full border border-white/40 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition rounded-md px-4 py-3 text-white placeholder-white/70 resize-y"
              />
            )}
            {step === 8 && (
              <div className="space-y-3 text-sm leading-relaxed text-white/90 px-2">
                <p>
                  <strong>Name:</strong> {formData.fullName || "-"}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email || "-"}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone || "-"}
                </p>
                <p>
                  <strong>Job Title:</strong> {formData.jobTitle || "-"}
                </p>
                <p>
                  <strong>Location:</strong> {formData.location || "-"}
                </p>
                <p>
                  <strong>Summary:</strong> {formData.summary || "-"}
                </p>
                <p>
                  <strong>Skills:</strong> {formData.skills || "-"}
                </p>
                <p>
                  <strong>Experience:</strong> {formData.experience || "-"}
                </p>
                <p>
                  <strong>Education:</strong> {formData.education || "-"}
                </p>
                <p>
                  <strong>Projects:</strong> {formData.projects || "-"}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={`px-6 py-3 rounded-md font-semibold transition cursor-pointer ${
            step === 0
              ? "bg-white/30 text-white cursor-not-allowed"
              : "bg-white text-purple-700 hover:bg-purple-100"
          }`}
        >
          Back
        </button>

        {step === steps.length - 1 ? (
          <button
            type="submit"
            className="px-6 py-3 rounded-md bg-white text-purple-700 font-semibold hover:bg-purple-100 transition cursor-pointer"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="px-6 py-3 rounded-md bg-white text-purple-700 font-semibold hover:bg-purple-100 transition cursor-pointer"
          >
            Next
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
