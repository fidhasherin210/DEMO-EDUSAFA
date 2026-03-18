import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const ProgressOverView = ({ progressData, stats }) => {
  // Enhanced sample data with more realistic values
  const sampleProgressData = [
    {
      subject: "Fiqh",
      marks: "85",
      full_mark: "100",
      pass_mark: "33"
    },
    {
      subject: "Ahlaq",
      marks: "72",
      full_mark: "100",
      pass_mark: "33"
    },
    {
      subject: "Thajweed",
      marks: "68",
      full_mark: "100",
      pass_mark: "33"
    },
    {
      subject: "Thareeh",
      marks: "91",
      full_mark: "100",
      pass_mark: "33"
    },
   
  ]

  const sampleStats = {
    total_marks: 615,
    total_subjects: 8,
    average_marks: "76.9",
    total_students: 45,
    rank: 3,
    grade: "A"
  }

  // Alternative sample data for different scenarios (can be used based on props)
  const alternativeProgressData = [
     {
      subject: "Fiqh",
      marks: "35",
      full_mark: "100",
      pass_mark: "33"
    },
    {
      subject: "Ahlaq",
      marks: "42",
      full_mark: "100",
      pass_mark: "33"
    },
    {
      subject: "Thajweed",
      marks: "68",
      full_mark: "100",
      pass_mark: "33"
    },
    {
      subject: "Thareeh",
      marks: "71",
      full_mark: "100",
      pass_mark: "33"
    },
  ]

  // Use provided data or fallback to sample data
  // You can change which sample data to use based on some condition
  // For example, if you want to show a failing scenario, use alternativeProgressData
  const effectiveProgressData = progressData || sampleProgressData
  const effectiveStats = stats || sampleStats

  // If no data or empty array, show placeholder
  if (!effectiveProgressData || effectiveProgressData.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">
            No performance data available
          </p>
        </div>
      </div>
    )
  }

  // Function to get color based on mark
  const getMarkColor = (mark) => {
    if (mark >= 75) return '#10B981' // Green
    if (mark >= 50) return '#84CC16' // Light Green
    if (mark >= 33) return '#F59E0B' // Orange
    return '#EF4444' // Red
  }

  // Transform the progress data to match chart format
  const chartData = effectiveProgressData.map((item, index) => {
    const mark = parseFloat(item.marks) || 0
    return {
      subject: item.subject || `Subject ${index + 1}`,
      mark: mark,
      fill: getMarkColor(mark),
      fullMark: parseFloat(item.full_mark) || 100,
      passMark: parseFloat(item.pass_mark) || 33,
      percentage: ((mark / (parseFloat(item.full_mark) || 100)) * 100).toFixed(
        1,
      ),
    }
  })

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const passStatus = data.mark >= data.passMark ? 'Passed' : 'Failed'
      const statusColor = data.mark >= data.passMark ? '#10B981' : '#EF4444'

      return (
        <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-2xl border border-gray-100">
          <p className="font-semibold text-gray-800 text-sm">{label}</p>
          <div className="flex items-center gap-3 mt-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: data.fill }}
            />
            <p className="text-lg font-bold" style={{ color: data.fill }}>
              {data.mark}{' '}
              <span className="text-xs text-gray-500 font-normal">
                / {data.fullMark}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">
              {data.percentage}% achieved -{' '}
            </p>
            <p className="text-xs font-medium" style={{ color: statusColor }}>
              {passStatus} (Min: {data.passMark})
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  // Calculate total marks from progressData if stats not provided
  const totalMarks = effectiveProgressData.reduce(
    (sum, item) => sum + (parseFloat(item.marks) || 0),
    0,
  )
  const totalFullMarks = effectiveProgressData.reduce(
    (sum, item) => sum + (parseFloat(item.full_mark) || 100),
    0,
  )
  const totalPercentage =
    totalFullMarks > 0 ? ((totalMarks / totalFullMarks) * 100).toFixed(1) : 0

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Main Chart Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-2 pt-3 border border-gray-100">
        {/* Header with gradient */}
        <div className="flex items-center gap-2 mb-4 mt-4 ms-3">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div className="">
            <h3 className="text-xs md:text-base font-semibold text-gray-700">
              Detailed Analysis
            </h3>
            <p className="text-[9px] md:text-[12px] text-gray-400">
              Subject Wise Performance
            </p>
          </div>
        </div>

        {/* Chart Container with subtle gradient background */}
        <div className="h-56 w-full bg-gradient-to-b from-gray-50/50 to-white rounded-xl p-1">
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                horizontal={true}
                vertical={false}
                stroke="#E5E7EB"
                strokeDasharray="3 3"
                opacity={0.4}
              />
              <XAxis
                dataKey="subject"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 11 }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="mark" radius={[8, 8, 0, 0]} barSize={28}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject chips - horizontal scroll on mobile */}
        <div className="mt-5 overflow-x-auto pb-1 hide-scrollbar">
          <div className="flex gap-2 min-w-min mb-2">
            {chartData.map((item) => (
              <div
                key={item.subject}
                className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100 shadow-sm"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  {item.subject}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: item.fill }}
                >
                  {item.mark}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mark Legend */}
        <div className="mt-3 flex justify-center gap-3 text-[10px]">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-gray-500">75+</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#84CC16]" />
            <span className="text-gray-500">50-74</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="text-gray-500">33-49</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-gray-500">Below 33</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 mt-6 ms-3">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div className="">
            <h3 className="text-xs md:text-base font-semibold text-gray-700">
              Performance Summary
            </h3>
            <p className="text-[9px] md:text-[12px] text-gray-400">
              Summary with eligible status
            </p>
          </div>
        </div>

        <div className="px-5 py-4 mt-3">
          <div className="grid grid-cols-4 gap-1 mb-3">
            {/* Total Marks */}
            <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl py-3 px-1 border border-blue-100/50">
              <span className="text-base font-bold text-blue-600">
                {effectiveStats?.total_marks || totalMarks}
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                Total Marks
              </span>
            </div>

            {/* Total Subjects */}
            <div className="flex flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl py-3 px-1 border border-purple-100/50">
              <span className="text-lg font-bold text-purple-600">
                {effectiveStats?.total_subjects || effectiveProgressData.length}
              </span>
              <span className="text-[12px] md:text-xs text-gray-500 mt-0.5">Subjects</span>
            </div>

            {/* Average Marks */}
            <div className="flex pt-4 flex-col items-center bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl py-3 px-1 border border-amber-100/50">
              <span className="text-base font-bold text-amber-600">
                {effectiveStats?.average_marks ||
                  (totalMarks / effectiveProgressData.length).toFixed(1)}
              </span>
              <span className="text-[12px] md:text-xs text-gray-500 mt-0.5">Average</span>
            </div>

            {/* Pass/Fail Summary */}
            <div className="flex flex-col items-center bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl py-3 px-1 border border-green-100/50">
              <span className="text-base font-bold text-green-600">
                {chartData.filter((item) => item.mark >= item.passMark).length}
              </span>
              <span className="text-[12px] text-gray-500 mt-0.5">Passed</span>
              <div className="mt-1 text-[12px] font-medium text-red-400">
                {chartData.filter((item) => item.mark < item.passMark).length}{' '}
                failed
              </div>
            </div>
          </div>

          {/* Eligibility Badge */}
          <div className="mt-4">
            <div
              className={`flex items-center justify-between px-3 py-2 rounded-xl ${
                chartData.filter((item) => item.mark < item.passMark).length ===
                0
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50/50 border border-green-200'
                  : 'bg-gradient-to-r from-red-50 to-orange-50/50 border border-red-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    chartData.filter((item) => item.mark < item.passMark)
                      .length === 0
                      ? 'bg-green-200'
                      : 'bg-red-200'
                  }`}
                >
                  {chartData.filter((item) => item.mark < item.passMark)
                    .length === 0 ? (
                    <svg
                      className="w-4 h-4 text-green-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-red-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p
                    className={`text-[12px] md:text-xs font-semibold ${
                      chartData.filter((item) => item.mark < item.passMark)
                        .length === 0
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}
                  >
                    {chartData.filter((item) => item.mark < item.passMark)
                      .length === 0
                      ? 'Eligible for higher study'
                      : 'Not eligible for higher study'}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {chartData.filter((item) => item.mark < item.passMark)
                      .length === 0
                      ? 'Congratulations! You meet all requirements'
                      : `Failed in ${
                          chartData.filter((item) => item.mark < item.passMark)
                            .length
                        } subject(s)`}
                  </p>
                </div>
              </div>
              <div
                className={`md:text-xs text-[13px] font-bold px-2 py-1 rounded-full ${
                  chartData.filter((item) => item.mark < item.passMark)
                    .length === 0
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {chartData.filter((item) => item.mark < item.passMark)
                  .length === 0
                  ? 'PASS'
                  : 'FAIL'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressOverView