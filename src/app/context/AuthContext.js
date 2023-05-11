import React, { createContext, useState } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Perform your login logic here, e.g., making an API request
    // Once the user is logged in, set the user object and navigate to a protected route
    setUser(userData);
    router.push('/dashboard'); // Example protected route
  };

  const logout = () => {
    // Perform your logout logic here, e.g., making an API request
    // Once the user is logged out, reset the user object and navigate to the login page
    setUser(null);
    router.push('/login'); // Example login page route
  };

  const authContextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
