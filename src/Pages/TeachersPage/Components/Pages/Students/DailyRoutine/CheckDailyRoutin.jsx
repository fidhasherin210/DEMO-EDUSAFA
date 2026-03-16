import React, { useEffect, useState, useCallback } from 'react'
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  BookOpen,
  ChevronRight,
  Sparkles,
  Target,
  Activity,
  Users,
  User,
} from 'lucide-react'
import DailyRoutineOverview from './DailyRoutineOverview'

// Sample Data
const SAMPLE_CLASSES = [
  {
    id: 1,
    std: "1 ",
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
  },
  {
    id: 4,
    std: "4",
    students: [
     {
          id: 401,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 402,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 403,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
    ]
  }
]

// Sample Routine Data for different students/dates
const SAMPLE_ROUTINE_DATA = {
  101: {
    subahi: true,
    luhur: true,
    asar: true,
    maqrib: false,
    isha: true,
    thabaraka: true,
    waqiha: false,
    reading: true,
    swalath: true,
    haddad: true,
    message: "Good progress today!"
  },
  102: {
    subahi: true,
    luhur: false,
    asar: true,
    maqrib: true,
    isha: true,
    thabaraka: false,
    waqiha: true,
    reading: false,
    swalath: true,
    haddad: false,
    message: "Needs improvement in morning routines"
  },
  // Default routine for other students
  default: {
    subahi: Math.random() > 0.3,
    luhur: Math.random() > 0.3,
    asar: Math.random() > 0.3,
    maqrib: Math.random() > 0.3,
    isha: Math.random() > 0.3,
    thabaraka: Math.random() > 0.3,
    waqiha: Math.random() > 0.3,
    reading: Math.random() > 0.3,
    swalath: Math.random() > 0.3,
    haddad: Math.random() > 0.3
  }
}

function CheckDailyRoutin() {
  const [routineData, setRoutineData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [classesLoading, setClassesLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [message, setMessage] = useState('')
  const [allClasses, setAllClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Initialize with today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)
  }, [])

  // Load sample classes
  useEffect(() => {
    const loadSampleClasses = async () => {
      try {
        setClassesLoading(true)
        setError(null)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setAllClasses(SAMPLE_CLASSES)
      } catch (error) {
        console.error('Error loading classes:', error)
        setError('Failed to load classes. Please try again.')
      } finally {
        setClassesLoading(false)
      }
    }

    loadSampleClasses()
  }, [])

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setSelectedStudent(null)
    setRoutineData(null)
    setMessage('')
  }

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
    setRoutineData(null)
    setMessage('')
  }

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150?text=No+Image'
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/150?text=No+Image'
    if (imagePath.startsWith('http')) return imagePath
    return imagePath
  }

  const fetchRoutineData = useCallback(async () => {
    if (!selectedDate || !selectedStudent) return

    setLoading(true)
    setError(null)
    setMessage('')

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))

      // Get routine data for the selected student
      let studentRoutine = SAMPLE_ROUTINE_DATA[selectedStudent.id]
      
      if (!studentRoutine) {
        // Generate random routine for students without predefined data
        studentRoutine = {
          subahi: Math.random() > 0.3,
          luhur: Math.random() > 0.3,
          asar: Math.random() > 0.3,
          maqrib: Math.random() > 0.3,
          isha: Math.random() > 0.3,
          thabaraka: Math.random() > 0.3,
          waqiha: Math.random() > 0.3,
          reading: Math.random() > 0.3,
          swalath: Math.random() > 0.3,
          haddad: Math.random() > 0.3
        }
      }

      // Simulate success response
      const response = {
        data: {
          success: true,
          data: studentRoutine,
          message: 'Routine fetched successfully'
        }
      }

      if (response.data.success) {
        if (response.data.data) {
          setRoutineData(response.data.data)
          setMessage('')
        } else {
          setRoutineData(null)
          setMessage(
            response.data.message || 'Routine not marked for this date'
          )
        }
      } else {
        setError('Failed to fetch routine data')
      }
    } catch (err) {
      console.error('Error fetching routine data:', err)
      setError('Failed to fetch routine data')
    } finally {
      setLoading(false)
    }
  }, [selectedDate, selectedStudent])

  useEffect(() => {
    if (selectedDate && selectedStudent) {
      fetchRoutineData()
    }
  }, [selectedDate, selectedStudent, fetchRoutineData])

  const routineItems = [
    {
      key: 'subahi',
      label: 'Subahi',
      icon: '🌅',
      color: 'from-amber-400 to-orange-500',
    },
    {
      key: 'luhur',
      label: 'Luhur',
      icon: '☀️',
      color: 'from-yellow-400 to-amber-500',
    },
    {
      key: 'asar',
      label: 'Asar',
      icon: '🌤️',
      color: 'from-orange-400 to-red-500',
    },
    {
      key: 'maqrib',
      label: 'Maqrib',
      icon: '🌅',
      color: 'from-red-400 to-rose-500',
    },
    {
      key: 'isha',
      label: 'Isha',
      icon: '🌙',
      color: 'from-indigo-400 to-purple-500',
    },
    {
      key: 'thabaraka',
      label: 'Thabaraka',
      icon: '📖',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      key: 'waqiha',
      label: 'Waqiha',
      icon: '📖',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      key: 'reading',
      label: 'Reading',
      icon: '📚',
      color: 'from-violet-400 to-purple-500',
    },
    {
      key: 'swalath',
      label: 'Swalath',
      icon: '🤲',
      color: 'from-fuchsia-400 to-pink-500',
    },
    {
      key: 'haddad',
      label: 'Haddad',
      icon: '✨',
      color: 'from-rose-400 to-red-500',
    },
  ]

  const getCompletionStats = () => {
    if (!routineData) return { completed: 0, total: 0, percentage: 0 }

    const completed = routineItems.filter(
      (item) => routineData[item.key] === true,
    ).length
    const total = routineItems.length
    const percentage = Math.round((completed / total) * 100)

    return { completed, total, percentage }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const stats = getCompletionStats()

  return (
    <div className="min-h-screen p-1 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Daily routine
                </h1>
                <p className="text-xs text-white/90">
                  View daily routine of Your Students.
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

              {classesLoading ? (
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
                      disabled={classesLoading}
                      className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${
                        selectedClass?.id === classData.id
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/25 scale-105'
                          : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-lg hover:scale-105'
                      } ${
                        classesLoading ? 'opacity-50 cursor-not-allowed' : ''
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

        {/* Main Content Grid - Only show when student is selected */}
        {selectedStudent && (
          <div className="space-y-3 sm:space-y-4 md:space-y-6 mt-4">
            {/* Date Selection Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100/50 hover:shadow-lg transition-all duration-300">
              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2 sm:gap-3 sm:mb-3">
                  <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md sm:p-2">
                    <Calendar className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                  </div>
                  <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
                    Select Date
                  </h2>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 sm:text-sm sm:px-4 sm:py-3"
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:px-4 sm:py-2.5">
                    <Clock className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4" />
                    <span className="text-xs font-medium text-gray-700 truncate sm:text-sm">
                      {selectedDate && formatDate(selectedDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            {!loading && !error && routineData && (
              <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-1">
                {/* Quick Stats Card */}
                <div className="lg:col-span-1">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100/50 p-4 hover:shadow-lg transition-all duration-300 sm:p-5">
                    <div className="flex items-center gap-2 mb-3 sm:gap-3 sm:mb-4">
                      <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md sm:p-2">
                        <Activity className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                      </div>
                      <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
                        Quick Stats
                      </h2>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg sm:p-3">
                        <span className="text-xs text-gray-600 sm:text-sm">
                          Completed
                        </span>
                        <span className="text-sm font-semibold text-gray-800 sm:text-base">
                          {stats.completed}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg sm:p-3">
                        <span className="text-xs text-gray-600 sm:text-sm">
                          Remaining
                        </span>
                        <span className="text-sm font-semibold text-gray-800 sm:text-base">
                          {stats.total - stats.completed}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg sm:p-3">
                        <span className="text-xs text-gray-600 sm:text-sm">
                          Total Routines
                        </span>
                        <span className="text-sm font-semibold text-gray-800 sm:text-base">
                          {stats.total}
                        </span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-200 sm:mt-3 sm:pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 sm:text-sm">
                            Progress
                          </span>
                          <span
                            className={`text-sm font-semibold sm:text-base ${
                              stats.percentage >= 75
                                ? 'text-green-600'
                                : stats.percentage >= 50
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {stats.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Message when no routine */}
            {!loading && !error && message && (
              <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-100 rounded-lg">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <p className="text-xs text-amber-700 font-medium sm:text-sm">
                    {message}
                  </p>
                </div>
              </div>
            )}

            {/* Routine List Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100/50 overflow-hidden hover:shadow-lg transition-all duration-300">
              {loading ? (
                <div className="flex items-center justify-center py-12 sm:py-16">
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-12 h-12 border-3 border-gray-200 rounded-full sm:w-14 sm:h-14"></div>
                      <div className="absolute top-0 left-0 w-12 h-12 border-3 border-blue-500 rounded-full border-t-transparent animate-spin sm:w-14 sm:h-14"></div>
                    </div>
                    <p className="mt-3 text-xs text-gray-600 font-medium sm:text-sm">
                      Loading your routine...
                    </p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12 sm:py-16">
                  <div className="text-center">
                    <div className="p-3 bg-red-100 rounded-full inline-block mb-2 sm:p-4">
                      <XCircle className="h-8 w-8 text-red-500 sm:h-10 sm:w-10" />
                    </div>
                    <p className="text-sm text-red-600 font-medium sm:text-base">
                      {error}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 sm:text-sm">
                      Please try again later
                    </p>
                  </div>
                </div>
              ) : !routineData ? (
                <div className="flex items-center justify-center py-12 sm:py-16">
                  <div className="text-center">
                    <div className="p-3 bg-gray-100 rounded-full inline-block mb-2 sm:p-4">
                      <Calendar className="h-8 w-8 text-gray-400 sm:h-10 sm:w-10" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium sm:text-base">
                      No routine available
                    </p>
                    <p className="text-xs text-gray-500 mt-1 sm:text-sm">
                      for the selected date
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Mobile Card View - Hidden on desktop */}
                  <div className="p-3 space-y-2 sm:p-4 sm:space-y-3 md:hidden">
                    {routineItems.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-r from-gray-50 to-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 sm:p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} shadow-md flex items-center justify-center text-white sm:w-10 sm:h-10 sm:rounded-xl`}
                            >
                              <span className="text-sm sm:text-lg">
                                {item.icon}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-800 sm:text-sm">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-gray-500 block sm:text-xs">
                                {item.key.charAt(0).toUpperCase() +
                                  item.key.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div>
                            {routineData[item.key] ? (
                              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-1.5 rounded-full shadow-md sm:p-2">
                                <CheckCircle className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                              </div>
                            ) : (
                              <div className="bg-gradient-to-br from-red-400 to-rose-500 p-1.5 rounded-full shadow-md sm:p-2">
                                <XCircle className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View - Hidden on mobile */}
                  <div className="hidden md:block">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100/80">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Routine
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {routineItems.map((item, index) => (
                          <tr
                            key={index}
                            className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200"
                          >
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} shadow-md flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-200`}
                                >
                                  <span className="text-sm">{item.icon}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-800">
                                    {item.label}
                                  </span>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {item.key.charAt(0).toUpperCase() +
                                      item.key.slice(1)}{' '}
                                    prayer
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex justify-center">
                                {routineData[item.key] ? (
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                    <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 p-1.5 rounded-full shadow-md">
                                      <CheckCircle className="h-4 w-4 text-white" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-red-400 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                    <div className="relative bg-gradient-to-br from-red-400 to-rose-500 p-1.5 rounded-full shadow-md">
                                      <XCircle className="h-4 w-4 text-white" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* DailyRoutineOverview Component - Moved inside the main content div */}
            {selectedStudent && (
              <div className="mt-4">
                <DailyRoutineOverview studentId={selectedStudent.id} />
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default CheckDailyRoutin