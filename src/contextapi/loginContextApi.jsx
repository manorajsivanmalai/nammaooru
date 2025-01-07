import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user,setUser]=useState({
    username:'mano',
    password:'123456'
  });

  const [islogin,setIslogin]=useState(false);

  return (
     <UserContext.Provider value={{ user,islogin,setIslogin}}>
      {children}
    </UserContext.Provider>
  );
};
