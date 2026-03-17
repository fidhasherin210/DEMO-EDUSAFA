import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  User,
} from 'lucide-react'

function MarkTchrAtte() {
  const [teachers, setTeachers] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [attendance, setAttendance] = useState({})
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Sample teacher data with Muslim names
  const sampleTeachers = [
{
  id:1,
    name: " Yusuf Ahmed",
    place: "Kozhikode",
    phone_no: "+60 12 678 9012",
    islamic_qualification: "PhD in Hadith Studies - International Islamic University",
    academic_qualification: "M.Sc in Mathematics",
    image: "https://image.made-in-china.com/202f0j00KeLiuPDRgrzm/Muslim-Arabic-Dubai-Saudi-Arabia-Men-Turban.webp"
  },
 
  {
    id:2,
    name: "Hafiz Abdullah ",
    place: "Malappuram",
    phone_no: "+92 300 345 6789",
    islamic_qualification: "Hafiz-ul-Quran, Sanad in Tajweed",
    academic_qualification: "M.Sc in Computer Science",
    image: "https://static.vecteezy.com/system/resources/thumbnails/070/246/232/small/muslim-man-in-white-shirt-and-hat-with-hands-outstretched-photo.JPG"
  },
 
  {
    id:3,
    name: "Hassan Ali",
    place: "Malappuram",
    phone_no: "+90 533 567 8901",
    islamic_qualification: "Ijazah in Qira'at, Advanced Tafsir",
    academic_qualification: "BA in History",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3Jhd3BpeGVsb2ZmaWNlMTJfbXVzbGltX21hbl91c2luZ19pcGFkX2xvb2tfYXRfY2FtZXJhX2hhcHB5X2lzb18xNjJmNWE0Yy1hZjJjLTQzMDQtYTQ4MC1hYjI2YzcwZGM0ZGEucG5n.png"
  },
  ]

  // Sample attendance records for different dates
  const sampleAttendanceRecords = {
    "2024-01-15": {
      1: 'present',
      2: 'present',
      3: 'absent',
      4: 'present',
      5: 'present',
      6: 'absent',
      7: 'present',
      8: 'present',
      9: 'absent',
      10: 'present'
    },
    "2024-01-16": {
      1: 'present',
      2: 'present',
      3: 'present',
      4: 'present',
      5: 'absent',
      6: 'present',
      7: 'absent',
      8: 'present',
      9: 'present',
      10: 'absent'
    },
    "2024-01-17": {
      1: 'absent',
      2: 'present',
      3: 'present',
      4: 'absent',
      5: 'present',
      6: 'present',
      7: 'present',
      8: 'absent',
      9: 'present',
      10: 'present'
    },
    "2024-01-18": {
      1: 'present',
      2: 'absent',
      3: 'present',
      4: 'present',
      5: 'present',
      6: 'present',
      7: 'absent',
      8: 'present',
      9: 'present',
      10: 'absent'
    },
    "2024-01-19": {
      1: 'present',
      2: 'present',
      3: 'present',
      4: 'present',
      5: 'present',
      6: 'present',
      7: 'present',
      8: 'present',
      9: 'present',
      10: 'present'
    }
  }

  // Load teachers on component mount
  useEffect(() => {
    const loadTeachers = () => {
      setIsLoading(true)
      
      // Simulate API delay
      setTimeout(() => {
        setTeachers(sampleTeachers)
        
        // Set default attendance as absent for all teachers
        const defaultAttendance = sampleTeachers.reduce((acc, teacher) => {
          acc[teacher.id] = 'absent'
          return acc
        }, {})
        setAttendance(defaultAttendance)
        setIsLoading(false)
      }, 500)
    }

    loadTeachers()
    
    // Set current date
    const currentDate = new Date().toISOString().split('T')[0]
    setSelectedDate(currentDate)
  }, [])

  // Load attendance when date changes
  useEffect(() => {
    if (!selectedDate || teachers.length === 0) return

    const loadAttendanceForDate = () => {
      setIsLoading(true)
      
      // Simulate API delay
      setTimeout(() => {
        // Check if we have attendance records for this date
        const dateAttendance = sampleAttendanceRecords[selectedDate]
        
        if (dateAttendance) {
          // Set attendance from sample records
          setAttendance(dateAttendance)
          setMessage('')
        } else {
          // If no records for this date, set all as absent
          const defaultAttendance = teachers.reduce((acc, teacher) => {
            acc[teacher.id] = 'absent'
            return acc
          }, {})
          setAttendance(defaultAttendance)
          setMessage('No attendance records found for this date')
        }
        
        setIsLoading(false)
      }, 500)
    }

    loadAttendanceForDate()
  }, [selectedDate, teachers])

  const handleAttendanceChange = (teacherId, status) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [teacherId]: status,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage for persistence (optional)
      const attendanceHistory = JSON.parse(localStorage.getItem('teacherAttendance') || '{}')
      attendanceHistory[selectedDate] = attendance
      localStorage.setItem('teacherAttendance', JSON.stringify(attendanceHistory))
      
      setMessage('Attendance marked successfully.')
      setIsLoading(false)
    }, 500)
  }

  const presentCount = Object.values(attendance).filter(
    (status) => status === 'present',
  ).length
  const absentCount = teachers.length - presentCount

  const getImageUrl = (url) => {
    return url
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className=" mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Mark Teacher Attendance
                </h1>
                <p className="text-xs text-white/90">
                  Mark Teachers Daily Attendance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="p-1">
              <div className="mx-auto -mt-3 max-w-8xl">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
                  <div className="p-6 md:p-8 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-blue-600 mb-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          Select Date
                        </label>

                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         hover:border-blue-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4 px-2 bg-white rounded-2xl mt-2 shadow-lg">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 mb-8 mt-4">
                {/* Teachers */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 sm:p-4 md:p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="ml-1 mt-2">
                      <p className="text-gray-600 text-[12px] sm:text-sm font-medium text-center">
                        Total Teachers
                      </p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
                        {teachers.length}
                      </p>
                    </div>
                    <div className="  flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Present */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 sm:p-4 md:p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="ml-1 mt-2">
                      <p className="text-gray-600 text-[12px] sm:text-sm font-medium text-center">
                        Total Present
                      </p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 text-center">
                        {presentCount}
                      </p>
                    </div>
                    <div className="w-10 h-5 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                {/* Absent */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 sm:p-4 md:p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="ml-1 mt-2">
                      <p className="text-gray-600 text-[12px] sm:text-sm font-medium text-center">
                        Total Absent
                      </p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 text-center">
                        {absentCount}
                      </p>
                    </div>
                    <div className="w-8 h-5 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Teachers List */}
              <div className=" mt-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-4 text-gray-600">
                      Loading teachers...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xs md:text-lg font-semibold text-blue-600 mb-4 text-center">
                      Mark Attendance ({teachers.length} Teachers)
                    </h3>

                    <div className="grid gap-2 p-1 sm:p-4 md:p-8 lg:p-10">
                      {teachers.map((teacher) => (
                        <div
                          key={teacher.id}
                          className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-2 md:p-4 border border-gray-200 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="relative">
                                {teacher.image ? (
                                  <img
                                    src={getImageUrl(teacher.image)}
                                    alt={teacher.name}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                                    onError={(e) => {
                                      e.target.src =
                                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E"
                                    }}
                                  />
                                ) : (
                                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                    {teacher.name.charAt(0)}
                                  </div>
                                )}
                                <div
                                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                                    attendance[teacher.id] === 'present'
                                      ? 'bg-green-500'
                                      : 'bg-red-500'
                                  }`}
                                ></div>
                              </div>
                              <div>
                                <h4 className="text-xs md:text-xl font-semibold text-gray-900">
                                  {teacher.name}
                                </h4>
                                <p className="text-xs text-gray-500">{teacher.subject}</p>
                              </div>
                            </div>

                            <div className="flex space-x-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handleAttendanceChange(teacher.id, 'present')
                                }
                                className={`relative group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                                  attendance[teacher.id] === 'present'
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                                    : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-500'
                                }`}
                              >
                                <CheckCircle className="w-6 h-6" />
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                  Mark Present
                                </div>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleAttendanceChange(teacher.id, 'absent')
                                }
                                className={`relative group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                                  attendance[teacher.id] === 'absent'
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                                    : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                                }`}
                              >
                                <XCircle className="w-6 h-6" />
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                  Mark Absent
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Message Display */}
              {message && (
                <div
                  className={`mt-2 mb-2 p-4 rounded-2xl border ${
                    message.includes('successfully')
                      ? 'bg-green-50 border-green-200 text-sm text-green-800'
                      : message.includes('No attendance')
                      ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  <div className="flex items-center">
                    {message.includes('successfully') ? (
                      <CheckCircle className="w-5 h-5 mr-3" />
                    ) : message.includes('No attendance') ? (
                      <Calendar className="w-5 h-5 mr-3" />
                    ) : (
                      <XCircle className="w-5 h-5 mr-3" />
                    )}
                    {message}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="p-4 bg-gray-50/50">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-5 rounded-2xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing...
                    </div>
                  ) : (
                    'Mark Attendance'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MarkTchrAtte