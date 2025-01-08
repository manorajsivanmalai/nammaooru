import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { DataProvider } from "./contextapi/memberContextApi";
import { ExpensesProvider } from "./contextapi/expensesContextApi";
import { UserProvider } from "./contextapi/loginContextApi";
const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <DataProvider>
      <ExpensesProvider>
        <UserProvider>
         <div className="dark">{routing}</div>
        </UserProvider>
     </ExpensesProvider>
    
    </DataProvider>
  )
  ;
};

export default App;
