import React from "react";
import {
  Shield,
  Users,
  UserCircle,
  Building2,
  Target,
  Lock,
  Share2,
  Baby,
  Database,
  UserCheck,
  Gavel,
  RefreshCw,
} from "lucide-react";

const PrivacyPolicy = () => {
  // Sections data for easy maintenance and mapping
  const sections = [
    {
      id: "intro",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "1. Introduction",
      content: (
        <>
          <p>
            <span className="font-semibold text-indigo-200">Edusafa</span> is a
            Madrasa Management Software developed and operated by{" "}
            <span className="font-semibold">AionesparkTechHive LLP</span>. The
            platform is designed to assist madrasas in Kerala in efficiently
            managing student records, attendance, and academic information through
            a secure digital system.
          </p>
          <p className="mt-3">
            This Privacy Policy explains how we collect, use, store, and protect
            information obtained through the use of the Edusafa software.
          </p>
          <p className="mt-3 text-amber-200 bg-amber-900/30 p-3 rounded-lg border border-amber-700/50">
            By using the software, the respective madrasa acknowledges and agrees
            to the terms outlined in this Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: "info-collect",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "2. Information We Collect",
      content: (
        <>
          <div className="space-y-4">
            <div className="bg-slate-800/70 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" /> (A) Student Information
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Name
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Date of Birth
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Gender
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Class
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Parent/Guardian Name
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Phone Number
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Address
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Attendance Records
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Marks / Academic Performance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Student Photograph
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <UserCircle className="w-4 h-4" /> (B) Teacher Information
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Name
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Phone Number
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Email Address
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Qualifications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Relevant Academic Information
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Teacher Photograph
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> (C) Madrasa Information
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Madrasa Name
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Administrator Contact Details
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Login Credentials
                </li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "purpose",
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "3. Purpose of Data Collection",
      content: (
        <>
          <p>The collected information is used strictly for the following purposes:</p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-slate-200">
            <li>Attendance Management</li>
            <li>Maintenance of Academic Records</li>
            <li>Report Generation</li>
            <li>Administrative Operations</li>
          </ul>
          <p className="mt-3 text-emerald-200 bg-emerald-900/30 p-3 rounded-lg border border-emerald-700/50">
            We do not sell, rent, or share personal information for marketing or
            commercial advertising purposes.
          </p>
        </>
      ),
    },
    {
      id: "security",
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "4. Data Security",
      content: (
        <>
          <p>We take appropriate technical and organizational measures to ensure the security and confidentiality of user data.</p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-slate-200">
            <li>The software is hosted on a secure VPS server provided by Hostinger.</li>
            <li>Passwords are stored using encryption mechanisms.</li>
            <li>Role-based access control (Administrator / Teacher) is implemented.</li>
            <li>Regular data backups are maintained.</li>
          </ul>
          <p className="mt-3 text-amber-200 bg-amber-900/30 p-3 rounded-lg border border-amber-700/50">
            While we strive to use commercially acceptable means to protect personal
            data, no method of transmission over the Internet is 100% secure.
          </p>
        </>
      ),
    },
    {
      id: "sharing",
      icon: <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "5. Data Sharing",
      content: (
        <>
          <p>Information may be shared only under the following circumstances:</p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-slate-200">
            <li>With authorized staff members of the respective madrasa</li>
            <li>When required by applicable law or legal process</li>
          </ul>
          <p className="mt-3 font-medium text-white">
            We do not disclose personal data to third parties beyond the circumstances stated above.
          </p>
        </>
      ),
    },
    {
      id: "children",
      icon: <Baby className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "6. Children's Data",
      content: (
        <>
          <p>
            As the platform processes data relating to minors, student information
            is collected only through authorized representatives of the respective
            madrasa.
          </p>
          <p className="mt-3 text-amber-200 bg-amber-900/30 p-3 rounded-lg border border-amber-700/50">
            Obtaining parental or guardian consent is the responsibility of the
            respective madrasa.
          </p>
        </>
      ),
    },
    {
      id: "retention",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "7. Data Retention",
      content: (
        <>
          <ul className="space-y-2 list-disc list-inside text-slate-200">
            <li>Data will be retained for as long as the madrasa account remains active.</li>
            <li>Upon termination of services, all associated data will be permanently deleted within 45 days.</li>
          </ul>
        </>
      ),
    },
    {
      id: "rights",
      icon: <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "8. User Rights",
      content: (
        <>
          <p className="font-medium text-white mb-2">
            Madrasa administrators have the right to:
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-200">
            <li>Request correction of inaccurate information</li>
            <li>Request termination of the account</li>
            <li>Request access to or a copy of stored data</li>
          </ul>
          <p className="mt-3">
            Such requests may be submitted through official communication channels.
          </p>
        </>
      ),
    },
    {
      id: "legal",
      icon: <Gavel className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "9. Legal Compliance",
      content: (
        <>
          <p>
            Edusafa operates in compliance with applicable Indian data protection
            laws, including the{" "}
            <span className="font-medium text-white">
              Digital Personal Data Protection Act, 2023
            </span>.
          </p>
        </>
      ),
    },
    {
      id: "updates",
      icon: <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "10. Updates to This Policy",
      content: (
        <>
          <p>
            AionesparkTechHive LLP reserves the right to update or modify this
            Privacy Policy at any time. Any changes will be published within the
            software or on the official website.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-200 font-sans antialiased">
      {/* subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23334155\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* header card */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-600/20 rounded-2xl backdrop-blur-sm border border-indigo-500/30 mb-4">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-300" />
          </div>
          <h1 className="text-xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-emerald-200 pb-2">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-indigo-200/80 max-w-2xl mx-auto">
            for Edusafa Madrasa Management Software · Last updated:{" "}
            {new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* main content cards */}
        <div className="space-y-5 sm:space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="group bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-indigo-900/20 transition-all duration-300 overflow-hidden"
            >
              {/* section header */}
              <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-slate-700/80 bg-slate-800/90">
                <div className="flex-shrink-0 p-2 bg-indigo-600/30 rounded-xl text-indigo-300 group-hover:scale-110 transition-transform duration-200">
                  {section.icon}
                </div>
                <h2 className="text-sm sm:text-xl lg:text-2xl font-semibold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>

              {/* section body */}
              <div className="p-4 sm:p-6 text-sm sm:text-base leading-relaxed text-slate-300 space-y-2">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* footer note */}
        <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-slate-500 border-t border-slate-800/80 pt-6">
          <p>
            © {new Date().getFullYear()} AionesparkTechHive LLP · All rights reserved.
          </p>
          <p className="mt-1">
            For privacy-related queries, please contact: privacy@aionesparktechhive.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;