import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col, Image, Button, Table, Container } from "react-bootstrap";

//Components
import Card from "../../../../../components/bootstrap/card";
import { GlobalContext } from "../../../../../context/GlobalContext";
import DisciplinaParaClasseModal from "../modais/DisciplinaParaClasseModal";



const DisciplinaParaClasse= memo(() => {
  const [show, setShow] = useState(false);
  const {disciplinaClasse}=useContext(GlobalContext)

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };



 
  return (
    <Fragment>
      
      
      <DisciplinaParaClasseModal
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
                  + Adicionar disciplina a uma classe
                </Button>
                <div className="custom-table-effect table-responsive border rounded mt-3">
                  <Table
                    className="mb-0"
                    id="datatable"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="bg-white">
                        <th scope="col">Disciplina</th>
                        <th scope="col">Curso </th>
                        <th scope="col">Classe</th>
                        <th scope="col">Tipo de disciplina</th>
                        <th scope="col">Ano lectivo</th>
                        <th scope="col">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {disciplinaClasse.map((item, index) => {
                        return (
                          <tr key={index}>
                             <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">{item.professor}</h6>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">{item.disciplina}</h6>
                                </div>
                              </div>
                            </td>

                            <td className="text-dark">{item.curso}</td>
                            <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">{item.classe}</h6>
                                </div>
                              </div>
                            </td>

                            <td className="text-dark">{item.turma}</td> 
                            <td className="text-dark">{item.periodo}</td>
                            
                            <td className="text-dark">{item.sala}</td>
                            <td className="text-dark">{item.tipoDisciplina}</td>
                            <td className="text-dark">{item.anoLectivo}</td>

                            <td>
                              <div className="d-flex">
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

DisciplinaParaClasse.displayName = "DisciplinaParaClasse";
export default DisciplinaParaClasse;
