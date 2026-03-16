import { Routes, Route } from 'react-router-dom'
import React from 'react'
import ProtectedRoute from '../ProtectedRoute'
import AddFeeTchr from '../Pages/TeachersPage/Components/Pages/Students/FeeManagement/AddFeeTchr.jsx'
import FeeDetailTchr from '../Pages/TeachersPage/Components/Pages/Students/FeeManagement/FeeDetailTchr.jsx'
import Notification from '../Pages/TeachersPage/Components/Notification/Notification.jsx'

// Genaral Pages
const TeachersLogin = React.lazy(() =>
  import('../Pages/TeachersPage/Components/Login/TeachersLogin.jsx'),
)
const TeachersPage = React.lazy(() =>
  import('../Pages/TeachersPage/TeachersPage.jsx'),
)


const ClassRoomPageTeachr = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/ClassRoom/ClassRoomPageTCHR.jsx'
  ),
)
const StudentsPage = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/Students/StudentsPageTchr.jsx'
  ),
)

const TeacherProfileTchr = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/Profile/TeacherProfileTchr.jsx'
  ),
)
const TchrAttendanceTCH = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/Attendance/Attendnace/TchrAttendanceTCH.jsx'
  ),
)

// =========ClassRoom Page ==============

const ClassRoomTeachr = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/ClassRoom/ClassRoom/ClassRoomTeachr.jsx'
  ),
)

const GivNotificaTHR = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/ClassRoom/Giv Notification/GivNotificaTHR.jsx'
  ),
)
const AddTimeTables = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/ClassRoom/Add TimeTables/AddTimeTables.jsx'
  ),
)

// =========Students Page ==============

const MarkStdAtteTCH = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/Students/Mark Std Attendance/MarkStdAtteTCH.jsx'
  ),
)
const CheckStdAtteTCH = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/Students/Check Std Attendance/CheckStdAtteTCH.jsx'
  ),
)
const MarkProgressTCH = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/Students/MarkProgress/MarkProgressTCH.jsx'
  ),
)
const CheckStdProgrTCH = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/Students/CheckProgress/CheckStdProgrTCH.jsx'
  ),
)

const DailyRoutine = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/Students/DailyRoutine/CheckDailyRoutin.jsx'
  ),
)

const StudentsInfoTCH = React.lazy(() =>
  import(
    '../Pages/TeachersPage/Components/Pages/Students/Students Info/StudentsInfoTCH.jsx'
  ),
)



function TeacherRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<TeachersLogin />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="teacher">
            <TeachersPage />
          </ProtectedRoute>
        }
      />
<Route
        path="/notification"
        element={
          <ProtectedRoute role="teacher">
            <Notification/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/classroom-page"
        element={
          <ProtectedRoute role="teacher">
            <ClassRoomPageTeachr />
          </ProtectedRoute>
        }
      />
      <Route
        path="/classroom"
        element={
          <ProtectedRoute role="teacher">
            <ClassRoomTeachr />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-timetable"
        element={
          <ProtectedRoute role="teacher">
            <AddTimeTables />
          </ProtectedRoute>
        }
      />

      <Route
        path="/give-notification"
        element={
          <ProtectedRoute role="teacher">
            <GivNotificaTHR />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students-page"
        element={
          <ProtectedRoute role="teacher">
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mark-students-attendance"
        element={
          <ProtectedRoute role="teacher">
            <MarkStdAtteTCH />
          </ProtectedRoute>
        }
      />
      <Route
        path="/check-std-attendance"
        element={
          <ProtectedRoute role="teacher">
            <CheckStdAtteTCH />
          </ProtectedRoute>
        }
      />
      <Route
        path="/check-progress"
        element={
          <ProtectedRoute role="teacher">
            <CheckStdProgrTCH />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mark-progress"
        element={
          <ProtectedRoute role="teacher">
            <MarkProgressTCH />
          </ProtectedRoute>
        }
      />
      <Route
        path="/daily-routine"
        element={
          <ProtectedRoute role="teacher">
            <DailyRoutine />
          </ProtectedRoute>
        }
      />

      <Route
        path="/fee"
        element={
          <ProtectedRoute role="teacher">
            <AddFeeTchr/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Check-fee"
        element={
          <ProtectedRoute role="teacher">
            <FeeDetailTchr/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/students-info"
        element={
          <ProtectedRoute role="teacher">
            <StudentsInfoTCH />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute role="teacher">
            <TchrAttendanceTCH />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute role="teacher">
            <TeacherProfileTchr />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default TeacherRoutes
