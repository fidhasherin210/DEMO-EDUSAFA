import React, { useState, useEffect } from 'react'
import {
  CheckCircle,
  BookOpen,
  Calendar,
  User,
  Award,
  AlertCircle,
  X,
} from 'lucide-react'

function MarkProgressTCH() {
  const [allClasses, setAllClasses] = useState([
    {
      id: 1,
      std: "1",
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
        {
          id: 303,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
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
    },
   
  ])

  const [allTerms, setAllTerms] = useState([
    { id: 1, name: "Term 1", period: "April - July" },
    { id: 2, name: "Term 2", period: "August - November" },
    { id: 3, name: "Term 3", period: "December - March" },
    { id: 4, name: "Annual", period: "Full Year" }
  ])

  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [marks, setMarks] = useState({})
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [subjectsLoading, setSubjectsLoading] = useState(false)
  const [showMarksForm, setShowMarksForm] = useState(false)

  // Sample subjects for different classes
  const sampleSubjects = {
    1: [
      { id: 101, name: "Fiqh", code: "FIQH05" },
      { id: 102, name: "Ahlaq", code: "AHLQ05" },
      { id: 103, name: "Thajweed", code: "TJWD05" },
      { id: 104, name: "Thareeh", code: "Thareeh05" },
      
    ],
    2: [
      { id: 201, name: "Fiqh", code: "FIQH05" },
      { id: 202, name: "Ahlaq", code: "AHLQ05" },
      { id: 203, name: "Thajweed", code: "TJWD05" },
      { id: 204, name: "Thareeh", code: "Thareeh05" },
      
    ],
    3: [
      { id: 301, name: "Fiqh", code: "FIQH05" },
      { id: 302, name: "Ahlaq", code: "AHLQ05" },
      { id: 303, name: "Thajweed", code: "TJWD05" },
      { id: 304, name: "Thareeh", code: "Thareeh05" },
     
    ],
    4: [
      { id: 401, name: "Fiqh", code: "FIQH05" },
      { id: 402, name: "Ahlaq", code: "AHLQ05" },
      { id: 403, name: "Thajweed", code: "TJWD05" },
      { id: 404, name: "Thareeh", code: "Thareeh05" },
     
    ],
   
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const fetchSubjects = (classId) => {
    setSubjectsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      setSubjects(sampleSubjects[classId] || [])
      setSubjectsLoading(false)
    }, 500)
  }

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setSelectedTerm(null)
    setSelectedStudent(null)
    setSubjects([])
    setMarks({})
    setShowMarksForm(false)
    fetchSubjects(classData.id)
  }

  const handleTermSelect = (termId) => {
    setSelectedTerm(termId)
    setSelectedStudent(null)
    setShowMarksForm(false)
  }

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
    setShowMarksForm(true)
    // Initialize marks for all subjects
    const initialMarks = {}
    subjects.forEach((subject) => {
      initialMarks[subject.id] = ''
    })
    setMarks(initialMarks)
  }

  const handleMarkChange = (subjectId, mark) => {
    setMarks((prev) => ({ ...prev, [subjectId]: mark }))
  }

  const handleSubmit = async () => {
    if (!selectedClass || !selectedTerm || !selectedStudent) {
      setError('Please select a class, term, and student.')
      return
    }

    // Validate that all subjects have marks
    const missingMarks = subjects.some((subject) => !marks[subject.id])
    if (missingMarks) {
      setError('Please enter marks for all subjects.')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setSuccess('Progress submitted successfully.')
      setError(null)

      // Clear marks after successful submission
      const initialMarks = {}
      subjects.forEach((subject) => {
        initialMarks[subject.id] = ''
      })
      setMarks(initialMarks)
      
      setIsSubmitting(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    }, 1000)
  }

  const getImageUrl = (url) => url

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
                  Mark Student Progress
                </h1>
                <p className="text-xs text-white/90">
                  Record Academic Performance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="px-1 mx-auto -mt-3">
          <div className="max-w-8xl mx-auto mb-2">
            <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                  Select Class
                </h2>
              </div>

              {loading ? (
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
                  {selectedClass && subjects.length > 0 && (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      Subjects: {subjects.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 bg-white rounded-2xl p-3">
          <div className="flex items-center space-x-1">
            <div
              className={`flex items-center space-x-2 ${
                selectedClass ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <span className="md:text-lg text-xs font-medium">Class</span>
            </div>
            <div
              className={`w-8 h-px ${
                selectedClass ? 'bg-green-300' : 'bg-gray-300'
              }`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                selectedTerm ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <span className="md:text-lg text-xs font-medium">Term</span>
            </div>{' '}
            <br />
            <div
              className={`w-8 h-px ${
                selectedTerm ? 'bg-green-300' : 'bg-gray-300'
              }`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                selectedStudent ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <span className="md:text-lg text-xs font-medium">Student</span>
            </div>
          </div>
        </div>

        {/* Term Selection */}
        {!selectedTerm && selectedClass && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center mb-4">
              <Calendar className="w-4 h-4 md:w-6 md:h-6 text-blue-600 mr-2 sm:mr-3" />
              <h2 className="text-xs md:text-sm font-semibold text-blue-500">
                Select Term
              </h2>
            </div>

            {/* Grid for 2 per row on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {allTerms.map((term) => (
                <button
                  key={term.id}
                  onClick={() => handleTermSelect(term.id)}
                  className={`w-full text-xs sm:text-xs md:text-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 font-medium transition-all duration-200
          ${
            selectedTerm === term.id
              ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/25 scale-105'
              : 'border-blue-200 text-blue-700 hover:border-blue-400 hover:bg-blue-50'
          }`}
                >
                  {term.name} {term.period}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Student Selection with Marks Form */}
        {selectedTerm && selectedClass && selectedClass.students && (
          <div className="bg-white rounded-2xl shadow-lg p-3 pt-8 mb-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center mb-4">
              <User className="w-4 h-4 text-blue-600 mr-3" />
              <h2 className="text-xs md:text-sm font-semibold text-blue-500">
                Select Student
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {selectedClass.students.map((student) => (
                <div key={student.id} className="space-y-3">
                  {/* Student Card */}
                  <button
                    onClick={() => handleStudentSelect(student)}
                    className={`w-full p-3 bg-gray-50 rounded-xl border transition-all duration-200 text-left ${
                      selectedStudent?.id === student.id
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                    }`}
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
                      {selectedStudent?.id === student.id && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </button>

                  {/* Marks Form - Shows directly below the selected student's card */}
                  {selectedStudent?.id === student.id && showMarksForm && (
                    <div className="animate-in slide-in-from-top duration-300">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xs md:text-sm font-semibold text-blue-700">
                            Enter Marks for {student.name}
                          </h3>
                          <button
                            onClick={() => setShowMarksForm(false)}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>

                        {/* Show subjects loading state */}
                        {subjectsLoading ? (
                          <div className="flex justify-center py-4">
                            <div className="w-6 h-6 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                          </div>
                        ) : subjects && subjects.length > 0 ? (
                          <div className="space-y-3">
                            {subjects.map((subject) => (
                              <div
                                key={subject.id}
                                className="flex items-center gap-3"
                              >
                                <label className="w-24 text-xs md:text-sm font-medium text-gray-600">
                                  {subject.name}
                                </label>
                                <input
                                  type="number"
                                  value={marks[subject.id] || ''}
                                  onChange={(e) =>
                                    handleMarkChange(subject.id, e.target.value)
                                  }
                                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-sm"
                                  placeholder="Enter marks"
                                  min="0"
                                  max="100"
                                  step="0.01"
                                />
                              </div>
                            ))}

                            {/* Submit Button inside marks form */}
                            <div className="flex justify-end mt-4">
                              <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all duration-200 ${
                                  isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-sky-500 hover:shadow-lg'
                                } text-white`}
                              >
                                {isSubmitting ? (
                                  <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Submitting...
                                  </div>
                                ) : (
                                  'Submit Progress'
                                )}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-600">
                              No subjects available for this class.
                            </p>
                          </div>
                        )}
                      </div>
                      {/* Error/Success Messages */}
                      {error && (
                        <div className="mt-2 text-xs md:text-sm bg-red-50 p-4 mb-6 rounded-xl animate-in slide-in-from-left duration-300">
                          <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                            <p className="text-red-700 font-medium">{error}</p>
                          </div>
                        </div>
                      )}

                      {success && (
                        <div className="mt-2 text-xs md:text-sm bg-green-50 p-4 mb-6 rounded-xl animate-in slide-in-from-left duration-300">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            <p className="text-green-700 font-medium">
                              {success}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarkProgressTCH