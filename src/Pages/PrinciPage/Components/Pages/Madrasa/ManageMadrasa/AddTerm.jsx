import React, { useState, useEffect } from "react";
import { Edit3 } from "lucide-react";

function AddTerm() {
  const [name, setName] = useState("");
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [latestAcademicYear, setLatestAcademicYear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error
  const [terms, setTerms] = useState([]);

  // Sample academic years data
  const sampleAcademicYears = [
    { id: 1, year: "2023-2024" },
    { id: 2, year: "2024-2025" },
    { id: 3, year: "2025-2026" }
  ];

  // Sample existing terms data
  const sampleTerms = [
    { id: 1, name: "First Term", academic_year: 2 },
    { id: 2, name: "Second Term", academic_year: 2 },
    { id: 3, name: "Third Term", academic_year: 2 },
    { id: 4, name: "First Term", academic_year: 1 },
    { id: 5, name: "Second Term", academic_year: 1 }
  ];

  /* 📅 Load Academic Years */
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const years = sampleAcademicYears;
      setAcademicYears(years);

      if (years.length > 0) {
        const latest = years.reduce((a, b) => (a.id > b.id ? a : b));
        setLatestAcademicYear(latest);
        setSelectedAcademicYear(latest.id.toString());
      }
    }, 300);
  }, []);

  /* Load existing terms */
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTerms(sampleTerms);
    }, 400);
  }, []);

  const handleAcademicYearChange = (e) => {
    setSelectedAcademicYear(e.target.value);
  };

  // Check if term already exists for selected academic year
  const isTermExists = (termName, academicYearId) => {
    return terms.some(
      term => term.name.toLowerCase() === termName.toLowerCase() && 
      term.academic_year === parseInt(academicYearId)
    );
  };

  /* 📤 Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !selectedAcademicYear) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    // Check if term already exists
    if (isTermExists(name, selectedAcademicYear)) {
      setMessage(`Term "${name}" already exists for this academic year`);
      setMessageType("error");
      return;
    }

    const confirmAdd = window.confirm(
      `Add term "${name}" for selected academic year?`
    );
    if (!confirmAdd) return;

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Add new term to local state
      const newTerm = {
        id: terms.length + 1,
        name: name,
        academic_year: parseInt(selectedAcademicYear)
      };
      
      setTerms([...terms, newTerm]);
      
      setMessage("Term created successfully");
      setMessageType("success");
      setName("");
    } catch (error) {
      setMessage("Server error");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Get academic year name by ID
  const getAcademicYearName = (yearId) => {
    const year = academicYears.find(y => y.id === yearId);
    return year ? year.year : '';
  };

  // Filter terms by selected academic year
  const filteredTerms = selectedAcademicYear
    ? terms.filter(term => term.academic_year === parseInt(selectedAcademicYear))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Edit3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Add Term
                </h1>
                <p className="text-xs text-white/90">Create academic terms for each academic year</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border mt-3">
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-center font-semibold ${
                messageType === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Term Name */}
            <div>
              <label className="block text-xs md:text-sm font-semibold text-blue-600">
                Term Name
              </label>
              <input
                type="text"
                placeholder="Eg: First Term"
                className="w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-xs md:text-sm font-semibold text-blue-600">
                Academic Year
              </label>
              <select
                value={selectedAcademicYear}
                onChange={handleAcademicYearChange}
                className="w-full text-xs md:text-sm p-3 mt-1 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select Academic Year</option>
                {academicYears.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.year}
                    {latestAcademicYear &&
                      year.id === latestAcademicYear.id &&
                      " (Latest)"}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 rounded-xl font-semibold shadow hover:opacity-90 transition"
            >
              {loading ? "Saving..." : "Add Term"}
            </button>
          </form>

          {/* Existing Terms Display */}
          {selectedAcademicYear && filteredTerms.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Existing Terms for {getAcademicYearName(parseInt(selectedAcademicYear))}
              </h3>
              <div className="flex flex-wrap gap-2">
                {filteredTerms.map((term) => (
                  <span
                    key={term.id}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {term.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTerm;