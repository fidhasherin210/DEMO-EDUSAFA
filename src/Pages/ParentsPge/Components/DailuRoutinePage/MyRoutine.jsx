import React, { useEffect, useState, useCallback } from "react";
import { Calendar, Clock, CheckCircle, XCircle, BookOpen, ChevronRight, Sparkles, Target, Activity } from "lucide-react";
import { useParams } from "react-router-dom";

// Sample routine data for different students and dates
const SAMPLE_ROUTINE_DATA = {
  // Student 101 - Ahmed Raza
  101: {
    "2024-03-15": {
      subahi: true,
      luhur: true,
      asar: true,
      maqrib: true,
      isha: true,
      thabaraka: true,
      waqiha: false,
      reading: true,
      swalath: true,
      haddad: true,
    },
    "2024-03-14": {
      subahi: true,
      luhur: false,
      asar: true,
      maqrib: true,
      isha: true,
      thabaraka: false,
      waqiha: true,
      reading: false,
      swalath: true,
      haddad: true,
    },
    "2024-03-13": {
      subahi: true,
      luhur: true,
      asar: false,
      maqrib: true,
      isha: false,
      thabaraka: true,
      waqiha: true,
      reading: true,
      swalath: false,
      haddad: true,
    },
  },
  // Student 102 - Fatima Zahra
  102: {
    "2024-03-15": {
      subahi: true,
      luhur: true,
      asar: true,
      maqrib: true,
      isha: true,
      thabaraka: true,
      waqiha: true,
      reading: true,
      swalath: true,
      haddad: true,
    },
    "2024-03-14": {
      subahi: true,
      luhur: true,
      asar: true,
      maqrib: false,
      isha: true,
      thabaraka: true,
      waqiha: true,
      reading: true,
      swalath: true,
      haddad: false,
    },
  },
  // Student 103 - Muhammad Salih
  103: {
    "2024-03-15": {
      subahi: false,
      luhur: true,
      asar: true,
      maqrib: true,
      isha: false,
      thabaraka: true,
      waqiha: false,
      reading: true,
      swalath: true,
      haddad: false,
    },
  },
};

// Default routine for students/dates without specific data
const getDefaultRoutine = () => ({
  subahi: Math.random() > 0.3,
  luhur: Math.random() > 0.3,
  asar: Math.random() > 0.3,
  maqrib: Math.random() > 0.3,
  isha: Math.random() > 0.3,
  thabaraka: Math.random() > 0.3,
  waqiha: Math.random() > 0.3,
  reading: Math.random() > 0.3,
  swalath: Math.random() > 0.3,
  haddad: Math.random() > 0.3,
});

function MyRoutine() {
  const [routineData, setRoutineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  
  const { studentId } = useParams();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  const fetchRoutineData = useCallback(async () => {
    if (!selectedDate) return;
    
    setLoading(true);
    setError(null);
    setMessage("");

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if we have sample data for this student and date
      const studentData = SAMPLE_ROUTINE_DATA[studentId];
      let routineForDate = studentData?.[selectedDate];

      // If no data found, generate random routine
      if (!routineForDate) {
        routineForDate = getDefaultRoutine();
        
        // For demo purposes, show message for some dates
        if (Math.random() > 0.7) {
          setMessage("Routine not marked for this date");
          setRoutineData(null);
          setLoading(false);
          return;
        }
      }

      // Simulate success response
      if (routineForDate) {
        setRoutineData(routineForDate);
        setMessage("");
      } else {
        setRoutineData(null);
        setMessage("Routine not marked for this date");
      }
    } catch (err) {
      console.error("Error fetching routine data:", err);
      setError("Failed to fetch routine data");
    } finally {
      setLoading(false);
    }
  }, [selectedDate, studentId]);

  useEffect(() => {
    if (selectedDate && studentId) {
      fetchRoutineData();
    }
  }, [selectedDate, studentId, fetchRoutineData]);

  const routineItems = [
    { key: "subahi", label: "Subahi", icon: "🌅", color: "from-amber-400 to-orange-500" },
    { key: "luhur", label: "Luhur", icon: "☀️", color: "from-yellow-400 to-amber-500" },
    { key: "asar", label: "Asar", icon: "🌤️", color: "from-orange-400 to-red-500" },
    { key: "maqrib", label: "Maqrib", icon: "🌅", color: "from-red-400 to-rose-500" },
    { key: "isha", label: "Isha", icon: "🌙", color: "from-indigo-400 to-purple-500" },
    { key: "thabaraka", label: "Thabaraka", icon: "📖", color: "from-emerald-400 to-teal-500" },
    { key: "waqiha", label: "Waqiha", icon: "📖", color: "from-blue-400 to-cyan-500" },
    { key: "reading", label: "Reading", icon: "📚", color: "from-violet-400 to-purple-500" },
    { key: "swalath", label: "Swalath", icon: "🤲", color: "from-fuchsia-400 to-pink-500" },
    { key: "haddad", label: "Haddad", icon: "✨", color: "from-rose-400 to-red-500" },
  ];

  const getCompletionStats = () => {
    if (!routineData) return { completed: 0, total: 0, percentage: 0 };

    const completed = routineItems.filter(
      (item) => routineData[item.key] === true
    ).length;
    const total = routineItems.length;
    const percentage = Math.round((completed / total) * 100);

    return { completed, total, percentage };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stats = getCompletionStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="p-1 max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-3">
          <div className="mx-auto ">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Daily Routine
                </h1>
                <p className="text-xs text-white/90">
                  Track spiritual journey
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Date Selection Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100/50 hover:shadow-lg transition-all duration-300">
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2 sm:gap-3 sm:mb-3">
                <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md sm:p-2">
                  <Calendar className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>
                <h2 className="text-sm font-semibold text-gray-800 sm:text-base">Select Date</h2>
              </div>
              
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 sm:text-sm sm:px-4 sm:py-3"
                  />
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:px-4 sm:py-2.5">
                  <Clock className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4" />
                  <span className="text-xs font-medium text-gray-700 truncate sm:text-sm">
                    {selectedDate && formatDate(selectedDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          {!loading && !error && routineData && (
            <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-1">
              {/* Quick Stats Card */}
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100/50 p-4 hover:shadow-lg transition-all duration-300 sm:p-5">
                  <div className="flex items-center gap-2 mb-3 sm:gap-3 sm:mb-4">
                    <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md sm:p-2">
                      <Activity className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                    </div>
                    <h2 className="text-sm font-semibold text-gray-800 sm:text-base">Quick Stats</h2>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg sm:p-3">
                      <span className="text-xs text-gray-600 sm:text-sm">Completed</span>
                      <span className="text-sm font-semibold text-gray-800 sm:text-base">{stats.completed}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg sm:p-3">
                      <span className="text-xs text-gray-600 sm:text-sm">Remaining</span>
                      <span className="text-sm font-semibold text-gray-800 sm:text-base">{stats.total - stats.completed}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg sm:p-3">
                      <span className="text-xs text-gray-600 sm:text-sm">Total Routines</span>
                      <span className="text-sm font-semibold text-gray-800 sm:text-base">{stats.total}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200 sm:mt-3 sm:pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 sm:text-sm">Progress</span>
                        <span className={`text-sm font-semibold sm:text-base ${
                          stats.percentage >= 75 ? 'text-green-600' : 
                          stats.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {stats.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message when no routine */}
          {!loading && !error && message && (
            <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 rounded-lg">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <p className="text-xs text-amber-700 font-medium sm:text-sm">{message}</p>
              </div>
            </div>
          )}

          {/* Routine List Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100/50 overflow-hidden hover:shadow-lg transition-all duration-300">
            {loading ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-12 h-12 border-3 border-gray-200 rounded-full sm:w-14 sm:h-14"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 border-3 border-blue-500 rounded-full border-t-transparent animate-spin sm:w-14 sm:h-14"></div>
                  </div>
                  <p className="mt-3 text-xs text-gray-600 font-medium sm:text-sm">Loading your routine...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <div className="p-3 bg-red-100 rounded-full inline-block mb-2 sm:p-4">
                    <XCircle className="h-8 w-8 text-red-500 sm:h-10 sm:w-10" />
                  </div>
                  <p className="text-sm text-red-600 font-medium sm:text-base">{error}</p>
                  <p className="text-xs text-gray-500 mt-1 sm:text-sm">Please try again later</p>
                </div>
              </div>
            ) : !routineData ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <div className="p-3 bg-gray-100 rounded-full inline-block mb-2 sm:p-4">
                    <Calendar className="h-8 w-8 text-gray-400 sm:h-10 sm:w-10" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium sm:text-base">No routine available</p>
                  <p className="text-xs text-gray-500 mt-1 sm:text-sm">for the selected date</p>
                </div>
              </div>
            ) : (
              <div>
                {/* Mobile Card View - Hidden on desktop */}
                <div className="p-3 space-y-2 sm:p-4 sm:space-y-3 md:hidden">
                  {routineItems.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-gradient-to-r from-gray-50 to-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 sm:p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} shadow-md flex items-center justify-center text-white sm:w-10 sm:h-10 sm:rounded-xl`}>
                            <span className="text-sm sm:text-lg">{item.icon}</span>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-800 sm:text-sm">
                              {item.label}
                            </span>
                            <span className="text-[10px] text-gray-500 block sm:text-xs">
                              {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div>
                          {routineData[item.key] ? (
                            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-1.5 rounded-full shadow-md sm:p-2">
                              <CheckCircle className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                            </div>
                          ) : (
                            <div className="bg-gradient-to-br from-red-400 to-rose-500 p-1.5 rounded-full shadow-md sm:p-2">
                              <XCircle className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View - Hidden on mobile */}
                <div className="hidden md:block">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100/80">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Routine
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {routineItems.map((item, index) => (
                        <tr
                          key={index}
                          className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} shadow-md flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-200`}>
                                <span className="text-sm">{item.icon}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-800">
                                  {item.label}
                                </span>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {item.key.charAt(0).toUpperCase() + item.key.slice(1)} prayer
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center">
                              {routineData[item.key] ? (
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                  <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 p-1.5 rounded-full shadow-md">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-red-400 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                  <div className="relative bg-gradient-to-br from-red-400 to-rose-500 p-1.5 rounded-full shadow-md">
                                    <XCircle className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .stop-color-from-emerald-500 { stop-color: #10b981; }
        .stop-color-to-green-600 { stop-color: #16a34a; }
        .stop-color-from-green-500 { stop-color: #22c55e; }
        .stop-color-to-emerald-600 { stop-color: #059669; }
        .stop-color-from-yellow-500 { stop-color: #eab308; }
        .stop-color-to-amber-600 { stop-color: #d97706; }
        .stop-color-from-orange-500 { stop-color: #f97316; }
        .stop-color-to-red-600 { stop-color: #dc2626; }
        .stop-color-from-red-500 { stop-color: #ef4444; }
        .stop-color-to-rose-600 { stop-color: #e11d48; }
      `}</style>
    </div>
  );
}

export default MyRoutine;