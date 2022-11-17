import React, {createContext, useContext, useEffect, useState} from 'react.js';
import {auth, storage} from '../firebase.js';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage.js';
import {updateProfile} from 'firebase/auth.js';

const AuthenticationContext = createContext();

// Custom Hook to use the context for authentication
export function useAuthentication() {
    return useContext(AuthenticationContext);
}

// Directly export the provider with all the functionality for signup, login,
// logout intact
export function AuthenticationProvider({children}) {
    /** **** State variables ********** */
    // This state is for checking if a process is going on such as current user
    // being updated
    // If in loading state, no component is rendered
    const [loading, setLoading] = useState(true);
    // State for keeping track of current user
    const [currentUser, setCurrentUser] = useState();

    // Set the user
    useEffect(() => {
        // THis is called whenever user is signed up
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            // When user set, loading- false

            setLoading(false);
        });

        // To unsubscribe on unmount
        return unsubscribe;
    }, []);

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
        const fileRef = ref(storage, user.uid + '.png');
        try {
            const response = await uploadBytes(fileRef, file);
            if (response != null) {
                // Get the url of uploaded photo
                const photoURL = await getDownloadURL(fileRef);
                // If successful, update the profile of user to have this photoURL.
                await updateProfile(user, {photoURL});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthenticationContext.Provider
            value={{currentUser, signup, login, logout, upload}}
        >
            {/* Render children only when not loading */}
            {!loading && children}
        </AuthenticationContext.Provider>
    );
}
