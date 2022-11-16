import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthentication();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);

      // Navigate to profile page after login
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Log In</h1>
      {error && error}
      <input type="email" placeholder="Email" name="email" ref={emailRef} />
      <input
        type="password"
        placeholder="Password"
        ref={passwordRef}
        name="password"
      />
      <button disabled={loading} type="submit">
        Log In
      </button>
      <div>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </form>
  );
}

export default Login;
