import React, { useState, useEffect } from 'react'
import {
  Bell,
  Send,
  CheckCircle,
  AlertCircle,
  BookOpen,
  MessageSquare,
  Trash2,
  Pin,
  Clock,
  Calendar,
} from 'lucide-react'

function GivNotificaTHR() {
  const [allClasses, setAllClasses] = useState([
    {
      id: 1,
      std: "5 A",
      section: "A",
      students_count: 32
    },
    {
      id: 2,
      std: "5 B",
      section: "B",
      students_count: 30
    },
    {
      id: 3,
      std: "6 A",
      section: "A",
      students_count: 28
    },
    {
      id: 4,
      std: "6 B",
      section: "B",
      students_count: 31
    },
    {
      id: 5,
      std: "7 A",
      section: "A",
      students_count: 29
    },
    {
      id: 6,
      std: "7 B",
      section: "B",
      students_count: 33
    },
    {
      id: 7,
      std: "8 A",
      section: "A",
      students_count: 27
    },
    {
      id: 8,
      std: "8 B",
      section: "B",
      students_count: 30
    },
    {
      id: 9,
      std: "9 A",
      section: "A",
      students_count: 35
    },
    {
      id: 10,
      std: "9 B",
      section: "B",
      students_count: 34
    },
    {
      id: 11,
      std: "10 A",
      section: "A",
      students_count: 28
    },
    {
      id: 12,
      std: "10 B",
      section: "B",
      students_count: 29
    }
  ])
  
  const [selectedClass, setSelectedClass] = useState(null)
  const [notificationTitle, setNotificationTitle] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isPinned, setIsPinned] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [fetchingNotifications, setFetchingNotifications] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  // Sample notifications data for different classes
  const sampleNotifications = {
    1: [
      {
        id: 101,
        title: "Parent-Teacher Meeting",
        message: "Parent-Teacher meeting scheduled for this Friday at 10:00 AM. Please ensure all parents are informed.",
        is_pinned: true,
        created_at: "2024-03-15T09:30:00",
        expires_in: "48h"
      },
      {
        id: 102,
        title: "Homework Reminder",
        message: "Mathematics homework (Chapter 5: Fractions) to be submitted by Monday. Students who haven't completed please finish over the weekend.",
        is_pinned: false,
        created_at: "2024-03-14T14:20:00",
        expires_in: "24h"
      },
      {
        id: 103,
        title: "Science Project Deadline",
        message: "Science project on 'Solar System' is due next Wednesday. Students can work in groups of 3.",
        is_pinned: false,
        created_at: "2024-03-13T11:45:00",
        expires_in: "36h"
      }
    ],
    2: [
      {
        id: 201,
        title: "Class Test Announcement",
        message: "English grammar test on Thursday. Topics: Tenses, Prepositions, and Articles.",
        is_pinned: true,
        created_at: "2024-03-15T10:15:00",
        expires_in: "48h"
      },
      {
        id: 202,
        title: "School Trip Permission",
        message: "Permission slips for the museum trip must be submitted by tomorrow. Late submissions won't be accepted.",
        is_pinned: false,
        created_at: "2024-03-14T09:00:00",
        expires_in: "24h"
      }
    ],
    3: [
      {
        id: 301,
        title: "Annual Day Preparation",
        message: "Rehearsal for Annual Day program tomorrow at 2 PM. All participants must attend.",
        is_pinned: true,
        created_at: "2024-03-15T08:30:00",
        expires_in: "48h"
      },
      {
        id: 302,
        title: "Sports Meet Registration",
        message: "Last day to register for inter-school sports meet. Interested students please submit forms by end of day.",
        is_pinned: true,
        created_at: "2024-03-14T13:20:00",
        expires_in: "24h"
      },
      {
        id: 303,
        title: "Library Books Return",
        message: "All library books must be returned by Friday for stock verification.",
        is_pinned: false,
        created_at: "2024-03-13T15:40:00",
        expires_in: "36h"
      }
    ],
    5: [
      {
        id: 501,
        title: "Math Olympiad Registration",
        message: "Registration for Math Olympiad closing soon. Interested students to submit fees by Monday.",
        is_pinned: true,
        created_at: "2024-03-15T11:00:00",
        expires_in: "48h"
      }
    ],
    7: [
      {
        id: 701,
        title: "Career Counseling Session",
        message: "Career counseling session for class 7 students this Saturday at 9 AM. Parents are also invited.",
        is_pinned: true,
        created_at: "2024-03-15T09:45:00",
        expires_in: "48h"
      },
      {
        id: 702,
        title: "Science Fair",
        message: "School Science Fair next week. Students can register their projects with class teacher.",
        is_pinned: false,
        created_at: "2024-03-14T10:30:00",
        expires_in: "36h"
      }
    ],
    10: [
      {
        id: 1001,
        title: "Board Exam Schedule",
        message: "Final board exam schedule has been released. Check notice board for detailed timetable.",
        is_pinned: true,
        created_at: "2024-03-15T08:00:00",
        expires_in: "48h"
      },
      {
        id: 1002,
        title: "Pre-board Results",
        message: "Pre-board examination results will be announced tomorrow at 11 AM.",
        is_pinned: true,
        created_at: "2024-03-14T16:15:00",
        expires_in: "24h"
      },
      {
        id: 1003,
        title: "Doubt Clearing Session",
        message: "Extra doubt clearing session for Mathematics after school today at 3 PM.",
        is_pinned: false,
        created_at: "2024-03-13T12:00:00",
        expires_in: "12h"
      }
    ]
  }

  useEffect(() => {
    // Simulate loading classes
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  // Fetch notifications when a class is selected
  useEffect(() => {
    const fetchNotifications = () => {
      if (!selectedClass) return

      setFetchingNotifications(true)
      
      // Simulate API delay
      setTimeout(() => {
        const classNotifications = sampleNotifications[selectedClass.id] || []
        setNotifications(classNotifications)
        setFetchingNotifications(false)
      }, 500)
    }

    fetchNotifications()
  }, [selectedClass])

  const handleClassSelect = (classData) => {
    setSelectedClass(classData)
    setError('')
    setSuccess('')
    setNotifications([])
    setNotificationTitle('')
    setNotificationMessage('')
    setIsPinned(true)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!selectedClass) {
      setError('Please select a class first.')
      return
    }

    if (!notificationTitle.trim()) {
      setError('Please enter notification title.')
      return
    }

    if (!notificationMessage.trim()) {
      setError('Please enter notification message.')
      return
    }

    // Simulate API call
    const newNotification = {
      id: Date.now(),
      title: notificationTitle,
      message: notificationMessage,
      is_pinned: isPinned,
      created_at: new Date().toISOString(),
      expires_in: "48h"
    }

    setNotifications(prev => [newNotification, ...prev])
    setSuccess('Notification sent successfully!')
    
    // Reset form
    setNotificationTitle('')
    setNotificationMessage('')
    setIsPinned(true)

    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleDeleteNotification = async (notificationId) => {
    setDeletingId(notificationId)

    // Simulate API delay
    setTimeout(() => {
      setNotifications(notifications.filter((n) => n.id !== notificationId))
      setSuccess('Notification deleted successfully!')
      setDeletingId(null)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    }, 500)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="min-h-screen p-1 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Class Notifications
                </h1>
                <p className="text-xs text-white/90">
                  Manage and send notifications to students
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Selection Card */}
        <div className="px-1 mx-auto -mt-3">
          <div className="max-w-8xl p-1 mx-auto mb-2">
            <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                  Select Class
                </h2>
              </div>

              {loading && !selectedClass ? (
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
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        {selectedClass && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
            {/* Left Column - Create Notification Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <h2 className="text-sm md:text-xl font-semibold text-blue-600">
                  New Notification for {selectedClass.std}
                </h2>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Title Input */}
                <div className="mb-3">
                  <label
                    htmlFor="notificationTitle"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    Notification Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="notificationTitle"
                    className="text-sm w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Enter notification title..."
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Message Input */}
                <div className="mb-3">
                  <label
                    htmlFor="notificationMessage"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    Notification Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="notificationMessage"
                    className="text-sm w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                    rows="4"
                    placeholder="Type your notification message here..."
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Pin Checkbox */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPinned}
                        onChange={(e) => setIsPinned(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Pin this notification
                      </span>
                    </label>
                  </div>
                  {!isPinned && (
                    <span className="text-[13px] md:text-xs text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full inline-block w-fit">
                      ⚠️ If a notification is unpinned, it will be displayed as not very important.
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={
                      !notificationTitle.trim() ||
                      !notificationMessage.trim() ||
                      !selectedClass
                    }
                    className="w-full px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center gap-2 hover:from-blue-700 hover:to-sky-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    Send Notification
                  </button>
                </div>
              </form>
            </div>

            {/* Alert Messages */}
            <div className="space-y-2">
              {error && (
                <div className="px-5 py-3 bg-red-50 border-l-4 border-red-400 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                    <p className="text-red-700 font-medium text-sm">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="px-5 py-3 bg-green-50 border-l-4 border-green-400 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <p className="text-green-700 font-medium text-sm">{success}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Notifications List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-xl">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-sm md:text-lg font-semibold text-blue-600">
                    Active Notifications
                  </h2>
                </div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                  {notifications.length} total
                </span>
              </div>

              {fetchingNotifications ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                    <Bell className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    No active notifications
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Notifications expire after 24 hours
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 custom-scroll">
                  {/* Sort: pinned first, then by date */}
                  {[...notifications]
                    .sort((a, b) => {
                      if (a.is_pinned && !b.is_pinned) return -1
                      if (!a.is_pinned && b.is_pinned) return 1
                      return new Date(b.created_at) - new Date(a.created_at)
                    })
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`group relative rounded-xl border transition-all duration-200 p-4 hover:shadow-md
                          ${
                            notification.is_pinned
                              ? 'border-yellow-200 bg-yellow-50/50'
                              : 'border-gray-200 bg-white'
                          }`}
                      >
                        {/* Top Row */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                                {notification.title}
                              </h3>
                              {notification.is_pinned && (
                                <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                                  <Pin className="w-3 h-3" />
                                  Pinned
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                              {notification.message}
                            </p>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() =>
                              handleDeleteNotification(notification.id)
                            }
                            disabled={deletingId === notification.id}
                            className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                            title="Delete notification"
                          >
                            {deletingId === notification.id ? (
                              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(notification.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Expires in {notification.expires_in}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GivNotificaTHR