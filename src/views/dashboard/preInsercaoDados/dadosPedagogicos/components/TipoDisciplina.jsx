import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col, Image, Button, Table, Container } from "react-bootstrap";

//Components
import Card from "../../../../../components/bootstrap/card";
import { GlobalContext, edit, remove } from "../../../../../context/GlobalContext";
import TipoDisciplinaModal from "../modais/tipoDiscipplina/TipoDisciplinaModal";
import { Link } from "react-router-dom";
import { confirmOperation } from "../../../../../context/AuthContext";

const TipoDisciplina = memo(() => {
  const [show, setShow] = useState(false);
  const {tipoDeDisciplina,deleteTipoDeDisciplina}=useContext(GlobalContext)

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };



 async function handleDeleteTipoDisciplina(id){

    const ok = await confirmOperation("Eliminar esta caegoria de disciplina?")

    if(ok){
      deleteTipoDeDisciplina(Number(id))
    }
 
 
 }
  return (
    <Fragment>
      
      <TipoDisciplinaModal
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
                  + Tipo de disciplina
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
                      {tipoDeDisciplina.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="align-items-center">
                                <div className="media-support-info">
                                  <h6 className="mb-0">{item.TipoNome}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="text-dark">{item.created_at}</td>

                            <td>
                              <div className="d-flex">
                              
                                <Link
                                  className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                                  to={`/admin/tipoDisciplina/edit:${item.id}`}
                                
                                >
                                  <span className="btn-inner">
                                    {edit}
                                  </span>
                                </Link>
                                <Button
                                  className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                                  role="button"
                                  onClick={()=>handleDeleteTipoDisciplina(item.id)}
                                >
                                  <span className="btn-inner">
                                    {remove}
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

TipoDisciplina.displayName = "TipoDisciplina";
export default TipoDisciplina;
