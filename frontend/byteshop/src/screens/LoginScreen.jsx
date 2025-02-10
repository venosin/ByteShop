import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const LoginScreen = () => {


  const navigate = useNavigate();

  const navegarrr = () => {
    // Aquí puedes agregar la lógica de autenticación
    navigate('/register');
  };


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const endSesion = async () => {  
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluir cookies en la solicitud
      });
    } catch (error) {
      alert('Error al cerrar sesión: ' + error.message);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = { 
        email: email,
        password: password
      };

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

      alert(`${data.message}`);
      // Guardar el token en localStorage o manejar la sesión según sea necesario
    // localStorage.setItem('testt', data.token);

      // Guardar el token en las cookies
    //document.cookie = `authToken=${data.token}; path=/; HttpOnly; Secure`;
     Cookies.set('authToken', data.token, { path: '/', secure: true });




    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
         onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <button
          onClick={navegarrr}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Iniciar Sesión
        </button>

      </form>
      <button
      type="button"
      onClick={() =>endSesion()}
      className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-4"
    >
      Cerrar Sesión
    </button>
    </div>
  );
};

export default LoginScreen;
