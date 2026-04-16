import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/Edusafa2.png'
import { useParams } from 'react-router-dom'
import { supabase } from '../../supabaseClient'

// Login Modal Component with Supabase Auth (Simplified)
const LoginModal = ({ show, onSubmit, onClose, isLoading }) => {
  const [isLoginMode, setIsLoginMode] = useState(true) // true = login, false = signup
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user already logged in when component mounts
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        // Check Supabase session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          // Get user profile from users table (if you still need additional user data)
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (userData && !error) {
            setIsLoggedIn(true)
            onSubmit(userData) // Auto-login
          } else {
            // If no profile in users table, just pass the auth user
            setIsLoggedIn(true)
            onSubmit(session.user)
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error)
      }
    }
    
    checkLoggedInUser()

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setIsLoggedIn(false)
          setUserDetails({ email: '', password: '' })
        } else if (event === 'SIGNED_IN' && session) {
          // Get user profile if exists
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (userData) {
            setIsLoggedIn(true)
            onSubmit(userData)
          } else {
            setIsLoggedIn(true)
            onSubmit(session.user)
          }
        }
      }
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [onSubmit])

  const validateLoginForm = () => {
    const newErrors = {}

    if (!userDetails.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!userDetails.password) {
      newErrors.password = 'Password is required'
    } else if (userDetails.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateSignupForm = () => {
    const newErrors = {}

    if (!userDetails.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!userDetails.password) {
      newErrors.password = 'Password is required'
    } else if (userDetails.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
    if (submitError) {
      setSubmitError('')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateLoginForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userDetails.email,
        password: userDetails.password,
      })

      if (error) throw error

      if (data.user) {
        setIsLoggedIn(true)
        
        // Try to get additional user data if users table exists
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()
        
        onSubmit(userData || data.user)
        
        // Close modal if onClose provided
        if (onClose) onClose()
      }
    } catch (error) {
      console.error('Login error:', error)
      setSubmitError(error.message || 'Invalid email or password')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!validateSignupForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Create auth user with just email and password
      const { data, error } = await supabase.auth.signUp({
        email: userDetails.email,
        password: userDetails.password,
      })

      if (error) throw error

      if (data.user) {
        setIsLoggedIn(true)
        onSubmit(data.user)
        
        // Close modal if onClose provided
        if (onClose) onClose()
      }
    } catch (error) {
      console.error('Signup error:', error)
      setSubmitError(error.message || 'Failed to create account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setErrors({})
    setSubmitError('')
    setUserDetails({
      email: '',
      password: '',
    })
  }

  // Don't show modal if user is logged in
  if (!show || isLoggedIn) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-sky-500/20 to-cyan-500/20 backdrop-blur-md" />

      <div className="relative w-full max-w-md transform transition-all duration-500 scale-100">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-sky-500" />

          <div className="p-8">
            <div className="text-center">
              <img src={logo} alt="EduSafa" className="h-16 mx-auto" />
            </div>
            <p className="text-center text-gray-600 mb-8 text-sm">
              {isLoginMode ? 'Welcome back to EduSafa' : 'Create your EduSafa account'}
            </p>

            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {submitError}
                </p>
              </div>
            )}

            <form onSubmit={isLoginMode ? handleLogin : handleSignup} className="space-y-5">
              <div>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  autoComplete="off"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-50 border ${
                    errors.email ? 'border-red-400' : 'border-gray-300'
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  autoComplete="off"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-50 border ${
                    errors.password ? 'border-red-400' : 'border-gray-300'
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">⚠️ {errors.password}</p>
                )}
                {!isLoginMode && !errors.password && userDetails.password && (
                  <p className="text-green-600 text-xs mt-1">
                    ✓ Password strength: {userDetails.password.length >= 8 ? 'Strong' : 'Weak'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 text-sm px-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-sky-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  isLoginMode ? 'Login to Dashboard' : 'Create Account'
                )}
              </button>
            </form>

           

            {isLoginMode && (
              <p className="text-center text-xs text-gray-400 mt-4">
                Enter your email and password to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MainPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showLoginModal, setShowLoginModal] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState(null) // Add state for user data
  const cardsRef = useRef([])

  useEffect(() => {
    // Check if user already logged in
    const storedUserData = localStorage.getItem('edusafa_user')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
      setShowLoginModal(false)
      setIsVisible(true)
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.1 },
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [])

  const handleLoginSubmit = async (userDetails) => {
    try {
      setIsLoading(true)

      // Store user data in state and localStorage
      setUserData(userDetails)
      localStorage.setItem('edusafa_user', JSON.stringify(userDetails))

      // Hide modal and show main content
      setShowLoginModal(false)
      setIsVisible(true)

      // You can also send this data to your backend if needed
      console.log('User logged in:', userDetails)
    } catch (error) {
      console.error('Login failed:', error)
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  const roles = [
    {
      id: 'student',
      title: 'Parents',
      icon: '📚',
      gradient: 'from-sky-400 to-blue-400',
      lightBg: 'bg-sky-50',
      textColor: 'text-sky-600',
      borderColor: 'border-sky-100',
      path: localStorage.getItem('parent_ui')
        ? '/parent/dashboard'
        : '/parent/login',
    },

    {
      id: 'teacher',
      title: 'Teacher',
      icon: '✏️',
      gradient: 'from-emerald-400 to-teal-400',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
      path: localStorage.getItem('teacher_ui')
        ? 'teacher/dashboard'
        : 'teacher/login',
    },

    {
      id: 'principal',
      title: 'Principal',
      icon: '🎓',
      gradient: 'from-amber-400 to-orange-400',
      lightBg: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-100',
      path: localStorage.getItem('principal_ui')
        ? 'principal/dashboard'
        : 'principal/login',
    },
    {
      id: 'management',
      title: 'Management',
      icon: '📊',
      gradient: 'from-violet-400 to-purple-400',
      lightBg: 'bg-violet-50',
      textColor: 'text-violet-600',
      borderColor: 'border-violet-100',
      path: localStorage.getItem('management_ui')
        ? '/management/dashboard'
        : '/management/login',
    },
  ]

  const handleRoleClick = (path) => {
    window.location.href = path
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      <LoginModal
        show={showLoginModal}
        onSubmit={handleLoginSubmit}
        isLoading={isLoading}
      />

      {/* User Info Bar - Show when logged in */}

      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Background Pattern */}
      {!showLoginModal && (
        <>
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 5L45 18L25 31L5 18L25 5Z' fill='%233B82F6' fill-opacity='0.2'/%3E%3C/svg%3E")`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 hidden md:block" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 hidden md:block" />
        </>
      )}

      {/* Main Content */}
      <div
        className={`relative z-10 container mx-auto px-4 py-4 min-h-screen flex flex-col ${
          showLoginModal ? 'blur-sm pointer-events-none' : ''
        }`}
      >
        {/* Top Bar */}
        <div
          className={`flex justify-between items-center w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-4 md:mb-5 lg:mb-6 transform transition-all duration-700 ${
            isVisible && !showLoginModal
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-10'
          }`}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-xl px-3 py-1.5 md:px-4 md:py-2 border border-slate-200/60 hover:bg-white transition-all duration-300 shadow-sm">
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <span className="text-sky-500 text-sm md:text-base">📅</span>
              <span className="text-slate-600 text-[10px] md:text-sm font-medium">
                {currentTime.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-lg ms-1 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-slate-200/60 hover:bg-white transition-all duration-300 shadow-sm">
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <span className="text-sky-500 text-sm md:text-base">⏰</span>
              <span className="text-slate-600 text-[10px] md:text-sm font-medium">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`flex justify-center mt-2 items-center mb-1 md:mb-8 lg:mb-10 transform transition-all duration-700 delay-200 ${
            isVisible && !showLoginModal
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <img
            src={logo}
            alt="EduSafa Logo"
            className="h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-auto object-contain"
          />
        </div>
        <p className="mb-2 px-4 py-3 text-[13px] md:text-xs max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-center  text-slate-500 leading-relaxed bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-xl  shadow-sm hover:shadow-md transition-all duration-300">
          This is a demo version of the Edusafa app. It is only meant to help
          you understand how the original app works. This app should not be used
          for any other purposes. All the people, images, and data shown here
          are purely fictional. The original app may have differences compared
          to this demo version.
        </p>
        {/* Role Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto w-full mb-5 md:mb-6 lg:mb-7">
          {roles.map((role, index) => (
            <div
              key={role.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`opacity-0 translate-y-10 transition-all duration-700 cursor-pointer group`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => handleRoleClick(role.path)}
            >
              <div
                className={`${role.lightBg} rounded-xl md:rounded-xl lg:rounded-2xl p-3 md:p-4 lg:p-5 shadow-sm hover:shadow-md transition-all duration-300 border-2 ${role.borderColor} relative overflow-hidden flex flex-col items-center text-center hover:-translate-y-1 bg-white/90 backdrop-blur-sm`}
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-2xl md:text-3xl lg:text-4xl shadow-sm transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 mb-2 text-white`}
                >
                  {role.icon}
                </div>

                <h3
                  className={`font-semibold text-sm md:text-base lg:text-lg ${role.textColor} mb-2`}
                >
                  {role.title}
                </h3>

                <div className="flex items-center justify-center space-x-1.5 md:space-x-2 mt-auto">
                  <span className="text-[10px] text-center md:text-xs text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
                    Tap to login
                  </span>
                  <div
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-r ${role.gradient} flex items-center justify-center text-white text-[8px] md:text-[10px] opacity-0 group-hover:opacity-100 transform translate-x-[-3px] group-hover:translate-x-0 transition-all duration-300 shadow-sm`}
                  >
                    →
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div
          className={`grid grid-cols-4 gap-2 md:gap-3 lg:gap-4 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto w-full md:mb-5 lg:mb-6 transition-all duration-700 delay-1000 ${
            isVisible && !showLoginModal
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            {
              value: '100+',
              label: 'Students',
              icon: '👥',
              color: 'from-sky-400 to-blue-400',
            },
            {
              value: '5+',
              label: 'Teachers',
              icon: '👩‍🏫',
              color: 'from-emerald-400 to-teal-400',
            },
            {
              value: '10+',
              label: 'Classes',
              icon: '🏫',
              color: 'from-violet-400 to-purple-400',
            },
            {
              value: '12+',
              label: 'Activities',
              icon: '⚽',
              color: 'from-amber-400 to-orange-400',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center border border-slate-200/60 hover:bg-white transition-all duration-300 shadow-sm"
            >
              <div
                className={`inline-flex w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-r ${stat.color} items-center justify-center text-xs md:text-sm mb-1 shadow-sm text-white`}
              >
                {stat.icon}
              </div>
              <div className="text-slate-700 font-bold text-xs md:text-sm">
                {stat.value}
              </div>
              <div className="text-slate-400 text-[8px] md:text-[10px] tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`mt-auto pt-1 md:pt-4 text-center transition-all duration-700 delay-1200 ${
            isVisible && !showLoginModal ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto w-full border-t border-slate-200/60 pt-1">
            <p className="text-slate-400 text-[12px] md:text-sm flex items-center justify-center space-x-2">
              <span>© 2026 Edusafa Demo</span>
              <span className="hidden md:inline w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="hidden md:inline">Secure Learning Platform</span>
            </p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .cursor-pointer {
          cursor: pointer;
          touch-action: manipulation;
        }

        @media (max-width: 768px) {
          .md\\:grid-cols-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  )
}

export default MainPage
