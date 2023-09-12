import { memo, Fragment } from 'react'

//react-bootstrap
import { Row, Col, Image, Form, Button, Container } from 'react-bootstrap'

//components
import Card from '../../../components/bootstrap/card'



const AddProfessor = memo(() => {
   return (
      <Fragment>
         <Container>
            <Row>
               <Col xl="12" lg="12">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title d-none">Matricular estudante</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <div className="new-user-info">
                           <Form>
                              <div className="row">
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="fname">Primeiro nome:</Form.Label>
                                    <Form.Control type="text" id="fname" placeholder="Primeiro nome" required />
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="lname">Sobrenome:</Form.Label>
                                    <Form.Control type="text" id="lname" placeholder="Sobrenome" required/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="add1">Número do documento:</Form.Label>
                                    <Form.Control type="text" id="add1" placeholder="NIF" />
                                 </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label>Tipo de documento:</Form.Label>
                                    <select name="type" className="selectpicker form-control" data-style="py-0" required>
                                       <option>Selecione o documento</option>
                                       <option>Bilhete</option>
                                       <option>Cédula</option>
                                       <option >Carta de condução</option>
                                       <option>Passaport</option>
                                       
                                    </select>
                                 </Form.Group>
                                 
                              <Form.Group className="form-group col-md-6">
                                 <Form.Label>Gênero:</Form.Label>
                                 <select name="type" className="selectpicker form-control" data-style="py-0" required>
                                    <option>Selecione o genero</option>
                                    <option>Masculino</option>
                                    <option>Femenino</option>
            
                                 </select>
                               </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="cname">Data de nascimento:</Form.Label>
                                    <Form.Control type="date" id="cname" placeholder="Data de nascimento" required/>
                                 </Form.Group>
                                 <Form.Group className="col-md-4 form-group">
                                    <Form.Label>País:</Form.Label>
                                    <select name="type" className="selectpicker form-control" data-style="py-0">
                                       <option>Selecione o país</option>
                                       <option>Angola</option>
                                       <option>Moçambique</option>
                                       <option >Cabo Verde</option>
                                       <option>Guiné Bissau</option>
                                       <option>São Tomé e Princípe</option>
                                    </select>
                                 </Form.Group>
                                 <Form.Group className="col-md-4  form-group">
                                    <Form.Label htmlFor="mobno">Província:</Form.Label>
                                    <Form.Control type="text" id="mobno" placeholder="Província" required/>
                                 </Form.Group>
                                 <Form.Group className="col-md-4  form-group">
                                    <Form.Label htmlFor="altconno">Município:</Form.Label>
                                    <Form.Control type="text" id="altconno" placeholder="Município" required/>
                                 </Form.Group>
                                 {/**Dados do pai e da mae */}

                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="nomePai">Nome do pai:</Form.Label>
                                    <Form.Control type="text" id="nomePai" placeholder="Nome do pai" required/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="nomeMae">Nome da mãe:</Form.Label>
                                    <Form.Control type="text" id="pno" placeholder="Nome da mãe" required/>
                                 </Form.Group>
                                 {/**Fim dados do pai e da mae */}
                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="email">Email:</Form.Label>
                                    <Form.Control type="email" id="email" placeholder="Email"  />
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="pno">Telefone:</Form.Label>
                                    <Form.Control type="number" id="pno" placeholder="Telefone" required/>
                                 </Form.Group>
                                 <Form.Group className="col-md-12 form-group">
                                    <Form.Label htmlFor="city">Endereço:</Form.Label>
                                    <Form.Control className="py-5" type="text" id="city" placeholder="Endereço" required/>
                                 </Form.Group>
                              </div>
                              <hr />
                              
                        
                              <Button type="submit" variant="btn btn-primary">Matricular estudante</Button>
                           </Form>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>

         </Container>

      </Fragment>
   )
}
)

AddProfessor.displayName = "AddProfesor"
export default AddProfessor;