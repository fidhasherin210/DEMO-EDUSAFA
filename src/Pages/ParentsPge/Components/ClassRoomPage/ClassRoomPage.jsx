import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import {
  School,        
  MessageCircle, 
  CalendarClock,
  User,
  BookOpen,
  Users,
  Clock,
  Mail,
  Phone,
  GraduationCap
} from "lucide-react";

function ClassRoomPage() {
  const { studentId } = useParams();
  
  // Sample student data based on studentId
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample students database
  const studentsDatabase = {
    "101": {
      id: "101",
      name: "Ahmed Raza",
      class: "10",
      rollNo: "101",
      place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s",
      attendance: "92%",
      teachers: [
        { name: "Abdul Rahman Al-Qasim", subject: "Fiqh", contact: "+91 98765 43210" },
        { name: " Muhammad Ibrahim", subject: "Islamic Studies", contact: "+91 98765 43211" },
        { name: "Hafiz Abdullah Khan", subject: "Thajweed", contact: "+91 98765 43212" }
      ],
     timetable: [
    { 
        day: "Monday", 
        periods: [
            "Fiqh", 
            "Tajweed", 
            "Tareekh", 
            "Akhlaq", 
           
            "Quran"
        ] 
    },
    { 
        day: "Tuesday", 
        periods: [
            "Tajweed", 
            "Fiqh", 
           "Tareekh", 
            "Akhlaq", 
        ]  
    },
    { 
        day: "Wednesday", 
        periods: [
            "Tareekh", 
            "Akhlaq", 
            "Fiqh", 
            "Quran", 
            "Tajweed", 
        
        ] 
    },
    { 
        day: "Thursday", 
        periods: [
            "Akhlaq", 
            "Tareekh", 
            "Quran", 
            "Fiqh", 
            "Tajweed", 
         
        ] 
    },
    { 
        day: "Friday", 
        periods: [
            "Quran", 
            "Fiqh", 
            "Tajweed", 
            "Arabic", 
            "Akhlaq", 
            
        ] 
    }
]
    },
    "102": {
      id: "102",
      name: "Fatima Zahra",
      class: "8",
     
      rollNo: "102",
      place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
      attendance: "88%",
      teachers: [
        { name: "Abdul Rahman Al-Qasim", subject: "Fiqh", contact: "+91 98765 43213" },
        { name: "Muhammad Ibrahim", subject: "Islamic Studies", contact: "+91 98765 43214" },
        { name: "Hafiz Abdullah Khan", subject: "Thajweed", contact: "+91 98765 43215" }
      ],
     timetable: [
    { 
        day: "Monday", 
        periods: [
            "Fiqh", 
            "Tajweed", 
            "Tareekh", 
            "Akhlaq", 
           
            "Quran"
        ] 
    },
    { 
        day: "Tuesday", 
        periods: [
            "Tajweed", 
            "Fiqh", 
           
            "Tareekh", 
            "Akhlaq", 
            
        ] 
    },
    { 
        day: "Wednesday", 
        periods: [
            "Tareekh", 
            "Akhlaq", 
            "Fiqh", 
            
            "Tajweed", 
           
        ] 
    },
    { 
        day: "Thursday", 
        periods: [
            "Akhlaq", 
            "Tareekh", 
           
            "Fiqh", 
            "Tajweed", 
           
        ] 
    },
    { 
        day: "Friday", 
        periods: [
            "Quran", 
            "Fiqh", 
            "Tajweed", 
            "Akhlaq", 
            
        ] 
    }
]
    },
   
  
  };

  // Sample classroom statistics
  const [classroomStats] = useState({
    totalStudents: 45,
    presentToday: 42,
    absentToday: 3,
    upcomingEvents: 2,
    nextClass: "Fiqh - 10:30 AM",
    homeworkPending: 3
  });

  // Sample recent messages
  const [recentMessages] = useState([
    { id: 1, from: "Dr. abdullah", message: "Parent-Teacher meeting on Friday", date: "2024-03-20", read: false },
    { id: 2, from: "Class Teacher", message: "Annual day preparation meeting", date: "2024-03-19", read: true },
    { id: 3, from: "Principal Office", message: "School will remain closed on Monday", date: "2024-03-18", read: false }
  ]);

  // Load student data on mount
  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      if (studentId && studentsDatabase[studentId]) {
        setStudentData(studentsDatabase[studentId]);
      } else {
        // Default to first student if ID not found
        setStudentData(studentsDatabase["101"]);
      }
      setLoading(false);
    }, 600);
  }, [studentId]);

  const cards = [
    {
      to: "/parent/classroom",
      label: "Check Class Room",
      icon: School,
      bg: "bg-blue-100",
      text: "text-blue-600",
      description: "View class activities and updates"
    },
    {
      to: studentId ? `/parent/contact-teacher/${studentId}` : "/parent/contact-teacher",
      label: "Contact Teacher",
      icon: MessageCircle,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      description: "Message your child's teachers",
      badge: recentMessages.filter(m => !m.read).length
    },
    {
      to: studentId ? `/parent/check-timetable/${studentId}` : "/parent/check-timetable",
      label: "TimeTables",
      icon: CalendarClock,
      bg: "bg-rose-100",
      text: "text-rose-600",
      description: "View class schedule and timing"
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-1">
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-3">
          <div className="mx-auto">
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
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

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
                {studentData ? `${studentData.name} • Class ${studentData.class}` : 'Manage Activities Related to ClassRoom'}
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

                {/* {card.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {card.badge}
                  </span>
                )} */}

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

export default ClassRoomPage