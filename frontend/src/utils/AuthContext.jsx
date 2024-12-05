import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('loggedIn') === 'true';
      const token = localStorage.getItem('token');
      const expiryTime = localStorage.getItem('tokenExpiry');

      if (loggedIn && token && expiryTime && new Date().getTime() < expiryTime) {
        setIsLoggedIn(true);
      } else {
        logout(); 
      }
      setLoading(false); 
    };

    checkLoginStatus();
  }, []);

  const login = (token, expiryDuration = 3600) => {
    const expiryTime = new Date().getTime() + expiryDuration * 1000; 
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    setIsLoggedIn(false);
  };

  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
