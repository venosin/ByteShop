import RegisterClientForm from "./screens/RegisterClientForm";
import RegisterEmployeeForm from "./screens/RegisterEmployeeForm";
import LoginScreen from "./screens/LoginScreen";
import RegisterModelForm from "./screens/RegisterModelForm";
import PayPalButton from "./components/PayPalButtons";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>


  <Router>
      <Routes>
      <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterModelForm />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
