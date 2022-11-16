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

  const [currentUser, setCurrentUser] = useState();
  // Using useEffect with empty dependency array to run this only once
  //  Login a user if there is already a user in the cookie or session
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // To unsubscribe on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthenticationContext.Provider value={{ currentUser, signup }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
