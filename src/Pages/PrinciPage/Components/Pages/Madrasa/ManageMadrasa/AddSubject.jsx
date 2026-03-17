import React, { useState, useEffect } from 'react'
import { BookOpen, Edit3 } from 'lucide-react'

function AddSubject() {
    const [allClasses, setAllClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState(null)
    const [subjectsInput, setSubjectsInput] = useState("") // comma separated
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [fetchingClasses, setFetchingClasses] = useState(false)

    // Sample classes data
    const sampleClasses = [
        { id: 1, std: "Class 1" },
        { id: 2, std: "Class 2" },
        { id: 3, std: "Class 3" },
        { id: 4, std: "Class 4" },
        { id: 5, std: "Class 5" },
      
    ]

    // Sample existing subjects data (for validation)
    const [existingSubjects, setExistingSubjects] = useState({
        1: ["Fiqh", "Ahlaq", "Aqeeda"],
        2: ["Fiqh", "Ahlaq", "Aqeeda"],
        3: ["Fiqh", "Ahlaq", "Aqeeda","Thareeh"],
        4: ["Fiqh", "Ahlaq", "Aqeeda","Thareeh","Thajweed"],
        5: ["Fiqh", "Ahlaq", "Aqeeda","Thareeh","Thajweed","Quran"],
        
    })

    const handleClassSelect = (classData) => {
        setSelectedClass(classData)
        setMessage("")
        setSubjectsInput("")
    }

    const handleSubmit = async () => {
        if (!selectedClass) {
            setMessage("Please select a class first.")
            return
        }

        if (!subjectsInput.trim()) {
            setMessage("Please enter at least one subject.")
            return
        }

        const subjects = subjectsInput
            .split(",")
            .map(s => s.trim())
            .filter(s => s.length > 0)

        setLoading(true)
        setMessage("")

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))

        // Check for existing subjects
        const existingForClass = existingSubjects[selectedClass.id] || []
        const newSubjects = []
        const skippedSubjects = []

        subjects.forEach(subject => {
            if (existingForClass.includes(subject)) {
                skippedSubjects.push(subject)
            } else {
                newSubjects.push(subject)
            }
        })

        // Update existing subjects with new ones
        if (newSubjects.length > 0) {
            setExistingSubjects(prev => ({
                ...prev,
                [selectedClass.id]: [...(prev[selectedClass.id] || []), ...newSubjects]
            }))
        }

        let messageText = ""
        if (newSubjects.length > 0) {
            messageText += `Added: ${newSubjects.join(", ")}`
        }
        if (skippedSubjects.length > 0) {
            messageText += (messageText ? " | " : "") + `Skipped (already exists): ${skippedSubjects.join(", ")}`
        }

        setMessage(messageText || "No new subjects added")
        setSubjectsInput("")
        setLoading(false)
    }

    // Fetch all classes
    useEffect(() => {
        const fetchAllClasses = async () => {
            setFetchingClasses(true)
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 600))
                setAllClasses(sampleClasses)
            } catch (error) {
                console.error('Error fetching classes:', error)
                setMessage("Failed to load classes")
            } finally {
                setFetchingClasses(false)
            }
        }

        fetchAllClasses()
    }, [])

    // Get existing subjects for selected class
    const getExistingSubjectsForClass = () => {
        if (!selectedClass) return []
        return existingSubjects[selectedClass.id] || []
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
            <div className="mx-auto">
                {/* Header */}
                <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
                    <div className="mx-auto ">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Edit3 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-white md:text-xl">
                                    Add class subjects
                                </h1>
                                <p className="text-xs text-white/90">Select a class and assign subjects</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Selection */}
                <div className="px-1 mx-auto -mt-3 ">
                    <div className="max-w-8xl mx-auto mb-2">
                        <div className="p-6 border shadow-xl bg-white/90 backdrop-blur-xl border-white/20 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                                <h2 className="text-xs font-semibold text-blue-600 md:text-sm">
                                    Select Your Class
                                </h2>
                            </div>

                            {fetchingClasses ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                                </div>
                            ) : allClasses.length === 0 ? (
                                <div className="py-8 text-center text-gray-500">
                                    No classes available
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                    {allClasses.map((classData, index) => (
                                        <button
                                            key={classData.id || index}
                                            onClick={() => handleClassSelect(classData)}
                                            disabled={loading || fetchingClasses}
                                            className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${selectedClass?.id === classData.id
                                                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 scale-105'
                                                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-lg hover:scale-105'
                                                } ${loading || fetchingClasses ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <div className="relative z-10">
                                                <div className="text-xs md:text-sm opacity-80">
                                                    Class
                                                </div>
                                                <div className="text-xs font-bold md:text-sm">
                                                    {classData.std}
                                                </div>
                                            </div>
                                            {selectedClass?.id !== classData.id && (
                                                <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 group-hover:opacity-100"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {selectedClass && (
                    <div className="p-6 mt-6 bg-white border shadow-lg rounded-2xl">
                        <h3 className="mb-4 text-sm font-semibold text-slate-700">
                            Add Subjects for Class: <span className="font-bold">{selectedClass.std}</span>
                        </h3>

                        {/* Existing subjects display */}
                        {getExistingSubjectsForClass().length > 0 && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-xs font-medium text-blue-700 mb-2">Existing Subjects:</p>
                                <div className="flex flex-wrap gap-2">
                                    {getExistingSubjectsForClass().map((subject, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                        >
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={subjectsInput}
                                onChange={(e) => setSubjectsInput(e.target.value)}
                                placeholder="Enter subjects separated by commas (e.g., Math, Science, English)"
                                className="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            />

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-6 py-3 text-sm font-semibold text-white transition bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                        Adding...
                                    </div>
                                ) : "Add Subjects"}
                            </button>

                            {message && (
                                <div className={`p-3 text-sm rounded-lg ${message.includes("Added") || message.includes("Skipped")
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : "bg-red-50 text-red-700 border border-red-200"
                                    }`}>
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddSubject