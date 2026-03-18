import React, { useState, useEffect } from 'react'
import { BookOpen, Award } from 'lucide-react'
import ProgressOverView from './ProgressOverView'
import ProgressGraph from './ProgressGraph'

const CheckStdProgrTCH = () => {
  const [allClasses, setAllClasses] = useState([])
  const [allTerms, setAllTerms] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedTerm, setSelectedTerm] = useState('')
  const [studentProgress, setStudentProgress] = useState([])
  const [loading, setLoading] = useState(false)
  const [academicYears, setAcademicYears] = useState([])
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('')
  const [error, setError] = useState(null)
  const [standard, setStandard] = useState(null)

  // Sample Data
  const sampleAcademicYears = [
    { id: 1, year: "2023-2024", is_current: false },
    { id: 2, year: "2024-2025", is_current: true }
  ]

  const sampleTerms = [
    { id: 1, name: "Term 1" },
    { id: 2, name: "Term 2" },
    { id: 3, name: "Term 3" }
  ]

  const sampleClasses = [
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
          name: "Ali Akbar",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
       
      ]
    }
  ]

  const sampleProgressData = {
    records: [
      { subject: "Fiqh", marks: 85, total_marks: 100, percentage: 85, grade: "A" },
      { subject: "Ahlaq", marks: 92, total_marks: 100, percentage: 92, grade: "A+" },
      { subject: "Thajweed", marks: 78, total_marks: 100, percentage: 78, grade: "B+" },
      { subject: "Tharreh", marks: 88, total_marks: 100, percentage: 88, grade: "A" },
    
    ],
    standard: "10"
  }

  // Load Academic Years
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setAcademicYears(sampleAcademicYears)
      const currentYear = sampleAcademicYears.find(y => y.is_current === true)
      if (currentYear) {
        setSelectedAcademicYear(currentYear.id.toString())
      }
      setLoading(false)
    }, 500)
  }, [])

  // Load Classes
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setAllClasses(sampleClasses)
      setLoading(false)
    }, 500)
  }, [])

  // Load Terms based on selected academic year
  useEffect(() => {
    if (!selectedAcademicYear) return

    setLoading(true)
    setTimeout(() => {
      setAllTerms(sampleTerms)
      const latestTerm = sampleTerms.reduce((latest, current) =>
        current.id > latest.id ? current : latest
      )
      setSelectedTerm(latestTerm.id)
      setLoading(false)
    }, 300)
  }, [selectedAcademicYear])

  // Load Student Progress
  useEffect(() => {
    if (!selectedStudent?.id || !selectedTerm) return

    setLoading(true)
    setTimeout(() => {
      setStudentProgress(sampleProgressData.records)
      setStandard(sampleProgressData.standard)
      setLoading(false)
    }, 500)
  }, [selectedStudent, selectedTerm])

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setSelectedStudent(null)
    setStudentProgress([])
  }

  const handleStudentSelect = (studentData) => {
    setSelectedStudent(studentData)
  }

  const handleAcademicYearChange = (e) => {
    setSelectedAcademicYear(e.target.value)
    setSelectedTerm('')
    setStudentProgress([])
    setAllTerms([])
  }

  const getImageUrl = (url) => {
    return url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  }

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
                  Check Student Progress
                </h1>
                <p className="text-xs text-white/90">
                  Academic Performance of Students
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
                      disabled={loading || !selectedAcademicYear}
                      className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${
                        !selectedAcademicYear
                          ? 'opacity-50 cursor-not-allowed bg-gray-100'
                          : selectedClass?.id === classData.id
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
          <div className="bg-white rounded-2xl shadow-xl p-2 py-4 mt-3 mb-8">
            <h3 className="text-xs md:text-lg font-bold text-blue-600 mb-4 text-center">
              Students in Class {selectedClass.std}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {selectedClass.students.map((student, index) => (
                <button
                  key={index}
                  className="p-2 py-3 rounded-xl border-2 border-gray-200 hover:border-green-300 bg-white hover:bg-green-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => handleStudentSelect(student)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={getImageUrl(student.image)}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-gray-800 text-sm">
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.place}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Report */}
        {selectedStudent && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Student Header */}
            <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20">
                  <img
                    src={getImageUrl(selectedStudent.image)}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-sm md:text-lg font-bold mb-1">
                    {selectedStudent.name}
                  </h2>
                  <p className="text-blue-100 text-xs">
                    Place : {selectedStudent.place}
                  </p>
                  <p className="text-blue-100 text-xs">
                    Progress Class : <span className='font-semibold'>{standard || 'Loading..'}</span> 
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 ">
              <div className="grid grid-cols-2 gap-6">
                {/* Academic Year */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-600 mb-2">
                    Academic Year
                  </label>
                  <select
                    value={selectedAcademicYear}
                    onChange={handleAcademicYearChange}
                    className="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={loading || academicYears.length === 0}
                  >
                    {academicYears.length === 0 ? (
                      <option value="">No academic years available</option>
                    ) : (
                      academicYears.map((year) => (
                        <option key={year.id} value={year.id}>
                          {year.year}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Academic Term */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-gray-600 mb-2">
                    Academic Term
                  </label>
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(Number(e.target.value))}
                    className="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={allTerms.length === 0}
                  >
                    <option value="">Select Term</option>
                    {allTerms.map((term) => (
                      <option key={term.id} value={term.id}>
                        {term.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
      </div>
      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading progress...</p>
        </div>
      ) : (
        <>
          {studentProgress.length > 0 ? (
            <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              <div className="w-full shadow-lg bg-white/90 rounded-2xl overflow-hidden h-full">
                <ProgressOverView progressData={studentProgress} />
              </div>

              <div className="w-full shadow-lg bg-white/90 rounded-2xl overflow-hidden h-full">
                <ProgressGraph
                  id={selectedStudent?.id}
                />
              </div>
            </div>
          ) : (
            <div className="md:text-sm text-xs text-center py-10 text-gray-500">
              No progress data available for this student
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CheckStdProgrTCH