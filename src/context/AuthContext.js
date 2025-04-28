import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, loading: true });

    // Check if user is logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            setAuth({ user, loading: false })
        }
        else {
            setAuth({ user: null, loading: false });
        }
    }, [])

    // function to login user
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setAuth({ user: userData, loading: false });
    }

    // function to logout user
    const logout = () => {
        localStorage.removeItem('user');
        setAuth({ user: null, loading: false });
    };

    return (
        // Provide the auth state and function to the children of the AuthProvider
        // This allows any component in the app to access the auth state and functions without having to pass them down as props
        // The loading state is used to show a loading spinner while the auth state is being determined
        <AuthContext.Provider value={{
            auth, login, logout
        }}>
            {!auth.loading && children}
        </AuthContext.Provider>
    )
}
