import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DeleteMemmorial from './DeleteMemmorial'
import { User } from 'lucide-react'


function AddMemorial() {
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [image, setImage] = useState(null)
  const [deathDate, setDeathDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [csrfToken, setCsrfToken] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState(null)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/management/csrf-token/`,
          { credentials: 'include' },
        )
        const data = await response.json()
        setCsrfToken(data.csrfToken)
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error)
      }
    }
    fetchCsrfToken()
  }, [backendUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('place', place)
    formData.append('deathDate', deathDate)
    if (image) formData.append('image', image)

    try {
      const response = await axios.post(
        `${backendUrl}/api/management/memorials/`,
        formData,
        {
          headers: { 'X-CSRFToken': csrfToken },
          withCredentials: true,
        },
      )

      setMessage(`✅ ${response.data.message || 'Memorial added successfully'}`)
      setName('')
      setPlace('')
      setDeathDate('')
      setImage(null)
      setPreview(null)
      window.location.reload(); 
    } catch (error) {
      console.error(error)
      if (error.response) {
        setMessage(
          `❌ ${error.response.data.message || 'Failed to add memorial'}`,
        )
      } else {
        setMessage('❌ Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col p-1 ">
      {/* Header */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-2">
        <div className="mx-auto ">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white md:text-xl">
                Add Management
              </h1>
              <p className="text-xs text-white/90">Add and Delete Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Content */}
      <div className="flex flex-1 w-full p-1 ">
        <div className="w-full min-h-screen bg-white p-4 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-400 outline-none"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Place
              </label>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-400 outline-none"
                placeholder="Enter location"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Date of Death
              </label>
              <input
                type="date"
                value={deathDate}
                onChange={(e) => setDeathDate(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-400 outline-none"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Memorial Image
              </label>

              <div
                className={`relative border-2 border-dashed ${
                  dragActive
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-300'
                } rounded-xl p-6 text-center transition`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {preview ? (
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border shadow"
                    />
                    <span className="text-green-600 text-sm">
                      {image?.name}
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500">
                      <span className="text-violet-600 font-medium">
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </p>
                    <p className="text-gray-400 text-xs">PNG, JPG up to 1MB</p>
                  </>
                )}
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-3 rounded-lg text-center text-sm ${
                  message.includes('✅')
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              {loading ? 'Creating Memorial...' : 'Add Memorial'}
            </button>
          </form>

          <div className="mt-8">
            <DeleteMemmorial />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMemorial
