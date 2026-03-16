import { Routes, Route } from 'react-router-dom'
import React from 'react'
import ProtectedRoute from '../ProtectedRoute.jsx'
import AddCommittee from '../Pages/Management/Components/Pages/Madrasa/Committee/AddCommittee.jsx'

// Lazy-loaded pages
const ManagementLogin = React.lazy(() =>
  import('../Pages/Management/ManagementLogin'),
)
const ManagementPage = React.lazy(() =>
  import('../Pages/Management/ManagementPage'),
)
const ClassaRoomAuth = React.lazy(() =>
  import('../Pages/Management/Components/Pages/ClassRoom/ClassaRoomAuth.jsx'),
)
const TeachersPage = React.lazy(() =>
  import('../Pages/Management/Components/Pages/Teachers/TchrPageManage.jsx'),
)
const StudentsPage = React.lazy(() =>
  import('../Pages/Management/Components/Pages/Students/StudentPageMange.jsx'),
)
const MadrasaPage = React.lazy(() =>
  import('../Pages/Management/Components/Pages/Madrasa/MdrsaMnage.jsx'),
)

const AddManagementAuth = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Madrasa/AddManagement/AddManagementAuth.jsx'
  ),
)
const ThrAttendanceAuth = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Teachers/Teacherattendance/ThrAttendanceAuth.jsx'
  ),
)
const StdAttendanceAuth = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Students/Studentattendance/StdAttendanceAuth.jsx'
  ),
)
const StdProgressAuth = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Students/Studentprogress/StdProgressAuth.jsx'
  ),
)
const MarkTchrAttendanceAuth = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Teachers/MarkTeacherAttendance/MarkTchrAttendancAuth.jsx'
  ),
)
const AddTchrAuth = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Teachers/Addteacher/AddTchrAuth.jsx'
  ),
)
const TeacherInfoAuth = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Teachers/TeacherInfo/TeacherInfoAuth.jsx'
  ),
)
const EditTeacherInfo = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Teachers/TeacherInfo/EditTeacherInfo.jsx'
  ),
)
const StudentInfo = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Students/Studentinfo/StudentInfo.jsx'
  ),
)
const OldStudents = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Students/OldStudents/OldStudents.jsx'
  ),
)
const CreateEventsAuth = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Madrasa/Eventss/CreateEventsAuth.jsx'
  ),
)

const AddMemorial = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Madrasa/Memorial/AddMemorial.jsx'
  ),
)
const AddParents = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Madrasa/Parents/AddParents/AddParents.jsx'
  ),
)
const ParentsDetails = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Madrasa/Parents/ParentsDetails/ParentsDetails.jsx'
  ),
)
const FeeAuth = React.lazy(() =>
  import(
    '../Pages/Management/Components/Pages/Students/FeeMnagement/FeeAuth.jsx'
  ),
)
const AboutPage = React.lazy(() =>
  import(
    '../Pages/AboutPage/AboutPage.jsx'
  ),
)

function ManagementRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="login" element={<ManagementLogin />} />

      {/* Protected routes */}

      {/* ============= PAGE ROUTE ============ */}

      <Route
        path="dashboard"
        element={
          <ProtectedRoute role="management">
            <ManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="classroom"
        element={
          <ProtectedRoute role="management">
            <ClassaRoomAuth />
          </ProtectedRoute>
        }
      />

      <Route
        path="teachers-page"
        element={
          <ProtectedRoute role="management">
            <TeachersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="students-page"
        element={
          <ProtectedRoute role="management">
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="madrasa"
        element={
          <ProtectedRoute role="management">
            <MadrasaPage />
          </ProtectedRoute>
        }
      />

      {/* ============= PAGE ROUTE END ============ */}

      <Route
        path="mark-teacher-attendance"
        element={
          <ProtectedRoute role="management">
            <MarkTchrAttendanceAuth />
          </ProtectedRoute>
        }
      />

      <Route
        path="teachers-attendance"
        element={
          <ProtectedRoute role="management">
            <ThrAttendanceAuth />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-teacher"
        element={
          <ProtectedRoute role="management">
            <AddTchrAuth />
          </ProtectedRoute>
        }
      />

      <Route
        path="teacher-info"
        element={
          <ProtectedRoute role="management">
            <TeacherInfoAuth />
          </ProtectedRoute>
        }
      />
      <Route
        path="edit-teacher-info"
        element={
          <ProtectedRoute role="management">
            <EditTeacherInfo />
          </ProtectedRoute>
        }
      />

      <Route
        path="students-attendance"
        element={
          <ProtectedRoute role="management">
            <StdAttendanceAuth />
          </ProtectedRoute>
        }
      />

      <Route
        path="students-info"
        element={
          <ProtectedRoute role="management">
            <StudentInfo />
          </ProtectedRoute>
        }
      />

      <Route
        path="students-progress"
        element={
          <ProtectedRoute role="management">
            <StdProgressAuth />
          </ProtectedRoute>
        }
      />

      <Route
        path="fee"
        element={
          <ProtectedRoute role="management">
            <FeeAuth />
          </ProtectedRoute>
        }
      />
      <Route
        path="old-students"
        element={
          <ProtectedRoute role="management">
            <OldStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-management"
        element={
          <ProtectedRoute role="management">
            <AddManagementAuth />
          </ProtectedRoute>
        }
      />

      <Route
        path="events-management"
        element={
          <ProtectedRoute role="management">
            <CreateEventsAuth />
          </ProtectedRoute>
        }
      />

      <Route
        path="view-parents"
        element={
          <ProtectedRoute role="management">
            <ParentsDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-parents"
        element={
          <ProtectedRoute role="management">
            <AddParents />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-memorial"
        element={
          <ProtectedRoute role="management">
            <AddMemorial />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-committee"
        element={
          <ProtectedRoute role="management">
            <AddCommittee />
          </ProtectedRoute>
        }
      />
      <Route
        path="about"
        element={
          <ProtectedRoute role="management">
            <AboutPage/>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default ManagementRoutes
