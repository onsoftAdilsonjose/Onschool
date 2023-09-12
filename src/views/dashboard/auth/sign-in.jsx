import { memo, Fragment, useState, useContext } from 'react'

//react-bootstrap
import { Row, Col, Image, Form, Button, ListGroup, } from 'react-bootstrap'

//router
import { Link, useNavigate } from 'react-router-dom'

//components
import Card from '../../../components/bootstrap/card'

// img
import facebook from '/src/assets/images/brands/fb.svg'
import google from '/src/assets/images/brands/gm.svg'
import instagram from '/src/assets/images/brands/im.svg'
import linkedin from '/src/assets/images/brands/li.svg'
import auth1 from '/src/assets/images/auth/05.jpg'

// Import selectors & action from setting store
import * as SettingSelector from '../../../store/setting/selectors'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../context/AuthContext'

//tostfy notification

import {toast } from 'react-toastify';




const SignIn = memo(() => {
   const appName = useSelector(SettingSelector.app_name)


   const [email,setEmail]=useState('')
   const [password,setPassord]=useState("AD2372428231");

   const {signIn}=useContext(AuthContext)

   const styleNotification={
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      }

   function notify(){
      toast.warn("Preenca os campos em branco!",styleNotification);
   }

   const handleSubmiteSignIN = ()=>{
      if(email==="" || email===null && password==="" || password===null){
         notify();
      }
    signIn({email,password});
   } 
   return (
      <Fragment>
       
         <section className="login-content">
            <Row className="row m-0 align-items-center bg-white">
               <Col md="12" lg="6" className='align-self-center'>
                  <Link to="/" className="navbar-brand d-flex align-items-center  justify-content-center text-primary">
                     <div className="logo-normal">
                        <svg className="text-primary" viewBox="0 0 32 32" width="80px" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fillRule="evenodd" clipRule="evenodd" d="M7.25333 2H22.0444L29.7244 15.2103L22.0444 28.1333H7.25333L0 15.2103L7.25333 2ZM11.2356 9.32316H18.0622L21.3334 15.2103L18.0622 20.9539H11.2356L8.10669 15.2103L11.2356 9.32316Z" fill="currentColor" />
                           <path d="M23.751 30L13.2266 15.2103H21.4755L31.9999 30H23.751Z" fill="#3FF0B9" />
                        </svg>
                     </div>
                     <h2 className="logo-title ms-3">{appName}</h2>
                  </Link>
                  <Row className="justify-content-center pt-5">
                     <Col md="10">
                        <Card className="card card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                           <Card.Body>

                              <h2 className="mb-2 text-center">Login</h2>
                              <p className="text-center">Entre para estar conectado.</p>
                              <Form>
                                 <Row>
                                    <Col lg="12">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Email</Form.Label>
                                          <input type="email" className="form-control"
                                          value={email}
                                          onChange={e=>setEmail(e.target.value)}
                                          id="email" 
                                          aria-describedby="email" placeholder="email" />
                                       </Form.Group >
                                    </Col>
                                    <Col lg="12" className="">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Palavra passe</Form.Label>
                                          <input
                                           className="form-control"
                                          value={password}
                                          onChange={e=>setPassord(e.target.value)}
                                           type="password" 
                                          id="password"
                                           aria-describedby="password" placeholder="AD2372428231"/>
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-between">
                                       <Form.Check className="form-check mb-3">
                                          <Form.Check.Input type="checkbox" id="customCheck1" />
                                          <Form.Check.Label htmlFor="customCheck1">Lembrar</Form.Check.Label>
                                       </Form.Check>
                                       <Link to="/auth/recoverpw">Esqueceu a senha?</Link>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center">
                                    <Button onClick={handleSubmiteSignIN} type="button" variant="btn btn-primary">Entrar</Button>
                                 </div>
                                 <p className="text-center my-3">ou entrar com outra conta?</p>
                                 <div className="d-flex justify-content-center">
                                    <ListGroup as="ul" className="list-group-horizontal list-group-flush">
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={facebook} alt="fb" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={google} alt="gm" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={instagram} alt="im" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={linkedin} alt="li" /></Link>
                                       </ListGroup.Item>
                                    </ListGroup>
                                 </div>
                                 <p className="mt-3 text-center">
                                    Não tem uma conta? <Link to="/auth/sign-up" className="text-underline">Clicque aqui para criar.</Link>
                                 </p>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
               </Col>

               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1  overflow-hidden imgWelcomeLogin">
                  <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
               </Col>
            
            </Row>
         </section>
      </Fragment>
   )
}
)

SignIn.displayName = "SignIn"
export default SignIn
