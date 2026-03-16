import React, { useState } from 'react'
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react'

// Sample gallery data
const sampleGallery = [
  {
    id: 1,
    title: "Annual Sports Day 2024",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Science Exhibition",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Graduation Ceremony",
    image: "https://images.unsplash.com/photo-1625999874116-dba9a603fa24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    title: "Cultural Fest 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Library Session",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "Art Competition",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop"
  },
 {
  id: 7,
  title: "Ziyarath Program",
  image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop"
},
  {
    id: 8,
    title: "Computer Lab",
    image: "https://images.unsplash.com/photo-1594182878770-c05ece34b1f2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const closeModal = () => {
    setSelectedImage(null)
  }

  const openModal = (item, index) => {
    setSelectedImage(item)
    setCurrentIndex(index)
  }

  const nextImage = (e) => {
    e.stopPropagation()
    if (currentIndex < sampleGallery.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setSelectedImage(sampleGallery[newIndex])
    }
  }

  const prevImage = (e) => {
    e.stopPropagation()
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setSelectedImage(sampleGallery[newIndex])
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header Section */}
      <div className="relative z-10 pt-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 mb-4">
            <Camera className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-300 font-medium">
              CAPTURED MOMENTS
            </span>
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black mb-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>

          <div className="relative">
            <p className="mb-3 text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
              Capturing Memories & Celebrating Achievements
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Dots */}
      <div className="flex justify-center gap-1.5 mb-3 md:hidden">
        {sampleGallery.map((_, idx) => (
          <div
            key={idx}
            className="w-1.5 h-1.5 rounded-full bg-gray-600 data-[active=true]:bg-purple-400 transition-colors"
            data-active={idx === 0 ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="relative px-2 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto">
            <div className="grid grid-rows-2 grid-flow-col gap-2 sm:gap-3">
              {sampleGallery.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer border border-white/60 w-36 sm:w-44 flex-shrink-0"
                  onClick={() => openModal(item, index)}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animation: 'fadeInUp 0.5s ease-out forwards',
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Title */}
                  <div className="p-1.5">
                    <h3 className="text-xs font-semibold text-slate-800 text-center truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {sampleGallery.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full mb-8 shadow-2xl shadow-purple-500/50 animate-pulse mx-auto">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="md:text-3xl text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            No Images Yet
          </h3>
          <p className="text-gray-400 text-xs">
            Check back soon for new gallery updates!
          </p>
        </div>
      )}

      {/* Enhanced Modal with Navigation */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          {/* Main modal container */}
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            
            {/* Close button - smaller on mobile */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 text-white/80 hover:text-white bg-black/30 rounded-full p-2 backdrop-blur-sm"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Navigation buttons - only show if more than one image */}
            {sampleGallery.length > 1 && (
              <>
                {/* Previous button - hide on smallest screens if at first image */}
                {currentIndex > 0 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 z-50 text-white/80 hover:text-white bg-black/30 rounded-full p-2 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
                
                {/* Next button - hide on smallest screens if at last image */}
                {currentIndex < sampleGallery.length - 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 z-50 text-white/80 hover:text-white bg-black/30 rounded-full p-2 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
              </>
            )}

            {/* Image counter - smaller on mobile */}
            <div className="absolute top-4 left-4 z-50 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full text-xs sm:text-sm text-white/80">
              {currentIndex + 1} / {sampleGallery.length}
            </div>

            {/* Image container */}
            <div className="relative max-w-4xl w-full h-full flex items-center justify-center p-4">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Title - smaller on mobile */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
              <div className="text-center">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1">
                  {selectedImage.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300">
                  School Event • {currentIndex + 1} of {sampleGallery.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Gallery