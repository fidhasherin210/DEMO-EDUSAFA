import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// ✅ വലിയ റൂട്ടുകളെ Lazy ആയി മാറ്റുക
const ManagementRoutes = React.lazy(() => import('./routes/ManagementRoutes.jsx'))
const PrincipalRoutes = React.lazy(() => import('./routes/PrincipalRoutes.jsx'))
const TeacherRoutes = React.lazy(() => import('./routes/TeacherRoutes.jsx'))
const StudentRoutes = React.lazy(() => import('./routes/ParentRoutes.jsx'))

// General Pages
const Home = React.lazy(() => import('./Pages/HomePage/MainPage.jsx'))
const AboutPage = React.lazy(() => import('./Pages/AboutPage/AboutPage.jsx'))
const SupportPage = React.lazy(() => import('./Pages/SupportPage/SupportPage.jsx'))
const PrivacyPolicy = React.lazy(() => import('./Pages/PrivacyAndPolicy/PrivacyPolicy.jsx'))
const TermsConditions = React.lazy(() => import('./Pages/TermsConditions/TermsConditions.jsx'))

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-screen h-screen">
            <div className="text-center">
              <div className="inline-flex flex-col items-center gap-4 px-6 py-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-emerald-500 rounded-sm animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-3 h-3 bg-blue-500 rounded-sm animate-bounce" style={{ animationDelay: '200ms' }}></span>
                  <span className="w-3 h-3 bg-purple-500 rounded-sm animate-bounce" style={{ animationDelay: '400ms' }}></span>
                </div>
                <span className="text-sm font-medium tracking-wide text-slate-600">LOADING</span>
              </div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />

          <Route path="/management/*" element={<ManagementRoutes />} />
          <Route path="/principal/*" element={<PrincipalRoutes />} />
          <Route path="/teacher/*" element={<TeacherRoutes />} />
          <Route path="/parent/*" element={<StudentRoutes />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App