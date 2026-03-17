import React, { useCallback, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users, Calendar, UserCheck, UserX, School } from 'lucide-react';

function TCHAtendSummery() {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Sample attendance data
  const sampleAttendance = {
    present: 4,
    absent: 1,
    present_percentage: 94,
    absent_percentage: 16,
    total_teachers: 5,
    date: new Date().toISOString().split('T')[0]
  };

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(false);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Set sample data
      setAttendance(sampleAttendance);
    } catch (error) {
      console.error('Failed to fetch attendance summary:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
          <School className="w-5 h-5 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-xs text-gray-400 mt-3">Loading attendance...</p>
      </div>
    );
  }

  if (error || !attendance) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <Users className="w-10 h-10 mb-2" />
        <p className="text-xs">No data available</p>
        <button 
          onClick={fetchSummary}
          className="mt-2 text-xs text-blue-500 hover:text-blue-600"
        >
          Try again
        </button>
      </div>
    );
  }

  const total = (attendance.present || 0) + (attendance.absent || 0);
  const presentPercent = attendance.present_percentage || 0;
  const absentPercent = attendance.absent_percentage || 0;

  // Format current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  });

  // Prepare data for Recharts Pie
  const pieData = [
    { name: 'Present', value: attendance.present || 0 },
    { name: 'Absent', value: attendance.absent || 0 }
  ];

  return (
    <div className="h-full w-full p-3 md:p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div>
            <h3 className="text-xs md:text-base font-semibold text-gray-700">Teacher's Attendance</h3>
            <p className="text-[9px] md:text-[12px] text-gray-400">{formattedDate}</p>
          </div>
        </div>
        <span className="text-[8px] md:text-[14px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium border border-green-200">
          Live
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Donut Chart with Recharts - Soft Colors */}
        <div className="relative w-28 h-28 md:w-36 md:h-36">
          {attendance.present === 0 && attendance.absent === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Calendar className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-[13px] md:text-xs text-gray-400">
                No attendance marked
              </p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {/* Soft gradients */}
                    <linearGradient id="presentGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#86efac" />
                    </linearGradient>
                    <linearGradient id="absentGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="100%" stopColor="#fca5a5" />
                    </linearGradient>
                  </defs>

                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="95%"
                    paddingAngle={3}
                    dataKey="value"
                    stroke="white"
                    strokeWidth={1.5}
                    cornerRadius={6}
                    startAngle={90}
                    endAngle={-270}
                    animationDuration={800}
                    animationEasing="ease"
                    isAnimationActive={true}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? 'url(#presentGradient)' : 'url(#absentGradient)'}
                        style={{
                          filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.08))',
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl md:text-2xl font-bold text-gray-800">{presentPercent}%</span>
                <span className="text-[8px] md:text-[14px] text-gray-500 -mt-1">present</span>
              </div>
            </>
          )}
        </div>

        {/* Stats Cards */}
        <div className="w-full grid grid-cols-2 ">
          {/* Present Card */}
          <div className="relative group p-2">
            <div className="absolute inset-0 bg-emerald-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            <div className="relative bg-white border border-emerald-100 rounded-xl p-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="absolute top-0 left-2 right-2 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"></div>
              
              <div className="flex items-center justify-between mb-0.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] md:text-xs font-medium text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-full">PRESENT</span>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-lg font-bold text-emerald-700 leading-none">{attendance.present || 90}</p>
                  <p className="text-[9px] md:text-xs text-gray-400 mt-0.5">Present Today</p>
                </div>
                
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * (1 - presentPercent / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-emerald-600">
                    {presentPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Absent Card */}
          <div className="relative group p-2">
            <div className="absolute inset-0 bg-red-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            <div className="relative bg-white border border-red-100 rounded-xl p-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="absolute top-0 left-2 right-2 h-0.5 bg-gradient-to-r from-red-400 to-red-300 rounded-full"></div>
              
              <div className="flex items-center justify-between mb-0.5">
                <UserX className="w-3.5 h-3.5 text-red-600" />
                <span className="text-[9px] md:text-xs font-medium text-red-600 bg-red-50 px-1 py-0.5 rounded-full">ABSENT</span>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-lg font-bold text-red-700 leading-none">{attendance.absent || 0}</p>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">Absent Today</p>
                </div>
                
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="2"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * (1 - absentPercent / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-red-600">
                    {absentPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 mt-2 pt-1.5 border-t border-gray-100 flex items-center justify-between text-[8px] md:text-[9px]">
        <div className="flex items-center gap-1.5 text-gray-500">
          <Users className="w-3.5 h-3.5" />
          <span className='text-xs md:text-sm'>Total Teachers : <span className="text-xs md:text-sm font-semibold text-green-600">{total}</span></span>
        </div>
      </div>
    </div>
  );
}

export default TCHAtendSummery;