import React, { useState, useEffect } from 'react'
import { FcBusinesswoman, FcBusinessman, FcCalendar } from 'react-icons/fc'

function SchoolData() {

  const [isLoading, setIsLoading] = useState({
    students: true,
    teachers: true,
    notice: true,
  })

  // Sample data
  const sampleTotals = {
    total_students: 100,
    total_teachers: 5,
    total_notices: 12
  }

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading({
        students: false,
        teachers: false,
        notice: false,
      })
    }, 800) // 800ms delay to show loading state

    return () => clearTimeout(timer)
  }, [])

  const formatCount = (count, defaultValue = '00') => {
    return count ? String(count).padStart(2, '0') : defaultValue
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
        
        {/* Students Card */}
        <div className="p-3 md:p-6 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30 rounded-xl md:rounded-2xl shadow-md active:shadow-xl lg:hover:shadow-xl border border-blue-100/50 group">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-2 md:gap-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl shadow-lg shadow-blue-500/30">
              <FcBusinesswoman className="text-2xl md:text-4xl" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </p>
              {isLoading.students ? (
                <div className="h-6 md:h-8 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
              ) : (
                <p className="text-sm md:text-2xl lg:text-3xl font-bold text-gray-800">
                  {formatCount(sampleTotals?.total_students)}
                </p>
              )}
              <p className="text-[8px] md:text-xs text-gray-400 mt-0.5 md:mt-1">
                Total enrolled
              </p>
            </div>
          </div>
        </div>

        {/* Teachers Card */}
        <div className="p-3 md:p-6 transition-all duration-300 bg-gradient-to-br from-white to-green-50/30 rounded-xl md:rounded-2xl shadow-md active:shadow-xl lg:hover:shadow-xl border border-green-100/50 group">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-2 md:gap-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl md:rounded-2xl shadow-lg shadow-green-500/30">
              <FcBusinessman className="text-2xl md:text-4xl" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teachers
              </p>
              {isLoading.teachers ? (
                <div className="h-6 md:h-8 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
              ) : (
                <p className="text-sm md:text-2xl lg:text-3xl font-bold text-gray-800">
                  {formatCount(sampleTotals?.total_teachers)}
                </p>
              )}
              <p className="text-[8px] md:text-xs text-gray-400 mt-0.5 md:mt-1">
                Staff members
              </p>
            </div>
          </div>
        </div>

        {/* Events Card */}
        <div className="p-3 md:p-6 transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30 rounded-xl md:rounded-2xl shadow-md active:shadow-xl lg:hover:shadow-xl border border-purple-100/50 group">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-2 md:gap-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl md:rounded-2xl shadow-lg shadow-purple-500/30">
              <FcCalendar className="text-2xl md:text-4xl" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider">
                Events
              </p>
              {isLoading.notice ? (
                <div className="h-6 md:h-8 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
              ) : (
                <p className="text-sm md:text-2xl lg:text-3xl font-bold text-gray-800">
                  {formatCount(sampleTotals?.total_notices)}
                </p>
              )}
              <p className="text-[8px] md:text-xs text-gray-400 mt-0.5 md:mt-1">
                Upcoming events
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SchoolData