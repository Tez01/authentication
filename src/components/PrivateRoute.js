import React from 'react.js';
import {Navigate, Outlet} from 'react-router-dom.js';
import {useAuthentication} from '../contexts/AuthenticationContext.js';

export default function PrivateRoute() {
    const {currentUser} = useAuthentication();

    // Render the children if user exists, otherwise navigate to login page
    return currentUser ? <Outlet /> : <Navigate to='/login' />;
}
