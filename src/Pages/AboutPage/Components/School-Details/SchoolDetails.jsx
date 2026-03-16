import React, { useState, useEffect } from 'react'
import {
  Users,
  ArrowRight,
} from 'lucide-react'
import logo from "/src/assets/Edusafa2.png";



// Sample school data
const sampleSchool = {
  name: "Qurrathul Ain",
  sub_name: "Higher Secondary Madrasa",
  educational_board: "Demo Educational Board",
  logo: logo,
  image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=800&fit=crop",
  history: `Founded in 1985, Innovision Academy has been at the forefront of educational excellence for over three decades. What began as a small initiative with just 50 students has now blossomed into one of the most prestigious educational institutions in the region, nurturing over 2,000 young minds annually.

Our journey began with a simple yet powerful vision: to create an educational ecosystem that doesn't just impart knowledge but inspires innovation, critical thinking, and holistic development. Dr. Sarah Mitchell, our founder, envisioned a school where traditional values meet modern pedagogy, creating an environment where every child can discover their unique potential.

Throughout the 1990s, we expanded our infrastructure, adding state-of-the-art science laboratories, a comprehensive library, and dedicated spaces for arts and sports. The new millennium brought digital transformation to our classrooms, making us one of the first schools in the region to integrate technology seamlessly into education.

The 2010s marked our international expansion, with exchange programs established in 15 countries and our students consistently achieving top ranks in national and international Olympiads. Our alumni have gone on to become leaders in various fields - from technology innovators at Silicon Valley to renowned artists, from research scientists to social entrepreneurs.

Today, Innovision Academy stands as a beacon of educational excellence, recognized with numerous awards including the National Educational Excellence Award (2022) and the Global Innovation in Education Award (2023). Our commitment to nurturing well-rounded individuals who are ready to face the challenges of tomorrow remains stronger than ever.

As we look to the future, we're excited about our upcoming Center for Innovation and Research, a state-of-the-art facility that will house robotics labs, AI research centers, and sustainable technology workshops. Because at Innovision Academy, we believe that education is not just about preparing for tests - it's about preparing for life.`
}

function SchoolDetails() {
  const [showFullHistory, setShowFullHistory] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleHistory = () => setShowFullHistory(!showFullHistory)

  const historyText = sampleSchool?.history || ''
  const truncatedHistory = historyText.length > 300 ? historyText.slice(0, 300) + '...' : historyText

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Glassmorphism Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-base font-bold md:text-xl bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                  {sampleSchool.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Ultra-Modern Hero */}
      <section className="mt-4 relative min-h-screen flex items-center justify-center pt-10">
        <div className="relative z-10 max-w-7xl mx-auto px-3 text-center">
          {/* Main Logo */}
          <div className="relative mb-2 mt-2 flex justify-center">
            <div className="relative w-fit">
              {/* Blur Background */}
              <div className="absolute inset-0 bg-white rounded-2xl blur-lg"></div>

              {/* Glass Box */}
              <div className="relative bg-white rounded-2xl p-2 border border-white/20 mb-3">
                {sampleSchool?.logo ? (
                  <img
                    src={sampleSchool.logo}
                    alt="School Logo"
                    className="w-[160px] md:w-[220px] h-auto"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-[160px] md:w-[220px] h-[80px] md:h-[100px] flex items-center justify-center text-sm md:text-base font-semibold text-gray-500">
                    School Logo
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Glitch-style title */}
          <div className="mb-5 relative">
            <h1 className="text-xl md:text-5xl font-black leading-none mb-2">
              <span className="block text-white">{sampleSchool.name}</span>
            </h1>

            {/* Subtitle with typewriter effect */}
            <div className="relative">
              <h2 className="text-sm md:text-2xl font-bold text-gray-300 mb-2 opacity-80">
                {sampleSchool.sub_name}
              </h2>
            </div>
          </div>

          {/* Floating badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-12 hover:bg-white/10 transition-colors">
            <span className="text-white text-xs font-medium">
              {sampleSchool.educational_board}
            </span>
          </div>

          {/* Call to action */}
          <p className="text-xm md:text-4xl text-gray-300 mb-16 leading-relaxed font-light">
            Where{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent font-bold">
                Innovation
              </span>
            </span>{' '}
            meets{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                Excellence
              </span>
            </span>
          </p>

          <button
            onClick={() => window.scrollBy({ top: 800, behavior: 'smooth' })}
            className="group relative inline-flex items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-white shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 transform hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">Explore Universe</span>
            <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* IMAGE + HISTORY SECTION */}
      <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* IMAGE CARD */}
          <div className="group relative h-full">
            <div className=""></div>

            <div className="relative h-full bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800 overflow-hidden">
              <div className="relative h-full">
                <img
                  src={sampleSchool.image}
                  alt="School Campus"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/80 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Campus</h3>
                    <p className="text-xs text-gray-300">
                      Where memories are made
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HISTORY CARD */}
          <div className="relative h-full">
            <div className="absolute -inset-8 "></div>

            <div className="relative h-full bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-gray-800 shadow-2xl flex flex-col justify-center">
              <div className="text-gray-300 text-sm md:text-lg leading-relaxed font-light">
                <span className=" text-base md:text-xl text-purple-300 font-medium">
                  History
                </span>
                {/* Smooth Expand Container */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    showFullHistory
                      ? 'max-h-[2000px] opacity-100'
                      : 'max-h-[220px] md:max-h-[260px] opacity-95'
                  }`}
                  style={{ transitionProperty: 'max-height, opacity' }}
                >
                  <p>{sampleSchool.history}</p>
                </div>

                {historyText.length > 300 && (
                  <button
                    onClick={toggleHistory}
                    className="text-xs md:text-sm mt-6 text-purple-400 hover:text-pink-400 font-semibold transition-all duration-300 hover:tracking-wide"
                  >
                    {showFullHistory ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolDetails