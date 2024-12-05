import React from "react";
import { Navigate } from "react-router-dom";
import { notification } from "antd";

const ProtectedRoute = ({ children, redirectTo = "/login", message = "You must be logged in to access this page." }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  // Check if token is expired or not available
  const isTokenValid = tokenExpiry && new Date().getTime() < tokenExpiry;

  if (!isLoggedIn || !isTokenValid) {
    notification.warning({
      message: "Action Not Allowed",
      description: message,
    });
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
