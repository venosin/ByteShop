import React, {useEffect} from 'react'
import Cookies from 'js-cookie';

import { createContext, useContext, useState } from "react";

const SERVER_URL = "http://localhost:4000/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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


  const useLogin = async (email, password) => {
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
   const token = Cookies.get('authToken'); 
   console.log(token, "token desde el contexto");

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getCokies = async () => {

 const token = Cookies.get('authToken'); 
   console.log(token, "token desde fuera contexto");
return token || null;
}


 const logout = async () => {
  await fetch(`${SERVER_URL}/logout`, {
    method: "POST",
    credentials: "include", // importante
  });
  Cookies.remove('authToken'); // Eliminar la cookie del token
};


  return (
    <AuthContext.Provider value={{ user, useLogin, logout, getCokies}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
