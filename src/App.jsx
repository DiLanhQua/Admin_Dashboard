import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.scss";
import RootRouter from "./routes";
function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer stacked />
        <RootRouter />
      </AuthProvider>
    </>
  );
}

export default App;
