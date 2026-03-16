import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Component imports
import ExamTopers from '../HomePage/Components/Exam-Topers/ExamTopers'
import AttendnaceTopers from '../HomePage/Components/Atnd-Topers/AttendnaceTopers'
import Footer from '../HomePage/Components/Footer/Footer'
import Calandar from '../HomePage/Components/Calandar/Calandar'
import Events from '../HomePage/Components/UpcomingEvents/Events'
import STDAttendancePie from './Components/Dashboard/STDAtnd-summery/STDAttendancePie'
import TCHAtendSummery from './Components/Dashboard/TCHAtnd-summery/TCHAtendSummery'
import RouteenTopers from '../HomePage/Components/Routine-Toperse/RouteenTopers'
import SchoolData from './Components/Dashboard/SchoolData/SchoolData'

import logo from "/src/assets/Edusafa2.png";

// Sample Data
const sampleSchool = {
  name: "Qurrathul Ain",
  sub_name: "Higher Secondary Madrasa",
  address: "Malappuram, Kerala",
  logo: logo
}

const sampleManagement = {
  name: "Yusuf Ahmed",
  place: "Malappuram",
  position: "Managing Director",
  image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3Jhd3BpeGVsb2ZmaWNlMTJfbXVzbGltX21hbl91c2luZ19pcGFkX2xvb2tfYXRfY2FtZXJhX2hhcHB5X2lzb18xNjJmNWE0Yy1hZjJjLTQzMDQtYTQ4MC1hYjI2YzcwZGM0ZGEucG5n.png"
}

const sampleTotals = {
  total_students: 100,
  total_teachers: 5,
  total_notices: 24
}

function ManagementPage() {
  const navigate = useNavigate()

  // State management with sample data
  const [menuOpen, setMenuOpen] = useState(false)
  const [school, setSchool] = useState(sampleSchool)
  const [management, setManagement] = useState(sampleManagement)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [totals, setTotals] = useState(sampleTotals)
  const [imageError, setImageError] = useState(false)

  // Refs
  const sidebarRef = useRef(null)
  const menuButtonRef = useRef(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setDataLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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

  const handleImageError = () => {
    setImageError(true)
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
            <div className="relative px-4 pb-6 mb-2 border-b border-white/10">
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
                <div className="text-center flex flex-col items-center space-y-3">
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
            <nav className="px-3 py-2 space-y-1">
              {[
                {
                  to: '/management/about',
                  label: 'About Madrasa',
                  icon: 'M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z',
                },
                {
                  to: '/management/classroom',
                  label: 'ClassRoom',
                  icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13',
                },
                {
                  to: '/management/teachers-page',
                  label: 'Teachers',
                  icon: 'M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z',
                },
                {
                  to: '/management/students-page',
                  label: 'Students',
                  icon: 'M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zm0 2c-2.67 0-8 1.34-8 4v2h10v-2c0-.73.21-1.41.58-2.02C9.45 14.29 8.74 14 8 14zm8 0c-.74 0-1.45.29-2.58.98.37.61.58 1.29.58 2.02v2h10v-2c0-2.66-5.33-4-8-4z',
                },
                {
                  to: '/management/madrasa',
                  label: 'Madrasa',
                  icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
                },
                {
                  to: '/support',
                  label: 'Support',
                  icon: 'M18 10a6 6 0 10-12 0v4a2 2 0 002 2h1v-6H8a4 4 0 118 0h-1v6h1a2 2 0 002-2v-4z',
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

          {/* Bottom Footer */}
          <div className="relative p-4 mt-4 overflow-hidden border-t border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>

            <div className="relative text-center">
              <p className="text-xs text-slate-400">Built & Maintained by </p>
              <a
                href="https://www.aionespark.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex flex-col items-center group min-h-[44px] justify-center px-2"
                onClick={closeMenu}
              >
                <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-300 active:scale-105 lg:group-hover:scale-105">
                  AioneSpark TechHive LLP
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent scale-x-0 active:scale-x-100 lg:group-hover:scale-x-100 transition-transform duration-500"></div>
              </a>

              <div className="mt-3 text-[12px] md:text-xs text-slate-500">
                v1.0.3 • Madrasa Edition
              </div>
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

              {/* Management Profile Card */}
              <div className="flex items-center mt-5 gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg">
                {management?.image && !imageError ? (
                  <img
                    src={management.image}
                    alt={management?.name || 'Management'}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl border-2 border-white shadow-md bg-blue-400 text-white font-bold text-xl">
                    {management?.name?.[0] || 'M'}
                  </div>
                )}

                <div className="flex flex-col">
                  <h2 className="text-sm font-bold">
                    {management?.name || 'Management Name'}
                  </h2>
                  <p className="text-xs text-blue-100">
                    Place: {management?.place || 'Location'}
                  </p>
                  <div className="flex items-center text-xs text-blue-100">
                    <span>{management?.position || 'Position'}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="px-1 pt-4 pb-1 overflow-x-hidden">
            <SchoolData totals={totals} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="w-full shadow-lg bg-white/90 rounded-2xl overflow-hidden">
                <STDAttendancePie />
              </div>
              <div className="w-full shadow-lg bg-white/90 rounded-2xl overflow-hidden">
                <TCHAtendSummery />
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

export default ManagementPage