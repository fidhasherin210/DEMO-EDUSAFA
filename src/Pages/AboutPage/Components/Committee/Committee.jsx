import React, { useState } from 'react'
import {
  Crown,
  MapPin,
  Phone,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

function Committee() {
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Sample committee data
  const committee = [
 {
    name: "Yusuf Ali",
    position: "Chairperson",
    place: "New York, USA",
    number: "+1 (555) 123-4567",
    image: "https://plus.unsplash.com/premium_photo-1726863202242-a5f18a2ae44f?q=80&w=1017&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Ibrahim Khalid",
    position: "Vice Chairperson",
    place: "Singapore",
    number: "+65 9123 4567",
    image: "https://plus.unsplash.com/premium_photo-1770674918463-685eafd1e6b5?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: " Saeed Rahman",
    position: "Secretary",
    place: "London, UK",
    number: "+44 20 7946 0123",
    image: "https://images.unsplash.com/photo-1645864833809-39c64b85e65d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Tariq Mahmood",
    position: "Treasurer",
    place: "Toronto, Canada",
    number: "+1 (416) 555-7890",
    image: "https://images.unsplash.com/photo-1641106269337-2a0a3a8e73f3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Omar Abdullah",
    position: "Executive Member",
    place: "Mumbai, India",
    number: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1627091908405-30bd51eec537?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  
  ]

  const scroll = (direction) => {
    const container = document.getElementById('committee-scroll-container')
    if (container) {
      const scrollAmount = direction === 'left' ? -320 : 320
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleScroll = (e) => {
    const container = e.target
    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10,
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10 px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20 mb-4">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-yellow-300 font-medium">
              EXECUTIVE LEADERSHIP
            </span>
          </div>

          <h1 className="text-xl md:text-2xl lg:text-3xl font-black mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Our Leaders
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Visionary leaders guiding excellence with wisdom and dedication
          </p>
        </div>
      </div>

      {/* Committee Grid */}
      <div className="md:mt-8 relative z-10 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {committee.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-400 text-sm animate-pulse">
                Committee list will be updated soon...
              </p>
            </div>
          ) : (
            <>
              {/* Mobile Scroll Indicators */}
              <div className="relative md:hidden">
                {/* Left Arrow */}
                {showLeftArrow && (
                  <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-600/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                  <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-yellow-600/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Scroll Indicator Dots */}
                <div className="flex justify-center gap-1.5 mb-3 md:hidden">
                  {committee.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-gray-600 data-[active=true]:bg-yellow-400 transition-colors"
                      data-active={idx === 0 ? 'true' : 'false'}
                    />
                  ))}
                </div>
              </div>

              {/* Grid/Scroll Container */}
              <div
                id="committee-scroll-container"
                className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
                onScroll={handleScroll}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {committee.map((member, index) => (
                  <div
                    key={index}
                    className="group relative flex-shrink-0 w-[85vw] sm:w-80 md:w-auto snap-center md:snap-none"
                  >
                    {/* Glow Border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>

                    {/* Main Card */}
                    <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 group-hover:border-yellow-500/50 transition-all duration-300 overflow-hidden h-full">
                      {/* Card Header with Pattern */}
                      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-yellow-500/10 to-transparent"></div>

                      {/* Decorative Elements */}
                      <div className="absolute top-3 right-3 flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 rounded-full bg-yellow-400/30"
                          ></div>
                        ))}
                      </div>

                      {/* Leadership Badge */}
                      <div className="absolute top-3 left-3 flex items-center">
                        <div className="bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/30 flex items-center justify-center">
                          <span className="text-[10px] font-medium text-yellow-300 leading-none">
                            LEADER
                          </span>
                        </div>
                      </div>

                      {/* Image Section */}
                      <div className="relative pt-8 px-4 pb-2">
                        <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28">
                          {/* Animated Ring */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse opacity-20"></div>

                          {/* Image Container */}
                          <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-yellow-500/30 group-hover:ring-yellow-500/60 transition-all duration-300">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          {/* Crown Icon for Top Leaders */}
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center ring-2 ring-gray-900">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-4 pb-4">
                        {/* Name and Position */}
                        <div className="text-center mb-3">
                          <h3 className="text-base md:text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            {member.name}
                          </h3>
                          <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-yellow-500/10 rounded-full">
                            <Award className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-gray-300">
                              {member.position}
                            </span>
                          </div>
                        </div>

                        {/* Info Cards */}
                        <div className="space-y-1.5 mb-3">
                          <div className="bg-gray-800/40 rounded-lg p-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                              <span className="text-xs text-white truncate">
                                {member.place}
                              </span>
                            </div>
                          </div>

                          <div className="bg-gray-800/40 rounded-lg p-2">
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-blue-400 flex-shrink-0" />
                              <span className="text-xs text-white truncate">
                                {member.number}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Contact Button */}
                        <button className="w-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1 border border-yellow-500/20">
                          <Users className="w-3 h-3" />
                          Contact Leader
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Hint for Mobile */}
              <div className="flex justify-center mt-2 md:hidden">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ChevronLeft className="w-3 h-3" />
                  <span>Swipe to see more leaders</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Committee