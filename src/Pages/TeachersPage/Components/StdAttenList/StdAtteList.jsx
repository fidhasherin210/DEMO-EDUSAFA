import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  User,
  BookOpen,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
} from "lucide-react";

function StdAtteList() {
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // 🕒 Default date = today's date
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  // 📅 Fetch attendance data - wrapped in useCallback to prevent infinite re-renders
  const fetchAttendance = useCallback(async (classId, date) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${backendUrl}/api/teachers/get-attendnace-list-by-class/${classId}/?date=${date}`,
        { withCredentials: true }
      );
      setAttendanceData(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setError("No attendance found for this date.");
      setAttendanceData(null);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  // 📦 Load teacher details
  useEffect(() => {
    const storedTeacher = localStorage.getItem("teacher");
    if (storedTeacher) {
      try {
        const parsedTeacher = JSON.parse(storedTeacher);
        if (parsedTeacher.class_charges) {
          setAllClasses(parsedTeacher.class_charges);
        }
      } catch (error) {
        console.error("Error parsing teacher details:", error);
        setError("Failed to load classes.");
      }
    }
  }, []);

  // 🧭 When a class is selected, fetch attendance
  const handleClassSelect = async (classData) => {
    setSelectedClass(classData);
    setError("");
    setAttendanceData(null);
    await fetchAttendance(classData.class_id, selectedDate);
  };

  // 📅 When date changes and class is already selected → fetch again
  useEffect(() => {
    if (selectedClass) {
      fetchAttendance(selectedClass.class_id, selectedDate);
    }
  }, [selectedDate, selectedClass, fetchAttendance]);

  const getImageUrl = (url) =>
    url?.startsWith("http") ? url : `${backendUrl}${url}`;

  return (
        <div className=" min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-1">
      <div className="max-w-7xl mx-auto">
      <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600  px-4 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-white">
                Attendance
              </h1>
              <p className="text-xs text-white/90">Track student presence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-4">
        {/* Class Selection Card */}
        <div className="bg-white rounded-2xl shadow-xl mb-4 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base md:text-lg font-semibold text-gray-800">
                Select Class
              </h2>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {allClasses.map((classData, index) => (
                <button
                  key={index}
                  onClick={() => handleClassSelect(classData)}
                  className={`relative rounded-xl p-3 font-semibold transition-all duration-200 ${
                    selectedClass === classData
                      ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 active:scale-95"
                  }`}
                >
                  <div className="text-xs opacity-75 mb-0.5">Class</div>
                  <div className="text-lg font-bold">
                    {classData.class_name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Date Picker */}
        {selectedClass && (
          <div className="bg-white rounded-2xl shadow-lg mb-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Date
                </span>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 mb-3"></div>
            <p className="text-indigo-600 font-semibold">
              Loading attendance...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {/* Attendance Display */}
        {attendanceData && (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-6 h-6 text-white/90" />
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {attendanceData.present_students.length}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-white/90 font-medium">
                  Present
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <XCircle className="w-6 h-6 text-white/90" />
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {attendanceData.absent_students.length}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-white/90 font-medium">
                  Absent
                </p>
              </div>
            </div>

            {/* Present Students */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    Present Students
                  </h3>
                </div>
              </div>
              <div className="p-4">
                {attendanceData.present_students.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">
                    No students present
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {attendanceData.present_students.map((s, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center bg-green-50 rounded-xl p-3 border-2 border-green-100 hover:border-green-300 transition-all"
                      >
                        <div className="relative mb-2">
                          <img
                            src={
                              s.image
                                ? getImageUrl(s.image)
                                : "/default-avatar.png"
                            }
                            alt={s.name}
                            className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
                          />

                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <p className="text-xs md:text-sm font-semibold text-gray-800 text-center leading-tight">
                          {s.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Absent Students */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 px-4 py-3">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-white" />
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    Absent Students
                  </h3>
                </div>
              </div>
              <div className="p-4">
                {attendanceData.absent_students.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">
                    All students present!
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {attendanceData.absent_students.map((s, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center bg-red-50 rounded-xl p-3 border-2 border-red-100 hover:border-red-300 transition-all"
                      >
                        <div className="relative mb-2">
                          <img
                            src={
                              s.image
                                ? getImageUrl(s.image)
                                : "/default-avatar.png"
                            }
                            alt={s.name}
                            className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
                          />

                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                            <XCircle className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <p className="text-xs md:text-sm font-semibold text-gray-800 text-center leading-tight">
                          {s.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default StdAtteList;