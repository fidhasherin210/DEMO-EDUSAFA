import React, { useState } from "react";
import { Users, UserCheck, BookOpen } from "lucide-react";
import AddPrincipal from "./AddPrincipal";
import AddNormalTchr from "./AddNormalTchr";

const AddTchrAuth = () => {
  const [activeForm, setActiveForm] = useState("teacher"); // Tracks which form is active
  const [message, setMessage] = useState("");

  // Sample data for demonstration
  const sampleTeachers = [
    {
      id: 1,
      name: "Salman",
      subject: "Mathematics",
      experience: "8 years",
      qualification: "M.Sc Mathematics, B.Ed"
    },
    {
      id: 2,
      name: "Murshid Ahammed",
      subject: "Physics",
      experience: "5 years",
      qualification: "M.Sc Physics, B.Ed"
    },
    {
      id: 3,
      name: "Emaan Siddihique",
      subject: "English Literature",
      experience: "6 years",
      qualification: "M.A English, B.Ed"
    }
  ];

  const samplePrincipals = [
    {
      id: 1,
      name: "Aysha",
      experience: "15 years",
      qualification: "Ph.D in Education, M.Ed",
      achievements: "Best Principal Award 2023"
    },
    {
      id: 2,
      name: "Fathima",
      experience: "12 years",
      qualification: "Ph.D in Educational Leadership",
      achievements: "School Excellence Award"
    }
  ];

  const sampleStats = {
    totalTeachers: 28,
    totalPrincipals: 2,
    activeStaff: 30,
    departments: 8
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-1">
      <div className=" mx-auto">
      {/* Header Section */}
  
        {/* Header */}
        <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-2xl">
                  Staff Management
                </h1>
                <p className="text-xs text-white/90">
                  Add New Teacher and Principal
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto p-1">
        {/* Toggle Section */}
        <div className="-mt-3 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-3">
          <h2 className="text-base md:text-xl font-semibold text-blue-600 mb-3 text-center">
            Select Staff Type
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center ">
            <div className=" rounded-xl p-1 inline-flex gap-2">
              <button
                className={`
                  flex items-center p-2 md:p-4 rounded-lg font-medium transition-all shadow-md duration-200 transform
                  ${activeForm === "teacher"
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-sm"
                  }
                `}
                onClick={() => setActiveForm("teacher")}
              >
                <Users className="w-6 h-6 mr-2" />
            <span className="text-xs">Add New Teacher</span>
              </button>
              <button
                className={`
                  flex items-center shadow-md  p-2 md:p-4 rounded-lg font-medium transition-all duration-200 transform
                  ${activeForm === "principal"
                    ? "bg-gradient-to-r from-sky-600 to-sky-400 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-sm"
                  }
                `}
                onClick={() => setActiveForm("principal")}
              >
                <UserCheck className="w-6 h-6 mr-1" />
                <span className="text-xs">Add New Principal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Section - Optional */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500">Total Teachers</div>
            <div className="text-lg font-bold text-blue-600">{sampleStats.totalTeachers}</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500">Principals</div>
            <div className="text-lg font-bold text-purple-600">{sampleStats.totalPrincipals}</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500">Active Staff</div>
            <div className="text-lg font-bold text-green-600">{sampleStats.activeStaff}</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500">Departments</div>
            <div className="text-lg font-bold text-orange-600">{sampleStats.departments}</div>
          </div>
        </div> */}

        {/* Sample Data Display - Optional */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              Recent Teachers
            </h3>
            <div className="space-y-2">
              {sampleTeachers.slice(0, 2).map((teacher) => (
                <div key={teacher.id} className="text-xs border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-800">{teacher.name}</span>
                  <span className="text-gray-500 ml-2">- {teacher.subject}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <UserCheck className="w-4 h-4 mr-2 text-purple-600" />
              Current Principals
            </h3>
            <div className="space-y-2">
              {samplePrincipals.map((principal) => (
                <div key={principal.id} className="text-xs border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-800">{principal.name}</span>
                  <span className="text-gray-500 ml-2">- {principal.experience}</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Render Forms Conditionally */}
        <div className="transform transition-all duration-300 ease-in-out">
          {activeForm === "teacher" && (
            <div className="animate-fadeIn">
              <AddNormalTchr setMessage={setMessage} />
            </div>
          )}
          {activeForm === "principal" && (
            <div className="animate-fadeIn">
              <AddPrincipal setMessage={setMessage} />
            </div>
          )}
        </div>

        {/* Display Message */}
        {message && (
          <div className="mt-6 transform transition-all duration-300 ease-in-out animate-slideDown">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-green-800 font-medium">{message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
{/* Custom Styles */}
<style>
  {`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }

    .animate-slideDown {
      animation: slideDown 0.3s ease-out;
    }
  `}
</style>

    </div>
    </div>
  );
};

export default AddTchrAuth;