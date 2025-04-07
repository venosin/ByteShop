
import React, { useEffect, useState} from 'react';
import CardEmployee from '../components/CardEmployee';

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    
  const API='http://localhost:4000/api/employees';

  const fetchData = async () => {
    try {
      const response = await fetch(API);
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




    return ( 
        <>
  <h1 className="text-2xl font-bold underline text-center">Listado de empleados</h1>
        <div className='flex flex-wrap gap-4 justify-center mt-5'>
        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {
            employees.map((employee) => (
                <CardEmployee key={employee.id} employee={employee} />
            ))
        }
        </div>
        </>
     );
}
 
export default ListEmployees;