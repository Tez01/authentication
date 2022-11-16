import { upload } from "@testing-library/user-event/dist/upload";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

const defaultImageUrl = "./default.png";
function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { signup, upload, currentUser } = useAuthentication();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUpload] = useState(false);
  const [image, setImage] = useState(null);

  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const navigate = useNavigate();

  function handleImageUpload(e) {
    setImageUpload(true);
    setImageUrl(window.URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  }

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
      const response = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(response.uid);
      console.log(`currentUser ${currentUser}`);
      console.log(image);
      // Navigate to profile page after signup
      navigate("/");
      // Upload the profile image when user is created
      // if (currentUser != null && image !== null) {
      //   console.log(currentUser.uid);
      // upload(image, currentUser.uid);
      // }
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
      <input type="file" onChange={handleImageUpload} />
      <button disabled={loading} type="submit">
        Sign Up
      </button>
      <div>
        {/* Load image if uploaded */}
        {imageUploaded && <img alt="default" src={imageUrl} />}
      </div>
      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </form>
  );
}

export default Signup;
