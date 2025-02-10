import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Importa el hook del contexto

const Dashboard = () => {
  const navigate = useNavigate();
  const { mensaje } = useAuth();  // Desestructuramos la función login del contexto

  const handleNavigation = (route) => {
    navigate(route);
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

          {/* Puedes agregar más enlaces para otros CRUds como 'Pedidos', 'Reportes', etc. */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
