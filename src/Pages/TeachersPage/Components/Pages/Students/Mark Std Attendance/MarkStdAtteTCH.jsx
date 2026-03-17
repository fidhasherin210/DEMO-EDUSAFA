import React, { useState, useEffect } from 'react'
import { Calendar, CheckCircle, XCircle, BookOpen, User } from 'lucide-react'

const MarkStdAtteTCH = () => {
  const [allClasses, setAllClasses] = useState([])
  const [date, setDate] = useState(getTodayDate())
  const [selectedClass, setSelectedClass] = useState(null)
  const [attendance, setAttendance] = useState({})
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Sample Data
  const sampleClasses = [
    {
      id: 1,
      std: "1",
      class: "1",
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
      ]
    },
    {
      id: 2,
      std: "2",
      class: "2",
      students: [
       {
          id: 201,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 202,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 203,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ]
    },
    {
      id: 3,
      std: "3",
      class: "3",
      students: [
        {
          id: 301,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 302,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
     
      ]
    }
  ]

  function getTodayDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Load Classes
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setAllClasses(sampleClasses)
      setIsLoading(false)
    }, 500)
  }, [])

  // Load Attendance for selected class and date
  useEffect(() => {
    if (!selectedClass) return

    setIsLoading(true)
    setTimeout(() => {
      // Simulate fetching attendance data
      // For demo, randomly mark some students present
      const savedAttendance = localStorage.getItem(
        `attendance_${selectedClass.id}_${date}`
      )
      
      if (savedAttendance) {
        setAttendance(JSON.parse(savedAttendance))
      } else {
        // Default: mark all absent
        const defaultAttendance = {}
        selectedClass.students?.forEach((student) => {
          // Randomly mark some present for demo
          defaultAttendance[student.id] = Math.random() > 0.5 ? 'present' : 'absent'
        })
        setAttendance(defaultAttendance)
      }
      setIsLoading(false)
    }, 300)
  }, [selectedClass, date])

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setError(null)
    setSuccess(null)

    const defaultAttendance = {}
    classData.students?.forEach((student) => {
      defaultAttendance[student.id] = 'absent'
    })
    setAttendance(defaultAttendance)
  }

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleSubmit = async () => {
    if (!selectedClass) {
      setError('Please select a class.')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage for demo persistence
      localStorage.setItem(
        `attendance_${selectedClass.id}_${date}`,
        JSON.stringify(attendance)
      )

      setSuccess('Attendance submitted successfully!')
      setError(null)

      setTimeout(() => {
        setSuccess(null)
      }, 3000)

      setIsLoading(false)
    }, 500)
  }

  const presentCount = selectedClass
    ? Object.values(attendance).filter((status) => status === 'present').length
    : 0

  const totalStudents = selectedClass?.students?.length || 0
  const absentCount = totalStudents - presentCount

  const getImageUrl = (url) => {
    if (!url) return '/default-avatar.png'
    return url
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-1">
      <div className=" mx-auto">
        {/* Header */}
        <div className="px-3 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto ">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Mark Students Attendance
                </h1>
                <p className="text-xs text-white/90">
                  Mark Students Daily Attendance
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-1 mx-auto -mt-3 ">
          {/* Class Selection */}
          <div className="max-w-8xl mx-auto mb-2">
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                  Select Class
                </h2>
              </div>

              {allClasses.length === 0 && !isLoading ? (
                <div className="text-center py-8 text-gray-500">
                  No classes available
                </div>
              ) : (
                <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1">
                  {allClasses.map((classData, index) => (
                    <button
                      key={classData.id || index}
                      onClick={() => handleClassSelect(classData)}
                      disabled={isLoading}
                      className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${
                        selectedClass?.id === classData.id
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/25 scale-105'
                          : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-lg hover:scale-105'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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

        {/* Loading State */}
        {isLoading && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl border-l-4 border-l-blue-500 mb-6">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800"></div>
              <p className="font-medium">Loading...</p>
            </div>
          </div>
        )}

        {selectedClass && (
          <>
            {/* Date Selection */}
            <div className="bg-white mt-3 rounded-2xl shadow-xl p-6 mb-2 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                  Select Date
                </h2>
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full max-w-sm px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
            <div className="bg-white p-2 pt-5 rounded-2xl">
              {/* Stats Cards */}
              <div className="grid grid-cols-4 md:grid-cols-4 gap-1 mb-3">
                {/* Total Students Card */}
                <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl py-3 px-1 border border-blue-100/50">
                  <span className="text-xl md:text-3xl font-bold text-blue-600">
                    {totalStudents}
                  </span>
                  <span className="text-[12px] md:text-sm text-gray-500 mt-0.5 text-center">
                    Total Students
                  </span>
                </div>

                {/* Present Card */}
                <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl py-3 px-1 border border-green-100/50">
                  <span className="text-xl md:text-3xl font-bold text-green-600">
                    {presentCount}
                  </span>
                  <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                    Present
                  </span>
                </div>

                {/* Absent Card */}
                <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-red-50 to-rose-50/50 rounded-2xl py-3 px-1 border border-red-100/50">
                  <span className="text-xl md:text-3xl font-bold text-red-600">
                    {absentCount}
                  </span>
                  <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                    Absent
                  </span>
                </div>

                {/* Attendance Percentage Card */}
                <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl py-3 px-1 border border-purple-100/50">
                  <span className="text-base md:text-3xl font-bold text-purple-600">
                    {totalStudents > 0
                      ? Math.round((presentCount / totalStudents) * 100)
                      : 0}
                    %
                  </span>
                  <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                    Attendance
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Students List */}
        {selectedClass && (
          <div className="bg-white rounded-2xl shadow-xl p-1 mb-6 border border-gray-200 mt-4 pb-5">
            <div className="mt-2 mb-6">
              <h3 className="text-xs md:text-lg font-semibold text-blue-600 text-center">
                Students in Class {selectedClass.class}
              </h3>
            </div>

            {selectedClass.students?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No students in this class
              </div>
            ) : (
              <div className="grid gap-3 max-h-96 overflow-y-auto pr-2">
                {selectedClass.students?.map((student, index) => (
                  <div
                    key={student.id || index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img
                          src={getImageUrl(student.image)}
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          onError={(e) => {
                            e.target.src = '/default-avatar.png'
                          }}
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            attendance[student.id] === 'present'
                              ? 'bg-green-500'
                              : attendance[student.id] === 'absent'
                              ? 'bg-red-500'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                      </div>
                      <div>
                        <h4 className="text-xs md:text-xl  text-gray-900">
                          {student.name || 'Unknown Student'}
                        </h4>
                        <p className="text-xs">{student.place || ''}</p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          handleAttendanceChange(student.id, 'present')
                        }
                        disabled={isLoading}
                        className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                          attendance[student.id] === 'present'
                            ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                            : 'bg-gray-200 text-gray-600 hover:bg-green-100 hover:text-green-700'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() =>
                          handleAttendanceChange(student.id, 'absent')
                        }
                        disabled={isLoading}
                        className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                          attendance[student.id] === 'absent'
                            ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                            : 'bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-700'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Messages */}
            {error && (
              <div className="  bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl border-l-4 mt-3 border-l-red-500 mb-6">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  <p className="font-medium text-xs md:text-sm">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className=" bg-green-50 mt-3 border border-green-200 text-green-800 p-4 rounded-xl border-l-4 border-l-green-500 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-medium text-xs md:text-sm">{success}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-3">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`text-sm w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 px-5 rounded-xl font-semibold md:text-lg shadow-lg ${
                  isLoading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-[1.02] hover:shadow-xl'
                }`}
              >
                {isLoading ? 'Submitting...' : 'Submit Attendance'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarkStdAtteTCH