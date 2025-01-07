import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user2,
    name: "srithar",
    mobileno: "79390390930",
    work: "Finance",

  },
  {
    avatar: user2,
    name: "Deppan",
    mobileno: "788985498954",
    work: "Event Coordinator",
 
  },
  {
    avatar: user3,
    name: "praksh",
    mobileno: "67848489949",
    work: "Elite React",
 
  },
  {
    avatar: user4,
    name: "naveen",
    mobileno: "8948994390434",
    work: "Flexy React",

  },
  {
    avatar: user5,
    name: "nandha",
    mobileno: "8898990590",
    work: "Ample React",

  },
];

const ProjectTables = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5"> Program Administrators</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
             contact us
            </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Contest Manager</th>
                <th>Work</th>
            
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.mobileno}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.work}</td>

                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
