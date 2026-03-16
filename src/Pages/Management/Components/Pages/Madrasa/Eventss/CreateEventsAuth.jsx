import React, { useState } from "react";
import {
  Upload
} from "lucide-react";

// Sample Gallery Component with sample data
function AddGallery({ setMessage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sampleImages] = useState([
    {
      id: 1,
      title: "Annual Sports Day 2024",
      description: "Students participating in various sports activities",
      image: null,
      date: "2024-03-15"
    },
    {
      id: 2,
      title: "Science Exhibition",
      description: "Innovative projects by our young scientists",
      image: null,
      date: "2024-03-10"
    },
    {
      id: 3,
      title: "Cultural Fest",
      description: "Annual cultural celebration with music and dance",
      image: null,
      date: "2024-03-05"
    }
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setMessage("Gallery item added successfully!");
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setPreview(null);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Add to Gallery
      </h2>

      {/* Sample Gallery Items */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Gallery Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleImages.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                <p className="text-xs text-gray-400">Added: {item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter gallery title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            "Add to Gallery"
          )}
        </button>
      </form>
    </div>
  );
}

// Sample Notice Component with sample data
function AddNoticeAuth({ setMessage }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [sampleNotices] = useState([
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      content: "Parent-teacher meeting scheduled for March 25th, 2024. All parents are requested to attend.",
      category: "academic",
      date: "2024-03-16"
    },
    {
      id: 2,
      title: "School Holiday",
      content: "School will remain closed on March 20th, 2024 on account of Holi festival.",
      category: "holiday",
      date: "2024-03-15"
    },
    {
      id: 3,
      title: "Annual Day Practice",
      content: "Annual Day practice will start from March 18th. All students must attend.",
      category: "event",
      date: "2024-03-14"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setMessage("Notice added successfully!");
      setTitle("");
      setContent("");
      setCategory("general");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-6">
        Add New Notice
      </h2>

      {/* Sample Notices */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Notices</h3>
        <div className="space-y-3">
          {sampleNotices.map((notice) => (
            <div key={notice.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">{notice.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  notice.category === 'academic' ? 'bg-blue-100 text-blue-700' :
                  notice.category === 'holiday' ? 'bg-green-100 text-green-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {notice.category}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{notice.content}</p>
              <p className="text-xs text-gray-400">Posted: {notice.date}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notice Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            placeholder="Enter notice title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          >
            <option value="general">General</option>
            <option value="academic">Academic</option>
            <option value="event">Event</option>
            <option value="holiday">Holiday</option>
            <option value="exam">Exam</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notice Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            placeholder="Enter detailed notice content"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-sky-700 hover:to-blue-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Posting...
            </span>
          ) : (
            "Post Notice"
          )}
        </button>
      </form>
    </div>
  );
}

function CreateEventsAuth() {
    const [activeForm, setActiveForm] = useState("gallery"); // Tracks which form is active
    const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ">
      <div className="mx-auto p-1  ">

            {/* Header */}
           <div className="px-4 py-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
             <div className="mx-auto ">
               <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                   <Upload className="w-5 h-5 text-white" />
                 </div>
                 <div>
                   <h1 className="text-sm font-bold text-white md:text-xl">
                     Events Management
                   </h1>
                   <p className="text-xs text-white/90">
                     Add Notices and Gallery
                   </p>
                 </div>
               </div>
             </div>
           </div>

        {/* Modern Toggle Buttons */}
        <div className="flex justify-center mb-3 mt-3">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 inline-flex">
            <button
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ease-in-out transform ${
                activeForm === "gallery"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setActiveForm("gallery")}
            >
              <span className="text-xs flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add Gallery
              </span>
            </button>
            <button
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ease-in-out transform ${
                activeForm === "notice"
                  ? "bg-gradient-to-r from-sky-600 to-sky-400 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setActiveForm("notice")}
            >
              <span className="text-xs flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                Add Notice
              </span>
            </button>
          </div>
        </div>

        {/* Form Container with Animation */}
        <div className="relative">
          <div className={`transition-all duration-500 ease-in-out transform ${
            activeForm === "gallery" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
          }`}>
            {activeForm === "gallery" && <AddGallery setMessage={setMessage} />}
          </div>

          <div className={`transition-all duration-500 ease-in-out transform ${
            activeForm === "notice" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
          }`}>
            {activeForm === "notice" && <AddNoticeAuth setMessage={setMessage} />}
          </div>
        </div>

        {/* Enhanced Message Display */}
        {message && (
          <div className="mt-8 animate-fade-in">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-green-900 font-semibold mb-1">Success!</h4>
                  <p className="text-green-800">{message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

    
    </div>
  )
}

export default CreateEventsAuth;