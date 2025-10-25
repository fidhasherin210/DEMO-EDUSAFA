// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

//   const [allClasses, setAllClasses] = useState([]);
//   const [allTerms, setAllTerms] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedTerm, setSelectedTerm] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [marks, setMarks] = useState({});
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [csrfToken, setCsrfToken] = useState('');
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   // Fetch CSRF token
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       try {
//         const response = await axios.get(
//           `${backendUrl}/api/principal/csrf-token/`,
//           { withCredentials: true }
//         );
//         setCsrfToken(response.data.csrfToken);
//       } catch (error) {
//         console.error("Failed to fetch CSRF token:", error);
//       }
//     };
//     fetchCsrfToken();
//   }, [backendUrl]);

//   // Fetch classes and terms
//   useEffect(() => {
//     const getCurrentYear = () => new Date().getFullYear();

//     const fetchAllClasses = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/principal/get-class-with-stds/`, { withCredentials: true });
//         setAllClasses(response.data || []);
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//       }
//     };

//     const fetchAllTerms = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/principal/terms/`, { withCredentials: true });
//         const currentYear = getCurrentYear();
//         const filteredTerms = response.data.filter(term => term.year === currentYear);
//         setAllTerms(filteredTerms || []);
//       } catch (error) {
//         console.error('Error fetching terms:', error);
//       }
//     };

//     fetchAllClasses();
//     fetchAllTerms();
//   }, [backendUrl]);

//   // Handlers
//   const handleClassSelect = (classData) => {
//     setSelectedClass(classData);
//     setSelectedTerm(null);
//     setSelectedStudent(null);
//     setMarks({});
//     setError(null);
//     setSuccess(null);
//   };

//   const handleTermSelect = (termId) => {
//     setSelectedTerm(termId);
//     setSelectedStudent(null);
//     setMarks({});
//     setError(null);
//     setSuccess(null);
//   };

//   const handleStudentSelect = (student) => {
//     setSelectedStudent(student);
//     const initialMarks = {};
//     (selectedClass.subjects || []).forEach((subject) => {
//       initialMarks[subject.id] = '';
//     });
//     setMarks(initialMarks);
//     setError(null);
//     setSuccess(null);
//   };

//   const handleMarkChange = (subjectId, mark) => {
//     const markValue = mark === '' ? '' : Math.min(100, Math.max(0, parseInt(mark) || 0));
//     setMarks((prev) => ({ ...prev, [subjectId]: markValue }));
//   };

//   const handleSubmit = async () => {
//     if (!selectedClass || !selectedTerm || !selectedStudent) {
//       setError("Please select a class, term, and student.");
//       return;
//     }

//     const emptySubjects = selectedClass.subjects.filter(subject =>
//       marks[subject.id] === '' || marks[subject.id] === undefined
//     );

//     if (emptySubjects.length > 0) {
//       setError(`Please enter marks for all subjects. Missing: ${emptySubjects.map(s => s.name).join(', ')}`);
//       return;
//     }

//     try {
//       const submissionPromises = selectedClass.subjects.map(async (subject) => {
//         const singleProgressData = {
//           student: selectedStudent.id,
//           term: selectedTerm,
//           subject: subject.id,
//           marks: Number(marks[subject.id] || 0),
//         };

//         const response = await axios.post(
//           `${backendUrl}/api/principal/create-progress-report/`,
//           singleProgressData,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'X-CSRFToken': csrfToken,
//             },
//             withCredentials: true,
//           }
//         );

//         return response;
//       });

//       await Promise.all(submissionPromises);

//       setSuccess("Progress submitted successfully for all subjects.");
//       setError(null);
//       setMarks({});
//       setSelectedStudent(null);

//       setTimeout(() => {
//         setSuccess(null);
//       }, 3000);
//     } catch (error) {
//       console.error('Error during submission:', error);
//       setError('Failed to submit progress. Please try again.');
//       setSuccess(null);
//     }
//   };

//   const getImageUrl = (url) => {
//     if (!url) return `${backendUrl}/static/images/default-avatar.png`;
//     return url.startsWith("http") ? url : `${backendUrl}${url}`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 p-8 mb-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//               </svg>
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Mark Student Progress
//             </h1>
//           </div>
//           <p className="text-gray-500 ml-14">Efficiently track and record student academic performance</p>
//         </div>

//         {/* Class Selection */}
//         <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 p-6 mb-6">
//           <div className="flex items-center gap-2 mb-4">
//             <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//             </svg>
//             <h2 className="text-2xl font-bold text-gray-800">Select Class</h2>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
//             {allClasses.map((classData, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleClassSelect(classData)}
//                 className={`
//                   px-6 py-4 rounded-xl font-semibold text-lg border-none cursor-pointer transition-all duration-300 transform hover:scale-105
//                   ${selectedClass === classData
//                     ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
//                     : 'bg-gradient-to-r from-gray-50 to-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
//                   }
//                 `}
//               >
//                 Class {classData.class}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Term Selection */}
//         {selectedClass && (
//           <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 p-6 mb-6 animate-fade-in">
//             <div className="flex items-center gap-2 mb-4">
//               <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               <h2 className="text-2xl font-bold text-gray-800">Select Term</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//               {allTerms.map((term) => (
//                 <button
//                   key={term.id}
//                   onClick={() => handleTermSelect(term.id)}
//                   className={`
//                     px-6 py-4 rounded-xl font-semibold text-base border-none cursor-pointer transition-all duration-300 transform hover:scale-105
//                     ${selectedTerm === term.id
//                       ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
//                       : 'bg-gradient-to-r from-gray-50 to-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
//                     }
//                   `}
//                 >
//                   {term.name} {term.year}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Student Selection */}
//         {selectedTerm && selectedClass && !selectedStudent && (
//           <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 p-6 mb-6 animate-fade-in">
//             <div className="flex items-center gap-2 mb-4">
//               <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//               <h2 className="text-2xl font-bold text-gray-800">Select Student</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {selectedClass.students && selectedClass.students.map((student) => (
//                 <div
//                   key={student.id}
//                   onClick={() => handleStudentSelect(student)}
//                   className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-transparent cursor-pointer transition-all duration-300 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:scale-105 hover:shadow-md"
//                 >
//                   <img
//                     src={getImageUrl(student.image)}
//                     alt={student.name}
//                     className="w-16 h-16 rounded-full object-cover border-4 border-indigo-200 shadow-sm"
//                   />
//                   <div>
//                     <p className="font-semibold text-gray-800 mb-1">{student.name}</p>
//                     <p className="text-sm text-gray-500">{student.place || 'Student'}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {(!selectedClass.students || selectedClass.students.length === 0) && (
//               <p className="text-center text-gray-500 py-8">
//                 No students available for this class.
//               </p>
//             )}
//           </div>
//         )}

//         {/* Marks Input */}
//         {selectedStudent && (
//           <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 p-6 mb-6 animate-fade-in">
//             <div className="mb-6">
//               <div className="flex items-center gap-4 mb-2">
//                 <img
//                   src={getImageUrl(selectedStudent.image)}
//                   alt={selectedStudent.name}
//                   className="w-20 h-20 rounded-full object-cover border-4 border-indigo-300 shadow-lg"
//                 />
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800 mb-1">Enter Marks</h2>
//                   <p className="text-lg text-indigo-600 font-semibold">{selectedStudent.name}</p>
//                   <p className="text-sm text-gray-500">{selectedStudent.place || 'Student'}</p>
//                 </div>
//               </div>
//             </div>

//             {selectedClass.subjects && selectedClass.subjects.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {selectedClass.subjects.map((subject) => (
//                   <div
//                     key={subject.id}
//                     className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200 transition-all duration-300 hover:shadow-md"
//                   >
//                     <label className="block text-lg font-bold text-gray-800 mb-2">
//                       {subject.name}
//                     </label>
//                     <input
//                       type="number"
//                       value={marks[subject.id] || ''}
//                       onChange={(e) => handleMarkChange(subject.id, e.target.value)}
//                       placeholder="Enter marks (0-100)"
//                       min="0"
//                       max="100"
//                       className="w-full px-4 py-3 rounded-lg border-2 border-indigo-200 outline-none transition-all duration-300 text-lg font-semibold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//                     />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500 py-8">No subjects available for this class.</p>
//             )}
//           </div>
//         )}

//         {/* Error / Success Messages */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-in">
//             <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-red-800 font-semibold">{error}</p>
//           </div>
//         )}

//         {success && (
//           <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-in">
//             <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-green-800 font-semibold">{success}</p>
//           </div>
//         )}

//         {/* Submit Button */}
//         {selectedStudent && selectedTerm && selectedClass.subjects && selectedClass.subjects.length > 0 && (
//           <div className="flex justify-center animate-fade-in">
//             <button
//               onClick={handleSubmit}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-indigo-500/30 cursor-pointer transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 text-lg"
//             >
//               Submit Progress Report
//             </button>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  BookOpen,
  Calendar,
  User,
  Award,
  AlertCircle,
} from "lucide-react";

function MarkStdProgressPrinci() {
  const [allClasses, setAllClasses] = useState([]);
  const [allTerms, setAllTerms] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [csrfToken, setCsrfToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch CSRF token
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/principal/csrf-token/`,
          { withCredentials: true }
        );
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, [backendUrl]);

  // Fetch classes and terms
  useEffect(() => {
    const getCurrentYear = () => new Date().getFullYear();

    const fetchAllClasses = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/principal/get-class-with-stds/`,
          { withCredentials: true }
        );
        setAllClasses(response.data || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    const fetchAllTerms = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/principal/terms/`, {
          withCredentials: true,
        });
        const currentYear = getCurrentYear();
        const filteredTerms = response.data.filter(
          (term) => term.year === currentYear
        );
        setAllTerms(filteredTerms || []);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };

    fetchAllClasses();
    fetchAllTerms();
  }, [backendUrl]);

  const handleClassSelect = (classData) => {
    console.log("Selected class:", classData);
    setSelectedClass(classData);
    setSelectedTerm(null);
    setSelectedStudent(null);
    setMarks({});
  };

  const handleTermSelect = (termId) => {
    setSelectedTerm(termId);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    const initialMarks = {};
    (selectedClass.subjects || []).forEach((subject) => {
      initialMarks[subject.subject_id] = "";
    });
    setMarks(initialMarks);
  };

  const handleMarkChange = (subjectId, mark) => {
    setMarks((prev) => ({ ...prev, [subjectId]: mark }));
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedTerm || !selectedStudent) {
      setError("Please select a class, term, and student.");
      return;
    }

    setIsSubmitting(true);
    try {
      for (let subject of selectedClass.subjects || []) {
        const progressData = {
          student: selectedStudent.id,
          subject: subject.id,
          term: selectedTerm,
          marks: Number(marks[subject.id]),
        };
        console.log("progress data", progressData);

        const response = await fetch(
          `${backendUrl}/api/principal/create-progress-report/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
            credentials: "include",
            body: JSON.stringify(progressData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit progress");
        }
      }

      setSuccess("Progress submitted successfully.");
      setError(null);
      setMarks({});
    } catch (error) {
      console.error("Error during submission:", error);
      setError("Failed to submit progress. Please try again.");
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };
  const getImageUrl = (url) =>
    url?.startsWith("http") ? url : `${backendUrl}${url}`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-1">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="md:text-3xl text-sm font-bold text-blue-600">
                Mark Student Progress
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                Record Academic Performance
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 bg-white rounded-2xl p-3 ">
          <div className="flex items-center space-x-1">
            <div
              className={`flex items-center space-x-2 ${
                selectedClass ? "text-green-600" : "text-gray-400"
              }`}
            >
              <span className="md:text-lg text-xs font-medium">Class</span>
            </div>
            <div
              className={`w-8 h-px ${
                selectedClass ? "bg-green-300" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                selectedTerm ? "text-green-600" : "text-gray-400"
              }`}
            >
              <span className=" md:text-lg text-xs font-medium">Term</span>
            </div>{" "}
            <br />
            <div
              className={`w-8 h-px ${
                selectedTerm ? "bg-green-300" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                selectedStudent ? "text-green-600" : "text-gray-400"
              }`}
            >
              <span className=" md:text-lg text-xs font-medium">Student</span>
            </div>
            <div
              className={`w-8 h-px ${
                selectedStudent ? "bg-green-300" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                selectedStudent ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <span className=" md:text-lg  text-xs font-medium">Marks</span>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="max-w-7xl mx-auto p-1 mb-4">
          <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-sm md:text-lg font-semibold text-blue-600">
                Select Your Class
              </h2>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {allClasses.map((classData, index) => (
                <button
                  key={index}
                  onClick={() => handleClassSelect(classData)}
                  className={`group relative overflow-hidden rounded-xl p-2 md:p-4 font-medium transition-all duration-300 ${
                    selectedClass === classData
                      ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 scale-105"
                      : "bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-sm opacity-80 ">Class</div>
                    <div className="text-sm font-bold">{classData.class}</div>
                  </div>
                  {selectedClass !== classData && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Term Selection */}
        {selectedClass && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-sm md:text-2xl font-semibold text-blue-500">
                Select Term
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {allTerms.map((term) => (
                <button
                  key={term.id}
                  className={`text-xs px-4 py-2 rounded-full border-2 font-medium transition-all duration-200 ${
                    selectedTerm === term.id
                      ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 scale-105"
                      : "border-blue-200 text-blue-700 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                  onClick={() => handleTermSelect(term.id)}
                >
                  {term.name} {term.year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Student Selection */}
        {selectedTerm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-sm font-semibold text-blue-500">
                Select Student
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {selectedClass.students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedStudent === student
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src={getImageUrl(student.image)}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
                    />
                    <div>
                      <div className="font-semibold text-gray-800 text-xs md:text-sm">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {student.place}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marks Entry */}
        {selectedStudent && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xs md:text-sm  font-semibold text-blue-500">
                Enter Marks for {selectedStudent.name}
              </h2>
            </div>
            {selectedClass.subjects && selectedClass.subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedClass.subjects.map((subject) => (
                  <div key={subject.subject_id} className="space-y-2">
                    <label className="block font-semibold text-gray-700 text-xs md:text-sm">
                      {subject.name}
                    </label>
                    <input
                      type="number"
                      value={marks[subject.id] || ""}
                      onChange={(e) =>
                        handleMarkChange(subject.id, e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-sm"
                      placeholder="Enter marks"
                      min="0"
                      max="100"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  No subjects available for this class.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedStudent && selectedTerm && (
          <div className="text-center animate-in slide-in-from-bottom duration-300">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-700 shadow-lg hover:shadow-xl"
              } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Progress"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarkStdProgressPrinci;
