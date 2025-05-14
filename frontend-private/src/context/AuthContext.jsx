import Cookies from 'js-cookie';
import React from 'react'
import { createContext, useContext, useState } from "react";

const SERVER_URL = "http://localhost:4000/api";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCokie, setAuthCokie] = useState(false);
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
  const checkEmployeesExist = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/employees');
      const data = await response.json();

      // Verifica si el arreglo de empleados está vacío
      if (response.ok && Array.isArray(data) && data.length > 0) {
        setUsersExist(true);
      } else {
        setUsersExist(false);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error al verificar empleados:', error);
      setLoading(false);
    }
  };


  const Login = async (email, password) => {
  try {
    const response = await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la autenticación");
    }

    const data = await response.json();
    setAuthCokie(data.token);  
    setUser({ email }); 
    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

 const logout = async () => {
  await fetch(`${SERVER_URL}/logout`, {
    method: "POST",
    credentials: "include", // importante
  });
  Cookies.remove('authToken'); // Eliminar la cookie del token
  setAuthCokie(null); // Limpiar el estado de autenticación
  setUser(null); // Limpiar el usuario
};


  return (
    <AuthContext.Provider value={{ user, Login, logout, authCokie, setAuthCokie}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);