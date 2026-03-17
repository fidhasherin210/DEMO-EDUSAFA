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



    </div>
  )
}

export default TchrPageManage