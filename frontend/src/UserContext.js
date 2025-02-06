import React, { createContext, useState, useContext } from 'react';

// Create a context for the user
const UserContext = createContext();

// Provider component to wrap around your app
export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null); // store user email in state
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLasttName] = useState(null); // store user email in state

  const loginUser = (email,data) => {
    setUserEmail(email);
    const{firstName,lastName }=data
    setFirstName(firstName)
    setLasttName(lastName)
  };

  const clearUser = () => {
    setUserEmail(null);  // Clear user email (log out)
    setFirstName(null)
    setLasttName(null)
  };

  return (
    <UserContext.Provider value={{ userEmail, loginUser, clearUser,lastName,firstName }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

