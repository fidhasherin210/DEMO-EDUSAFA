import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  BookOpen,
  MapPin,
  Phone,
  Home,
  Calendar,
  Users,
  Droplet,
  GraduationCap,
  Briefcase,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Camera,
  UserPlus,
  Image,
} from 'lucide-react'

function AddStudent() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  // Sample standards data
  const [standards] = useState([
    { id: 1, std: 'Class 1 - Section A' },
    { id: 2, std: 'Class 1 - Section B' },
    { id: 3, std: 'Class 2 - Section A' },
    { id: 4, std: 'Class 2 - Section B' },
    { id: 5, std: 'Class 3 - Section A' },
    { id: 6, std: 'Class 3 - Section B' },
    { id: 7, std: 'Class 4 - Section A' },
    { id: 8, std: 'Class 4 - Section B' },
    { id: 9, std: 'Class 5 - Section A' },
    { id: 10, std: 'Class 5 - Section B' },
    { id: 11, std: 'Class 6 - Section A' },
    { id: 12, std: 'Class 6 - Section B' },
    { id: 13, std: 'Class 7 - Section A' },
    { id: 14, std: 'Class 7 - Section B' },
    { id: 15, std: 'Class 8 - Section A' },
    { id: 16, std: 'Class 8 - Section B' },
    { id: 17, std: 'Class 9 - Section A' },
    { id: 18, std: 'Class 9 - Section B' },
    { id: 19, std: 'Class 10 - Section A' },
    { id: 20, std: 'Class 10 - Section B' },
  ])

  const [formData, setFormData] = useState({
    name: '',
    gender: 'M',
    parent_name: '',
    parent_occupation: '',
    address: '',
    phone_no: '',
    place: '',
    blood_group: '',
    dob: '',
    std: '',
    former_school: '',
    admission_date: '',
    reg_no: '',
    total_fee_amount: '',
    password: '',
    image: null,
  })

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFormData({
      ...formData,
      image: file,
    })

    // Create preview
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Simulate API call with sample data
    setTimeout(() => {
      // Sample success response
      console.log('Student Added with sample data:', {
        ...formData,
        image: formData.image ? formData.image.name : null,
      })
      
      setSuccess('Student Added Successfully')
      
      // Reset form to initial state
      setFormData({
        name: '',
        gender: 'M',
        parent_name: '',
        parent_occupation: '',
        address: '',
        phone_no: '',
        place: '',
        blood_group: '',
        dob: '',
        std: '',
        former_school: '',
        admission_date: '',
        reg_no: '',
        total_fee_amount: '',
        password: '',
        image: null,
      })
      
      // Clear image preview
      setImagePreview(null)
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) {
        fileInput.value = ''
      }
      
      setLoading(false)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    }, 1500) // Simulate network delay
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="max-w-8xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-2 ">
          {/* Header Card */}
          <div className="rounded-2xl shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <UserPlus className="w-5 h-5 text-white lg:w-6 lg:h-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white lg:text-xl">
                  Add New Student
                </h1>
                <p className="text-xs text-white/90 lg:text-sm">
                  Fill in the student details to create a new record
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit}>

            {/* Form Content */}
            <div className="p-6 lg:p-8">
              {/* Personal Information Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Student Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Blood Group
                    </label>
                    <div className="relative">
                      <Droplet className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="blood_group"
                        value={formData.blood_group}
                        onChange={handleChange}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        placeholder="e.g., O+"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent Information Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-green-50 rounded-lg">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                    Parent Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Parent Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="parent_name"
                      value={formData.parent_name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                      placeholder="Enter parent name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Parent Occupation
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="parent_occupation"
                        value={formData.parent_occupation}
                        onChange={handleChange}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        placeholder="Enter occupation"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone_no"
                        value={formData.phone_no}
                        onChange={handleChange}
                        required
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Place
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        placeholder="Enter place"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Address
                  </label>
                  <div className="relative">
                    <Home className="absolute left-2 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                      placeholder="Enter full address"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-purple-50 rounded-lg">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                    Academic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="std"
                      value={formData.std}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    >
                      <option value="">Select Class</option>
                      {standards.map((std) => (
                        <option key={std.id} value={std.id}>
                          {std.std}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Registration Number{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="reg_no"
                        value={formData.reg_no}
                        onChange={handleChange}
                        required
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        placeholder="Enter registration number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Admission Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        name="admission_date"
                        value={formData.admission_date}
                        onChange={handleChange}
                        required
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Former School
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="former_school"
                        value={formData.former_school}
                        onChange={handleChange}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        placeholder="Enter former school"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Total Fee Amount
                    </label>
                    <input
                      type="number"
                      name="total_fee_amount"
                      value={formData.total_fee_amount}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                      placeholder="Enter total fee"
                    />
                  </div>
                </div>
              </div>

              {/* Account Information Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-orange-50 rounded-lg">
                    <Lock className="w-4 h-4 text-orange-600" />
                  </div>
                  <h3 className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                    Account Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Student Login Password{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-8 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Password will be used for student login
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Upload Section - Moved to bottom as normal field */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-indigo-50 rounded-lg">
                    <Image className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                    Student Photo
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            <Camera className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Upload student photo (optional)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              )}
              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 px-4 rounded-xl font-medium shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Adding Student...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Add Student</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddStudent