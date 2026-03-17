import React, { useEffect, useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  Hash, 
  Home, 
  Droplet, 
  Users,
  BookOpen,
  ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function StudentsProfile() {
  const [student, setStudent] = useState(null);
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sample Data
  
  useEffect(() => {
    // Simulate loading data
    const loadStudentData = () => {
      setLoading(true);
      try {
        // Simulate API delay
        setTimeout(() => {
          setStudent(sampleStudentData.student);
          setParent(sampleStudentData.parent);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error loading data', err);
        setLoading(false);
      }
    };

    loadStudentData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-600 font-medium">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!student || !parent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Student Data</h2>
          <p className="text-gray-600 mb-4">Unable to load student profile</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const getImageUrl = () => {
    return student?.image || null;
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto">
        {/* Student Profile - Modern Redesign */}
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
              onClick={() => navigate(-1)}
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
                    {getImageUrl() ? (
                      <img
                        src={getImageUrl()}
                        alt={student.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            student.name,
                          )}&background=ffffff&color=2563eb&size=96&bold=true`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                        <span className="text-white text-2xl md:text-3xl font-bold lg:text-4xl">
                          {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Student Name */}
                <h2 className="text-white text-lg md:text-xl font-bold mb-1 text-center lg:text-2xl lg:mb-2">
                  {student.name || 'No Name'}
                </h2>

                {/* Location and Class Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-2 lg:gap-3">
                  {student.place && (
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full lg:px-3 lg:py-1.5">
                      <MapPin className="w-3 h-3 text-white/80 lg:w-4 lg:h-4" />
                      <span className="text-white text-xs lg:text-sm">
                        {student.place}
                      </span>
                    </div>
                  )}

                  {student.gender && (
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full lg:px-3 lg:py-1.5">
                      <span className="text-white text-xs lg:text-sm">
                        {student.gender === 'M' ? '👨 Male' : student.gender === 'F' ? '👩 Female' : '🧑 Other'}
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
                {student.reg_no || 'N/A'}
              </p>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                Class
              </p>
              <p className="text-xs font-bold text-emerald-600 lg:text-sm">
                {student.standard || 'N/A'}
              </p>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                Admission
              </p>
              <p className="text-[12px] font-bold text-slate-800 md:text-sm">
                {student.admission_date ? formatDate(student.admission_date) : 'N/A'}
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-3 lg:p-6">
            {/* Student Information Section */}
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
                      Gender
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {student.gender === 'M' ? 'Male' : student.gender === 'F' ? 'Female' : 'Other'}
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
                    {student.blood_group || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Date of Birth
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 lg:text-sm">
                    {student.dob ? formatDate(student.dob) : 'N/A'}
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
                    {student.place || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Parent Information Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-indigo-50 rounded-lg lg:p-2">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Parent Details
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 lg:gap-3">
                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Parent Name
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {parent.name || 'N/A'}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Occupation
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 truncate lg:text-sm">
                    {parent.occupation || 'N/A'}
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
                    {parent.number || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Details Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-emerald-50 rounded-lg lg:p-2">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 lg:w-5 lg:h-5" />
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
                  <span className="text-xs font-semibold text-slate-800 lg:text-sm">
                    {student.standard || 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <span className="text-xs text-slate-600 lg:text-sm">
                    Registration No.
                  </span>
                  <span className="text-xs font-semibold text-slate-800 lg:text-sm">
                    {student.reg_no || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Address Section */}
            {parent.address && (
              <div className="mb-4 lg:mb-6">
                <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                  <div className="p-1.5 bg-amber-50 rounded-lg lg:p-2">
                    <Home className="w-3.5 h-3.5 text-amber-600 lg:w-5 lg:h-5" />
                  </div>
                  <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                    Address
                  </h3>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl lg:p-4">
                  <p className="text-xs text-slate-700 leading-relaxed lg:text-sm">
                    {parent.address}
                  </p>
                </div>
              </div>
            )}

            {/* Footer with Update Time */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 lg:pt-4">
              <div className="flex items-center gap-1 lg:gap-2">
                <Calendar className="w-3 h-3 text-slate-400 lg:w-4 lg:h-4" />
                <p className="text-[11px] text-slate-400 lg:text-xs">
                  Profile Information • Student & Parent Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsProfile;