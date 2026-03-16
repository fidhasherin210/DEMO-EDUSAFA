// ProgressGraph.jsx - Updated version without backend
import React from 'react'

const ProgressGraph = ({ id }) => {
  // Sample data for the graph
  const sampleGraphData = {
    labels: ['Fiqh', 'Ahlaq', 'Thajweed', 'Thareeh', ],
    values: [85, 92, 78, 88]
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Progress Graph</h3>
      <div className="h-64 flex items-end justify-around gap-2">
        {sampleGraphData.values.map((value, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div 
              className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
              style={{ height: `${value}px` }}
            >
              <div className="text-xs text-white text-center pt-1">{value}%</div>
            </div>
            <span className="text-xs mt-2 text-gray-600">
              {sampleGraphData.labels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressGraph