import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import {
  Users,
  Calendar,
  TrendingUp,
  UserCheck,
  UserX,
  School,
} from 'lucide-react'

function AttendancePie({ studentId }) {
  const [attendance, setAttendance] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Sample attendance data for different student IDs
  const sampleAttendanceData = {
    // Student ID: 101 (Aarav Sharma)
    101: {
      total_present: 85,
      total_absent: 15,
      present_percentage: 85,
      absent_percentage: 15,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 102 (Diya Patel)
    102: {
      total_present: 92,
      total_absent: 8,
      present_percentage: 92,
      absent_percentage: 8,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 103 (Vihaan Kumar)
    103: {
      total_present: 78,
      total_absent: 22,
      present_percentage: 78,
      absent_percentage: 22,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 201 (Ananya Singh)
    201: {
      total_present: 88,
      total_absent: 12,
      present_percentage: 88,
      absent_percentage: 12,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 202 (Arjun Nair)
    202: {
      total_present: 95,
      total_absent: 5,
      present_percentage: 95,
      absent_percentage: 5,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 301 (Meera Krishna)
    301: {
      total_present: 82,
      total_absent: 18,
      present_percentage: 82,
      absent_percentage: 18,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 302 (Reyansh Gupta)
    302: {
      total_present: 76,
      total_absent: 24,
      present_percentage: 76,
      absent_percentage: 24,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 303 (Saanvi Reddy)
    303: {
      total_present: 90,
      total_absent: 10,
      present_percentage: 90,
      absent_percentage: 10,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 401 (Kabir Singh)
    401: {
      total_present: 84,
      total_absent: 16,
      present_percentage: 84,
      absent_percentage: 16,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 402 (Myra Kapoor)
    402: {
      total_present: 91,
      total_absent: 9,
      present_percentage: 91,
      absent_percentage: 9,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 501 (Ishaan Malhotra)
    501: {
      total_present: 79,
      total_absent: 21,
      present_percentage: 79,
      absent_percentage: 21,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Student ID: 502 (Aadhya Krishnan)
    502: {
      total_present: 93,
      total_absent: 7,
      present_percentage: 93,
      absent_percentage: 7,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: true
    },
    // Test case: Attendance not marked yet
    999: {
      total_present: 0,
      total_absent: 0,
      present_percentage: 0,
      absent_percentage: 0,
      date: 'Mon, 15 Mar 2024',
      attendance_marked: false
    }
  }

  useEffect(() => {
    const fetchAttendance = () => {
      if (!studentId) {
        setError('No student selected')
        setLoading(false)
        return
      }

      setLoading(true)
      
      // Simulate API delay
      setTimeout(() => {
        const data = sampleAttendanceData[studentId] || {
          total_present: 87,
          total_absent: 13,
          present_percentage: 87,
          absent_percentage: 13,
          date: 'Mon, 15 Mar 2024',
          attendance_marked: true
        }
        
        setAttendance(data)
        setError(null)
        setLoading(false)
      }, 800)
    }

    fetchAttendance()
  }, [studentId])

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
          <School className="w-5 h-5 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-xs text-gray-400 mt-3">Loading attendance...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <Users className="w-10 h-10 mb-2" />
        <p className="text-xs">{error}</p>
      </div>
    )
  }

  // No data state
  if (!attendance) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <Users className="w-10 h-10 mb-2" />
        <p className="text-xs">No data available</p>
      </div>
    )
  }

  // Calculate percentages
  const total = (attendance.total_present || 0) + (attendance.total_absent || 0)
  const presentPercent =
    attendance.present_percentage ||
    Math.round(((attendance.total_present || 0) / total) * 100) ||
    0
  const absentPercent =
    attendance.absent_percentage ||
    Math.round(((attendance.total_absent || 0) / total) * 100) ||
    0

  // Prepare data for Recharts Pie
  const pieData = [
    { name: 'Present', value: attendance.total_present || 0 },
    { name: 'Absent', value: attendance.total_absent || 0 }
  ]

  // Animation component when attendance not marked yet
  const AttendanceUpdateAnimation = () => (
    <div className="flex flex-col items-center justify-center h-40">
      <div className="relative mb-3">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center shadow-lg">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-white rounded-full animate-pulse"></div>
      </div>
      <p className="text-xs font-medium text-gray-600">Not marked yet</p>
      <p className="text-[9px] text-gray-400">Will update soon</p>
    </div>
  )

  return (
    <div className="h-full w-full p-3 md:p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div>
            <h3 className="text-xs md:text-base font-semibold text-gray-700">
              Attendance Summary
            </h3>
            <p className="text-[9px] md:text-[10px] text-gray-400">
              {attendance.date || 'Mon, 15 Feb'}
            </p>
          </div>
        </div>
        {/* You can add a "Live" indicator if needed */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Donut Chart with Recharts - Soft Colors */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 mb-3">
          {attendance.attendance_marked === false ? (
            <AttendanceUpdateAnimation />
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {/* Soft gradients */}
                    <linearGradient id="presentGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#86efac" />
                    </linearGradient>
                    <linearGradient id="absentGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="100%" stopColor="#fca5a5" />
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
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl md:text-2xl font-bold text-gray-800">
                  {presentPercent}%
                </span>
                <span className="text-[13px] md:text-sm text-gray-500 -mt-1">
                  present
                </span>
              </div>
            </>
          )}
        </div>

        {/* Stats Cards */}
        <div className="w-full grid grid-cols-2 mt-2">
          {/* Present Card */}
          <div className="relative group p-2">
            <div className="absolute inset-0 bg-emerald-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative bg-white border border-emerald-100 rounded-xl p-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="absolute top-0 left-2 right-2 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"></div>
              <div className="flex items-center justify-between mb-0.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] md:text-xs font-medium text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-full">
                  PRESENT
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl md:text-2xl font-bold text-emerald-700 leading-none">
                    {attendance.total_present || 0}
                  </p>
                  <p className="text-[12px] md:text-xs text-gray-400 mt-0.5">
                    Present Days
                  </p>
                </div>
                <div className="w-8 h-8">
                  <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />

                    {/* Progress circle - soft green */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2"
                      strokeDasharray={2 * Math.PI * 15}
                      strokeDashoffset={
                        2 * Math.PI * 15 * (1 - presentPercent / 100)
                      }
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />

                    {/* Center text */}
                    <text
                      x="18"
                      y="18"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-emerald-600 text-[6px] font-bold rotate-90 origin-center"
                    >
                      {presentPercent}%
                    </text>
                  </svg>
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
                <span className="text-[10px] md:text-xs font-medium text-red-600 bg-red-50 px-1 py-0.5 rounded-full">
                  ABSENT
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl md:text-2xl font-bold text-red-700 leading-none">
                    {attendance.total_absent || 0}
                  </p>
                  <p className="text-[12px] md:text-xs text-gray-400 mt-0.5">
                    Absent Days
                  </p>
                </div>
                <div className="w-8 h-8">
                  <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />

                    {/* Progress circle - soft red */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="2"
                      strokeDasharray={2 * Math.PI * 15}
                      strokeDashoffset={
                        2 * Math.PI * 15 * (1 - absentPercent / 100)
                      }
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />

                    {/* Center text */}
                    <text
                      x="18"
                      y="18"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-red-600 text-[6px] font-bold rotate-90 origin-center"
                    >
                      {absentPercent}%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 pt-1.5 border-t border-gray-100 flex items-center justify-between text-[8px] md:text-[9px]">
        <div className="flex items-center gap-1.5 text-gray-500">
          <Users className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-xs md:text-sm">
            Total Working Days:{' '}
            <span className="text-xs md:text-sm font-semibold text-gray-700">
              {total}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1 bg-emerald-50 px-5 py-0.5 rounded-full">
          <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
          <span className="text-emerald-600 font-medium text-[10px] md:text-sm">
            {presentPercent}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default AttendancePie