import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Award } from 'lucide-react'
import ProgressOverView from './ProgressOverView'
import ProgressGraph from './ProgressGraph'

const StudentsProgressSTD = () => {
  const [allTerms, setAllTerms] = useState([])
  const { studentId } = useParams();
  const [selectedTerm, setSelectedTerm] = useState('')
  const [studentProgress, setStudentProgress] = useState([])
  const [loading, setLoading] = useState(false)
  const [academicYears, setAcademicYears] = useState([])
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('')
  const [error, setError] = useState(null)
  const [standard, setStandard] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState({
    name: '',
    image: '',
    place: ''
  })

  // Sample academic years data
  const sampleAcademicYears = [
    { id: 1, year: "2023-2024", is_current: false },
    { id: 2, year: "2024-2025", is_current: true },
    { id: 3, year: "2025-2026", is_current: false }
  ]

  // Sample terms data for different academic years
  const sampleTermsData = {
    1: [ // Academic Year 2023-2024
      { id: 101, name: "Term 1" },
      { id: 102, name: "Term 2" },
      { id: 103, name: "Term 3" }
    ],
    2: [ // Academic Year 2024-2025 (Current)
      { id: 201, name: "Term 1" },
      { id: 202, name: "Term 2" }
    ],
    3: [ // Academic Year 2025-2026
      { id: 301, name: "Term 1" }
    ]
  }

  // Sample student data for different student IDs
const sampleStudentData = {
    // Student ID: 101 (Muhammad Ahmed)
    101: {
      student: "Muhammad Ahmed",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
      place: "Mumbai",
      standard: "1",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 92,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 88,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 85,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 90,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
       
      ]
    },
    // Student ID: 102 (Fatima Zahra)
    102: {
      student: "Fatima Zahra",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
      place: "Mumbai",
      standard: "1",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 95,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 91,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 89,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 93,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
       
      ]
    },
    // Student ID: 103 (Omar Farooq)
    103: {
      student: "Omar Farooq",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
      place: "Mumbai",
      standard: "1",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 78,
          total_marks: 100,
          grade: "B+",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 82,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 75,
          total_marks: 100,
          grade: "B",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 80,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
       
      ]
    },
    // Student ID: 104 (Aisha Siddiqua)
    104: {
      student: "Aisha Siddiqua",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
      place: "Mumbai",
      standard: "1",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 88,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 94,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 86,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 89,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        
      ]
    },
    // Student ID: 105 (Abdullah Malik)
    105: {
      student: "Abdullah Malik",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
      place: "Mumbai",
      standard: "2",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 84,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 79,
          total_marks: 100,
          grade: "B+",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 88,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 91,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
       
      ]
    },
    // Student ID: 201 (Mariam Alia)
    201: {
      student: "Mariam Alia",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
      place: "Delhi",
      standard: "2",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 88,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 86,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 92,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 85,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
      
      ]
    },
    // Student ID: 202 (Hassan Raza)
    202: {
      student: "Hassan Raza",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
      place: "Delhi",
      standard: "3",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 96,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 94,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 90,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 95,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
      
      ]
    },
    // Student ID: 203 (Zainab Khatoon)
    203: {
      student: "Zainab Khatoon",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
      place: "Delhi",
      standard: "3",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 91,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 93,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 87,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 89,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
      
      ]
    },
    // Student ID: 301 (Bilal Hussain)
    301: {
      student: "Bilal Hussain",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
      place: "Kerala",
      standard: "4",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 82,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 79,
          total_marks: 100,
          grade: "B+",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 88,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 85,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
       
      ]
    },
    // Student ID: 302 (Khadija Begum)
    302: {
      student: "Khadija Begum",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
      place: "Kerala",
      standard: "4",
      records: [
        {
          id: 1,
          subject: "Fiqh",
          marks: 94,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 2,
          subject: "Akhlaq",
          marks: 96,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 3,
          subject: "Tareekh",
          marks: 91,
          total_marks: 100,
          grade: "A+",
          status: "Pass"
        },
        {
          id: 4,
          subject: "Tajweed",
          marks: 89,
          total_marks: 100,
          grade: "A",
          status: "Pass"
        },
      
      ]
    },
    
    // Student with no progress data (for testing)
    999: {
      student: "Test Student",
      image: "",
      place: "Test Location",
      standard: "5",
      records: []
    }
  }

  // Fetch Academic Years
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoading(true)
        
        // Simulate API delay
        setTimeout(() => {
          setAcademicYears(sampleAcademicYears)
          
          // Find current academic year first
          const currentYear = sampleAcademicYears.find(y => y.is_current === true)
          
          if (currentYear) {
            setSelectedAcademicYear(currentYear.id.toString())
          } else if (sampleAcademicYears.length > 0) {
            // Fallback to first year if no current year found
            setSelectedAcademicYear(sampleAcademicYears[0].id.toString())
          }
          
          setLoading(false)
        }, 500)
      } catch (error) {
        setError('Failed to load academic years')
        setLoading(false)
      }
    }

    fetchAcademicYears()
  }, [])

  // Fetch Terms based on selected academic year
  useEffect(() => {
    const fetchAllTerms = async () => {
      if (!selectedAcademicYear) return

      try {
        // Simulate API delay
        setTimeout(() => {
          const termsArray = sampleTermsData[selectedAcademicYear] || []
          setAllTerms(termsArray)

          // Auto-select latest term by ID
          if (termsArray.length > 0) {
            const latestTerm = termsArray.reduce((latest, current) =>
              current.id > latest.id ? current : latest
            )
            setSelectedTerm(latestTerm.id)
          } else {
            setSelectedTerm('') // Reset if no terms
          }
        }, 500)
      } catch (err) {
        console.error(err)
        setAllTerms([]) // Set empty array on error
        setSelectedTerm('')
      }
    }

    fetchAllTerms()
  }, [selectedAcademicYear])

  // Fetch Student Progress
  useEffect(() => {
    const fetchStudentProgress = async () => {
      if (!studentId || !selectedTerm) return

      setLoading(true)
      setError(null)

      try {
        // Simulate API delay
        setTimeout(() => {
          const studentData = sampleStudentData[studentId] || {
            student: "Unknown Student",
            image: "",
            place: "Unknown",
            standard: "N/A",
            records: []
          }

          // Update student information from response
          setSelectedStudent({
            name: studentData.student || '',
            image: studentData.image || '',
            place: studentData.place || ''
          })
          
          // Set the records for progress overview
          setStudentProgress(studentData.records || [])
          
          // Set the standard
          setStandard(studentData.standard || null)
          
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error('Error fetching progress:', error)
        setError('Failed to load student progress')
        setStudentProgress([])
        setSelectedStudent({
          name: '',
          image: '',
          place: ''
        })
        setLoading(false)
      }
    }

    fetchStudentProgress()
  }, [studentId, selectedTerm])

  const handleAcademicYearChange = (e) => {
    setSelectedAcademicYear(e.target.value)
    setSelectedTerm('')      // Reset term when academic year changes
    setStudentProgress([])   // Clear previous progress
    setAllTerms([])          // Clear terms while loading new ones
  }

  const getImageUrl = (url) => {
    return url || null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-1">
      <div className="mx-auto max-w-8xl">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-4">
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

        {/* Progress Report */}
        {studentId && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-4">
            {/* Student Header */}
            <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20">
                  {selectedStudent.image ? (
                    <img
                      src={getImageUrl(selectedStudent.image)}
                      alt="profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/64';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-400 text-white text-xl font-bold">
                      {selectedStudent.name?.charAt(0) || 'S'}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-sm md:text-lg font-bold mb-1">
                    {selectedStudent.name || 'Loading...'}
                  </h2>
                  <p className="text-blue-100 text-xs">
                    Progress Class: <span className='font-semibold'>{standard || 'Loading...'}</span> 
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
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
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin h-12 w-12 border-b-2 border-blue-500 rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading progress...</p>
          </div>
        ) : (
          <>
            {studentProgress.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                <div className="w-full shadow-lg bg-white/90 rounded-2xl overflow-hidden h-full">
                  <ProgressOverView progressData={studentProgress} />
                </div>

                <div className="w-full shadow-lg bg-white/90 rounded-2xl overflow-hidden h-full">
                  <ProgressGraph studentId={studentId} />
                </div>
              </div>
            ) : (
              !loading && selectedTerm && (
                <div className="md:text-sm text-xs text-center py-10 text-gray-500">
                  No progress data available for this student
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default StudentsProgressSTD