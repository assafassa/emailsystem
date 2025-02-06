import React, { createContext, useState, useContext } from 'react';

// Create a context for the user
const UserContext = createContext();

// Provider component to wrap around your app
export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null); // store user email in state

  const loginUser = (email) => {
    setUserEmail(email);  // Update user email
  };

  const clearUser = () => {
    setUserEmail(null);  // Clear user email (log out)
  };

  return (
    <UserContext.Provider value={{ userEmail, loginUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

