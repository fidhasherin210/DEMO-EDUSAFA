import React, { useState } from 'react'
import {
  Calendar,
  User,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  BookOpen,
  Award,
} from 'lucide-react'

const StdAttendanceAuth = () => {
  // Sample data for classes with students
  const sampleClasses = [
    {
      id: 1,
      std: '1',
      students: [
       {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ],
    },
     {
      id: 3,
      std: '2',
      students: [
       {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ],
    },
      {
      id: 3,
      std: '3',
      students: [
       {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ],
    },
      {
      id: 4,
      std: '4',
      students: [
       {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ],
    },
  ]

  // Sample attendance records
  const generateSampleAttendance = (studentId) => {
    const records = []
    const today = new Date()
    
    // Generate last 30 days of attendance
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      // Random attendance status with higher probability for present
      const random = Math.random()
      const status = random < 0.8 ? 'present' : 'absent'
      
      records.push({
        id: parseInt(`${studentId}${i}`),
        date: date.toISOString().split('T')[0],
        status: status,
        remarks: status === 'absent' ? 'Sick leave' : ''
      })
    }
    return records
  }

  // Sample academic years
  const sampleAcademicYears = [
    { id: 1, year: '2023-2024' },
    { id: 2, year: '2024-2025' },
    { id: 3, year: '2025-2026' }
  ]

  const [allClasses] = useState(sampleClasses)
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [academicYears] = useState(sampleAcademicYears)
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2') // Default to 2024-2025
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Helper function to get full image URL (now just returns the URL directly)
  const getImageUrl = (url) => url || '/default-avatar.png'

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = 'https://via.placeholder.com/150'
  }

  // Handle student selection
  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
    setError(null)
    
    // Simulate loading attendance data
    setLoading(true)
    setTimeout(() => {
      const records = generateSampleAttendance(student.id)
      setAttendanceRecords(records)
      setLoading(false)
    }, 500)
  }

  // Handle class selection
  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setSelectedStudent(null)
    setAttendanceRecords([])
  }

  // Handle academic year change
  const handleAcademicYearChange = (e) => {
    const yearId = e.target.value
    setSelectedAcademicYear(yearId)

    if (selectedStudent) {
      setLoading(true)
      setTimeout(() => {
        const records = generateSampleAttendance(selectedStudent.id)
        setAttendanceRecords(records)
        setLoading(false)
      }, 500)
    }
  }

  // Filter records by month
  const getFilteredRecords = () => {
    if (selectedMonth === 'all') return attendanceRecords

    return attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date)
      return recordDate.getMonth() + 1 === parseInt(selectedMonth)
    })
  }

  // Calculate statistics
  const calculateStats = (records) => {
    const total = records.length
    const present = records.filter((r) => r.status === 'present').length
    const absent = records.filter((r) => r.status === 'absent').length
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0

    return { total, present, absent, percentage }
  }

  const filteredRecords = getFilteredRecords()
  const stats = calculateStats(filteredRecords)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Check Student Attendance
                </h1>
                <p className="text-xs text-white/90">
                  Monitor and track student attendance records
                </p>
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
                  <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
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
              )}
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

        {/* Student Selection */}
        {selectedClass && !selectedStudent && (
          <div className="bg-white rounded-2xl shadow-lg p-4 mt-4 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs md:text-sm font-semibold text-blue-600">
                Students in Class {selectedClass.std}
              </h3>
              <span className="ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {selectedClass.students?.length || 0} Students
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
              {selectedClass.students?.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageUrl(student.image)}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                      onError={handleImageError}
                    />
                    <div className="flex-1">
                      <div className="text-xs md:text-sm font-medium text-gray-800">
                        {student.name}
                      </div>
                      {student.place && (
                        <div className="text-xs text-gray-600">
                          {student.place}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attendance Records */}
        {selectedStudent && (
          <div className="bg-white rounded-2xl shadow-lg p-2 mt-4 border border-gray-100">
            {/* Student Header */}
            <div className="flex items-center gap-4 mb-6 p-2 bg-gradient-to-r from-blue-600 to-purple-500 rounded-xl text-white">
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={getImageUrl(selectedStudent.image)}
                  alt={selectedStudent.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white"
                  onError={handleImageError}
                />
                <div>
                  <h3 className="text-xs md:text-lg font-bold">
                    {selectedStudent.name}
                  </h3>
                  <p className="opacity-90 text-xs md:text-sm">
                    Class {selectedClass.std}
                  </p>
                </div>
              </div>

              <button
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => {
                  setSelectedStudent(null)
                  setAttendanceRecords([])
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mb-6">
              {/* Academic Year */}
              <div className="space-y-1">
                <label className="text-center block text-xs md:text-sm font-medium text-blue-600">
                  Academic Year
                </label>
                <select
                  value={selectedAcademicYear}
                  onChange={handleAcademicYearChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm"
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month */}
              <div className="space-y-1">
                <label className="text-center block text-xs md:text-sm  font-medium text-blue-600">
                  Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm"
                >
                  <option value="all">All Months</option>
                  {monthNames.map((month, index) => (
                    <option key={index + 1} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Show message if no academic year is selected */}
            {!selectedAcademicYear && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-700 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Please select an academic year to view attendance records
                </p>
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Attendance Table */}
            {!loading && selectedAcademicYear && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-4 md:grid-cols-4 gap-1 mb-3">
                  {/* Present Card */}
                  <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl py-3 px-1 border border-green-100/50">
                    <span className="text-base md:text-3xl font-bold text-green-600">
                      {stats.present}
                    </span>
                    <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                      Present
                    </span>
                  </div>

                  {/* Absent Card */}
                  <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-red-50 to-rose-50/50 rounded-2xl py-3 px-1 border border-red-100/50">
                    <span className="text-base md:text-3xl font-bold text-red-600">
                      {stats.absent}
                    </span>
                    <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                      Absent
                    </span>
                  </div>

                  {/* Total Days Card */}
                  <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl py-3 px-1 border border-blue-100/50">
                    <span className="text-base md:text-3xl font-bold text-blue-600">
                      {stats.total}
                    </span>
                    <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                      Total Days
                    </span>
                  </div>

                  {/* Attendance Percentage Card */}
                  <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl py-3 px-1 border border-purple-100/50">
                    <span className="text-base md:text-3xl font-bold text-purple-600">
                      {stats.percentage}%
                    </span>
                    <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                      Attendance
                    </span>
                  </div>
                </div>

                {/* Attendance Table */}
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <div className="max-h-96 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Remarks
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredRecords.length > 0 ? (
                          filteredRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                                {new Date(record.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  },
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    record.status === 'present'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {record.status === 'present' ? (
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                  ) : (
                                    <XCircle className="w-3 h-3 mr-1" />
                                  )}
                                  {record.status.charAt(0).toUpperCase() +
                                    record.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {record.remarks || 'No remarks'}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="3"
                              className="px-6 py-12 text-center text-gray-500"
                            >
                              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                              No attendance records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default StdAttendanceAuth