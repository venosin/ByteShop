import React from "react";
import { createContext, useState, useEffect } from "react";
const API = "http://localhost:4000/api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCokie, setAuthCokie] = useState(null);

  const Login = async (email, password) => {
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Importante para incluir cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      
      // Guardar token en localStorage como respaldo
      localStorage.setItem("authToken", data.token);
      
      // Guardar información básica del usuario
      const userInfo = { email };
      localStorage.setItem("user", JSON.stringify(userInfo));
      
      setAuthCokie(data.token);
      setUser(userInfo);

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      // Llamar al endpoint de logout en el backend para limpiar la cookie
      await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include", // Importante para incluir cookies en la petición
      });
    } catch (error) {
      console.error("Error durante el logout:", error);
    } finally {
      // Limpiar datos locales independientemente de si la petición al servidor tuvo éxito
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setAuthCokie(null);
      setUser(null);
    }
  };

  // En useEffect para restaurar la sesión y solo verificar servidor al inicio inicial
  useEffect(() => {
    // Primero, restauramos la sesión desde localStorage (comportamiento normal)
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");
    if (token) {
      setAuthCokie(token);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }

    // Adicionalmente, verificamos si el servidor está disponible
    // Pero solo usamos esto para limpiar la sesión si NO HAY conexión
    const checkServer = async () => {
      try {
        // Solo hacemos una solicitud ping básica para ver si el servidor está disponible
        await fetch(`${API}`, {
          method: "HEAD",
          credentials: "include",
          // Importante: No esperamos respuesta correcta, solo que el servidor responda
        });
        // Si llegamos aquí, el servidor está respondiendo, no hacemos nada
      } catch (error) {
        // SOLO si el servidor no está disponible, limpiamos la sesión
        console.log("Servidor no disponible, cerrando sesión", error.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setAuthCokie(null);
        setUser(null);
      }
    };

    // Ejecutamos la verificación del servidor
    checkServer();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, Login, logout, authCokie, setAuthCokie, API }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export el contexto para poder usarlo en el hook
export { AuthContext };

