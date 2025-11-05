import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!auth.token) {
    // Ajoute la page actuelle en paramètre "redirect"
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return children;
};

export default PrivateRoute;
