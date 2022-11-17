import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

const defaultImageUrl = "./default.png";
function Signup() {
  /********** Refs for DOM elements *******************/
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  /********** State Variables *******************/
  // This error state is used to display an error on page if it is set on any failure
  const [error, setError] = useState("");
  // This loading state is used to disable the signup button when signup is in process
  const [loading, setLoading] = useState(false);
  // This image state is used to keep track the image when uploaded
  const [image, setImage] = useState(null);
  // This imageUrl state is the url of uploaded image, used to display the image on UI when uploaded
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  /********** Navigation Hook *******************/
  const navigate = useNavigate();

  /************* Context Hook **********/
  // Get signup and upload functionality from context
  const { signup, upload } = useAuthentication();

  // This function sets the image and imageURL state variables
  function handleImageUpload(e) {
    setImageUrl(window.URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  }

  // This function sign up the user in firebase, If signup is successful, the profile image is also uploaded
  // Any error is reported on console
  async function handleSignUp(e) {
    e.preventDefault();

    // Password validation
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    // Try to signup
    try {
      setError("");
      // Disable the signup button again
      setLoading(true);
      const response = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      // Get the user just created
      const user = response.user;

      // Upload the profile image when user is created
      if (user != null && image !== null) {
        await upload(image, user);
      }
      // Navigate to profile page after signup
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
    }

    // Enable the signup button
    setLoading(false);
  }

  // Signup Component
  return (
    <>
      <div className="form ">
        <form onSubmit={handleSignUp}>
          <h1 className="form--title">Signup</h1>

          <div className="form--error text-error">{error && error}</div>

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
            className="form--input "
            type="password"
            ref={passwordRef}
            name="password"
          />

          <label
            htmlFor="password-confirmation"
            className="form--label fw-semi-bold"
          >
            Confirm Password
          </label>
          <input
            className="form--input "
            type="password"
            name="password-confirmation"
            ref={passwordConfirmationRef}
          />

          <input type="file" onChange={handleImageUpload} />
          {/* Load image if uploaded */}
          {image && (
            <img className="form--image" alt="default" src={imageUrl} />
          )}

          <button
            className="form--button bg-secondary text-secondary"
            disabled={loading}
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default Signup;
