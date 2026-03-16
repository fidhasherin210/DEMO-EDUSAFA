import React, { useState } from 'react'
import { User } from 'lucide-react'

const TeacherInfoAuth = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Prof. Yusuf Ahmed',
      place: 'Kuala Lumpur, Malaysia',
      image: 'https://image.made-in-china.com/202f0j00KeLiuPDRgrzm/Muslim-Arabic-Dubai-Saudi-Arabia-Men-Turban.webp',
      reg_no: 'TCH001',
      father_name: 'Ahmed Abdullah',
      blood_grp: 'O+',
      phone_no: '+60 12 678 9012',
      email: 'yusuf.ahmed@example.com',
      address: '123 Jalan Ampang, Kuala Lumpur, 50450 Malaysia',
      salary: 65000,
      msr_no: 'MSR12345',
      joined_date: '2018-08-15',
      islamic_qualification: 'PhD in Hadith Studies - International Islamic University',
      academic_qualification: 'M.Sc in Mathematics',
      other_occupation: 'Part-time Lecturer'
    },
    {
      id: 2,
      name: 'Dr. Abdul Rahman Al-Qasim',
      place: 'Medina, Saudi Arabia',
      image: 'https://m.media-amazon.com/images/I/51Wz9iQFntL._AC_UY1100_.jpg',
      reg_no: 'TCH002',
      father_name: 'Mohammed Al-Qasim',
      blood_grp: 'A+',
      phone_no: '+966 50 123 4567',
      email: 'abdul.rahman@example.com',
      address: '456 King Fahd Road, Medina, 42311 Saudi Arabia',
      salary: 72000,
      msr_no: 'MSR67890',
      joined_date: '2015-09-01',
      islamic_qualification: 'PhD in Islamic Studies - Umm Al-Qura University',
      academic_qualification: 'M.Ed in Educational Leadership',
      other_occupation: 'Imam & Khateeb'
    },
    {
      id: 3,
      name: 'Prof. Muhammad Ibrahim',
      place: 'Cairo, Egypt',
      image: 'https://i.etsystatic.com/9507418/r/il/9670c1/1183312141/il_570xN.1183312141_mdvt.jpg',
      reg_no: 'TCH003',
      father_name: 'Ibrahim Hassan',
      blood_grp: 'B+',
      phone_no: '+20 100 234 5678',
      email: 'muhammad.ibrahim@example.com',
      address: '789 Al-Azhar Street, Cairo, 11511 Egypt',
      salary: 58000,
      msr_no: 'MSR24680',
      joined_date: '2017-01-10',
      islamic_qualification: 'Master\'s in Quranic Sciences - Al-Azhar University',
      academic_qualification: 'Ph.D in Arabic Literature',
      other_occupation: 'Quran Teacher'
    },
  ])

  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [principal, setPrincipal] = useState({
    id: 1,
    name: 'Mahamood',
    place: 'Chicago',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/070/246/232/small/muslim-man-in-white-shirt-and-hat-with-hands-outstretched-photo.JPG',
    reg_no: 'PRN001',
    father_name: 'James Williams',
    blood_grp: 'AB+',
    phone_no: '+1 567-890-1234',
    email: 'sarah.williams@example.com',
    address: '321 Elm Blvd, Chicago, IL 60602',
    salary: 85000,
    joined_date: '2018-06-20',
    qualification: 'Ph.D. Education, M.A. Educational Leadership'
  })
  const [showPrincipalDetails, setShowPrincipalDetails] = useState(false)

  const editProfile = () => {
    if (!selectedTeacher) {
      alert('Please select a teacher first')
      return
    }
    alert('Edit profile functionality - Teacher: ' + selectedTeacher.name)
  }

  const removeTeacher = (teacher_id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this teacher? This action cannot be undone.'
    )

    if (!confirmDelete) {
      return
    }

    setTeachers(teachers.filter(teacher => teacher.id !== teacher_id))
    if (selectedTeacher?.id === teacher_id) {
      setSelectedTeacher(null)
    }
    alert('Teacher deleted successfully')
  }

  const removePrincipal = () => {
    if (!principal) {
      alert('No principal to delete')
      return
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this principal? This action cannot be undone.'
    )

    if (!confirmDelete) {
      return
    }

    setPrincipal(null)
    setShowPrincipalDetails(false)
    alert('Principal deleted successfully')
  }

  const togglePrincipalDetails = () => {
    setShowPrincipalDetails(!showPrincipalDetails)
  }

  const getImageUrl = (url) => {
    return url || 'https://via.placeholder.com/256x256?text=No+Image'
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-4">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Teacher Information
                </h1>
                <p className="text-xs text-white/90">
                  View and manage teacher details
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Teachers List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-xs md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
                Teachers ({teachers.length})
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      onClick={() => setSelectedTeacher(teacher)}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedTeacher?.id === teacher.id
                          ? 'bg-blue-50 border-2 border-blue-300 shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={getImageUrl(teacher.image)}
                          alt={teacher.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/256x256?text=Error'
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-800">
                          {teacher.name || 'N/A'}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {teacher.place || 'N/A'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No teachers found
                  </p>
                )}
              </div>
            </div>
            
            {/* Principal Section - Moved outside the teachers list but still in left column */}
            {principal && (
              <div className="mt-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-sm md:text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span className="w-2 h-5 bg-purple-600 rounded-full mr-3"></span>
                    Principal
                  </h2>
                  <div
                    onClick={togglePrincipalDetails}
                    className="flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 bg-purple-50 hover:bg-purple-100 hover:shadow-md"
                  >
                    <div className="relative">
                      <img
                        src={getImageUrl(principal.image)}
                        alt={principal.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/256x256?text=Error'
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xs md:text-base font-medium text-gray-800">
                        {principal.name || 'N/A'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {principal.place || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Details Panel - Right Column */}
          <div className="lg:col-span-2">
            {selectedTeacher ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                  <div className="flex items-center">
                    <img
                      src={getImageUrl(selectedTeacher.image)}
                      alt={selectedTeacher.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/256x256?text=Error'
                      }}
                    />
                    <div className="ml-6">
                      <h2 className="text-base md:text-xl font-bold">
                        {selectedTeacher.name || 'N/A'}
                      </h2>
                      <p className="text-blue-100 text-sm">
                        {selectedTeacher.place || 'N/A'}
                      </p>
                      <p className="text-blue-100 text-xs md:text-sm mt-1">
                        Reg No: {selectedTeacher.reg_no || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-sm md:text-base font-semibold text-gray-800 flex items-center mb-4">
                        <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                        Personal Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Father:
                          </span>
                          <span className="font-medium">
                            {selectedTeacher.father_name || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Blood:
                          </span>
                          <span className="font-medium">
                            {selectedTeacher.blood_grp || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Phone:
                          </span>
                          <span className="font-medium">
                            {selectedTeacher.phone_no || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Email:
                          </span>
                          <span className="font-medium">
                            {selectedTeacher.email || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Address:
                          </span>
                          <span className="font-medium truncate">
                            {selectedTeacher.address || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h3 className="text-sm md:text-base font-semibold text-gray-800 flex items-center mb-4">
                        <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
                        Professional Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Salary:
                          </span>
                          <span className="font-medium text-green-600">
                            {selectedTeacher.salary
                              ? `$${selectedTeacher.salary.toLocaleString()}`
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            MSR No:
                          </span>
                          <span className="font-medium">
                            {selectedTeacher.msr_no || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Joined:
                          </span>
                          <span className="font-medium">
                            {formatDate(selectedTeacher.joined_date)}
                          </span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Islamic Education:
                          </span>
                          <span className="font-medium">
                            {selectedTeacher.islamic_qualification || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Academic Education:
                          </span>
                          <span className="font-medium">
                            {selectedTeacher.academic_qualification || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 w-24 text-sm">
                            Other Job:
                          </span>
                          <span className="font-medium">
                            {selectedTeacher.other_occupation || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 md:gap-2 mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={editProfile}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      <span className="text-xs">Edit Profile</span>
                    </button>
                    <button
                      onClick={() => removeTeacher(selectedTeacher.id)}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      <span className="text-xs">Remove Teacher</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  No Teacher Selected
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  Select a teacher from the list to view their details
                </p>
              </div>
            )}

            {/* Principal Details Modal/Expandable Section */}
            {showPrincipalDetails && principal && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6 border border-gray-100">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Left Side - Image + Info */}
                    <div className="flex items-center gap-5">
                      <img
                        src={getImageUrl(principal.image)}
                        alt={principal.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/256x256?text=Error'
                        }}
                      />

                      <div>
                        <h2 className="text-sm md:text-xl font-bold">
                          {principal.name || 'N/A'}
                        </h2>

                        <p className="text-purple-100 text-sm mt-1">
                          Place: {principal.place || 'N/A'}
                        </p>

                        <p className="text-purple-100 text-sm mt-1">
                          Reg No: {principal.reg_no || 'N/A'}
                        </p>

                        <p className="text-purple-100 text-sm mt-1">
                          Number: {principal.phone_no || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Button */}
                    <div className="flex justify-start md:justify-end">
                      <button
                        onClick={removePrincipal}
                        className="text-xs md:text-sm px-4 py-1 bg-red-600 text-white rounded-xl font-medium 
                       hover:bg-red-700 transition-all duration-200 
                       shadow-md hover:shadow-lg active:scale-95"
                      >
                        Remove Principal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherInfoAuth