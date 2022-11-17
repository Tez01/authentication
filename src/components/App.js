import {BrowserRouter, Routes, Route} from 'react-router-dom.js';
import Signup from './Signup.js';
import {AuthenticationProvider} from '../contexts/AuthenticationContext.js';
import Login from './Login.js';
import Profile from './Profile.js';
import PrivateRoute from './PrivateRoute.js';
import '../index.css';
import '../App.css';

function App() {
    return (
        <div className='container'>
            <BrowserRouter>
                <AuthenticationProvider>
                    <Routes>
                        {/* This private route ensures that Profile page is displayed only when authenticated*/}
                        {/* Otherwise redirect to login page */}
                        <Route
                            exact
                            path='/'
                            element={<PrivateRoute />}
                        >
                            <Route
                                exact
                                path='/'
                                element={<Profile />}
                            />
                        </Route>

                        <Route
                            exact
                            path='/signup'
                            element={<Signup />}
                        />
                        <Route
                            exact
                            path='/login'
                            element={<Login />}
                        />
                    </Routes>
                </AuthenticationProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
