import React, { useState, useEffect } from "react";

function ProgressGraph({ studentId = "101", backendUrl = "" }) {
  const [performanceData, setPerformanceData] = useState([]);

  // Sample performance data
  const samplePerformanceData = [
    {
      academicYear: "2024-2025",
      standard: "5",
      terms: [
        { name: "Term 1", percentage: 85 },
        { name: "Term 2", percentage: 78 },
        { name: "Term 3", percentage: 92 },
      ]
    },
    {
      academicYear: "2023-2024",
      standard: "4",
      terms: [
        { name: "Term 1", percentage: 72 },
        { name: "Term 2", percentage: 68 },
        { name: "Term 3", percentage: 75 },
      ]
    },
    {
      academicYear: "2022-2023",
      standard: "3",
      terms: [
        { name: "Term 1", percentage: 65 },
        { name: "Term 2", percentage: 70 },
        { name: "Term 3", percentage: 62 },
      ]
    },
    {
      academicYear: "2021-2022",
      standard: "2",
      terms: [
        { name: "Term 1", percentage: 55 },
        { name: "Term 2", percentage: 60 },
        { name: "Term 3", percentage: 58 },
      ]
    },
  ];

  useEffect(() => {
    if (studentId) {
      // Simulate API call with timeout
      setTimeout(() => {
        setPerformanceData(samplePerformanceData);
      }, 500);
    }
  }, [studentId]);

  // ✅ SAME LOGIC (unchanged)
  const allTerms = performanceData.flatMap((year) =>
    year.terms.map((term, index) => ({
      ...term,
      academicYear: year.academicYear,
      standard: year.standard,
      showYear: index === 0
    }))
  );

  const chartHeight = 340;
  const minValue = 20;
  const maxValue = 100;

  const spacing = 110;
  const chartWidth =
    allTerms.length > 0
      ? spacing * (allTerms.length - 1) + 80
      : 400;

  const getX = (index) => index * spacing + 40;

  const getY = (value) =>
    chartHeight -
    ((value - minValue) / (maxValue - minValue)) * chartHeight;

  const linePath = allTerms
    .map(
      (term, i) =>
        `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(term.percentage)}`
    )
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${getX(allTerms.length - 1)} ${chartHeight}
    L 40 ${chartHeight}
    Z
  `;

  // ✅ Statistics
  const totalTerms = allTerms.length;

  const totalPercentage = allTerms.reduce(
    (sum, item) => sum + item.percentage,
    0
  );

  const averagePercentage =
    totalTerms > 0
      ? (totalPercentage / totalTerms).toFixed(1)
      : 0;

  const highestPercentage =
    totalTerms > 0
      ? Math.max(...allTerms.map((t) => t.percentage))
      : 0;

  const passedCount = allTerms.filter(
    (t) => t.percentage >= 75
  ).length;

  const failedCount = totalTerms - passedCount;

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm p-2">

      {/* Header */}
      <div className="flex items-center gap-2 mb-5 mt-5 ms-3">
        <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
        <div>
          <h3 className="text-xs md:text-base font-semibold text-gray-700">
            Performance Trend
          </h3>
          <p className="text-[9px] md:text-[12px] text-gray-400">
            Academic year Wise Performance
          </p>
        </div>
      </div>

      {/* If no data */}
      {totalTerms === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          No performance records available
        </div>
      ) : (
        <>
          {/* Graph */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin p-3">
            <div style={{ minWidth: chartWidth }}>
              <svg width={chartWidth} height={chartHeight + 90}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.03" />
                  </linearGradient>
                </defs>

                {[20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => (
                  <g key={tick}>
                    <line
                      x1="0"
                      x2={chartWidth}
                      y1={getY(tick)}
                      y2={getY(tick)}
                      stroke="#e5e7eb"
                      strokeDasharray="4 4"
                    />
                    <text x="5" y={getY(tick) - 4} fontSize="11" fill="#9ca3af">
                      {tick}%
                    </text>
                  </g>
                ))}

                <path d={areaPath} fill="url(#areaGradient)" />

                <path
                  d={linePath}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {allTerms.map((term, i) => (
                  <g key={i}>
                    <circle
                      cx={getX(i)}
                      cy={getY(term.percentage)}
                      r="5"
                      fill="white"
                      stroke="#2563eb"
                      strokeWidth="2"
                    />

                    <text
                      x={getX(i)}
                      y={getY(term.percentage) - 12}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#1f2937"
                    >
                      {term.percentage}%
                    </text>

                    <text
                      x={getX(i)}
                      y={chartHeight + 20}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#6b7280"
                    >
                      {term.name}
                    </text>

                    {term.showYear && (
                      <>
                        <text
                          x={getX(i)}
                          y={chartHeight + 35}
                          textAnchor="middle"
                          fontSize="12"
                          fill="#9ca3af"
                        >
                          {term.academicYear}
                        </text>

                        <rect
                          x={getX(i) - 20}
                          y={chartHeight + 42}
                          width="40"
                          height="18"
                          rx="8"
                          fill="#eff6ff"
                        />

                        <text
                          x={getX(i)}
                          y={chartHeight + 54}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="600"
                          fill="#2563eb"
                        >
                          Std {term.standard}
                        </text>
                      </>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-5 ms-3">
            <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
            <div>
              <h3 className="text-xs md:text-base font-semibold text-gray-700">
                Progress Statistics
              </h3>
              <p className="text-[9px] md:text-[12px] text-gray-400">
                Statistics of all Progress
              </p>
            </div>
          </div>
          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-1 px-2">
            <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl py-3 px-1 border border-blue-100/50">
              <span className="text-base font-bold text-blue-600">
                {totalTerms}
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5">
                Total Terms
              </span>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl py-3 px-1 border border-amber-100/50">
              <span className="text-base font-bold text-amber-600">
                {averagePercentage}%
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5">
                Average
              </span>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl py-3 px-1 border border-purple-100/50">
              <span className="text-base font-bold text-purple-600">
                {highestPercentage}%
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5">
                Highest
              </span>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl py-3 px-1 border border-green-100/50">
              <span className="text-base font-bold text-green-600">
                {passedCount}
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5">
                Passed
              </span>
              <div className="mt-1 text-[10px] font-medium text-red-400">
                {failedCount} failed
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <div>
              Current:{" "}
              <span className="text-blue-600 font-medium">
                {highestPercentage}%
              </span>
            </div>
            <div>
              Average:{" "}
              <span className="text-green-600 font-medium">
                {averagePercentage}%
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProgressGraph;