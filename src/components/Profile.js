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
      <h4 className="profile--email">Email: {currentUser.email}</h4>
      <img
        className="profile--image"
        alt="profilePic"
        src={currentUser.photoURL ? currentUser.photoURL : `./default.png`}
      />

      <button
        className="profile--button bg-secondary text-secondary"
        onClick={handleLogout}
      >
        <Link to="/signup" className="text-secondary">
          Log Out
        </Link>
      </button>
    </>
  );
}

export default Profile;
