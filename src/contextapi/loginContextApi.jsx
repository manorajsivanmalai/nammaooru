import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [islogin,setIslogin]=useState(false);

  return (
     <UserContext.Provider value={{islogin,setIslogin}}>
      {children}
    </UserContext.Provider>
  );
};
