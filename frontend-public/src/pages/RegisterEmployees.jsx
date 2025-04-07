import React, {useState} from 'react';

const RegisterEmployees = () => {

    const API='http://localhost:4000/api/registerEmployees';

    /*
    {
  "name": "Emilio",
  "lastName": "Ramirez",
  "email": "emilio@gmail.com",
  "password": "1234567",
  "telephone": "77556666",
  "dui": "12345678-1",
  "address": "Calle Principal #123, San Salvador",
  "birthdate": "1990-05-15",
  "hireDate": "2025-01-01",
  "isssNumber": "987957321"
}
    */

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [dui, setDui] = useState("");
    const [address, setAddress] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [isssNumber, setIsssNumber] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);



    const cleanData = () => {   
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setTelephone("");
        setDui("");
        setAddress("");
        setBirthdate("");
        setHireDate("");
        setIsssNumber("");
    }

    //funcion para guardar los datos del usuario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !lastName || !email || !password || !telephone || !dui || !address || !birthdate || !hireDate || !isssNumber) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {

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
                isssNumber
            };

            console.log(newEmployee, 'datos nuevo empleado');

            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee),
            });

            if (!response.ok) {
                throw new Error("Hubo un error al registrar el empleado");
            }

            const data = await response.json();
            alert("Empleado registrado exitosamente");
            console.log("Empleado registrado con éxito:", data);
            setEmployees(data);
            setSuccess("Empleado registrado correctamente");
            cleanData();


        } catch (error) {
            setError(error.message); // Capturar cualquier error
            console.error("Error:", error);
            alert("Error", "Ocurrió un error al registrar el empleado");    
            
        }
        finally {
            setLoading(false);
        }


    }

    return (
        <>
            <h1>Registrar un empleado</h1>
            <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded mb-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Emilio"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Ramirez"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="emilio@gmail.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="1234567"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="telephone">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            name="telephone"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="77556666"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="dui">
                            DUI
                        </label>
                        <input
                            type="text"
                            id="dui"
                            name="dui"
                            value={dui}
                            onChange={(e) => setDui(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="12345678-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                            Dirección
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}

                            name="address"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Calle Principal #123, San Salvador"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="birthdate">
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}

                            name="birthdate"
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="hireDate">
                            Fecha de Contratación
                        </label>
                        <input
                            type="date"
                            id="hireDate"
                            value={hireDate}
                            onChange={(e) => setHireDate(e.target.value)}
                            name="hireDate"
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="isssNumber">
                            Número de ISSS
                        </label>
                        <input
                            type="text"
                            id="isssNumber"
                            value={isssNumber}
                            onChange={(e) => setIsssNumber(e.target.value)}
                            name="isssNumber"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="987957321"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={(e) => {handleSubmit(e)}}
                >
                    Registrar
                </button>
            </form>
        </>
    );
};

export default RegisterEmployees;