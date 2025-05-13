import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {  
    logout();
    navigate("/");
  };
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">
          <a href="/dashboard" className="hover:text-gray-300">
            ByteShop
          </a>
        </div>
        <ul className="flex space-x-6">
          <li>
            <a href="/models" className="hover:text-gray-300">
              Modelos
            </a>
          </li>
          <li>
            <a href="/brands" className="hover:text-gray-300">
              Marcas
            </a>
          </li>
          <li>
            <a href="/employees" className="hover:text-gray-300">
              Empleados
            </a>
          </li>

          <li>
            <a href="/categories" className="hover:text-gray-300">
              Categorías
            </a>
          </li>
        </ul>
        <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleLogout}>
           Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
