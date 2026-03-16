import React, { useEffect, useState, useCallback } from 'react'
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  User,
} from 'lucide-react'

const CheckTchrAttePrinci = () => {
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [yearlyRecords, setYearlyRecords] = useState([])
  const [academicYears, setAcademicYears] = useState([])
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('')
  const [latestAcademicYear, setLatestAcademicYear] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [loading, setLoading] = useState(false)
  const [yearlyLoading, setYearlyLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [attendance, setAttendance] = useState({})

  // Sample teachers data
  const sampleTeachers = [
    {
      id: 1,
      name: ". Abdul Rahman Al-Qasim",
      place: "Mathematics Department",
      image: "https://m.media-amazon.com/images/I/51Wz9iQFntL._AC_UY1100_.jpghttps://m.media-amazon.com/images/I/51Wz9iQFntL._AC_UY1100_.jpg"
    },
    {
      id: 2,
      name: "Muhammad Ibrahim",
      place: "Physics Department",
      image: "https://i.etsystatic.com/9507418/r/il/9670c1/1183312141/il_570xN.1183312141_mdvt.jpg"
    },
    {
      id: 3,
      name: "Hafiz Abdullah Khan",
      place: "English Literature",
      image: "https://static.vecteezy.com/system/resources/thumbnails/070/246/232/small/muslim-man-in-white-shirt-and-hat-with-hands-outstretched-photo.JPG"

    },
    {
      id: 4,
      name: "Dr. Omar Al-Mansouri",
      place: "History Department",
      image: "https://static.vecteezy.com/system/resources/previews/059/915/145/non_2x/a-muslim-man-with-a-beard-and-white-turban-free-png.png"
    },
    {
      id: 5,
      name: "Sheikh Hassan Ali",
      place: "Chemistry Department",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3Jhd3BpeGVsb2ZmaWNlMTJfbXVzbGltX21hbl91c2luZ19pcGFkX2xvb2tfYXRfY2FtZXJhX2hhcHB5X2lzb18xNjJmNWE0Yy1hZjJjLTQzMDQtYTQ4MC1hYjI2YzcwZGM0ZGEucG5n.png"
    },
    {
      id: 6,
      name: "Yusuf Ahmed",
      place: "Computer Science",
      image: "https://image.made-in-china.com/202f0j00KeLiuPDRgrzm/Muslim-Arabic-Dubai-Saudi-Arabia-Men-Turban.webp"
    }
  ]

  // Sample academic years
  const sampleAcademicYears = [
    { id: 1, year: "2023-2024" },
    { id: 2, year: "2024-2025" },
    { id: 3, year: "2025-2026" }
  ]

  // Generate sample attendance records
  const generateSampleAttendance = (teacherId, yearId, month) => {
    const records = []
    const year = yearId === 2 ? 2024 : 2025
    const monthNum = month === 'all' ? 3 : parseInt(month) // Default to March for demo
    
    // Generate 20-25 days of attendance for the month
    const daysInMonth = monthNum === 2 ? 28 : 30
    for (let day = 1; day <= daysInMonth; day++) {
      // Skip weekends (Saturdays and Sundays) for more realistic data
      const date = new Date(year, monthNum - 1, day)
      const dayOfWeek = date.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) continue

      // Random status with 80% chance of present
      const status = Math.random() < 0.8 ? 'present' : 'absent'
      
      records.push({
        id: records.length + 1,
        date: `${year}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        status: status,
        teacher: teacherId
      })
    }
    return records
  }

  // Sample yearly records for summary
  const generateYearlySummary = (teacherId) => {
    const records = []
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    
    months.forEach(month => {
      const daysInMonth = month === 2 ? 28 : 30
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(2024, month - 1, day)
        const dayOfWeek = date.getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) continue
        
        const status = Math.random() < 0.85 ? 'present' : 'absent'
        records.push({
          id: records.length + 1,
          date: `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          status: status,
          teacher: teacherId
        })
      }
    })
    return records
  }

  const fetchTeachers = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))

      setTeachers(sampleTeachers)
      setAttendance({})
    } catch (error) {
      console.error('Error fetching teachers:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTeachers()
  }, [fetchTeachers])

  const calculateAttendanceSummary = (records) => {
    const totalPresent = records.filter((r) => r.status === 'present').length
    const totalAbsent = records.filter((r) => r.status === 'absent').length
    const totalWorkingDays = records.length

    return { totalPresent, totalAbsent, totalWorkingDays }
  }

  // Fetch academic years
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const years = sampleAcademicYears
        setAcademicYears(years)

        // Find latest academic year
        if (years.length > 0) {
          const latestYear = years.reduce((latest, current) =>
            current.id > latest.id ? current : latest,
          )
          setLatestAcademicYear(latestYear)
          setSelectedAcademicYear(latestYear.id.toString())
        }
      } catch (error) {
        console.log('Failed to load academic years:', error)
        setError('Failed to load academic years')
      }
    }

    fetchAcademicYears()
  }, [])

  // Fetch monthly/yearly attendance based on view
  useEffect(() => {
    const fetchAttendance = async () => {
      if (selectedTeacher && selectedAcademicYear) {
        setLoading(true)
        setError(null)

        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 600))

          // Generate sample data
          const attendanceData = generateSampleAttendance(
            selectedTeacher, 
            parseInt(selectedAcademicYear), 
            selectedMonth
          )

          setAttendanceRecords(attendanceData)
        } catch (error) {
          console.error('Error fetching attendance records:', error)
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchAttendance()
  }, [selectedTeacher, selectedAcademicYear, selectedMonth])

  // Separate effect for yearly summary (without month filter)
  useEffect(() => {
    const fetchYearlyAttendance = async () => {
      if (selectedTeacher && selectedAcademicYear) {
        setYearlyLoading(true)
        setError(null)

        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 400))

          // Generate yearly summary data
          const yearlyData = generateYearlySummary(selectedTeacher)

          setYearlyRecords(yearlyData)
        } catch (error) {
          console.error('Error fetching yearly attendance records:', error)
          setError(error.message)
        } finally {
          setYearlyLoading(false)
        }
      }
    }

    fetchYearlyAttendance()
  }, [selectedTeacher, selectedAcademicYear])

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeacher(teacherId)
    setAttendanceRecords([])
    setYearlyRecords([])
    setError(null)
  }

  const handleAcademicYearChange = (event) => {
    setSelectedAcademicYear(event.target.value)
    setError(null)
  }

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value)
    setError(null)
  }

  const { totalPresent, totalAbsent, totalWorkingDays } =
    calculateAttendanceSummary(attendanceRecords)

  const {
    totalPresent: yearlyPresent,
    totalAbsent: yearlyAbsent,
    totalWorkingDays: yearlyWorkingDays,
  } = calculateAttendanceSummary(yearlyRecords)

  const getImageUrl = (url) => {
    if (!url) return '/default-avatar.png'
    return url // URLs are already complete from sample data
  }

  // Show error message if any
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error: {error}</p>
          <button
            onClick={() => {
              setError(null)
              fetchTeachers()
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto max-w-8xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Check Teachers Attendance
                </h1>
                <p className="text-xs text-white/90">
                  Monitor and track attendance records
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mx-auto mt-3">
          <div className="grid grid-cols-1  gap-8 mb-8">
            {/* Modern Teacher Selection Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              {/* Card Header with Gradient */}

              {/* Teacher List with Stats */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-3 w-3 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Loading teachers...
                  </p>
                </div>
              ) : (
                <>
                  {/* Teacher Count Badge */}
                  <div className="px-2 pt-3 flex justify-between items-center">
                    <span className="text-xs ms-3 font-medium text-gray-500 uppercase tracking-wider">
                      Available Teachers
                    </span>
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {teachers.length} Total
                    </span>
                  </div>

                  {/* Teacher Cards Grid */}
                  <div className="p-4 max-h-[480px] overflow-y-auto custom-scrollbar">
                    {teachers.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2">
                        {teachers.map((teacher) => (
                          <button
                            key={teacher.id}
                            onClick={() => handleTeacherSelect(teacher.id)}
                            className={`w-full flex items-center gap-4 p-2 rounded-xl border transition-all duration-200 ${
                              selectedTeacher === teacher.id
                                ? 'border-blue-600 bg-blue-50 shadow-sm'
                                : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-sm'
                            }`}
                          >
                            {/* Avatar */}
                            <div className="relative">
                              <img
                                src={getImageUrl(teacher.image)}
                                alt={teacher.name}
                                className="w-14 h-14 rounded-full object-cover border border-gray-300"
                                onError={(e) => {
                                  e.target.onerror = null
                                  e.target.src = '/default-avatar.png'
                                }}
                              />

                              {selectedTeacher === teacher.id && (
                                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>

                            {/* Teacher Info */}
                            <div className="flex-1 text-left">
                              <h3
                                className={`text-sm font-semibold ${
                                  selectedTeacher === teacher.id
                                    ? 'text-blue-700'
                                    : 'text-gray-800'
                                }`}
                              >
                                {teacher.name}
                              </h3>

                              {teacher.place && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {teacher.place}
                                </p>
                              )}
                            </div>

                            {/* Right Side Indicator */}
                            <div>
                              <svg
                                className={`h-5 w-5 transition ${
                                  selectedTeacher === teacher.id
                                    ? 'text-blue-600'
                                    : 'text-gray-400'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="p-4 bg-gray-50 rounded-full mb-3">
                          <User className="h-12 w-12 text-gray-300" />
                        </div>
                        <p className="text-gray-500 font-medium">
                          No teachers found
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Check back later or refresh
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Quick Actions Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                      Selected
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Teacher Attendance Records */}
          {selectedTeacher && (
            <div className="bg-white rounded-2xl shadow-lg px-5 py-5 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xs md:text-lg font-semibold text-blue-600">
                    Attendance Records for <br />
                    {teachers.find((t) => t.id === selectedTeacher)?.name}
                  </h2>
                  <p className="text-gray-600 text-xs">
                    View detailed attendance history
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Academic Year */}
                <div className="flex-1 space-y-1 sm:space-y-2">
                  <label
                    htmlFor="academicYear"
                    className="block text-xs sm:text-sm font-medium text-gray-700"
                  >
                    Academic Year
                  </label>
                  <select
                    id="academicYear"
                    value={selectedAcademicYear}
                    onChange={handleAcademicYearChange}
                    className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm sm:text-base"
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.year}
                        {latestAcademicYear &&
                          year.id === latestAcademicYear.id &&
                          ' (Latest)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">
                    Select Month
                  </label>
                  <select
                    className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                  >
                    <option value="all">All Months</option>
                    {[
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
                    ].map((month, index) => (
                      <option key={index} value={index + 1}>
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
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              )}

              {/* Attendance Table - Only show if academic year is selected */}
              {selectedAcademicYear && !loading && (
                <>
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg mb-6">
                    <div className="max-h-90 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {attendanceRecords.length > 0 ? (
                            attendanceRecords.map((record, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(record.date).toLocaleDateString(
                                    'en-US',
                                    {
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
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                    ) : (
                                      <XCircle className="h-3 w-3 mr-1" />
                                    )}
                                    {record.status.charAt(0).toUpperCase() +
                                      record.status.slice(1)}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="2"
                                className="px-6 py-12 text-center text-gray-500"
                              >
                                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                No attendance records found for the selected
                                academic year and month.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                      <h3 className="text-xs md:text-base font-semibold text-gray-900 mb-3 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                        {selectedMonth === 'all'
                          ? 'Academic Year'
                          : 'Monthly'}{' '}
                        Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-xs md:text-sm text-gray-600">
                            Present Days:
                          </span>
                          <span className="font-semibold text-green-600">
                            {totalPresent}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs md:text-sm text-gray-600">
                            Absent Days:
                          </span>
                          <span className="font-semibold text-red-600">
                            {totalAbsent}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs md:text-sm text-gray-600">
                            Total Days:
                          </span>
                          <span className="font-semibold text-gray-900">
                            {totalWorkingDays}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                      <h3 className="text-xs md:text-base font-semibold text-gray-900 mb-3 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-purple-600" />
                        Academic Year Summary
                      </h3>
                      {yearlyLoading ? (
                        <div className="flex items-center justify-center py-6">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                          <p className="ml-2 text-sm text-gray-600">
                            Calculating...
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-xs md:text-sm text-gray-600">
                              Present Days:
                            </span>
                            <span className="font-semibold text-green-600">
                              {yearlyPresent}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs md:text-sm text-gray-600">
                              Absent Days:
                            </span>
                            <span className="font-semibold text-red-600">
                              {yearlyAbsent}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs md:text-sm text-gray-600">
                              Total Days:
                            </span>
                            <span className="font-semibold text-gray-900">
                              {yearlyWorkingDays}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckTchrAttePrinci