import Signup from "./Signup";
import { AuthenticationProvider } from "../contexts/AuthenticationContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Routes>
          {/* <Route exact path="/" component={Profile} /> */}
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
