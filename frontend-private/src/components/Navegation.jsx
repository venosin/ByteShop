import React from 'react'
import NavBar from './NavBar';
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Brands from '../pages/Brands';
import Models from '../pages/Models';
import Categories from '../pages/Categories';
import { PrivateRoute } from './PrivateRoute';
// Este componente sí puede usar useLocation
function Navegation() {
  const location = useLocation();
  const hideNavbarRoutes = ["/"]; // rutas donde NO se debe mostrar NavBar

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/employees" element={
              <PrivateRoute>
              <Employees />
            </PrivateRoute>
            } />
        <Route path="/brands" element=
        {
            <PrivateRoute>
              <Brands />
            </PrivateRoute>
          } />
        
        <Route path="/models" element={
            <PrivateRoute>
              <Models />
            </PrivateRoute>
        } />
        <Route path="/categories" element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
        } />
      </Routes>
    </>
  );
}
export default Navegation;