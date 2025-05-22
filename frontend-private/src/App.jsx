// App.js
import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import Navegation from "./components/Navegation";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navegation />
      </Router>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
    </AuthProvider>
  );
}

export default App;
