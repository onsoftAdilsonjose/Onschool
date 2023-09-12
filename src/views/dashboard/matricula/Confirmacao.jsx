import { useState, memo, Fragment } from 'react'

//react-bootstrap
import { Row, Col, Image, Form, Nav, Dropdown, Tab, Container } from 'react-bootstrap'

//components
import Card from '../../../components/bootstrap/card'
import ConfirmacaoModal from "./modais/ConfirmacaoModal"

//router
import { Link } from 'react-router-dom'

import Select from "react-select"

// img
import avatars11 from '/src/assets/images/avatars/01.png'






const Confirmacao = memo(() => {
  const [toggler, setToggler] = useState(false);
  const [show,setShow]=useState(false)

  function handleClose(){
    setShow(false)
  }

  return (
    <Fragment>
      <ConfirmacaoModal show={show} handleClose={handleClose}/>
      <Container>
       
        <Tab.Container defaultActiveKey="first">


          <Row>
            <Col lg="12">
              <Card>
                <Card.Body>
                  <div className="d-flex flex-wrap align-items-center justify-content-between py-3">
                    <Col lg="11">
                      <input
                        className='form-control'
                        placeholder="Digite o numero de estudante ou bilhete"
                      />
                    </Col>

                    <button className='btn btn-primary' role='button' type='button'>Buscar</button>

                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="12">
              <Card>
                <Card.Header>
                  <div className="header-title">
                    <h4 className="card-title">Perfil</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="text-center">
                    <div className="user-profile">
                      <Image className="theme-color-default-img  rounded-pill avatar-130 img-fluid" src={avatars11} alt="profile-pic" />
  
    
                    </div>
                    <div className="mt-3">
                      <h3 className="d-inline-block">Narciso Ribas</h3>
                      <p className="d-inline-block pl-3"> - Nº 12132323</p>
                      <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>


              <Card>
                <Card.Header>
                  <div className="header-title">
                    <h4 className="card-title">Sobre</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  
                  <div className="mt-2">
                    <h6 className="mb-1">Classe :</h6>
                    <p>7 classe</p>
                  </div>
                  <div className="mt-2">
                    <h6 className="mb-1">Estado:</h6>
                    <p>Aprovado</p>
                  </div>
                  <div className="mt-2">
                    <h6 className="mb-1">Tesouraria:</h6>
                    <p><Link to="#" className="text-body"> Regularizada</Link></p>
                  </div>
                  <div className="mt-2">
                    <h6 className="mb-1">Divida:</h6>
                    <p>0</p>
                  </div>
                  <div className="mt-2">
                    <button className='btn btn-primary' onClick={()=>setShow(true)}>Confirmar estudante</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

          </Row>

        </Tab.Container>
      </Container>
    </Fragment>
  )
}
)

Confirmacao.displayName = "Confirmacao"
export default Confirmacao;