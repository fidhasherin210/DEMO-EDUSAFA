import React, { useState, useEffect } from 'react'
import {
  Calendar,
  User,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react'
import DailyRoutineOverview from '../../../../../TeachersPage/Components/Pages/Students/DailyRoutine/DailyRoutineOverview'

function DailyRoutinePrinci() {
  const [allClasses, setAllClasses] = useState([]) // All classes data
  const [selectedClass, setSelectedClass] = useState(null) // Selected class
  const [selectedStudent, setSelectedStudent] = useState(null) // Selected student
  const [dailyRoutine, setDailyRoutine] = useState([]) // Daily routine data
  const [selectedDate, setSelectedDate] = useState('') // Selected date
  const [loading, setLoading] = useState(false) // Loading state
  const [error, setError] = useState('') // Error state
  const [initialLoading, setInitialLoading] = useState(true)

  // ✅ Helper: Get today's date in YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  // Sample classes with students data
  const sampleClasses = [
    {
      id: 1,
      std: "1",
      students: [
        { id: 101, name: "Ahmed Khan", place: "Mumbai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s" },
        { id: 102, name: "Fatima Zahra", place: "Delhi", image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png" },
        { id: 103, name: "Omar Farooq", place: "Bangalore", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s" },
        { id: 104, name: "Aisha Siddiqua", place: "Chennai", image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png" },
        { id: 105, name: "Yusuf Ismail", place: "Hyderabad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s" },
      ]
    },
    {
      id: 2,
      std: "2",
      students: [
        { id: 201, name: "Zainab Ali", place: "Mumbai", image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png" },
        { id: 202, name: "Hamza Abdullah", place: "Delhi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s" },
        { id: 203, name: "Maryam Hassan", place: "Bangalore", image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png" },
      ]
    },
    {
      id: 3,
      std: "3",
      students: [
        { id: 301, name: "Ibrahim Khalil", place: "Chennai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s" },
        { id: 302, name: "Khadija Rahman", place: "Hyderabad", image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png" },
        { id: 303, name: "Musa Aslam", place: "Mumbai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s" },
        { id: 304, name: "Hafsa Noor", place: "Delhi", image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png" },
      ]
    },
    {
      id: 4,
      std: "4",
      students: [
        { id: 401, name: "Ismail Patel", place: "Bangalore", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s" },
        { id: 402, name: "Aminah Begum", place: "Chennai", image:"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png" },
        { id: 403, name: "Bilal Ahmed", place: "Hyderabad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s" },
      ]
    },
   
  ]

  // Sample daily routine data generator
  const generateSampleRoutine = (studentId, date) => {
    // Use student ID to create consistent but varied routine data
    const seed = studentId % 10
    const routineNames = [
      'Subahi', 'Luhur', 'Asar', 'Maqrib', 'Isha',
      'Thabaraka', 'Waqiha', 'Swalath', 'Haddad'
    ]
    
    // Create routine data for 7 days (last 7 days including selected date)
    const routines = []
    const baseDate = new Date(date)
    
    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date(baseDate)
      currentDate.setDate(baseDate.getDate() - i)
      
      const routineEntry = {
        date: currentDate.toISOString().split('T')[0]
      }
      
      // Generate random but seeded routine completion
      routineNames.forEach((routine, index) => {
        // Create a pattern based on student ID, day, and routine
        const dayFactor = i + 1
        const routineFactor = index + 1
        const randomFactor = (seed * dayFactor * routineFactor) % 10
        
        // More likely to complete earlier routines (Subahi, Luhur) than later ones
        const probability = index < 3 ? 0.8 : index < 6 ? 0.6 : 0.4
        
        // Mark as completed if randomFactor > (1-probability)*10
        routineEntry[routine.toLowerCase()] = randomFactor > (1 - probability) * 10
      })
      
      routines.push(routineEntry)
    }
    
    return routines
  }

  // Load sample classes
  useEffect(() => {
    setTimeout(() => {
      setAllClasses(sampleClasses)
      setInitialLoading(false)
    }, 800)
  }, [])

  // ✅ Fetch routine when student OR date changes
  useEffect(() => {
    if (selectedStudent) {
      const fetchDailyRoutine = async () => {
        setLoading(true)
        setError('')

        // Simulate API delay
        setTimeout(() => {
          try {
            const dateToUse = selectedDate || getTodayDate()
            const sampleRoutine = generateSampleRoutine(selectedStudent.id, dateToUse)
            setDailyRoutine(sampleRoutine)
            setError('')
          } catch (error) {
            console.error('Error fetching daily routine:', error)
            setError('daily routine not marked')
            setDailyRoutine([])
          } finally {
            setLoading(false)
          }
        }, 600)
      }

      fetchDailyRoutine()
    } else {
      setDailyRoutine([])
    }
  }, [selectedStudent, selectedDate])

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setSelectedStudent(null)
    setSelectedDate('')
    setDailyRoutine([])
  }

  const handleStudentSelect = (studentData) => {
    setSelectedStudent(studentData)
    setSelectedDate(getTodayDate()) // ✅ Pre-fill with today's date
  }

  const routineNames = [
    'Subahi',
    'Luhur',
    'Asar',
    'Maqrib',
    'Isha',
    'Thabaraka',
    'Waqiha',
    'Swalath',
    'Haddad',
  ]

  const getImageUrl = (url) => {
    // Return placeholder for null images
    if (!url) return 'https://via.placeholder.com/48?text=Student'
    return url
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto ">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Check Students Routine
                </h1>
                <p className="text-xs text-white/90">
                  Monitor Students daily Routine
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          {/* Class Selection */}
          <div className="px-1 mx-auto -mt-3 ">
            <div className="max-w-8xl  mx-auto mb-2">
              <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                    Select Class
                  </h2>
                </div>

                {initialLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
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
          {selectedClass && (
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

          {/* Daily Routine */}
          {selectedStudent && (
            <div className="bg-white rounded-2xl shadow-lg p-4 mt-4 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xs md:text-lg font-semibold text-blue-600">
                      Daily Report of {selectedStudent.name}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Track daily activities
                    </p>
                  </div>
                </div>
              </div>

              {/* Date Picker */}
              <div className="mb-6">
                <label
                  htmlFor="date-picker"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date-picker"
                    className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={getTodayDate()}
                  />
                  <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Loading/Error States */}
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  <p className="ml-4 text-gray-600">Loading routine data...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-xs text-red-700 flex items-center">
                    <XCircle className="h-5 w-5 mr-2" />
                    {error}
                  </p>
                </div>
              )}

              {!loading && !error && dailyRoutine.length === 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No routines available for this date range.
                  </p>
                </div>
              )}

              {/* Routine Table */}
              {!loading && !error && dailyRoutine.length > 0 && (
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs md:text-sm font-semibold text-blue-600 sticky left-0 bg-gray-50">
                              Routine Activity
                            </th>
                            {dailyRoutine.map((data, index) => (
                              <th
                                key={index}
                                className="px-6 py-4 text-center text-xs md:text-sm font-semibold text-blue-600 whitespace-nowrap"
                              >
                                {new Date(data.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  },
                                )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {routineNames.map((routine, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                  <span>{routine}</span>
                                </div>
                              </td>
                              {dailyRoutine.map((data, idx) => (
                                <td
                                  key={idx}
                                  className="px-6 py-4 whitespace-nowrap text-center"
                                >
                                  <div className="flex items-center justify-center">
                                    {data[routine.toLowerCase()] ? (
                                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                                        <XCircle className="h-5 w-5 text-red-600" />
                                      </div>
                                    )}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {selectedClass && selectedStudent && (
        <div>
          <DailyRoutineOverview studentId={selectedStudent.id} />
        </div>
      )}
    </div>
  )
}

export default DailyRoutinePrinci