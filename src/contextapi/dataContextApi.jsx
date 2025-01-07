import React, { createContext, useState } from 'react';

// Create the context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([
        // 100 unique dummy records
        { id: 1, name: "Rahul Sharma", amount: 500, category: "boys",date:"12-01-2025" },
        { id: 2, name: "Priya Singh", amount: 200, category: "girls",date:"12-01-2025" },
        { id: 3, name: "Amit Kumar", amount: 100, category: "sponsors",date:"12-01-2025" },
        { id: 4, name: "Sneha Roy", amount: 350, category: "sponsors",date:"12-01-2025" },
        { id: 5, name: "Vikram Patel", amount: 450, category: "boys",date:"12-01-2025" },
        { id: 6, name: "Anjali Mehta", amount: 300, category: "girls",date:"12-01-2025" },
        { id: 7, name: "Rohan Verma", amount: 220, category: "sponsors",date:"12-01-2025" },
        { id: 8, name: "Meera Nair", amount: 600, category: "our people",date:"12-01-2025" },
        { id: 9, name: "Karan Malhotra", amount: 520, category: "boys",date:"12-01-2025" },
        { id: 10, name: "Sakshi Gupta", amount: 250, category: "girls",date:"12-01-2025" },
        { id: 11, name: "Arjun Joshi", amount: 150, category: "sponsors",date:"12-01-2025" },
        { id: 12, name: "Divya Kapoor", amount: 420, category: "sponsors",date:"12-01-2025" },
        { id: 13, name: "Manoj Tiwari", amount: 550, category: "boys",date:"12-01-2025" },
        { id: 14, name: "Kavita Sharma", amount: 180, category: "girls",date:"12-01-2025" },
        { id: 15, name: "Ajay Dev", amount: 130, category: "sponsors",date:"12-01-2025" },
        { id: 16, name: "Neha Reddy", amount: 360, category: "sponsors",date:"12-01-2025" },
        { id: 17, name: "Siddharth Rao", amount: 400, category: "boys",date:"12-01-2025" },
        { id: 18, name: "Pooja Jain", amount: 270, category: "girls",date:"12-01-2025" },
        { id: 19, name: "Harsh Mehta", amount: 90, category: "sponsors",date:"12-01-2025" },
        { id: 20, name: "Ananya Roy", amount: 500, category: "sponsors",date:"12-01-2025" },
        { id: 21, name: "Rajesh Singh", amount: 480, category: "boys",date:"12-01-2025" },
        { id: 22, name: "Sanya Agarwal", amount: 260, category: "girls",date:"12-01-2025" },
        { id: 23, name: "Vikas Khanna", amount: 170, category: "sponsors",date:"12-01-2025" },
        { id: 24, name: "Ritu Kohli", amount: 390, category: "sponsors",date:"12-01-2025" },
        { id: 25, name: "Ashok Bansal", amount: 410, category: "boys",date:"12-01-2025" },
        { id: 26, name: "Pallavi Saxena", amount: 280, category: "girls",date:"12-01-2025" },
        { id: 27, name: "Sumit Ghosh", amount: 110, category: "sponsors",date:"12-01-2025" },
        { id: 28, name: "Rekha Mishra", amount: 620, category: "our people",date:"12-01-2025" },
        { id: 29, name: "Kabir Das", amount: 530, category: "boys",date:"12-01-2025" },
        { id: 30, name: "Ishita Roy", amount: 240, category: "girls",date:"12-01-2025" },
        { id: 31, name: "Ravi Malhotra", amount: 140, category: "sponsors",date:"12-01-2025" },
        { id: 32, name: "Sunita Kapoor", amount: 400, category: "sponsors",date:"12-01-2025" },
        { id: 33, name: "Deepak Pandey", amount: 460, category: "boys",date:"12-01-2025" },
        { id: 34, name: "Tina Sharma", amount: 220, category: "girls",date:"12-01-2025" },
        { id: 35, name: "Kunal Joshi", amount: 190, category: "sponsors",date:"12-01-2025" },
        { id: 36, name: "Radha Iyer", amount: 380, category: "sponsors",date:"12-01-2025" },
        { id: 37, name: "Rohan Patel", amount: 420, category: "boys",date:"12-01-2025" },
        { id: 38, name: "Preeti Rao", amount: 230, category: "girls",date:"12-01-2025" },
        { id: 39, name: "Vivek Gupta", amount: 160, category: "sponsors",date:"12-01-2025" },
        { id: 40, name: "Anjali Desai", amount: 470, category: "sponsors",date:"12-01-2025" },
        { id: 41, name: "Kiran Tiwari", amount: 510, category: "boys",date:"12-01-2025" },
        { id: 42, name: "Sima Reddy", amount: 250, category: "girls",date:"12-01-2025" },
        { id: 43, name: "Nikhil Agarwal", amount: 100, category: "sponsors",date:"12-01-2025" },
        { id: 44, name: "Leela Bansal", amount: 340, category: "sponsors",date:"12-01-2025" },
        { id: 45, name: "Aman Singh", amount: 450, category: "boys",date:"12-01-2025" },
        { id: 46, name: "Simran Kapoor", amount: 260, category: "girls",date:"12-01-2025" },
        { id: 47, name: "Arvind Joshi", amount: 120, category: "sponsors",date:"12-01-2025" },
        { id: 48, name: "Nisha Patel", amount: 520, category: "sponsors",date:"12-01-2025" },
        { id: 49, name: "Rahul Choudhary", amount: 490, category: "boys",date:"12-01-2025" },
        { id: 50, name: "Trisha Malhotra", amount: 230, category: "girls",date:"12-01-2025" },
        { id: 51, name: "Mohan Mehta", amount: 150, category: "sponsors",date:"12-01-2025" },
        { id: 52, name: "Shreya Reddy", amount: 390, category: "sponsors",date:"12-01-2025" },
        { id: 53, name: "Rajiv Sharma", amount: 430, category: "boys",date:"12-01-2025" },
        { id: 54, name: "Sneha Kapoor", amount: 240, category: "girls",date:"12-01-2025" },
        { id: 55, name: "Naveen Rao", amount: 130, category: "sponsors",date:"12-01-2025" },
        { id: 56, name: "Nikita Jain", amount: 480, category: "sponsors",date:"12-01-2025" },
        { id: 57, name: "Manish Tiwari", amount: 520, category: "boys",date:"12-01-2025" },
        { id: 58, name: "Roshni Saxena", amount: 260, category: "girls",date:"12-01-2025" },
        { id: 59, name: "Parth Bansal", amount: 180, category: "sponsors",date:"12-01-2025" },
        { id: 60, name: "Rakhi Patel", amount: 310, category: "sponsors",date:"12-01-2025" },
        { id: 61, name: "Ajit Das", amount: 460, category: "boys",date:"12-01-2025" },
        { id: 62, name: "Surbhi Verma", amount: 210, category: "girls",date:"12-01-2025" },
        { id: 63, name: "Prakash Malhotra", amount: 190, category: "sponsors",date:"12-01-2025" },
        { id: 64, name: "Lavanya Kapoor", amount: 420, category: "sponsors",date:"12-01-2025" },
        { id: 65, name: "Ravi Kumar", amount: 470, category: "boys",date:"12-01-2025" },
        { id: 66, name: "Sunita Mehta", amount: 270, category: "girls",date:"12-01-2025" },
        { id: 67, name: "Anil Singh", amount: 140, category: "sponsors",date:"12-01-2025" },
        { id: 68, name: "Pratibha Roy", amount: 510, category: "sponsors",date:"12-01-2025" },
        { id: 69, name: "Gopal Joshi", amount: 490, category: "boys",date:"12-01-2025" },
        { id: 70, name: "Aditi Desai", amount: 220, category: "girls",date:"12-01-2025" },
        { id: 71, name: "Mukesh Pandey", amount: 110, category: "sponsors",date:"12-01-2025" },
        { id: 72, name: "Karuna Iyer", amount: 370, category: "sponsors",date:"12-01-2025" },
        { id: 73, name: "Tarun Patel", amount: 450, category: "boys",date:"12-01-2025" },
        { id: 74, name: "Seema Rao", amount: 230, category: "girls",date:"12-01-2025" },
        { id: 75, name: "Rajesh Gupta", amount: 150, category: "sponsors",date:"12-01-2025" },
        { id: 76, name: "Meena Kapoor", amount: 480, category: "sponsors",date:"12-01-2025" },
     
  ]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
