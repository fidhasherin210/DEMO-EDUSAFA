import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import {
  Calendar,
  User,
  Clock,
  TrendingUp,
  Filter,
  CheckCircle,
  XCircle,
  BookOpen,
  Users,
  ChevronDown
} from 'lucide-react'

// Sample Data
const SAMPLE_ACADEMIC_YEARS = [
  { id: 1, year: "2023-2024", is_current: false },
  { id: 2, year: "2024-2025", is_current: true },
  { id: 3, year: "2025-2026", is_current: false }
]

const SAMPLE_ATTENDANCE_DATA = [
  { date: "2024-03-01", status: "Present" },
  { date: "2024-03-02", status: "Present" },
  { date: "2024-03-03", status: "Present" },
  { date: "2024-03-04", status: "Present" },
  { date: "2024-03-05", status: "Absent" },
  { date: "2024-03-06", status: "Present" },
  { date: "2024-03-07", status: "Present" },
  { date: "2024-03-08", status: "Present" },
  { date: "2024-03-09", status: "Absent" },
  { date: "2024-03-10", status: "Present" },
  { date: "2024-03-11", status: "Present" },
  { date: "2024-03-12", status: "Present" },
  { date: "2024-03-13", status: "Present" },
  { date: "2024-03-14", status: "Absent" },
  { date: "2024-03-15", status: "Present" },
  { date: "2024-03-16", status: "Present" },
  { date: "2024-03-17", status: "Absent" },
  { date: "2024-03-18", status: "Present" },
  { date: "2024-03-19", status: "Present" },
  { date: "2024-03-20", status: "Present" },
  { date: "2024-03-21", status: "Present" },
  { date: "2024-03-22", status: "Absent" },
  { date: "2024-03-23", status: "Present" },
  { date: "2024-03-24", status: "Present" },
  { date: "2024-03-25", status: "Present" },
  { date: "2024-03-26", status: "Present" },
  { date: "2024-03-27", status: "Present" },
  { date: "2024-03-28", status: "Present" },
  { date: "2024-03-29", status: "Absent" },
  { date: "2024-03-30", status: "Present" },
  { date: "2024-03-31", status: "Present" }
]

function TchrAttendanceTCH() {
  const currentDate = new Date()
  const currentMonth = (currentDate.getMonth() + 1).toString()
  
  const [attendance, setAttendance] = useState([])
  const [academicYears, setAcademicYears] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterLoading, setIsFilterLoading] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("")
  const [teacherInfo, setTeacherInfo] = useState(null)
  const [showScrollHint, setShowScrollHint] = useState(false)
  
  const tableContainerRef = useRef(null)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  const getDayName = (date) => {
    const day = new Date(date).getDay()
    const dayNames = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday",
    ]
    return dayNames[day]
  }

  // Format date for display
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  // Initialize with sample data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Set sample academic years
        setAcademicYears(SAMPLE_ACADEMIC_YEARS)
        
        // Set current academic year
        const current = SAMPLE_ACADEMIC_YEARS.find(year => year.is_current)
        if (current) {
          setSelectedAcademicYear(current.id.toString())
        }
        
        // Set sample attendance data
        setAttendance(SAMPLE_ATTENDANCE_DATA)
        setTeacherInfo({
          academic_year: "2024-2025",
          month: "March",
          count: SAMPLE_ATTENDANCE_DATA.length
        })
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Handle filter changes
  const handleAcademicYearChange = (e) => {
    const yearId = e.target.value
    setSelectedAcademicYear(yearId)
    
    // Simulate loading when changing filters
    setIsFilterLoading(true)
    setTimeout(() => {
      // Keep using sample data but could modify based on filters
      setAttendance(SAMPLE_ATTENDANCE_DATA)
      setIsFilterLoading(false)
    }, 500)
  }

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value)
    
    // Simulate loading when changing filters
    setIsFilterLoading(true)
    setTimeout(() => {
      setAttendance(SAMPLE_ATTENDANCE_DATA)
      setIsFilterLoading(false)
    }, 500)
  }

  // Filter attendance by month
  const filteredAttendance = useMemo(() => {
    if (selectedMonth && selectedMonth !== "all") {
      return attendance.filter((record) => {
        const recordDate = new Date(record.date)
        return recordDate.getMonth() + 1 === parseInt(selectedMonth)
      })
    }
    return attendance
  }, [attendance, selectedMonth])

  // Check if table needs scrolling and show hint
  useEffect(() => {
    if (tableContainerRef.current && filteredAttendance.length > 0) {
      const container = tableContainerRef.current
      const hasScroll = container.scrollHeight > container.clientHeight
      setShowScrollHint(hasScroll)
    }
  }, [filteredAttendance.length])

  // Calculate statistics
  const stats = useMemo(() => {
    const present = filteredAttendance.filter(
      (record) => record.status?.toLowerCase() === "present"
    ).length
    const absent = filteredAttendance.filter(
      (record) => record.status?.toLowerCase() === "absent"
    ).length
    const total = filteredAttendance.length
    const percentage = total > 0
      ? Math.round((present / total) * 100)
      : 0
    
    return { present, absent, total, percentage }
  }, [filteredAttendance])

  // Get current academic year display name
  const getCurrentAcademicYearName = () => {
    const year = academicYears.find(y => y.id.toString() === selectedAcademicYear)
    return year ? year.year : ''
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 px-6 py-3">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-sm animate-[bounce_0.8s_infinite] rotate-12" style={{ animationDelay: '0ms' }}></span>
              <span className="w-3 h-3 bg-blue-500 rounded-sm animate-[bounce_0.8s_infinite] -rotate-12" style={{ animationDelay: '200ms' }}></span>
              <span className="w-3 h-3 bg-purple-500 rounded-sm animate-[bounce_0.8s_infinite] rotate-12" style={{ animationDelay: '400ms' }}></span>
            </div>
            <span className="text-sm font-medium tracking-wide text-slate-600">LOADING</span>
            <div className="w-12 h-px bg-slate-200"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-1">
      {/* Header */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
        <div className="mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white md:text-xl">
                My Attendance
              </h1>
              <p className="text-xs text-white/90">View your daily and monthly attendance records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Records Section */}
      <div className="max-w-8xl mx-auto -mt-4 px-1">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Academic Year */}
            <div className="space-y-1">
              <label className="block text-xs md:text-sm font-medium text-blue-600 text-center">
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
                    {year.year} {year.is_current ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div className="space-y-1">
              <label className="block text-xs md:text-sm font-medium text-blue-600 text-center">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
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
        </div>

        {/* Show message if no academic year is selected */}
        {!selectedAcademicYear && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-700 text-xs md:text-sm flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Please select an academic year to view attendance records
            </p>
          </div>
        )}

        {/* Loading indicator */}
        {isFilterLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Attendance Content */}
        {!isFilterLoading && selectedAcademicYear && (
          <>
            {/* Summary Cards */}
            {filteredAttendance.length > 0 ? (
              <>
                <div className="grid grid-cols-4 gap-1 mb-4">
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

                {/* Table Info with Scroll Hint */}
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className="text-xs text-gray-500">
                    Showing {filteredAttendance.length} records
                  </span>
                  {showScrollHint && (
                    <span className="text-xs text-blue-600 flex items-center gap-1 animate-pulse">
                      <ChevronDown className="w-3 h-3" />
                      Scroll to see more
                      <ChevronDown className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Attendance Table with Scroll */}
                <div className="relative">
                  {/* Gradient fade at bottom to indicate scroll */}
                  {showScrollHint && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none z-10 rounded-b-lg"></div>
                  )}
                  
                  <div 
                    ref={tableContainerRef}
                    className="overflow-y-auto border border-gray-200 rounded-lg shadow-sm"
                    style={{ maxHeight: '400px' }}
                  >
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50 sticky top-0 z-20 shadow-sm">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            Day
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAttendance.map((record, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap text-[12px] md:text-sm text-gray-900">
                              {formatDisplayDate(record.date)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-[12px] md:text-sm text-gray-600">
                              {getDayName(record.date)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[13px] font-medium ${
                                  record.status?.toLowerCase() === "present"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {record.status?.toLowerCase() === "present" ? (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                ) : (
                                  <XCircle className="w-3 h-3 mr-1" />
                                )}
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Scroll Indicator Bar */}
                {showScrollHint && (
                  <div className="mt-2 flex justify-center">
                    <div className="w-10 h-1 bg-gray-300 rounded-full animate-bounce"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-900 mb-1">No Records Found</h3>
                <p className="text-xs text-gray-500">
                  No attendance records found for {getCurrentAcademicYearName()}
                  {selectedMonth && selectedMonth !== "all" && ` - ${monthNames[parseInt(selectedMonth) - 1]}`}.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default TchrAttendanceTCH