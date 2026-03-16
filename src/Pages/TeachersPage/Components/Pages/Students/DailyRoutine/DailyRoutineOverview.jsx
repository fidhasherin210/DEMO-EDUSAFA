import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DailyRoutineOverview({ studentId, academicYearId: propAcademicYearId = null }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({ total: 0, avg: 0 });
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(propAcademicYearId);

  // Sample academic years data
  const sampleAcademicYears = [
    { id: 1, year: "2022-2023", is_current: false },
    { id: 2, year: "2023-2024", is_current: false },
    { id: 3, year: "2024-2025", is_current: true }
  ];

  // Sample routine data generator
  const generateSampleRoutineData = (yearId) => {
    // Different data patterns for different academic years
    const yearPatterns = {
      1: [65, 78, 82, 95, 88, 92, 105, 98, 110, 115, 108, 120], // 2022-23 - Improving
      2: [95, 102, 118, 125, 138, 142, 155, 148, 160, 168, 172, 180], // 2023-24 - Better
      3: [145, 158, 172, 185, 198, 212, 225, 238, 245, 258, 265, 280] // 2024-25 - Excellent
    };

    const pattern = yearPatterns[yearId] || yearPatterns[3];
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return months.map((month, index) => ({
      month: month.substring(0, 3),
      points: pattern[index]
    }));
  };

  // Load academic years on mount
  useEffect(() => {
    setAcademicYears(sampleAcademicYears);
    
    // Set default selection if not provided via props
    if (!propAcademicYearId) {
      const current = sampleAcademicYears.find(year => year.is_current) || sampleAcademicYears[0];
      if (current) {
        setSelectedAcademicYear(current.id.toString());
      }
    } else {
      setSelectedAcademicYear(propAcademicYearId.toString());
    }
  }, [propAcademicYearId]);

  // Load routine data when selectedAcademicYear changes
  useEffect(() => {
    const loadRoutineData = async () => {
      if (!selectedAcademicYear) return;
      
      setLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate sample data based on selected year
        const formattedData = generateSampleRoutineData(parseInt(selectedAcademicYear));
        
        setChartData(formattedData);
        
        if (formattedData.length > 0) {
          const total = formattedData.reduce((sum, item) => sum + item.points, 0);
          const avg = Math.round(total / formattedData.length);
          setSummary({ total, avg });
        }
      } catch (err) {
        console.error("Error loading routine data:", err);
        setError("Failed to load routine data");
      } finally {
        setLoading(false);
      }
    };

    loadRoutineData();
  }, [selectedAcademicYear]);

  // Handle academic year change
  const handleAcademicYearChange = (e) => {
    setSelectedAcademicYear(e.target.value);
  };

  if (loading) {
    return (
      <div className="w-full h-full min-h-[300px] p-3 md:p-6 flex items-center justify-center bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
          <div className="text-gray-400 text-sm">Loading routine data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full min-h-[300px] p-3 md:p-6 flex items-center justify-center bg-white rounded-lg shadow-sm">
        <div className="text-red-400 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] p-5 md:p-6 flex flex-col bg-white rounded-lg shadow-sm">
      {/* Header with Academic Year Selector */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div>
            <h3 className="text-xs md:text-base font-semibold text-gray-700">Routine Summary</h3>
          </div>
        </div>
        
        {/* Enhanced Academic Year Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedAcademicYear || ''}
            onChange={handleAcademicYearChange}
            className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-xs md:text-sm text-gray-700"
          >
            <option value="" disabled>Select Academic Year</option>
            {academicYears.map((year) => (
              <option key={year.id} value={year.id}>
                {year.year} {year.is_current ? '(Current)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full" style={{ height: "250px" }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRoutine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />

              <YAxis
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                width={30}
                ticks={[0, 50, 100, 150, 200, 250, 300]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                  padding: "8px 12px",
                }}
                labelStyle={{ color: "#374151", fontWeight: 600 }}
                formatter={(value) => [`${value} points`, 'Total']}
              />

              <Area
                type="monotone"
                dataKey="points"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRoutine)"
                activeDot={{ r: 6, fill: "#10b981", stroke: "white", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No routine data available
          </div>
        )}
      </div>
      
      {/* Summary stats */}
      {chartData.length > 0 && (
        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-100 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>Total: {summary.total} points</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-300 rounded-full"></span>
              <span>Monthly Avg: {summary.avg}</span>
            </div>
          </div>
          <span>Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      )}
    </div>
  );
}

export default DailyRoutineOverview;