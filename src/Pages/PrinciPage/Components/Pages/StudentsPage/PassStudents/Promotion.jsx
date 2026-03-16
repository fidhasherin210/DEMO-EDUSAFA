import React, { useState } from "react";
import { Award, AlertTriangle, CheckCircle } from "lucide-react";
import PassStudents from "./PassStudents";

function Promotion() {
  const [yearCreated, setYearCreated] = useState(null);
  const [standardCreated, setStandardCreated] = useState(null);

  // Sample data for the promotion process
  const sampleAcademicYears = [
    { id: 1, year: "2023-2024", isActive: false },
    { id: 2, year: "2024-2025", isActive: true },
    { id: 3, year: "2025-2026", isActive: false },
  ];

  const sampleStandards = [
    { id: 1, std: "1", academicYear: "2024-2025", students: 25 },
    { id: 2, std: "2", academicYear: "2024-2025", students: 28 },
    { id: 3, std: "3", academicYear: "2024-2025", students: 32 },
    { id: 4, std: "4", academicYear: "2024-2025", students: 27 },
    { id: 5, std: "5", academicYear: "2024-2025", students: 30 },
    { id: 6, std: "6", academicYear: "2024-2025", students: 29 },
    { id: 7, std: "7", academicYear: "2024-2025", students: 26 },
    { id: 8, std: "8", academicYear: "2024-2025", students: 31 },
    { id: 9, std: "9", academicYear: "2024-2025", students: 33 },
    { id: 10, std: "10", academicYear: "2024-2025", students: 28 },
  ];

  // Sample promotion statistics
  const samplePromotionStats = {
    totalStudents: 289,
    promotedStudents: 265,
    failedStudents: 24,
    promotionRate: "91.7%",
    currentAcademicYear: "2023-2024",
    nextAcademicYear: "2024-2025"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-1">
      <div className="mx-auto">

        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <Award className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="text-sm font-bold text-white md:text-xl">
                Students Promotion
              </h1>
              <p className="text-xs text-white/90">
                Review and transfer students to the next academic year
              </p>
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="mt-2 bg-white rounded-xl shadow-md border ">

          {/* Question 1 */}
          {yearCreated === null && (
            <div className="space-y-4 p-5">
              <h2 className="text-sm md:text-lg font-semibold text-gray-800">
                Have you created a new Academic Year?  
                <br />
                <span className="text-gray-500 text-xs md:text-sm">
                  നിങ്ങൾ പുതിയ അക്കാദമിക് വർഷം സൃഷ്ടിച്ചിട്ടുണ്ടോ?
                </span>
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={() => setYearCreated(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCircle size={16} />
                  Yes / ഉണ്ട്
                </button>

                <button
                  onClick={() => setYearCreated(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  No / ഇല്ല
                </button>
              </div>
            </div>
          )}

          {/* Warning if Academic Year not created */}
          {yearCreated === false && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
              <AlertTriangle className="text-red-600 mt-1" size={18} />
              <div>
                <p className="text-sm md:text-lg font-semibold text-red-700">
                  Please create a new Academic Year first.
                </p>
                <p className="text-xs md:text-sm text-red-600">
                  ആദ്യം പുതിയ അക്കാദമിക് വർഷം സൃഷ്ടിക്കുക.
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Current academic year: 2023-2024 | Next available: 2024-2025
                </p>
              </div>
            </div>
          )}

          {/* Question 2 */}
          {yearCreated === true && standardCreated === null && (
            <div className="space-y-4 p-5">
              <h2 className="text-sm md:text-lg font-semibold text-gray-800">
                Have you created Standards in the new Academic Year?
                <br />
                <span className="text-gray-500 text-xs md:text-sm">
                  പുതിയ അക്കാദമിക് വർഷത്തിൽ ക്ലാസുകൾ (Standards) സൃഷ്ടിച്ചിട്ടുണ്ടോ?
                </span>
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={() => setStandardCreated(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCircle size={16} />
                  Yes / ഉണ്ട്
                </button>

                <button
                  onClick={() => setStandardCreated(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  No / ഇല്ല
                </button>
              </div>

              {/* Show available standards for reference */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">Available Standards in 2024-2025:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleStandards.slice(0, 5).map(std => (
                    <span key={std.id} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      Class {std.std} ({std.students} students)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Warning if standards not created */}
          {standardCreated === false && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <AlertTriangle className="text-yellow-600 mt-1" size={18} />
              <div>
                <p className="text-sm md:text-lg font-semibold text-yellow-700">
                  Please create Standards for the new Academic Year.
                </p>
                <p className="text-xs md:text-sm text-yellow-600">
                  പുതിയ അക്കാദമിക് വർഷത്തിനായി ക്ലാസുകൾ ആദ്യം സൃഷ്ടിക്കുക.
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  You need to create classes from Standard 1 to 10 for the year 2024-2025
                </p>
              </div>
            </div>
          )}

          {/* Show Promotion Panel */}
          {yearCreated === true && standardCreated === true && (
            <div className="mt-4">
              {/* Promotion Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-t-xl border-b border-blue-100">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">Total Students</p>
                  <p className="text-lg font-bold text-blue-600">{samplePromotionStats.totalStudents}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">To Promote</p>
                  <p className="text-lg font-bold text-green-600">{samplePromotionStats.promotedStudents}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">To Repeat</p>
                  <p className="text-lg font-bold text-red-600">{samplePromotionStats.failedStudents}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">Promotion Rate</p>
                  <p className="text-lg font-bold text-purple-600">{samplePromotionStats.promotionRate}</p>
                </div>
              </div>

              {/* Academic Year Info */}
              <div className="px-4 py-2 bg-blue-50/50 border-b border-blue-100">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">From:</span> {samplePromotionStats.currentAcademicYear} 
                  <span className="mx-2">→</span>
                  <span className="font-medium">To:</span> {samplePromotionStats.nextAcademicYear}
                </p>
              </div>

              <PassStudents />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Promotion;