import { useState, memo, Fragment } from 'react'

//react-bootstrap
import { Row, Col, Image, Form, Nav, Dropdown, Tab, Container } from 'react-bootstrap'

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

import ShareOffcanvas from '../../../../components/partials/components/shareoffcanvas'

const HistoricoDePagamento = memo(() => {
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
                     <Tab.Content className="profile-content">
                      
                       
                       
                        <Tab.Pane eventKey="fourth" id="profile-profile">
                           <Card>
                              <Card.Header>
                                 <div className="header-title">
                                    <h4 className="card-title">Perfil do estudante</h4>
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
                                       <h3 className="d-inline-block">Austin Robertson</h3>
                                       <p className="d-inline-block pl-3"> - nº 343434343</p>
                                       
                                    </div>
                                 </div>
                              </Card.Body>
                           </Card>
                           <Card>
                              <Card.Header>
                                 <div className="header-title">
                                    <h4 className="card-title">About User</h4>
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
                     </Tab.Content>
                  </Col>
                 
               </Row>

            </Tab.Container>
         </Container>
      </Fragment>
   )
}
)

HistoricoDePagamento.displayName = "HistoricoDePagamento"
export default HistoricoDePagamento;