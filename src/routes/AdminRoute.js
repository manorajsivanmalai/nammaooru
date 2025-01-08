import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contextapi/loginContextApi';
const AdminRoute = ({ children }) => {
   const {islogin} =useContext(UserContext); 
  return islogin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
