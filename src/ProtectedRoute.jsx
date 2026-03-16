import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, role }) => {
  const isManagementUI = !!localStorage.getItem("management_ui");
  const isTeacherUI = !!localStorage.getItem("teacher_ui");
  const isStudentUI = !!localStorage.getItem("parent_ui");
  const isPrincipalUI = !!localStorage.getItem("principal_ui");

  if (role === "management" && !isManagementUI) {
    return <Navigate to="login" replace />;
  }

  if (role === "teacher" && !isTeacherUI) {
    return <Navigate to="/teacher-login" replace />;
  }

  if (role === "parent" && !isStudentUI) {
    return <Navigate to="/parent-login" replace />;
  }

  if (role === "principal" && !isPrincipalUI) {
    return <Navigate to="/principal-login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProtectedRoute;
