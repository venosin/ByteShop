// App.js
import React from "react";
import Employees from "./pages/Employees";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Brands from "./pages/Brands";
import Models from "./pages/Models";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import Navegation from "./components/Navegation";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navegation />
      </Router>
    </AuthProvider>
  );
}

export default App;
