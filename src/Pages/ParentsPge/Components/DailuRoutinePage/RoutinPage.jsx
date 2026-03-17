import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import {
  CalendarCheck,   
  CalendarDays,  
  User    
} from "lucide-react";

function RoutinPage() {
  const { studentId } = useParams()

  // Sample data for the cards
  const cards = [
    {
      to: `/parent/mark-routine/${studentId || 'sample-student-123'}`,
      label: "Mark Routine",
      icon: CalendarCheck,   
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      to: `/parent/check-routine/${studentId || 'sample-student-123'}`,
      label: "Check Routine",
      icon: CalendarDays,   
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
  ];

  // Sample routine data (if needed for any future functionality)
  const sampleRoutines = {
    markRoutine: {
      id: 1,
      studentId: studentId || 'sample-student-123',
      studentName: "Jafar",
      routine: [
        { day: "Monday", subject: "Fiqh", time: "09:00 AM" },
        { day: "Tuesday", subject: "Ahlaq", time: "10:00 AM" },
      ]
    },
    checkRoutine: {
      id: 2,
      studentId: studentId || 'sample-student-123',
      studentName: "Jafar",
      routine: [
        { day: "Monday", subject: "Fiqh", time: "09:00 AM", teacher: "Muhammed" },
        { day: "Tuesday", subject: "Ahlaq", time: "10:00 AM", teacher: "Aboobakkar" },
        { day: "Wednesday", subject: "Thajweed", time: "11:00 AM", teacher: "Rasaq" },
        { day: "Thursday", subject: "Thareeh", time: "09:00 AM", teacher: "Mujeeb" },
        { day: "Friday", subject: "Quran", time: "10:00 AM", teacher: "Mahaboob" },
      ]
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      {/* Header */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-3">
        <div className="mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white md:text-xl">
                Routine Dashboard
              </h1>
              <p className="text-xs text-white/90">
                Manage Activities Related to Routine
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Info Card (Optional - shows current student) */}
      {studentId && (
        <div className="mb-4 p-3 bg-white rounded-xl shadow-sm border border-slate-100 mx-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Current Student ID</p>
              <p className="text-sm font-medium text-slate-800">{studentId}</p>
            </div>
          </div>
        </div>
      )}

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

      {/* Quick Stats Section (Optional enhancement without changing design) */}
      
    </div>
  )
}

export default RoutinPage