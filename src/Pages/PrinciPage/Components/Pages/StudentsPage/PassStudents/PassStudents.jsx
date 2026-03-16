import React, { useState, useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'

// Sample data
const SAMPLE_STANDARDS = [
  {
    id: 1,
    std: "1",
   
    students: [
        {
          id: 101,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 102,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 103,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
    ]
  },
  {
    id: 2,
    std: "2",
   
    students: [
        {
          id: 201,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 202,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
      
    ]
  },
  {
    id: 3,
    std: "3",
    
    students: [
         {
          id: 301,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 302,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 303,
          name: "Aysha Mariyam",
          place: "Malappuram",
      image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yMl9waG90b19vZl9hX21pZGRsZV9zY2hvb2xfbXVzbGltX2dpcmxfaG9sZGluZ180YWE1ZDdjMS1mZDU2LTQ0OWMtODVhMy1hNmUzYTc4ZWRjMDRfMS5wbmc.png",
        
        }
    ]
  },
  {
    id: 4,
    std: "4",
    
    students: [
        {
          id: 401,
          name: "Ali Raza",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
        {
          id: 402,
          name: "Muhammed Fadil",
          place: "Malappuram",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS334-ZDEk8_84g7paYrujaqm_QwAtCvO_gew&s"
        },
    
        
    ]
  }
];

// Sample preview data generator
const generatePreviewData = (standardId) => {
  const standard = SAMPLE_STANDARDS.find(s => s.id === parseInt(standardId));
  if (!standard) return null;

  const totalStudents = standard.students.length;
  // Generate random pass/fail distribution
  const passCount = Math.floor(totalStudents * 0.7) + 1; // 70-80% pass rate
  const failCount = totalStudents - passCount;

  // Split students into pass and fail
  const shuffled = [...standard.students].sort(() => 0.5 - Math.random());
  const passStudents = shuffled.slice(0, passCount);
  const failStudents = shuffled.slice(passCount);

  return {
    class: `Class ${standard.std} - ${standard.section}`,
    from_year: "2024-2025",
    to_year: "2025-2026",
    total_students: totalStudents,
    pass_count: passCount,
    fail_count: failCount,
    pass_students: passStudents,
    fail_students: failStudents
  };
};

function PassStudents() {
  const [standards, setStandards] = useState([])
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [showPassList, setShowPassList] = useState(false)
  const [showFailList, setShowFailList] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [targetAcademicYear, setTargetAcademicYear] = useState(null)
  const [previousAcademicYear, setPreviousAcademicYear] = useState(null)
  const [formData, setFormData] = useState({ standard_id: '' })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')

  useEffect(() => {
    // Load sample data
    setStandards(SAMPLE_STANDARDS)
    setTargetAcademicYear("2025-2026")
    setPreviousAcademicYear("2024-2025")
  }, [])

  const fetchPromotionPreview = (standardId) => {
    if (!standardId) {
      setPreview(null)
      return
    }
    setPreviewLoading(true)
    setShowPassList(false)
    setShowFailList(false)
    
    // Simulate API delay
    setTimeout(() => {
      const previewData = generatePreviewData(standardId)
      setPreview(previewData)
      setPreviewLoading(false)
    }, 500)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setFormData({ ...formData, [e.target.name]: value })
    setMessage('')
    if (e.target.name === 'standard_id') fetchPromotionPreview(value)
  }

  const handlePromoteClick = () => {
    if (!formData.standard_id) {
      setMessage('Please select a class')
      setMessageType('error')
      return
    }
    if (!preview) {
      setMessage('Please wait for preview to load')
      setMessageType('error')
      return
    }
    setShowConfirmModal(true)
  }

  const promoteStudents = () => {
    setShowConfirmModal(false)
    setLoading(true)
    setMessage('')

    // Simulate promotion process
    setTimeout(() => {
      setMessage('Students promoted successfully! (Sample Data)')
      setMessageType('success')
      setPreview(null)
      setShowPassList(false)
      setShowFailList(false)
      setFormData({ standard_id: '' })
      setLoading(false)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }, 1000)
  }

  const StudentCard = ({ student }) => (
    <div
      key={student.id}
      className="p-3 transition-all duration-200 text-left border-b border-gray-100 last:border-0 hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <img
          src={student.image}
          alt={student.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              student.name
            )}&background=2563eb&color=fff&size=96&bold=true`
          }}
        />
        <div className="flex-1">
          <div className="text-xs md:text-sm font-medium text-gray-800">
            {student.name}
          </div>
          {student.place && (
            <div className="text-xs text-gray-600">{student.place}</div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-1">
      {/* Font imports */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      <div className="mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Academic Year Row */}
          {previousAcademicYear && targetAcademicYear ? (
            <div className="w-full px-7 py-4">
              {/* Labels */}
              <div className="flex justify-between text-xs text-slate-500 font-medium mb-2">
                <span>Previous Year</span>
                <span>New Year</span>
              </div>

              {/* Years + Arrow */}
              <div className="flex items-center justify-between">
                {/* Old Year */}
                <span className="bg-white border-2 border-blue-100 rounded-full px-4 py-1 text-sm font-semibold text-blue-800">
                  {previousAcademicYear}
                </span>

                {/* Arrow Line */}
                <div className="flex-1 flex items-center mx-3">
                  <div className="flex-1 border-t-2 border-slate-300"></div>
                  <span className="text-slate-400 mx-2">►</span>
                </div>

                {/* New Year */}
                <span className="bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-full px-4 py-1 text-sm font-semibold">
                  {targetAcademicYear}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 px-7 py-3.5 bg-slate-50 border-b border-gray-200">
              <div className="flex-1 bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-700 flex items-center gap-2 m-0">
                <span>⚠️</span>
                Academic year information is not fully available
              </div>
            </div>
          )}

          {/* Body */}
          <div className="p-7 pt-6">
            {/* Message */}
            {message && (
              <div
                className={`rounded-lg px-3.5 py-2.5 text-xs mb-4 flex items-center gap-2 ${
                  messageType === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : messageType === 'warn'
                    ? 'bg-amber-50 border border-amber-200 text-amber-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {messageType === 'success'
                  ? '✅ '
                  : messageType === 'warn'
                  ? '⚠️ '
                  : '❌ '}
                {message}
              </div>
            )}

            {/* Class Select */}
            <div className="mb-0">
              <label
                htmlFor="standard_id"
                className="text-xs font-semibold text-blue-600 md:text-lg"
              >
                Select Old Class
              </label>
              <div className="relative">
                <select
                  className="mt-2 w-full px-3.5 py-3 pr-[38px] rounded-xl border-2 border-gray-200 text-sm font-dm-sans text-slate-800 bg-slate-50 outline-none appearance-none cursor-pointer transition-all duration-200 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                  id="standard_id"
                  name="standard_id"
                  value={formData.standard_id}
                  onChange={handleChange}
                  disabled={loading || previewLoading}
                >
                  <option value="">— Choose a class —</option>
                  {standards.map((std) => (
                    <option key={std.id} value={std.id}>
                      Class {std.std} {std.section} &nbsp;·&nbsp;{' '}
                      {std.students?.length || 0} students
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
                  ▾
                </div>
              </div>
            </div>

            {/* Loading skeleton */}
            {previewLoading && (
              <div className="h-20 mt-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-[shimmer_1.4s_infinite] rounded-xl"></div>
            )}

            {/* Preview */}
            {preview && !previewLoading && (
              <div className="mt-5 rounded-2xl overflow-hidden animate-[fadeUp_0.35s_ease]">
                <div className="p-4.5">
                  {/* Meta row */}
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 bg-slate-50 rounded-lg p-2.5 border border-gray-200 flex flex-col items-center justify-center text-center">
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">
                        Class
                      </div>
                      <div className="font-sora text-base md:text-2xl font-bold text-slate-900">
                        {preview.class}
                      </div>
                    </div>
                    <div className="flex-[2] bg-slate-50 rounded-lg p-2 border border-gray-200">
                      <div className="text-[13px] md:text-xs text-slate-400 font-semibold tracking-wide mb-0.5">
                        Academic Year Transition
                      </div>
                      <div className="font-sora md:text-sm text-xs font-bold text-slate-900">
                        {preview.from_year} &nbsp;→&nbsp; {preview.to_year}
                      </div>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-1 mb-3">
                    {/* Total Card */}
                    <div className="flex pt-4 flex-col items-center bg-blue-50 rounded-2xl py-3 px-1 border border-gray-200">
                      <span className="text-base md:text-3xl font-bold text-slate-800">
                        {preview.total_students}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                        Total
                      </span>
                    </div>

                    {/* Pass Card */}
                    <div
                      className="flex pt-4 flex-col items-center bg-green-50 rounded-2xl py-3 px-1 border border-green-200 cursor-pointer hover:shadow-lg transition-all duration-150"
                      onClick={() => {
                        setShowPassList(!showPassList)
                        setShowFailList(false)
                      }}
                      title="Click to view"
                    >
                      <span className="text-base md:text-3xl font-bold text-green-600">
                        {preview.pass_count}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                        Pass
                      </span>
                      <span className="text-[12px] font-medium text-green-700/70 mt-0.5">
                        {showPassList ? '▲ hide' : '▼ view'}
                      </span>
                    </div>

                    {/* Fail Card */}
                    <div
                      className="flex pt-4 flex-col items-center bg-red-50 rounded-2xl py-3 px-1 border border-red-200 cursor-pointer hover:shadow-lg transition-all duration-150"
                      onClick={() => {
                        setShowFailList(!showFailList)
                        setShowPassList(false)
                      }}
                      title="Click to view"
                    >
                      <span className="text-base md:text-3xl font-bold text-red-600">
                        {preview.fail_count}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                        Fail
                      </span>
                      <span className="text-[12px] font-medium text-red-700/70 mt-0.5">
                        {showFailList ? '▲ hide' : '▼ view'}
                      </span>
                    </div>
                  </div>

                  {/* Pass list */}
                  {showPassList && preview.pass_students?.length > 0 && (
                    <div className="mb-3 rounded-xl border-2 border-gray-200 overflow-hidden animate-[fadeUp_0.25s_ease]">
                      <div className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold text-green-800 border-b border-green-200">
                        ✅ &nbsp; Students who passed &nbsp;
                        <span className="opacity-70 font-normal">
                          ({preview.pass_students.length})
                        </span>
                      </div>
                      <div className="max-h-[220px] overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-slate-300">
                        {preview.pass_students.map((s) => (
                          <StudentCard key={s.id} student={s} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fail list */}
                  {showFailList && preview.fail_students?.length > 0 && (
                    <div className="mb-3 rounded-xl border-2 border-gray-200 overflow-hidden animate-[fadeUp_0.25s_ease]">
                      <div className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold text-red-800 border-b border-red-200">
                        ❌ &nbsp; Students who failed &nbsp;
                        <span className="opacity-70 font-normal">
                          ({preview.fail_students.length})
                        </span>
                      </div>
                      <div className="max-h-[220px] overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-slate-300">
                        {preview.fail_students.map((s) => (
                          <StudentCard key={s.id} student={s} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warning */}
                  <div className="flex items-center gap-2 p-2.5 bg-amber-50 border-2 border-amber-200 rounded-lg text-xs text-amber-800">
                    <span>⚠️</span>
                    <span>
                      This action is permanent and cannot be undone once
                      confirmed.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Promote Button */}
            <button
              className="mt-5 w-full py-4 border-none rounded-xl font-sora text-base font-bold cursor-pointer bg-gradient-to-r from-blue-600 to-sky-500 text-white tracking-wide shadow-[0_4px_16px_rgba(59,130,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(59,130,246,0.45)] disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
              onClick={handlePromoteClick}
              disabled={
                loading || !formData.standard_id || !preview || previewLoading
              }
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>{' '}
                  Promoting Students…
                </>
              ) : (
                <>
                  <span>🎓</span> Promote Students
                </>
              )}
            </button>

            {/* Tip */}
            <div className="mt-3.5 flex items-center gap-1.5 text-[13px] md:text-sm text-slate-400 justify-center">
              <span>💡</span>
              Tap the Pass / Fail boxes above to preview each student list
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-[slideUp_0.3s_ease]">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 font-sora">
                    Confirm Promotion
                  </h3>
                </div>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5">
                <div className="space-y-4">
                  {/* Class Info */}
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="text-sm text-blue-800 font-medium mb-2">
                      Class: <span className="font-bold">{preview?.class}</span>
                    </div>
                    <div className="text-sm text-blue-800">
                      <span className="font-medium">From:</span>{' '}
                      {preview?.from_year}{' '}
                      <span className="mx-2 text-blue-400">→</span>{' '}
                      <span className="font-medium">To:</span>{' '}
                      {preview?.to_year}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xs text-gray-500 mb-1">Total</div>
                      <div className="text-xl font-bold text-gray-800">
                        {preview?.total_students}
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-xs text-green-600 mb-1">Pass</div>
                      <div className="text-xl font-bold text-green-600">
                        {preview?.pass_count}
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <div className="text-xs text-red-600 mb-1">Fail</div>
                      <div className="text-xl font-bold text-red-600">
                        {preview?.fail_count}
                      </div>
                    </div>
                  </div>

                  {/* Warning Message */}
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <p className="text-xs md:text-sm text-amber-800 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        This action is permanent and cannot be undone. Please
                        verify the details before confirming.
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-5 border-t border-gray-200">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={promoteStudents}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-xl text-sm font-semibold text-white hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-shimmer {
            animation: shimmer 1.4s infinite;
          }
          .animate-fadeUp {
            animation: fadeUp 0.35s ease;
          }
          .scrollbar-thin::-webkit-scrollbar {
            width: 4px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
        `}</style>
      </div>
    </div>
  )
}

export default PassStudents