import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  User,
  MapPin,
  Phone,
  Briefcase,
  Users,
  Calendar,
  Search,
  Heart,
} from "lucide-react";

function ParentsDetails() {
  const [parents, setParents] = useState([
   {
      id: 1,
      name: "Hassan Ahmed",
      place: "Mumbai, Maharashtra",
      number: "+91 98765-43210",
      job: "Software Engineer",
      age: "45 years",
      position: "Father",
      members_count: 4,
    },
    {
      id: 2,
      name: "Fatima Begum",
      place: "Delhi, NCR",
      number: "+91 98765-43211",
      job: "Medical Doctor",
      age: "42 years",
      position: "Mother",
      members_count: 3,
    },
    {
      id: 3,
      name: "Abdul Rahman Khan",
      place: "Hyderabad, Telangana",
      number: "+91 98765-43212",
      job: "Business Owner",
      age: "50 years",
      position: "Father",
      members_count: 5,
    },
    {
      id: 4,
      name: "Aisha Siddiqui",
      place: "Bangalore, Karnataka",
      number: "+91 98765-43213",
      job: "Teacher",
      age: "38 years",
      position: "Mother",
      members_count: 2,
    },
    {
      id: 5,
      name: "Omar Farooq",
      place: "Chennai, Tamil Nadu",
      number: "+91 98765-43214",
      job: "Architect",
      age: "47 years",
      position: "Father",
      members_count: 4,
    },
    {
      id: 6,
      name: "Khadija Hassan",
      place: "Kolkata, West Bengal",
      number: "+91 98765-43215",
      job: "Lawyer",
      age: "44 years",
      position: "Mother",
      members_count: 3,
    },
    {
      id: 7,
      name: "Mohammed Ibrahim",
      place: "Lucknow, Uttar Pradesh",
      number: "+91 98765-43216",
      job: "Police Officer",
      age: "41 years",
      position: "Father",
      members_count: 4,
    },
    {
      id: 8,
      name: "Zainab Malik",
      place: "Ahmedabad, Gujarat",
      number: "+91 98765-43217",
      job: "Nurse",
      age: "39 years",
      position: "Mother",
      members_count: 3,
    },
    {
      id: 9,
      name: "Yusuf Ismail",
      place: "Pune, Maharashtra",
      number: "+91 98765-43218",
      job: "Accountant",
      age: "46 years",
      position: "Father",
      members_count: 4,
    },
    {
      id: 10,
      name: "Mariam Alia",
      place: "Jaipur, Rajasthan",
      number: "+91 98765-43219",
      job: "Graphic Designer",
      age: "37 years",
      position: "Mother",
      members_count: 3,
    },

  ]);
  
  const [expandedParentId, setExpandedParentId] = useState(null);
  const [members, setMembers] = useState({
  1: [
      {
        id: 101,
        name: "Fatima Hassan",
        relation: "Daughter",
        age: "16 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 102,
        name: "Muhammad Hassan",
        relation: "Son",
        age: "13 years",
        marital_status: "Student",
        job: "Middle School Student"
      },
      {
        id: 103,
        name: "Aisha Hassan",
        relation: "Daughter",
        age: "8 years",
        marital_status: "Student",
        job: "Elementary Student"
      },
      {
        id: 104,
        name: "Zainab Hassan",
        relation: "Spouse",
        age: "43 years",
        marital_status: "Married",
        job: "Marketing Manager"
      }
    ],
    2: [
      {
        id: 201,
        name: "Omar Farooq",
        relation: "Son",
        age: "19 years",
        marital_status: "Student",
        job: "College Student"
      },
      {
        id: 202,
        name: "Mariam Farooq",
        relation: "Daughter",
        age: "15 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 203,
        name: "Khadija Farooq",
        relation: "Spouse",
        age: "45 years",
        marital_status: "Married",
        job: "Financial Analyst"
      }
    ],
    3: [
      {
        id: 301,
        name: "Abdullah Malik",
        relation: "Son",
        age: "22 years",
        marital_status: "Single",
        job: "Software Developer"
      },
      {
        id: 302,
        name: "Amina Malik",
        relation: "Daughter",
        age: "19 years",
        marital_status: "Student",
        job: "University Student"
      },
      {
        id: 303,
        name: "Yusuf Malik",
        relation: "Son",
        age: "16 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 304,
        name: "Safia Malik",
        relation: "Spouse",
        age: "48 years",
        marital_status: "Married",
        job: "Real Estate Agent"
      },
      {
        id: 305,
        name: "Bilal Malik",
        relation: "Father",
        age: "76 years",
        marital_status: "Widowed",
        job: "Retired"
      }
    ],
    4: [
      {
        id: 401,
        name: "Ibrahim Siddiqui",
        relation: "Son",
        age: "14 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 402,
        name: "Rashid Siddiqui",
        relation: "Spouse",
        age: "40 years",
        marital_status: "Married",
        job: "Electrician"
      }
    ],
    5: [
      {
        id: 501,
        name: "Hamza Khan",
        relation: "Son",
        age: "20 years",
        marital_status: "Student",
        job: "Engineering Student"
      },
      {
        id: 502,
        name: "Layla Khan",
        relation: "Daughter",
        age: "17 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 503,
        name: "Zayn Khan",
        relation: "Son",
        age: "12 years",
        marital_status: "Student",
        job: "Middle School Student"
      },
      {
        id: 504,
        name: "Nadia Khan",
        relation: "Spouse",
        age: "45 years",
        marital_status: "Married",
        job: "Interior Designer"
      }
    ],
    6: [
      {
        id: 601,
        name: "Mustafa Ahmed",
        relation: "Son",
        age: "18 years",
        marital_status: "Student",
        job: "College Student"
      },
      {
        id: 602,
        name: "Rabia Ahmed",
        relation: "Daughter",
        age: "15 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 603,
        name: "Tariq Ahmed",
        relation: "Spouse",
        age: "46 years",
        marital_status: "Married",
        job: "Construction Manager"
      }
    ],
    7: [
      {
        id: 701,
        name: "Sumayyah Ali",
        relation: "Daughter",
        age: "16 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 702,
        name: "Hassan Ali",
        relation: "Son",
        age: "14 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 703,
        name: "Fatimah Ali",
        relation: "Spouse",
        age: "40 years",
        marital_status: "Married",
        job: "Dental Hygienist"
      },
      {
        id: 704,
        name: "Ayesha Ali",
        relation: "Mother",
        age: "68 years",
        marital_status: "Widowed",
        job: "Retired Teacher"
      }
    ],
    8: [
      {
        id: 801,
        name: "Imran Hussain",
        relation: "Son",
        age: "17 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 802,
        name: "Zubair Hussain",
        relation: "Son",
        age: "13 years",
        marital_status: "Student",
        job: "Middle School Student"
      },
      {
        id: 803,
        name: "Sakina Hussain",
        relation: "Spouse",
        age: "38 years",
        marital_status: "Married",
        job: "Pharmacist"
      }
    ],
    9: [
      {
        id: 901,
        name: "Usman Raza",
        relation: "Son",
        age: "21 years",
        marital_status: "Student",
        job: "Medical Student"
      },
      {
        id: 902,
        name: "Hafsa Raza",
        relation: "Daughter",
        age: "18 years",
        marital_status: "Student",
        job: "College Student"
      },
      {
        id: 903,
        name: "Kulsum Raza",
        relation: "Spouse",
        age: "44 years",
        marital_status: "Married",
        job: "HR Manager"
      },
      {
        id: 904,
        name: "Karim Raza",
        relation: "Father",
        age: "72 years",
        marital_status: "Married",
        job: "Retired"
      }
    ],
    10: [
      {
        id: 1001,
        name: "Ayah Rahman",
        relation: "Daughter",
        age: "15 years",
        marital_status: "Student",
        job: "High School Student"
      },
      {
        id: 1002,
        name: "Isa Rahman",
        relation: "Son",
        age: "11 years",
        marital_status: "Student",
        job: "Elementary Student"
      },
      {
        id: 1003,
        name: "Jamal Rahman",
        relation: "Spouse",
        age: "39 years",
        marital_status: "Married",
        job: "Chef"
      }
    ],
    
  
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState({});

  const handleRowClick = async (parentId) => {
    if (expandedParentId === parentId) {
      setExpandedParentId(null);
      return;
    }

    setExpandedParentId(parentId);
    
    // Simulate loading for demo purposes
    if (!members[parentId]) {
      setLoading(prev => ({ ...prev, [parentId]: true }));
      // Simulate API delay
      setTimeout(() => {
        setLoading(prev => ({ ...prev, [parentId]: false }));
      }, 500);
    }
  };

  const filteredParents = parents.filter((parent) =>
    `${parent.name} ${parent.place} ${parent.number} ${parent.job}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-1">
      {/* Header Section */}
      <div className="px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500 mb-4">
        <div className="mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title section */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Parents Directory
                </h1>
                <p className="text-xs text-white/90">
                  Manage and view parent information and family details
                </p>
              </div>
            </div>
          </div>

          {/* Button + Search */}
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search parents by name, place or number..."
              className="border border-gray-100 rounded px-4 py-2 w-full md:w-96 h-[42px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Parents List */}
      <div className="px-1 py-1 space-y-3">
        {filteredParents.map((parent, parentIndex) => (
          <div
            key={parent.id}
            className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300 active:scale-[0.99]"
          >
            {/* Parent Card - Always Visible */}
            <div
              className="px-4 py-3 cursor-pointer"
              onClick={() => handleRowClick(parent.id)}
            >
              <div className="flex items-center gap-3">
                {/* Parent Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">
                      {parent.name}
                    </h3>
                    <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      #{parentIndex + 1}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[100px]">{parent.place}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Phone className="w-3 h-3" />
                      <span>{parent.number}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Users className="w-3 h-3" />
                      <span>{parent.members_count} members</span>
                    </div>
                  </div>
                </div>

                {/* Expand Icon */}
                <div className="flex-shrink-0">
                  {expandedParentId === parent.id ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedParentId === parent.id && (
              <div className="border-t border-slate-100 bg-slate-50/50">
                <div className="p-2 space-y-4">
                  {/* Parent Details Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar className="w-3 h-3 text-blue-500" />
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                          Age
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">
                        {parent.age}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Briefcase className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                          Job
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {parent.job}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <User className="w-4 h-4 text-purple-500" />
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                          Position
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {parent.position}
                      </p>
                    </div>
                  </div>

                  {/* Family Members Section */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-50 rounded-lg">
                          <Heart className="w-3.5 h-3.5 text-indigo-500" />
                        </div>
                        <h4 className="text-xs font-semibold text-slate-800">
                          Family Members
                        </h4>
                      </div>
                      <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {members[parent.id]?.length || 0} members
                      </span>
                    </div>

                    {loading[parent.id] ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                      </div>
                    ) : members[parent.id] && members[parent.id].length > 0 ? (
                      <div className="space-y-2">
                        {members[parent.id].map((member, memberIndex) => (
                          <div
                            key={member.id}
                            className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                          >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-xs font-semibold text-indigo-600 flex-shrink-0">
                              {memberIndex + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-semibold text-slate-800">
                                  {member.name}
                                </p>
                                <span className="text-[12px] md:text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                                  {member.relation}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                                <span className="text-[12px] md:text-xs text-slate-500">
                                  Age: {member.age}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="text-[12px] md:text-xs text-slate-500">
                                  {member.martial_status}
                                </span>
                                {member.job && (
                                  <>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="text-[12px] md:text-xs text-slate-500 truncate max-w-[120px]">
                                      {member.job}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                          <Users className="w-5 h-5 text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-500">
                          No family members found
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredParents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">
              No Parents Found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParentsDetails;