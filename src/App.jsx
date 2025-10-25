import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// ==================== Lazy-loaded Pages ====================
// General
const Home = React.lazy(() => import("./Pages/HomePage/Home"));
const AboutPage = React.lazy(() => import("./Pages/AboutPage/AboutPage"));
const SupportPage = React.lazy(() => import("./Pages/SupportPage/SupportPage.jsx"));
const ChatBot = React.lazy(() => import("./Pages/HomePage/Components/ChatBot/ChatBot.jsx"));

// Management
const ManagementLogin = React.lazy(() => import("./Pages/Management/ManagementLogin"));
const ManagementPage = React.lazy(() => import("./Pages/Management/ManagementPage"));
const AddManagementAuth = React.lazy(() => import("./Pages/Management/Components/AddManagement/AddManagementAuth.jsx"));
const ThrAttendanceAuth = React.lazy(() => import("./Pages/Management/Components/Teacherattendance/ThrAttendanceAuth.jsx"));
const StdAttendanceAuth = React.lazy(() => import("./Pages/Management/Components/Studentattendance/StdAttendanceAuth.jsx"));
const StdProgressAuth = React.lazy(() => import("./Pages/Management/Components/Studentprogress/StdProgressAuth.jsx"));
const MarkTchrAttendanceAuth = React.lazy(() => import("./Pages/Management/Components/MarkTeacherAttendance/MarkTchrAttendancAuth.jsx"));
const AddTchrAuth = React.lazy(() => import("./Pages/Management/Components/Addteacher/AddTchrAuth.jsx"));
const TeacherInfoAuth = React.lazy(() => import("./Pages/Management/Components/TeacherInfo/TeacherInfoAuth.jsx"));
const EditTeacherInfo = React.lazy(() => import("./Pages/Management/Components/TeacherInfo/EditTeacherInfo.jsx"));
const StudentInfo = React.lazy(() => import("./Pages/Management/Components/Studentinfo/StudentInfo.jsx"));
const CreateEventsAuth = React.lazy(() => import("./Pages/Management/Components/Eventss/CreateEventsAuth.jsx"));
const ClassaRoomAuth = React.lazy(() => import("./Pages/Management/Components/ClassRoom/ClassaRoomAuth.jsx"));
const AddMemorial = React.lazy(() => import("./Pages/Management/Components/Memorial/AddMemorial.jsx"));
const AddParents = React.lazy(() => import("./Pages/Management/Components/Parents/AddParents/AddParents.jsx"));
const ParentsDetails = React.lazy(() => import("./Pages/Management/Components/Parents/ParentsDetails/ParentsDetails.jsx"));

// Principal
const PrinciLogin = React.lazy(() => import("./Pages/PrinciPage/Components/Login/PrinciLogin.jsx"));
const PrincipalPage = React.lazy(() => import("./Pages/PrinciPage/PrincipalPage"));
const AddStudent = React.lazy(() => import("./Pages/PrinciPage/Components/Add Student/AddStudent.jsx"));
const MarkTchrAtte = React.lazy(() => import("./Pages/PrinciPage/Components/Mark Tchr Attendnance/MarkTchrAtte.jsx"));
const CheckStdAttePrinci = React.lazy(() => import("./Pages/PrinciPage/Components/Check std atte/CheckStdAttePrinci.jsx"));
const CheckProgressPrinci = React.lazy(() => import("./Pages/PrinciPage/Components/Check Progress/CheckProgressPrinci.jsx"));
const MarkStdAttePrinci = React.lazy(() => import("./Pages/PrinciPage/Components/Marak std attendance/MarkStdAttePrinci.jsx"));
const CheckTchrAttePrinci = React.lazy(() => import("./Pages/PrinciPage/Components/Teacher Attendnace/CheckTchrAttePrinci.jsx"));
const ClassRoomsPrinci = React.lazy(() => import("./Pages/PrinciPage/Components/ClassRooms/ClassRoomsPrinci.jsx"));
const EventsPrinci = React.lazy(() => import("./Pages/PrinciPage/Components/Eventss/EventsPrinci.jsx"));
const HandleNotificationPrinci = React.lazy(() => import("./Pages/PrinciPage/Components/Notification/HandleNotificationPrinci.jsx"));
const SetClasses = React.lazy(() => import("./Pages/PrinciPage/Components/ClassRooms/SetClasses.jsx"));
const EditClasses = React.lazy(() => import("./Pages/PrinciPage/Components/ClassRooms/EditClasses.jsx"));
const DailyRoutinePrinci = React.lazy(() => import("./Pages/PrinciPage/Components/DailyRoutinPrinci/DailyRoutinePrinci.jsx"));
const PassStudents = React.lazy(() => import("./Pages/PrinciPage/Components/PassStudents/PassStudents.jsx"));
const ParentsDetailsPrinci = React.lazy(() => import("./Pages/PrinciPage/Components/Parents/ParentsDetails/ParentsDetailsPrinci.jsx"));
const AddParentsPrinci = React.lazy(() => import("./Pages/PrinciPage/Components/Parents/AddParents/AddParentsPrinci.jsx"));
const StudentsDetails = React.lazy(() => import("./Pages/PrinciPage/Components/Check std info/StudentsDetails.jsx"));
const EditStudentInfo = React.lazy(() => import("./Pages/PrinciPage/Components/Check std info/EditStudentInfo.jsx"));
const MarkStdProgressPrinci = React.lazy(() => import("./Pages/PrinciPage/Components/Mark std Progress/MarkStdProgressPrinci.jsx"));

// Teacher
const TeachersLogin = React.lazy(() => import("./Pages/TeachersPage/Components/Login/TeachersLogin"));
const TeachersPage = React.lazy(() => import("./Pages/TeachersPage/TeachersPage"));
const DailyRoutine = React.lazy(() => import("./Pages/TeachersPage/Components/DailyRoutine/DailyRoutine.jsx"));
const TeacherProfileTchr = React.lazy(() => import("./Pages/TeachersPage/Components/Profile/TeacherProfileTchr.jsx"));
const MarkProgressTCH = React.lazy(() => import("./Pages/TeachersPage/Components/Std Progress/MarkProgressTCH.jsx"));
const TchrAttendanceTCH = React.lazy(() => import("./Pages/TeachersPage/Components/Attendnace/TchrAttendanceTCH.jsx"));
const StudentsInfoTCH = React.lazy(() => import("./Pages/TeachersPage/Components/Students Info/StudentsInfoTCH.jsx"));
const MarkStdAtteTCH = React.lazy(() => import("./Pages/TeachersPage/Components/Mark Std Attendance/MarkStdAtteTCH.jsx"));
const CheckStdAtteTCH = React.lazy(() => import("./Pages/TeachersPage/Components/Check Std Attendance/CheckStdAtteTCH.jsx"));
const CheckStdProgrTCH = React.lazy(() => import("./Pages/TeachersPage/Components/Std Progress/CheckStdProgrTCH.jsx"));
const AddTimeTables = React.lazy(() => import("./Pages/TeachersPage/Components/Add TimeTables/AddTimeTables.jsx"));
const TchrNotification = React.lazy(() => import("./Pages/TeachersPage/Components/Notification/TchrNotification.jsx"));
const GivNotificaTHR = React.lazy(() => import("./Pages/TeachersPage/Components/Giv Notification/GivNotificaTHR.jsx"));
const ClassRoomTeachr = React.lazy(() => import("./Pages/TeachersPage/Components/ClassRoom/ClassRoomTeachr.jsx"));
const StdAtteList = React.lazy(() => import("./Pages/TeachersPage/Components/StdAttenList/StdAtteList.jsx"));

// Student
const StudentLogin = React.lazy(() => import("./Pages/StudentsPge/Components/Login/StudentLogin"));
const StudentsPage = React.lazy(() => import("./Pages/StudentsPge/StudentsPage"));
const StudentsProfile = React.lazy(() => import("./Pages/StudentsPge/Components/StudentsProfile/StudentsProfile"));
const StudentsAttendance = React.lazy(() => import("./Pages/StudentsPge/Components/Attendance/StudentsAttendnace"));
const StudentsProgressSTD = React.lazy(() => import("./Pages/StudentsPge/Components/Progress/StudentsProgressSTD.jsx"));
const ContactTeacher = React.lazy(() => import("./Pages/StudentsPge/Components/Contact Teacher/ContactTeacher.jsx"));
const TimeTable = React.lazy(() => import("./Pages/StudentsPge/Components/Time Table/TimeTable.jsx"));
const ClassRoom = React.lazy(() => import("./Pages/StudentsPge/Components/Class Room/ClassRoom.jsx"));
const Notification = React.lazy(() => import("./Pages/StudentsPge/Components/Notification/Notification.jsx"));
const MyRoutine = React.lazy(() => import("./Pages/StudentsPge/Components/DailuRoutine/MyRoutine.jsx"));
const MarkMyRoutine = React.lazy(() => import("./Pages/StudentsPge/Components/DailuRoutine/MarkMyRoutine.jsx"));

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100">
  <div className="text-center">
    <div className="inline-flex items-center gap-3 px-8 py-4 ">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
      <span className="text-lg font-semibold text-slate-700">Loading</span>
    </div>
  </div>
</div>
      }>
      <Routes>
        {/* // ==================== General PAGES & COMPONENTS ==================== */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        {/* // ==================== MANAGEMENT PAGES & COMPONENTS ==================== */}
        <Route path="/management-login" element={<ManagementLogin />} />{" "}
        <Route
          path="/management-details"
          element={
            <ProtectedRoute role="authority">
              <ManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-management"
          element={
            <ProtectedRoute role="authority">
              <AddManagementAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-teachers-attendance"
          element={
            <ProtectedRoute role="authority">
              <ThrAttendanceAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-students-attendance"
          element={
            <ProtectedRoute role="authority">
              <StdAttendanceAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-students-info"
          element={
            <ProtectedRoute role="authority">
              <StudentInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-students-progress"
          element={
            <ProtectedRoute role="authority">
              <StdProgressAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mark-teacher-attendance"
          element={
            <ProtectedRoute role="authority">
              <MarkTchrAttendanceAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-teacher"
          element={
            <ProtectedRoute role="authority">
              <AddTchrAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-teacher-info"
          element={
            <ProtectedRoute role="authority">
              <TeacherInfoAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-gallery"
          element={
            <ProtectedRoute role="authority">
              <CreateEventsAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-teacher-info"
          element={
            <ProtectedRoute role="authority">
              <EditTeacherInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classroom-auth"
          element={
            <ProtectedRoute role="authority">
              <ClassaRoomAuth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-parents-management"
          element={
            <ProtectedRoute role="authority">
              <AddParents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-parents-management"
          element={
            <ProtectedRoute role="authority">
              <ParentsDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-memorial"
          element={
            <ProtectedRoute role="authority">
              <AddMemorial />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat-bot-management"
          element={
            <ProtectedRoute role="authority">
              <ChatBot />
            </ProtectedRoute>
          }
        />
        {/* // ==================== PRINCIPAL PAGES & COMPONENTS ==================== */}
        {/*Principal Routes */}
        <Route path="/principal-login" element={<PrinciLogin />} />
        <Route
          path="/principalpage"
          element={
            <ProtectedRoute role="principal">
              <PrincipalPage />
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
          path="/check-tchr-attendnace"
          element={
            <ProtectedRoute role="principal">
              <CheckTchrAttePrinci />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mark-tchr-attendnace"
          element={
            <ProtectedRoute role="principal">
              <MarkTchrAtte />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-std-atte-princi"
          element={
            <ProtectedRoute role="principal">
              <CheckStdAttePrinci />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-std-Info-princi"
          element={
            <ProtectedRoute role="principal">
              <StudentsDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-std-progress-princi"
          element={
            <ProtectedRoute role="principal">
              <CheckProgressPrinci />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mark-std-atte-princi"
          element={
            <ProtectedRoute role="principal">
              <MarkStdAttePrinci />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-gallery-princi"
          element={
            <ProtectedRoute role="principal">
              <EventsPrinci />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classrooms-princi"
          element={
            <ProtectedRoute role="principal">
              <ClassRoomsPrinci />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification-princi"
          element={
            <ProtectedRoute role="principal">
              <HandleNotificationPrinci />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-std-princi"
          element={
            <ProtectedRoute role="principal">
              <SetClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-std-princi"
          element={
            <ProtectedRoute role="principal">
              <EditClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily-routin-princi"
          element={
            <ProtectedRoute role="principal">
              <DailyRoutinePrinci />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passstudents"
          element={
            <ProtectedRoute role="principal">
              <PassStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parents-details-princi"
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
          path="/edit-student-princi"
          element={
            <ProtectedRoute role="principal">
              <EditStudentInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat-bot-principal"
          element={
            <ProtectedRoute role="principal">
              <ChatBot />
            </ProtectedRoute>
          }
        />
         <Route
          path="/add-progress-principal"
          element={
            <ProtectedRoute role="principal">
              <MarkStdProgressPrinci/>
            </ProtectedRoute>
          }
        />
        {/* // ==================== TEACHER PAGES & COMPONENTS ==================== */}
        {/* Teacher Routes */}
        <Route path="/teacherlogin" element={<TeachersLogin />} />
        <Route
          path="/teacherspage"
          element={
            <ProtectedRoute role="teacher">
              <TeachersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacherprofile"
          element={
            <ProtectedRoute role="teacher">
              <TeacherProfileTchr />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-attendnace"
          element={
            <ProtectedRoute role="teacher">
              <TchrAttendanceTCH />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students-info-teacher"
          element={
            <ProtectedRoute role="teacher">
              <StudentsInfoTCH />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mark-attendance-teacher"
          element={
            <ProtectedRoute role="teacher">
              <MarkStdAtteTCH />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-std-attendance-teacher"
          element={
            <ProtectedRoute role="teacher">
              <CheckStdAtteTCH />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-std-progress-teacher"
          element={
            <ProtectedRoute role="teacher">
              <CheckStdProgrTCH />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-timetable-teacher"
          element={
            <ProtectedRoute role="teacher">
              <AddTimeTables />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-notification"
          element={
            <ProtectedRoute role="teacher">
              <TchrNotification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/give-notification-teacher"
          element={
            <ProtectedRoute role="teacher">
              <GivNotificaTHR />
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
          path="/classroom-teacher"
          element={
            <ProtectedRoute role="teacher">
              <ClassRoomTeachr />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-prgrss-teacher"
          element={
            <ProtectedRoute role="teacher">
              <MarkProgressTCH />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat-bot-teacher"
          element={
            <ProtectedRoute role="teacher">
              <ChatBot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/std-attendence-list"
          element={
            <ProtectedRoute role="teacher">
              <StdAtteList/>
            </ProtectedRoute>
          }
        />
        {/* // ==================== STUDENT PAGES & COMPONENTS ==================== */}
        <Route path="/studentlogin" element={<StudentLogin />} />{" "}
        <Route
          path="/chat-bot-student"
          element={
            <ProtectedRoute role="student">
              <ChatBot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentspage"
          element={
            <ProtectedRoute role="student">
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentsprofile"
          element={
            <ProtectedRoute role="student">
              <StudentsProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentattendance"
          element={
            <ProtectedRoute role="student">
              <StudentsAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentprogress"
          element={
            <ProtectedRoute role="student">
              <StudentsProgressSTD />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-teacher"
          element={
            <ProtectedRoute role="student">
              <ContactTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/time-table"
          element={
            <ProtectedRoute role="student">
              <TimeTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classroom"
          element={
            <ProtectedRoute role="student">
              <ClassRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-notification"
          element={
            <ProtectedRoute role="student">
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-my-routine"
          element={
            <ProtectedRoute role="student">
              <MyRoutine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mark-my-routine"
          element={
            <ProtectedRoute role="student">
              <MarkMyRoutine />
            </ProtectedRoute>
          }
        />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
