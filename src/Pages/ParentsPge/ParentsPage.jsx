import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SchoolData from './Components/Dashboard/SchoolData/SchoolData'
import AttendancePie from './Components/Dashboard/Atnd-summery/AttendancePie'
import RoutinSummery from './Components/Dashboard/RoutinSummery/RoutinSummery'
import Calandar from '../HomePage/Components/Calandar/Calandar'
import Events from '../HomePage/Components/UpcomingEvents/Events'
import AttendnaceTopers from '../HomePage/Components/Atnd-Topers/AttendnaceTopers'
import RouteenTopers from '../HomePage/Components/Routine-Toperse/RouteenTopers'
import ExamTopers from '../HomePage/Components/Exam-Topers/ExamTopers'
import Footer from '../HomePage/Components/Footer/Footer'


import logo from "/src/assets/Edusafa2.png";

// Sample Data
const SAMPLE_SCHOOL = {
  name: "Qurrathul Ain",
  sub_name: "Higher Secondary Madrasa",
  address: "Malappuram, Kerala",
  logo: logo
}

const SAMPLE_TOTALS = {
  total_students: 100,
  total_teachers: 5,
  total_notices: 24
}

const SAMPLE_STUDENTS = [
  {
    id: 101,
    name: "Ahmed Raza",
    standard: "10 ",
    place: "Malappuram",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
    attendance_percentage: 92,
    routine_completion: 85
  },
  {
    id: 102,
    name: "Fatima Zahra",
    standard: "8 ",
    place: "Kozhikode",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
    attendance_percentage: 88,
    routine_completion: 78
  },

]

function ParentsPage() {
  const navigate = useNavigate()

  // State management
  const [menuOpen, setMenuOpen] = useState(false)
  const [school, setSchool] = useState(SAMPLE_SCHOOL)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [studentsList, setStudentsList] = useState([])
  const [totals, setTotals] = useState(SAMPLE_TOTALS)
  // New state for the currently selected child
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Refs
  const sidebarRef = useRef(null)
  const menuButtonRef = useRef(null)

  // Load sample data
  useEffect(() => {
    const loadSampleData = async () => {
      try {
        setIsLoading(true)
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setStudentsList(SAMPLE_STUDENTS)
        // Automatically select the first child if available
        if (SAMPLE_STUDENTS.length > 0) {
          setSelectedStudent(SAMPLE_STUDENTS[0])
        }
        
        setDataLoaded(true)
      } catch (error) {
        console.error('Error loading data:', error)
        navigate('/parent/login')
      } finally {
        setIsLoading(false)
      }
    }

    loadSampleData()
  }, [navigate])

  // Check mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Focus management
  useEffect(() => {
    if (menuOpen && isMobile && sidebarRef.current) {
      const focusableEl = sidebarRef.current.querySelector('a, button')
      if (focusableEl) {
        setTimeout(() => focusableEl.focus(), 100)
      }
    } else if (!menuOpen && isMobile && menuButtonRef.current) {
      menuButtonRef.current.focus()
    }
  }, [menuOpen, isMobile])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [menuOpen])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen && isMobile ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, isMobile])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const closeMenu = () => {
    if (isMobile) setMenuOpen(false)
  }

  const getImageUrl = (url) => {
    if (!url) return null
    return url?.startsWith('http') ? url : url
  }

  // Don't render anything until data is loaded
  if (!dataLoaded && isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 px-6 py-3">
            <div className="flex gap-2">
              <span
                className="w-3 h-3 bg-emerald-500 rounded-sm animate-[bounce_0.8s_infinite] rotate-12"
                style={{ animationDelay: '0ms' }}
              ></span>
              <span
                className="w-3 h-3 bg-blue-500 rounded-sm animate-[bounce_0.8s_infinite] -rotate-12"
                style={{ animationDelay: '200ms' }}
              ></span>
              <span
                className="w-3 h-3 bg-purple-500 rounded-sm animate-[bounce_0.8s_infinite] rotate-12"
                style={{ animationDelay: '400ms' }}
              ></span>
            </div>

            <span className="text-sm font-medium tracking-wide text-slate-600">
              LOADING
            </span>

            <div className="w-12 h-px bg-slate-200"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <div className="relative flex">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full lg:w-[20rem] w-[16rem] py-4
            bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900
            transform transition-transform duration-500 ease-in-out shadow-2xl
            z-50 will-change-transform
            ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 flex flex-col justify-between
            before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] before:opacity-20 before:pointer-events-none
            after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:via-transparent after:to-white/5 after:pointer-events-none
            border-r border-white/10`}
          aria-label="Main navigation"
          aria-hidden={!menuOpen && isMobile}
          inert={!menuOpen && isMobile}
        >
          <div>
            {/* School Header */}
            <div className="relative px-4 pb-4 border-b border-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>

              <div className="relative flex flex-col items-center">
                {/* Logo */}
              <div className="relative mb-2 mt-2">
                              <div className="absolute inset-0 bg-white rounded-2xl blur-xl"></div>
                              <div className="relative bg-white rounded-2xl p-2 border border-white/20">
                                {school?.logo ? (
                                  <img
                                    src={school.logo}
                                    alt="School Logo"
                                    className="w-[140px] md:w-[200px] h-[90px] md:h-[120px] object-contain"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="w-[160px] md:w-[220px] h-[80px] md:h-[100px] flex items-center justify-center text-sm md:text-base font-semibold text-gray-500">
                                    {school.name || 'Logo Update soon'}
                                  </div>
                                )}
                              </div>
                            </div>

                {/* School Details */}
                <div className="mt-2 text-center flex flex-col items-center space-y-1">
                  <h2 className="text-sm md:text-xl font-extrabold tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {school?.name || 'School Name'}
                  </h2>

                  {school?.sub_name && (
                    <p className="text-xs md:text-xs text-blue-100/80 tracking-wide">
                      {school.sub_name}
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-300 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
                    <svg
                      className="w-4 h-4 text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs truncate max-w-[220px] md:max-w-none">
                      {school?.address || 'Address'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              className="absolute p-3 text-white/60 transition-all rounded-lg top-2 right-2 lg:hidden hover:bg-white/10 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Links */}
            <nav className="px-3 py-2 space-y-1 max-h-[260px] overflow-y-auto">
              {[
                {
                  to: '/about',
                  label: 'About School',
                  icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15',
                },
                {
                  to: `/parent/class-room-page/${selectedStudent?.id}`,
                  label: 'ClassRoom',
                  icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                },
                {
                  to: `/parent/attendance/${selectedStudent?.id}`,
                  label: 'Attendance',
                  icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
                },
                {
                  to: `/parent/routine/${selectedStudent?.id}`,
                  label: 'Daily Routine',
                  icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                },
                {
                  to: `/parent/progress/${selectedStudent?.id}`,
                  label: 'Progress',
                  icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                },
                {
                  to: `/parent/fee/${selectedStudent?.id}`,
                  label: 'Fee Management',
                  badge: 'Due',
                  icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                },
                {
                  to: '/support',
                  label: 'Support',
                  icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
                },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-white/80 no-underline transition-all duration-300 rounded-xl active:bg-gradient-to-r active:from-blue-600/90 active:to-purple-600/90 lg:hover:bg-gradient-to-r lg:hover:from-blue-600/90 lg:hover:to-purple-600/90 hover:text-white lg:hover:shadow-lg lg:hover:shadow-purple-500/25 group relative overflow-hidden"
                  onClick={closeMenu}
                >
                  <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-active:translate-x-[100%] lg:group-hover:translate-x-[100%] transition-transform duration-700"></div>

                  <svg
                    className="w-5 h-5 transition-transform active:scale-110 lg:group-hover:scale-110 lg:group-hover:rotate-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d={item.icon}
                    />
                  </svg>

                  <span className="text-sm font-medium">{item.label}</span>

                  {item.badge && (
                    <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          {/* Students List Section */}
          <div className="relative px-3 py-3 border-t border-white/10">
            <h3 className="text-[12px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Your Children ({studentsList.length})
            </h3>

            {/* Students List Container with Scroll */}
            <div className="max-h-[150px] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
              <div className="space-y-1.5 pr-1">
                {studentsList.map((student, index) => (
                  <div
                    key={student.id || index}
                    onClick={() => {
                      setSelectedStudent(student)
                      if (isMobile) toggleMenu()
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer group"
                  >
                    {/* Avatar with Initial */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                        {student.image ? (
                          <img
                            src={student.image}
                            alt={student.name}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <span className="text-sm font-medium text-white/70">
                            {student.name?.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 bg-green-500`}
                      />
                    </div>

                    {/* Student Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/90 truncate">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        Class {student.standard}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <svg
                      className="w-4 h-4 text-white/30 group-hover:text-white/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Bottom Footer */}
          <div className="relative p-2 mt-1 overflow-hidden border-t border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>

            <div className="relative text-center">
              <p className="text-[10px] md:text-xs text-slate-400">
                Built & Maintained by{' '}
              </p>

              <span className="text-[13px] md:text-xs font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-300 active:scale-105 lg:group-hover:scale-105">
                AioneSpark TechHive LLP
              </span>
              <div className="text-[12px] md:text-xs text-slate-500">
                v1.0.3 • Madrasa Edition
              </div>
              <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent scale-x-0 active:scale-x-100 lg:group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden lg:ml-[20rem]">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
            <div className="px-2 py-3 space-y-3">
              <div className="mt-2 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    ref={menuButtonRef}
                    onClick={toggleMenu}
                    className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-gray-100 active:scale-95 transition"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>

                  <div className="md:ms-3">
                    <h1 className="text-sm md:text-xl font-bold text-gray-800">
                      {school?.name || 'School Name'}
                    </h1>
                    <p className="text-[13px] md:text-sm text-gray-500 mb-2">
                      {school?.sub_name || ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:me-5">
                  <Link
                    to={`/parent/notification/${selectedStudent?.id}`}
                    className="relative min-w-[44px] min-h-[44px] lg:min-w-[60px] lg:min-h-[60px] flex items-center justify-center rounded-2xl bg-gray-100 active:scale-95 transition"
                  >
                    <svg
                      className="w-4 h-4 md:w-6 md:h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>

                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow">
                      3
                    </span>
                  </Link>
                  <button
                    className="min-w-[44px] min-h-[44px] lg:min-w-[60px] lg:min-h-[60px] flex items-center justify-center rounded-2xl bg-red-50 active:bg-red-100 transition"
                    aria-label="Logout"
                    onClick={handleLogout}
                  >
                    <svg
                      className="w-4 h-4 md:w-6 md:h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Student Profile Card - Now shows selected student */}
              <Link to={`/parent/student-profile/${selectedStudent?.id}`}>
                <div className="flex items-center mt-5 gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg">
                  {selectedStudent?.image ? (
                    <img
                      src={getImageUrl(selectedStudent.image)}
                      alt={selectedStudent?.name || 'Student'}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center rounded-xl border-2 border-white shadow-md bg-blue-400 text-white font-bold text-sm">
                      {selectedStudent?.name?.[0] || '?'}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <h2 className="text-sm font-bold">
                      {selectedStudent?.name || 'No student selected'}
                    </h2>

                    <p className="text-xs text-blue-100">
                      Class: {selectedStudent?.standard || '—'}
                    </p>

                    <div className="flex items-center text-xs text-blue-100">
                      <span>Student</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="px-1 pt-4 pb-1 overflow-x-hidden">
            <SchoolData totals={totals} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="w-full shadow-lg bg-white/90 rounded-2xl overflow-hidden">
                <AttendancePie studentId={selectedStudent?.id} />
              </div>
              <div className="w-full shadow-lg bg-white/90 rounded-2xl overflow-hidden">
                <RoutinSummery studentId={selectedStudent?.id} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
              <div className="w-full overflow-x-auto scrollbar-hide shadow-lg bg-white/90 rounded-2xl">
                <Calandar />
              </div>
              <div className="w-full overflow-x-auto scrollbar-hide shadow-lg bg-white/90 rounded-2xl">
                <Events />
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-full overflow-x-auto scrollbar-hide shadow-lg bg-white/90 rounded-2xl">
                <AttendnaceTopers />
              </div>
              <div className="w-full overflow-x-auto scrollbar-hide shadow-lg bg-white/90 rounded-2xl">
                <RouteenTopers />
              </div>
              <div className="w-full overflow-x-auto scrollbar-hide shadow-lg bg-white/90 rounded-2xl">
                <ExamTopers />
              </div>
            </div>

            <div className="w-full mt-4 overflow-x-hidden shadow-lg bg-white/90 rounded-2xl">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ParentsPage