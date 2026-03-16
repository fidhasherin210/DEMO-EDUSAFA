import React, { useState } from 'react'
import { BookOpen, User, Award } from 'lucide-react'

function FeeAuth() {
  // Sample data for classes with students
  const [allClasses, setAllClasses] = useState([
   {
      id: 1,
      std: '1',
      students: [
       {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ],
    },
      {
      id: 1,
      std: '2',
      students: [
       {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ],
    },
      {
      id: 1,
      std: '3',
      students: [
       {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ],
    },
      {
      id: 1,
      std: '4',
      students: [
       {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ],
    },
   
  ])

  // Sample academic years
  const [academicYears, setAcademicYears] = useState([
    { id: 1, year: '2023-2024' },
    { id: 2, year: '2022-2023' },
    { id: 3, year: '2021-2022' },
  ])

  // Sample fee data by student
  const sampleFeeData = {
    101: {
      total_fee: 25000,
      total_paid: 20000,
      balance: 5000,
      message: 'Balance amount pending',
      fee_list: [
        { month: 'April 2023', amount: 5000, receiver: 'Mr. Sharma', created_date: '2023-04-05' },
        { month: 'May 2023', amount: 5000, receiver: 'Mr. Sharma', created_date: '2023-05-03' },
        { month: 'June 2023', amount: 5000, receiver: 'Mr. Sharma', created_date: '2023-06-07' },
        { month: 'July 2023', amount: 5000, receiver: 'Mr. Sharma', created_date: '2023-07-04' },
      ]
    },
    102: {
      total_fee: 25000,
      total_paid: 25000,
      balance: 0,
      message: 'Fee paid in full',
      fee_list: [
        { month: 'April 2023', amount: 5000, receiver: 'Mrs. Gupta', created_date: '2023-04-02' },
        { month: 'May 2023', amount: 5000, receiver: 'Mrs. Gupta', created_date: '2023-05-05' },
        { month: 'June 2023', amount: 5000, receiver: 'Mrs. Gupta', created_date: '2023-06-01' },
        { month: 'July 2023', amount: 5000, receiver: 'Mrs. Gupta', created_date: '2023-07-03' },
        { month: 'August 2023', amount: 5000, receiver: 'Mrs. Gupta', created_date: '2023-08-04' },
      ]
    },
    201: {
      total_fee: 30000,
      total_paid: 15000,
      balance: 15000,
      message: 'Half fee paid',
      fee_list: [
        { month: 'April 2023', amount: 5000, receiver: 'Mr. Kumar', created_date: '2023-04-06' },
        { month: 'May 2023', amount: 5000, receiver: 'Mr. Kumar', created_date: '2023-05-08' },
        { month: 'June 2023', amount: 5000, receiver: 'Mr. Kumar', created_date: '2023-06-05' },
      ]
    },
    301: {
      total_fee: 28000,
      total_paid: 28000,
      balance: 0,
      message: 'Fee paid in full',
      fee_list: [
        { month: 'April 2023', amount: 5600, receiver: 'Ms. Rao', created_date: '2023-04-03' },
        { month: 'May 2023', amount: 5600, receiver: 'Ms. Rao', created_date: '2023-05-02' },
        { month: 'June 2023', amount: 5600, receiver: 'Ms. Rao', created_date: '2023-06-06' },
        { month: 'July 2023', amount: 5600, receiver: 'Ms. Rao', created_date: '2023-07-01' },
        { month: 'August 2023', amount: 5600, receiver: 'Ms. Rao', created_date: '2023-08-02' },
      ]
    },
    401: {
      total_fee: 32000,
      total_paid: 24000,
      balance: 8000,
      message: 'Balance amount pending',
      fee_list: [
        { month: 'April 2023', amount: 8000, receiver: 'Mr. Shah', created_date: '2023-04-04' },
        { month: 'May 2023', amount: 8000, receiver: 'Mr. Shah', created_date: '2023-05-07' },
        { month: 'June 2023', amount: 8000, receiver: 'Mr. Shah', created_date: '2023-06-03' },
      ]
    }
  }

  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [loading, setLoading] = useState(false)

  const [selectedYear, setSelectedYear] = useState('')

  const [feeDetails, setFeeDetails] = useState([])
  const [totalFee, setTotalFee] = useState(null)
  const [totalPaid, setTotalPaid] = useState(0)
  const [balance, setBalance] = useState(0)
  const [message, setMessage] = useState('')

  const handleClassSelect = (cls) => {
    setSelectedClass(cls)
    setSelectedStudent(null)
    setFeeDetails([])
    setSelectedYear('')
    setMessage('')
  }

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
    setFeeDetails([])
    setSelectedYear('')
    setMessage('')
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const studentData = sampleFeeData[student.id]
      if (studentData) {
        setFeeDetails(studentData.fee_list || [])
        setTotalFee(studentData.total_fee)
        setTotalPaid(studentData.total_paid)
        setBalance(studentData.balance)
        setMessage(studentData.message || '')
      } else {
        setFeeDetails([])
        setTotalFee(25000)
        setTotalPaid(0)
        setBalance(25000)
        setMessage('No fee records found for this student')
      }
      setLoading(false)
    }, 500)
  }

  const getImageUrl = (url) => {
    return url || null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Fee Management
                </h1>
                <p className="text-xs text-white/90">
                  View and Manage Student Fee Details
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="px-1 mx-auto -mt-3 ">
          <div className="max-w-8xl p-1 mx-auto mb-2">
            <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                  Select Class
                </h2>
              </div>

              {loading ? (
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
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/25 scale-105'
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
              {/* Footer */}
              <div className="pt-3 mt-2 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                    Selected Class:{' '}
                    {selectedClass ? `Class ${selectedClass.std}` : 'None'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student List */}
        {selectedClass && !selectedStudent && (
          <div className="p-6 mt-5 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs md:text-lg font-semibold text-blue-600">
                Students in Class {selectedClass.class}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {selectedClass.students.map((student, index) => (
                <button
                  key={index}
                  className="p-2 py-3 rounded-xl border-2 border-gray-200 hover:border-green-300 bg-white hover:bg-green-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => handleStudentSelect(student)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      {student.image ? (
                        <img
                          src={getImageUrl(student.image)}
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {student.name?.charAt(0) || 'S'}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-gray-800 text-sm">
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.place}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fee Details UI */}
        {selectedStudent && (
          <div className="p-2 mt-5 bg-white shadow-xl rounded-2xl">
            <h3 className="mt-3 mb-3 text-sm font-semibold text-center text-blue-700">
              Fee Details for {selectedStudent.name}
            </h3>

            {/* Academic Year */}
            <label className="block mb-2 text-sm font-medium text-center">
              Select Academic Year
            </label>
            <select
              className="w-full p-3 mb-4 border rounded-xl"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {academicYears.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.year}
                </option>
              ))}
            </select>

            {/* Message if total fee is not set */}
            {message && (
              <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-xl">
                {message}
              </div>
            )}

            {/* Fee Table */}
            {feeDetails.length > 0 ? (
              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full">
                  <thead className="text-white bg-gradient-to-r from-blue-600 to-sky-500">
                    <tr>
                      <th className="p-3 text-xs md:text-sm text-left">Month</th>
                      <th className="p-3 text-xs md:text-sm text-left">Amount</th>
                      <th className="p-3 text-xs md:text-sm text-left">Receiver</th>
                      <th className="p-1 text-xs md:text-sm text-left">Paid On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeDetails.map((fee, i) => (
                      <tr key={i} className="border-b hover:bg-gray-100">
                        <td className="p-3 text-[13px] md:text-sm ">{fee.month}</td>
                        <td className="p-3 text-[13px] md:text-sm font-semibold">
                          ₹{fee.amount}
                        </td>
                        <td className="p-3 text-[13px] md:text-sm ">{fee.receiver}</td>
                        <td className="p-3 text-[13px] md:text-sm ">{fee.created_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              selectedYear && (
                <p className="mt-3 text-gray-600">No fee records found.</p>
              )
            )}

            {/* Totals Section */}
            {totalFee !== null && (
              <div className="mt-3 md:mt-8">
                {/* Fee Summary Cards */}
                <div className="grid grid-cols-3 md:grid-cols-3 gap-1 mb-3">
                  {/* Total Fee Card */}
                  <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl py-3 px-1 border border-blue-100/50">
                    <span className="text-base md:text-xl font-bold text-blue-600">
                      ₹{totalFee}
                    </span>
                    <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                      Total Fee
                    </span>
                  </div>

                  {/* Total Paid Card */}
                  <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl py-3 px-1 border border-green-100/50">
                    <span className="text-base md:text-xl font-bold text-green-600">
                      ₹{totalPaid}
                    </span>
                    <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                      Total Paid
                    </span>
                  </div>

                  {/* Balance Card */}
                  <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-red-50 to-rose-50/50 rounded-2xl py-3 px-1 border border-red-100/50">
                    <span className="text-base md:text-xl font-bold text-red-600">
                      ₹{balance}
                    </span>
                    <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                      Balance
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FeeAuth