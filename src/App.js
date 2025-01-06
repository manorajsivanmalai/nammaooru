import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { DataProvider } from "./contextapi/dataContextApi";
const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <DataProvider>
     <div className="dark">{routing}</div>
    </DataProvider>
  )
  ;
};

export default App;
