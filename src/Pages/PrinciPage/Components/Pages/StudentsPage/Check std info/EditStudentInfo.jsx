import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  User, 
  ArrowLeft, 
  Camera, 
  Phone, 
  MapPin, 
  Home, 
  Briefcase, 
  Calendar, 
  CreditCard, 
  Hash,
  Key,
  Users,
  BookOpen,
  HeartPlus,
  Eye,
  EyeOff
} from 'lucide-react'

function EditStudentInfo() {
  const location = useLocation()
  const navigate = useNavigate()
  const student = location.state?.selectedStudent || null

  // Sample student data for preview/edit
  const sampleStudentData = {
    id: 101,
    name: " Ali Raza ",
    gender: "M",
    parent_name: "Robert Smith",
    parent_occupation: "Engineer",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    former_school: "Washington High School",
    admission_no: "ADM2024001",
    admission_date: "2024-01-15",
    phone_no: "+1 (555) 123-4567",
    place: "New York",
    reg_no: "REG2024001",
    total_fee_amount: "25000",
    dob: "2010-05-20",
    blood_group: "O+",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
  }

  const [formData, setFormData] = useState({
    name: student?.name || sampleStudentData.name || '',
    gender: student?.gender || sampleStudentData.gender || 'M',
    parent_name: student?.parent_name || sampleStudentData.parent_name || '',
    parent_occupation: student?.parent_occupation || sampleStudentData.parent_occupation || '',
    address: student?.address || sampleStudentData.address || '',
    former_school: student?.former_school || sampleStudentData.former_school || '',
    admission_no: student?.admission_no || sampleStudentData.admission_no || '',
    admission_date: student?.admission_date || sampleStudentData.admission_date || '',
    phone_no: student?.phone_no || sampleStudentData.phone_no || '',
    place: student?.place || sampleStudentData.place || '',
    reg_no: student?.reg_no || sampleStudentData.reg_no || '',
    password: '',
    total_fee_amount: student?.total_fee_amount || sampleStudentData.total_fee_amount || '',
    dob: student?.dob || sampleStudentData.dob || '',
    blood_group: student?.blood_group || sampleStudentData.blood_group || '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(
    student?.image || sampleStudentData.image || null
  )
  const [showPassword, setShowPassword] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      alert('Student info updated successfully!')
      navigate('/principal/student-info')
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      {/* Header */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div>
              <h1 className="md:text-xl text-sm font-semibold text-white">Edit Student</h1>
              <p className="text-[12px] md:text-xm text-blue-100">Update student information</p>
            </div>
          </div>
          <div className="bg-white/20 p-2 rounded-xl">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" max-w-8xl mx-auto pb-8">
        <form onSubmit={handleSubmit}>
          {/* Profile Image Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-3">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-slate-200">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="image-upload"
                  className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium text-slate-700">Profile Photo</p>
                <p className="text-[10px] md:text-xs  text-slate-500 mt-0.5">
                  Click the camera icon to update photo
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-3">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">Personal Information</h2>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {/* Name */}
              <div>
                <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Enter full name"
                />
              </div>

              {/* Gender and Phone Row */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="Enter phone"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                    Blood Group
                  </label>
                  <div className="relative">
                    <HeartPlus className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      name="blood_group"
                      value={formData.blood_group}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="Enter blood group"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                    Date Of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="Enter date of birth"
                    />
                  </div>
                </div>
              </div>

              {/* Place */}
              <div>
                <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                  Place
                </label>
                <div className="relative">
                  <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Enter place"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                  Address
                </label>
                <div className="relative">
                  <Home className="absolute left-2 top-3 w-3.5 h-3.5 text-slate-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Parent Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-3">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">Parent Information</h2>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {/* Parent Name */}
              <div>
                <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                  Parent Name
                </label>
                <input
                  type="text"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Enter parent name"
                />
              </div>

              {/* Parent Occupation */}
              <div>
                <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                  Parent Occupation
                </label>
                <input
                  type="text"
                  name="parent_occupation"
                  value={formData.parent_occupation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Enter occupation"
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-3">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">Academic Information</h2>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {/* Class and Registration No Row */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                    Admission Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="date"
                      name="admission_date"
                      value={formData.admission_date}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                    Registration No
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      name="reg_no"
                      value={formData.reg_no}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="Reg No"
                    />
                  </div>
                </div>
              </div>

              {/* Former School */}
              <div>
                <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                  Former School
                </label>
                <input
                  type="text"
                  name="former_school"
                  value={formData.former_school}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Enter former school (optional)"
                />
              </div>

              {/* Academic Fee */}
              <div>
                <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                  Academic Fee
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="number"
                    name="total_fee_amount"
                    value={formData.total_fee_amount}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Enter fee amount"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-4">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">Security</h2>
              </div>
            </div>
            
            <div className="p-4">
              <div>
                <label className="block text-[12px] md:text-xs font-medium text-slate-500 uppercase mb-1">
                  New Password (leave blank to keep current)
                </label>
                <div className="relative">
                  <Key className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-8 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[13px] text-slate-400 mt-1">
                  Leave empty to keep current password
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-medium hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 text-white px-4 py-3 rounded-xl text-xs font-medium shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudentInfo