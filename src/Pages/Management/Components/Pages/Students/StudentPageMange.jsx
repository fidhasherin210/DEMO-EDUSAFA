import React from 'react'
import { Link } from 'react-router-dom'
import {
  ClipboardCheck,
  User,
  BookOpen,
  CreditCard,
  User2
} from 'lucide-react'

function StudentPageMange() {

  const cards = [
    {
      to: "/management/students-attendance",
      label: "Attendance",
      icon: ClipboardCheck,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      to: "/management/students-info",
      label: "Personal Details",
      icon: User,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      to: "/management/students-progress",
      label: "Progress Report",
      icon: BookOpen,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      to: "/management/fee",
      label: "Fee Management",
      icon: CreditCard,
      bg: "bg-rose-100",
      text: "text-rose-600",
    },
    {
      to: "/management/old-students",
      label: "Old Students",
      icon: User2,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ]

  // Sample data for demonstration (optional - can be used for stats or notifications)
  const sampleStats = {
    totalStudents: 245,
    presentToday: 218,
    pendingFees: 12,
    progressReports: 89
  }

  const sampleRecentActivities = [
    { id: 1, student: 'Alice Johnson', activity: 'Submitted assignment', time: '5 mins ago' },
    { id: 2, student: 'Bob Smith', activity: 'Fee payment received', time: '1 hour ago' },
    { id: 3, student: 'Charlie Brown', activity: 'Progress report updated', time: '2 hours ago' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-1">
    
      {/* Header */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-3">
        <div className="mx-auto ">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white md:text-xl">
                Students Page Dashboard
              </h1>
              <p className="text-xs text-white/90">
                Manage Activities Related to Students
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

      {/* Optional: Quick Stats Section - You can add this if you want to show sample data */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-1">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
          <div className="text-xs text-gray-500">Total Students</div>
          <div className="text-lg font-bold text-blue-600">{sampleStats.totalStudents}</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
          <div className="text-xs text-gray-500">Present Today</div>
          <div className="text-lg font-bold text-green-600">{sampleStats.presentToday}</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
          <div className="text-xs text-gray-500">Pending Fees</div>
          <div className="text-lg font-bold text-rose-600">{sampleStats.pendingFees}</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
          <div className="text-xs text-gray-500">Progress Reports</div>
          <div className="text-lg font-bold text-purple-600">{sampleStats.progressReports}</div>
        </div>
      </div> */}

      {/* Optional: Recent Activities Section */}
      {/* <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Activities</h3>
        <div className="space-y-2">
          {sampleRecentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between text-xs">
              <div>
                <span className="font-medium text-gray-800">{activity.student}</span>
                <span className="text-gray-500 ml-2">{activity.activity}</span>
              </div>
              <span className="text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default StudentPageMange