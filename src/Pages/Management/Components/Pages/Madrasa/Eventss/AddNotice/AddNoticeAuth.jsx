import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  Image,
  Trash2,
  Plus,
  Bell,
  Upload,
  X,
  Book,
} from 'lucide-react'

function AddNoticeAuth() {
  const [notice, setNotice] = useState([])
  const [formData, setFormData] = useState({
    event: '',
    date: '',
    time: '',
    posters: null,
  })
  const [message, setMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)

  // Sample data
  const sampleNotices = [
    {
      id: 1,
      event: "Annual Sports Day 2024",
      date: "2024-03-15",
      time: "10:00 AM",
      posters: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      event: "Parent-Teacher Meeting",
      date: "2024-03-20",
      time: "02:00 PM",
      posters: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      event: "Science Exhibition",
      date: "2024-03-25",
      time: "09:00 AM",
      posters: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop"
    },
    {
      id: 4,
      event: "Cultural Fest 2024",
      date: "2024-04-05",
      time: "11:00 AM",
      posters: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop"
    }
  ]

  // 🔹 Load sample data
  useEffect(() => {
    setNotice(sampleNotices)
  }, [])

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 🔹 Handle File Change with Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({
      ...prev,
      posters: file,
    }))

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewImage(null)
    }
  }

  // 🔹 Handle Drag Events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setFormData((prev) => ({
        ...prev,
        posters: file,
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // 🔹 Clear Form
  const clearForm = () => {
    setFormData({ event: '', date: '', time: '', posters: null })
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  // 🔹 Submit Notice
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      // Create new notice with sample image if no file selected
      const newNotice = {
        id: notice.length + 1,
        event: formData.event,
        date: formData.date,
        time: formData.time,
        posters: formData.posters 
          ? URL.createObjectURL(formData.posters)
          : "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&auto=format&fit=crop"
      }

      setNotice(prev => [newNotice, ...prev])
      setMessage('Notice added successfully!')
      clearForm()
      setIsUploading(false)

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000)
    }, 1500)
  }

  // 🔹 Delete Notice
  const handleDelete = (noticeId) => {
    setNotice(prev => prev.filter(item => item.id !== noticeId))
    setMessage('Notice deleted successfully!')
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  const getImageUrl = (url) => {
    return url
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1 mt-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto space-y-8 mt-3">
          {/* Message Toast */}
          {message && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
              {message}
            </div>
          )}

          {/* Upload Section - Exact match with Gallery */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-6">
              <h2 className="text-sm md:text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Add New Notice
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* File Upload Area - Exact match with Gallery */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {previewImage ? (
                  <div className="space-y-4">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="mx-auto w-32 h-32 object-cover rounded-xl shadow-md"
                    />
                    <p className="text-sm font-medium text-gray-900">
                      {formData.posters?.name}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewImage(null)
                        setFormData((prev) => ({ ...prev, posters: null }))
                        if (fileInputRef.current) {
                          fileInputRef.current.value = null
                        }
                      }}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Image className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your poster here
                      </p>
                      <p className="text-gray-500">or click to browse</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {/* Event Description - Matching Gallery's textarea style */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Book className="w-4 h-4" />
                  Event Name
                </label>
                <input
                  type="text"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  placeholder="Describe the event or occasion..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Date and Time - Two column layout matching Gallery */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4" />
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button - Exact match with Gallery */}
              <button
                type="submit"
                disabled={
                  isUploading ||
                  !formData.event ||
                  !formData.date ||
                  !formData.time
                }
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Add to Notice
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Notices Section - Exact match with Gallery's layout */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm md:text-lg font-semibold text-blue-600">
                    Notice Collection
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-2 pt-4">
              {notice.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-6">
                  {notice.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={getImageUrl(item.posters)}
                          alt={item.event}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-opacity-400 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="opacity-900 group-hover:opacity-900 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200 transform scale-90 hover:scale-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="flex items-start gap-2">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {item.event} <br /> <span className='text-xs'>{item.date}  </span> 
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Bell className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No notices yet
                  </h3>
                  <p className="text-gray-500">
                    Start building your school&apos;s notice board by uploading
                    the first notice!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNoticeAuth