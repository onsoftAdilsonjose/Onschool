import { useState, memo, Fragment } from 'react'

//react-bootstrap
import { Row, Col, Image, Form, Nav, Dropdown, Tab, Container, Button } from 'react-bootstrap'

//components
import Card from '../../../../components/bootstrap/card'

//router
import { Link } from 'react-router-dom'

//pulgin
import FsLightbox from 'fslightbox-react';

// img
import avatars11 from '/src/assets/images/avatars/01.png'
import avatars22 from '/src/assets/images/avatars/avtar_1.png'
import avatars33 from '/src/assets/images/avatars/avtar_2.png'
import avatars44 from '/src/assets/images/avatars/avtar_3.png'
import avatars55 from '/src/assets/images/avatars/avtar_4.png'
import avatars66 from '/src/assets/images/avatars/avtar_5.png'



import icon1 from '/src/assets/images/icons/01.png'
import icon2 from '/src/assets/images/shapes/03.png'

import icon4 from '/src/assets/images/icons/04.png'
import icon8 from '/src/assets/images/icons/08.png'

import shap5 from '/src/assets/images/shapes/05.png'
import shap2 from '/src/assets/images/shapes/02.png'
import shap4 from '/src/assets/images/shapes/04.png'
import shap6 from '/src/assets/images/shapes/06.png'



import Select from "react-select";

const PagamentoMensalidade = memo(() => {
   const [toggler, setToggler] = useState(false);
   return (
      <Fragment>
         <Container>
            <FsLightbox
               toggler={toggler}
               sources={[icon4, shap2, icon8, shap4, icon2, shap6, shap5, shap4, icon1]}
            />
            <Tab.Container defaultActiveKey="first">

               
               <Row>
                  <Col lg="12">
                     <Card>
                        <Card.Body>
                           <div className="d-flex flex-wrap align-items-center justify-content-between">
                              <div className="d-flex flex-wrap align-items-center">
                                 <div className="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
                                    <Image className="theme-color-default-img  img-fluid rounded-pill avatar-100" src={avatars11} alt="profile-pic" />
                                    <Image className="theme-color-purple-img img-fluid rounded-pill avatar-100" src={avatars22} alt="profile-pic" />
                                    <Image className="theme-color-blue-img img-fluid rounded-pill avatar-100" src={avatars33} alt="profile-pic" />
                                    <Image className="theme-color-green-img img-fluid rounded-pill avatar-100" src={avatars55} alt="profile-pic" />
                                    <Image className="theme-color-yellow-img img-fluid rounded-pill avatar-100" src={avatars66} alt="profile-pic" />
                                    <Image className="theme-color-pink-img img-fluid rounded-pill avatar-100" src={avatars44} alt="profile-pic" />
                                 </div>
                                 <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                                    <h4 className="me-2 h4">Narciso Ribas</h4>
                                    <span> - Informatica</span>
                                 </div>
                              </div>
                              <Nav as="ul" className="d-flex nav-pills mb-0 text-center profile-tab" data-toggle="slider-tab" id="profile-pills-tab" role="tablist">
                                 <Nav.Item as="li">
                                    <Nav.Link eventKey="first">Perfil</Nav.Link>
                                 </Nav.Item>
                                 <Nav.Item as="li">
                                    <Nav.Link eventKey="second">Resumo de pagamentos</Nav.Link>
                                 </Nav.Item> 
                              </Nav>
                           </div>
                        </Card.Body>
                     </Card>
                  </Col>

                  <Col lg="12">
                     <Tab.Content className="profile-content">

                          {/**Perfil do estudante */}
                          <Tab.Pane eventKey="first" id="profile-profile">
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
                                       <Image className="theme-color-purple-img rounded-pill avatar-130 img-fluid" src={avatars22} alt="profile-pic" />
                                       <Image className="theme-color-blue-img rounded-pill avatar-130 img-fluid" src={avatars33} alt="profile-pic" />
                                       <Image className="theme-color-green-img rounded-pill avatar-130 img-fluid" src={avatars55} alt="profile-pic" />
                                       <Image className="theme-color-yellow-img rounded-pill avatar-130 img-fluid" src={avatars66} alt="profile-pic" />
                                       <Image className="theme-color-pink-img rounded-pill avatar-130 img-fluid" src={avatars44} alt="profile-pic" />
                                    </div>
                                    <div className="mt-3">
                                       <h3 className="d-inline-block">Narciso Ribas</h3>
                                       <p className="d-inline-block pl-3"> - Informática</p>
                                    </div>
                                 </div>

                                 <div className="header-title mt-2">
                                    <h4 className="card-title mb-1">Ano lectivo 2021/2022</h4>
                                 </div>
                                 <div className="mt-2">
                                    <h6 className="mb-1">Classe:</h6>
                                    <p>11ª</p>
                                 </div>
                                 <div className="mt-2">
                                    <h6 className="mb-1">Curso:</h6>
                                    <p>Informárica</p>
                                 </div>
                                 <div className="mt-2">
                                    <h6 className="mb-1">Número de estudante:</h6>
                                    <p><Link to="#" className="text-body"> 230114</Link></p>
                                 </div>
                             
                                 <div className="mt-2">
                                    <h6 className="mb-1">Estado da tesouraria:</h6>
                                    <p><Link to="#" className="text-body">Regularizada</Link></p>
                                 </div>
                              
                              </Card.Body>
                           </Card>
                           <Card>
                              <Card.Header>
                                 <div className="header-title">
                                    <h4 className="card-title">Pagamento de mensalidade</h4>
                                 </div>
                              </Card.Header>
                              <Card.Body>

                              <Form.Group className='mt-5 form-group col-md-8 center'>
                                 <Form.Check className="form-check  mb-3 col-md-4">
                                    <Form.Check.Input type="checkbox" id="customEsquecerDivida" />
                                    <Form.Check.Label htmlFor="customEsquecerDivida">Esquecer dívida</Form.Check.Label>
                                 </Form.Check>
                               </Form.Group>

                                 <div className="mt-2">
                                    <Form className='row'>
                                       
                                       <Form.Group className='form-group col-md-6'>
                                          <Form.Label>De</Form.Label>
                                          <Form.Control placeholder='Janeiro' disabled/>
                                       </Form.Group>

                                       <Form.Group className='form-group col-md-6'>
                                          <Form.Label>Para</Form.Label>

                                          <Select placeholder="Selecione o mes" isMulti options={[
                                             {'value':0,'label':"Janeiro"},
                                             {'value':1,'label':'Fevereiro'},
                                             {'value':2,'label':'Março'},
                                             {'value':3, 'label':'Abril'}
                                          ]}/>
                                             
                                       </Form.Group>

                                       <Form.Group className='form-group col-md-6'>
                                          <Form.Label>Dívida</Form.Label>
                                          <Form.Control disabled value={50000}/>
                                       </Form.Group>

                                       <Form.Group className='form-group col-md-6'>
                                          <Form.Label>Referência</Form.Label>
                                          <Form.Control placeholder='Referência'/>
                                       </Form.Group>

                                    

                                       <Form.Group className='form-group col-md-12'>
                                             <Form.Label>Total a pagar</Form.Label>
                                             <Form.Control disabled value={80000}/>
                                       </Form.Group>

                                       <Form.Group className='form-group col-md-6'>
                                          <Form.Label>Banco</Form.Label>
                                          <Form.Select required>
                                             <option>Selecione o banco</option>
                                             <option>BAI</option>
                                             <option>BIC</option>
                                             <option>BANCO SOL</option>
                                             <option>BANCO KEVE</option>
                                          </Form.Select>
                                       </Form.Group>

                                       <Form.Group className='form-group col-md-6'>
                                          <Form.Label>Tipo de pagamento</Form.Label>
                                          <Form.Select required>
                                             <option>Selecione o tipo de pagamento</option>
                                             <option>Transferência</option>
                                             <option>Depósito</option>
                                             <option>Multicaixa</option>
                                             <option>Dinheiro</option>
                                             <option>Cheque</option>
                                          </Form.Select>
                                       </Form.Group>

                                       <Card.Body>
                                          <Button variant="primary" className="btn btn-primary mt-2 me-1 me-1">Pagar</Button>
                                        </Card.Body>
                                    </Form>
                                 </div>
                                
                              </Card.Body>
                           </Card>
                        </Tab.Pane >
                   
                        {/**Resumo de pagamento */}
                        <Tab.Pane eventKey="second" id="profile-activity">
                           <Card>
                              <Card.Header className="d-flex justify-content-between">
                                 <div className="header-title">
                                    <h4 className="card-title">Resumo de pagamento</h4>
                                 </div>
                              </Card.Header>
                              <Card.Body>
                                 <div className="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                                
                                 </div>
                              </Card.Body>
                           </Card>
                        </Tab.Pane >
                     </Tab.Content>
                  </Col>

               </Row>

            </Tab.Container>
         </Container>
      </Fragment>
   )
}
)

PagamentoMensalidade.displayName = "PagamentoMensalidade"
export default PagamentoMensalidade;