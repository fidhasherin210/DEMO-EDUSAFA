import React, { useState } from "react";
import {
  MapPin,
  Phone,
  GraduationCap,
  BookOpen,
  Star,
  Award,
  Mail,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// Sample teachers data - all male teachers
const sampleTeachers = [
    {
    name: " Yusuf Ahmed",
    place: "Kozhikode",
    phone_no: "+60 12 678 9012",
    islamic_qualification: "PhD in Hadith Studies - International Islamic University",
    academic_qualification: "M.Sc in Mathematics",
    image: "https://image.made-in-china.com/202f0j00KeLiuPDRgrzm/Muslim-Arabic-Dubai-Saudi-Arabia-Men-Turban.webp"
  },
 
  {
    name: "Hafiz Abdullah ",
    place: "Malappuram",
    phone_no: "+92 300 345 6789",
    islamic_qualification: "Hafiz-ul-Quran, Sanad in Tajweed",
    academic_qualification: "M.Sc in Computer Science",
    image: "https://static.vecteezy.com/system/resources/thumbnails/070/246/232/small/muslim-man-in-white-shirt-and-hat-with-hands-outstretched-photo.JPG"
  },
 
  {
    name: "Hassan Ali",
    place: "Malappuram",
    phone_no: "+90 533 567 8901",
    islamic_qualification: "Ijazah in Qira'at, Advanced Tafsir",
    academic_qualification: "BA in History",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3Jhd3BpeGVsb2ZmaWNlMTJfbXVzbGltX21hbl91c2luZ19pcGFkX2xvb2tfYXRfY2FtZXJhX2hhcHB5X2lzb18xNjJmNWE0Yy1hZjJjLTQzMDQtYTQ4MC1hYjI2YzcwZGM0ZGEucG5n.png"
  },

];

function Teachers() {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    const container = document.getElementById('teacher-scroll-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = (e) => {
    const container = e.target;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  return (
    <div className=" bg-black text-white relative overflow-hidden">
      {/* Hero Section with Stats */}
      <div className="relative z-10 px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 mb-4">
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-300 font-medium">ELITE EDUCATORS</span>
            </div>
            
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Our Teachers
              </span>
            </h1>
            
            <p className="text-xs md:text-base text-gray-400 max-w-2xl mx-auto">
              Dedicated mentors shaping the future with knowledge, wisdom, and Islamic values
            </p>
          </div>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="relative z-10 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {sampleTeachers.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 text-sm">
                Loading teachers...
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
                  {sampleTeachers.map((_, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-gray-600 data-[active=true]:bg-purple-400 transition-colors"
                      data-active={idx === 0 ? "true" : "false"}
                    />
                  ))}
                </div>
              </div>

              {/* Grid/Scroll Container */}
              <div 
                id="teacher-scroll-container"
                className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
                onScroll={handleScroll}
                style={{ 
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {sampleTeachers.map((teacher, index) => (
                  <div
                    key={index}
                    className="group relative flex-shrink-0 w-[85vw] sm:w-80 md:w-auto snap-center md:snap-none"
                  >
                    {/* Holographic Border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>

                    {/* Main Card */}
                    <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300 overflow-hidden h-full">
                      
                      {/* Card Header with Pattern */}
                      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-purple-500/10 to-transparent"></div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-3 right-3 flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-1 h-1 rounded-full bg-purple-400/30"></div>
                        ))}
                      </div>

                      {/* Image Section */}
                      <div className="relative pt-6 px-4 pb-2">
                        <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28">
                          {/* Animated Ring */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse opacity-20"></div>
                          
                          {/* Image Container */}
                          <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-purple-500/30 group-hover:ring-purple-500/60 transition-all duration-300">
                            <img
                              src={teacher.image}
                              alt={teacher.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          
                          {/* Online Status Indicator */}
                          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-gray-900"></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-4 pb-4">
                        {/* Name and Badge */}
                        <div className="text-center mb-3">
                          <h3 className="text-base md:text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {teacher.name}
                          </h3>
                          <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-purple-500/10 rounded-full">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs text-gray-300">Teacher</span>
                          </div>
                        </div>

                        {/* Info Cards - Compact Grid */}
                        <div className="grid grid-cols-2 gap-1.5 mb-3">
                          <div className="bg-gray-800/40 rounded-lg p-2">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-purple-400" />
                              <span className="text-xs text-white truncate">{teacher.place}</span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-800/40 rounded-lg p-2">
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-blue-400" />
                              <span className="text-xs text-white truncate">{teacher.phone_no}</span>
                            </div>
                          </div>
                        </div>

                        {/* Qualifications */}
                        <div className="space-y-1.5 mb-3">
                          <div className="bg-gray-800/40 rounded-lg p-2">
                            <div className="flex items-start gap-2">
                              <BookOpen className="w-3 h-3 mt-0.5 text-green-400 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <span className="text-xs text-gray-400 block">Islamic Qualification :</span>
                                <span className="mt-1 text-[12px] md:text-xs text-white block truncate">
                                  {teacher.islamic_qualification}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-800/40 rounded-lg p-2">
                            <div className="flex items-start gap-2">
                              <GraduationCap className="w-3 h-3 mt-0.5 text-yellow-400 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <span className="text-xs text-gray-400 block">Academic Qualification :</span>
                                <span className="mt-1 text-[12px] md:text-xs text-white block truncate">
                                  {teacher.academic_qualification}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button className="flex-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1 border border-purple-500/20">
                            <Mail className="w-3 h-3" />
                            Message
                          </button>
                          <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                            View Profile
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
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
    </div>
  );
}

export default Teachers;