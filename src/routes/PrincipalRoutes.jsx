import { Routes, Route } from 'react-router-dom'
import React from 'react'
import ProtectedRoute from '../ProtectedRoute.jsx'

// Lazy-loaded pages
{
  /* ====General page======= */
}
const PrinciLogin = React.lazy(() =>
  import('../Pages/PrinciPage/Components/Login/PrinciLogin.jsx'),
)
const PrincipalPage = React.lazy(() =>
  import('../Pages/PrinciPage/PrincipalPage'),
)
const ClassRoomsPrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/ClassRoomPage/ClassRooms/ClassRoomsPrinci.jsx'
  ),
)
const TeacherPagePRNCI = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/TeachersPage/TeacherPagePRNCI.jsx'
  ),
)
const StudentsPagePRNCI = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/StudentsPagePRINCI.jsx'
  ),
)
const Madrasa = React.lazy(() =>
  import('../Pages/PrinciPage/Components/Pages/Madrasa/Madrasa.jsx'),
)
const HandleNotificationPrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/Madrasa/Notification/HandleNotificationPrinci.jsx'
  ),
)
{
  /* ====teachers page======= */
}

const MarkTchrAtte = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/TeachersPage/Mark Tchr Attendnance/MarkTchrAtte.jsx'
  ),
)
const CheckStdAttePrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/Check std atte/CheckStdAttePrinci.jsx'
  ),
)


{/* ====students page======= */}

const AddStudent = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/Add Student/AddStudent.jsx'
  ),
)

const CheckProgressPrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/Check Progress/CheckProgressPrinci.jsx'
  ),
)
const MarkStdAttePrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/Marak std attendance/MarkStdAttePrinci.jsx'
  ),
)
const CheckTchrAttePrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/TeachersPage/Teacher Attendnace/CheckTchrAttePrinci.jsx'
  ),
)

const EventsPrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/Madrasa/Eventss/EventsPrinci.jsx'
  ),
)

const SetClasses = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/Madrasa/ManageMadrasa/SetClasses.jsx'
  ),
)
const EditClasses = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/Madrasa/ManageMadrasa/EditClasses.jsx'
  ),
)
const DailyRoutinePrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/DailyRoutinPrinci/DailyRoutinePrinci.jsx'
  ),
)
const Promotion = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/PassStudents/Promotion.jsx'
  ),
)
const ParentsDetailsPrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/Madrasa/Parents/ParentsDetails/ParentsDetailsPrinci.jsx'
  ),
)
const AddParentsPrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/Madrasa/Parents/AddParents/AddParentsPrinci.jsx'
  ),
)
const StudentsDetails = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/Check std info/StudentsDetails.jsx'
  ),
)
const EditStudentInfo = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/Check std info/EditStudentInfo.jsx'
  ),
)
const MarkStdProgressPrinci = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/Mark std Progress/MarkStdProgressPrinci.jsx'
  ),
)

const AddAcademicYear = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/Madrasa/ManageMadrasa/AddAcademicYear.jsx'
  ),
)
const AddTerm = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/Madrasa/ManageMadrasa/AddTerm.jsx'
  ),
)
const AddSubject = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/Madrasa/ManageMadrasa/AddSubject.jsx'
  ),
)

const AddFee = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/FeeManagement/AddFee.jsx'
  ),
)
const FeeDetail = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/FeeManagement/FeeDetail.jsx'
  ),
)
const OldStudents = React.lazy(() =>
  import(
    '../Pages/PrinciPage/Components/Pages/StudentsPage/OldStudents/OldStudents.jsx'
  ),
)

function PrincipalRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<PrinciLogin />} />

      {/* Protected routes */}
      {/* ====General page======= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="principal">
            <PrincipalPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/classroom"
        element={
          <ProtectedRoute role="principal">
            <ClassRoomsPrinci />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachers-page"
        element={
          <ProtectedRoute role="principal">
            <TeacherPagePRNCI />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students-page"
        element={
          <ProtectedRoute role="principal">
            <StudentsPagePRNCI />
          </ProtectedRoute>
        }
      />

      <Route
        path="/madrasa"
        element={
          <ProtectedRoute role="principal">
            <Madrasa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute role="principal">
            <HandleNotificationPrinci />
          </ProtectedRoute>
        }
      />

      {/* ====Teachers page======= */}
      <Route
        path="/mark-teacher-attendance"
        element={
          <ProtectedRoute role="principal">
            <MarkTchrAtte />
          </ProtectedRoute>
        }
      />
      <Route
        path="/check-teacher-attendance"
        element={
          <ProtectedRoute role="principal">
            <CheckTchrAttePrinci />
          </ProtectedRoute>
        }
      />
      {/* ====students page======= */}
      <Route
        path="/mark-student-attendance"
        element={
          <ProtectedRoute role="principal">
            <MarkStdAttePrinci />
          </ProtectedRoute>
        }
      />
      <Route
        path="/check-student-attendance"
        element={
          <ProtectedRoute role="principal">
            <CheckStdAttePrinci />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-fee"
        element={
          <ProtectedRoute role="principal">
            <AddFee/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/check-fee"
        element={
          <ProtectedRoute role="principal">
            <FeeDetail/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/daily-routine"
        element={
          <ProtectedRoute role="principal">
            <DailyRoutinePrinci />
          </ProtectedRoute>
        }
      />
      <Route
        path="/check-progress"
        element={
          <ProtectedRoute role="principal">
            <CheckProgressPrinci />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mark-progress"
        element={
          <ProtectedRoute role="principal">
            <MarkStdProgressPrinci />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student-info"
        element={
          <ProtectedRoute role="principal">
            <StudentsDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-student"
        element={
          <ProtectedRoute role="principal">
            <EditStudentInfo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-student"
        element={
          <ProtectedRoute role="principal">
            <AddStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pass-students"
        element={
          <ProtectedRoute role="principal">
            <Promotion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/old-students"
        element={
          <ProtectedRoute role="principal">
            <OldStudents />
          </ProtectedRoute>
        }
      />

{/* ====madrasa page======= */}

      <Route
        path="/create-academic-year"
        element={
          <ProtectedRoute role="principal">
            <AddAcademicYear />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute role="principal">
            <EventsPrinci />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-standard"
        element={
          <ProtectedRoute role="principal">
            <SetClasses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-standard"
        element={
          <ProtectedRoute role="principal">
            <EditClasses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parents-details"
        element={
          <ProtectedRoute role="principal">
            <ParentsDetailsPrinci />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-parents"
        element={
          <ProtectedRoute role="principal">
            <AddParentsPrinci />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-term"
        element={
          <ProtectedRoute role="principal">
            <AddTerm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-subject"
        element={
          <ProtectedRoute role="principal">
            <AddSubject />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default PrincipalRoutes
