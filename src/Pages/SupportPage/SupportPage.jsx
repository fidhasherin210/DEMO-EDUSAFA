import React, { useEffect, useState } from 'react'
import {
  MapPin,
  Clock,
  HelpCircle,
  AlertCircle,
  Send,
} from 'lucide-react'

const SupportPage = () => {
  const [supportDetails, setSupportDetails] = useState({
    school_number: '+91 9090909090',
    school_address: 'Calicut Kerala',
    principal_number: '+91 9090909090',
  })
  const [loading, setLoading] = useState(true)

  // Sample support data
  const sampleSupportData = {
    school_phone_no: '+91 9898989898',
    school_address: 'Calicut Kerala',
    principal_phone_no: '+91 98898989898',
  }

  useEffect(() => {
    // Simulate API call with loading
    setTimeout(() => {
      setSupportDetails({
        school_number: sampleSupportData.school_phone_no,
        school_address: sampleSupportData.school_address,
        principal_number: sampleSupportData.principal_phone_no,
      })
      setLoading(false)
    }, 1000) // Simulate network delay
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const userType = formData.get('userType')
    const classOrPosition = formData.get('classOrPosition')
    const issueType = formData.get('issueType')
    const description = formData.get('description')

    const message = encodeURIComponent(
      `Assalamu Alaikum,\n\n` +
        `Name: ${name}\n` +
        `Role: ${userType}\n` +
        `Class/Position: ${classOrPosition}\n` +
        `Issue Type: ${issueType}\n` +
        `Description: ${description}\n\n` +
        `Please assist. Thank you!`,
    )

    const phone = supportDetails.principal_number.replace(/\D/g, '')
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`
    window.open(whatsappUrl, '_blank')
    
    // Show success message
    alert("Ticket submitted! We'll get back to you soon.")
    e.target.reset()
  }

  const handleCall = (number) => {
    window.open(`tel:${number}`)
  }

  const handleWhatsApp = (number) => {
    const whatsappURL = `https://wa.me/${number.replace(/\D/g, '')}`
    window.open(whatsappURL, '_blank')
  }

  const formatNumber = (number) => {
    return number || 'N/A'
  }

  // Sample FAQ data
  const faqItems = [
    {
      q: 'I forgot my password. What should I do?',
      a: 'Contact Sadar Usthad for password reset assistance.',
    },
    {
      q: 'How can I view my timetable?',
      a: "Login and go to the 'Timetable' section from the classroom dashboard.",
    },
    {
      q: 'How can I update my Routine?',
      a: 'Go to your Routine Page, click on Mark My Routine, and Submit.',
    },
    {
      q: 'Teachers: How do I mark attendance?',
      a: "Navigate to 'Classes', choose the class, and click on 'Mark Attendance'.",
    },
    {
      q: 'How do I check my child\'s progress?',
      a: "Parents can view progress reports in the 'Student Progress' section after logging in.",
    },
    {
      q: 'What should I do if the app is not loading?',
      a: 'Check your internet connection, clear browser cache, or contact support.',
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-600">
            Loading support details...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="max-w-8xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Profile Header with Cover */}
          <div className="relative">
            {/* Abstract Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500">
              <div className="absolute inset-0 bg-black/10"></div>
              <svg
                className="absolute bottom-0 w-full h-12 text-white opacity-25"
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.25,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            {/* Profile Info Container */}
            <div className="relative pt-8 pb-6 px-4 lg:pt-10 lg:pb-8">
              <div className="flex flex-col items-center">
                {/* Support Icon with Ring Effect */}
                <div className="relative mb-3 lg:mb-4">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-xl"></div>
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-white/50 shadow-xl lg:w-32 lg:h-32 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                    <HelpCircle className="w-12 h-12 text-white lg:w-16 lg:h-16" />
                  </div>
                </div>

                {/* Support Title */}
                <h2 className="text-white text-lg md:text-xl font-bold mb-1 text-center lg:text-2xl lg:mb-2">
                  Help & Support
                </h2>

                {/* Location */}
                {supportDetails.school_address && (
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-white/80" />
                    <span className="text-white text-xs truncate max-w-[200px]">
                      {supportDetails.school_address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-1 p-3 bg-slate-50/80 border-b border-slate-100 lg:p-4 lg:gap-3">
            <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                Madrasa Phone
              </p>
              <p className="text-xs font-bold text-slate-800 truncate lg:text-sm">
                {formatNumber(supportDetails.school_number)}
              </p>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-sm text-center lg:p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider lg:text-xs">
                Sadar Usthad
              </p>
              <p className="text-xs font-bold text-emerald-600 lg:text-sm">
                {formatNumber(supportDetails.principal_number)}
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-3 lg:p-6">
            {/* Contact Information Section */}
            <div className="mb-5 lg:mb-6">
              <div className="grid grid-cols-2 gap-2 lg:gap-3">
                <div className="col-span-2 bg-slate-50 p-2.5 rounded-xl lg:p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    <MapPin className="w-2.5 h-2.5 text-purple-500 lg:w-4 lg:h-4" />
                    <span className="text-[12px] font-medium text-slate-500 uppercase lg:text-xs">
                      Address
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 lg:text-sm">
                    {supportDetails.school_address || 'Address not available'}
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-indigo-50 rounded-lg lg:p-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Working Hours
                </h3>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl lg:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium text-slate-700">
                      Saturday - Thursday
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    6:00 AM - 11:00 AM
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-dashed border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <span className="text-xs font-medium text-slate-700">
                      Friday
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 ml-3">Closed</span>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-amber-50 rounded-lg lg:p-2">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-2 lg:space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {faqItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors lg:p-4"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-[8px] font-bold text-blue-600">
                          Q
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-800 mb-1 lg:text-sm">
                          {item.q}
                        </p>
                        <p className="text-[11px] text-slate-600 lg:text-xs">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response Note */}
            <div className="mb-5 lg:mb-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-100 lg:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-green-600 lg:w-4 lg:h-4" />
                  <p className="text-xs font-medium text-green-800 lg:text-sm">
                    Quick Response
                  </p>
                </div>
                <p className="text-[11px] text-green-700 lg:text-xs">
                  We typically respond within 24 hours during working days.
                </p>
              </div>
            </div>

            {/* Raise a Ticket Form */}
            <div className="mb-5 lg:mb-6">
              <div className="flex items-center gap-2 mb-3 lg:gap-3 lg:mb-4">
                <div className="p-1.5 bg-purple-50 rounded-lg lg:p-2">
                  <Send className="w-3.5 h-3.5 text-purple-600 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-xs font-semibold text-blue-500 md:text-sm lg:font-bold">
                  Raise a Ticket
                </h3>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-3 lg:space-y-4"
              >
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1 lg:text-xs lg:mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all lg:p-3 lg:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 lg:gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1 lg:text-xs lg:mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      name="userType"
                      placeholder="Student/Teacher"
                      required
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all lg:p-3 lg:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1 lg:text-xs lg:mb-2">
                      Class/Position
                    </label>
                    <input
                      type="text"
                      name="classOrPosition"
                      placeholder="Class or position"
                      required
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all lg:p-3 lg:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1 lg:text-xs lg:mb-2">
                    Issue Type
                  </label>
                  <select
                    name="issueType"
                    required
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all lg:p-3 lg:text-sm"
                  >
                    <option value="">Select issue type</option>
                    <option value="login">Login Issue</option>
                    <option value="attendance">Issue in Mark attendance</option>
                    <option value="Routine">Issue in Mark Routine</option>
                    <option value="Date of Birth">Forgot Password</option>
                    <option value="progress">Can't view progress</option>
                    <option value="technical">Technical Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1 lg:text-xs lg:mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your issue in detail"
                    required
                    rows="3"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none lg:p-3 lg:text-sm lg:rows-4"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-2.5 rounded-xl text-xs font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg lg:py-3 lg:text-sm"
                >
                  Submit Ticket
                </button>
              </form>
            </div>

            {/* Footer with Status */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 lg:pt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[11px] font-medium text-green-700">
                    Support Available
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-slate-400 lg:w-3 lg:h-3" />
                <p className="text-[10px] text-slate-400 lg:text-xs">
                  Response within 24h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage