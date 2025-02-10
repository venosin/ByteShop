import RegisterClientForm from "./screens/RegisterClientForm";
import RegisterEmployeeForm from "./screens/RegisterEmployeeForm";
import LoginScreen from "./screens/LoginScreen";
import RegisterModelForm from "./screens/RegisterModelForm";
import PayPalButton from "./components/PayPalButtons";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./screens/Dashboard";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <>

<AuthProvider>
  <Router>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/registerModel" element={<RegisterModelForm />} />
      </Routes>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
