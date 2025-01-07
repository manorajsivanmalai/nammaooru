import { Navigate } from "react-router-dom";

/**** Layouts ****/
import FullLayout from "../layouts/FullLayout.js";

/***** Pages ****/
import Starter from "../views/Starter.js";
import CollectionAmount from "../views/CollectionsAmount.js";
import AddMembers from "../views/AddMembers.js";
import MemberDeails from "../components/MemberDeails";
import ShowExpenses from "../views/ShowExpenses";
import Expenses from "../views/Expenses.js";
import ExpensesDetails from "../components/Expensesdetails.jsx";
import Login from "../views/Login.js";

/***** Routes *****/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", element: <Starter /> },
      { path: "/collectionAmount", element: <CollectionAmount /> },
      { path: "/addmembers", element: <AddMembers /> },
      { path: "/memberdeails", element: <MemberDeails /> },
      { path: "/expensesdetails", element: <ExpensesDetails /> },
      { path: "/showexpenses", element: <ShowExpenses /> },
      { path: "/expenses", element: <Expenses /> },
      { path: "/login", element: <Login /> },
    ],
  },
];

export default ThemeRoutes;
