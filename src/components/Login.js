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
    <>
      <div className="form ">
        <form onSubmit={handleSubmit}>
          <h1 className="form--title">Log In</h1>
          {error && error}
          <label htmlFor="email" className="form--label fw-semi-bold">
            Email
          </label>
          <input
            className="form--input "
            type="email"
            name="email"
            ref={emailRef}
          />

          <label htmlFor="password" className="form--label fw-semi-bold">
            Password
          </label>
          <input
            className="form--input"
            type="password"
            ref={passwordRef}
            name="password"
          />

          <button
            className="form--button bg-secondary text-secondary"
            disabled={loading}
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>

      <div>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default Login;
