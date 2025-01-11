import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import Blog from "../components/dashboard/Blog";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import danceimg from "../assets/images/bg/dance-img.jpg"
import OverView from "../components/dashboard/OverView";
import compitationimg from "../assets/images/bg/compitation-img.jpg"
const BlogData = [
  {
    image: compitationimg,
    title: "Pongal Day 1",
    subtitle: "Games Competition",
    description:"Celebrate Pongal with a Thrilling Game Competition by Sivanmalai Rockers!..",
    btnbg: "primary",
  },
  {
    image: danceimg,
    title: "Pongal day 2",
    subtitle: "Dance Program",
    description:
      "Step Into the Rhythm of Pongal with Sivanmalai Rockers' Dance Performance!..",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {
  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
   
      <Col sm="6" lg="12" xl="12" xxl="12">
          <OverView />
        </Col>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        {/* <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col> */}
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
