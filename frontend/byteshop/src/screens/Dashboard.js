import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el hook del contexto

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, mensaje, logout } = useAuth(); // Obtener estado de autenticación, mensaje y función de logout del contexto

  // Verificar si el usuario está autenticado, si no, redirigir al login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluir cookies en la solicitud
      });
      
      if (!response.ok) {
        throw new Error('Error al cerrar sesión');
      }
      
      logout(); // Eliminar la sesión del contexto
      navigate('/'); // Redirigir al login
    } catch (error) {
      alert('Error al cerrar sesión: ' + error.message);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <h1 className="display-4 text-center mb-4">Dashboard</h1>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {/* Botón Usuarios */}
          <div className="col">
            <div
              className="card shadow-sm h-100"
              onClick={() => handleNavigation('/registerModel')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h5 className="card-title text-primary">Usuarios</h5>
                <p className="card-text">Gestiona la lista de usuarios de la aplicación.</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-primary w-100">Ir</button>
              </div>
            </div>
          </div>

          {/* Botón Productos */}
          <div className="col">
            <div
              className="card shadow-sm h-100"
              onClick={() => handleNavigation('/productos')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h5 className="card-title text-success">Productos</h5>
                <p className="card-text">Gestiona los productos en el inventario.</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-success w-100">Ir</button>
              </div>
            </div>
          </div>

          {/* Botón Categorías */}
          <div className="col">
            <div
              className="card shadow-sm h-100"
              onClick={() => handleNavigation('/categorias')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h5 className="card-title text-info">Categorías</h5>
                <p className="card-text">Gestiona las categorías de productos.</p>
                <p className="mt-3">Mensaje desde el context: {mensaje}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-info w-100">Ir</button>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Cerrar Sesión */}
        <div className="mt-4 text-center">
          <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
