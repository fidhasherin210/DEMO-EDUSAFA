import React, { useState } from 'react'
import {
  BookOpen,
  MapPin,
  ChevronRight,
  GraduationCap,
  User,
  Edit2,
  Calendar,
} from 'lucide-react'

function AddFee() {
  // Sample data for classes with students
  const [allClasses] = useState([
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
      id: 2,
      std: '2',
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
      ],
    },
    {
      id: 3,
      std: '3',
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
        {
          id: 303,
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
     
      ],
    },
  ])

  // Sample academic year data
  const [academicYear] = useState({
    id: 1,
    year: '2024-2025',
    start_date: '2024-06-01',
    end_date: '2025-03-31'
  })

  const [selectedClass, setSelectedClass] = useState(null)
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)

  const [month, setMonth] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingFee, setPendingFee] = useState(null)

  const [loading, setLoading] = useState(false)

  function getMonthsBetween(start, end) {
    if (!start || !end) return []

    const startDate = new Date(start)
    const endDate = new Date(end)
    const months = []

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

    while (startDate <= endDate) {
      months.push({
        display:
          monthNames[startDate.getMonth()] + ' ' + startDate.getFullYear(),
        value: monthNames[startDate.getMonth()], // Send only month name to backend
      })
      startDate.setMonth(startDate.getMonth() + 1)
    }

    return months
  }

  const monthsList = academicYear
    ? getMonthsBetween(academicYear.start_date, academicYear.end_date)
    : []

  const handleClassSelect = (cls) => {
    setSelectedClass(cls)
    setStudents(cls.students || [])
    setSelectedStudent(null)
    setSuccess('')
    setError('')
  }

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
    setSuccess('')
    setError('')
  }

  const handleAddFee = () => {
    setSuccess('')
    setError('')

    if (!month || !amount) {
      setError('Month & Amount are required')
      return
    }

    if (!selectedStudent) {
      setError('Please select a student')
      return
    }

    // Find the selected month object
    const selectedMonthObj = monthsList.find((m) => m.display === month)

    setPendingFee({
      student: selectedStudent.name,
      month: selectedMonthObj ? selectedMonthObj.value : month, // Store the actual value to send
      monthDisplay: month, // Store display value for confirmation
      amount,
      note,
    })

    setShowConfirm(true)
  }

  const confirmSubmitFee = async () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSuccess('Fee added successfully!')
      setAmount('')
      setMonth('')
      setNote('')
      setPendingFee(null)
      setLoading(false)
      setShowConfirm(false)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    }, 1500)
  }

  const cancelSubmitFee = () => {
    setShowConfirm(false)
    setPendingFee(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Add Fee
                </h1>
                <p className="text-xs text-white/90">
                  Add Fee Record for students
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
        {/* Fee Form */}
        {selectedStudent && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-4">
            {/* Header with Gradient */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <svg
                  className="absolute bottom-0 w-full h-6 text-white opacity-25"
                  preserveAspectRatio="none"
                  viewBox="0 0 1200 120"
                >
                  <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.25,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    opacity=".25"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>

              <div className="relative px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Add Fee for {selectedStudent.name}
                    </h3>
                    {academicYear && (
                      <p className="text-xs text-white/80">
                        Academic Year: {academicYear.year}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Success Message */}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-center gap-2">
                  <div className="p-1 bg-green-100 rounded-full">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-2">
                  <div className="p-1 bg-red-100 rounded-full">
                    <svg
                      className="w-3 h-3 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Month Field */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1.5">
                  Month <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="">Select Month</option>
                    {monthsList.map((m, i) => (
                      <option key={i} value={m.display}>
                        {m.display}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Amount Field */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1.5">
                  Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>
              </div>

              {/* Note Field */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1.5">
                  Note (optional)
                </label>
                <div className="relative">
                  <Edit2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add any notes (optional)"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleAddFee}
                disabled={!month || !amount}
                className={`w-full py-3 px-4 rounded-xl text-sm font-medium shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  !month || !amount
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-[1.02]'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Add Fee</span>
              </button>

              {/* Required Fields Note */}
              <p className="text-center text-xs text-slate-400 mt-3">
                <span className="text-red-500">*</span> Required fields
              </p>
            </div>
          </div>
        )}
        {/* Student List */}
        {selectedClass && students.length > 0 && (
          <div className="px-2 py-6 mb-4 bg-white border shadow-xl rounded-xl">
            <div className="mb-4">
              <h3 className="text-sm md:text-base font-semibold text-center text-blue-600">
                Students in Class {selectedClass.std}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student, index) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={student.image}
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

        {/* Confirmation Modal */}
        {showConfirm && pendingFee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-fadeIn">
              {/* Modal Header with Gradient */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <svg
                    className="absolute bottom-0 w-full h-6 text-white opacity-25"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                  >
                    <path
                      d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.25,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                      opacity=".25"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>

                <div className="relative px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        Confirm Fee Details
                      </h2>
                      <p className="text-xs text-white/80">
                        Please verify the information before confirming
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fee Details */}
              <div className="p-6">
                <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-5 rounded-xl border border-slate-200 mb-5">
                  <div className="space-y-3">
                    {/* Student Name */}
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-blue-100 rounded-lg mt-0.5">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-500 uppercase mb-0.5">
                          Student
                        </p>
                        <p className="text-sm font-semibold text-slate-800">
                          {pendingFee.student}
                        </p>
                      </div>
                    </div>

                    {/* Month */}
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-purple-100 rounded-lg mt-0.5">
                        <Calendar className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-500 uppercase mb-0.5">
                          Month
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {pendingFee.monthDisplay || pendingFee.month}
                        </p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-emerald-100 rounded-lg mt-0.5">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-500 uppercase mb-0.5">
                          Amount
                        </p>
                        <p className="text-lg font-bold text-emerald-600">
                          ₹{pendingFee.amount}
                        </p>
                      </div>
                    </div>

                    {/* Note (if exists) */}
                    {pendingFee.note && (
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-amber-100 rounded-lg mt-0.5">
                          <Edit2 className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-slate-500 uppercase mb-0.5">
                            Note
                          </p>
                          <p className="text-sm text-slate-700 bg-white/50 p-2 rounded-lg border border-slate-200">
                            {pendingFee.note}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={cancelSubmitFee}
                    className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSubmitFee}
                    disabled={loading}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      loading
                        ? 'bg-blue-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-[1.02]'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  This action will record the fee payment
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddFee