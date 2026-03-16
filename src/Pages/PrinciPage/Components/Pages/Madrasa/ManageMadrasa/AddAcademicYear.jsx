import React, { useEffect, useState } from 'react'
import { ListCheck } from 'lucide-react'

function AddAcademicYear() {
  const [year, setYear] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // success | error
  const [loading, setLoading] = useState(false)
  const [existingYears, setExistingYears] = useState([])

  // Sample existing academic years data
  const sampleAcademicYears = [
    { id: 1, year: '2023-2024', start_date: '2023-06-01', end_date: '2024-03-31' },
    { id: 2, year: '2024-2025', start_date: '2024-06-01', end_date: '2025-03-31' },
  ]

  // Load sample data on component mount
  useEffect(() => {
    setExistingYears(sampleAcademicYears)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    // Validation
    if (!year) {
      setMessage('Academic year is required')
      setMessageType('error')
      return
    }

    // Check if academic year already exists
    const yearExists = existingYears.some(ay => ay.year === year)
    if (yearExists) {
      setMessage('This academic year already exists')
      setMessageType('error')
      return
    }

    if (startDate && endDate && startDate > endDate) {
      setMessage('Start date cannot be after End date')
      setMessageType('error')
      return
    }

    const confirmAdd = window.confirm(
      `Are you sure you want to add Academic Year: ${year}?`,
    )

    if (!confirmAdd) return

    try {
      setLoading(true)

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Add the new academic year to existing years
      const newAcademicYear = {
        id: existingYears.length + 1,
        year: year,
        start_date: startDate,
        end_date: endDate,
      }
      
      setExistingYears([...existingYears, newAcademicYear])

      setMessage('Academic year added successfully!')
      setMessageType('success')

      // Clear form
      setYear('')
      setStartDate('')
      setEndDate('')
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="mx-auto p-1">
        {/* Header */}
        <div className="px-4 mb-3 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <ListCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Add Academic Year
                </h1>
                <p className="text-xs text-white/90">Add new academic year</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔔 Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-medium ${
              messageType === 'success'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            {message}
          </div>
        )}

        {/* Existing Academic Years Summary */}
        {existingYears.length > 0 && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-xs md:text-sm font-semibold text-blue-600 mb-2">
              Existing Academic Years:
            </h3>
            <div className="flex flex-wrap gap-2">
              {existingYears.map((ay) => (
                <span
                  key={ay.id}
                  className="px-3 py-1 bg-white text-blue-600 rounded-full text-xs border border-blue-300"
                >
                  {ay.year}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 shadow rounded-lg bg-white">
          {/* 🧾 Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs md:text-sm font-semibold text-blue-600">
                Academic Year
              </label>
              <input
                type="text"
                placeholder="Eg: 2025-2026"
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs md:text-sm font-semibold text-blue-600">
                Start Date
              </label>
              <input
                type="date"
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs md:text-sm font-semibold text-blue-600">
                End Date
              </label>
              <input
                type="date"
                className="w-full mt-1 p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Add Academic Year'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAcademicYear