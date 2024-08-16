import React from 'react';
import { AuthContext, useAuth } from './Provider.jsx';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';

export default function ProtectRoute({ role }) {
  const { user } = useContext(AuthContext)

  // Show a loading indicator until user state is resolved
  if (user === null) {
    return <p>Loading...</p>;
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to='/login' />;
  }

  // Redirect to homepage if user role is not allowed
  if (role && !role.includes(user.role)) {
    return <Navigate to='/dashboard' />;
  }

  // Render the protected routes
  return <Outlet />;
}

