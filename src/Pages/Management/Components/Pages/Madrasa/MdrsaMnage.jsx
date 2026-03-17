import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  CalendarDays,
  Users,
  UserPlus,
  BookHeart,
  UserPlus2,
  School2,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  UsersRound,
  Heart,
  Award,
  Clock
} from 'lucide-react'

function MdrsaMnage() {
  // Sample data for different sections
  const [managementData] = useState([
    { id: 1, name: "Dr. Ahmed Khan", position: "Chairman", qualification: "Ph.D in Education", phone: "+91 98765 43210", email: "ahmed.khan@madrasa.edu", address: "123 Education Street, Mumbai", joinDate: "2020-01-15", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
    { id: 2, name: "Prof. Fatima Begum", position: "Vice Chairman", qualification: "M.A. Islamic Studies", phone: "+91 98765 43211", email: "fatima.begum@madrasa.edu", address: "456 Knowledge Avenue, Delhi", joinDate: "2020-03-20", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
    { id: 3, name: "Mr. Mohammed Rizwan", position: "Secretary", qualification: "MBA, B.Ed", phone: "+91 98765 43212", email: "rizwan.m@madrasa.edu", address: "789 Wisdom Road, Hyderabad", joinDate: "2021-06-10", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
  ])

  const [eventsData] = useState([
    { id: 1, title: "Annual Convocation 2024", date: "2024-04-15", time: "10:00 AM", venue: "Main Auditorium", description: "Annual graduation ceremony for final year students", status: "upcoming", attendees: 500, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop" },
    { id: 2, title: "Parent-Teacher Meeting", date: "2024-03-25", time: "02:00 PM", venue: "Academic Block", description: "Quarterly parent-teacher interaction session", status: "upcoming", attendees: 200, image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&h=300&fit=crop" },
    { id: 3, title: "Islamic Heritage Week", date: "2024-05-10", time: "09:00 AM", venue: "Cultural Center", description: "Celebrating Islamic art, culture and heritage", status: "planned", attendees: 1000, image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=500&h=300&fit=crop" }
  ])

  const [parentsData] = useState([
    { id: 1, name: "Abdul Rahman", child: "Ahmed Rahman", class: "10th Grade", phone: "+91 98765 43213", email: "a.rahman@email.com", address: "123 Family Street, Mumbai", occupation: "Business Owner", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { id: 2, name: "Aisha Khan", child: "Fatima Khan", class: "8th Grade", phone: "+91 98765 43214", email: "aisha.k@email.com", address: "456 Peace Avenue, Delhi", occupation: "Teacher", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop" },
    { id: 3, name: "Omar Farooq", child: "Yusuf Farooq", class: "12th Grade", phone: "+91 98765 43215", email: "omar.f@email.com", address: "789 Knowledge Park, Hyderabad", occupation: "Engineer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" }
  ])

  const [memorialData] = useState([
    { id: 1, name: "Maulana Abdul Kalam", role: "Founder", contribution: "Established the madrasa in 1980", datePassed: "2020-08-15", legacy: "Served for 40 years, educated thousands of students", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
    { id: 2, name: "Hafiza Zainab Begum", role: "Head of Islamic Studies", contribution: "Pioneered women's education", datePassed: "2022-03-10", legacy: "Established first women's wing in 1995", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop" },
    { id: 3, name: "Professor Mohammed Ali", role: "Senior Faculty", contribution: "Quranic Studies expert", datePassed: "2021-11-20", legacy: "Authored 5 books on Islamic jurisprudence", image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop" }
  ])

  const [committeeData] = useState([
    { id: 1, name: "Dr. Syed Abbas", position: "Chairman", department: "Governing Body", term: "2024-2026", phone: "+91 98765 43216", email: "s.abbas@committee.edu", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae4?w=400&h=400&fit=crop" },
    { id: 2, name: "Prof. Mariam Ansari", position: "Academic Head", department: "Curriculum Committee", term: "2024-2025", phone: "+91 98765 43217", email: "m.ansari@committee.edu", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop" },
    { id: 3, name: "Mr. Ibrahim Qureshi", position: "Finance Secretary", department: "Finance Committee", term: "2024-2026", phone: "+91 98765 43218", email: "i.qureshi@committee.edu", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" }
  ])

  const cards = [
    {
      to: "/management/add-management",
      label: "Add Management",
      icon: UserPlus2,
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      data: managementData
    },
    {
      to: "/management/events-management",
      label: "Events Management",
      icon: CalendarDays,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      data: eventsData
    },
    {
      to: "/management/view-parents",
      label: "View Parent Directory",
      icon: Users,
      bg: "bg-sky-100",
      text: "text-sky-600",
      data: parentsData
    },
    {
      to: "/management/add-parents",
      label: "Add Parent Directory",
      icon: UserPlus,
      bg: "bg-amber-100",
      text: "text-amber-600",
      data: parentsData
    },
    {
      to: "/management/add-memorial",
      label: "Add Memorial",
      icon: BookHeart,
      bg: "bg-rose-100",
      text: "text-rose-600",
      data: memorialData
    },
    {
      to: "/management/add-committee",
      label: "Madrasa Committee",
      icon: School2,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      data: committeeData
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      
      {/* Header */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 text-white mb-3">
        <div className="mx-auto ">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white md:text-2xl">
                MadrasaPage Dashboard
              </h1>
              <p className="text-xs text-white/90">
                Manage Activities Related to Madrasa
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
                                flex items-center justify-center mb-2 relative`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${card.text}`} />
                  {/* {card.data && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {card.data.length}
                    </span>
                  )} */}
                </div>

                <span className="text-[14px] md:text-sm text-slate-700 text-center">
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

export default MdrsaMnage