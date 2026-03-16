import React from "react";
import {
  Shield,
  Cloud,
  CreditCard,
  UserCheck,
  Database,
  Lock,
  Ban,
  AlertTriangle,
  XCircle,
  Scale,
  ShieldOff
} from "lucide-react";

const TermsConditions = () => {
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
            Madrasa Management Software developed, owned, and operated by{" "}
            <span className="font-semibold">AionesparkTechHive LLP</span>.
          </p>
          <p className="mt-3">
            By accessing or using Edusafa, the user (the respective madrasa or
            its authorized representatives) agrees to be bound by these Terms
            and Conditions. These Terms constitute a legally binding agreement
            between the user and AionesparkTechHive LLP.
          </p>
          <p className="mt-3 text-amber-200 bg-amber-900/30 p-3 rounded-lg border border-amber-700/50">
            If you do not agree to these Terms, you must not use the software.
          </p>
        </>
      ),
    },
    {
      id: "service",
      icon: <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "2. Nature of Service",
      content: (
        <>
          <p>
            Edusafa is a cloud-based Madrasa Management Software provided as a
            Software-as-a-Service (SaaS) solution.
          </p>
          <p className="mt-2">
            The service is delivered through an online platform and is hosted
            on a Virtual Private Server (VPS) environment provided by Hostinger.
          </p>
          <p className="mt-2">
            While the Company makes reasonable efforts to ensure service
            availability and reliability, uninterrupted or error-free operation
            of the service is not guaranteed.
          </p>
          <div className="mt-3 bg-slate-800/70 p-3 rounded-lg">
            <p className="font-medium text-slate-300 mb-1">
              Service interruptions may occur due to:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
              <li>Technical maintenance</li>
              <li>Server-related issues</li>
              <li>Cyberattacks</li>
              <li>Natural disasters</li>
              <li>Events beyond the Company's reasonable control</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "fees",
      icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "3. Subscription and Fees",
      content: (
        <>
          <p>
            <span className="font-medium text-white">Annual subscription fee starts from </span>{" "}
            <span className=" font-bold text-emerald-300">₹4000</span>.
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-slate-200">
            <li>Account activated only after successful payment.</li>
            <li className="font-medium text-amber-300">
              All payments are non-refundable.
            </li>
            <li>
              Subscription renewal is strictly manual and must be completed by
              the user each year.
            </li>
            <li>
              Failure to renew may result in suspension or termination of the
              account.
            </li>
            <li>No trial period is provided.</li>
          </ul>
        </>
      ),
    },
    {
      id: "account",
      icon: <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "4. Account Responsibility",
      content: (
        <>
          <p className="font-medium text-white mb-2">
            The respective madrasa is solely responsible for:
          </p>
          <ul className="space-y-2 list-disc list-inside text-slate-200">
            <li>
              Maintaining the confidentiality and security of login credentials
            </li>
            <li>
              Ensuring the accuracy and completeness of the data entered into
              the system
            </li>
            <li>
              Promptly notifying the Company of any unauthorized access or
              suspected security breach
            </li>
          </ul>
          <p className="mt-3 text-amber-200 bg-amber-900/30 p-3 rounded-lg border border-amber-700/50">
            The Company shall not be liable for losses arising from user
            negligence, misuse, or inaccurate data entry.
          </p>
        </>
      ),
    },
    {
      id: "ip",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "5. Data Ownership and Intellectual Property",
      content: (
        <>
          <p>
            <span className="font-medium text-white">All data</span> uploaded or
            entered into the platform remains the sole property of the respective
            madrasa.
          </p>
          <p className="mt-2">
            Edusafa, including its software architecture, design, features, and
            underlying technology, is the intellectual property of
            AionesparkTechHive LLP.
          </p>
          <p className="mt-2">
            The Company does not claim ownership over user data and will not use
            such data for commercial or marketing purposes.
          </p>
        </>
      ),
    },
    {
      id: "security",
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "6. Data Security and Limitations",
      content: (
        <>
          <p>
            The Company implements reasonable technical and organizational
            safeguards to protect user data.
          </p>
          <p className="mt-2 font-medium text-white">
            However, the user acknowledges and agrees that:
          </p>
          <ul className="mt-2 space-y-2 list-disc list-inside text-slate-200">
            <li>No system can guarantee 100% security.</li>
            <li>
              Data may be exposed, altered, or lost due to circumstances beyond
              the Company's control, including but not limited to:
              <ul className="ml-6 mt-1 list-disc list-inside text-sm text-slate-300">
                <li>Cyberattacks or hacking attempts</li>
                <li>Server compromise</li>
                <li>Database corruption</li>
                <li>Third-party hosting failures</li>
                <li>Force majeure events</li>
              </ul>
            </li>
          </ul>
          <p className="mt-3 text-amber-200 bg-amber-900/30 p-3 rounded-lg border border-amber-700/50">
            Although backup mechanisms are maintained, the Company does not
            guarantee complete data recovery in the event of severe technical
            failures or database damage. By using the service, the user accepts
            these inherent risks.
          </p>
        </>
      ),
    },
    {
      id: "prohibited",
      icon: <Ban className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "7. Prohibited Use",
      content: (
        <>
          <p className="font-medium text-white mb-2">Users shall not:</p>
          <ul className="space-y-2 list-disc list-inside text-slate-200">
            <li>Engage in any unlawful activities using the platform</li>
            <li>Attempt to hack, reverse engineer, or compromise system security</li>
            <li>Interfere with or disrupt the integrity or performance of the service</li>
            <li>Upload false, misleading, or fraudulent information</li>
          </ul>
          <p className="mt-3 text-amber-200 bg-amber-900/30 p-3 rounded-lg border border-amber-700/50">
            Violation of these provisions may result in immediate suspension or
            termination of the account without prior notice.
          </p>
        </>
      ),
    },
    {
      id: "liability",
      icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "8. Limitation of Liability",
      content: (
        <>
          <p className="font-medium text-white">
            To the maximum extent permitted by law:
          </p>
          <ul className="mt-2 space-y-2 list-disc list-inside text-slate-200">
            <li>
              The Company shall not be liable for indirect, incidental,
              consequential, or financial losses arising from the use or
              inability to use the service.
            </li>
            <li>
              The Company shall not be responsible for data loss, revenue loss,
              reputational damage, or operational disruptions.
            </li>
          </ul>
          <p className="mt-3  text-emerald-300 bg-slate-800/80 p-4 rounded-xl border border-emerald-700/50">
            In any event, the Company's total liability shall be strictly limited
            to the subscription amount paid for the relevant year (₹4000).
          </p>
        </>
      ),
    },
    {
      id: "termination",
      icon: <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "9. Termination",
      content: (
        <>
          <p>
            The Company reserves the right to suspend or terminate accounts that
            violate these Terms.
          </p>
          <p className="mt-2">The madrasa may discontinue the service at its discretion.</p>
          <p className="mt-2">
            Upon termination, all associated data will be permanently deleted
            within 45 days, in accordance with the Privacy Policy.
          </p>
        </>
      ),
    },
    
    {
      id: "jurisdiction",
      icon: <Scale className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "10. Governing Law and Jurisdiction",
      content: (
        <>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of India.
          </p>
          <p className="mt-2">
            Any disputes arising out of or relating to these Terms shall be
            subject to the exclusive jurisdiction of the competent courts in the
            State of Kerala, India.
          </p>
        </>
      ),
    },
    {
      id: "no-association",
      icon: <ShieldOff className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "11. No Official Association",
      content: (
        <>
          <p>
            Edusafa is an independent Madrasa software 
             it is not affiliated with, endorsed by, or officially connected to
            any religious or educational
            organization.
          </p>
          <p className="mt-2">
            Any resemblance to institutional structures or naming conventions is
            purely for functional and descriptive purposes.
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
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-emerald-200 pb-2">
            Terms and Conditions
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
                <h2 className="text-sm md:text-2xl font-semibold text-white tracking-tight">
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
          <p className="mt-1">For any queries, please contact your service representative.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;