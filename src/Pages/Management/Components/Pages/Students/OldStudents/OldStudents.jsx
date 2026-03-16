import React, { useEffect, useState } from 'react'
import {
  GraduationCap,
  Search,
  X,
  Users,
  Phone,
  MapPin,
  Calendar,
  Filter,
  ChevronDown,
  User,
} from 'lucide-react'

function OldStudents() {
  // Sample student data
  const [students, setStudents] = useState([
  {
      id: 1,
      name: "Muhammad Ahmed",
      place: "Mumbai",
      father_name: "Hassan Ahmed",
      phone_no: "9876543210",
      pass_out_year: 2024
    },
    {
      id: 2,
      name: "Fatima Zahra",
      place: "Delhi",
      father_name: "Yusuf Zahra",
      phone_no: "9876543211",
      pass_out_year: 2024
    },
    {
      id: 3,
      name: "Omar Farooq",
      place: "Bangalore",
      father_name: "Khalid Farooq",
      phone_no: "9876543212",
      pass_out_year: 2023
    },
    {
      id: 4,
      name: "Aisha Siddiqua",
      place: "Pune",
      father_name: "Ibrahim Siddiqui",
      phone_no: "9876543213",
      pass_out_year: 2023
    },
    {
      id: 5,
      name: "Abdullah Malik",
      place: "Chennai",
      father_name: "Bilal Malik",
      phone_no: "9876543214",
      pass_out_year: 2023
    },
    {
      id: 6,
      name: "Mariam Alia",
      place: "Hyderabad",
      father_name: "Jamal Alia",
      phone_no: "9876543215",
      pass_out_year: 2022
    },
    {
      id: 7,
      name: "Hassan Raza",
      place: "Ahmedabad",
      father_name: "Abbas Raza",
      phone_no: "9876543216",
      pass_out_year: 2022
    },
    {
      id: 8,
      name: "Zainab Khatoon",
      place: "Surat",
      father_name: "Mohsin Khatoon",
      phone_no: "9876543217",
      pass_out_year: 2022
    },
    {
      id: 9,
      name: "Bilal Hussain",
      place: "Kochi",
      father_name: "Hussain Bilal",
      phone_no: "9876543218",
      pass_out_year: 2021
    },
    {
      id: 10,
      name: "Khadija Begum",
      place: "Thiruvananthapuram",
      father_name: "Rashid Begum",
      phone_no: "9876543219",
      pass_out_year: 2021
    },
    {
      id: 11,
      name: "Yusuf Ismail",
      place: "Vijayawada",
      father_name: "Ismail Yusuf",
      phone_no: "9876543220",
      pass_out_year: 2021
    },
    {
      id: 12,
      name: "Safia Rahman",
      place: "Jaipur",
      father_name: "Rahman Safia",
      phone_no: "9876543221",
      pass_out_year: 2020
    },
  ])

  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setFiltered(students)
      setLoading(false)
    }, 1000) // Simulate 1 second loading

    return () => clearTimeout(timer)
  }, [])

  // Filter by pass out year and search term
  useEffect(() => {
    let result = students

    // Filter by year
    if (year !== 'all') {
      result = result.filter((s) => String(s.pass_out_year) === year)
    }

    // Filter by search term (name, phone, parent, place)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim()
      result = result.filter(
        (s) =>
          s.name?.toLowerCase().includes(term) ||
          s.phone_no?.toLowerCase().includes(term) ||
          s.father_name?.toLowerCase().includes(term) ||
          s.place?.toLowerCase().includes(term),
      )
    }

    setFiltered(result)
  }, [year, searchTerm, students])

  const years = [...new Set(students.map((s) => s.pass_out_year))].sort(
    (a, b) => b - a,
  )

  const clearSearch = () => {
    setSearchTerm('')
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setYear('all')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          </div>
          <p className="text-sm text-slate-500">Loading alumni data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-1">
      {/* Header */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm md:text-xl font-semibold text-white">
                Student Alumni
              </h1>
              <p className="text-xs text-blue-100">
                View all passed out students
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, parent or place..."
              className="w-full pl-9 pr-8 py-2.5 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle and Year Select */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white text-xs font-medium flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              Filter
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showFilters && (
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="all">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    Class of {y}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[10px] text-blue-100">
              Showing {filtered.length} of {students.length} alumni
            </p>
            {(searchTerm || year !== 'all') && (
              <button
                onClick={clearAllFilters}
                className="text-[10px] text-white/80 hover:text-white underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-2 max-w-8xl mx-auto">
        {/* Stats Cards */}
        {/* Summary Cards */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-1 mb-3">
          {/* Total Alumni Card */}
          <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl py-3 px-1 border border-blue-100/50">
            <span className="text-base md:text-3xl font-bold text-blue-600">
              {students.length}
            </span>
            <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
              Total Alumni
            </span>
          </div>

          {/* Batch Years Card */}
          <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl py-3 px-1 border border-emerald-100/50">
            <span className="text-base md:text-3xl font-bold text-emerald-600">
              {years.length}
            </span>
            <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
              Batch Years
            </span>
          </div>

          {/* Latest Batch Card */}
          <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl py-3 px-1 border border-purple-100/50">
            <span className="text-base md:text-3xl font-bold text-purple-600">
              {years[0] || 'N/A'}
            </span>
            <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
              Latest Batch
            </span>
          </div>
        </div>

        {/* Alumni List - Card View for Mobile, Table for Desktop */}
        <div className="lg:hidden space-y-2">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-600">
                No alumni found
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {searchTerm
                  ? `No results matching "${searchTerm}"`
                  : year !== 'all'
                  ? `No students passed out in ${year}`
                  : 'No alumni data available'}
              </p>
            </div>
          ) : (
            filtered.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl p-3 shadow-sm border border-slate-100"
              >
                <div className="flex items-start gap-3">
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[12px] md:text-sm font-semibold text-slate-800 mb-1">
                      {s.name}
                    </h3>
                    <div className="space-y-1">
                      {s.place && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-[12px] md:text-xs text-slate-600">
                            {s.place}
                          </span>
                          {s.father_name && (
                        <div className=" ms-5 flex items-center gap-1.5">
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="text-[12px] md:text-xs text-slate-600">
                           Father: {s.father_name}
                          </span>
                        </div>
                      )}
                        </div>
                      )}
                      
                      {s.phone_no && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <a
                            href={`tel:${s.phone_no}`}
                            className="text-[12px] md:text-xs text-blue-600 hover:underline"
                          >
                            {s.phone_no}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-[9px] font-medium bg-blue-50 text-blue-700">
                      {s.pass_out_year}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Place
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      Parent
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      Phone
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Pass Out
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 px-4">
                      <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm font-medium text-slate-600">
                        No alumni found
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {searchTerm
                          ? `No results matching "${searchTerm}"`
                          : year !== 'all'
                          ? `No students passed out in ${year}`
                          : 'No alumni data available'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {s.name?.charAt(0) || 'S'}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-slate-800">
                            {s.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-600">
                          {s.place || '—'}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-600">
                          {s.father_name || '—'}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {s.phone_no ? (
                          <a
                            href={`tel:${s.phone_no}`}
                            className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                          >
                            {s.phone_no}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {s.pass_out_year}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filtered.length > 0 && (
            <div className="bg-slate-50/50 px-4 py-2 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                Showing {filtered.length} of {students.length} total alumni
              </p>
            </div>
          )}
        </div>

        {/* Mobile Load More (if needed) - Optional */}
        {filtered.length > 10 && (
          <div className="lg:hidden mt-3 text-center">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-medium hover:bg-slate-50 transition-colors">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OldStudents