import React, { useState, useEffect } from "react";
import {
  Users,
  GraduationCap,
  UserCheck,
  UserX,
  Clock,
  BookOpen,
  Calendar,
} from "lucide-react";

function ClassRoomsPrinci() {
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Sample data with Muslim names
  const sampleClasses = [
    { id: 1, std: "1", class: "1", class_teacher: "Ustadh Abdul Rahman" },
    { id: 2, std: "2", class: "2", class_teacher: "Ustadh Ibrahim Khalil" },
    { id: 3, std: "3", class: "3", class_teacher: "Sheikh Abdullah Khan" },
    { id: 4, std: "4", class: "4", class_teacher: "Maulana Omar Farooq" },
    { id: 5, std: "5", class: "5", class_teacher: "Qari Abdul Basit" },
    { id: 6, std: "6", class: "6", class_teacher: "Hafiz Muhammad Salim" },
    { id: 7, std: "7", class: "7", class_teacher: "Maulana Raza Ali" },
    { id: 8, std: "8", class: "8", class_teacher: "Ustadh Shafiq Ahmed" },
    { id: 9, std: "9", class: "9", class_teacher: "Hafiz Qari Mohammad" },
    { id: 10, std: "10", class: "10", class_teacher: "Sheikh Abdul Wahid" },
  ];

  // Sample attendance data for different classes and dates with Muslim names
  const sampleAttendanceRecords = {
    1: {
      "2024-01-15": {
        success: true,
        total_students: 32,
        present_count: 28,
        absent_count: 4,
        present_students: [
          { id: 101, name: "Muhammad Ahmed", image: null },
          { id: 102, name: "Fatima Zahra", image: null },
          { id: 103, name: "Omar Farooq", image: null },
          { id: 104, name: "Aisha Siddiqua", image: null },
          { id: 105, name: "Abdullah Malik", image: null },
          { id: 106, name: "Mariam Alia", image: null },
          { id: 107, name: "Hassan Raza", image: null },
          { id: 108, name: "Zainab Khatoon", image: null },
        ],
        absent_students: [
          { id: 109, name: "Bilal Hussain", image: null },
          { id: 110, name: "Khadija Begum", image: null },
          { id: 111, name: "Yusuf Ismail", image: null },
          { id: 112, name: "Safia Rahman", image: null },
        ],
        class_status: "Class Completed",
        class_teacher: "Ustadh Abdul Rahman"
      },
      "2024-01-16": {
        success: true,
        total_students: 32,
        present_count: 30,
        absent_count: 2,
        present_students: [
          { id: 101, name: "Muhammad Ahmed", image: null },
          { id: 102, name: "Fatima Zahra", image: null },
          { id: 103, name: "Omar Farooq", image: null },
          { id: 104, name: "Aisha Siddiqua", image: null },
          { id: 105, name: "Abdullah Malik", image: null },
          { id: 106, name: "Mariam Alia", image: null },
          { id: 107, name: "Hassan Raza", image: null },
          { id: 108, name: "Zainab Khatoon", image: null },
          { id: 109, name: "Bilal Hussain", image: null },
          { id: 110, name: "Khadija Begum", image: null },
        ],
        absent_students: [
          { id: 111, name: "Yusuf Ismail", image: null },
          { id: 112, name: "Safia Rahman", image: null },
        ],
        class_status: "Class Completed",
        class_teacher: "Ustadh Abdul Rahman"
      }
    },
    2: {
      "2024-01-15": {
        success: true,
        total_students: 30,
        present_count: 25,
        absent_count: 5,
        present_students: [
          { id: 201, name: "Hamza Ali", image: null },
          { id: 202, name: "Aminah Salim", image: null },
          { id: 203, name: "Bilal Hussain", image: null },
          { id: 204, name: "Safia Rahman", image: null },
          { id: 205, name: "Yusuf Ismail", image: null },
        ],
        absent_students: [
          { id: 206, name: "Khadija Begum", image: null },
          { id: 207, name: "Ibrahim Khalil", image: null },
          { id: 208, name: "Nadia Parveen", image: null },
          { id: 209, name: "Imran Siddiqui", image: null },
          { id: 210, name: "Rabia Basri", image: null },
        ],
        class_status: "Class Going On",
        class_teacher: "Ustadh Ibrahim Khalil"
      }
    },
    3: {
      "2024-01-15": {
        success: true,
        total_students: 28,
        present_count: 26,
        absent_count: 2,
        present_students: [
          { id: 301, name: "Mustafa Karim", image: null },
          { id: 302, name: "Nadia Parveen", image: null },
          { id: 303, name: "Imran Siddiqui", image: null },
          { id: 304, name: "Rabia Basri", image: null },
          { id: 305, name: "Zubair Ansari", image: null },
        ],
        absent_students: [
          { id: 306, name: "Usman Ghani", image: null },
          { id: 307, name: "Hafsa Khatun", image: null },
        ],
        class_status: "Class Not Started",
        class_teacher: "Sheikh Abdullah Khan"
      }
    },
    4: {
      "2024-01-15": {
        success: true,
        total_students: 35,
        present_count: 32,
        absent_count: 3,
        present_students: [
          { id: 401, name: "Usman Ghani", image: null },
          { id: 402, name: "Hafsa Khatun", image: null },
          { id: 403, name: "Tariq Jameel", image: null },
          { id: 404, name: "Sumayyah Khan", image: null },
          { id: 405, name: "Ibrahim Khalil", image: null },
        ],
        absent_students: [
          { id: 406, name: "Asma bint Abu Bakr", image: null },
          { id: 407, name: "Nuh Abdullah", image: null },
          { id: 408, name: "Layla Majnun", image: null },
        ],
        class_status: "Class Going On",
        class_teacher: "Maulana Omar Farooq"
      }
    }
  };

  // Sample total students count for each class
  const sampleTotalStudents = {
    1: 32,
    2: 30,
    3: 28,
    4: 35,
    5: 33,
    6: 31,
    7: 29,
    8: 34,
    9: 36,
    10: 30,
  };

  // Set default date to current date on component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    
    // Set sample classes
    setAllClasses(sampleClasses);
  }, []);

  // Fetch attendance when date changes and class is selected
  useEffect(() => {
    if (selectedClass && selectedDate) {
      fetchAttendanceForDate(selectedClass, selectedDate);
    }
  }, [selectedDate, selectedClass]);

  const fetchAttendanceForDate = async (classData, date) => {
    setLoading(true);
    setAttendanceData(null);
    setError(null);

    // Simulate API delay
    setTimeout(() => {
      try {
        // Get attendance for the specific class and date
        const classAttendance = sampleAttendanceRecords[classData.id]?.[date];
        
        if (classAttendance) {
          setAttendanceData({
            ...classAttendance,
            total_students: sampleTotalStudents[classData.id] || 30
          });
          setSelectedClass(prev => ({
            ...prev,
            class_status: classAttendance.class_status
          }));
        } else {
          // If no specific record for this date, create a default "no attendance" response
          setAttendanceData({
            success: true,
            total_students: sampleTotalStudents[classData.id] || 30,
            present_count: 0,
            absent_count: 0,
            present_students: [],
            absent_students: [],
            class_status: "No Attendance Marked",
            class_teacher: classData.class_teacher
          });
          setError("No attendance records found for this date");
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError("Failed to load attendance data. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleClassSelect = async (classData) => {
    setSelectedClass(classData);
    // Fetch attendance for the selected class with current selectedDate
    await fetchAttendanceForDate(classData, selectedDate);
  };

  const markClassStatus = async () => {
    if (!selectedClass) {
      setError("No class selected");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      setTimeout(() => {
        // Update the class status in the sample data
        if (attendanceData) {
          const updatedAttendance = {
            ...attendanceData,
            class_status: "Class Completed"
          };
          setAttendanceData(updatedAttendance);
          setSelectedClass(prev => ({
            ...prev,
            class_status: "Class Completed"
          }));
        }
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error("Error marking class status:", error);
      setError("Failed to mark class status. Please try again.");
      setIsLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  };

  const getTotalStudents = () => {
    if (!attendanceData) return 0;
    return attendanceData.total_students || 0;
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTeacherName = () => {
    if (attendanceData?.class_teacher) {
      return attendanceData.class_teacher;
    }
    return selectedClass?.class_teacher || 'Not Assigned';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Class Rooms
                </h1>
                <p className="text-xs text-white/90">Track all classroom activity today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="px-1 mx-auto -mt-3">
          <div className="max-w-8xl p-1 mx-auto mb-2">
            <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                  Select Class
                </h2>
              </div>

              {loading && !selectedClass ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : allClasses.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No classes available
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {allClasses.map((classData, index) => (
                    <button
                      key={classData.id || index}
                      onClick={() => handleClassSelect(classData)}
                      disabled={loading}
                      className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${
                        selectedClass?.id === classData.id
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 scale-105'
                          : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-lg hover:scale-105'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="relative z-10">
                        <div className="text-xs md:text-sm opacity-80">
                          Class
                        </div>
                        <div className="text-xs font-bold md:text-sm">
                          {classData.std}
                        </div>
                      </div>
                      {selectedClass?.id !== classData.id && (
                        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 group-hover:opacity-100"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date Selection */}
        {selectedClass && (
          <div className="max-w-8xl mx-auto p-1 mb-4">
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xs md:text-sm font-semibold text-blue-500">
                    Select Date
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleTodayClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Today
                  </button>
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {formatDisplayDate(selectedDate)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Class Details */}
        {selectedClass && (
          <div className="max-w-8xl mx-auto px-1 space-y-8">
            {/* Class Header & Teacher Info */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-white/10 backdrop-blur p-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Class Name & Status */}
                  <div className="text-center md:text-left">
                    <h1 className="text-base md:text-3xl font-bold text-white mb-2">
                      Class {selectedClass.class || selectedClass.std}
                    </h1>
                    <p className="text-sm text-blue-100">
                      Attendance for {formatDisplayDate(selectedDate)}
                    </p>

                    {/* Class Status */}
                    {attendanceData?.class_status && (
                      <span
                        className={`mt-2 inline-block px-3 py-1 rounded-full font-semibold text-xs md:text-sm ${
                          attendanceData.class_status === "Class Not Started"
                            ? "bg-yellow-500 text-gray-100"
                            : attendanceData.class_status === "Class Going On"
                            ? "bg-red-700 text-gray-100"
                            : attendanceData.class_status === "Class Completed"
                            ? "bg-green-700 text-gray-100"
                            : "bg-gray-500 text-gray-100"
                        }`}
                      >
                        {attendanceData.class_status}
                      </span>
                    )}
                  </div>

                  {/* Class Teacher */}
                  <div className="flex items-center gap-4 bg-white/20 rounded-xl p-4 min-w-fit">
                    <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white">
                      <p className="text-sm opacity-90">Class Teacher</p>
                      <p className="font-semibold text-sm">
                        {getTeacherName()}
                      </p>
                    </div>
                  </div>

                  {/* Mark Class Completed Button */}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={markClassStatus}
                      disabled={isLoading}
                      className={`px-6 py-3 rounded-2xl font-semibold text-xs md:text-lg text-white flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-xl ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-br from-blue-500 to-blue-700"
                      }`}
                    >
                      {isLoading ? "Submitting..." : "Mark class Completed"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Summary Cards */}
            {attendanceData && getTotalStudents() > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mb-6">
                {/* Present Card */}
                <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl border border-slate-200 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">Present</p>
                      <p className="text-2xl lg:text-4xl font-bold text-green-600">
                        {attendanceData.present_count || 0}
                      </p>
                      <p className="text-[12px] md:text-xs text-slate-400">Today's attendance</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-green-100 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${(attendanceData.present_count / getTotalStudents()) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Absent Card */}
                <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl border border-slate-200 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">Absent</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600">
                        {attendanceData.absent_count || 0}
                      </p>
                      <p className="text-[12px] sm:text-xs text-slate-400">Today's absentees</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-red-100 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <UserX className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${(attendanceData.absent_count / getTotalStudents()) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
                  <div className="relative">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <div
                      className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-transparent border-r-purple-600 rounded-full animate-spin"
                      style={{
                        animationDirection: 'reverse',
                        animationDuration: '1.5s',
                      }}
                    ></div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 mt-4 sm:mt-6 font-medium">
                    Loading attendance data...
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2">
                    Please wait a moment
                  </p>
                </div>
              ) : error ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
                    Error Loading Data
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    {error}
                  </p>
                  <button 
                    onClick={() => handleClassSelect(selectedClass)}
                    className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-orange-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : !attendanceData || getTotalStudents() === 0 ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">
                    No Attendance Data
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    No attendance records found for this class on {formatDisplayDate(selectedDate)}.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {/* Present Students Section */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                          <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-base font-bold text-slate-800">
                            Present Students
                          </h3>
                          <p className="text-xs text-slate-500">Currently in class</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                          {attendanceData.present_count || 0} Students
                        </span>
                      </div>
                    </div>

                    {attendanceData.present_students?.length > 0 ? (
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                        {attendanceData.present_students.map((student, index) => (
                          <div
                            key={student.id || index}
                            className="group bg-white border border-green-200 rounded-lg sm:rounded-xl p-1 flex flex-col items-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                          >
                            <div className="relative mb-2">
                              <div
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                              >
                                {student.name?.charAt(0) || 'S'}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>

                            <div className="text-center w-full">
                              <h5 className="text-[9px] md:text-xs font-semibold text-slate-800 truncate w-full">
                                {student.name || 'Unknown Student'}
                              </h5>
                              <span className="inline-block mt-1 px-1.5 py-0.5 bg-green-500 text-white rounded-full text-[10px] md:text-[14px] font-medium">
                                PRESENT
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12 bg-slate-50 rounded-lg">
                        <UserCheck className="w-8 h-8 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs sm:text-sm text-slate-500">No present students</p>
                      </div>
                    )}
                  </div>

                  {/* Absent Students Section */}
                  {attendanceData.absent_students?.length > 0 && (
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg">
                            <UserX className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-base font-bold text-slate-800">
                              Absent Students
                            </h3>
                            <p className="text-xs text-slate-500">Not in class today</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm font-medium">
                            {attendanceData.absent_count || 0} Students
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                        {attendanceData.absent_students.map((student, index) => (
                          <div
                            key={student.id || index}
                            className="group bg-white border border-red-200 rounded-lg sm:rounded-xl p-1 flex flex-col items-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 opacity-90"
                          >
                            <div className="relative mb-2">
                              <div
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                              >
                                {student.name?.charAt(0) || 'S'}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 border-2 border-white rounded-full"></div>
                            </div>

                            <div className="text-center w-full">
                              <h5 className="text-[9px] md:text-xs font-semibold text-slate-800 truncate w-full">
                                {student.name || 'Unknown Student'}
                              </h5>
                              <span className="inline-block mt-1 px-1.5 py-0.5 bg-red-500 text-white rounded-full text-[10px] md:text-[14px] font-medium">
                                ABSENT
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassRoomsPrinci;