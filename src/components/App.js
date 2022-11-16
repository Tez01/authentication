import Signup from "./Signup";
import { AuthenticationProvider } from "../contexts/AuthenticationContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Routes>
          {/* <Route exact path="/" component={Profile} /> */}
          <Route exact path="/signup" element={<Signup />} />
          {/* <Route path="/login" component={Login} /> */}
        </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
