import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";
function Profile() {
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuthentication();
  const navigate = useNavigate();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Log Out");
    }
  }

  return (
    <>
      <h1>Profile</h1>
      {error}
      <strong>Email:</strong> {currentUser.email}
      <div>
        <button onClick={handleLogout}>
          <Link to="/signup">Log Out</Link>
        </button>
      </div>
    </>
  );
}

export default Profile;
