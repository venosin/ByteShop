// src/components/PrivateRoute.js
import React from 'react'

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const PrivateRoute = ({ children }) => {
  const { getCokies } = useAuth();
  const token = getCokies();

  return token!==null ? children : <Navigate to="/" />;
};
