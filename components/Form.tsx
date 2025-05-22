'use client';
import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // send to backend or generate resume here
  };

  return (
    <div className="max-w-2xl mx-auto border-2 shadow-2xl p-20 rounded-lg mt-30 text-black">
      <h2 className="text-2xl font-semibold mb-6 text-center">Resume Builder Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            rows={3}
            placeholder="e.g., B.Tech in CSE, XYZ University, 2020"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            rows={3}
            placeholder="e.g., Intern at ABC Corp - 3 months"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            rows={2}
            placeholder="e.g., HTML, CSS, React, Node.js"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Generate Resume
        </button>
      </form>
    </div>
  );
};

export default Form;
