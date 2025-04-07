import React , {useEffect} from 'react'
import ListEmployees from './pages/ListEmployees'
import Employees from './pages/Employees'
import RegisterEmployees from './pages/RegisterEmployees'

function App() {

  return (
    <>
  <h1 className="text-2xl font-bold underline">
    Hello world!
  </h1>
  <RegisterEmployees />
  <ListEmployees />
    </>
  )
}

export default App
