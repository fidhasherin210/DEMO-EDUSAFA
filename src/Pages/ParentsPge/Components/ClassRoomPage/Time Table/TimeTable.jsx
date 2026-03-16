import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import {
  Clock,
  BookOpen,
  GraduationCap,
  CalendarDays,
  X,
  Download,
  ZoomIn,
  FileText,
  Trophy,
} from 'lucide-react'

function TimeTable() {
  const [timetableData, setTimetableData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState('regular')
  const { studentId } = useParams()

  // Sample timetable data for different students/classes
  const sampleTimetables = {
    // Class 5 Timetables
    101: {
      class: "5 A",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    102: {
      class: "5 A",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    // Class 5 B
    201: {
      class: "5 B",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    202: {
      class: "5 B",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    // Class 6 A
    301: {
      class: "6 A",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    302: {
      class: "6 A",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    303: {
      class: "6 A",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    // Class 6 B
    401: {
      class: "6 B",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    402: {
      class: "6 B",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    // Class 7 A
    501: {
      class: "7 A",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    502: {
      class: "7 A",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    // Class 7 B (No exam timetable to test fallback)
    601: {
      class: "7 B",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      // exam_timetable intentionally missing
    },
    602: {
      class: "7 B",
      timetable: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      // exam_timetable intentionally missing
    },
    // Class 8 A (No regular timetable to test fallback)
    701: {
      class: "8 A",
      // timetable intentionally missing
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    702: {
      class: "8 A",
      // timetable intentionally missing
      exam_timetable: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  }

  useEffect(() => {
    if (studentId) {
      fetchTimeTable(studentId)
    }
  }, [studentId])

  const fetchTimeTable = async (studentId) => {
    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const data = sampleTimetables[studentId] || null
      setTimetableData(data)
      setLoading(false)
    }, 800)
  }

  const getImageUrl = (url) => url

  const handleImageClick = () => {
    setIsImageZoomed(true)
  }

  const closeZoom = () => {
    setIsImageZoomed(false)
  }

  const handleDownload = async () => {
    const imageUrl = activeTab === 'regular' 
      ? timetableData?.timetable 
      : timetableData?.exam_timetable
    
    if (!imageUrl) return

    setIsDownloading(true)
    try {
      // Simulate download by opening in new tab (since we can't actually download from Unsplash easily)
      window.open(getImageUrl(imageUrl), '_blank')
      
      // Simulate download delay
      setTimeout(() => {
        setIsDownloading(false)
      }, 1000)
    } catch (error) {
      console.error('Error downloading image:', error)
      window.open(getImageUrl(imageUrl), '_blank')
      setIsDownloading(false)
    }
  }

  const currentImage = activeTab === 'regular' 
    ? timetableData?.timetable 
    : timetableData?.exam_timetable

  return (
    <div className="min-h-screen bg-gray-50 p-1">
     
     {/* Header */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-3">
        <div className="mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <CalendarDays className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white md:text-xl">
                Time Tables
              </h1>
              <p className="text-xs text-white/90">
                Check exam and regular time tables
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto p-1">
        {/* Class Info Card */}
        {timetableData?.class && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Class {timetableData.class}
                </h2>
                <p className="text-xs text-gray-500">
                  Academic Year {new Date().getFullYear()}-{new Date().getFullYear() + 1}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        {(timetableData?.timetable || timetableData?.exam_timetable) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 mb-6 inline-flex">
            <button
              onClick={() => setActiveTab('regular')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'regular'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Class Timetable
            </button>
            <button
              onClick={() => setActiveTab('exam')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'exam'
                  ? 'bg-sky-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Exam Timetable
            </button>
          </div>
        )}

        {/* Timetable Display Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-gray-600">Loading timetable...</p>
            </div>
          ) : currentImage ? (
            <div className="p-4 sm:p-6">
              {/* Header with timetable info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeTab === 'regular' ? 'bg-blue-50' : 'bg-purple-50'
                  }`}>
                    {activeTab === 'regular' ? (
                      <BookOpen className={`w-5 h-5 ${activeTab === 'regular' ? 'text-blue-600' : 'text-purple-600'}`} />
                    ) : (
                      <Trophy className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      {activeTab === 'regular' ? 'Class Timetable' : 'Exam Timetable'} - Class {timetableData?.class}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {activeTab === 'regular' 
                        ? 'Your weekly class schedule' 
                        : 'Upcoming examination schedule'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    <Clock className="w-3 h-3 mr-1" />
                    Updated: {new Date().toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative group mb-6">
                <div 
                  onClick={handleImageClick}
                  className="relative bg-gray-100 rounded-lg border border-gray-200 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <ZoomIn className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                  <img
                    src={getImageUrl(currentImage)}
                    alt={`${activeTab === 'regular' ? 'Class' : 'Exam'} Timetable`}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Click on the image to zoom
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download {activeTab === 'regular' ? 'Timetable' : 'Exam Schedule'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'regular' ? (
                  <BookOpen className="w-8 h-8 text-gray-400" />
                ) : (
                  <Trophy className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                No {activeTab === 'regular' ? 'Timetable' : 'Exam Schedule'} Available
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {activeTab === 'regular' 
                  ? `The class timetable for Class ${timetableData?.class || ''} hasn't been uploaded yet.`
                  : `The exam schedule for Class ${timetableData?.class || ''} hasn't been uploaded yet.`}
              </p>
              
              {/* Show option to switch tabs if the other timetable exists */}
              {activeTab === 'regular' && timetableData?.exam_timetable && (
                <button
                  onClick={() => setActiveTab('exam')}
                  className="mt-4 px-4 py-2 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-100 transition-colors"
                >
                  View Exam Schedule Instead
                </button>
              )}
              {activeTab === 'exam' && timetableData?.timetable && (
                <button
                  onClick={() => setActiveTab('regular')}
                  className="mt-4 px-4 py-2 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View Class Timetable Instead
                </button>
              )}
            </div>
          )}
        </div>

        {/* Information Cards */}
        {currentImage && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-1">Schedule Overview</h4>
                  <p className="text-xs text-gray-500">
                    {activeTab === 'regular' 
                      ? 'Review your daily class schedule and be prepared'
                      : 'Check exam dates and plan your study schedule'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-1">Download & Print</h4>
                  <p className="text-xs text-gray-500">
                    Download or save for quick reference anytime, anywhere
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {isImageZoomed && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="relative max-w-6xl w-full">
            <button
              onClick={closeZoom}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <img
                src={getImageUrl(currentImage)}
                alt={`${activeTab === 'regular' ? 'Class' : 'Exam'} Timetable`}
                className="w-full h-auto"
              />
            </div>
            
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-xs">
              Press ESC to close
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeTable