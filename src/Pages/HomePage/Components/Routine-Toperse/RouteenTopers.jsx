import React, { useState, useEffect } from "react";

function RouteenTopers() {
  const [topers, setTopers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data
  const sampleTopers = [
    {
      name: "Jahaan",
      parent_name: "Muneer",
      class_name: " 1",
      total_points: 950
    },
    {
      name: "Emil zad",
      parent_name: "Salman",
      class_name: " 2",
      total_points: 890
    },
    {
      name: "Aysha",
      parent_name: "Qadar",
      class_name: " 3",
      total_points: 875
    },
    {
      name: "Salma ",
      parent_name: "Jafar",
      class_name: " 4",
      total_points: 820
    },
   
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setTopers(sampleTopers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2 mt-4 ms-3">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div className="">
            <h3 className="text-xs md:text-base font-semibold text-gray-700">
              Daily Routine Stars
            </h3>
            <p className="text-[9px] md:text-[10px] text-gray-400">
              Mon, 15 Feb
            </p>
          </div>
        </div>

        <span className="me-3 text-[8px] md:text-[14px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium border border-green-200">
          Live
        </span>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto px-1">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs sm:text-sm">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-1 text-left">Parent</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-1 text-left">Points</th>
              </tr>
            </thead>

            <tbody>
              {topers.length > 0 ? (
                topers.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="md:p-4 py-3 px-2 text-[13px] md:text-sm">{student.name}</td>
                    <td className="md:p-4 py-3 text-[13px] md:text-sm text-gray-500">{student.parent_name}</td>
                    <td className="md:p-4 py-3 text-[13px] md:text-sm">{student.class_name}</td>
                    <td className="md:p-4 py-3 font-semibold text-green-700 text-xs md:text-sm">
                      {student.total_points}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-xs md:text-sm p-4 text-center text-gray-500"
                  >
                    No routine toppers available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RouteenTopers;