import { memo, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { api } from "../../../../server/server";

// React-bootstrap
import { Button, Col, Form, Row } from "react-bootstrap";

//Components
import Card from "../../../../components/bootstrap/card";

//Img
import img7 from "/src/assets/images/avatars/07.png";
import { useContext,useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const ServicePayment = memo(() => {
  const navigate = useNavigate();
  const {services,setServices,addServicesToCart,estudanteDetalhes} = useContext(AuthContext)


  useEffect(()=>{
    async function list(){
      api.get("Admin/Servico")
    .then((response)=>{
      setServices(response.data.Servico)    
    })  
    }

    list();
  },[])


  



  const [service,setService]=useState([])

  const handleServiceToCart =()=>{
    addServicesToCart(service)
  }


  return (
    <Fragment>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Adicionar Serviços</h4>
          </div>
        </Card.Header>
        <Card.Body>
          <Form className="form-horizontal">
            <Form.Group as={Row} className="form-group">
              <Form.Label
                column
                sm="3"
                className="control-label align-self-center mb-0"
                htmlFor="email"
              >
                Categoria:
              </Form.Label>
              <Col sm="9">
                <select 
                  disabled={estudanteDetalhes?false:true}
                className="form-select form-group">
                  <option>Selecione a categoria</option>
                  <option>Geral</option>
                  <option>Outros</option>
                </select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="form-group">
              <Form.Label
                column
                sm="3"
                className="control-label align-self-center mb-0"
                htmlFor="email"
              >
                Serviço:
              </Form.Label>
              <Col sm="9">
                <Select
                isDisabled={estudanteDetalhes?false:true}
                  onChange={setService}
                  value={service}
                  isClearable
                  isMulti
                  options={services?.map((s) => ({
                    value: s.id,
                    label: s.ServicoNome,
                  }))}
                  placeholder="Selecione o serviço"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="form-group " hidden>
              <Form.Label
                column
                sm="3"
                className="control-label align-self-center mb-0"
                htmlFor="quantidade"
              >
                Quantidade:
              </Form.Label>
              <Col sm="9">
                <input
                  type="text"
                
                  className="form-control"
                  id="quantidade"
               
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="form-group" hidden>
              <Form.Label
                column
                sm="3"
                className="control-label align-self-center mb-0"
                htmlFor="precoServico  "
              >
                Preço:
              </Form.Label>
              <Col sm="9">
                <input
                  type="text"
                  disabled
                  className="form-control"
                  id="precoServico"
                  value={75000}
                />
              </Col>
            </Form.Group>
           </Form>
        </Card.Body>

        <Card.Footer>
          <Button 
          disabled={estudanteDetalhes?false:true}
          type="button" 
          variant="btn btn-primary col-md-12" onClick={handleServiceToCart}>
            Adicionar
          </Button>
        </Card.Footer>
      </Card>
    </Fragment>
  );
});

ServicePayment.displayName = "ServicePayment";
export default ServicePayment;
