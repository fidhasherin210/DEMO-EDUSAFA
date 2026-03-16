import { Routes, Route } from 'react-router-dom'
import React from 'react'
import ProtectedRoute from '../ProtectedRoute.jsx'

const ParentLogin = React.lazy(() =>
  import('../Pages/ParentsPge/Components/Login/ParentLogin.jsx'),
)
const ParentsPage = React.lazy(() =>
  import('../Pages/ParentsPge/ParentsPage.jsx'),
)
const AboutPage = React.lazy(() =>
  import('../Pages/AboutPage/AboutPage.jsx'),
)
const ClassRoomPage = React.lazy(() =>
  import('../Pages/ParentsPge/Components/ClassRoomPage/ClassRoomPage.jsx'),
)
const StudentsProfile = React.lazy(() =>
  import('../Pages/ParentsPge/Components/StudentsProfile/StudentsProfile.jsx'),
)
const StudentsAttendance = React.lazy(() =>
  import('../Pages/ParentsPge/Components/Attendance/StudentsAttendnace.jsx'),
)
const StudentsProgressSTD = React.lazy(() =>
  import('../Pages/ParentsPge/Components/Progress/StudentsProgressSTD.jsx'),
)
const ContactTeacher = React.lazy(() =>
  import(
    '../Pages/ParentsPge/Components/ClassRoomPage/Contact Teacher/ContactTeacher.jsx'
  ),
)
const TimeTable = React.lazy(() =>
  import(
    '../Pages/ParentsPge/Components/ClassRoomPage/Time Table/TimeTable.jsx'
  ),
)
const ClassRoom = React.lazy(() =>
  import(
    '../Pages/ParentsPge/Components/ClassRoomPage/Class Room/ClassRoom.jsx'
  ),
)
const Notification = React.lazy(() =>
  import('../Pages/ParentsPge/Components/Notification/Notification.jsx'),
)
const MyRoutine = React.lazy(() =>
  import('../Pages/ParentsPge/Components/DailuRoutinePage/MyRoutine.jsx'),
)
const MarkMyRoutine = React.lazy(() =>
  import('../Pages/ParentsPge/Components/DailuRoutinePage/MarkMyRoutine.jsx'),
)
const FeeStudents = React.lazy(() =>
  import('../Pages/ParentsPge/Components/FeeManagement/FeeStudents.jsx'),
)
const RoutinePage = React.lazy(() =>
  import('../Pages/ParentsPge/Components/DailuRoutinePage/RoutinPage.jsx'),
)

function ParentRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="login" element={<ParentLogin />} />

      {/* Protected */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute role="parent">
            <ParentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="about"
        element={
          <ProtectedRoute role="parent">
            <AboutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="class-room-page/:studentId"
        element={
          <ProtectedRoute role="parent">
            <ClassRoomPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="student-profile/:studentId"
        element={
          <ProtectedRoute role="parent">
            <StudentsProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="attendance/:studentId"
        element={
          <ProtectedRoute role="parent">
            <StudentsAttendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="progress/:studentId"
        element={
          <ProtectedRoute role="parent">
            <StudentsProgressSTD />
          </ProtectedRoute>
        }
      />

      <Route
        path="classroom"
        element={
          <ProtectedRoute role="parent">
            <ClassRoom />
          </ProtectedRoute>
        }
      />

      <Route
        path="notification/:studentId"
        element={
          <ProtectedRoute role="parent">
            <Notification />
          </ProtectedRoute>
        }
      />

      <Route
        path="routine/:studentId"
        element={
          <ProtectedRoute role="parent">
            <RoutinePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="fee/:studentId"
        element={
          <ProtectedRoute role="parent">
            <FeeStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="contact-teacher/:studentId"
        element={
          <ProtectedRoute role="parent">
            <ContactTeacher />
          </ProtectedRoute>
        }
      />
      <Route
        path="check-timetable/:studentId"
        element={
          <ProtectedRoute role="parent">
            <TimeTable />
          </ProtectedRoute>
        }
      />
      <Route
        path="mark-routine/:studentId"
        element={
          <ProtectedRoute role="parent">
            <MarkMyRoutine />
          </ProtectedRoute>
        }
      />
      <Route
        path="check-routine/:studentId"
        element={
          <ProtectedRoute role="parent">
            <MyRoutine />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default ParentRoutes
