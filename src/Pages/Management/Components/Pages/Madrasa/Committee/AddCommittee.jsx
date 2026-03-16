import React, { useState } from 'react'
import { User2, Trash2, Plus, ImagePlus } from 'lucide-react'

function AddCommittee() {
  // Sample initial committees data
  const initialCommittees = [
   {
    name: "Dr. Yusuf Ali",
    position: "Chairperson",
    place: "New York, USA",
    number: "+1 (555) 123-4567",
    image: "https://plus.unsplash.com/premium_photo-1726863202242-a5f18a2ae44f?q=80&w=1017&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Prof. Ibrahim Khalid",
    position: "Vice Chairperson",
    place: "Singapore",
    number: "+65 9123 4567",
    image: "https://plus.unsplash.com/premium_photo-1770674918463-685eafd1e6b5?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Dr. Saeed Rahman",
    position: "Secretary",
    place: "London, UK",
    number: "+44 20 7946 0123",
    image: "https://images.unsplash.com/photo-1645864833809-39c64b85e65d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Mr. Tariq Mahmood",
    position: "Treasurer",
    place: "Toronto, Canada",
    number: "+1 (416) 555-7890",
    image: "https://images.unsplash.com/photo-1641106269337-2a0a3a8e73f3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Dr. Omar Abdullah",
    position: "Executive Member",
    place: "Mumbai, India",
    number: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1627091908405-30bd51eec537?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Prof. Faisal Khan",
    position: "Executive Member",
    place: "Berlin, Germany",
    number: "+49 30 1234 5678",
    image: "https://plus.unsplash.com/premium_photo-1677523780346-c24a9bd6c118?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
  ]

  const [committees, setCommittees] = useState(initialCommittees)
  const [preview, setPreview] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    place: '',
    position: '',
    number: '',
    image: null,
  })

  const [loading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'image') {
      const file = files[0]
      setFormData({ ...formData, image: file })
      setPreview(URL.createObjectURL(file))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    setError('')

    // Simulate API call
    setTimeout(() => {
      try {
        // Create new committee member
        const newMember = {
          id: committees.length + 1,
          name: formData.name,
          place: formData.place,
          position: formData.position,
          number: formData.number,
          image: preview || 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }

        setCommittees([...committees, newMember])
        setMessage('Committee added successfully')
        setFormData({
          name: '',
          place: '',
          position: '',
          number: '',
          image: null,
        })
        setPreview(null)
        setError('')
      } catch (err) {
        setError('Failed to add committee')
      } finally {
        setSubmitting(false)
      }
    }, 500)
  }

  // ✅ Delete
  const handleDelete = (id) => {
    if (!window.confirm('Delete this committee member?')) return

    // Simulate delete
    setTimeout(() => {
      setCommittees(committees.filter(member => member.id !== id))
    }, 300)
  }

  // ✅ Safe image URL
  const getImageUrl = (url) => {
    return url || 'https://via.placeholder.com/150'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-1">

      {/* Header */}
      <div className="px-4 py-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-4 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/20 rounded-xl">
            <User2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white md:text-xl">Committee Management</h1>
            <p className="text-xs text-white/90">
              Add and Manage Committee Members
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white shadow-xl rounded-2xl p-5 mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Member Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="place"
            placeholder="Place"
            value={formData.place}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="tel"
            name="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Image Upload */}
          <label className="flex items-center gap-2 cursor-pointer bg-gray-100 p-3 rounded-xl">
            <ImagePlus size={18} />
            <span className="text-sm">
              {formData.image ? formData.image.name : 'Upload Image'}
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl"
            />
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-xl font-semibold shadow-lg active:scale-95 transition"
          >
            <Plus size={18} />
            {submitting ? 'Adding...' : 'Add Committee'}
          </button>

          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </div>

      {/* List */}
      <div className="bg-white shadow-xl rounded-2xl p-5">
        <h2 className="text-xs md:text-lg font-semibold mb-4 text-blue-600 text-center">Committee Members</h2>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : committees.length === 0 ? (
          <p className="text-gray-400 text-sm">No members added.</p>
        ) : (
          <div className="space-y-3">
            {committees.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    className="w-14 h-14 object-cover rounded-full"
                  />
                  <div>
                    <p className="text-xs font-semibold">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.position}</p>
                    <p className="text-xs text-gray-500">{member.place}</p>
                    <p className="text-xs text-gray-500">{member.number}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(member.id)}
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center bg-red-100 text-red-600 rounded-xl active:scale-95 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddCommittee