import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col, Image, Button, Table, Container } from "react-bootstrap";

//Components


import Card from "../../../../../components/bootstrap/card";
import InsencaoDeMensalidadeModal from "../modais/InsencaoDeMensalidadeModal";
import { edit } from "../../../../../context/GlobalContext";




const InsecaoDeMensalidade= memo(() => {
  const [show, setShow] = useState(false);


  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };



 
  return (
    <Fragment>
      <InsencaoDeMensalidadeModal
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
                
                  variant="primary"
                  className="btn btn-primary mt-2 me-1 me-1 mb-3"
                >
                  Anular ou editar pagamento de mensalidadePreco
                </Button>
                <div className="custom-table-effect table-responsive border rounded mt-3">
                  <Table
                    className="mb-0"
                    id="datatable"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="bg-white">
                        <th scope="col">Mês</th>
                        <th scope="col">Percentagem de desconto</th>
                        <th scope="col">Pagamento anulado</th>
                        <th scope="col">Ano lectivo</th>
                        <th scope="col">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                 
                  
                          <tr>
                             <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">Janeiro</h6>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">0%</h6>
                                </div>
                              </div>
                            </td>

                            <td className="text-dark">ativado</td>
                          

                            <td className="text-dark">2021-2022</td> 
                          
                            <td>
                              <div className="d-flex">
                                <Button
                                  onClick={handleShow}
                                  className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                                  to="#"
                                  role="button"
                                >
                                  <span className="btn-inner">
                                    {edit}
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

InsecaoDeMensalidade.displayName = "InsecaoDeMensalidade";
export default InsecaoDeMensalidade;
