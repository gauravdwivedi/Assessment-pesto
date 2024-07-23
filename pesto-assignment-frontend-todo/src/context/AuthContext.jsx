import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';


// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');


    useEffect(() => {

        if(localStorage.getItem('authToken')){
            const token = localStorage.getItem('authToken');
            if(isTokenExpired(token)){
                localStorage.removeItem('authToken');
                setToken('');
                setIsAuthenticated(false);
            }else{
                setToken(token);
                setIsAuthenticated(true);
            }
        }
    }, []);

    const login = (token) => { debugger

        localStorage.setItem('authToken', token);
        const decodedToken = jwtDecode(token);
        localStorage.setItem('username',decodedToken?.user?.username)
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setToken('');
    };

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken,'Decoded token')
          const currentTime = Date.now() / 1000;
          return decodedToken.exp < currentTime;
        } catch (error) {
          console.error('Error decoding token:', error);
          return true;
        }
      };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
