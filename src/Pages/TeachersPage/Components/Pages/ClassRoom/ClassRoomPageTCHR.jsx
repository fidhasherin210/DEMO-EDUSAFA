import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  School,           
  BellPlus,         
  CalendarClock,
  User,
  BookOpen,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

function ClassRoomPageTCHR() {
  // Sample data for classroom statistics
  const [classroomStats] = useState({
    totalStudents: 45,
    presentToday: 42,
    absentToday: 3,
    totalClasses: 8,
    completedToday: 5,
    pendingClasses: 3,
    upcomingEvents: 2,
    notifications: 4
  });

  // Sample data for today's schedule
  const [todaySchedule] = useState([
    { id: 1, period: "1st Period", subject: "Mathematics", time: "09:00 - 09:45", status: "completed", room: "Room 101" },
    { id: 2, period: "2nd Period", subject: "Physics", time: "09:45 - 10:30", status: "completed", room: "Room 103" },
    { id: 3, period: "3rd Period", subject: "Chemistry", time: "10:30 - 11:15", status: "completed", room: "Lab 1" },
    { id: 4, period: "4th Period", subject: "English", time: "11:30 - 12:15", status: "ongoing", room: "Room 102" },
    { id: 5, period: "5th Period", subject: "Islamic Studies", time: "12:15 - 13:00", status: "upcoming", room: "Room 104" },
    { id: 6, period: "6th Period", subject: "Computer Science", time: "14:00 - 14:45", status: "upcoming", room: "Lab 2" },
    { id: 7, period: "7th Period", subject: "Physical Education", time: "14:45 - 15:30", status: "upcoming", room: "Ground" },
    { id: 8, period: "8th Period", subject: "Arabic", time: "15:30 - 16:15", status: "upcoming", room: "Room 105" }
  ]);

  // Sample data for recent notifications
  const [recentNotifications] = useState([
    { id: 1, title: "Parent-Teacher Meeting", date: "2024-03-25", priority: "high", read: false },
    { id: 2, title: "Staff Meeting", date: "2024-03-20", priority: "medium", read: true },
    { id: 3, title: "Exam Schedule Update", date: "2024-03-18", priority: "high", read: false },
    { id: 4, title: "Holiday Announcement", date: "2024-03-15", priority: "low", read: true }
  ]);

  // Sample data for students on leave
  const [studentsOnLeave] = useState([
    { id: 1, name: "Ahmed Khan", class: "10th Grade", reason: "Sick leave", days: 2 },
    { id: 2, name: "Fatima Begum", class: "9th Grade", reason: "Family function", days: 1 },
    { id: 3, name: "Mohammed Ali", class: "8th Grade", reason: "Medical appointment", days: 1 }
  ]);

  const cards = [
    {
      to: "/teacher/classroom",
      label: "Check Class Room",
      icon: School,
      bg: "bg-blue-100",
      text: "text-blue-600",
      count: classroomStats.totalStudents
    },
    {
      to: "/teacher/give-notification",
      label: "Add Notification",
      icon: BellPlus,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      count: recentNotifications.filter(n => !n.read).length
    },
    {
      to: "/teacher/add-timetable",
      label: "Add TimeTables",
      icon: CalendarClock,
      bg: "bg-rose-100",
      text: "text-rose-600",
      count: todaySchedule.length
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
                ClassRoom Dashboard
              </h1>
              <p className="text-xs text-white/90">
                Manage Activities Related to ClassRoom
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
                              hover:shadow-md hover:-translate-y-1 relative">

                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${card.bg} 
                                flex items-center justify-center mb-2`}>
                  <Icon className={`w-5 h-5 ${card.text}`} />
                </div>

                <span className="text-[14px] md:text-sm mt-1 text-slate-700 text-center">
                  {card.label}
                </span>

                {/* Notification badge */}
                {/* {card.count > 0 && card.label === "Add Notification" && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {card.count}
                  </span>
                )} */}
              </div>
            </Link>
          )
        })}
      </div>



    </div>
  )
}

export default ClassRoomPageTCHR