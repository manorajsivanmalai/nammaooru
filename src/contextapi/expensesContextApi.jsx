import React, { createContext, useEffect, useState } from 'react';


export const ExpensesContext = createContext();


export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [exploading, setExploading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("https://sivanmalairockers.netlify.app/api/getexpenses");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setError("An error occurred while fetching expenses");
      } finally {
        setExploading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses, exploading, error }}>
      {children}
    </ExpensesContext.Provider>
  );
};
