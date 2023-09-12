import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col, Image, Button, Table, Container } from "react-bootstrap";

//Components

import TransporteModal from "../modais/TransporteModal";
import Card from "../../../../../components/bootstrap/card";
import { edit, remove } from "../../../../../context/GlobalContext";




const Transporte= memo(() => {
  const [show, setShow] = useState(false);


  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };



 
  return (
    <Fragment>
      <TransporteModal
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
                  + Rotas de transporte
                </Button>
                <div className="custom-table-effect table-responsive border rounded mt-3">
                  <Table
                    className="mb-0"
                    id="datatable"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="bg-white">
                        <th scope="col">Nome da rota</th>
                        <th scope="col">Municipio</th>
                        <th scope="col">Bairro</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Ano lectivo</th>
                        <th scope="col">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                 
                  
                          <tr>
                             <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">Gamek-São Paulo</h6>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">11</h6>
                                </div>
                              </div>
                            </td>

                            <td className="text-dark">Luanda</td>
                            <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">25000</h6>
                                </div>
                              </div>
                            </td>

                            <td className="text-dark">2021-2022</td> 
                          
                            <td>
                              <div className="d-flex">
                                <Button
                                  className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                                  to="#"
                                  role="button"
                                >
                                  <span className="btn-inner">
                                    {edit}
                                  </span>
                                </Button>
                                <Button
                                  className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                                  to="#"
                                  role="button"
                                >
                                  <span className="btn-inner">
                                    {remove}
                                  </span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        
              
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

Transporte.displayName = "Transporte";
export default Transporte;
