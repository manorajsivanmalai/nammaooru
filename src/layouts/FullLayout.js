import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { UserContext } from "../contextapi/loginContextApi";
import { useContext } from "react";
const FullLayout = () => {
  const {islogin}=useContext(UserContext);
  return (
    <main>
      {/********header**********/}
      <Header />
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
      
        { islogin &&   <aside className="sidebarArea shadow" id="sidebarArea"> <Sidebar />  </aside>}
      
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
