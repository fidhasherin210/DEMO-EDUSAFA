import React, { useState, useRef, useEffect } from 'react'
import { Calendar, Clock, X } from 'lucide-react'

function Events() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const scrollContainerRef = useRef(null)

  // Sample upcoming events data for 2026
  const sampleEvents = [
   
    {
      id: 1,
      event: "Parent-Teacher Meeting",
      date: "2026-04-20",
      time: "10:00 AM - 2:00 PM",
      description: "Quarterly parent-teacher meeting to discuss student progress, academic performance, and overall development. Please bring your child's report card and be prepared to discuss their progress.",
      location: "School Auditorium",
      posters: "https://www.aljumuah.com/wp-content/uploads/2022/05/The-Role-of-Parents-in-Training-Their-Children-1.jpg"
    },
    {
      id: 2,
      event: "Science Exhibition 2026",
      date: "2026-04-25",
      time: "11:00 AM - 3:00 PM",
      description: "Students from grades 6-10 will showcase their innovative science projects and experiments. A great opportunity to explore the wonders of science through student demonstrations.",
      location: "Science Block, School Campus",
      posters: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      event: "Cultural Fest 2026",
      date: "2026-04-28",
      time: "5:00 PM - 8:00 PM",
      description: "Annual cultural festival featuring dance, music, and drama performances by students. Come celebrate the rich cultural diversity through various performances and art exhibitions.",
      location: "School Auditorium",
      posters: "https://images.unsplash.com/photo-1698967406711-ede239b6c07e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
   
    {
      id: 4,
      event: "Summer Vacation Begins",
      date: "2026-05-10",
      time: "All Day",
      description: "School closes for summer break. The last day of school will be May 9th. School reopens on June 1st. Have a wonderful and safe summer vacation!",
      location: "School Campus",
      posters: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      event: "Book Fair 2026",
      date: "2026-04-18",
      time: "9:00 AM - 4:00 PM",
      description: "Annual book fair featuring a wide selection of books from various publishers. Special discounts for students and parents. Reading challenges and storytelling sessions also planned.",
      location: "School Library",
      posters: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop"
    },
   
    {
      id: 6,
      event: "Ramadan Celebration",
      date: "2026-03-10",
      time: "2:00 PM - 5:00 PM",
      description: "Special Ramadan celebration with iftar gathering, Quran recitation, and Islamic cultural activities. All students and parents are welcome to join.",
      location: "School Mosque & Auditorium",
      posters: "https://images.unsplash.com/photo-1612176894219-8493bf9b9b1c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 7,
      event: "Eid-ul-Fitr Celebration",
      date: "2026-03-25",
      time: "9:00 AM - 12:00 PM",
      description: "Eid celebration with special prayers, cultural programs, and festive activities. Students are encouraged to wear traditional attire.",
      location: "School Main Ground",
      posters: "https://plus.unsplash.com/premium_photo-1770455065741-2f643f2b1b97?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
   
  ]

  // Initialize events with sample data
  useEffect(() => {
    setEvents(sampleEvents)
  }, [])

  // Format current date
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  })

  const handleViewDetails = (event) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
  }

  const getImageUrl = (url) => url

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 mt-4 ms-3">
            <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
            <div className="">
              <h3 className="text-xs md:text-base font-semibold text-gray-700">
                Upcoming Events
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
        <div className="">
          <p className="mt-4 font-bold bg-gradient-to-r from-blue-600 to-sky-500 rounded-t-xl px-1 py-3 mb-4 md:mb-1 text-xs text-white shadow-xl text-center md:text-lg">
            Stay updated with events and notices
          </p>
          {events.length > 0 ? (
            <div 
              ref={scrollContainerRef}
              className="grid grid-cols-1 md:grid-cols-1 gap-2 p-1 max-h-[335px] overflow-y-auto scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer flex items-start gap-3 p-3"
                  onClick={() => handleViewDetails(event)}
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100">
                    <img
                      src={getImageUrl(event.posters)}
                      alt={event.event}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                      {event.event}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500">
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-400 mt-2 line-clamp-1">
                      Click to view details
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No upcoming events.</p>
          )}
        </div>
      </div>

      {/* Modern Modal Design */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div 
            className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Moved outside image for better visibility */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-20 group border border-white/40"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Two Column Layout for larger screens */}
            <div className="flex flex-col md:flex-row">
              {/* Image Section - Full size, no crop */}
              <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
                <img
                  src={getImageUrl(selectedEvent.posters)}
                  alt={selectedEvent.event}
                  className="w-full h-auto object-contain rounded-lg shadow-lg max-h-[50vh] md:max-h-[70vh]"
                />
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 p-6 sm:p-8 bg-white dark:bg-gray-900 flex flex-col">
                {/* Event Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedEvent.event}
                </h3>

                {/* Date & Time with better alignment */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs md:text-lg text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-medium text-xs md:text-lg">{selectedEvent.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs md:text-lg text-gray-500 dark:text-gray-400">Time</p>
                      <p className="font-medium text-xs md:text-lg">{selectedEvent.time}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Optional Location (if available) */}
                {selectedEvent.location && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="font-medium text-gray-700 dark:text-gray-200">{selectedEvent.location}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Events