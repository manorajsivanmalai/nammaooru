import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import svmrock from "../assets/images/bg/svmrock.jpg"
const navigation = [
  {
    title: "Dashboard",
    despath: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "AddMembers",
    despath: "/addmembers",
    icon: "bi bi-people",
  },
  {
    title: "AddExpenses",
    despath: "/expenses",
    icon: "bi bi-cash-coin",
  },
  
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${svmrock}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">Sivanmali Rockers</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.despath}
                className={
                  location.pathname === navi.despath
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
         
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
