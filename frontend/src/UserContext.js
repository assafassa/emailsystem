import React, { createContext, useState, useContext } from 'react';

// Create Context
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// UserProvider component to provide context to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in a user
  const loginUser = (email) => {
    setUser({ email });
  };

  return (
    <UserContext.Provider value={{ user, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};
