import React, { useState, useEffect } from 'react'
import { BookOpen, Award } from 'lucide-react'
import ProgressOverView from './ProgressOverView'
import ProgressGraph from './ProgressGraph'

const StdProgressAuth = () => {
  // Sample data
  const sampleAcademicYears = [
    { id: 1, year: "2023-2024" },
    { id: 2, year: "2022-2023" },
    { id: 3, year: "2021-2022" }
  ]

  const sampleTerms = [
    { id: 1, name: "Term 1" },
    { id: 2, name: "Term 2" },
    { id: 3, name: "Term 3" }
  ]

  const sampleClasses = [
    {
      id: 1,
      std: " 1",
      students: [
        {
          id: 101,
          name: "dilu fathim",
          place: "New York, USA",
          image: "https://static.vecteezy.com/system/resources/previews/060/422/478/non_2x/young-muslim-girl-reading-quran-in-serene-transparent-background-focused-on-faith-and-spirituality-free-png.png"
        },
        {
          id: 102,
          name: "Hani mazin",
          place: "Toronto, Canada",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuwSOgPMF88VHJy4IHVHoODFxJFar2vo1GA&s"
        },
        {
          id: 103,
          name: "Rafi Hasan",
          place: "Miami, USA",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuwSOgPMF88VHJy4IHVHoODFxJFar2vo1GA&s"
        },
        {
          id: 104,
          name: "Diya",
          place: "London, UK",
          image: "https://static.vecteezy.com/system/resources/previews/060/422/478/non_2x/young-muslim-girl-reading-quran-in-serene-transparent-background-focused-on-faith-and-spirituality-free-png.png"
        }
      ]
    },
    {
      id: 2,
      std: "2",
      students: [
        {
          id: 201,
          name: "muhammed ozil",
          place: "Mumbai, India",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuwSOgPMF88VHJy4IHVHoODFxJFar2vo1GA&s"
        },
        {
          id: 202,
          name: "Minha",
          place: "Sydney, Australia",
          image: "https://static.vecteezy.com/system/resources/previews/060/422/478/non_2x/young-muslim-girl-reading-quran-in-serene-transparent-background-focused-on-faith-and-spirituality-free-png.png"
        },
        {
          id: 203,
          name: "Labeeb",
          place: "Chicago, USA",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuwSOgPMF88VHJy4IHVHoODFxJFar2vo1GA&s"
        }
      ]
    },
    {
      id: 3,
      std: "3",
      students: [
        {
          id: 301,
          name: "Ahmed Hassan",
          place: "Dubai, UAE",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuwSOgPMF88VHJy4IHVHoODFxJFar2vo1GA&s"
        },
        {
          id: 302,
          name: "Mubashir",
          place: "Madrid, Spain",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuwSOgPMF88VHJy4IHVHoODFxJFar2vo1GA&s"
        },
        {
          id: 303,
          name: "Aysha rafna",
          place: "Seoul, South Korea",
          image: "https://static.vecteezy.com/system/resources/previews/060/422/478/non_2x/young-muslim-girl-reading-quran-in-serene-transparent-background-focused-on-faith-and-spirituality-free-png.pnghttps://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop"
        }
      ]
    },
    {
      id: 4,
      std: "4",
      students: [
        {
          id: 401,
          name: "Carlos Mendez",
          place: "Mexico City, Mexico",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuwSOgPMF88VHJy4IHVHoODFxJFar2vo1GA&s"
        },
        {
          id: 402,
          name: "Aisha Khan",
          place: "Karachi, Pakistan",
          image: "https://static.vecteezy.com/system/resources/previews/060/422/478/non_2x/young-muslim-girl-reading-quran-in-serene-transparent-background-focused-on-faith-and-spirituality-free-png.png"
        }
      ]
    }
  ]

  const sampleProgressData = [
    {
      id: 1,
      subject: "Fiqh",
      mark: 95,
      total_mark: 100,
      grade: "A+"
    },
    {
      id: 2,
      subject: "Ahlaq",
      mark: 88,
      total_mark: 100,
      grade: "A"
    },
    {
      id: 3,
      subject: "Thajweed",
      mark: 92,
      total_mark: 100,
      grade: "A+"
    },
    {
      id: 4,
      subject: "Thareeh",
      mark: 85,
      total_mark: 100,
      grade: "A"
    },
   
  ]

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

  // Load sample data on mount
  useEffect(() => {
    setLoading(true)
    
    // Simulate API loading
    setTimeout(() => {
      setAcademicYears(sampleAcademicYears)
      setAllClasses(sampleClasses)
      
      if (sampleAcademicYears.length > 0) {
        const latestYear = sampleAcademicYears.reduce((latest, current) =>
          current.id > latest.id ? current : latest,
        )
        setSelectedAcademicYear(latestYear.id.toString())
      }
      
      setLoading(false)
    }, 1000)
  }, [])

  // Load terms based on selected academic year
  useEffect(() => {
    if (!selectedAcademicYear) return

    setLoading(true)
    
    // Simulate API loading
    setTimeout(() => {
      setAllTerms(sampleTerms)

      if (sampleTerms.length > 0) {
        const latestTerm = sampleTerms[sampleTerms.length - 1]
        setSelectedTerm((prev) => (prev ? prev : latestTerm.id))
      }
      
      setLoading(false)
    }, 500)
  }, [selectedAcademicYear])

  // Load student progress
  useEffect(() => {
    if (!selectedStudent?.id) return

    setLoading(true)

    // Simulate API loading
    setTimeout(() => {
      setStudentProgress(sampleProgressData)
      setLoading(false)
    }, 800)
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
    setStudentProgress([])
    setSelectedTerm('')
  }

  const getImageUrl = (url) => {
    return url
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
            </div>
          </div>
        </div>

        {/* Student Selection */}
        {selectedClass && !selectedStudent && (
          <div className="bg-white rounded-2xl shadow-xl p-2 py-4 mt-3 mb-8">
            <h3 className="text-base md:text-xl font-bold text-blue-600 mb-4">
              Students in {selectedClass.std}
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
                    {selectedStudent.place}
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
                  backendUrl={null}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No progress data available for this student
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StdProgressAuth