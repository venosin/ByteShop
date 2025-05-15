import React from "react";
import NavBar from "./NavBar";
import { useAuth } from "../context/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Brands from "../pages/Brands";
import Models from "../pages/Models";
import Categories from "../pages/Categories";
import { PrivateRoute } from "./PrivateRoute";
function Navegation() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/models" element={<Models />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </>
  );
}
export default Navegation;
