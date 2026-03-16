import React, { useState, useEffect } from "react";
import { 
  Eye, 
  EyeOff, 
  Trash2, 
  X, 
  Users, 
  Bell, 
  Calendar, 
  Clock,
  UserCircle,
  CheckCircle,
  AlertCircle
} from "lucide-react";

function StaffNotificationPrinci() {
  const [notifications, setNotifications] = useState([]);
  const [viewers, setViewers] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showViewerModal, setShowViewerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sample notifications data
  const sampleNotifications = [
    {
      id: 1,
      text: "Staff meeting tomorrow at 10 AM in the conference room. Please bring your reports.",
      date: "2024-01-15",
      time: "09:00:00",
      seen: true,
      viewers: [
        { id: 101, teacher_name: "Mrs. Sarah Johnson", read_at: "2024-01-15T09:30:00" },
        { id: 102, teacher_name: "Mr. Michael Smith", read_at: "2024-01-15T09:45:00" },
        { id: 103, teacher_name: "Ms. Emily Davis", read_at: "2024-01-15T10:00:00" },
        { id: 104, teacher_name: "Dr. Robert Wilson", read_at: "2024-01-15T10:15:00" },
        { id: 105, teacher_name: "Mrs. Lisa Brown", read_at: "2024-01-15T10:30:00" }
      ]
    },
    {
      id: 2,
      text: "Reminder: Submit your monthly reports by Friday 5 PM.",
      date: "2024-01-14",
      time: "14:30:00",
      seen: true,
      viewers: [
        { id: 101, teacher_name: "Mrs. Sarah Johnson", read_at: "2024-01-14T15:00:00" },
        { id: 102, teacher_name: "Mr. Michael Smith", read_at: "2024-01-14T15:20:00" },
        { id: 103, teacher_name: "Ms. Emily Davis", read_at: "2024-01-14T16:00:00" }
      ]
    },
    {
      id: 3,
      text: "School will remain closed on Monday due to maintenance work.",
      date: "2024-01-13",
      time: "11:00:00",
      seen: false,
      viewers: []
    },
    {
      id: 4,
      text: "New curriculum guidelines have been uploaded to the portal. Please review them.",
      date: "2024-01-12",
      time: "10:00:00",
      seen: true,
      viewers: [
        { id: 101, teacher_name: "Mrs. Sarah Johnson", read_at: "2024-01-12T10:30:00" },
        { id: 102, teacher_name: "Mr. Michael Smith", read_at: "2024-01-12T11:00:00" },
        { id: 104, teacher_name: "Dr. Robert Wilson", read_at: "2024-01-12T11:30:00" },
        { id: 106, teacher_name: "Mr. James Taylor", read_at: "2024-01-12T12:00:00" }
      ]
    }
  ];

  // Load sample data
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setNotifications(sampleNotifications);
      setIsLoading(false);
    }, 800);
  }, []);

  const fetchViewers = (notification) => {
    setSelectedNotification(notification);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setViewers(notification.viewers || []);
      setShowViewerModal(true);
      setIsLoading(false);
      setError("");
    }, 500);
  };

  const handleDeleteNotification = (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;

    // Simulate API call
    setTimeout(() => {
      setSuccess("Notification deleted successfully");
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setTimeout(() => setSuccess(""), 3000);
    }, 500);
  };

  const closeViewerModal = () => {
    setShowViewerModal(false);
    setViewers([]);
    setSelectedNotification(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (timeString) => {
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="mt-3 mb-6 animate-fadeIn">
      {/* Alert Messages */}
      {error && (
        <div className={`p-3 rounded-xl border flex items-center gap-3 mb-6 animate-slideDown ${
          error.includes('success') 
            ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200' 
            : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
        }`}>
          {error.includes('success') ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <span className={`font-medium ${error.includes('success') ? 'text-emerald-800' : 'text-red-800'}`}>
            {error}
          </span>
        </div>
      )}

      {success && (
        <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl flex items-center gap-3 mb-6 animate-slideDown">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-medium text-emerald-800">{success}</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !showViewerModal && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {!isLoading && notifications.length > 0 ? (
          notifications.map((noti) => (
            <div
              key={noti.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-4">
                      <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
                        {noti.text}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(noti.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(noti.time)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    {/* View Status & Viewers Button */}
                    <button
                      onClick={() => fetchViewers(noti)}
                      className={`p-3 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                        noti.seen
                          ? 'bg-green-50 text-green-600 hover:bg-green-100 hover:shadow-md'
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:shadow-md'
                      }`}
                      title="View readers"
                    >
                      {noti.seen ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        {noti.seen ? 'Viewed' : 'Unread'}
                      </span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteNotification(noti.id)}
                      className="p-3 bg-gradient-to-r from-red-50 to-rose-50 text-red-600 hover:from-red-100 hover:to-rose-100 hover:shadow-md rounded-xl transition-all duration-200 flex items-center gap-2 group-hover:opacity-100"
                      title="Delete notification"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="text-xs font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : !isLoading && notifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12 text-center">
            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No Notifications</h3>
            <p className="text-gray-500 text-sm md:text-base">No notifications are currently available</p>
          </div>
        ) : null}
      </div>

      {/* VIEWER MODAL */}
      {showViewerModal && (
        <div className="fixed inset-0 bg-black/20 rounded-xl flex items-center justify-center z-50 p-2 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <div>
                  <h3 className="text-sm font-bold">Viewers</h3>
                  <p className="text-sm text-white/80">
                    {selectedNotification?.text?.substring(0, 50)}...
                  </p>
                </div>
              </div>
              <button 
                onClick={closeViewerModal}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {/* Stats */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6 border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Viewers</p>
                      <p className="text-2xl font-bold text-blue-700">{viewers.length}</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Viewers List */}
                <div className="space-y-4">
                  {viewers.length > 0 ? (
                    viewers.map((viewer, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-4 p-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {viewer.teacher_name?.[0]?.toUpperCase() || 'S'}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 truncate">
                            {viewer.teacher_name || 'Unknown Staff'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Viewed on {new Date(viewer.read_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <UserCircle className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">No Viewers Yet</h4>
                      <p className="text-gray-500">No staff members have viewed this notification yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex justify-end">
                <button
                  onClick={closeViewerModal}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffNotificationPrinci;