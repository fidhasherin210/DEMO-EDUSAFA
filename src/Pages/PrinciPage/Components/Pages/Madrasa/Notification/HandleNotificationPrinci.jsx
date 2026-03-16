import React, { useState } from "react";
import { Users, UserCheck, BookOpen } from "lucide-react";

// Sample data
const SAMPLE_STAFF_NOTIFICATIONS = [
  {
    id: 1,
    title: "Staff Meeting",
    description: "Emergency staff meeting tomorrow at 10 AM",
    date: "2024-01-15",
    type: "staff"
  },
  {
    id: 2,
    title: "Holiday Announcement",
    description: "School will remain closed on Friday",
    date: "2024-01-20",
    type: "staff"
  },
  {
    id: 3,
    title: "Training Session",
    description: "New teaching methodology workshop",
    date: "2024-01-25",
    type: "staff"
  }
];

const SAMPLE_STUDENT_NOTIFICATIONS = [
  {
    id: 101,
    title: "Exam Schedule",
    description: "Final exam timetable released",
    date: "2024-02-01",
    type: "student"
  },
  {
    id: 102,
    title: "Sports Day",
    description: "Annual sports day on February 15th",
    date: "2024-02-05",
    type: "student"
  },
  {
    id: 103,
    title: "Parent-Teacher Meeting",
    description: "Schedule for next week",
    date: "2024-02-10",
    type: "student"
  }
];

// Staff Notification Component
function StaffNotificationPrinci() {
  const [notifications] = useState(SAMPLE_STAFF_NOTIFICATIONS);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-600" />
        Staff Notifications
      </h3>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{notif.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notif.description}</p>
              </div>
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                {notif.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Create Staff Notification Component
function CreateStaffNotification() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Staff notification created successfully! (Sample Data)");
    setFormData({ title: "", description: "", date: "" });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Staff Notification</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter notification title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Enter notification description"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Create Notification
        </button>
      </form>
    </div>
  );
}

// Create Student Notification Component
function CreateSTDNotification() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Student notification created successfully! (Sample Data)");
    setFormData({ title: "", description: "", date: "" });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Student Notification</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter notification title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="3"
            placeholder="Enter notification description"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Create Notification
        </button>
      </form>
    </div>
  );
}

// Delete Student Notification Component
function DeleteSTDNoti() {
  const [notifications, setNotifications] = useState(SAMPLE_STUDENT_NOTIFICATIONS);

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    alert("Notification deleted successfully! (Sample Data)");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <UserCheck className="w-5 h-5 text-purple-600" />
        Student Notifications
      </h3>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{notif.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notif.description}</p>
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded inline-block mt-2">
                  {notif.date}
                </span>
              </div>
              <button
                onClick={() => handleDelete(notif.id)}
                className="ml-4 text-red-500 hover:text-red-700 font-medium text-sm bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Component
function HandleNotificationPrinci() {
  const [activeForm, setActiveForm] = useState("staff");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-1 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="px-5 py-6 mb-3 rounded-lg shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white md:text-2xl">
                Notification Management
              </h1>
              <p className="text-xs text-white/90">
                Send notifications to staff and students
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 py-4 px-1 mb-4">
          <h2 className="text-base md:text-xl font-semibold text-blue-600 mb-3 text-center">
            Select Notification Type
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center">
            <div className="rounded-xl p-1 inline-flex gap-2">
              <button
                className={`
                  flex items-center p-3 rounded-lg font-medium transition-all shadow-md duration-200 transform
                  ${activeForm === "staff"
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-sm"
                  }
                `}
                onClick={() => setActiveForm("staff")}
              >
                <Users className="w-6 h-6 mr-2" />
                <span className="text-xs md:text-sm">Staff</span>
              </button>
              <button
                className={`
                  flex items-center shadow-md p-3 rounded-lg font-medium transition-all duration-200 transform
                  ${activeForm === "student"
                    ? "bg-purple-600 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-sm"
                  }
                `}
                onClick={() => setActiveForm("student")}
              >
                <UserCheck className="w-6 h-6 mr-2" />
                <span className="text-xs md:text-sm">Students</span>
              </button>
            </div>
          </div>

          {/* Render Forms Conditionally */}
          <div className="transform transition-all duration-300 ease-in-out">
            {activeForm === "staff" && (
              <div className="animate-fadeIn">
                <CreateStaffNotification />
                <div className="mt-3">
                  <StaffNotificationPrinci />
                </div>
              </div>
            )}
            {activeForm === "student" && (
              <div className="animate-fadeIn">
                <CreateSTDNotification />
                <div className="mt-6">
                  <DeleteSTDNoti />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HandleNotificationPrinci;