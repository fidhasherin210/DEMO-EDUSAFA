import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import {
  Users,
  Calendar,
  UserCheck,
  UserX,
  School,
  ChevronDown,
} from 'lucide-react'

function STDAttendancePie() {
  const [attendance, setAttendance] = useState(null)
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [totalPresent, setTotalPresent] = useState(0)
  const [totalAbsent, setTotalAbsent] = useState(0)
  const [error, setError] = useState(null)
  const [fetchingClassData, setFetchingClassData] = useState(false)
  const [initialLoadDone, setInitialLoadDone] = useState(false)

  // Sample classes data
  const sampleClasses = [
    { id: 1, std: '1', total_students: 10 },
    { id: 2, std: '2', total_students: 9 },
    { id: 3, std: '3', total_students: 11 },
    { id: 4, std: '4', total_students: 12 },
    { id: 5, std: '5', total_students: 8 },
    { id: 6, std: '6', total_students: 13 },
    { id: 7, std: '7', total_students: 7 },
    { id: 8, std: '8', total_students: 10 },
    { id: 9, std: '9', total_students: 9 },
    { id: 10, std: '10', total_students: 11 },
    
  ]

  // Sample attendance data for each class
  const sampleAttendanceData = {
    1: { present: 8, absent: 2, present_percentage: 80, absent_percentage: 20 },
    2: { present: 6, absent: 3, present_percentage: 78.1, absent_percentage: 21.9 },
    3: { present: 10, absent: 1, present_percentage: 84.2, absent_percentage: 15.8 },
    4: { present: 7, absent: 5, present_percentage: 79.4, absent_percentage: 20.6 },
    5: { present: 7, absent: 1, present_percentage: 80.6, absent_percentage: 19.4 },
    6: { present: 13, absent: 0, present_percentage: 78.8, absent_percentage: 21.2 },
    7: { present: 6, absent: 1, present_percentage: 83.8, absent_percentage: 16.2 },
    8: { present: 8, absent: 2, present_percentage: 80, absent_percentage: 20 },
    9: { present: 7, absent: 2, present_percentage: 85, absent_percentage: 15 },
    10: { present: 11, absent: 0, present_percentage: 81.6, absent_percentage: 18.4 },
    
  }

  // Format today's date
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  // Set sample classes on component mount
  useEffect(() => {
    setClasses(sampleClasses)
    setError(null)
  }, [])

  // Set sample total attendance on component mount
  useEffect(() => {
    // Calculate total present and absent from sample data
    let totalPresentCount = 0
    let totalAbsentCount = 0
    
    Object.values(sampleAttendanceData).forEach(data => {
      totalPresentCount += data.present
      totalAbsentCount += data.absent
    })
    
    setTotalPresent(totalPresentCount)
    setTotalAbsent(totalAbsentCount)
  }, [])

  // Fetch class-wise attendance when class is selected
  const fetchClassAttendance = (classId) => {
    if (!classId) {
      setAttendance(null)
      return
    }

    setFetchingClassData(true)
    
    // Simulate API delay
    setTimeout(() => {
      try {
        const classData = sampleAttendanceData[classId]
        
        if (classData) {
          setAttendance({
            present: classData.present,
            absent: classData.absent,
            present_percentage: classData.present_percentage,
            absent_percentage: classData.absent_percentage,
            attendance_marked: true,
            date: formattedDate,
          })
          setError(null)
        } else {
          setAttendance({
            present: 0,
            absent: 0,
            present_percentage: 0,
            absent_percentage: 0,
            attendance_marked: false,
            date: formattedDate,
          })
        }
      } catch (error) {
        console.error('Failed to fetch class attendance:', error)
        setAttendance(null)
        setError('Failed to load attendance data for selected class')
      } finally {
        setFetchingClassData(false)
        setLoading(false)
        setInitialLoadDone(true)
      }
    }, 500) // 500ms delay to simulate API call
  }

  // Set default class when classes are loaded
  useEffect(() => {
    if (classes.length > 0 && !selectedClass && !initialLoadDone) {
      const firstClassId = classes[0].id
      setSelectedClass(firstClassId)
      setLoading(true)
      fetchClassAttendance(firstClassId)
    }
  }, [classes, selectedClass, initialLoadDone])

  // Handle class selection
  const handleClassChange = (event) => {
    const classId = parseInt(event.target.value)
    setSelectedClass(classId)

    if (classId) {
      setLoading(true)
      fetchClassAttendance(classId)
    } else {
      setAttendance(null)
    }
  }

  // Show loading state
  if (loading && selectedClass) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
          <School className="w-5 h-5 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Loading class attendance...
        </p>
      </div>
    )
  }

  // Calculate percentages
  const presentPercent = attendance?.present_percentage || 0
  const absentPercent = attendance?.absent_percentage || 0

  // Prepare data for Recharts Pie
  const pieData = [
    { name: 'Present', value: attendance?.present || 0 },
    { name: 'Absent', value: attendance?.absent || 0 }
  ]

  // No class selected view
  const NoClassSelectedView = () => (
    <div className="flex-1 flex flex-col items-center justify-center py-8">
      <School className="w-12 h-12 text-gray-300 mb-3" />
      <p className="text-sm text-gray-500 font-medium">No Class Selected</p>
      <p className="text-xs text-gray-400 mt-1">
        Please select a class to view attendance
      </p>
    </div>
  )

  return (
    <div className="h-full w-full p-3 md:p-6 flex flex-col bg-white rounded-2xl shadow-sm">
      {/* Header with dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div>
            <h3 className="text-xs md:text-base font-semibold text-gray-700">
              Class Wise Attendance
            </h3>
            <p className="text-[9px] md:text-[12px] text-gray-400">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Class Dropdown */}
        <div className="relative min-w-[180px]">
          <div className="relative">
            <select
              id="classSelect"
              value={selectedClass}
              onChange={handleClassChange}
              disabled={fetchingClassData}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2.5 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                       hover:border-emerald-300 transition-all duration-200 cursor-pointer
                       shadow-sm hover:shadow disabled:bg-gray-50 disabled:cursor-wait"
            >
              <option value="" className="text-gray-500">
                Select a Class
              </option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id} className="py-2">
                  Class {cls.std}
                </option>
              ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {!selectedClass ? (
        <NoClassSelectedView />
      ) : !attendance ? (
        <div className="flex-1 flex flex-col items-center justify-center py-8 text-gray-400">
          <Users className="w-10 h-10 mb-2" />
          <p className="text-xs">No attendance data available</p>
        </div>
      ) : (
        <>
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Donut Chart with Recharts - Soft Colors */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 ">
              {attendance.present === 0 && attendance.absent === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Calendar className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-[13px] md:text-xs text-gray-400">
                    No attendance marked
                  </p>
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        {/* Soft gradients */}
                        <linearGradient id="presentGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#0db857" />
                          <stop offset="100%" stopColor="#0ba14c" />
                        </linearGradient>
                        <linearGradient id="absentGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#e81313" />
                          <stop offset="100%" stopColor="#d40b0b" />
                        </linearGradient>
                      </defs>

                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="95%"
                        paddingAngle={3}
                        dataKey="value"
                        stroke="white"
                        strokeWidth={1.5}
                        cornerRadius={6}
                        startAngle={90}
                        endAngle={-270}
                        animationDuration={800}
                        animationEasing="ease"
                        isAnimationActive={true}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? 'url(#presentGradient)' : 'url(#absentGradient)'}
                            style={{
                              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.08))',
                            }}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Center Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl md:text-2xl font-bold text-gray-800">
                      {Math.round(presentPercent)}%
                    </span>
                    <span className="text-[8px] md:text-[14px] text-gray-500 -mt-1">
                      present
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Stats Cards */}
            <div className="w-full grid grid-cols-2 gap-2 ">
              {/* Present Card */}
              <div className="relative group p-2">
                <div className="absolute inset-0 bg-emerald-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                <div className="relative bg-white border border-emerald-100 rounded-xl p-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                  <div className="absolute top-0 left-2 right-2 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"></div>

                  <div className="flex items-center justify-between mb-0.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[9px] md:text-xs font-medium text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-full">
                      PRESENT
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold text-emerald-700 leading-none">
                        {attendance.present || 0}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">
                        Present Today
                      </p>
                    </div>

                    <div className="relative w-8 h-8">
                      <svg className="w-8 h-8 transform -rotate-90">
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="2"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="#4ade80"
                          strokeWidth="2"
                          strokeDasharray={`${2 * Math.PI * 14}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 14 * (1 - presentPercent / 100)
                          }`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-emerald-600">
                        {Math.round(presentPercent)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Absent Card */}
              <div className="relative group p-2">
                <div className="absolute inset-0 bg-red-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                <div className="relative bg-white border border-red-100 rounded-xl p-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                  <div className="absolute top-0 left-2 right-2 h-0.5 bg-gradient-to-r from-red-400 to-red-300 rounded-full"></div>

                  <div className="flex items-center justify-between mb-0.5">
                    <UserX className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-[9px] md:text-xs font-medium text-red-600 bg-red-50 px-1 py-0.5 rounded-full">
                      ABSENT
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold text-red-700 leading-none">
                        {attendance.absent || 0}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">
                        Absent Today
                      </p>
                    </div>

                    <div className="relative w-8 h-8">
                      <svg className="w-8 h-8 transform -rotate-90">
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="2"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="#f87171"
                          strokeWidth="2"
                          strokeDasharray={`${2 * Math.PI * 14}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 14 * (1 - absentPercent / 100)
                          }`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-red-600">
                        {Math.round(absentPercent)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Overall Summary Footer */}
      <div className="pt-2 border-t border-gray-200">
        {/* Title */}
        <div className="text-center mb-2">
          <p className="text-xs text-gray-400">
            Overall Madrasa Attendance for Today
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-3">
          {/* Present */}
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
            <Users className="w-3.5 h-3.5 text-green-600" />
            <span className="text-xs text-green-600">Present</span>
            <span className="text-xs font-semibold text-green-600">
              {totalPresent}
            </span>
          </div>

          {/* Absent */}
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full">
            <Users className="w-3.5 h-3.5 text-red-500" />
            <span className="text-xs text-red-500">Absent</span>
            <span className="text-xs font-semibold text-red-500">
              {totalAbsent}
            </span>
          </div>
        </div>
      </div>

      {/* Error message if any */}
      {error && (
        <div className="mt-2 text-[10px] text-red-500 text-center">{error}</div>
      )}
    </div>
  )
}

export default STDAttendancePie