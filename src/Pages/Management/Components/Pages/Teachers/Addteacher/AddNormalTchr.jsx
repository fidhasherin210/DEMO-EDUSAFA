import React, { useState } from 'react'

function AddNormalTchr() {
  const [teacherData, setTeacherData] = useState({
    name: '',
    father_name: '',
    blood_grp: '',
    msr_no: '',
    salary: '',
    joined_date: '',
    islamic_qualification: '',
    academic_qualification: '',
    other_occupation: '',
    phone_no: '',
    email: '',
    address: '',
    place: '',
    reg_no: '',
    password: '',
    image: null,
  })

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  // Sample teacher data for demonstration
  const sampleTeacherData = {
    name: 'Jafa muhammed',
    father_name: 'Robert Doe',
    blood_grp: 'O+',
    msr_no: 'MSR123456',
    salary: '45000',
    joined_date: '2024-01-15',
    islamic_qualification: 'Hafiz, Alim',
    academic_qualification: 'M.Sc, B.Ed',
    other_occupation: 'Part-time Writer',
    phone_no: '+91 9876543210',
    email: 'john.doe@example.com',
    address: '123 Main Street, Apartment 4B',
    place: 'Mumbai',
    reg_no: 'TCH2024001',
    password: '********',
    image: "https://images-na.ssl-images-amazon.com/images/I/41qF1yq5AeL._SL500_._AC_SL500_.jpg"
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setTeacherData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Function to fill sample data (for demonstration)
  const fillSampleData = () => {
    setTeacherData({
      ...sampleTeacherData,
      image: null
    })
    setImagePreview(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setTeacherData((prev) => ({
        ...prev,
        image: file,
      }))
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setErrorMessage('')

    // Simulate API call with timeout
    setTimeout(() => {
      // Basic validation
      if (!teacherData.name || !teacherData.father_name || !teacherData.place || 
          !teacherData.phone_no || !teacherData.address || !teacherData.reg_no || 
          !teacherData.password) {
        setErrorMessage('Please fill all required fields')
        setLoading(false)
        return
      }

      // Simulate successful submission
      setMessage('Teacher added successfully!')
      
      // Reset form after successful submission
      setTeacherData({
        name: '',
        father_name: '',
        blood_grp: '',
        msr_no: '',
        salary: '',
        joined_date: '',
        islamic_qualification: '',
        academic_qualification: '',
        other_occupation: '',
        phone_no: '',
        email: '',
        address: '',
        place: '',
        reg_no: '',
        password: '',
        image: null,
      })
      setImagePreview(null)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto max-w-8xl">
        {/* Header - Matching the student details header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-2">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Teacher Registration Form
                </h1>
                <p className="text-xs text-white/90">
                  Please provide accurate information for all fields
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Data Button (for demonstration) */}
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={fillSampleData}
            className="flex items-center gap-1.5 bg-gradient-to-r from-gray-600 to-gray-500 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            <span>Load Sample Data</span>
          </button>
        </div>

        {/* Main Form Card */}
        <div className="mx-auto">
          <div className="max-w-8xl mx-auto">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="p-5 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl space-y-6"
            >
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="group">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={teacherData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all group-hover:border-blue-300"
                    />
                  </div>

                  {/* Father Name Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Father Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="father_name"
                      value={teacherData.father_name}
                      onChange={handleChange}
                      placeholder="Enter Father's Name"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition hover:border-blue-300"
                    />
                  </div>

                  {/* Place Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Place <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="place"
                      value={teacherData.place}
                      onChange={handleChange}
                      placeholder="Enter Place"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition hover:border-blue-300"
                    />
                  </div>

                  {/* Blood Group Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Blood Group
                    </label>
                    <input
                      type="text"
                      name="blood_grp"
                      value={teacherData.blood_grp}
                      onChange={handleChange}
                      placeholder="Enter Blood Group"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition hover:border-blue-300"
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone_no"
                      value={teacherData.phone_no}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition hover:border-blue-300"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={teacherData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition hover:border-blue-300"
                    />
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xs font-semibold text-emerald-600 md:text-lg">
                    Address Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Address Field - Textarea */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Address <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={teacherData.address}
                      onChange={handleChange}
                      placeholder="Enter Address"
                      required
                      rows="3"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition resize-none hover:border-emerald-300"
                    />
                  </div>
                </div>
              </div>

              {/* Academic & Professional Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xs font-semibold text-indigo-600 md:text-lg">
                    Academic Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Islamic Qualification Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Islamic Qualification
                    </label>
                    <input
                      type="text"
                      name="islamic_qualification"
                      value={teacherData.islamic_qualification}
                      onChange={handleChange}
                      placeholder="Enter Islamic Qualification"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition hover:border-indigo-300"
                    />
                  </div>

                  {/* Academic Qualification Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Academic Qualification
                    </label>
                    <input
                      type="text"
                      name="academic_qualification"
                      value={teacherData.academic_qualification}
                      onChange={handleChange}
                      placeholder="Enter Academic Qualification"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition hover:border-indigo-300"
                    />
                  </div>

                  {/* Other Occupation Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Other Occupation
                    </label>
                    <input
                      type="text"
                      name="other_occupation"
                      value={teacherData.other_occupation}
                      onChange={handleChange}
                      placeholder="Enter Other Occupation"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition hover:border-indigo-300"
                    />
                  </div>

                  {/* MSR No Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      MSR No
                    </label>
                    <input
                      type="text"
                      name="msr_no"
                      value={teacherData.msr_no}
                      onChange={handleChange}
                      placeholder="Enter MSR Number"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition hover:border-indigo-300"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xs font-semibold text-purple-600 md:text-lg">
                    Employment Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Joined Date Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Joined Date
                    </label>
                    <input
                      type="date"
                      name="joined_date"
                      value={teacherData.joined_date}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition hover:border-purple-300"
                    />
                  </div>

                  {/* Salary Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      value={teacherData.salary}
                      onChange={handleChange}
                      placeholder="Enter Salary"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition hover:border-purple-300"
                    />
                  </div>

                  {/* Register No Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Register No <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="reg_no"
                      value={teacherData.reg_no}
                      onChange={handleChange}
                      placeholder="Enter Registration No"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition hover:border-purple-300"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={teacherData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition hover:border-purple-300"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xs font-semibold text-emerald-600 md:text-lg">
                    Profile Image
                  </h2>
                </div>

                <div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-36 h-36 rounded-xl object-cover border-2 border-gray-200 shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Status Messages */}
              {(message || errorMessage) && (
                <div
                  className={`mt-6 p-4 rounded-xl border-l-4 flex items-center space-x-3 ${
                    message
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                  }`}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={
                        message
                          ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                          : 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      }
                    />
                  </svg>
                  <span className="text-sm sm:text-base">
                    {message || errorMessage}
                  </span>
                </div>
              )}

              {/* Footer with Submit Button */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white px-6 py-3 rounded-xl text-xs font-medium shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105 transition-all duration-200 lg:px-8 lg:py-3.5 lg:text-sm lg:gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 lg:w-5 lg:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span>Add Teacher</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNormalTchr