// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({ children, roles }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Not logged in?
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles is provided, only allow those roles
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}