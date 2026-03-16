import React, { useState } from 'react'
import { CheckCircle2, Circle, Clock, BookOpen, Sparkles, Calendar, Award, TrendingUp, Star } from 'lucide-react'
import { useParams } from "react-router-dom";

function MarkMyRoutine() {
  // Exactly 10 tasks matching the model
  const [routine, setRoutine] = useState({
    subahi: false,
    luhur: false,
    asar: false,
    maqrib: false,
    isha: false,
    thabaraka: false,
    waqiha: false,
    reading: false,
    swalath: false,
    haddad: false,
  })

  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { studentId } = useParams();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target
    setRoutine((prevRoutine) => ({
      ...prevRoutine,
      [name]: checked,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage('Routine successfully updated!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error submitting routine:', error)
      setErrorMessage('Failed to submit the routine.')
      setTimeout(() => setErrorMessage(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  // 10 routine items with complete information
  const routineItems = [
    { key: 'subahi', label: 'Subahi', icon: '🌅', color: 'from-amber-400 to-orange-500', time: 'Dawn Prayer', arabic: 'صبحی', description: 'Fajr Prayer' },
    { key: 'luhur', label: 'Luhur', icon: '☀️', color: 'from-yellow-400 to-amber-500', time: 'Noon Prayer', arabic: 'ظهر', description: 'Dhuhr Prayer' },
    { key: 'asar', label: 'Asar', icon: '🌤️', color: 'from-orange-400 to-red-500', time: 'Afternoon Prayer', arabic: 'عصر', description: 'Asr Prayer' },
    { key: 'maqrib', label: 'Maqrib', icon: '🌅', color: 'from-red-400 to-rose-500', time: 'Sunset Prayer', arabic: 'مغرب', description: 'Maghrib Prayer' },
    { key: 'isha', label: 'Isha', icon: '🌙', color: 'from-indigo-400 to-purple-500', time: 'Night Prayer', arabic: 'عشاء', description: 'Isha Prayer' },
    { key: 'thabaraka', label: 'Thabaraka', icon: '📖', color: 'from-emerald-400 to-teal-500', time: 'Surah Mulk', arabic: 'تبارك', description: 'Surah Al-Mulk' },
    { key: 'waqiha', label: 'Waqiha', icon: '📖', color: 'from-blue-400 to-cyan-500', time: 'Surah Waqiah', arabic: 'واقعة', description: 'Surah Al-Waqiah' },
    { key: 'reading', label: 'Reading', icon: '📚', color: 'from-violet-400 to-purple-500', time: 'Quran Reading', arabic: 'قراءة', description: 'Quran Recitation' },
    { key: 'swalath', label: 'Swalath', icon: '🤲', color: 'from-fuchsia-400 to-pink-500', time: 'Salawat', arabic: 'صلوات', description: 'Blessings on Prophet' },
    { key: 'haddad', label: 'Haddad', icon: '✨', color: 'from-rose-400 to-red-500', time: 'Haddad Wird', arabic: 'حداد', description: 'Daily Wird' },
  ]

  const getCompletionPercentage = () => {
    const completedTasks = Object.values(routine).filter(Boolean).length
    return Math.round((completedTasks / 10) * 100)
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getStatusColor = () => {
    const percentage = getCompletionPercentage()
    if (percentage >= 90) return 'from-emerald-500 to-green-600'
    if (percentage >= 75) return 'from-green-500 to-emerald-600'
    if (percentage >= 50) return 'from-yellow-500 to-amber-600'
    if (percentage >= 25) return 'from-orange-500 to-red-600'
    return 'from-red-500 to-rose-600'
  }

  const getMessage = () => {
    const percentage = getCompletionPercentage()
    if (percentage === 100) return "Masha'Allah! All 10 tasks completed 🎉"
    if (percentage >= 75) return `Excellent! ${Math.round(percentage)}% done. Keep going! 💪`
    if (percentage >= 50) return `Good progress! ${Math.round(percentage)}% completed ✨`
    if (percentage >= 25) return `Great start! ${Math.round(percentage)}% done 🌟`
    return "Begin your spiritual journey today 🤲"
  }

  const completedCount = Object.values(routine).filter(Boolean).length


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="p-1 max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-4 rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
          <div className="relative px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-white md:xl">
                    Mark Daily Routine
                  </h1>
                  <p className="text-xs text-white/90 flex items-center gap-1">
                    
                    10 daily tasks to complete
                  </p>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-xs font-medium text-white">
                  {completedCount}/10
                </span>
              </div>
            </div>
            
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-white/80" />
                <span className="text-xs text-white/90 truncate">
                  {getCurrentDate()}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getStatusColor()} transition-all duration-500 ease-out relative`}
                      style={{ width: `${getCompletionPercentage()}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-xs font-semibold text-white">
                    {getCompletionPercentage()}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md">
              <Star className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-xs font-medium text-gray-700">
              {getMessage()}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  10 Daily Tasks
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Tap each card to mark as completed
                </p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <Clock className="w-3 h-3 text-blue-600" />
                <span className="text-[10px] font-medium text-blue-600">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          {/* Routine Grid - 2 columns on mobile */}
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2">
              {routineItems.map((item) => {
                const checked = routine[item.key]
                return (
                  <div
                    key={item.key}
                    className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                      ${checked
                        ? `bg-gradient-to-br ${item.color} shadow-lg`
                        : 'bg-gray-50 hover:bg-gray-100 shadow-sm hover:shadow'
                      } rounded-xl p-3 border ${checked ? 'border-transparent' : 'border-gray-200'}`}
                    onClick={() =>
                      handleCheckboxChange({
                        target: { name: item.key, checked: !checked },
                      })
                    }
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Icon with Status */}
                      <div className="relative mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl
                          ${checked 
                            ? 'bg-white/30 backdrop-blur-sm' 
                            : 'bg-gradient-to-br from-gray-100 to-gray-200'
                          }`}
                        >
                          {item.icon}
                        </div>
                        {checked && (
                          <div className="absolute -top-1 -right-1">
                            <div className="relative">
                              <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-50"></div>
                              <CheckCircle2 className="w-4 h-4 text-white relative z-10" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Labels */}
                      <div className="space-y-0.5">
                        <h3 className={`text-xs font-semibold ${
                          checked ? 'text-white' : 'text-gray-800'
                        }`}>
                          {item.label}
                        </h3>
                        <p className={`text-[10px] ${
                          checked ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {item.arabic}
                        </p>
                        <p className={`text-[8px] ${
                          checked ? 'text-white/60' : 'text-gray-400'
                        }`}>
                          {item.time}
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        name={item.key}
                        checked={checked}
                        onChange={handleCheckboxChange}
                        className="sr-only"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        {/* Messages */}
        {successMessage && (
          <div className="mt-3 animate-slideIn">
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-100 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-xs text-green-800 font-medium">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mt-3 animate-slideIn">
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-red-100 rounded-full">
                  <Circle className="w-4 h-4 text-red-600" />
                </div>
                <p className="text-xs text-red-800 font-medium">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
          {/* Stats and Submit */}
          <div className="px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg shadow-md">
                  <Award className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-700">Today's Achievement</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-900">{completedCount}</span>
                    <span className="text-[10px] text-gray-500">of 10 tasks</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`relative px-4 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  loading ? 'animate-pulse' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Save Progress'
                )}
              </button>
            </div>
          </div>
        </div>


        {/* Progress Tip */}
        <div className="mt-4 text-center">
          <p className="text-[10px] text-gray-400">
            {completedCount === 10 
              ? "🎉 Masha'Allah! You've completed all 10 tasks today" 
              : `✨ ${10 - completedCount} more tasks to go for a perfect day`}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default MarkMyRoutine