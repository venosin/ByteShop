import React from "react";
import Employees from "./pages/Employees";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Brands from "./pages/Brands";
function App() {
  return (
    <>
      <h1 className="text-2xl font-bold underline text-center">ByteShop</h1>

      <Router>
        <Routes>
          <Route path="/" element={<Brands />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
