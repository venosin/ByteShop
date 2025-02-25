


/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Importa el hook del contexto

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();  // Desestructuramos la función login del contexto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamar a la API de autenticación
      const formData = { 
        email: email,
        password: password
      };

      // Realizar la solicitud de login al backend
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        // Si la respuesta es exitosa, almacenar el token (si se usa)
        login(data.token);  // Suponiendo que la API responde con un token de autenticación

        // Redirigir al dashboard
        navigate('/dashboard');
      } else {
        // Mostrar error si la autenticación falla
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        
        {/* Mostrar error si lo hay //*}
        {error && <p className="text-danger">{error}</p>}

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

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [usersExist, setUsersExist] = useState(false);

  // Estados para manejar los campos del formulario
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [dui, setDui] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [isssNumber, setIsssNumber] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Estado para el mensaje de éxito

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const newEmployee = {
      name,
      lastName,
      email,
      password,
      telephone,
      dui,
      address,
      birthdate,
      hireDate,
      isssNumber,
    };

    try {
      const response = await fetch('http://localhost:4000/api/registerEmployees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      console.log('Datos enviados:', newEmployee); 

      const data = await response.json();
      console.log('Respuesta:', response);

      if (response.ok) {
        // Si el registro es exitoso, muestra el mensaje de éxito
        setRegistrationSuccess(true);
        // Después de un pequeño retraso, redirige al login
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Error al registrar empleado');
      }
    } catch (error) {
      setError('Error al registrar empleado: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    checkEmployeesExist();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!usersExist) {
    // Si no hay empleados, muestra el formulario de registro
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Registrar Nueva Cuenta de Empleado</h2>

          {/* Mostrar error si lo hay */}
          {error && <p className="text-danger">{error}</p>}

          {/* Mostrar mensaje de éxito si el primer usuario se registró correctamente */}
          {registrationSuccess && (
            <p className="text-success text-center">¡Registro exitoso! Redirigiendo al login...</p>
          )}

          <form onSubmit={handleSubmit2}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="form-control"
              />
            </div>

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

            <div className="mb-3">
              <label htmlFor="telephone" className="form-label">Teléfono</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
                className="form-control"
                maxLength="8"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dui" className="form-label">DUI</label>
              <input
                type="text"
                id="dui"
                name="dui"
                value={dui}
                onChange={(e) => setDui(e.target.value)}
                required
                className="form-control"
                placeholder="XXXXXXXX-X"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birthdate" className="form-label">Fecha de Nacimiento</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="hireDate" className="form-label">Fecha de Contratación</label>
              <input
                type="date"
                id="hireDate"
                name="hireDate"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="isssNumber" className="form-label">Número ISSS</label>
              <input
                type="text"
                id="isssNumber"
                name="isssNumber"
                value={isssNumber}
                onChange={(e) => setIsssNumber(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar Cuenta'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Si ya existen empleados, muestra el formulario de login
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

      if (response.ok) {
        login(data.token);
        navigate('/dashboard');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        
        {/* Mostrar error si lo hay */}
        {error && <p className="text-danger">{error}</p>}

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

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
