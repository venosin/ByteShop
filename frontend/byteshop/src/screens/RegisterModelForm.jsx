import React, { useState } from 'react';

const RegisterModelForm = () => {

  const [name, setName ] = useState('') 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {  
        name: name,
      };

      const response = await fetch('http://localhost:4000/api/models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluir cookies en la solicitud sin esto no lee la sesión el navegador
        body: JSON.stringify(formData),
      });

      //console.log(response.message);

      if (!response.ok) {
        throw new Error('Error al registrar modelo');
      }

      alert('Modelo registrado exitosamente');
      setName('');
    } catch (error) {
      alert('Error al registrar modelo: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Registrar Modelo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Modelo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterModelForm;
