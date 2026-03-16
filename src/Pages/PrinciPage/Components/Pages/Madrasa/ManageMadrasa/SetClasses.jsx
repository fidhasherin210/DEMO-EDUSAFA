import React, { useState } from "react";
import { GraduationCap } from "lucide-react";

function SetClasses() {
  // Sample teachers data
  const sampleTeachers = [
    { id: 1, name: "Dr. Sarah Johnson" },
    { id: 2, name: "Prof. Michael Chen" },
    { id: 3, name: "Mrs. Emily Rodriguez" },
    { id: 4, name: "Mr. David Thompson" },
    { id: 5, name: "Ms. Lisa Anderson" },
    { id: 6, name: "Dr. James Wilson" },
  ];

  const [formData, setFormData] = useState({
    std: "",
    time_table: null,
    exam_time_table: null,
    class_teacher: "",
  });

  const [message, setMessage] = useState("");

  // Handle text/select inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  // Submit form with sample data handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate successful form submission
    setTimeout(() => {
      setMessage("Standard created successfully!");
      setFormData({
        std: "",
        time_table: null,
        exam_time_table: null,
        class_teacher: "",
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 mb-3 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Create New Standard
                </h1>
                <p className="text-xs text-white/90">
                  Add new academic year
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100"
        >
          {/* Standard Name */}
          <div>
            <label
              htmlFor="std"
              className="block text-xs md:text-sm font-semibold text-blue-600 mb-1"
            >
              Standard Name
            </label>
            <input
              type="text"
              id="std"
              name="std"
              value={formData.std}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
              placeholder="Enter class name"
            />
          </div>

          {/* Time Table */}
          <div>
            <label
              htmlFor="time_table"
              className="block text-xs md:text-sm font-semibold text-blue-600 mb-1"
            >
              Time Table
            </label>
            <input
              type="file"
              id="time_table"
              name="time_table"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-indigo-50 file:text-dark-500 hover:file:bg-indigo-100"
            />
          </div>

          {/* Exam Time Table */}
          <div>
            <label
              htmlFor="exam_time_table"
              className="block text-xs md:text-sm font-semibold text-blue-600 mb-1"
            >
              Exam Time Table
            </label>
            <input
              type="file"
              id="exam_time_table"
              name="exam_time_table"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-indigo-50 file:text-dark-500 hover:file:bg-indigo-100"
            />
          </div>

          {/* Class Teacher */}
          <div>
            <label
              htmlFor="class_teacher"
              className="block text-xs md:text-sm font-semibold text-blue-600 mb-1"
            >
              Class Teacher
            </label>
            <select
              id="class_teacher"
              name="class_teacher"
              value={formData.class_teacher}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
            >
              <option value="">Select a teacher</option>
              {sampleTeachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-2 rounded-md text-xs font-medium ${
                message.toLowerCase().includes("error")
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-sky-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
            >
              Create Standard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetClasses;