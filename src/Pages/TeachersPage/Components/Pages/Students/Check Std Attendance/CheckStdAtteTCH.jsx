import React, { useState, useRef, useCallback } from "react";
import {
  Calendar,
  Users,
  XCircle,
  CheckCircle,
  Clock,
  FileText,
  FileDown,
  BookOpen,
  User
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function CheckStdAtteTCH() {
  const [attendance, setAttendance] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState(null);
  
  const hasFetchedData = useRef(false);

  // Sample data for classes with students
  const sampleClasses = [
    { 
      id: 1, 
      std: '1', 
      students: [
         {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ]
    },
    { 
      id: 2, 
      std: '2', 
      students: [
       {
          id: 201,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
    
        {
          id: 202,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ]
    },
    { 
      id: 3, 
      std: '3', 
      students: [
        {
          id: 301,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 302,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 303,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ]
    },
    { 
      id: 4, 
      std: '4', 
      students: [
       {
          id: 401,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 402,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
      
      ]
    },
    { 
      id: 5, 
      std: '5', 
      students: [
      {
          id: 501,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 502,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 503,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
      ]
    },
  ];

  // Sample academic years
  const sampleAcademicYears = [
    { id: 1, year: '2024-2025', is_current: true },
    { id: 2, year: '2023-2024', is_current: false },
    { id: 3, year: '2022-2023', is_current: false },
  ];

  // Sample attendance records
  const sampleAttendanceRecords = {
    101: [ // Aarav Sharma
      { id: 1, date: '2024-03-01', status: 'Present', remarks: 'On time' },
      { id: 2, date: '2024-03-02', status: 'Present', remarks: '' },
      { id: 3, date: '2024-03-03', status: 'Present', remarks: '' },
      { id: 4, date: '2024-03-04', status: 'Present', remarks: 'Participated in sports' },
      { id: 5, date: '2024-03-05', status: 'Absent', remarks: 'Sick leave' },
      { id: 6, date: '2024-03-08', status: 'Present', remarks: '' },
      { id: 7, date: '2024-03-09', status: 'Present', remarks: '' },
      { id: 8, date: '2024-03-10', status: 'Present', remarks: '' },
      { id: 9, date: '2024-03-11', status: 'Absent', remarks: 'Family function' },
      { id: 10, date: '2024-03-12', status: 'Present', remarks: '' },
      { id: 11, date: '2024-03-15', status: 'Present', remarks: 'Submitted homework' },
      { id: 12, date: '2024-03-16', status: 'Present', remarks: '' },
      { id: 13, date: '2024-03-17', status: 'Present', remarks: '' },
      { id: 14, date: '2024-03-18', status: 'Absent', remarks: 'Medical appointment' },
      { id: 15, date: '2024-03-19', status: 'Present', remarks: '' },
      { id: 16, date: '2024-03-22', status: 'Present', remarks: '' },
      { id: 17, date: '2024-03-23', status: 'Present', remarks: '' },
      { id: 18, date: '2024-03-24', status: 'Present', remarks: '' },
      { id: 19, date: '2024-03-25', status: 'Present', remarks: '' },
      { id: 20, date: '2024-03-26', status: 'Absent', remarks: 'Not feeling well' },
      { id: 21, date: '2024-04-01', status: 'Present', remarks: '' },
      { id: 22, date: '2024-04-02', status: 'Present', remarks: '' },
      { id: 23, date: '2024-04-03', status: 'Present', remarks: '' },
      { id: 24, date: '2024-04-04', status: 'Absent', remarks: 'Family trip' },
    ],
    102: [ // Ananya Patel
      { id: 25, date: '2024-03-01', status: 'Present', remarks: '' },
      { id: 26, date: '2024-03-02', status: 'Present', remarks: '' },
      { id: 27, date: '2024-03-03', status: 'Absent', remarks: 'Sick' },
      { id: 28, date: '2024-03-04', status: 'Present', remarks: '' },
      { id: 29, date: '2024-03-05', status: 'Present', remarks: '' },
      { id: 30, date: '2024-03-08', status: 'Present', remarks: '' },
      { id: 31, date: '2024-03-09', status: 'Present', remarks: '' },
      { id: 32, date: '2024-03-10', status: 'Present', remarks: '' },
      { id: 33, date: '2024-03-11', status: 'Present', remarks: '' },
      { id: 34, date: '2024-03-12', status: 'Absent', remarks: 'Doctor appointment' },
    ],
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const getDayName = (date) => {
    const day = new Date(date).getDay();
    const dayNames = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday",
    ];
    return dayNames[day];
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Initialize with sample data
  useState(() => {
    setAllClasses(sampleClasses);
    setAcademicYears(sampleAcademicYears);
    setSelectedAcademicYear(sampleAcademicYears[0].id.toString());
  }, []);

  // Fetch attendance data with filters
  const fetchAttendanceData = useCallback(async (academicYearId = selectedAcademicYear) => {
    if (!selectedStudent?.id || !academicYearId) return;
    
    setIsFilterLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Get sample records for the selected student or generate random ones
      const studentRecords = sampleAttendanceRecords[selectedStudent.id] || generateRandomAttendance(selectedStudent.id);
      
      setAttendance(studentRecords || []);
      setStudentInfo({
        id: selectedStudent.id,
        academic_year: academicYearId,
        name: selectedStudent.name
      });
      
      setIsFilterLoading(false);
    }, 800);
  }, [selectedStudent, selectedAcademicYear]);

  // Generate random attendance for students without predefined records
  const generateRandomAttendance = (studentId) => {
    const records = [];
    const startDate = new Date('2024-03-01');
    const endDate = new Date('2024-04-30');
    const currentDate = new Date(startDate);
    
    let id = 1000 + studentId;
    
    while (currentDate <= endDate) {
      // Skip Sundays
      if (currentDate.getDay() !== 0) {
        const random = Math.random();
        const status = random < 0.8 ? 'Present' : 'Absent'; // 80% present rate
        
        records.push({
          id: id++,
          date: currentDate.toISOString().split('T')[0],
          status: status,
          remarks: status === 'Absent' ? 'Not specified' : ''
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return records;
  };

  // Handle class selection
  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setSelectedStudent(null);
    setAttendance([]);
    setStudentInfo(null);
  };

  // Handle student selection
  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setAttendance([]);
    setStudentInfo(null);
    // Trigger attendance fetch
    setTimeout(() => {
      fetchAttendanceData(selectedAcademicYear);
    }, 100);
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150?text=No+Image";
  };

  // Get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150?text=No+Image";
    return imagePath;
  };

  // Handle academic year change
  const handleAcademicYearChange = (e) => {
    const yearId = e.target.value;
    setSelectedAcademicYear(yearId);
    setSelectedMonth("");
    if (selectedStudent) {
      fetchAttendanceData(yearId);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Filter attendance by month
  const filteredAttendance = selectedMonth && selectedMonth !== "all"
    ? attendance.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate.getMonth() + 1 === parseInt(selectedMonth);
      })
    : attendance;

  // Calculate statistics
  const stats = {
    present: filteredAttendance.filter(
      (record) => record.status?.toLowerCase() === "present"
    ).length,
    absent: filteredAttendance.filter(
      (record) => record.status?.toLowerCase() === "absent"
    ).length,
    total: filteredAttendance.length,
    percentage: filteredAttendance.length > 0
      ? Math.round((filteredAttendance.filter(r => r.status?.toLowerCase() === "present").length / filteredAttendance.length) * 100)
      : 0
  };

  // Export to CSV
  const exportToCSV = () => {
    if (filteredAttendance.length === 0) return;
    
    const headers = ["Date", "Day", "Status", "Remarks"];
    const csvData = filteredAttendance.map(record => [
      record.date,
      getDayName(record.date),
      record.status,
      record.remarks || ""
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    
    const academicYear = academicYears.find(y => y.id.toString() === selectedAcademicYear);
    const yearStr = academicYear ? academicYear.year.replace('/', '-') : 'unknown';
    const monthStr = selectedMonth && selectedMonth !== "all" ? `-${monthNames[parseInt(selectedMonth) - 1]}` : '';
    
    a.download = `attendance-${studentInfo?.name || 'student'}-${yearStr}${monthStr}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Export to PDF
  const exportToPDF = () => {
    if (filteredAttendance.length === 0) return;
    
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text("Attendance Report", 14, 15);
    
    // Add metadata
    doc.setFontSize(10);
    doc.text(`Student Name: ${studentInfo?.name || selectedStudent?.name || 'N/A'}`, 14, 25);
    
    const academicYear = academicYears.find(y => y.id.toString() === selectedAcademicYear);
    const yearText = academicYear ? academicYear.year : 'Unknown';
    doc.text(`Academic Year: ${yearText}`, 14, 32);
    
    if (selectedMonth && selectedMonth !== "all") {
      doc.text(`Month: ${monthNames[parseInt(selectedMonth) - 1]}`, 14, 39);
    }
    
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 14, 46);
    
    // Add statistics
    doc.setFontSize(12);
    doc.text("Summary", 14, 58);
    doc.setFontSize(10);
    doc.text(`Present: ${stats.present}`, 14, 66);
    doc.text(`Absent: ${stats.absent}`, 14, 73);
    doc.text(`Total Days: ${stats.total}`, 14, 80);
    doc.text(`Attendance Percentage: ${stats.percentage}%`, 14, 87);
    
    // Create table
    const tableData = filteredAttendance.map(record => [
      formatDisplayDate(record.date),
      getDayName(record.date),
      record.status,
      record.remarks || "-"
    ]);
    
    autoTable(doc, {
      startY: 95,
      head: [["Date", "Day", "Status", "Remarks"]],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 8 },
    });
    
    // Save PDF
    const academicYearStr = academicYear ? academicYear.year.replace('/', '-') : 'unknown';
    const monthStr = selectedMonth && selectedMonth !== "all" ? `-${monthNames[parseInt(selectedMonth) - 1]}` : '';
    doc.save(`attendance-${selectedStudent?.id || 'student'}-${academicYearStr}${monthStr}.pdf`);
  };

  // Get current academic year display name
  const getCurrentAcademicYearName = () => {
    const year = academicYears.find(y => y.id.toString() === selectedAcademicYear);
    return year ? year.year : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-1">
      {/* Header with Back Button */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
        <div className="mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white md:text-xl">
                Check  Attendance
              </h1>
              <p className="text-xs text-white/90">View daily and monthly attendance records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Class Selection */}
      <div className="px-1 mx-auto -mt-3">
        <div className="max-w-8xl p-1 mx-auto mb-2">
          <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <h2 className="text-xs font-semibold text-blue-600 md:text-lg">
                Select Class
              </h2>
            </div>

            {allClasses.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No classes available
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {allClasses.map((classData, index) => (
                  <button
                    key={classData.id || index}
                    onClick={() => handleClassSelect(classData)}
                    className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${
                      selectedClass?.id === classData.id
                        ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/25 scale-105'
                        : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="text-xs md:text-sm opacity-80">
                        Class
                      </div>
                      <div className="text-xs font-bold md:text-sm">
                        {classData.std}
                      </div>
                    </div>
                    {selectedClass?.id !== classData.id && (
                      <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 group-hover:opacity-100"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
            {/* Footer */}
            <div className="pt-3 mt-2 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                  Selected Class:{' '}
                  {selectedClass ? `Class ${selectedClass.std}` : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Selection */}
      {selectedClass && !selectedStudent && (
        <div className="bg-white rounded-2xl shadow-lg p-4 mt-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs md:text-sm font-semibold text-blue-600">
              Students in Class {selectedClass.std}
            </h3>
            <span className="ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {selectedClass.students?.length || 0} Students
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
            {selectedClass.students?.map((student) => (
              <button
                key={student.id}
                onClick={() => handleStudentSelect(student)}
                className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-left"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getImageUrl(student.image)}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                    onError={handleImageError}
                  />
                  <div className="flex-1">
                    <div className="text-xs md:text-sm font-medium text-gray-800">
                      {student.name}
                    </div>
                    {student.place && (
                      <div className="text-xs text-gray-600">
                        {student.place}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attendance Records */}
      {selectedStudent && (
        <div className="max-w-8xl mx-auto mt-2">
          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Academic Year */}
              <div className="space-y-1">
                <label className="block text-xs md:text-sm font-medium text-blue-600 text-center">
                  Academic Year
                </label>
                <select
                  value={selectedAcademicYear}
                  onChange={handleAcademicYearChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm"
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.year} {year.is_current ? '(Current)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month */}
              <div className="space-y-1">
                <label className="block text-xs md:text-sm font-medium text-blue-600 text-center">
                  Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm"
                >
                  <option value="all">All Months</option>
                  {monthNames.map((month, index) => (
                    <option key={index + 1} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Show message if no academic year is selected */}
          {!selectedAcademicYear && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-700 text-xs md:text-sm flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Please select an academic year to view attendance records
              </p>
            </div>
          )}

          {/* Loading indicator */}
          {isFilterLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Attendance Content */}
          {!isFilterLoading && selectedAcademicYear && (
            <>
              {/* Summary Cards */}
              {filteredAttendance.length > 0 ? (
                <>
                  <div className="grid grid-cols-4 gap-1 mb-6">
                    {/* Present Card */}
                    <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl py-3 px-1 border border-green-100/50">
                      <span className="text-base md:text-3xl font-bold text-green-600">
                        {stats.present}
                      </span>
                      <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                        Present
                      </span>
                    </div>

                    {/* Absent Card */}
                    <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-red-50 to-rose-50/50 rounded-2xl py-3 px-1 border border-red-100/50">
                      <span className="text-base md:text-3xl font-bold text-red-600">
                        {stats.absent}
                      </span>
                      <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                        Absent
                      </span>
                    </div>

                    {/* Total Days Card */}
                    <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl py-3 px-1 border border-blue-100/50">
                      <span className="text-base md:text-3xl font-bold text-blue-600">
                        {stats.total}
                      </span>
                      <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                        Total Days
                      </span>
                    </div>

                    {/* Attendance Percentage Card */}
                    <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl py-3 px-1 border border-purple-100/50">
                      <span className="text-base md:text-3xl font-bold text-purple-600">
                        {stats.percentage}%
                      </span>
                      <span className="text-[13px] md:text-sm text-gray-500 mt-0.5">
                        Attendance
                      </span>
                    </div>
                  </div>

                  {/* Export Buttons */}
                  <div className="flex justify-end gap-2 mb-4 me-2 md:me-8">
                    <button
                      onClick={exportToCSV}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      CSV
                    </button>
                    <button
                      onClick={exportToPDF}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </div>

                  {/* Attendance Table */}
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Day
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredAttendance.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-[12px] md:text-sm text-gray-900">
                                {formatDisplayDate(record.date)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-[12px] md:text-sm text-gray-600">
                                {getDayName(record.date)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[13px] font-medium ${
                                    record.status?.toLowerCase() === "present"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {record.status?.toLowerCase() === "present" ? (
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                  ) : (
                                    <XCircle className="w-3 h-3 mr-1" />
                                  )}
                                  {record.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No Records Found</h3>
                  <p className="text-xs text-gray-500">
                    No attendance records found for {getCurrentAcademicYearName()}
                    {selectedMonth && selectedMonth !== "all" && ` - ${monthNames[parseInt(selectedMonth) - 1]}`}.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CheckStdAtteTCH;