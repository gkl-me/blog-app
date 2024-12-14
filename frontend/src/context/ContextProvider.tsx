// UserContext.js
import React, { createContext, useState, useContext } from 'react';


interface UserContextType {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
  }

const UserContext = createContext<UserContextType|undefined>(undefined);

// Create a provider component
export const ContextProvider = ({ children }:{children:React.ReactNode}) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
