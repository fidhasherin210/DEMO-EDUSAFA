import React, { useState } from 'react'
import { Clock, Inbox, Mail, MailOpen, User } from 'lucide-react'

function Notification() {
  const [notifications, setNotifications] = useState([
   [
  {
    delivery_id: 1,
    title: 'Qur’an Class Reminder',
    text: 'Daily Qur’an recitation class will be held tomorrow at 7:00 AM in the madrasa hall. Please come prepared.',
    is_read: false,
    created_at: '2024-03-15T09:30:00'
  },
  {
    delivery_id: 2,
    title: 'New Syllabus Update',
    text: 'Updated madrasa syllabus for the new term has been announced. Students are requested to collect materials from the office.',
    is_read: false,
    created_at: '2024-03-14T14:15:00'
  },
  {
    delivery_id: 3,
    title: 'Holiday Notice',
    text: 'Madrasa will remain closed on Monday due to a religious holiday. Regular classes will resume the next day.',
    is_read: true,
    created_at: '2024-03-13T11:45:00'
  },
  {
    delivery_id: 4,
    title: 'Islamic Studies Workshop',
    text: 'Special workshop on Islamic values and teachings will be conducted this week. Attendance is highly encouraged.',
    is_read: true,
    created_at: '2024-03-12T10:00:00'
  },
  {
    delivery_id: 5,
    title: 'Parent Meeting',
    text: 'A meeting for parents will be held next week to discuss student progress. Please inform your guardians.',
    is_read: false,
    created_at: '2024-03-15T08:20:00'
  }
]
  ])

  const [isLoading, setIsLoading] = useState(false)

  // Mark Single Notification Read
  const markAsRead = async (deliveryId) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.delivery_id === deliveryId ? { ...n, is_read: true } : n,
      ),
    )
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-8xl mx-auto p-1">
        {/* Header */}
        <div className="px-3 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-2">
          <div className="mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Student Notifications
                </h1>
                <p className="text-xs text-white/90">
                  Stay updated with important announcements and updates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Inbox className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No notifications</p>
              <p className="text-sm text-gray-400 mt-1">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 ">
              {notifications.map((n) => (
                <div
                  key={n.delivery_id}
                  onClick={() => !n.is_read && markAsRead(n.delivery_id)}
                  className={`
      p-4 transition-all hover:bg-gray-50 cursor-pointer relative
      ${!n.is_read ? 'bg-blue-50/30' : ''}
    `}
                >
                  {/* Subtle unread indicator - small blue dot */}
                  {!n.is_read && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-700 rounded-full ml-2"></div>
                  )}

                  <div className="flex items-start gap-3 pl-3">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {n.is_read ? (
                        <MailOpen className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      ) : (
                        <Mail className="w-4 h-4 md:w-5 md:h-5 text-green-900" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <p
                        className={`
          text-sm text-[15px] mb-1
          ${!n.is_read ? 'font-semibold text-green-900' : 'text-gray-700 font-medium text-[15px]'}
        `}
                      >
                        {n.title || 'Notification'}
                      </p>

                      {/* Text/Message */}
                      {n.text && (
                        <p className="md:text-sm text-xs text-gray-600 mb-2 line-clamp-2">
                          {n.text}
                        </p>
                      )}

                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="md:w-3.5 md:h-3.5 w-2.5 h-2.5 text-gray-400" />
                        <span className="text-gray-500 md:text-xs text-[13px]">
                          {new Date(n.created_at).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        {notifications.length > 0 && (
          <p className="md:text-xs text-[12px] text-gray-400 text-center mt-4">
            Click on notifications to mark them as read
          </p>
        )}
      </div>
    </div>
  )
}

export default Notification