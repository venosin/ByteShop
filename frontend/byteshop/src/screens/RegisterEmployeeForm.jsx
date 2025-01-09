import React, { useState } from 'react';

const RegisterEmployeeForm = () => {
 
  const [name, setName ] = useState('')
  const [lastName, setLastName ] = useState('') 
  const [email, setEmail ] = useState('') 
  const [password, setPassword ] = useState('') 
  const [telephone, setTelephone ] = useState('') 
  const [dui, setDui ] = useState('') 
  const [address, setAddress ] = useState('') 
  const [birthdate, setBirthdate ] = useState('') 
  const [hireDate, setHireDate ] = useState('') 
  const [isssNumber, setIsssNumber ] = useState('') 

  //funcion para limpiar los campos
  const clearFields = () => {
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setTelephone('');
    setDui('');
    setAddress('');
    setBirthdate('');
    setHireDate('');
    setIsssNumber('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        telephone: telephone,
        dui: dui,
        address: address,
        birthdate: birthdate,
        hireDate: hireDate,
        isssNumber: isssNumber,
      };

      const response = await fetch('http://localhost:4000/api/registerEmployees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar empleado');
      }

      alert('Empleado registrado exitosamente');
      clearFields();
    } catch (error) {
      alert('Error al registrar empleado: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Registrar Empleado</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
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

        <div>
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastName}
            onChange={(e)=> setLastName(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
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
            onChange={( e )=> setPassword(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={telephone}
            onChange={(e)=> setTelephone(e.target.value)}
            required
            pattern="[0-9]{8}"
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="dui" className="block text-sm font-medium text-gray-700">DUI</label>
          <input
            type="text"
            id="dui"
            name="dui"
            value={dui}
            onChange={(e)=> setDui(e.target.value)}
            pattern="[0-9]{8}-[0-9]{1}"
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e)=> setAddress(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={birthdate}
            onChange={(e)=> setBirthdate(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">Fecha de Contratación</label>
          <input
            type="date"
            id="hireDate"
            name="hireDate"
            value={hireDate}
            onChange={(e)=> setHireDate(e.target.value)}
            required
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="isssNumber" className="block text-sm font-medium text-gray-700">Número de ISSS</label>
          <input
            type="text"
            id="isssNumber"
            name="isssNumber"
            value={isssNumber}
            onChange={(e)=> setIsssNumber(e.target.value)}
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

export default RegisterEmployeeForm;
