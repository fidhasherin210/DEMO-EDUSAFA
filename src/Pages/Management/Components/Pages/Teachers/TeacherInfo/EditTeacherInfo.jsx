import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";

function EditTeacherInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const teacher = location.state?.selectedTeacher || null;

  // Sample teacher data for demonstration
  const sampleTeacherData = {
    id: 1,
    name: "Muhammed",
    father_name: "Robert Doe",
    blood_grp: "O+",
    msr_no: "MSR123456",
    salary: "45000",
    islamic_qualification: "Hafiz, Alim",
    academic_qualification: "M.Sc, B.Ed",
    other_occupation: "Part-time Writer",
    phone_no: "+91 9876543210",
    email: "john.doe@example.com",
    address: "123 Main Street, Apartment 4B, Mumbai - 400001",
    place: "Mumbai",
    reg_no: "TCH2024001",
    image: null,
  };

  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    blood_grp: "",
    msr_no: "",
    salary: "",
    islamic_qualification: "",
    academic_qualification: "",
    other_occupation: "",
    phone_no: "",
    email: "",
    address: "",
    place: "",
    reg_no: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If teacher data is passed via state, use it
    if (teacher) {
      setFormData({
        name: teacher.name || "",
        father_name: teacher.father_name || "",
        blood_grp: teacher.blood_grp || "",
        msr_no: teacher.msr_no || "",
        salary: teacher.salary || "",
        islamic_qualification: teacher.islamic_qualification || "",
        academic_qualification: teacher.academic_qualification || "",
        other_occupation: teacher.other_occupation || "",
        phone_no: teacher.phone_no || "",
        email: teacher.email || "",
        address: teacher.address || "",
        place: teacher.place || "",
        reg_no: teacher.reg_no || "",
        image: teacher.image || "",
      });
      
      // Set image preview if available
      if (teacher.image) {
        setImagePreview(teacher.image);
      }
    } else {
      // If no teacher data, use sample data for demonstration
      setFormData(sampleTeacherData);
      // Sample data doesn't have an image, so no preview
    }
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for the selected image file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Show success message
      alert("Teacher information updated successfully!");
      
      // Navigate back to teacher info page
      navigate("/management/teacher-info");
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-1">
      <div className=" mx-auto">
   {/* Header */}
        <div className="px-4 py-6 mb-3 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto max-w-8xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Edit Teachers Info
                </h1>
                <p className="text-xs text-white/90">
                  Edit Personal Details of Teachers
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-4 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Teacher Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <h2 className="text-sm md:text-xl font-bold text-white mb-2">
                {formData.name || "Teacher Name"}
              </h2>
              <p className="text-blue-100 text-xs md:text-lg">{formData.reg_no || "Registration Number"}</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit}>

              {/* Personal Information Section */}
              <div className="mb-10">
                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Father&apos;s Name</label>
                    <input
                      type="text"
                      name="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter father's name"
                    />
                  </div>
                 
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label>
                    <input
                      type="text"
                      name="blood_grp"
                      value={formData.blood_grp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="e.g., A+, B-, O+"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="mb-10">
                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Enter full address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Place</label>
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter place/city"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="mb-10">
                <h3 className="text-sm md:text-base  font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Number</label>
                    <input
                      type="text"
                      name="reg_no"
                      value={formData.reg_no}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter registration number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">MSR Number</label>
                    <input
                      type="text"
                      name="msr_no"
                      value={formData.msr_no}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter MSR number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter salary amount"
                    />
                  </div>
                </div>
              </div>

              {/* Qualifications Section */}
              <div className="mb-10">
                <h3 className="text-sm md:text-base  font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  Qualifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Islamic Qualification</label>
                    <input
                      type="text"
                      name="islamic_qualification"
                      value={formData.islamic_qualification}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter Islamic qualifications"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Qualification</label>
                    <input
                      type="text"
                      name="academic_qualification"
                      value={formData.academic_qualification}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter academic qualifications"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Other Occupation</label>
                    <input
                      type="text"
                      name="other_occupation"
                      value={formData.other_occupation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter other occupations (if any)"
                    />
                  </div>
                </div>
              </div>

              

              {/* Submit Button */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTeacherInfo;