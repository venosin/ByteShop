
import React, { useEffect, useState} from 'react';
import CardEmployee from './CardEmployee';
import fetchDataEmp from '../api/fetchData'; // Importa la función fetchData

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    
 const API='employees';
/*
  fetchData(API, null)
    .then((data) => {
      setEmployees(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });*/

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/${API}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setLoading(false);
    }   
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      const deleteEmployee={
        "_id": id
      }

      const response = await fetch(`http://localhost:4000/api/employees/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(deleteEmployee),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
  
      const result = await response.json();
      console.log('Deleted:', result);
  
      // Actualizar la lista después de borrar
      //setEmployees((prev) => prev.filter(emp => emp._id !== id));
      fetchData();
    } catch (error) {
      console.error('Error deleting employee sfs:', error);
    }
  };
  



    return ( 
        <>
  <h1 className="text-2xl font-bold underline text-center">Listado de empleados</h1>
        <div className='flex flex-wrap gap-4 justify-center mt-5'>
        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {
            employees.map((employee) => (
                <CardEmployee key={employee.id} employee={employee} deleteEmployee={deleteEmployee}/>
            ))
        }
        </div>
        </>
     );
}
 
export default ListEmployees;