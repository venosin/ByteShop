// src/components/PrivateRoute.js
import React from 'react'

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const PrivateRoute = ({ children }) => {
  const { authCokie } = useAuth();
  console.log(authCokie, 'auth desde private route');

  return authCokie ? children : <Navigate to="/" />;
};
