import React, { useState } from 'react'
import {
  Heart,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Sample memorial data
const sampleMemorials = [
  {
    id: 1,
    name: "അബ്ദുൽ റഹ്മാൻ മുസ്ലിയാർ",
    place: "കൊണ്ടോട്ടി, മലപ്പുറം",
    date_of_death: "15 റമദാൻ 1445 • 25 മാർച്ച് 2024",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "ഫാത്തിമ ബീവി",
    place: "തിരൂരങ്ങാടി, മലപ്പുറം",
    date_of_death: "10 ശവ്വാൽ 1444 • 1 മേയ് 2023",
    image: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "അഹ്മദ് കുട്ടി മൗലവി",
    place: "പൊന്നാനി, മലപ്പുറം",
    date_of_death: "5 മുഹറം 1445 • 24 ജൂലൈ 2023",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "ആയിശ ഉമ്മ",
    place: "വേങ്ങര, മലപ്പുറം",
    date_of_death: "20 റജബ് 1444 • 11 ഫെബ്രുവരി 2023",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    name: "മുഹമ്മദ് കോയ തങ്ങൾ",
    place: "താനൂർ, മലപ്പുറം",
    date_of_death: "2 ശഅബാൻ 1445 • 12 ഫെബ്രുവരി 2024",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    name: "ഖദീജ ഹജ്ജുമ്മ",
    place: "പരപ്പനങ്ങാടി, മലപ്പുറം",
    date_of_death: "18 റമദാൻ 1444 • 8 ഏപ്രിൽ 2023",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop"
  }
]


function MemorialPage() {
  const [selected, setSelected] = useState(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction) => {
    const container = document.getElementById('memorial-scroll-container')
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
      {/* Header Section */}
      <div className="relative z-10 px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 mb-4">
            <Heart className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-300 font-medium">
              IN LOVING MEMORY
            </span>
          </div>

          <h1 className="text-xl md:text-3xl font-black mb-2">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              നമ്മിൽ നിന്നും മറഞ്ഞുപോയവർ
            </span>
          </h1>
        </div>
      </div>

      {/* Memorial Grid */}
      <div className="relative z-10 px-4 pb-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {sampleMemorials.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full mb-8 shadow-2xl shadow-purple-500/50 animate-pulse mx-auto">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="md:text-3xl text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                No Memories Yet
              </h3>
              <p className="text-gray-400 text-xs">
                Check back soon for updates
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
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-purple-600/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-purple-600 transition-colors"
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                  <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-purple-600/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-purple-600 transition-colors"
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Scroll Indicator Dots */}
                <div className="flex justify-center gap-1.5 mb-3 md:hidden">
                  {sampleMemorials.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-gray-600 data-[active=true]:bg-purple-400 transition-colors"
                      data-active={idx === 0 ? 'true' : 'false'}
                    />
                  ))}
                </div>
              </div>

              {/* Grid/Scroll Container */}
              <div
                id="memorial-scroll-container"
                className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
                onScroll={handleScroll}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {sampleMemorials.map((memorial, index) => (
                  <div
                    key={memorial.id}
                    className="group relative flex-shrink-0 w-[85vw] sm:w-80 md:w-auto snap-center md:snap-none"
                    onClick={() => setSelected(memorial)}
                  >
                    {/* Holographic Border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>

                    {/* Main Card */}
                    <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                      {/* Card Header with Pattern */}
                      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-purple-500/10 to-transparent"></div>

                      {/* Decorative Elements */}
                      <div className="absolute top-3 right-3 flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 rounded-full bg-purple-400/30"
                          ></div>
                        ))}
                      </div>

                      {/* Memorial Badge */}
                      <div className="absolute top-3 left-3">
                        <div className="bg-purple-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-500/30 flex items-center justify-center">
                          <span className="text-[10px] font-medium text-purple-300 leading-none whitespace-nowrap">
                            IN LOVING MEMORY
                          </span>
                        </div>
                      </div>

                      {/* Image Section */}
                      <div className="relative pt-8 px-4 pb-2">
                        <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28">
                          {/* Animated Ring */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse opacity-20"></div>

                          {/* Image Container */}
                          <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-purple-500/30 group-hover:ring-purple-500/60 transition-all duration-300">
                            <img
                              src={memorial.image}
                              alt={memorial.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          {/* Heart Icon */}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center ring-2 ring-gray-900">
                            <Heart className="w-3 h-3 text-white fill-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-4 pb-4">
                        {/* Name */}
                        <div className="text-center mb-3">
                          <h3 className="text-base md:text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {memorial.name}
                          </h3>
                        </div>

                        {/* Info Cards */}
                        <div className="space-y-1.5 mb-3">
                          <div className="bg-gray-800/40 rounded-lg p-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-white truncate">
                                {memorial.place}
                              </span>
                            </div>
                          </div>

                          {memorial.date_of_death && (
                            <div className="bg-gray-800/40 rounded-lg p-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-blue-400 flex-shrink-0" />
                                <span className="text-xs text-white truncate">
                                  {memorial.date_of_death}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* View Button */}
                        <button className="w-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1 border border-purple-500/20">
                          <Heart className="w-3 h-3" />
                          View Memory
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
                  <span>Swipe to see more</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 text-white hover:text-purple-400 transition-colors z-10"
            >
              <svg
                className="w-8 h-8"
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

            {/* Holographic Border for Modal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-60"></div>

            <div
              className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full max-h-[70vh] object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              <div className="p-2 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm">
                <div className="text-center">
                  <h2 className="text-sm md:text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-1">
                    {selected.name}
                  </h2>
                  <div className="space-y-1">
                    <p className="text-gray-300 text-xs md:text-sm">{selected.place}</p>
                    {selected.date_of_death && (
                      <p className="text-gray-400 text-sm">
                        {selected.date_of_death}
                      </p>
                    )}
                  </div>

                  {/* Decorative Bottom */}
                  <div className="mt-3 mb-3 flex justify-center">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Decorative Section */}
      <div className="relative z-10 ">
        <div className="text-center ">
          <p className="text-gray-400 italic max-w-2xl mx-auto text-sm md:text-base">
            &quot;അല്ലാഹു അവർക്കു പൊറുത്തു കൊടുക്കുകയും എല്ലാവരെയും സ്വർഗ്ഗത്തിൽ
            ഒരുമിപ്പിക്കുകയും ചെയ്യട്ടെ. 🤲 ആമീൻ.&quot;
          </p>
        </div>
      </div>
    </div>
  )
}

export default MemorialPage