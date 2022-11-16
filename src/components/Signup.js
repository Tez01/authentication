import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { currentUser, signup } = useAuthentication();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Password validation
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    // Try to signup
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      {error ? error : ""}
      <input type="email" placeholder="Email" name="email" ref={emailRef} />
      <input
        type="password"
        placeholder="Password"
        ref={passwordRef}
        name="password"
      />
      <input
        type="password"
        placeholder="Password Confirmation"
        name="password-confirmation"
        ref={passwordConfirmationRef}
      />
      <button disabled={loading} type="submit">
        Sign Up
      </button>
      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </form>
  );
}

export default Signup;
