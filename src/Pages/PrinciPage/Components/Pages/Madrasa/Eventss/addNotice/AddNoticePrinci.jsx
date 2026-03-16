import React, { useState, useEffect } from "react";
import { Bell, Calendar, Trash2, Edit, Plus } from "lucide-react";

function AddNoticePrinci({ setMessage }) {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Sample notices data
  const sampleNotices = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      description: "Annual parent-teacher meeting scheduled for all classes. Please ensure attendance.",
      date: "2024-03-25"
    },
    {
      id: 2,
      title: "School Holiday",
      description: "School will remain closed on account of Holi festival.",
      date: "2024-03-29"
    },
    {
      id: 3,
      title: "Sports Day Registration",
      description: "Last date for sports day event registration is approaching. Interested students please register in the sports office.",
      date: "2024-04-05"
    },
    {
      id: 4,
      title: "Examination Schedule",
      description: "Final term examination schedule has been published. Check the notice board for details.",
      date: "2024-04-10"
    }
  ];

  useEffect(() => {
    // Load sample notices
    setNotices(sampleNotices);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (editingId) {
      // Update existing notice
      setNotices(prevNotices =>
        prevNotices.map(notice =>
          notice.id === editingId
            ? { ...notice, title, description, date }
            : notice
        )
      );
      setMessage("Notice updated successfully!");
      setEditingId(null);
    } else {
      // Add new notice
      const newNotice = {
        id: notices.length + 1,
        title,
        description,
        date: date || new Date().toISOString().split('T')[0]
      };
      setNotices([newNotice, ...notices]);
      setMessage("Notice added successfully!");
    }

    // Reset form
    setTitle("");
    setDescription("");
    setDate("");
    setIsSubmitting(false);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (notice) => {
    setTitle(notice.title);
    setDescription(notice.description);
    setDate(notice.date);
    setEditingId(notice.id);
  };

  const handleDelete = async (id) => {
    // Simulate delete
    await new Promise(resolve => setTimeout(resolve, 300));
    setNotices(prevNotices => prevNotices.filter(notice => notice.id !== id));
    setMessage("Notice deleted successfully!");
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Notice Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-500 to-sky-700 p-6">
          <h2 className="text-base md:text-xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6" />
            {editingId ? "Edit Notice" : "Add New Notice"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="w-1 h-4 bg-sky-500 rounded-full"></span>
              Notice Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter notice title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="w-1 h-4 bg-sky-500 rounded-full"></span>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter detailed notice description..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-sky-600 to-sky-500 text-white py-3 px-6 rounded-xl font-medium hover:from-sky-700 hover:to-sky-600 focus:ring-4 focus:ring-sky-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {editingId ? "Updating..." : "Publishing..."}
                </>
              ) : (
                <>
                  {editingId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingId ? "Update Notice" : "Publish Notice"}
                </>
              )}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Notices List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-sky-600" />
            <h2 className="text-base md:text-xl font-semibold text-sky-600">
              Recent Notices
            </h2>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                className="p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium">
                        Notice
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(notice.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {notice.description}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notices yet
              </h3>
              <p className="text-gray-500">
                Start by publishing your first notice!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNoticePrinci;