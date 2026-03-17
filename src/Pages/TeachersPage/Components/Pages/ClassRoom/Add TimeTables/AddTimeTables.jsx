import React, { useState } from 'react'
import {
  Upload,
  BookOpen,
  CheckCircle,
  AlertCircle,
  School,
} from 'lucide-react'

function AddTimeTables() {
  // Sample data for classes
  const sampleClasses = [
    { id: 1, std: 'Class 1', has_time_table: true, has_exam_time_table: false, time_table_url: '/sample/class1-timetable.pdf', exam_time_table_url: null },
    { id: 2, std: 'Class 2', has_time_table: false, has_exam_time_table: true, time_table_url: null, exam_time_table_url: '/sample/class2-exam-timetable.pdf' },
    { id: 3, std: 'Class 3', has_time_table: true, has_exam_time_table: true, time_table_url: '/sample/class3-timetable.pdf', exam_time_table_url: '/sample/class3-exam-timetable.pdf' },
    { id: 4, std: 'Class 4', has_time_table: false, has_exam_time_table: false, time_table_url: null, exam_time_table_url: null },
    { id: 5, std: 'Class 5', has_time_table: true, has_exam_time_table: false, time_table_url: '/sample/class5-timetable.pdf', exam_time_table_url: null },
    
    
  ]

  const [allClasses] = useState(sampleClasses)
  const [selectedClass, setSelectedClass] = useState(null)
  const [timeTable, setTimeTable] = useState(null)
  const [examTimeTable, setExamTimeTable] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setError('')
    setMessage('')
    // Reset file inputs
    setTimeTable(null)
    setExamTimeTable(null)
    
    // Safely reset file inputs - check if elements exist first
    const timeTableInput = document.getElementById('timeTable')
    const examTimeTableInput = document.getElementById('examTimeTable')
    
    if (timeTableInput) {
      timeTableInput.value = ''
    }
    
    if (examTimeTableInput) {
      examTimeTableInput.value = ''
    }
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    if (!selectedClass) {
      setError('Please select a class.')
      setIsLoading(false)
      return
    }

    if (!timeTable && !examTimeTable) {
      setError('Please select at least one file to upload.')
      setIsLoading(false)
      return
    }

    // Simulate API call with timeout
    setTimeout(() => {
      // Simulate successful upload
      setMessage('Timetables uploaded successfully!')
      
      // Update the selected class with new file status
      setSelectedClass(prev => ({
        ...prev,
        has_time_table: timeTable ? true : prev.has_time_table,
        has_exam_time_table: examTimeTable ? true : prev.has_exam_time_table,
      }))

      // Reset file inputs
      setTimeTable(null)
      setExamTimeTable(null)
      
      const timeTableInput = document.getElementById('timeTable')
      const examTimeTableInput = document.getElementById('examTimeTable')
      
      if (timeTableInput) {
        timeTableInput.value = ''
      }
      
      if (examTimeTableInput) {
        examTimeTableInput.value = ''
      }
      
      setIsLoading(false)
    }, 1500) // Simulate network delay
  }

  return (
    <div className="min-h-screen p-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="mx-auto">
        {/* Header */}
        <div className=" px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <School className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Time Tables
                </h1>
                <p className="text-xs text-white/90">
                  Manage Exam and Class Timetables
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="px-1 mx-auto -mt-3">
          <div className="max-w-8xl p-1 mx-auto mb-2">
            <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                  Select Your Class
                </h2>
              </div>

              {allClasses.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No classes assigned to you
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {allClasses.map((classData) => (
                    <button
                      key={classData.id}
                      onClick={() => handleClassSelect(classData)}
                      className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${
                        selectedClass?.id === classData.id
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/25 scale-105'
                          : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      <div className="relative z-10">
                        <div className="text-xs md:text-sm opacity-80">
                          Class
                        </div>
                        <div className="text-xs font-bold md:text-sm">
                          {classData.std}
                        </div>
                        {classData.has_time_table && (
                          <div className="mt-1 text-[8px] md:text-[10px] text-green-600">
                            ✓ Timetable
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload Form */}
        {selectedClass && (
          <div className="px-1 mx-auto">
            <div className="max-w-8xl p-1 mx-auto">
              <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
                {/* File Upload Section */}
                <div className="grid gap-6 md:grid-cols-2 mb-6">
                  {/* Regular Timetable */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Class Timetable
                      {selectedClass.has_time_table && (
                        <span className="ml-2 text-xs text-green-600">
                          (Current file exists)
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="timeTable"
                        className="hidden"
                        onChange={(e) => setTimeTable(e.target.files[0])}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                      <label
                        htmlFor="timeTable"
                        className="flex flex-col items-center justify-center w-full h-32 transition-all duration-200 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50"
                      >
                        <Upload className="w-6 h-6 mb-2 text-gray-400" />
                        <span className="text-sm text-gray-600 text-center px-2">
                          {timeTable
                            ? timeTable.name
                            : 'Click to upload class timetable'}
                        </span>
                        <span className="mt-1 text-xs text-gray-400">
                          PDF, DOC, or Image files
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Exam Timetable */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Exam Timetable
                      {selectedClass.has_exam_time_table && (
                        <span className="ml-2 text-xs text-green-600">
                          (Current file exists)
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="examTimeTable"
                        className="hidden"
                        onChange={(e) => setExamTimeTable(e.target.files[0])}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                      <label
                        htmlFor="examTimeTable"
                        className="flex flex-col items-center justify-center w-full h-32 transition-all duration-200 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50"
                      >
                        <Upload className="w-6 h-6 mb-2 text-gray-400" />
                        <span className="text-sm text-gray-600 text-center px-2">
                          {examTimeTable
                            ? examTimeTable.name
                            : 'Click to upload exam timetable'}
                        </span>
                        <span className="mt-1 text-xs text-gray-400">
                          PDF, DOC, or Image files
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleFileUpload}
                    disabled={isLoading || (!timeTable && !examTimeTable)}
                    className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload Timetables
                      </>
                    )}
                  </button>
                </div>

                {/* Messages */}
                {message && (
                  <div className="flex items-start gap-3 p-2 mt-6 border border-green-200 rounded-lg bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-green-700">{message}</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-start gap-3 p-2 mt-6 border border-red-200 rounded-lg bg-red-50">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}   
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddTimeTables