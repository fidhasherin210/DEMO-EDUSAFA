import React, { useState, useEffect } from 'react';
import { Trash2, Calendar, AlertCircle } from 'lucide-react';

function DeleteSTDNoti() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample student notifications
  const sampleNotifications = [
    {
      id: 1,
      title: "Exam Schedule",
      message: "Final term exams start from April 15th. Check notice board for detailed schedule.",
      date: "2024-03-15T10:30:00",
      class: "All Classes"
    },
    {
      id: 2,
      title: "School Assembly",
      message: "Special assembly tomorrow at 8:30 AM for Independence Day celebration.",
      date: "2024-03-14T09:15:00",
      class: "All Classes"
    },
    {
      id: 3,
      title: "Science Fair",
      message: "Science fair registration closes on Friday. Interested students please submit your projects.",
      date: "2024-03-13T14:45:00",
      class: "Class 9-10"
    },
    {
      id: 4,
      title: "Sports Trial",
      message: "Basketball team trials for inter-school competition on Saturday.",
      date: "2024-03-12T11:20:00",
      class: "Class 11-12"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 600);
  }, []);

  const handleDelete = async (id) => {
    // Simulate delete
    await new Promise(resolve => setTimeout(resolve, 300));
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-purple-600" />
          <h3 className="text-base font-semibold text-gray-800">Student Notifications</h3>
        </div>
        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          {notifications.length} Total
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No student notifications sent yet</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{notif.title}</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full inline-block mt-1">
                    {notif.class}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(notif.id)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(notif.date)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeleteSTDNoti;