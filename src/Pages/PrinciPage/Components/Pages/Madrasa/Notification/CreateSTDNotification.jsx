import React, { useState } from 'react'
import {
  Upload,
  Mic,
  FileText,
  Send,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon,
  Volume2,
  MessageSquare,
  X,
} from 'lucide-react'

function CreateSTDNotification() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [fileName, setFileName] = useState({ image: null, voice: null })
  const [imagePreview, setImagePreview] = useState(null)

  const [notification, setNotification] = useState({
    text: '',
    image: null,
    voice: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNotification({ ...notification, [name]: value })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files[0]) {
      setNotification({ ...notification, [name]: files[0] })
      setFileName((prev) => ({ ...prev, [name]: files[0].name }))
      
      // Create image preview if file is an image
      if (name === 'image' && files[0].type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(files[0])
      }
    }
  }

  const removeFile = (type) => {
    setNotification({ ...notification, [type]: null })
    setFileName((prev) => ({ ...prev, [type]: null }))
    
    // Clear image preview when removing image
    if (type === 'image') {
      setImagePreview(null)
    }
  }

  const handleSubmitStaff = async (e) => {
    e.preventDefault()

    if (!notification.text && !notification.image && !notification.voice) {
      setSubmitStatus({
        type: 'error',
        message:
          'Please add at least one form of content (text, image, or voice) to create a notification',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call with sample data
    setTimeout(() => {
      // Sample success response
      console.log('Notification Created with sample data:', {
        text: notification.text,
        image: notification.image ? notification.image.name : null,
        voice: notification.voice ? notification.voice.name : null,
      })
      
      setSubmitStatus({
        type: 'success',
        message: 'Notification sent successfully to all students!',
      })

      // Reset form after successful submission
      setTimeout(() => {
        setNotification({ text: '', image: null, voice: null })
        setFileName({ image: null, voice: null })
        setImagePreview(null)
        setSubmitStatus(null)
        setIsSubmitting(false)
      }, 2000)
    }, 1500) // Simulate network delay
  }

  return (
    <div className="mt-3 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg border border-gray-200 p-6 mb-6 animate-fadeIn">
      {/* Header */}

      <form onSubmit={handleSubmitStaff} className="space-y-8">
        {/* Text Message Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <label className="block text-sm font-semibold text-gray-700">
              Notification Message
            </label>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              Required
            </span>
          </div>
          <div className="relative">
            <textarea
              name="text"
              className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
              rows={6}
              value={notification.text}
              onChange={handleChange}
              placeholder="Type your notification message here..."
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {notification.text.length}/500
            </div>
          </div>
        </div>

        {/* File Upload Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-600" />
              <label className="block text-sm font-semibold text-gray-700">
                Attach Image
              </label>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Optional
              </span>
            </div>
            
            {/* Image Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-200">
              {!imagePreview ? (
                <div className="p-6">
                  <input
                    type="file"
                    id="image-upload"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="p-3 bg-amber-100 rounded-full mb-3">
                        <Upload className="w-6 h-6 text-amber-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Upload Image
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 1MB
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                // Image Preview Section
                <div className="relative p-4">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-700 mb-3">Image Preview</p>
                    <div className="relative group">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-48 h-48 object-cover rounded-lg border-2 border-amber-200 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile('image')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 truncate max-w-xs">
                      {fileName.image}
                    </p>
                  </div>
                </div>
              )}
              
              {/* File Info (only shows when file is uploaded but no preview for non-image files) */}
              {fileName.image && !imagePreview && (
                <div className="p-3 bg-amber-50 rounded-lg border-t border-amber-100 mx-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-gray-700 truncate">
                        {fileName.image}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile('image')}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Voice Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-violet-600" />
              <label className="block text-sm font-semibold text-gray-700">
                Voice Note
              </label>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Optional
              </span>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-violet-400 hover:bg-violet-50 transition-all duration-200">
              <input
                type="file"
                id="voice-upload"
                name="voice"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="voice-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-3 bg-violet-100 rounded-full mb-3">
                    <Mic className="w-6 h-6 text-violet-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Record or Upload
                  </p>
                  <p className="text-xs text-gray-500">
                    MP3, WAV, M4A up to 1MB
                  </p>
                </div>
              </label>
              {fileName.voice && (
                <div className="mt-4 p-3 bg-violet-50 rounded-lg border border-violet-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-600" />
                      <span className="text-sm text-gray-700 truncate">
                        {fileName.voice}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile('voice')}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <div
            className={`p-4 rounded-xl border ${
              submitStatus.type === 'success'
                ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200'
                : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
            } animate-slideDown`}
          >
            <div className="flex items-center gap-3">
              {submitStatus.type === 'success' ? (
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              )}
              <div>
                <p
                  className={`font-semibold ${
                    submitStatus.type === 'success'
                      ? 'text-emerald-800'
                      : 'text-red-800'
                  }`}
                >
                  {submitStatus.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={
              isSubmitting ||
              (!notification.text && !notification.image && !notification.voice)
            }
            className={`w-full text-xs py-3.5 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
              isSubmitting
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            } ${
              !notification.text && !notification.image && !notification.voice
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="text-xs w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending Notification...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Notification to All Students
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-500 mt-3">
            This notification will be sent to all students immediately
          </p>
        </div>
      </form>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default CreateSTDNotification