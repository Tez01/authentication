import React, {useState} from 'react.js';
import {Link, useNavigate} from 'react-router-dom.js';
import {useAuthentication} from '../contexts/AuthenticationContext.js';
function Profile() {
    // State of error
    const [error, setError] = useState('');

    // Get current user and logout functionality from authentication context
    const {currentUser, logout} = useAuthentication();

    // Navigation Hook
    const navigate = useNavigate();

    // This function logout the user and redirect to login page
    async function handleLogout() {
        setError('');

        try {
            await logout();
            navigate('/login');
        } catch {
            setError('Failed to Log Out');
        }
    }

    // Profile Component
    return (
        <>
            <h1>Profile</h1>

            <div className='form--error text-error'>{error && error}</div>

            <h4 className='profile--email'>Email: {currentUser.email}</h4>

            <img
                className='profile--image'
                alt='profilePic'
                // Set the source if a photoURL exist for user, otherwise display default image
                src={
                    currentUser.photoURL
                        ? currentUser.photoURL
                        : `./default.png`
                }
            />

            <button
                className='profile--button bg-secondary text-secondary'
                onClick={handleLogout}
            >
                <Link
                    to='/signup'
                    className='text-secondary'
                >
                    Log Out
                </Link>
            </button>
        </>
    );
}

export default Profile;
