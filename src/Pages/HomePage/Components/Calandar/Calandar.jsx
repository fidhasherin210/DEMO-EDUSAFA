import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react'

function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [selectedEvents, setSelectedEvents] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)

  // Get current date for display
  const today = new Date()
  const formattedCurrentDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  // Sample events data with current and future dates
  const sampleEvents = [
    {
      id: 1,
      event: "Annual Sports Day",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toISOString().split('T')[0],
      time: "9:00 AM - 4:00 PM",
      description: "Annual sports day competition with various athletic events including running, jumping, and team sports. All parents are cordially invited to cheer for their children.",
      location: "School Main Ground",
      posters: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      event: "Parent-Teacher Meeting",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8).toISOString().split('T')[0],
      time: "10:00 AM - 2:00 PM",
      description: "Quarterly parent-teacher meeting to discuss student progress and development. Please bring your child's report card and be prepared to discuss their progress.",
      location: "School Auditorium",
      posters: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      event: "Science Exhibition",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12).toISOString().split('T')[0],
      time: "11:00 AM - 3:00 PM",
      description: "Students from grades 6-10 will showcase their innovative science projects and experiments. A great opportunity to explore the wonders of science.",
      location: "Science Block",
      posters: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      event: "Cultural Fest 2025",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15).toISOString().split('T')[0],
      time: "5:00 PM - 8:00 PM",
      description: "Annual cultural festival featuring dance, music, and drama performances by students. Come celebrate the rich cultural diversity through various performances.",
      location: "School Auditorium",
      posters: "https://images.unsplash.com/photo-1698967406711-ede239b6c07e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 5,
      event: "Educational Field Trip",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 18).toISOString().split('T')[0],
      time: "8:00 AM - 5:00 PM",
      description: "Field trip to the Science Museum for grades 6-8. Students will explore interactive exhibits and learn about scientific concepts through hands-on experiences.",
      location: "City Science Museum",
      posters: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      event: "Summer Vacation Begins",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 25).toISOString().split('T')[0],
      time: "All Day",
      description: "School closes for summer break. The last day of school will be " + 
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 24).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
        }) + 
        ". School reopens on " + 
        new Date(today.getFullYear(), today.getMonth() + 2, 1).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
        }) + 
        ". Have a wonderful and safe summer vacation!",
      location: "School Campus",
      posters: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop"
    },
    {
      id: 7,
      event: "Book Fair",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).toISOString().split('T')[0],
      time: "9:00 AM - 4:00 PM",
      description: "Annual book fair featuring a wide selection of books from various publishers. Special discounts for students and parents. Reading challenges and storytelling sessions also planned.",
      location: "School Library",
      posters: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop"
    },
    {
      id: 8,
      event: "Career Counseling Session",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10).toISOString().split('T')[0],
      time: "2:00 PM - 4:00 PM",
      description: "Career counseling session for grade 10 and 12 students. Expert counselors will discuss various career paths, college admissions, and future opportunities.",
      location: "Conference Hall",
      posters: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop"
    }
  ]

  // Initialize events with sample data
  useState(() => {
    setEvents(sampleEvents)
  }, [])

  const getImageUrl = (url) => url

  const eventMap = events.reduce((map, ev) => {
    const dateKey = new Date(ev.date).toDateString()
    if (!map[dateKey]) map[dateKey] = []
    map[dateKey].push(ev)
    return map
  }, {})

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    )
    setSelectedDate(clickedDate)

    const dateKey = clickedDate.toDateString()
    if (eventMap[dateKey]) {
      setSelectedEvents(eventMap[dateKey])
    }
  }

  const closeModal = () => setSelectedEvents([])

  const isToday = (day) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    )
  }

  const isSelected = (day) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    )
  }

  const hasEvents = (day) => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    )
    return eventMap[checkDate.toDateString()]
  }

  const getEventCount = (day) => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    )
    const events = eventMap[checkDate.toDateString()]
    return events ? events.length : 0
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 md:h-10 w-full"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day)
      const isSelectedDay = isSelected(day)
      const hasEvent = hasEvents(day)

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
  group relative h-8 md:h-10 w-full rounded-md font-medium
  transition-all duration-200
  flex flex-col items-center justify-center
  ${
    isCurrentDay
      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm'
      : isSelectedDay
      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-sm'
      : hasEvent
      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm'
      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
  }
`}
        >
          <span className="text-xs md:text-sm font-bold">{day}</span>

          {hasEvent && (
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-emerald-400 rounded-full"></div>
          )}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2  mt-4 ms-3">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div className="">
            <h3 className="text-xs md:text-base font-semibold text-gray-700">
              Events Calendar
            </h3>
            <p className="text-[9px] md:text-[10px] text-gray-400">
              {formattedCurrentDate}
            </p>
          </div>
        </div>

        <span className="me-3 text-[8px] md:text-[14px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium border border-green-200">
          Live
        </span>
      </div>
      <div
        className={`
        transition-all duration-500 ease-in-out
        ${isExpanded ? 'fixed inset-4 z-40' : 'relative'}
      `}
      >
        <div
          className={`
          bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden
          ${isExpanded ? 'h-full overflow-auto' : ''}
        `}
        >
          {/* Calendar Header */}
          <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
              >
                <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </button>

              <div className="text-center">
                <h2 className="text-sm md:text-base font-bold text-white">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
              </div>

              <button
                onClick={() => navigateMonth(1)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
              >
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Calendar Body */}
          <div className="p-2">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-0.5 mb-2">
              {weekdays.map((day, index) => (
                <div
                  key={day}
                  className={`
                    text-center py-1 text-xs font-medium
                    ${
                      index === 0 || index === 6
                        ? 'text-rose-500'
                        : 'text-gray-500'
                    }
                  `}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>

            {/* Legend */}
            <div className="mt-5 flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full"></div>
                <span className="text-xs text-gray-600">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></div>
                <span className="text-xs text-gray-600">Has Events</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Modal */}
      {selectedEvents.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-4 sticky top-0 z-20">
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-semibold text-white tracking-wide">
                  Events on{' '}
                  {selectedDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </h3>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable Area */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] bg-gray-50 dark:bg-gray-900 p-3 md:p-6">
              <div className="space-y-4">
                {selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Two Column Layout for each event */}
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section - Left side on desktop */}
                      <div className="md:w-4/7 bg-gray-50 dark:bg-gray-900 p-3 flex items-center justify-center">
                        <img
                          src={getImageUrl(event.posters)}
                          alt={event.event}
                          className="w-full h-auto object-contain max-h-[250px] md:max-h-[250px] rounded-lg"
                        />
                      </div>

                      {/* Content Section - Right side on desktop */}
                      <div className="md:w-3/5 p-4 md:p-5 flex flex-col">
                        {/* Event Title */}
                        <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-3">
                          {event.event || 'Event'}
                        </h4>

                        {/* Date & Time with modern alignment */}
                        <div className="space-y-2 mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                              <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200">
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                              <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200">{event.time || 'Time'}</p>
                            </div>
                          </div>
                        </div>

                        {/* Description (if available) */}
                        {event.description && (
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-2">
                            {event.description}
                          </p>
                        )}

                        {/* Location (if available) */}
                        {event.location && (
                          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                                <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200">{event.location}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsCalendar