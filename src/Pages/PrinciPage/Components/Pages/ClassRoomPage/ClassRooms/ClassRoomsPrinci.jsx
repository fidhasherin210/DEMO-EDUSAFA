import React, { useState } from 'react'
import {
  Users,
  GraduationCap,
  UserCheck,
  UserX,
  Clock,
  BookOpen,
  Calendar,
} from 'lucide-react'

import student1 from '../../../../../../assets/students/student-01.jpeg';
import student2 from '../../../../../../assets/students/student-03.jpeg';
import student3 from '../../../../../../assets/students/student-02.jpeg';
import student4 from '../../../../../../assets/students/student-06.jpg';
import student5 from '../../../../../../assets/students/student-05.jpeg';
import student6 from '../../../../../../assets/students/student-04.jpeg';
import student7 from '../../../../../../assets/students/student-07.png';

function ClassRoomsPrinci() {
  const [allClasses, setAllClasses] = useState([
    { id: 1, std: '1', class: '1', class_teacher: 'Ustadh Abdul Rahman', class_status: 'Class Completed' },
    { id: 2, std: '2', class: '2', class_teacher: 'Ustadh Ibrahim Khalil', class_status: 'Class Going On' },
    { id: 3, std: '3', class: '3', class_teacher: 'Sheikh Abdullah Khan', class_status: 'Class Not Started' },
    { id: 4, std: '4', class: '4', class_teacher: 'Maulana Omar Farooq', class_status: 'Class Going On' },
    { id: 5, std: '5', class: '5', class_teacher: 'Qari Abdul Basit', class_status: 'Class Completed' },
  ])

  const [selectedClass, setSelectedClass] = useState(null)
  const [attendanceData, setAttendanceData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")

  // Sample student data
  const sampleStudents = {
    present: [
      {
        id: 101,
        name: 'Muhammad Ahmed',
        parent_name: 'Hassan Ahmed',
        image: student1 
      },
      {
        id: 102,
        name: 'Fatima Zahra',
        parent_name: 'Yusuf Zahra',
        image: student2
      },
      {
        id: 103,
        name: 'Abdullah Malik',
        parent_name: 'Bilal Malik',
        image: student3
      },
      {
        id: 104,
        name: 'Aisha Siddiqua',
        parent_name: 'Ibrahim Siddiqui',
        image: student4
      },
      {
        id: 105,
        name: 'Omar Farooq',
        parent_name: 'Khalid Farooq',
        image: student5
      },
    ],
    absent: [
      {
        id: 201,
        name: 'Bilal Hussain',
        parent_name: 'Hussain Bilal',
        image: student6  
      },
      {
        id: 202,
        name: 'Safia Rahman',
        parent_name: 'Rahman Safia',
        image: student7
      },
    ]
  }

  const getImageUrl = (url) => {
    return url || null
  }

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setError('')
    setLoading(true)
    setAttendanceData(null)

    // Simulate API call with timeout
    setTimeout(() => {
      // Randomly decide number of present students for variety
      const randomNum = Math.floor(Math.random() * 5) + 6 // 6-10 present students
      
      setAttendanceData({
        present_students: sampleStudents.present.slice(0, randomNum),
        absent_students: sampleStudents.absent,
        class_teacher: classData.class_teacher,
        class_status: classData.class_status,
        total_students: randomNum + sampleStudents.absent.length
      })
      setLoading(false)
    }, 1000)
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)
  }

  const getTotalStudents = () => {
    if (!attendanceData) return 0
    return (
      (attendanceData.present_students?.length || 0) +
      (attendanceData.absent_students?.length || 0)
    )
  }

  const getTeacherName = () => {
    if (attendanceData?.class_teacher) {
      return attendanceData.class_teacher
    }
    return selectedClass?.class_teacher || 'Not Assigned'
  }

  const getClassStatus = () => {
    return attendanceData?.class_status || selectedClass?.class_status || 'Status Unknown'
  }

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
  }
  
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
          <div className="max-w-8xl mx-auto mb-2">
            <div className="p-5 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                  Select Class
                </h2>
              </div>

              <div className="grid grid-cols-4 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {allClasses.map((classData, index) => (
                  <button
                    key={classData.id || index}
                    onClick={() => handleClassSelect(classData)}
                    disabled={loading}
                    className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${
                      selectedClass?.id === classData.id
                        ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/25 scale-105'
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

              {/* Footer */}
              <div className="pt-3 mt-2 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                    Selected Class:{' '}
                    {selectedClass ? `Class ${selectedClass.std}` : 'None'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection - Only show when class is selected */}
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
            <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-white/10 backdrop-blur p-2 md:p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
                      Class {selectedClass.class || selectedClass.std}
                    </h1>
                    <p className="text-blue-100 text-xs md:text-sm">
                      Attendance for {formatDisplayDate(selectedDate)}
                    </p>

                    {getClassStatus() && (
                      <span
                        className={`mt-2 inline-block px-3 py-1 rounded-full font-semibold text-xs md:text-sm ${
                          getClassStatus() === 'Class Not Started'
                            ? 'bg-yellow-500 text-gray-100'
                            : getClassStatus() === 'Class Going On'
                            ? 'bg-red-700 text-gray-100'
                            : getClassStatus() === 'Class Completed'
                            ? 'bg-green-700 text-gray-100'
                            : 'bg-gray-500 text-gray-100'
                        }`}
                      >
                        {getClassStatus()}
                      </span>
                    )}
                  </div>

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
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">
                        {attendanceData.present_students?.length || 0}
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
                      style={{ width: `${((attendanceData.present_students?.length || 0) / getTotalStudents()) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Absent Card */}
                <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl border border-slate-200 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">Absent</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600">
                        {attendanceData.absent_students?.length || 0}
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
                      style={{ width: `${((attendanceData.absent_students?.length || 0) / getTotalStudents()) * 100}%` }}
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
              ) : !attendanceData ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">
                    Select a Class
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Please select a class to view attendance data.
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
                          <h3 className="text-sm sm:text-base font-bold text-slate-800">
                            Present Students
                          </h3>
                          <p className="text-xs text-slate-500">Currently in class</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                          {attendanceData.present_students?.length || 0} Students
                        </span>
                      </div>
                    </div>

                    {attendanceData.present_students?.length > 0 ? (
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                        {attendanceData.present_students?.map((student, index) => (
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
                                    e.target.style.display = 'none'
                                    if (e.target.nextSibling) {
                                      e.target.nextSibling.style.display = 'flex'
                                    }
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
                              <p className="text-[9px] md:text-xs text-slate-500 truncate">
                                {student.parent_name || 'Student'}
                              </p>
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
                            <h3 className="text-sm sm:text-base font-bold text-slate-800">
                              Absent Students
                            </h3>
                            <p className="text-xs text-slate-500">Not in class today</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm font-medium">
                            {attendanceData.absent_students.length} Students
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
                                    e.target.style.display = 'none'
                                    if (e.target.nextSibling) {
                                      e.target.nextSibling.style.display = 'flex'
                                    }
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
                              <p className="text-[9px] md:text-xs text-slate-500 truncate">
                                {student.parent_name || 'Student'}
                              </p>
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
  )
}

export default ClassRoomsPrinci