import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const AuthenticationContext = createContext();

// Custom Hook to use the context for authentication
export function useAuthentication() {
  return useContext(AuthenticationContext);
}

// Directly export the provider with all the functionality for signup intact
export function AuthenticationProvider({ children }) {
  // Signup a user in firebase
  function signup(email, password, profilePicture) {
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

  // Upload profile picture in firebase
  async function upload(file, user) {
    const fileRef = ref(storage, user.uid + ".png");
    try {
      const response = await uploadBytes(fileRef, file);

      // Get the url of uploaded photo
      const photoURL = await getDownloadURL(fileRef);
      // If successful, update the profile of user to have this photoURL.

      await updateProfile(user, { photoURL });
    } catch (err) {
      console.log(err);
    }
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
      value={{ currentUser, signup, login, logout, upload }}
    >
      {/* Render children only when not loading */}
      {!loading && children}
    </AuthenticationContext.Provider>
  );
}
