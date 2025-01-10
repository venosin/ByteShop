import RegisterClientForm from "./screens/RegisterClientForm";
import RegisterEmployeeForm from "./screens/RegisterEmployeeForm";
import LoginScreen from "./screens/LoginScreen";
import RegisterModelForm from "./screens/RegisterModelForm";
import PayPalButton from "./components/PayPalButtons";

function App() {
  return (
    <>
      <LoginScreen />

      <RegisterModelForm />

      <PayPalButton />
    </>
  );
}

export default App;
