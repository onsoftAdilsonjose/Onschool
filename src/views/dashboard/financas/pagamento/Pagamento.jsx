import { useState, memo, Fragment, useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { parseCookies, setCookie } from "nookies"

//react-bootstrap
import { Row, Col, Image, Form, Nav, Dropdown, Tab, Container, Table } from 'react-bootstrap'
import Select from "react-select";

//components
import Card from '../../../../components/bootstrap/card'

//router
import { Link } from 'react-router-dom'


// img
import avatars11 from '/src/assets/images/avatars/01.png'
import avatars22 from '/src/assets/images/avatars/avtar_1.png'
import avatars33 from '/src/assets/images/avatars/avtar_2.png'
import avatars44 from '/src/assets/images/avatars/avtar_3.png'
import avatars55 from '/src/assets/images/avatars/avtar_4.png'
import avatars66 from '/src/assets/images/avatars/avtar_5.png'

import { api } from '../../../../server/server';

import MensalidadeListaEstudantes from '../Mensalidade/MensalidadeListaEstudantes';
import ServicePayment from './ServicePayment';
import Cart from './Cart';
import ConfirmarEstudante from '../../matricula/ConfirmarEstudante';

import { AuthContext } from '../../../../context/AuthContext';

const Pagamento = memo(() => {

  const {listEstudanteDetalhes,estudanteDetalhes,estudante,atualizarTela,setAtualizarTela,user,setEstudante}=useContext(AuthContext) 
  const [estudanteId,setEstudanteId]=useState()

  const [nomeCompleto,setNomeCompleto]=useState()
  const [numeroEstudante,setNumeroEstudante]=useState()
  const [classeEstudante,setClasseEstudante]=useState()

  useEffect(() => {

    const cookies = parseCookies();
      const { "token.Onschool": token } = cookies;

    async function getEstudante() {
      
      await api
        .get("/ProcuararEstudante",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },        
        )
        .then((response) => {
          setEstudante(response.data.EstudanteSelecionado);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getEstudante();
  }, []);


   function handleEstudanteDetalhesPaymente(){     
    const item = estudante.find(el=>el.studentID===estudanteId.value)
      listEstudanteDetalhes(item.classeID,item.anolectivoID,estudanteId.value)
      
   }

   useEffect(()=>{
 
      setNomeCompleto(estudanteDetalhes?.EstudanteDetalhes?.primeiro_nome && estudanteDetalhes?.EstudanteDetalhes?.ultimo_nome?estudanteDetalhes?.EstudanteDetalhes?.primeiro_nome+" "+estudanteDetalhes?.EstudanteDetalhes?.ultimo_nome :"")
      setClasseEstudante(estudanteDetalhes?.EstudanteDetalhes.classe_name)
      setNumeroEstudante(estudanteDetalhes?.EstudanteDetalhes.reg_Numero)
 
    
  },[estudanteDetalhes])


   useEffect(()=>{
    if(atualizarTela){
      setNomeCompleto("")
      setClasseEstudante("")
      setNumeroEstudante("")
      setAtualizarTela(false)
    }
  },[atualizarTela])

   
  
   return (
     <Fragment className="hide-on-print">
       <Container>
        
         <Tab.Container defaultActiveKey="second" className="hide-on-print">
           <Row>
             <Col lg="12">
               <Card>
                 <Card.Body>
                   <div className="d-flex flex-wrap align-items-center justify-content-between">
                     <div className="d-flex flex-wrap align-items-center">
                       <div className="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
                         <Image
                           className="theme-color-default-img  img-fluid rounded-pill avatar-100"
                           src={avatars11}
                           alt="profile-pic"
                         />
                                      
                       </div>
                       <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                         <h4 className="me-2 h4">{user.primeiro_nome+" "+user.ultimo_nome}</h4>
                         <span> - {user.usertype}</span>
                       </div>
                     </div>
                     <Nav
                       as="ul"
                       className="d-flex nav-pills mb-0 text-center profile-tab"
                       data-toggle="slider-tab"
                       id="profile-pills-tab"
                       role="tablist"
                     >
                       <Nav.Item as="li" hidden>
                         <Nav.Link eventKey="first">Matricula</Nav.Link>
                       </Nav.Item>
                       <Nav.Item as="li">
                         <Nav.Link eventKey="second">Mensalidades</Nav.Link>
                       </Nav.Item>
                       <Nav.Item as="li">
                         <Nav.Link eventKey="third">Serviços</Nav.Link>
                       </Nav.Item>
                     </Nav>
                   </div>
                 </Card.Body>
               </Card>
             </Col>

             <Col lg="12">
               <Card>
                 <Card.Body>
                   <div className="row">
    

                     <Form.Group className="form-group col-md-8">
                       <Form.Label>Buscar estudante</Form.Label>
                        
                       {estudante.length===0?
                       <Select  
                           isLoading                 
                            onChange={setEstudanteId}
                           isDisabled                           
                           options={estudante.map((estudante)=>(
                             {value:estudante.studentID,label:estudante.primeiro_nome+" "+estudante.nomeCurso+" "+estudante.classe_name+" "+estudante.ano_lectivo}
                            ))}
                          />  :<Select    
                                    
                          onChange={setEstudanteId}
                           value={estudanteId} 
                          isClearable 
                          isSearchable
                          placeholder="Selecione o estudante"
                          options={estudante.map((estudante)=>(
                           {value:estudante.studentID,label:estudante.primeiro_nome+" "+estudante.ultimo_nome+"     "+" "+estudante.ano_lectivo}
                          ))}
                        />  }                       
                                               
                     </Form.Group>

                   <Col>
                   <Form.Group>
                          <button onClick={handleEstudanteDetalhesPaymente} className='mt-5 btn btn-primary'>Pesquisar</button>
                     </Form.Group>
                   </Col>

                     

                   
                   </div>
                  
                   {/** Dados do estudante */}

                   <div className="custom-table-effect table-responsive border rounded mt-3 mb-3">
                     <Table
                       className="mb-0"
                       id="datatable"
                       data-toggle="data-table"
                     >
                       <thead>
                         <tr className="bg-white">
                           <th scope="col">Nome completo </th>
                           <th scope="col">Número de estudante</th>
                           <th scope="col">Classe</th>
                           <th scope='col'>Historico de pagamento</th>
                        
                         </tr>
                       </thead>
                       <tbody>
                         <tr>
                           <td>{nomeCompleto}</td>
                           <td>{numeroEstudante}</td>
                           <td>{classeEstudante}</td>
                           <td>{nomeCompleto?<button className='btn btn-primary'>Ver</button>:""}</td>
                    
                           
                         </tr>
                       </tbody>
                     </Table>
                   </div>
                 </Card.Body>
               </Card>
             </Col>

             <Col lg="6">
               <Tab.Content className="profile-content">
                 <Tab.Pane eventKey="first" id="profile-feed" hidden>
               
                  <Card>
                    <Card.Body>
                       <ConfirmarEstudante/>
                    </Card.Body>
                  </Card>
                 </Tab.Pane>

                 <Tab.Pane eventKey="second" id="profile-activity">
                   <MensalidadeListaEstudantes />
                 </Tab.Pane>

                 {/**Servicos */}
                 <Tab.Pane eventKey="third" id="profile-friends">
                     <ServicePayment/>
                 </Tab.Pane>
              
               </Tab.Content>
             </Col>

            {/**Carrinho  */}
             <Col lg="6">              
                 <Cart/>              
             </Col>
           </Row>
         </Tab.Container>
       </Container>
     </Fragment>
   );
}
)

Pagamento.displayName = "Pagamento"
export default Pagamento;