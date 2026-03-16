import React, { useState } from "react";
import {
  Users,
  GraduationCap,
  UserCheck,
  UserX,
  Clock,
  BookOpen,
  Calendar,
} from "lucide-react";

function ClassRoomTeachr() {
  // Sample data for classes
  const [allClasses] = useState([
    { id: 1, std: "1", class: "1", class_teacher: "Abdullah Bakavi" },
    { id: 2, std: "2", class: "2", class_teacher: "Saleem Humaidi" },
    { id: 3, std: "3", class: "3", class_teacher: "Abdul Sathar Saadi" },
    { id: 4, std: "4 ", class: "4", class_teacher: "Abdullah Sabeel" },

  ]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sample student images (using placeholder images)
  const sampleStudents = {
    present: [
      { id: 101, name: "Emma Watson", image: "https://i.pravatar.cc/150?img=1" },
      { id: 102, name: "James Smith", image: "https://i.pravatar.cc/150?img=2" },
      { id: 103, name: "Sophia Lee", image: "https://i.pravatar.cc/150?img=3" },
      { id: 104, name: "Michael Brown", image: "https://i.pravatar.cc/150?img=4" },
      { id: 105, name: "Olivia Davis", image: "https://i.pravatar.cc/150?img=5" },
      { id: 106, name: "William Johnson", image: "https://i.pravatar.cc/150?img=6" },
      { id: 107, name: "Isabella Garcia", image: "https://i.pravatar.cc/150?img=7" },
      { id: 108, name: "Alexander Miller", image: "https://i.pravatar.cc/150?img=8" },
      { id: 109, name: "Mia Rodriguez", image: "https://i.pravatar.cc/150?img=9" },
      { id: 110, name: "Daniel Martinez", image: "https://i.pravatar.cc/150?img=10" },
    ],
    absent: [
      { id: 201, name: "Ethan Thompson", image: "https://i.pravatar.cc/150?img=11" },
      { id: 202, name: "Charlotte White", image: "https://i.pravatar.cc/150?img=12" },
      { id: 203, name: "Benjamin Harris", image: "https://i.pravatar.cc/150?img=13" },
      { id: 204, name: "Amelia Martin", image: "https://i.pravatar.cc/150?img=14" },
      { id: 205, name: "Lucas Anderson", image: "https://i.pravatar.cc/150?img=15" },
    ]
  };

  const getImageUrl = (url) => url;

  // Set default date to current date on component mount
  useState(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  // Sample attendance data generator
  const generateSampleAttendance = (classData, date) => {
    const totalStudents = 25;
    const presentCount = 18;
    const absentCount = totalStudents - presentCount;
    
    return {
      success: true,
      total_students: totalStudents,
      present_count: presentCount,
      absent_count: absentCount,
      present_students: sampleStudents.present.slice(0, presentCount),
      absent_students: sampleStudents.absent.slice(0, absentCount),
      class_status: date === new Date().toISOString().split('T')[0] 
        ? "Class Going On" 
        : date < new Date().toISOString().split('T')[0] 
          ? "Class Completed" 
          : "Class Not Started",
      class_teacher: classData.class_teacher,
      date: date
    };
  };

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    // Generate sample attendance data
    const sampleData = generateSampleAttendance(classData, selectedDate);
    setAttendanceData(sampleData);
  };

  const markClassStatus = async () => {
    if (!selectedClass) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setAttendanceData(prev => ({
        ...prev,
        class_status: "Class Completed"
      }));
      setIsLoading(false);
    }, 1000);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    if (selectedClass) {
      const sampleData = generateSampleAttendance(selectedClass, newDate);
      setAttendanceData(sampleData);
    }
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    if (selectedClass) {
      const sampleData = generateSampleAttendance(selectedClass, today);
      setAttendanceData(sampleData);
    }
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

              {allClasses.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No classes available
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {allClasses.map((classData, index) => (
                    <button
                      key={classData.id || index}
                      onClick={() => handleClassSelect(classData)}
                      className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${
                        selectedClass?.id === classData.id
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/25 scale-105'
                          : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-lg hover:scale-105'
                      }`}
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
                            : "bg-green-700 text-gray-100"
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
                      <p className="text-[13px] md:text-xs text-slate-400">Today's attendance</p>
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
                      <p className="text-[13px] sm:text-xs text-slate-400">Today's absentees</p>
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
              {!attendanceData || getTotalStudents() === 0 ? (
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
                              {student.image ? (
                                <img
                                  src={getImageUrl(student.image)}
                                  alt={student.name}
                                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-green-400"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div
                                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${
                                  student.image ? 'hidden' : 'flex'
                                }`}
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
                              {student.image ? (
                                <img
                                  src={getImageUrl(student.image)}
                                  alt={student.name}
                                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-red-400 grayscale"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div
                                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${
                                  student.image ? 'hidden' : 'flex'
                                }`}
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

export default ClassRoomTeachr;