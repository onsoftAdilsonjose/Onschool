import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col, Image, Button, Table, Container } from "react-bootstrap";

//Components
import Card from "../../../../components/bootstrap/card";
import CabecalhoModal from "./modais/CabecalhoModal";
import { GlobalContext } from "../../../../context/GlobalContext";
import SubHeader from "../../../../components/partials/dashboard/headerstyle/sub-header";


const Borderedtable = memo(() => {
  const [show, setShow] = useState(false);
  const {cabecalho}=useContext(GlobalContext)

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };



 
  return (
    <Fragment>
      <CabecalhoModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />

      <Container>
        <Row>
          <Col lg="12">
            <Card>
              <Card.Body>
                <Button
                  onClick={handleShow}
                  variant="primary"
                  className="btn btn-primary mt-2 me-1 me-1 mb-3"
                >
                  + Cabeçalho
                </Button>
                <div className="custom-table-effect table-responsive border rounded mt-3">
                  <Table
                    className="mb-0"
                    id="datatable"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="bg-white">
                        <th scope="col">Nome</th>
                        <th scope="col">Data de criação</th>

                        <th scope="col">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cabecalho.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">{item.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="text-dark">{item.createdAt}</td>

                            <td>
                              <div className="d-flex">
                                <Button
                                  className="btn btn-primary btn-icon btn-sm rounded-pill"
                                  to="#"
                                  role="button"
                                >
                                  <span className="btn-inner">
                                    {item.actionadd}
                                  </span>
                                </Button>
                                <Button
                                  className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                                  to="#"
                                  role="button"
                                >
                                  <span className="btn-inner">
                                    {item.actionedit}
                                  </span>
                                </Button>
                                <Button
                                  className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                                  to="#"
                                  role="button"
                                >
                                  <span className="btn-inner">
                                    {item.actionremove}
                                  </span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
});

Borderedtable.displayName = "Borderedtable";
export default Borderedtable;
