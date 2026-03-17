import React, { useState, useEffect } from 'react'
import {
  Upload,
  Users,
  Calendar,
  BookOpen,
  Check,
  Loader2,
  Edit3,
} from 'lucide-react'

function EditClasses() {
  const [allClasses, setAllClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [teachers, setTeachers] = useState([])
  const [formData, setFormData] = useState({
    std: '',
    class_teacher: '',
    time_table: null,
    exam_time_table: null,
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Sample classes data
  const sampleClasses = [
    { id: 1, std: '1', class_teacher: '1' },
    { id: 2, std: '2', class_teacher: '2' },
    { id: 3, std: '3', class_teacher: '3' },
    { id: 4, std: '4', class_teacher: '4' },
    { id: 5, std: '5', class_teacher: '5' },

  ]

  // Sample teachers data
  const sampleTeachers = [
    { id: 1, name: ' Yusuf Ahmed' },
    { id: 2, name: 'Aboobakkar' },
    { id: 3, name: 'Abdullah' },
    { id: 4, name: 'Abdul Majeed' },
    { id: 5, name: 'Omar Abdullah' },
   
  ]

  // Load sample data
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setAllClasses(sampleClasses)
      setTeachers(sampleTeachers)
      setInitialLoading(false)
    }, 500)
  }, [])

  // Handle class selection
  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    const selectedTeacher = teachers.find(t => t.id === parseInt(classData.class_teacher))
    setFormData({
      std: classData.std,
      class_teacher: classData.class_teacher || '',
      time_table: null,
      exam_time_table: null,
    })
  }

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle file input change
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        [fieldName]: file,
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting Form Data:', formData) // Debugging

    if (!selectedClass) {
      alert('Please select a class to edit!')
      return
    }

    try {
      setLoading(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Update the class in the sample data
      const updatedClasses = allClasses.map(cls => {
        if (cls.id === selectedClass.id) {
          return {
            ...cls,
            std: formData.std,
            class_teacher: formData.class_teacher,
          }
        }
        return cls
      })
      
      setAllClasses(updatedClasses)
      
      // Show success message
      alert('Class updated successfully!')
      
      // Reset form
      setSelectedClass(null)
      setFormData({
        std: '',
        class_teacher: '',
        time_table: null,
        exam_time_table: null,
      })
    } catch (error) {
      console.error('Error updating class:', error)
      alert('Failed to update class')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Edit3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Edit Class Information
                </h1>
                <p className="text-xs text-white/90">Select a class and update its information</p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="px-1 mx-auto -mt-3">
          <div className="max-w-8xl mx-auto mb-2">
            <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                  Select Class
                </h2>
              </div>

              {initialLoading ? (
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
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 scale-105'
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
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 lg:gap-8">
          {/* Edit Form Panel */}
          <div className="lg:col-span-2">
            {!selectedClass ? (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit3 className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xs font-semibold text-gray-800 mb-2">
                    Select a Class to Edit
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Choose a class from above to start editing its information
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
                  <h2 className="text-sm font-semibold text-white">
                    Editing Class {selectedClass.std}
                  </h2>
                  <p className="text-green-100 mt-1 text-xs">
                    Update class information below
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Class Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <BookOpen className="w-4 h-4 inline mr-2" />
                        Class Name
                      </label>
                      <input
                        type="text"
                        name="std"
                        value={formData.std}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="Enter class name"
                      />
                    </div>

                    {/* Class Teacher */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Class Teacher
                      </label>
                      <select
                        name="class_teacher"
                        value={formData.class_teacher}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                      >
                        <option value="">Select a teacher</option>
                        {teachers.map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Regular Timetable Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Regular Timetable
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="time_table"
                          onChange={(e) => handleFileChange(e, 'time_table')}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <Upload className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                      {formData.time_table && (
                        <p className="mt-1 text-xs text-green-600">
                          Selected: {formData.time_table.name}
                        </p>
                      )}
                    </div>

                    {/* Exam Timetable Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Exam Timetable
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="exam_time_table"
                          onChange={(e) => handleFileChange(e, 'exam_time_table')}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                        <Upload className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                      {formData.exam_time_table && (
                        <p className="mt-1 text-xs text-purple-600">
                          Selected: {formData.exam_time_table.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          Update Class
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditClasses