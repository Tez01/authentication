import Signup from "./Signup";
import { AuthenticationProvider } from "../contexts/AuthenticationContext";

function App() {
  return (
    <AuthenticationProvider>
      <Signup />
    </AuthenticationProvider>
  );
}

export default App;
