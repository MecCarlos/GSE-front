import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>; // ou un vrai spinner si tu veux
  }

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
