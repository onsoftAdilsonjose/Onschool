import { useState, memo, Fragment } from 'react'

//react-bootstrap
import { Row, Col, Image, Form, Nav, Dropdown, Tab, Container } from 'react-bootstrap'

//components
import Card from '../../../components/bootstrap/card'

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
import avatars2 from '/src/assets/images/avatars/02.png'
import avatars3 from '/src/assets/images/avatars/03.png'
import avatars4 from '/src/assets/images/avatars/04.png'
import avatars5 from '/src/assets/images/avatars/05.png'


import icon1 from '/src/assets/images/icons/01.png'
import icon2 from '/src/assets/images/shapes/03.png'
import icon3 from '/src/assets/images/avatars/03.png'
import icon4 from '/src/assets/images/icons/04.png'
import icon8 from '/src/assets/images/icons/08.png'

import shap5 from '/src/assets/images/shapes/05.png'
import shap2 from '/src/assets/images/shapes/02.png'
import shap4 from '/src/assets/images/shapes/04.png'
import shap6 from '/src/assets/images/shapes/06.png'
import pages2 from '/src/assets/images/pages/03-page.jpg'

import ShareOffcanvas from '../../../components/partials/components/shareoffcanvas'

const EstudanteProfile = memo(() => {
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
                                    <h4 className="me-2 h4">Austin Robertson</h4>
                                    <span> - Estudante</span>
                                 </div>
                              </div>
                              <Nav as="ul" className="d-flex nav-pills mb-0 text-center profile-tab" data-toggle="slider-tab" id="profile-pills-tab" role="tablist">
                                 
                                 <Nav.Item as="li">
                                    <Nav.Link eventKey="first">Perfil</Nav.Link>
                                 </Nav.Item>                                 
                                
                                 <Nav.Item as="li">
                                    <Nav.Link eventKey="second">Historico</Nav.Link>
                                 </Nav.Item>
                              
                              </Nav>
                           </div>
                        </Card.Body>
                     </Card>
                  </Col>
                
                  <Col lg="12">
                     <Tab.Content className="profile-content">
                        {/** PERFIL MAIN */}    
                        <Tab.Pane eventKey="first" id="profile-profile">
                           <Card>
                              <Card.Header>
                                 <div className="header-title">
                                    <h4 className="card-title">Profile</h4>
                                 </div>
                              </Card.Header>
                              <Card.Body>
                                 <div className="text-center">
                                    <div className="user-profile">
                                       <Image className="theme-color-default-img  rounded-pill avatar-130 img-fluid" src={avatars11} alt="profile-pic" />
                                       
                                    </div>
                                    <div className="mt-3">
                                       <h3 className="d-inline-block">Austin Robertson</h3>
                                       <p className="d-inline-block pl-3"> - ESTUDANTE</p>
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
                                 <div className="user-bio">
                                    <p>Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.</p>
                                 </div>
                                 <div className="mt-2">
                                    <h6 className="mb-1">Joined:</h6>
                                    <p>Feb 15, 2021</p>
                                 </div>
                                 <div className="mt-2">
                                    <h6 className="mb-1">Lives:</h6>
                                    <p>United States of America</p>
                                 </div>
                                 <div className="mt-2">
                                    <h6 className="mb-1">Email:</h6>
                                    <p><Link to="#" className="text-body"> austin@gmail.com</Link></p>
                                 </div>
                                 <div className="mt-2">
                                    <h6 className="mb-1">Url:</h6>
                                    <p><Link to="#" className="text-body" target="_blank"> www.bootstrap.com </Link></p>
                                 </div>
                                 <div className="mt-2">
                                    <h6 className="mb-1">Contact:</h6>
                                    <p><Link to="#" className="text-body">(001) 4544 565 456</Link></p>
                                 </div>
                              </Card.Body>
                           </Card>
                        </Tab.Pane >

                        {/** HISTORICO */}
                        <Tab.Pane eventKey="second" id="profile-activity">
                           <Card>
                              <Card.Header className="d-flex justify-content-between">
                                 <div className="header-title">
                                    <h4 className="card-title">Historico</h4>
                                 </div>
                              </Card.Header>
                              <Card.Body>
                                 <div className="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                                    <ul className="list-inline p-0 m-0">
                                       <li>
                                          <div className="timeline-dots timeline-dot1 border-primary text-primary"></div>
                                          <h6 className="float-left mb-1">Client Login</h6>
                                          <small className="float-right mt-1">24 November 2019</small>
                                          <div className="d-inline-block w-100">
                                             <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple</p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="timeline-dots timeline-dot1 border-success text-success"></div>
                                          <h6 className="float-left mb-1">Scheduled Maintenance</h6>
                                          <small className="float-right mt-1">23 November 2019</small>
                                          <div className="d-inline-block w-100">
                                             <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple</p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="timeline-dots timeline-dot1 border-danger text-danger"></div>
                                          <h6 className="float-left mb-1">Dev Meetup</h6>
                                          <small className="float-right mt-1">20 November 2019</small>
                                          <div className="d-inline-block w-100">
                                             <p>Bonbon macaroon jelly beans <Link to="#">gummi bears</Link>gummi bears jelly lollipop apple</p>
                                             <div className="iq-media-group iq-media-group-1">
                                                <Link to="#" className="iq-media-1">
                                                   <div className="icon iq-icon-box-3 rounded-pill">SP</div>
                                                </Link>
                                                <Link to="#" className="iq-media-1">
                                                   <div className="icon iq-icon-box-3 rounded-pill">PP</div>
                                                </Link>
                                                <Link to="#" className="iq-media-1">
                                                   <div className="icon iq-icon-box-3 rounded-pill">MM</div>
                                                </Link>
                                             </div>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="timeline-dots timeline-dot1 border-primary text-primary"></div>
                                          <h6 className="float-left mb-1">Client Call</h6>
                                          <small className="float-right mt-1">19 November 2019</small>
                                          <div className="d-inline-block w-100">
                                             <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple</p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="timeline-dots timeline-dot1 border-warning text-warning"></div>
                                          <h6 className="float-left mb-1">Mega event</h6>
                                          <small className="float-right mt-1">15 November 2019</small>
                                          <div className="d-inline-block w-100">
                                             <p>Bonbon macaroon jelly beans gummi bears jelly lollipop apple</p>
                                          </div>
                                       </li>
                                    </ul>
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

EstudanteProfile.displayName = "EstudanteProfile"
export default EstudanteProfile;