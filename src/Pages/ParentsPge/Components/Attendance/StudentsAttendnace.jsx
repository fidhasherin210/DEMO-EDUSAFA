import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Users,
  XCircle,
  CheckCircle,
  Clock,
  FileText,
  FileDown,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function StudentsAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const { studentId } = useParams();

  const hasFetchedData = useRef(false);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Sample data
  const sampleAcademicYears = [
    { id: 1, year: "2023-2024", is_current: false },
    { id: 2, year: "2024-2025", is_current: true },
    { id: 3, year: "2025-2026", is_current: false },
  ];

  // Student names mapping for different IDs
  const studentNames = {
    101: "Ahmed Raza",
    102: "Fatima Zahra",
    103: "Muhammad Salih",
    104: "Aisha Begum",
    201: "Zainab Ali",
    202: "Hamza Yusuf",
    301: "Ibrahim Khalil",
  };

  const sampleAttendanceRecords = {
    1: [ // 2023-2024
      { id: 1, date: "2024-01-15", status: "Present", remarks: "On time" },
      { id: 2, date: "2024-01-16", status: "Present", remarks: "On time" },
      { id: 3, date: "2024-01-17", status: "Absent", remarks: "Sick leave" },
      { id: 4, date: "2024-01-18", status: "Present", remarks: "On time" },
      { id: 5, date: "2024-01-19", status: "Present", remarks: "On time" },
      { id: 6, date: "2024-01-22", status: "Present", remarks: "On time" },
      { id: 7, date: "2024-01-23", status: "Present", remarks: "On time" },
      { id: 8, date: "2024-01-24", status: "Absent", remarks: "Medical appointment" },
      { id: 9, date: "2024-01-25", status: "Present", remarks: "On time" },
      { id: 10, date: "2024-01-26", status: "Present", remarks: "On time" },
      { id: 11, date: "2024-02-01", status: "Present", remarks: "On time" },
      { id: 12, date: "2024-02-02", status: "Present", remarks: "On time" },
      { id: 13, date: "2024-02-03", status: "Present", remarks: "On time" },
      { id: 14, date: "2024-02-04", status: "Absent", remarks: "Family function" },
      { id: 15, date: "2024-02-05", status: "Present", remarks: "On time" },
    ],
    2: [ // 2024-2025
      { id: 16, date: "2024-08-01", status: "Present", remarks: "First day" },
      { id: 17, date: "2024-08-02", status: "Present", remarks: "On time" },
      { id: 18, date: "2024-08-03", status: "Present", remarks: "On time" },
      { id: 19, date: "2024-08-04", status: "Absent", remarks: "Not feeling well" },
      { id: 20, date: "2024-08-05", status: "Present", remarks: "On time" },
      { id: 21, date: "2024-08-08", status: "Present", remarks: "On time" },
      { id: 22, date: "2024-08-09", status: "Present", remarks: "On time" },
      { id: 23, date: "2024-08-10", status: "Present", remarks: "On time" },
      { id: 24, date: "2024-08-11", status: "Present", remarks: "On time" },
      { id: 25, date: "2024-08-12", status: "Absent", remarks: "Doctor appointment" },
      { id: 26, date: "2024-09-01", status: "Present", remarks: "On time" },
      { id: 27, date: "2024-09-02", status: "Present", remarks: "On time" },
      { id: 28, date: "2024-09-03", status: "Absent", remarks: "Family vacation" },
      { id: 29, date: "2024-09-04", status: "Absent", remarks: "Family vacation" },
      { id: 30, date: "2024-09-05", status: "Present", remarks: "On time" },
    ],
    3: [ // 2025-2026
      { id: 31, date: "2025-01-10", status: "Present", remarks: "On time" },
      { id: 32, date: "2025-01-11", status: "Present", remarks: "On time" },
      { id: 33, date: "2025-01-12", status: "Present", remarks: "On time" },
      { id: 34, date: "2025-01-13", status: "Absent", remarks: "Weather conditions" },
      { id: 35, date: "2025-01-14", status: "Present", remarks: "On time" },
    ],
  };

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

  // Fetch academic years (simulated)
  const fetchAcademicYears = useCallback(async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const years = sampleAcademicYears;
    setAcademicYears(years);
    
    const current = years.find(year => year.is_current) || years[0];
    if (current) {
      setSelectedAcademicYear(current.id.toString());
    } else if (years.length > 0) {
      setSelectedAcademicYear(years[0].id.toString());
    }
  }, []);

  // Fetch attendance data with filters (simulated)
  const fetchAttendanceData = useCallback(async (academicYearId = selectedAcademicYear) => {
    if (!studentId || !academicYearId) return;
    
    setIsFilterLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Get sample data for the selected academic year
    const yearId = parseInt(academicYearId);
    const records = sampleAttendanceRecords[yearId] || [];
    
    setAttendance(records);
    setStudentInfo({
      id: studentId,
      academic_year: academicYearId,
      name: studentNames[studentId] || "John Doe" // Sample student name based on ID
    });
    
    setIsFilterLoading(false);
  }, [studentId, selectedAcademicYear]);

  // Initial data load
  useEffect(() => {
    if (hasFetchedData.current) return;
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchAcademicYears();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
        hasFetchedData.current = true;
      }
    };
    
    loadData();
    
    return () => {
      hasFetchedData.current = false;
    };
  }, [fetchAcademicYears]);

  // Fetch attendance when academic year is selected
  useEffect(() => {
    if (selectedAcademicYear && studentId) {
      fetchAttendanceData(selectedAcademicYear);
    }
  }, [selectedAcademicYear, studentId, fetchAttendanceData]);

  // Handle filter changes
  const handleAcademicYearChange = (e) => {
    const yearId = e.target.value;
    setSelectedAcademicYear(yearId);
    setSelectedMonth("");
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
      (record) => record.status.toLowerCase() === "present"
    ).length,
    absent: filteredAttendance.filter(
      (record) => record.status.toLowerCase() === "absent"
    ).length,
    total: filteredAttendance.length,
    percentage: filteredAttendance.length > 0
      ? Math.round((filteredAttendance.filter(r => r.status.toLowerCase() === "present").length / filteredAttendance.length) * 100)
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
    doc.text(`Student Name: ${studentInfo?.name || 'N/A'}`, 14, 25);
    
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
    doc.save(`attendance-${studentId}-${academicYearStr}${monthStr}.pdf`);
  };

  // Get current academic year display name
  const getCurrentAcademicYearName = () => {
    const year = academicYears.find(y => y.id.toString() === selectedAcademicYear);
    return year ? year.year : '';
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading attendance records...</p>
        </div>
      </div>
    );
  }

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
                Check My Attendance
              </h1>
              <p className="text-xs text-white/90">View your daily and monthly attendance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
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
                                  record.status.toLowerCase() === "present"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {record.status.toLowerCase() === "present" ? (
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
    </div>
  );
}

export default StudentsAttendance;