import React, { createContext, useEffect, useState } from 'react';


export const DataContext = createContext();


export const DataProvider = ({ children }) => {
  const [memclData, setMemclData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getmembers");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const memberData = await response.json();
        console.log(memberData);
        
        setMemclData(memberData);
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []); 

  return (
    <DataContext.Provider value={{ memclData, setMemclData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
