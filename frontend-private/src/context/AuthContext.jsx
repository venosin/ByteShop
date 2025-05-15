import Cookies from "js-cookie";
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const SERVER_URL = "http://localhost:4000/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCokie, setAuthCokie] = useState(null);
  /*
  const useLogin = async (email, password) => {
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      setUser({ email }); // puedes guardar más datos si quieres
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };*/

  // Verificar si existen empleados
  /*  const checkEmployeesExist = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/employees");
      const data = await response.json();

      // Verifica si el arreglo de empleados está vacío
      if (response.ok && Array.isArray(data) && data.length > 0) {
        setUsersExist(true);
      } else {
        setUsersExist(false);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error al verificar empleados:", error);
      setLoading(false);
    }
  }; */

  const Login = async (email, password) => {
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify({ email }));
      setAuthCokie(data.token);
      setUser({ email });

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    // Si luego agregas logout en backend, puedes mantener el fetch aquí.
    // En logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthCokie(null);
    setUser(null);
  };

  // En useEffect
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (token) {
      setAuthCokie(token);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, Login, logout, authCokie, setAuthCokie }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);