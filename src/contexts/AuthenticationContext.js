import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthenticationContext = createContext();

// Custom Hook to use the context for authentication
export function useAuthentication() {
  return useContext(AuthenticationContext);
}

// Directly export the provider with all the functionality for signup intact
export function AuthenticationProvider({ children }) {
  // Signup a user in firebase
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // Login a user in firebase
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // Logout a user
  function logout() {
    return auth.signOut();
  }
  // This state is for checking if a user is already saved in local storage,
  // By default loads, and is toggled when user has been set on mount
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  // Using useEffect with empty dependency array to run this only once
  // Set a user if there is already a user in the cookie or session
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      // Done loading, so set loading false
      setLoading(false);
    });

    // To unsubscribe on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ currentUser, signup, login, logout }}
    >
      {/* Render children only when not loading */}
      {!loading && children}
    </AuthenticationContext.Provider>
  );
}
