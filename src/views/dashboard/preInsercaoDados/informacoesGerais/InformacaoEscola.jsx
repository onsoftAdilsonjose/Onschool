import { memo, Fragment, useContext } from 'react'
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

//react-bootstrap
import { Row, Col, Image, Form, Button, Container } from 'react-bootstrap'

//components
import Card from '../../../../components/bootstrap/card'

//router
import { Link } from 'react-router-dom'

import avatars1 from '/src/assets/images/avatars/01.png'
import { AuthContext } from '../../../../context/AuthContext'
import { operationHasBenSucceded, operationHasFailed } from '../../../../context/GlobalContext'
import {api} from "./../../../../server/server"



const createSchoolSchema = z.object({
   nomeEscola:z.string().nonempty("Adione o nome da escola"),
   numeroEscola:z.string().nonempty("Adicione o número da escola"),
   nif:z.string().nonempty("Adicione o o número de identiicação fiscal"),
   endereco:z.string().nonempty("Adicione o endereço"),
   email:z.string().email("Email inválido"),
   telefone:z.string().nonempty("Adicone o número de telefone").min(9,"O número deve ter no minímo 9 digítos")
   .max(12,"O número deve ter no máximo 12 digítos"),
   telefoneAlt:z.string().optional(),
   logo:z.instanceof(FileList).transform(list=>list.item[0])
   
})



const InformacaoEscola = memo(() => {
   const {register,handleSubmit,formState}=useForm({resolver:zodResolver(createSchoolSchema)})
   const {escola,setEscola}=useContext(AuthContext)
   const errors = formState.errors;

console.log(errors)
  async function handleShoolData(data){
      console.log(data.logo?.name)
      try {
         const response = await api.post("Admin/create-or-update",data)
         operationHasBenSucceded("Dados da escola adicionado com sucesso")
      } catch (error) {
         operationHasFailed("Erro ao adionar dados da escola")
      }
   }
   return (
      <Fragment>
         <Container>
         <Form onSubmit={handleSubmit(handleShoolData)}>
            <Row>

               {/**Imagem e redes sociais da escola */}
               <Col xl="4" lg="5" className="">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">Escola Mundo Prometido</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                    
                           <Form.Group className="form-group">
                              <div className="profile-img-edit position-relative">
                                 <Image className="theme-color-default-img  profile-pic rounded avatar-100" src={avatars1} alt="profile-pic" />
  
                                 <div className="upload-icone bg-primary">
                                    <label htmlFor="logotipo">
                                       <svg className="upload-button" width="14" height="14" viewBox="0 0 24 24">
                                          <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                       </svg>
                                    </label>
                                    <Form.Control {...register("logo")} id="logotipo" className="file-upload" type="file" accept="image/*" />
                                 </div>
                              </div>
                              <div className="img-extension mt-3">
                                 <div className="d-inline-block align-items-center">
                                 <h6 className="card-title">Escola Mundo Prometido</h6>
                                 </div>
                              </div>
                           </Form.Group>
                        
                        
                     </Card.Body>
                  </Card>
               </Col>

               {/**Formulario de ediao */}
               <Col xl="8" lg="7">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">Editar informações da escola</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <div className="new-user-info">
                     
                              <div className="row">

                               <Form.Group className="col-md-12 form-group">
                                    <Form.Label htmlFor="cname">Nome da empresa:</Form.Label>
                                    <Form.Control {...register("nomeEscola")} type="text" id="cname" placeholder="Company Name" />
                                    {errors.nomeEscola && <span className='text-warning'>{errors.nomeEscola.message}</span>}
                                 </Form.Group>
                                
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="lname">Número da escola:</Form.Label>
                                    <Form.Control {...register("numeroEscola")} type="text" id="lname" placeholder="Número da escola" />
                                    {errors.numeroEscola && <span className='text-warning'>{errors.numeroEscola.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="nif">NIF:</Form.Label>
                                    <Form.Control {...register("nif")} type="text" id="nif" placeholder="NIF" />
                                    {errors.nif && <span className='text-warning'>{errors.nif.message}</span>}
                                 </Form.Group>
                                 <Form.Group className="col-md-12 form-group">
                                    <Form.Label htmlFor="endreco">Endereço:</Form.Label>
                                    <Form.Control {...register("endereco")} type="text" id="endereco" placeholder="Endereço" className='py-4'/>
                                    {errors.endereco && <span className='text-warning'>{errors.endereco.message}</span>}
                                 </Form.Group>
                               
                         


                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="telefone">Contacto 1:</Form.Label>
                                    <Form.Control {...register("telefone")} type="text" id="telefone" placeholder="Contacto1" />
                                    {errors. telefone && <span className='text-warning'>{errors.telefone.message}</span>}
                                 </Form.Group>
                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="altconno">Contacto alternativo:</Form.Label>
                                    <Form.Control {...register("telefoneAlt")} type="text" id="altconno" placeholder="Contacto alternativo" />
                                    {errors.telefoneAlt && <span className='text-warning'>{errors.telefoneAlt.message}</span>}
                                 </Form.Group>
                                 <Form.Group className="col-md-12  form-group">
                                    <Form.Label htmlFor="email">Email:</Form.Label>
                                    <Form.Control {...register("email")} type="email" id="email" placeholder="Email" />
                                    {errors.email && <span className='text-warning'>{errors.email.message}</span>}
                                 </Form.Group>
                                
                                 
                              </div>
                              <hr />
                            
                              <Button type="submit" role='button' variant="btn btn-primary">Salvar</Button>
                      
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
            </Form>
         </Container>

      </Fragment>
   )
}
)

InformacaoEscola.displayName = "InformacaoEscola"
export default InformacaoEscola;