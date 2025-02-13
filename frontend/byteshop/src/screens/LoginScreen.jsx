import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el hook del contexto
import Cookies from 'js-cookie';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth(); // Obtener estado de autenticación y función de login del contexto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Verificar si el usuario ya está autenticado y redirigir al dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { email, password };
      
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar token en cookies
      Cookies.set('authToken', data.token, { path: '/', secure: true });

      // Usar el contexto para gestionar la sesión
      login(data.token);
      
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
