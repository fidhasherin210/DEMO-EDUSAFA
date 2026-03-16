import React, { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function RoutineSummary({ studentId }) {
  const [summary, setSummary] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Sample routine data generator based on student ID
  const generateSampleRoutineData = (id) => {
    // Different performance patterns for different students
    const studentPatterns = {
      // Student 101 - Ahmed Khan - Consistent performer
      "101": [
        { month: "Jan", total: 145, is_future: false },
        { month: "Feb", total: 156, is_future: false },
        { month: "Mar", total: 172, is_future: false },
        { month: "Apr", total: 134, is_future: false },
        { month: "May", total: 185, is_future: false },
        { month: "Jun", total: 192, is_future: false },
        { month: "Jul", total: 228, is_future: false },
        { month: "Aug", total: 245, is_future: false },
        { month: "Sep", total: 274, is_future: false },
        { month: "Oct", total: null, is_future: true },
        { month: "Nov", total: null, is_future: true },
        { month: "Dec", total: null, is_future: true }
      ],
      // Student 102 - Fatima Begum - Improving trend
      "102": [
        { month: "Jan", total: 120, is_future: false },
        { month: "Feb", total: 135, is_future: false },
        { month: "Mar", total: 150, is_future: false },
        { month: "Apr", total: 128, is_future: false },
        { month: "May", total: 155, is_future: false },
        { month: "Jun", total: 162, is_future: false },
        { month: "Jul", total: 130, is_future: false },
        { month: "Aug", total: 195, is_future: false },
        { month: "Sep", total: 235, is_future: false },
        { month: "Oct", total: null, is_future: true },
        { month: "Nov", total: null, is_future: true },
        { month: "Dec", total: null, is_future: true }
      ],
      // Student 103 - Mohammed Rizwan - High performer
      "103": [
        { month: "Jan", total: 290, is_future: false },
        { month: "Feb", total: 295, is_future: false },
        { month: "Mar", total: 298, is_future: false },
        { month: "Apr", total: 292, is_future: false },
        { month: "May", total: 300, is_future: false },
        { month: "Jun", total: 298, is_future: false },
        { month: "Jul", total: 295, is_future: false },
        { month: "Aug", total: 300, is_future: false },
        { month: "Sep", total: null, is_future: true },
        { month: "Oct", total: null, is_future: true },
        { month: "Nov", total: null, is_future: true },
        { month: "Dec", total: null, is_future: true }
      ],
      // Default pattern for any other student ID
      "default": [
        { month: "Jan", total: 210, is_future: false },
        { month: "Feb", total: 225, is_future: false },
        { month: "Mar", total: 240, is_future: false },
        { month: "Apr", total: 235, is_future: false },
        { month: "May", total: 250, is_future: false },
        { month: "Jun", total: 265, is_future: false },
        { month: "Jul", total: 260, is_future: false },
        { month: "Aug", total: 275, is_future: false },
        { month: "Sep", total: null, is_future: true },
        { month: "Oct", total: null, is_future: true },
        { month: "Nov", total: null, is_future: true },
        { month: "Dec", total: null, is_future: true }
      ]
    };

    // Return pattern for specific student ID or default
    return studentPatterns[id] || studentPatterns["default"];
  };

  // Load routine data on mount or when studentId changes
  useEffect(() => {
    const fetchRoutineSummary = async () => {
      if (!studentId) {
        setError('No student selected')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Generate sample data based on student ID
        const sampleData = generateSampleRoutineData(studentId)
        
        setSummary(sampleData)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch Routine Summary:', err)
        setError('Failed to load Routine Summary')
      } finally {
        setLoading(false)
      }
    }

    fetchRoutineSummary()
  }, [studentId])

  // Prepare chart data - keep null for future months
  const chartData = summary.map((item) => ({
    month: item.month,
    total: item.is_future ? null : item.total,
  }))

  // Calculate total points and average
  const validPoints = summary.filter(item => !item.is_future && item.total !== null);
  const totalPoints = validPoints.reduce((sum, item) => sum + item.total, 0);
  const averagePoints = validPoints.length > 0 
    ? Math.round(totalPoints / validPoints.length) 
    : 0;

  if (loading) {
    return (
      <div className="w-full h-full p-3 md:p-6 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500 mb-2"></div>
        <div className="p-2 text-sm text-gray-400">
          Loading routine summary...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full p-3 md:p-6 flex items-center justify-center">
        <div className="text-sm text-red-400 bg-red-50 p-3 rounded-lg border border-red-100">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-3 md:p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div>
            <h3 className="text-xs md:text-base font-semibold text-gray-700">
              Routine Summary
            </h3>
            <p className="text-[9px] md:text-[10px] text-gray-400">
              Monthly Points
            </p>
          </div>
        </div>
        <span className="text-[8px] md:text-[14px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium border border-green-200">
          Live
        </span>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorRoutine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />

            <XAxis
              dataKey="month"
              interval={0}
              tick={{ fill: '#888', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: '#888', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={25}
              domain={[0, 300]}
              ticks={[0, 50, 100, 150, 200, 250, 300]}
            />

            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                fontSize: '11px',
                padding: '4px 8px',
              }}
              formatter={(value) => {
                if (value === null) return ['No data', 'Points'];
                return [`${value} points`, 'Total'];
              }}
            />

            <Area
              type="monotone"
              dataKey="total"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRoutine)"
              connectNulls={false}
              dot={{ r: 0.2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Footer */}
      {validPoints.length > 0 && (
        <div className="mt-2 flex items-center justify-between text-[8px] text-gray-400 border-t border-gray-100 pt-1">
          <div className="flex items-center gap-3">
            <span>Total: {totalPoints} pts</span>
            <span>Avg: {averagePoints} pts</span>
          </div>
          <span>Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      )}

      {/* Footer */}
      <div className="mt-1 flex justify-end text-[8px] text-gray-400">
        <span>Last updated: Today</span>
      </div>
    </div>
  )
}

export default RoutineSummary