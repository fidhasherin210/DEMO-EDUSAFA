import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  MessageCircle,
  User,
  GraduationCap,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  ArrowLeft,
  Briefcase,
  Clock,
  Heart,
} from 'lucide-react'

function ContactTeacher() {
  const [teacherDetails, setTeacherDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { studentId } = useParams()
  const navigate = useNavigate()

  // Sample teacher data
  const sampleTeacherData = {
    teacher: {
      id: 1,
      name: "Hafiz Abdullah Khan",
      reg_no: "TCH2021001",
      image: "https://static.vecteezy.com/system/resources/thumbnails/070/246/232/small/muslim-man-in-white-shirt-and-hat-with-hands-outstretched-photo.JPG",
      place: "Mumbai, Maharashtra",
      phone_no: "+919876543210",
      email: "ahmed.hassan@school.edu",
      salary: 45000,
      joined_date: "2021-06-15",
      father_name: "Mohammed Hassan",
      blood_grp: "B+",
      msr_no: "MSR2021-089",
      other_occupation: "Educational Consultant",
      islamic_qualification: "Hafiz-ul-Quran, Alimiyath",
      academic_qualification: "M.A. Islamic Studies, B.Ed",
      address: "Flat No. 402, Al-Noor Apartments, Juhu Lane, Andheri West, Mumbai - 400053",
      is_active: true,
      updated_at: "2024-12-15T10:30:00Z"
    }
  }

  useEffect(() => {
    // Simulate API call with loading
    setLoading(true)
    setTimeout(() => {
      try {
        if (studentId) {
          // For demo purposes, always return the sample teacher
          setTeacherDetails(sampleTeacherData.teacher)
          setError(null)
        } else {
          setError('Class teacher not found')
        }
      } catch (err) {
        setError('Failed to fetch teacher details')
      } finally {
        setLoading(false)
      }
    }, 1000) // Simulate network delay
  }, [studentId])

  const handleCall = (number) => {
    window.open(`tel:${number}`)
  }

  const handleWhatsApp = (number) => {
    const whatsappURL = `https://wa.me/${number.replace(/[^0-9]/g, '')}`
    window.open(whatsappURL, '_blank')
  }

  const getImageUrl = (url) => {
    return url || `https://ui-avatars.com/api/?name=${encodeURIComponent(
      teacherDetails?.name || 'Teacher'
    )}&background=2563eb&color=fff&size=200&bold=true`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-600">
            Loading class teacher details...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-sm w-full text-center">
          <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mb-4">
            <User className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-sm font-semibold text-gray-800 mb-1">
            Class Teacher Not Assigned
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            The class teacher information is not available at the moment.
            Please check again later or contact the school administration.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Profile Header with Cover */}
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

            {/* Profile Info Container */}
            <div className="relative pt-8 pb-6 px-4 lg:pt-10 lg:pb-8">
              <div className="flex flex-col items-center">
                {/* Profile Image with Ring Effect */}
                <div className="relative mb-3 lg:mb-4">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-xl"></div>
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-white/50 shadow-xl lg:w-32 lg:h-32">
                    {teacherDetails?.image ? (
                      <img
                        src={getImageUrl(teacherDetails.image)}
                        alt={teacherDetails.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            teacherDetails.name || 'Teacher'
                          )}&background=ffffff&color=2563eb&size=96&bold=true`
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                        <span className="text-white text-2xl md:text-3xl font-bold lg:text-4xl">
                          {teacherDetails?.name ? teacherDetails.name.charAt(0).toUpperCase() : 'T'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Teacher Name */}
                <h2 className="text-white text-lg md:text-xl font-bold mb-1 text-center lg:text-2xl lg:mb-2">
                  {teacherDetails?.name || 'No Name'}
                </h2>

                {/* Role Badge */}
                <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                  <GraduationCap className="w-3 h-3 text-white/80" />
                  <span className="text-white text-xs font-medium">Class Teacher</span>
                </div>

                {/* Location */}
                {teacherDetails?.place && (
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-white/80" />
                    <span className="text-white text-xs">{teacherDetails.place}</span>
                  </div>
                )}
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
                {teacherDetails?.reg_no || 'N/A'}
              </p>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                Salary
              </p>
              <p className="text-xs font-bold text-emerald-600 lg:text-sm">
                {teacherDetails?.salary ? `₹${teacherDetails.salary.toLocaleString()}` : 'N/A'}
              </p>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                Joined
              </p>
              <p className="text-[12px] font-bold text-slate-800 md:text-sm">
                {formatDate(teacherDetails?.joined_date)}
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-3 lg:p-6">
            {/* Contact Information Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-blue-50 rounded-lg lg:p-2">
                  <Phone className="w-3.5 h-3.5 text-blue-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 lg:gap-3">
                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Phone
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                      {teacherDetails?.phone_no || 'N/A'}
                    </p>
                    <button
                      onClick={() => handleCall(teacherDetails?.phone_no)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Phone className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      WhatsApp
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                      {teacherDetails?.phone_no || 'N/A'}
                    </p>
                    <button
                      onClick={() => handleWhatsApp(teacherDetails?.phone_no)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <MessageCircle className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="col-span-2 bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Mail className="w-2.5 h-2.5 text-purple-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Email
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacherDetails?.email || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-indigo-50 rounded-lg lg:p-2">
                  <User className="w-3.5 h-3.5 text-indigo-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 lg:gap-3">
                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Father's Name
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacherDetails?.father_name || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Heart className="w-2.5 h-2.5 text-red-400 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Blood Group
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 lg:text-sm">
                    {teacherDetails?.blood_grp || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Briefcase className="w-2.5 h-2.5 text-orange-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      MSR No.
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacherDetails?.msr_no || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Briefcase className="w-2.5 h-2.5 text-teal-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Other Occupation
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacherDetails?.other_occupation || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Qualifications Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-emerald-50 rounded-lg lg:p-2">
                  <Award className="w-3.5 h-3.5 text-emerald-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Qualifications
                </h3>
              </div>

              <div className="space-y-2 lg:space-y-3">
                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <BookOpen className="w-2.5 h-2.5 text-emerald-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Islamic Qualification
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 lg:text-sm">
                    {teacherDetails?.islamic_qualification || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <GraduationCap className="w-2.5 h-2.5 text-blue-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Academic Qualification
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 lg:text-sm">
                    {teacherDetails?.academic_qualification || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-amber-50 rounded-lg lg:p-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Address
                </h3>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl lg:p-4">
                <p className="text-xs text-slate-700 leading-relaxed lg:text-sm">
                  {teacherDetails?.address || 'N/A'}
                </p>
              </div>
            </div>

            {/* Footer with Status and Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 lg:pt-4">
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                  teacherDetails?.is_active ? 'bg-green-50' : 'bg-gray-50'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    teacherDetails?.is_active ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <span className={`text-[11px] font-medium ${
                    teacherDetails?.is_active ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {teacherDetails?.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-slate-400 lg:w-3 lg:h-3" />
                  <p className="text-[10px] text-slate-400 lg:text-xs">
                    Updated {formatDate(teacherDetails?.updated_at)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleCall(teacherDetails?.phone_no)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 lg:px-5 lg:py-2.5 lg:text-sm lg:gap-2"
                >
                  <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  Call
                </button>
                <button
                  onClick={() => handleWhatsApp(teacherDetails?.phone_no)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 transition-all duration-200 lg:px-5 lg:py-2.5 lg:text-sm lg:gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactTeacher