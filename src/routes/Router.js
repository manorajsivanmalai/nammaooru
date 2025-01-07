import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const CollectionAmount = lazy(() => import("../views/CollectionsAmount.js"));
const AddMembers = lazy(() => import("../views/AddMembers.js"));
const MemberDeails = lazy(() => import("../components/MemberDeails"));
 const ShowExpenses = lazy(() => import("../views/ShowExpenses"));
const Expenses = lazy(() => import("../views/Expenses.js"));
const ExpensesDetails = lazy(()=> import("../components/Expensesdetails.jsx"));
const Login =lazy(()=> import("../views/Login.js"));
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/collectionAmount", exact: true, element: <CollectionAmount /> },
      { path: "/addmembers", exact: true, element: <AddMembers /> },
      { path: "/memberdeails", exact: true, element: <MemberDeails /> },
      { path:"/expensesdetails",exact:true,element:<ExpensesDetails />},
      { path: "/showexpenses", exact: true, element: <ShowExpenses /> },
      { path: "/expenses", exact: true, element: <Expenses /> },
      { path: "/login", exact: true, element: <Login /> },
    ],
  },
];

export default ThemeRoutes;
