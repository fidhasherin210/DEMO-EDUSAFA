import React from 'react'
import { Link } from 'react-router-dom'
import {
  ClipboardCheck,   
  ClipboardList,   
  TrendingUp,       
  CalendarDays,     
  CreditCard,       
  Users,
  User,           
  BookCheckIcon,
  BanknoteArrowUp
} from "lucide-react";

function StudentsPageTchr() {

const cards = [
  {
    to: "/teacher/mark-students-attendance",
    label: "Mark Attendance",
    icon: ClipboardCheck,   // ✅ Perfect
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    to: "/teacher/check-std-attendance",
    label: "Check Attendance",
    icon: ClipboardList,    // 👈 Better viewing/checking feel
    bg: "bg-emerald-100",
    text: "text-emerald-600",
  },
     {
    to: "/teacher/mark-progress",
    label: "Mark Progress",
    icon: BookCheckIcon ,
    bg: "bg-rose-100",
    text: "text-rose-600",
  },
  {
    to: "/teacher/check-progress",
    label: "Progress Report",
    icon: TrendingUp,       // 👈 Shows improvement/progress
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  {
    to: "/teacher/daily-routine",
    label: "Daily Routine",
    icon: CalendarDays,     // 👈 Schedule feeling
    bg: "bg-indigo-100",
    text: "text-indigo-600",
  },
    {
    to: "/teacher/fee",
    label: "Add Fee",
    icon: BanknoteArrowUp,
    bg: "bg-sky-100",
    text: "text-sky-600",
  },
  {
    to: "/teacher/Check-fee",
    label: "Check Fee",
    icon: CreditCard,
    bg: "bg-sky-100",
    text: "text-sky-600",
  },
  {
    to: "/teacher/students-info",
    label: "Students Info",
    icon: Users,            // 👈 Group/students representation
    bg: "bg-amber-100",
    text: "text-amber-600",
  },
];
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
    </div>
  )
}

export default StudentsPageTchr