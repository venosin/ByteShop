import React , {useEffect} from 'react'
import Employees from './pages/Employees'
import {BrowserRouter as Router, Route, Routes}  from 'react-router-dom'


function App() {

  return (
    <>
  <h1 className="text-2xl font-bold underline text-center">
    ByteShop
  </h1>

    <Router>
      <Routes>
        <Route path="/" element={<Employees />} />

      </Routes>
    </Router>

    </>
  )
}

export default App
