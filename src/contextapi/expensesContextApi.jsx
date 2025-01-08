import React, { createContext, useEffect, useState } from 'react';


export const ExpensesContext = createContext();


export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [exploading, setExploading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    // Fetch data from API when the component mounts
    fetch("http://localhost:8888/api/getexpenses")
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data); 
        setExploading(false); 
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
        setError("An error occurred while fetching expenses"); 
        setExploading(false); 
      });
  }, []);

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses, exploading, error }}>
      {children}
    </ExpensesContext.Provider>
  );
};
