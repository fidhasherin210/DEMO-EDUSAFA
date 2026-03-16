import React from 'react'
import { Link } from 'react-router-dom'
import { UserCheck2, BookOpenCheck, ListCheck, User2 } from 'lucide-react'

function TchrPageManage() {

  const cards = [
  {
    to: "/management/mark-teacher-attendance",
    label: "Mark Attendance",
    icon: BookOpenCheck,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    to: "/management/teachers-attendance",
    label: "Check Attendance",
    icon: ListCheck,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    to: "/management/add-teacher",
    label: "Add Teacher",
    icon: User2,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  {
    to: "/management/teacher-info",
    label: "Teacher Info",
    icon: UserCheck2,
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
]

  // Sample data for demonstration
  const sampleTeachers = [
    { id: 1, name: "John Doe", subject: "Mathematics", attendance: "85%" },
    { id: 2, name: "Jane Smith", subject: "Physics", attendance: "92%" },
    { id: 3, name: "Robert Johnson", subject: "Chemistry", attendance: "78%" },
  ]

  const sampleAttendance = [
    { date: "2024-01-15", present: 25, absent: 3, leave: 2 },
    { date: "2024-01-16", present: 24, absent: 4, leave: 2 },
    { date: "2024-01-17", present: 26, absent: 2, leave: 2 },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-1">

      {/* Header */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-3">
        <div className="mx-auto ">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <User2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white md:text-2xl">
                Teachers Page Dashboard
              </h1>
              <p className="text-xs text-white/90">
                Manage Activities Related to Teachers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4 p-1">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <Link key={index} to={card.to} className="h-full">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 
                              flex flex-col items-center justify-center 
                              h-28 transition-all duration-300 
                              hover:shadow-md hover:-translate-y-1">

                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${card.bg} 
                                flex items-center justify-center mb-2`}>
                  <Icon className={`w-5 h-5 ${card.text}`} />
                </div>

                <span className="text-[14px] md:text-sm mt-1 text-slate-700 text-center">
                  {card.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Sample Data Display Section */}
      <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Sample Teacher Data</h2>
        
        {/* Teachers List */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-600 mb-2">Teachers List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Subject</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Attendance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sampleTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td className="px-4 py-2 text-sm text-slate-600">{teacher.id}</td>
                    <td className="px-4 py-2 text-sm text-slate-600">{teacher.name}</td>
                    <td className="px-4 py-2 text-sm text-slate-600">{teacher.subject}</td>
                    <td className="px-4 py-2 text-sm text-slate-600">{teacher.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance Records */}
        <div>
          <h3 className="text-sm font-medium text-slate-600 mb-2">Recent Attendance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Present</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Absent</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">On Leave</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sampleAttendance.map((record, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-slate-600">{record.date}</td>
                    <td className="px-4 py-2 text-sm text-green-600">{record.present}</td>
                    <td className="px-4 py-2 text-sm text-red-600">{record.absent}</td>
                    <td className="px-4 py-2 text-sm text-yellow-600">{record.leave}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TchrPageManage