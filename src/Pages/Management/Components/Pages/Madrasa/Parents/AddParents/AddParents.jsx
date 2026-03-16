import React, { useState } from 'react'
import { User } from 'lucide-react'

function AddParents() {
  const [parent, setParent] = useState({
    name: '',
    place: '',
    age: '',
    job: '',
    number: '',
    position: 'Parent',
  })

  const [members, setMembers] = useState([
    { name: '', job: '', age: '', relation: '', martial_status: '' },
  ])

  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Sample data for demonstration
  const sampleParents = [
    {
      id: 1,
      name: 'Jamal aboobakkar',
      place: 'New York',
      age: '45',
      job: 'Engineer',
      number: '+1 234-567-8901',
      position: 'Parent',
      members: [
        { name: 'mehabooba fathima', job: 'Student', age: '16', relation: 'Daughter', martial_status: 'Single' },
        { name: 'Midlaj muhammed', job: 'Student', age: '14', relation: 'Son', martial_status: 'Single' }
      ]
    },
    {
      id: 2,
      name: 'Salam muhammed',
      place: 'Los Angeles',
      age: '38',
      job: 'Teacher',
      number: '+1 234-567-8902',
      position: 'Parent',
      members: [
        { name: 'Davood hani', job: 'Student', age: '12', relation: 'Son', martial_status: 'Single' }
      ]
    }
  ]

  // Parent input change
  const handleParentChange = (e) => {
    const { name, value } = e.target
    setParent({ ...parent, [name]: value })
  }

  // Family member input change
  const handleMemberChange = (index, e) => {
    const { name, value } = e.target
    const updatedMembers = [...members]
    updatedMembers[index][name] = value
    setMembers(updatedMembers)
  }

  // Add new member
  const addMemberField = () => {
    setMembers([
      ...members,
      { name: '', job: '', age: '', relation: '', martial_status: '' },
    ])
  }

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage('')

    // Simulate API call
    setTimeout(() => {
      try {
        // Create new parent object (in real app, this would be saved to backend)
        const newParent = {
          id: Date.now(),
          ...parent,
          members: members
        }
        
        console.log('Parent added:', newParent) // For demonstration
        
        // reset form after success
        setParent({
          name: '',
          place: '',
          age: '',
          job: '',
          number: '',
          position: 'Parent',
        })
        setMembers([
          { name: '', job: '', age: '', relation: '', martial_status: '' },
        ])
        setSuccessMessage('Parent added successfully! ✅')

        // auto hide message after 3s
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (err) {
        console.error(err)
        alert('Something went wrong.')
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="px-4 py-6 mb-3 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto ">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Add New Parent
                </h1>
                <p className="text-xs text-white/90">
                  Add New Parent with Family Details
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-1">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Parent inputs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Parent Name
                  </label>
                  <input
                    name="name"
                    value={parent.name}
                    onChange={handleParentChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Place</label>
                  <input
                    name="place"
                    value={parent.place}
                    onChange={handleParentChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Age</label>
                  <input
                    name="age"
                    value={parent.age}
                    onChange={handleParentChange}
                    type="number"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Job</label>
                  <input
                    name="job"
                    value={parent.job}
                    onChange={handleParentChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    name="number"
                    value={parent.number}
                    onChange={handleParentChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Family Members */}
              <div>
                <h3 className="text-xs md:text-lg font-semibold text-blue-600 mt-4 mb-2">
                  Family Members
                </h3>

                {members.map((member, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-5 gap-4 bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4"
                  >
                    <div>
                      <label className="block text-gray-700 mb-1">Name</label>
                      <input
                        name="name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Job</label>
                      <input
                        name="job"
                        value={member.job}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Age</label>
                      <input
                        name="age"
                        value={member.age}
                        onChange={(e) => handleMemberChange(index, e)}
                        type="number"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Martial Status
                      </label>
                      <input
                        name="martial_status"
                        value={member.martial_status}
                        onChange={(e) => handleMemberChange(index, e)}
                        type="text"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Relation
                      </label>
                      <input
                        name="relation"
                        value={member.relation}
                        onChange={(e) => handleMemberChange(index, e)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                        required
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addMemberField}
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-sky-500 text-white px-4 py-2 rounded-lg transition"
                >
                  + Add Another Member
                </button>
              </div>
              {successMessage && (
                <span className="mt-3 text-green-600 font-medium">
                  {successMessage}
                </span>
              )}
              {/* Submit */}
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full md:w-auto inline-flex items-center justify-center ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white px-6 py-2 rounded-lg font-semibold shadow transition`}
                >
                  {loading ? 'Adding...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddParents