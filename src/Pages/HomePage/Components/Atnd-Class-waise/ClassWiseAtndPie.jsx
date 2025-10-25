// import React, { useState, useEffect, useCallback } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { BookOpen, Users, TrendingUp } from 'lucide-react';
// import axios from 'axios';
// ChartJS.register(ArcElement, Tooltip, Legend);

// function ClassWiseAtndPie() {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [attendanceData, setAttendanceData] = useState({ present: 0, absent: 0 });
//   const [loading, setLoading] = useState(false);

//   // const backendUrl = process.env.REACT_APP_BACKEND_URL;

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const fetchClasses = useCallback(async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/dashboard/get-all-classes/`);
//       setClasses(response.data.classes);
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     }
//   }, [backendUrl]);

//   const fetchAttendanceData = useCallback(async (classId) => {
//     if (!classId) return;
//     setLoading(true);
//     try {
//       const response = await axios.get(`${backendUrl}/api/dashboard/class-attendance-summery/${classId}/`);
//       setAttendanceData(response.data);
//     } catch (error) {
//       console.error('Error fetching attendance data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [backendUrl]);

//   useEffect(() => {
//     fetchClasses();
//   }, [fetchClasses]);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchAttendanceData(selectedClass);
//     }
//   }, [selectedClass, fetchAttendanceData]);

//   const handleClassChange = (e) => {
//     const selectedId = e.target.value ? parseInt(e.target.value) : null;
//     setSelectedClass(selectedId);
//     if (selectedId) {
//       fetchAttendanceData(selectedId);
//     }
//   };

//   const data = {
//     labels: ['Present', 'Absent'],
//     datasets: [
//       {
//         data: [attendanceData.present, attendanceData.absent],
//         backgroundColor: ['#098a04', '#eb0505'],
//         borderWidth: 0,
//         hoverBorderWidth: 4,
//         hoverBorderColor: '#ffffff',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           padding: 20,
//           usePointStyle: true,
//           font: {
//             size: 12,
//             weight: 'bold'
//           }
//         }
//       }
//     },
//     cutout: '65%',
//   };

//   return (
//     <div className="">
//       {/* Title + Dropdown with gradient background */}
//       <div className="flex items-center justify-between bg-white rounded-xl py-1 px-2 mb-6 shadow-sm  border-blue-100">
//         <div className="flex justify-center space-x-2">
//           <h3 className="text-sm md:text-xl font-bold text-gray-500 text-center">
//             Class Attendance :
//           </h3>
//         </div>
//         <select
//           id="classSelect"
//           className="border-1 border-blue-200 rounded-lg p-3 text-xs md:text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300  hover:shadow-md"
//           value={selectedClass || ''}
//           onChange={handleClassChange}
//         >
//           <option value="">-- Select a Class --</option>
//           {classes.map((cls) => (
//             <option key={cls.id} value={cls.id}>
//               {cls.std}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Chart / Message with enhanced animations */}
//       <div className="">
//         <div className="flex items-center justify-center h-64">
//           {!selectedClass ? (
//             <div className="text-center space-y-6">
//               {/* Animated Icons */}
//               <div className="flex justify-center space-x-2 mb-4">
//                 <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
//                   <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg">
//                     <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
//                   </div>
//                 </div>
//                 <div className="animate-bounce" style={{ animationDelay: '150ms' }}>
//                   <div className="p-3 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full shadow-lg">
//                     <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
//                   </div>
//                 </div>
//                 <div className="animate-bounce" style={{ animationDelay: '300ms' }}>
//                   <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg">
//                     <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-white" />
//                   </div>
//                 </div>
//               </div>

//               {/* Main Message */}
//               <div className="space-y-2">
//                 <h4 className="text-sm md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
//                   Ready to Analyze Attendance
//                 </h4>
//                 <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
//                   Please select a class from the dropdown above
//                 </p>
//               </div>

//                     {/* Progress dots */}
//         <div className="flex justify-center space-x-1 mt-4">
//           <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//           <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//           <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//         </div>
//             </div>
//           ) : loading ? (
//             <div className="text-center space-y-4">
//               {/* Loading Spinner */}
//               <div className="relative">
//                 <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                   <TrendingUp className="w-5 h-5 text-blue-600" />
//                 </div>
//               </div>
//               <p className="text-gray-600 font-medium">Loading attendance data...</p>
//             </div>
//           ) : (
//             <div className="w-full h-48 relative">
//               <Doughnut data={data} options={options} />
//               {/* Center Label */}
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//                 <div className="text-2xl font-bold text-gray-700">
//                   {attendanceData.present + attendanceData.absent}
//                 </div>
//                 <div c> <p className='text-xs text-gray-500'>Total Students</p> </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClassWiseAtndPie;

import React, { useCallback, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Clock, Users, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

function ClassWiseAtndPie() {
  const [attendance, setAttendance] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchClasses = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/dashboard/get-all-classes/`);
      setClasses(response.data.classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  }, [backendUrl]);

  const fetchAttendanceData = useCallback(async (classId) => {
    if (!classId) {
      setAttendance(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/dashboard/class-attendance-summery/${classId}/`);
      // Transform the API response to match expected structure
      const transformedData = {
        total_present: response.data.present || 0,
        total_absent: response.data.absent || 0,
        total_late: response.data.late || 0,
        attendance_marked: response.data.attendance_marked !== false
      };
      setAttendance(transformedData);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setAttendance(null);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      await fetchClasses();
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchClasses]);

  const handleClassChange = (event) => {
    const classId = event.target.value;
    setSelectedClass(classId);
    if (classId) {
      fetchAttendanceData(classId);
    } else {
      setAttendance(null);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  // Modern Animation Component for "Attendance will update soon" - Same as AttendancePie
  const AttendanceUpdateAnimation = () => (
    <div className="flex flex-col items-center justify-center space-y-6 py-8 mt-5">
      {/* Floating Icons Animation */}
      <div className="relative mb-3">
        {/* Central Clock Icon */}
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Clock className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Orbiting Icons */}
        <div className="absolute inset-0 w-32 h-32 -translate-x-8 -translate-y-8">
          {/* Users Icon */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Calendar Icon */}
          <div className="absolute bottom-0 right-0 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Additional floating element */}
          <div className="absolute bottom-0 left-0 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full shadow-md opacity-80"></div>
          </div>
        </div>

        {/* Ripple Effect */}
        <div className="absolute inset-0 w-32 h-32 -translate-x-8 -translate-y-8">
          <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping opacity-20"></div>
          <div className="absolute inset-4 rounded-full border-2 border-purple-300 animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-8 rounded-full border-2 border-indigo-300 animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Text with gradient and animation */}
      <div className="text-center space-y-2 mt-5">
        <h4 className="text-sm md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
          Attendance Update in Progress
        </h4>
        <p className="text-gray-600 text-sm md:text-base font-medium">
          Refreshing data for today's summary...
        </p>

        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );

  // Component for "Attendance not marked for this class"
  const AttendanceNotMarked = () => (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="relative mb-3">
        {/* Central Alert Icon */}
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Ripple Effect */}
        <div className="absolute inset-0 w-32 h-32 -translate-x-8 -translate-y-8">
          <div className="absolute inset-0 rounded-full border-2 border-orange-300 animate-ping opacity-20"></div>
          <div className="absolute inset-4 rounded-full border-2 border-red-300 animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Text with gradient and animation */}
      <div className="text-center space-y-2">
        <h4 className="text-sm md:text-xl font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-purple-500 bg-clip-text text-transparent">
          Attendance Not Marked
        </h4>
        <p className="text-gray-600 text-sm md:text-base font-medium">
          No attendance data available for this class today
        </p>

        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );

  // Loading state for initial data
  if (loading && !classes.length) {
    return (
      <div>
        <div className=" ">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm md:text-xl font-bold text-gray-500">
              Class Attendance :
            </h3>
            <div className="border-1 border-blue-200 rounded-lg p-2 text-xs md:text-base bg-gray-100 animate-pulse">
              <div className="w-32 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading classes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exact same data structure as AttendancePie
  const data = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [
      {
        data: [
          attendance?.total_present || 0,
          attendance?.total_absent || 0,
          attendance?.total_late || 0,
        ],
        backgroundColor: ['#098a04', '#eb0505', '#f5a623'],
      },
    ],
  };

  // Exact same options as AttendancePie
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Check if attendance data is empty (all zeros)
  const isAttendanceEmpty = attendance &&
    attendance.total_present === 0 &&
    attendance.total_absent === 0 &&
    attendance.total_late === 0;

  return (
    <div>
      <div className="">
        {/* Class selection dropdown - ALWAYS VISIBLE */}
        <div className="flex items-center justify-between mb-6 shadow-lg p-2 rounded-sm">
          <h3 className="text-sm md:text-xl font-bold text-gray-500 ">
            Class Attendance :
          </h3>
          <select
            id="classSelect"
            className="border-1 border-blue-200 rounded-lg p-2 text-xs md:text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:shadow-md"
            value={selectedClass || ''}
            onChange={handleClassChange}
          >
            <option value="" className="text-xs">Select a Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.std}
              </option>
            ))}
          </select>
        </div>

        {/* Content area that changes based on state */}
        {loading && selectedClass ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading attendance data...</p>
            </div>
          </div>
        ) : !selectedClass ? (
          // No class selected state
          <div className="text-center space-y-6 py-8">
            <div className="flex justify-center space-x-2 mb-4">
              <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
                <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg">
                  <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <div className="animate-bounce" style={{ animationDelay: '150ms' }}>
                <div className="p-3 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full shadow-lg">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <div className="animate-bounce" style={{ animationDelay: '300ms' }}>
                <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg">
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-lg font-medium">
              Please select a class to view attendance
            </p>
          </div>
        ) : !attendance ? (
          // Error loading attendance data
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load attendance data.</p>
            <button
              onClick={() => fetchAttendanceData(selectedClass)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
            >
              Retry
            </button>
          </div>
        ) : isAttendanceEmpty ? (
          // No attendance data available for this class
          <div className="flex items-center justify-center h-48">
            <AttendanceNotMarked />
          </div>
        ) : (
          // Chart area - Exact same height and structure as AttendancePie
          <div className="flex items-center justify-center h-48">
            {attendance.attendance_marked === false ? (
              <AttendanceUpdateAnimation />
            ) : (
              <Doughnut data={data} options={options} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassWiseAtndPie;