import React, { useState, useEffect } from 'react'

function AttendnaceTopers() {
  const [topers, setTopers] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample attendance toppers data
  const sampleTopers = [
    {
      name: "Ahmed Muhammed",
      parent_name: "Muhammed Ali",
      class_name: " 10",
      present_count: 98
    },
    {
      name: "Fatima Zahra",
      parent_name: "Yusuf Ahmed",
      class_name: " 9",
      present_count: 97
    },
    {
      name: "Aisha Rahman",
      parent_name: "Abdul Rahman",
      class_name: " 8",
      present_count: 96
    },
    {
      name: "Omar Farooq",
      parent_name: "Farooq Hassan",
      class_name: "1",
      present_count: 95
    },
    {
      name: "Zainab Ali",
      parent_name: "Ali Muhammed",
      class_name: "4",
      present_count: 94
    }
  ]

  // Format current date
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  })

  // Simulate fetching data
  useEffect(() => {
    const fetchTopers = () => {
      setLoading(true)
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        try {
          setTopers(sampleTopers)
          setLoading(false)
        } catch (error) {
          console.error('Failed to fetch attendance toppers:', error)
          setTopers([])
          setLoading(false)
        }
      }, 800) // Simulate network delay
    }

    fetchTopers()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-500">📊</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Loading toppers...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2 mt-4 ms-3">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div className="mt-1">
            <h3 className="text-xs md:text-base font-semibold text-gray-700">
              Attendance Toppers
            </h3>
            <p className="text-[9px] md:text-[10px] text-gray-400">
              {formattedDate}
            </p>
          </div>
        </div>

        <span className="me-3 text-[8px] md:text-[14px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium border border-green-200">
          Live
        </span>
      </div>

      <div className="overflow-x-auto px-1">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs sm:text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-1 text-left">Parent</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-1 text-left">Presents</th>
            </tr>
          </thead>

          <tbody>
            {topers.length > 0 ? (
              topers.map((student, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="md:p-4 py-3 px-2 text-[13px] md:text-sm">{student.name}</td>
                  <td className="md:p-4 py-3 text-[13px] md:text-sm text-gray-500">{student.parent_name}</td>
                  <td className="md:p-4 py-3 text-[13px] md:text-sm">{student.class_name}</td>
                  <td className="md:p-4 py-3 font-semibold text-green-700 text-xs md:text-sm">
                    {student.present_count}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-xs md:text-sm p-4 text-center text-gray-500">
                  No attendance data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendnaceTopers