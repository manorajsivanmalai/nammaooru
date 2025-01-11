import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
// import user1 from "../../assets/images/users/user1.jpg";
// import user2 from "../../assets/images/users/user2.jpg";
// import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
// import user5 from "../../assets/images/users/user5.jpg";
import { DataContext } from "../../contextapi/memberContextApi";
import { useContext } from "react";



const ProjectTables = () => {
 const {memclData,loading}=useContext(DataContext);
 const manager=memclData?.filter((pre)=>pre.role!=null);
 
  return (
   !loading ? <div>
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
              {manager?.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={user4}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata?.name || ''}</h6>
                        <span className="text-muted">{tdata?.phone ||''}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata?.role ||''}</td>

                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div> :<div>loading</div>
  );
};

export default ProjectTables;
