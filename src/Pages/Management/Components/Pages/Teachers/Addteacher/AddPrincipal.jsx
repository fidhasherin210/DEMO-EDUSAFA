import React, { useState } from 'react'

function AddPrincipal() {
  const [principalData, setPrincipalData] = useState({
    name: '',
    phone_no: '',
    place: '',
    reg_no: '',
    password: '',
    image: null,
  })

  const [message, setMessage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)

  // Sample data for demonstration
  const samplePrincipals = [
   {
      name: 'Dr. Abdul Rahman Al-Qasim',
      phone_no: '+966 50 123 4567',
      place: 'Riyadh, Saudi Arabia',
      reg_no: 'PRIN001',
      password: 'Rahman@1975',
    },
    {
      name: 'Prof. Fatima bint Yusuf',
      phone_no: '+971 50 234 5678',
      place: 'Dubai, UAE',
      reg_no: 'PRIN002',
      password: 'Fatima@1980',
    },
    {
      name: 'Dr. Muhammad Ibrahim',
      phone_no: '+92 300 1234567',
      place: 'Lahore, Pakistan',
      reg_no: 'PRIN003',
      password: 'Ibrahim@1978',
    },
    {
      name: 'Prof. Aisha Siddiqua',
      phone_no: '+20 100 234 5678',
      place: 'Cairo, Egypt',
      reg_no: 'PRIN004',
      password: 'Aisha@1982',
    },
    {
      name: 'Dr. Omar Farooq Hassan',
      phone_no: '+966 50 345 6789',
      place: 'Jeddah, Saudi Arabia',
      reg_no: 'PRIN005',
      password: 'Omar@1976',
    },
    {
      name: 'Prof. Khadija Begum',
      phone_no: '+91 98765 43210',
      place: 'Hyderabad, India',
      reg_no: 'PRIN006',
      password: 'Khadija@1983',
    },
    {
      name: 'Dr. Abdullah Malik',
      phone_no: '+962 7 1234 5678',
      place: 'Amman, Jordan',
      reg_no: 'PRIN007',
      password: 'Abdullah@1979',
    },
    {
      name: 'Prof. Zainab Al-Hassan',
      phone_no: '+964 770 123 4567',
      place: 'Baghdad, Iraq',
      reg_no: 'PRIN008',
      password: 'Zainab@1981',
    },
    {
      name: 'Dr. Yusuf Ismail',
      phone_no: '+212 612 345678',
      place: 'Casablanca, Morocco',
      reg_no: 'PRIN009',
      password: 'Yusuf@1977',
    },
    {
      name: 'Prof. Mariam Alia',
      phone_no: '+216 22 123 456',
      place: 'Tunis, Tunisia',
      reg_no: 'PRIN010',
      password: 'Mariam@1984',
    },
  ]

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setPrincipalData({
      ...principalData,
      [name]: value,
    })
  }

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setPrincipalData({
      ...principalData,
      image: file,
    })
    setImagePreview(URL.createObjectURL(file))
  }

  // Load sample data
  const loadSampleData = () => {
    const randomIndex = Math.floor(Math.random() * samplePrincipals.length)
    const sample = samplePrincipals[randomIndex]
    setPrincipalData({
      ...principalData,
      name: sample.name,
      phone_no: sample.phone_no,
      place: sample.place,
      reg_no: sample.reg_no,
      password: sample.password,
    })
    setMessage('Sample data loaded! You can modify it before submitting.')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Show success message with the submitted data
      setMessage(
        `Principal added successfully!\nName: ${principalData.name}\nReg No: ${principalData.reg_no}`,
      )

      // Reset form
      setPrincipalData({
        name: '',
        phone_no: '',
        place: '',
        reg_no: '',
        password: '',
        image: null,
      })
      setImagePreview(null)
      setLoading(false)
    }, 1500) // Simulate network delay
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
      <div className="max-w-7xl mx-auto mt-2 rounded-lg ">
        <div className="bg-gradient-to-r from-sky-600 to-sky-400 pt-4 p-3 rounded-xl mb-2">
          <h2 className="text-base md:text-2xl font-semibold text-white text-center">
            Principal Registration Form
          </h2>
          <p className="text-xs md:text-sm text-blue-100 mt-1 text-center">
            Please provide accurate information for all fields
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-3 space-y-6"
        >
          <div className="flex justify-between items-center mt-3 mb-6">
            <h2 className="text-base md:text-2xl font-bold text-gray-800 text-center flex-1">
              Principal Registration
            </h2>
            <button
              type="button"
              onClick={loadSampleData}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
            >
              Load Sample Data
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={principalData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="phone_no"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phone_no"
                  name="phone_no"
                  value={principalData.phone_no}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="place"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Place <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  value={principalData.place}
                  onChange={handleChange}
                  placeholder="Enter Place"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="reg_no"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Register No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="reg_no"
                  name="reg_no"
                  value={principalData.reg_no}
                  onChange={handleChange}
                  placeholder="Enter Registration No"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={principalData.password}
                  onChange={handleChange}
                  placeholder="Enter Password with DOB"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-600"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-3 w-36 h-36 rounded-xl object-cover border border-gray-200 shadow-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-4 p-4 rounded-lg border-l-4 border-purple-500 bg-blue-50 text-purple-800 flex items-center space-x-2">
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
                  d="M13 16h-1v-4h-1m1-4h.01M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
                />
              </svg>
              <span className="text-sm sm:text-base whitespace-pre-line">
                {message}
              </span>
            </div>
          )}

          {/* Submit Button with Loading State */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`mt-4 text-white bg-gradient-to-r from-blue-600 to-sky-500 transition-all font-semibold rounded-xl px-8 py-3 shadow-md ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              {loading ? 'Adding...' : 'Add Principal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPrincipal