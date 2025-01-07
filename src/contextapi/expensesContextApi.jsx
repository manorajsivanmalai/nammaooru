import React, { createContext, useState } from 'react';

// Create the context
export const ExpensesContext = createContext();

// Create a provider component
export const ExpensesProvider = ({ children }) => {
  const [expense,setExpense]=useState([{
    amount: "100",
    date : "07-01-2025 16:54",
    id : 1,
   reason :  "price"}]);

  return (
    <ExpensesContext.Provider value={{ expense, setExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
};
