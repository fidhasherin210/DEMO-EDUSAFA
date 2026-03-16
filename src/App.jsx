import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ManagementRoutes from './routes/ManagementRoutes.jsx'
import PrincipalRoutes from './routes/PrincipalRoutes.jsx'
import TeacherRoutes from './routes/TeacherRoutes.jsx'
import StudentRoutes from './routes/ParentRoutes.jsx'
import PrivacyPolicy from './Pages/PrivacyAndPolicy/PrivacyPolicy.jsx'
import TermsConditions from './Pages/TermsConditions/TermsConditions.jsx'

const Home = React.lazy(() => import('./Pages/HomePage/MainPage.jsx'))
const AboutPage = React.lazy(() => import('./Pages/AboutPage/AboutPage.jsx'))
const SupportPage = React.lazy(() => import('./Pages/SupportPage/SupportPage.jsx')) 


  function App() {
    return (
      <Router>
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-screen h-screen">
              {/* No background — clean and minimal */}
              <div className="text-center">
                <div className="inline-flex flex-col items-center gap-4 px-6 py-3">
                  {/* Modern bouncing blocks — like school app loading animation */}
                  <div className="flex gap-2">
                    <span
                      className="w-3 h-3 bg-emerald-500 rounded-sm animate-[bounce_0.8s_infinite] rotate-12"
                      style={{ animationDelay: '0ms' }}
                    ></span>
                    <span
                      className="w-3 h-3 bg-blue-500 rounded-sm animate-[bounce_0.8s_infinite] -rotate-12"
                      style={{ animationDelay: '200ms' }}
                    ></span>
                    <span
                      className="w-3 h-3 bg-purple-500 rounded-sm animate-[bounce_0.8s_infinite] rotate-12"
                      style={{ animationDelay: '400ms' }}
                    ></span>
                  </div>

                  {/* Friendly "loading" copy with a school-ish feel */}
                  <span className="text-sm font-medium tracking-wide text-slate-600">
                    LOADING
                  </span>

                  {/* Optional subtle underline — like a notebook line */}
                  <div className="w-12 h-px bg-slate-200"></div>
                </div>
              </div>
            </div>
          }
        >
          <Routes>
            {/* // ==================== General PAGES & COMPONENTS ==================== */}
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
