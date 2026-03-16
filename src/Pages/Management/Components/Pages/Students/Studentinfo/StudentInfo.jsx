import React, { useState } from 'react'
import {
  User,
  BookOpen,
  ArrowLeft,
  MapPin,
  Users,
  Droplet,
  Phone,
  Home,
  Calendar,
  Edit2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const StudentInfo = () => {
  const [allClasses, setAllClasses] = useState([
    {
      id: 1,
      std: "1",
      students: [
        {
          id: 101,
          name: "Mazin Mahaboob",
          place: "Mumbai",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
          reg_no: "REG2024001",
          gender: "M",
          blood_group: "O+",
          phone_no: "+91 98765 43210",
          dob: "2014-05-12",
          parent_name: "Muhammed",
          parent_occupation: "Business Owner",
          address: "123, Lake View Apartments, Andheri East, Mumbai - 400069",
          total_fee_amount: 45000,
          admission_date: "2024-06-01",
          former_school: "St. Xavier's School",
          updated_at: "2024-12-15T10:30:00"
        },
        {
          id: 102,
          name: "Riya Kadeeja",
          place: "Mumbai",
          image: "https://static.vecteezy.com/system/resources/previews/060/422/478/non_2x/young-muslim-girl-reading-quran-in-serene-transparent-background-focused-on-faith-and-spirituality-free-png.png",
          reg_no: "REG2024002",
          gender: "F",
          blood_group: "A+",
          phone_no: "+91 98765 43211",
          dob: "2014-08-23",
          parent_name: "Ahammed",
          parent_occupation: "Teacher",
          address: "456, Green Park Colony, Juhu, Mumbai - 400049",
          total_fee_amount: 45000,
          admission_date: "2024-06-01",
          former_school: "Ryan International School",
          updated_at: "2024-12-14T15:45:00"
        }
      ]
    },
    {
      id: 2,
      std: "2",
      students: [
        {
          id: 201,
          name: "Abu Hani",
          place: "Delhi",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
          reg_no: "REG2024003",
          gender: "M",
          blood_group: "B+",
          phone_no: "+91 98765 43212",
          dob: "2014-03-15",
          parent_name: "Ameer",
          parent_occupation: "Software Engineer",
          address: "789, Sunrise Apartments, Dwarka, Delhi - 110075",
          total_fee_amount: 45000,
          admission_date: "2024-06-01",
          former_school: "DPS School",
          updated_at: "2024-12-13T09:15:00"
        },
        {
          id: 202,
          name: "Jumana",
          place: "Delhi",
          image: "https://static.vecteezy.com/system/resources/previews/060/422/478/non_2x/young-muslim-girl-reading-quran-in-serene-transparent-background-focused-on-faith-and-spirituality-free-png.png",
          reg_no: "REG2024004",
          gender: "F",
          blood_group: "AB+",
          phone_no: "+91 98765 43213",
          dob: "2014-11-07",
          parent_name: "Suneer",
          parent_occupation: "Doctor",
          address: "321, Royal Residency, Rohini, Delhi - 110085",
          total_fee_amount: 45000,
          admission_date: "2024-06-01",
          former_school: "Sanskriti School",
          updated_at: "2024-12-12T11:20:00"
        }
      ]
    },
    {
      id: 3,
      std: "3",
      students: [
        {
          id: 301,
          name: "mahaboob",
          place: "Kerala",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
          reg_no: "REG2024005",
          gender: "M",
          blood_group: "O-",
          phone_no: "+91 98765 43214",
          dob: "2013-07-19",
          parent_name: "Aboobakkar",
          parent_occupation: "Bank Manager",
          address: "567, Green Valley, Kochi, Kerala - 682020",
          total_fee_amount: 48000,
          admission_date: "2023-06-01",
          former_school: "Chinmaya Vidyalaya",
          updated_at: "2024-12-11T14:30:00"
        },
        {
          id: 302,
          name: "Minu Fathim",
          place: "Kerala",
          image: "https://static.vecteezy.com/system/resources/previews/060/422/478/non_2x/young-muslim-girl-reading-quran-in-serene-transparent-background-focused-on-faith-and-spirituality-free-png.png",
          reg_no: "REG2024006",
          gender: "F",
          blood_group: "A-",
          phone_no: "+91 98765 43215",
          dob: "2013-09-28",
          parent_name: "Omer abdullah",
          parent_occupation: "Architect",
          address: "890, Lake View, Trivandrum, Kerala - 695001",
          total_fee_amount: 48000,
          admission_date: "2023-06-01",
          former_school: "Sarada Vidyalaya",
          updated_at: "2024-12-10T16:45:00"
        }
      ]
    },
    {
      id: 4,
      std: "4",
      students: [
        {
          id: 401,
          name: "Ozil Habeeb",
          place: "Bangalore",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
          reg_no: "REG2024007",
          gender: "M",
          blood_group: "B-",
          phone_no: "+91 98765 43216",
          dob: "2013-02-10",
          parent_name: "Naseer",
          parent_occupation: "IT Consultant",
          address: "123, Tech Park View, Whitefield, Bangalore - 560066",
          total_fee_amount: 48000,
          admission_date: "2023-06-01",
          former_school: "National Public School",
          updated_at: "2024-12-09T10:15:00"
        },
        {
          id: 402,
          name: "Farseen",
          place: "Bangalore",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
          reg_no: "REG2024008",
          gender: "F",
          blood_group: "AB-",
          phone_no: "+91 98765 43217",
          dob: "2013-12-03",
          parent_name: "Rahman",
          parent_occupation: "CA",
          address: "456, Garden City, Indiranagar, Bangalore - 560038",
          total_fee_amount: 48000,
          admission_date: "2023-06-01",
          former_school: "Franklin Public School",
          updated_at: "2024-12-08T13:25:00"
        }
      ]
    },
    
  ])
  
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [studentDetails, setStudentDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchingDetails, setFetchingDetails] = useState(false)
  
  const navigate = useNavigate()

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setSelectedStudent(null)
    setStudentDetails(null)
  }

  const handleStudentSelect = async (student) => {
    setSelectedStudent(student)
    await fetchStudentDetails(student.id)
  }

  const fetchStudentDetails = async (studentId) => {
    setFetchingDetails(true)
    
    // Simulate API delay
    setTimeout(() => {
      // Find the complete student details from our sample data
      for (const classItem of allClasses) {
        const foundStudent = classItem.students.find(s => s.id === studentId)
        if (foundStudent) {
          setStudentDetails(foundStudent)
          break
        }
      }
      setFetchingDetails(false)
    }, 500)
  }

  const getImageUrl = (url) => {
    return url || null
  }

  const editStudentInfo = () => {
    const studentData = studentDetails || selectedStudent
    navigate('/principal/edit-student', {
      state: { selectedStudent: studentData },
    })
  }

  const displayStudent = studentDetails || selectedStudent

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Check Students Details
                </h1>
                <p className="text-xs text-white/90">
                  Check all Students Personal Info
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="px-1 mx-auto -mt-3">
          <div className="max-w-8xl mx-auto mb-2">
            <div className="p-5 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Selection */}
        {selectedClass && !displayStudent && (
          <div className="bg-white rounded-2xl px-3 py-4 shadow-sm border border-slate-200 mb-8">
            <h2 className="text-xs md:text-sm font-semibold text-blue-600 text-center mb-4">
              Students in Class {selectedClass.std}
            </h2>

            <div className="grid gap-2">
              {selectedClass.students && selectedClass.students.length > 0 ? (
                selectedClass.students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    disabled={fetchingDetails}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getImageUrl(student.image)}
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = 'https://via.placeholder.com/48'
                        }}
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
                ))
              ) : (
                <div className="py-4 text-center text-gray-500">
                  No students found in this class
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading Indicator for Student Details */}
        {fetchingDetails && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex justify-center">
              <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-center text-gray-500 mt-2">
              Loading student details...
            </p>
          </div>
        )}

        {/* Student Profile - Modern Redesign */}
        {displayStudent && !fetchingDetails && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Profile Header with Cover Image Effect */}
            <div className="relative">
              {/* Abstract Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <svg
                  className="absolute bottom-0 w-full h-12 text-white opacity-25"
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

              {/* Back Button */}
              <button
                className="absolute top-3 left-3 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all lg:p-3"
                onClick={() => {
                  setSelectedStudent(null)
                  setStudentDetails(null)
                }}
              >
                <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>

              {/* Profile Info Container */}
              <div className="relative pt-8 pb-6 px-4 lg:pt-10 lg:pb-8">
                <div className="flex flex-col items-center">
                  {/* Profile Image with Ring Effect */}
                  <div className="relative mb-3 lg:mb-4">
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-xl"></div>
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-white/50 shadow-xl lg:w-32 lg:h-32">
                      {displayStudent.image ? (
                        <img
                          src={getImageUrl(displayStudent.image)}
                          alt={displayStudent.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              displayStudent.name,
                            )}&background=ffffff&color=2563eb&size=96&bold=true`
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                          <span className="text-white text-2xl md:text-3xl font-bold lg:text-4xl">
                            {displayStudent.name
                              ? displayStudent.name.charAt(0).toUpperCase()
                              : 'S'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Student Name */}
                  <h2 className="text-white text-lg md:text-xl font-bold mb-1 text-center lg:text-2xl lg:mb-2">
                    {displayStudent.name || 'No Name'}
                  </h2>

                  {/* Location and Class Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-2 lg:gap-3">
                    {displayStudent.place && (
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full lg:px-3 lg:py-1.5">
                        <MapPin className="w-3 h-3 text-white/80 lg:w-4 lg:h-4" />
                        <span className="text-white text-xs lg:text-sm">
                          {displayStudent.place}
                        </span>
                      </div>
                    )}

                    {displayStudent.gender && (
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full lg:px-3 lg:py-1.5">
                        <span className="text-white text-xs lg:text-sm">
                          {displayStudent.gender === 'M'
                            ? '👨 Male'
                            : displayStudent.gender === 'F'
                            ? '👩 Female'
                            : '🧑 Other'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-1 p-3 bg-slate-50/80 border-b border-slate-100 lg:p-4 lg:gap-3">
              <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                  Reg No.
                </p>
                <p className="text-xs font-bold text-slate-800 truncate lg:text-sm">
                  {displayStudent.reg_no || 'N/A'}
                </p>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                  Fee
                </p>
                <p className="text-xs font-bold text-emerald-600 lg:text-sm">
                  {displayStudent.total_fee_amount
                    ? `₹${displayStudent.total_fee_amount.toLocaleString()}`
                    : 'N/A'}
                </p>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                  Admission
                </p>
                <p className="text-[12px] font-bold text-slate-800 md:text-sm">
                  {displayStudent.admission_date
                    ? new Date(
                        displayStudent.admission_date,
                      ).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-3 lg:p-6">
              {/* Personal Information Section */}
              <div className="mb-5 lg:mb-6">
                <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                  <div className="p-1.5 bg-blue-50 rounded-lg lg:p-2">
                    <Users className="w-3.5 h-3.5 text-blue-600 lg:w-5 lg:h-5" />
                  </div>
                  <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 lg:gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                        Parent
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                      {displayStudent.parent_name || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                        Parent Occupation
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                      {displayStudent.parent_occupation || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Droplet className="w-2.5 h-2.5 text-red-400 lg:w-4 lg:h-4" />
                      <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                        Blood
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 lg:text-sm">
                      {displayStudent.blood_group || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Phone className="w-2.5 h-2.5 text-green-500 lg:w-4 lg:h-4" />
                      <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                        Phone
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 lg:text-sm">
                      {displayStudent.phone_no || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                    <div className="flex items-center gap-1 mb-0.5">
                      <MapPin className="w-2.5 h-2.5 text-purple-500 lg:w-4 lg:h-4" />
                      <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                        Place
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                      {displayStudent.place || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Calendar className="w-2.5 h-2.5 text-blue-500 lg:w-4 lg:h-4" />
                      <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                        Date of Birth
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                      {displayStudent.dob || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Details Section */}
              <div className="mb-5 lg:mb-6">
                <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                  <div className="p-1.5 bg-indigo-50 rounded-lg lg:p-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600 lg:w-5 lg:h-5" />
                  </div>
                  <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                    Academic Details
                  </h3>
                </div>

                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl lg:p-3">
                    <span className="text-xs text-slate-600 lg:text-sm">
                      Class
                    </span>
                    <span className="text-xs  text-slate-800 lg:text-sm">
                      {selectedClass?.std || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl lg:p-3">
                    <span className="text-xs text-slate-600 lg:text-sm">
                      Registration No.
                    </span>
                    <span className="text-xs font-semibold text-slate-800 lg:text-sm">
                      {displayStudent.reg_no || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl lg:p-3">
                    <span className="text-xs text-slate-600 lg:text-sm">
                      Former School
                    </span>
                    <span className="text-xs  text-slate-800 lg:text-sm">
                      {displayStudent.former_school || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="mb-4 lg:mb-6">
                <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                  <div className="p-1.5 bg-emerald-50 rounded-lg lg:p-2">
                    <Home className="w-3.5 h-3.5 text-emerald-600 lg:w-5 lg:h-5" />
                  </div>
                  <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                    Address
                  </h3>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl lg:p-4">
                  <p className="text-xs text-slate-700 leading-relaxed lg:text-sm">
                    {displayStudent.address || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Footer with Update Time and Edit Button */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 lg:pt-4">
                <div className="flex items-center gap-1 lg:gap-2">
                  <Calendar className="w-3 h-3 text-slate-400 lg:w-4 lg:h-4" />
                  <p className="text-[11px] text-slate-400 lg:text-xs">
                    Updated{' '}
                    {displayStudent.updated_at
                      ? new Date(displayStudent.updated_at).toLocaleDateString(
                          'en-IN',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )
                      : new Date().toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                  </p>
                </div>
                <button
                  onClick={editStudentInfo}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105 transition-all duration-200 lg:px-5 lg:py-2.5 lg:text-sm lg:gap-2"
                >
                  <Edit2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentInfo