import React, { useState, useEffect } from "react";

function ExamTopers() {
  const [topers, setTopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [termInfo, setTermInfo] = useState({ term: "Annual Examination", academic_year: "2024-2025" });

  // Sample exam toppers data
  const sampleExamTopers = [
    {
      class: "1",
      term: "Annual Examination",
      students: [
        {
          rank: 1,
          student_name: "Ahmed Muhammed",
          parent_name: "Muhammed Ali",
          total_marks: 485
        },
        {
          rank: 2,
          student_name: "Fatima Zahra",
          parent_name: "Yusuf Ahmed",
          total_marks: 478
        },
        {
          rank: 3,
          student_name: "Omar Farooq",
          parent_name: "Farooq Hassan",
          total_marks: 472
        }
      ]
    },
    {
      class: "2",
      term: "Annual Examination",
      students: [
        {
          rank: 1,
          student_name: "Aisha Rahman",
          parent_name: "Abdul Rahman",
          total_marks: 482
        },
        {
          rank: 2,
          student_name: "Zainab Ali",
          parent_name: "Ali Muhammed",
          total_marks: 476
        },
        {
          rank: 3,
          student_name: "Hassan Ahmed",
          parent_name: "Ahmed Hassan",
          total_marks: 469
        }
      ]
    },
    {
      class: "3",
      term: "Annual Examination",
      students: [
        {
          rank: 1,
          student_name: "Mariam Ibrahim",
          parent_name: "Ibrahim Khalil",
          total_marks: 492
        },
        {
          rank: 2,
          student_name: "Yusuf Muhammed",
          parent_name: "Muhammed Yusuf",
          total_marks: 488
        },
        {
          rank: 3,
          student_name: "Khadija Omar",
          parent_name: "Omar Hassan",
          total_marks: 481
        }
      ]
    }
  ];

  // Simulate fetching data
  useEffect(() => {
    const fetchTopers = () => {
      setLoading(true);
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        try {
          setTopers(sampleExamTopers);
          setTermInfo({
            term: "Annual Examination",
            academic_year: "2024-2025"
          });
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch exam toppers:", error);
          setTopers([]);
          setLoading(false);
        }
      }, 800); // Simulate network delay
    };

    fetchTopers();
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 mt-4 ms-3 px-2">
          <div className="w-1 h-5 md:h-7 bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full"></div>
          <div>
            <h3 className="text-xs md:text-base font-semibold text-gray-700">
              Top Rankers
            </h3>
            <p className="text-[9px] md:text-[10px] text-gray-400">
              {formattedDate} {termInfo.term && `• ${termInfo.term}`}
            </p>
          </div>
        </div>

        <span className="me-3 text-[8px] md:text-[14px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium border border-green-200">
          Live
        </span>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-blue-500">📊</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">Loading rankers...</p>
        </div>
      ) : topers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No exam results available yet
        </div>
      ) : (
        <>
          {/* 📱 Mobile */}
          <div className="md:hidden overflow-x-auto">
            <div className="flex">
              {topers.map((group, index) => (
                <div
                  key={index}
                  className="min-w-full px-1"
                >
                  <div className="bg-white rounded-lg shadow-lg pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-semibold text-gray-600 ms-2">
                        Class {group.class}
                      </h4>
                      {group.term && (
                        <span className="text-[10px] me-2 bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full">
                          {group.term}
                        </span>
                      )}
                    </div>

                    <table className="w-full text-left text-xs">
                      <thead className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                        <tr>
                          <th className="p-2">Rank</th>
                          <th className="p-2">Name</th>
                          <th className="p-2">Parent</th>
                          <th className="p-2">Marks</th>
                        </tr>
                      </thead>

                      <tbody>
                        {group.students.map((student, i) => (
                          <tr key={i} className="border-b">
                            <td className="px-2 text-gray-500">
                              {student.rank}
                            </td>
                            <td className="p-2 text-[13px]">
                              {student.student_name}
                            </td>
                            <td className="p-2 text-[13px] text-gray-500">
                              {student.parent_name}
                            </td>
                            <td className="p-2 text-green-700 font-semibold">
                              {student.total_marks}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🖥 Desktop */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-2 px-3">
            {topers.map((group, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-600">
                    Class {group.class}
                  </h4>

                  {group.term && (
                    <span className="text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full">
                      {group.term}
                    </span>
                  )}
                </div>

                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                    <tr>
                      <th className="p-2">Rank</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Parent</th>
                      <th className="p-2">Marks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {group.students.map((student, i) => (
                      <tr
                        key={i}
                        className="border-b hover:bg-gray-100 transition"
                      >
                        <td className="p-2 text-[13px] text-gray-500">
                          {student.rank}
                        </td>
                        <td className="p-2 text-[13px]">
                          {student.student_name}
                        </td>
                        <td className="p-2 text-[13px] text-gray-500">
                          {student.parent_name}
                        </td>
                        <td className="p-2 text-[13px] text-green-700 font-semibold">
                          {student.total_marks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ExamTopers;