import React, { useEffect, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  FileText,
  Droplet,
  Briefcase,
  Hash,
  CreditCard,
  Home,
  Users,
} from 'lucide-react'

// Sample Teacher Data
const SAMPLE_TEACHER_DATA = {
  teacher: {
    name: "Dr. Abdul Rahman Al-Qasim",
    image: "https://m.media-amazon.com/images/I/51Wz9iQFntL._AC_UY1100_.jpg",
    place: "Malappuram, Kerala",
    msr_no: "MSR2024001",
    reg_no: "TCH2024001",
    joined_date: "2023-06-15",
    father_name: "Abdul Rahman Haji",
    blood_grp: "O+",
    phone_no: "+91 98765 43210",
    email: "sarah.rahman@alhuda.edu",
    dob: "1985-03-21",
    salary: 85000,
    other_occupation: "Islamic Scholar & Author",
    islamic_qualification: "Alimiyat (Jamia Nadvia)",
    academic_qualification: "M.A. Islamic Studies, Ph.D.",
    address: "H.No. 123, Near City Masjid, Malappuram - 676505, Kerala"
  }
}

function TeacherProfileTchr() {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Simulate loading sample data
  useEffect(() => {
    const loadSampleData = async () => {
      try {
        setLoading(true)
        // Simulate network delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setProfileData(SAMPLE_TEACHER_DATA)
        setError(null)
      } catch (err) {
        console.error('Error loading sample data:', err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadSampleData()
  }, [])

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const getImageUrl = (url) => {
    if (!url) return null
    if (url.startsWith('http')) return url
    return url
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Profile</h3>
          <p className="text-gray-600">Please wait while we fetch your details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // No data state
  if (!profileData || !profileData.teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Teacher Details Found
          </h3>
          <p className="text-gray-600">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    )
  }

  const { teacher } = profileData

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto">
        {/* Teacher Profile - Modern Redesign */}
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

            {/* Profile Info Container */}
            <div className="relative pt-8 pb-6 px-4 lg:pt-10 lg:pb-8">
              <div className="flex flex-col items-center">
                {/* Profile Image with Ring Effect */}
                <div className="relative mb-3 lg:mb-4">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-xl"></div>
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-white/50 shadow-xl lg:w-32 lg:h-32">
                    {teacher.image ? (
                      <img
                        src={getImageUrl(teacher.image)}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            teacher.name,
                          )}&background=ffffff&color=2563eb&size=96&bold=true`
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                        <span className="text-white text-2xl md:text-3xl font-bold lg:text-4xl">
                          {teacher.name ? teacher.name.charAt(0).toUpperCase() : 'T'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Teacher Name */}
                <h2 className="text-white text-lg md:text-xl font-bold mb-1 text-center lg:text-2xl lg:mb-2">
                  {teacher.name || 'No Name'}
                </h2>

                {/* Location and Status Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-2 lg:gap-3">
                  {teacher.place && (
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full lg:px-3 lg:py-1.5">
                      <MapPin className="w-3 h-3 text-white/80 lg:w-4 lg:h-4" />
                      <span className="text-white text-xs lg:text-sm">
                        {teacher.place}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full lg:px-3 lg:py-1.5">
                    <span className="text-white text-xs lg:text-sm">
                      👨‍🏫 Teacher
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards - MSR, Reg No, Joined Date */}
          <div className="grid grid-cols-3 gap-1 p-3 bg-slate-50/80 border-b border-slate-100 lg:p-4 lg:gap-3">
            <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                MSR No.
              </p>
              <p className="text-xs font-bold text-slate-800 truncate lg:text-sm">
                {teacher.msr_no || 'N/A'}
              </p>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                Reg No.
              </p>
              <p className="text-xs font-bold text-slate-800 truncate lg:text-sm">
                {teacher.reg_no || 'N/A'}
              </p>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                Joined
              </p>
              <p className="text-[13px] font-bold text-slate-800 md:text-xs lg:text-sm">
                {formatDate(teacher.joined_date)}
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
                      Father's Name
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacher.father_name || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Droplet className="w-2.5 h-2.5 text-red-400 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Blood Group
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 lg:text-sm">
                    {teacher.blood_grp || 'N/A'}
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
                    {teacher.phone_no || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Mail className="w-2.5 h-2.5 text-blue-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Email
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacher.email || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Calendar className="w-2.5 h-2.5 text-orange-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Date of Birth
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {formatDate(teacher.dob)}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <MapPin className="w-2.5 h-2.5 text-indigo-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Place
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacher.place || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-indigo-50 rounded-lg lg:p-2">
                  <Award className="w-3.5 h-3.5 text-indigo-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Professional Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 lg:gap-3">
                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Hash className="w-2.5 h-2.5 text-gray-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      MSR No.
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacher.msr_no || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <FileText className="w-2.5 h-2.5 text-gray-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Reg No.
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacher.reg_no || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <CreditCard className="w-2.5 h-2.5 text-emerald-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Salary
                    </span>
                  </div>
                  <p className="text-xs font-medium text-emerald-600 truncate lg:text-sm">
                    {teacher.salary ? `₹${Number(teacher.salary).toLocaleString('en-IN')}` : 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Briefcase className="w-2.5 h-2.5 text-amber-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Other Occupation
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {teacher.other_occupation || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Qualifications Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-emerald-50 rounded-lg lg:p-2">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Qualifications
                </h3>
              </div>

              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <span className="text-xs text-slate-600 lg:text-sm">
                    Islamic Qualification
                  </span>
                  <span className="text-xs font-semibold text-slate-800 lg:text-sm">
                    {teacher.islamic_qualification || 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <span className="text-xs text-slate-600 lg:text-sm">
                    Academic Qualification
                  </span>
                  <span className="text-xs font-semibold text-slate-800 lg:text-sm">
                    {teacher.academic_qualification || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Address Section */}
            {teacher.address && (
              <div className="mb-4 lg:mb-6">
                <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                  <div className="p-1.5 bg-purple-50 rounded-lg lg:p-2">
                    <Home className="w-3.5 h-3.5 text-purple-600 lg:w-5 lg:h-5" />
                  </div>
                  <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                    Address
                  </h3>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl lg:p-4">
                  <p className="text-xs text-slate-700 leading-relaxed lg:text-sm">
                    {teacher.address}
                  </p>
                </div>
              </div>
            )}

            {/* Footer with Update Time */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 lg:pt-4">
              <div className="flex items-center gap-1 lg:gap-2">
                <Calendar className="w-3 h-3 text-slate-400 lg:w-4 lg:h-4" />
                <p className="text-[11px] text-slate-400 lg:text-xs">
                  Profile Information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherProfileTchr