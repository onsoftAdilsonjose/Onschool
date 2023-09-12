import { memo, Fragment, useState, useContext, useEffect } from 'react'
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

//react-bootstrap
import { Row, Col, Image, Form, Button, Container } from 'react-bootstrap'

//components
import Card from '../../../components/bootstrap/card'

//router
import { Link } from 'react-router-dom'

// img
import avatars1 from '/src/assets/images/avatars/01.png'
import avatars2 from '/src/assets/images/avatars/avtar_1.png'
import avatars3 from '/src/assets/images/avatars/avtar_2.png'
import avatars4 from '/src/assets/images/avatars/avtar_3.png'
import avatars5 from '/src/assets/images/avatars/avtar_4.png'
import avatars6 from '/src/assets/images/avatars/avtar_5.png'
import { AuthContext } from '../../../context/AuthContext'
import { api } from '../../../server/server'



const createUserFormSchema = z.object({
   primeiroNome:z.string().nonempty("Campo obrigatório"),
   ultimoNome:z.string().nonempty("Campo obrigatório"),
   nomePai:z.string().nonempty("Campo obrigatório"),
   nomeMae:z.string().nonempty("Campo obrigatório"),
   generoId:z.coerce.number().min(1," Selecione o genero"),
   dataofbirth:z.string().nonempty("Campo obrigatório"),
   numeroBilhete:z.string().nonempty("Campo obrigatório"),
   boletimDeNascimento:z.string(),
   numeroPassaport:z.string(),
   numeroCedula:z.string(),
   pais:z.string().nonempty("Campo obrigatorio"),
   provinciaId:z.string().nonempty("Campo obrigatorio"),
   provinciaId:z.string().nonempty("Campo obrigatorio"),
   municipioId:z.string().nonempty("Campo obrigatorio"),
   bairro:z.string().nonempty("Campo obrigatorio"),
   numeroDeTelefone:z.string().nonempty("Campo obrigatório"),
   telefoneAlternativo:z.string(),
   email:z.string().email("Formato de email inválido"),
   role:z.string().nonempty("Selecione o tipo de usuário")

})


const UserAdd = memo(() => {

   const {register,handleSubmit,formState}=useForm({resolver:zodResolver(createUserFormSchema)})

   const {errors} =formState

   const {registerUser,roles}=useContext(AuthContext)

useEffect(()=>{
   api.get("Admin/listarUsuarios")
   .then((response)=>{
      console.log(response)
   })
},[])
   
   const handleSubmiteCreateUser =(data)=>{
    registerUser(data);   
   }


   return (
      <Fragment>
         <Container>
            <Row>
            <Form onSubmit={handleSubmit(handleSubmiteCreateUser)} className='row'>
               <Col xl="3" lg="4" className="">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">Novo usuário</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        
                           <Form.Group className="form-group">
                              <div className="profile-img-edit position-relative">
                                 <Image className="theme-color-default-img  profile-pic rounded avatar-100" src={avatars1} alt="profile-pic" />
                                 <Image className="theme-color-purple-img profile-pic rounded avatar-100" src={avatars2} alt="profile-pic" />
                                 <Image className="theme-color-blue-img profile-pic rounded avatar-100" src={avatars3} alt="profile-pic" />
                                 <Image className="theme-color-green-img profile-pic rounded avatar-100" src={avatars5} alt="profile-pic" />
                                 <Image className="theme-color-yellow-img profile-pic rounded avatar-100" src={avatars6} alt="profile-pic" />
                                 <Image className="theme-color-pink-img profile-pic rounded avatar-100" src={avatars4} alt="profile-pic" />
                                 <div className="upload-icone bg-primary">
                                    <label htmlFor="userImageSelecte">
                                    <svg className="upload-button" width="14" height="14" viewBox="0 0 24 24">
                                       <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                    </svg>
                                    </label>
                                    <input className='form-control file-upload' type="file" accept="image/*" id="userImageSelecte"/>
                                 </div>
                              </div>
                              <div className="img-extension mt-3">
                                 <div className="d-inline-block align-items-center">
                                    <span>Apenas</span>{' '}
                                    <Link to="#">.jpg</Link>{' '}
                                    <Link to="#">.png</Link>{' '}
                                    <Link to="#">.jpeg</Link>{' '}
                                    <span>são permitidos</span>
                                 </div>
                              </div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Regras de usuário:</Form.Label>
                              <select {...register("role")} className="selectpicker form-control" data-style="py-0">
                                 <option>---- Selecione ---</option>
                                  {
                                    roles.map((role)=>(
                                       <option key={role.id} value={role.id}>{role.name}</option>
                                    ))
                                  } 
                              </select>
                              {errors?.role && <span className='text-warning mt-3'>{errors.role?.message}</span>}
                           </Form.Group>
                         
                        
                     </Card.Body>
                  </Card>
               </Col>
               <Col xl="9" lg="8">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">Informações do usuário</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <div className="new-user-info">
                        
                              <div className="row">
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="fname">Primeiro nome:</Form.Label>
                                    <input
                                       {...register("primeiroNome")}
                                     className='form-control' 
                                 
                                     type="text" id="fname" placeholder="Primeiro nome" />

                                     {errors?.primeiroNome && <span className='text-warning mt-3'>{errors.primeiroNome?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="lname">Ultimo nome:</Form.Label>
                                    <input 
                                    {...register("ultimoNome")}
                                    className='form-control' type="text"
                                  
                                     id="lname" placeholder="Ultimo nome" />
                                      {errors?.ultimoNome && <span className='text-warning mt-3'>{errors.ultimoNome?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="add1">Nome do pai:</Form.Label>
                                    <input {...register("nomePai")} className='form-control' type="text" id="add1"  />
                                        {errors?.nomePai && <span className='text-warning mt-3'>{errors.nomePai?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label>Nome da mãe:</Form.Label>
                                    <input {...register("nomeMae")} className='form-control' type="text" id="add2" />
                                    {errors?.nomeMae && <span className='text-warning mt-3'>{errors.nomeMae?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label>Genero:</Form.Label>
                                    <select name="type" 
                                       {...register("generoId")}
         
                                       className="selectpicker form-control" data-style="py-0">
                                       <option>Selecione o genero</option>
                                       <option value={1}>Masculino</option>
                                       <option value={2}>Femenino</option>
                                    </select>
                                    {errors?.generoId && <span className='text-warning mt-3'>{errors.generoId?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label>Data de nascimento:</Form.Label>
                                    <input 
                                       {...register("dataofbirth")}
                                       className='form-control'
                                       type="date"/>
                                       {errors?.dataofbirth && <span className='text-warning mt-3'>{errors.dataofbirth?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-md-12 form-group">
                                    <Form.Label>Boletim de nascimento:</Form.Label>
                                    <input 
                                       {...register("boletimDeNascimento")}
                                       className='form-control'                                      
                                     type="text"/>
                                    {errors?.boletimDeNascimento && <span className='text-warning mt-3'>{errors.boletimDeNascimento?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label>Bilhete:</Form.Label>
                                    <input {...register("numeroBilhete")} className='form-control'  type="text"/>
                                    {errors?.numeroBilhete && <span className='text-warning mt-3'>{errors.numeroBilhete?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label>Passaporte:</Form.Label>
                                    <input {...register("numeroPassaport")} className='form-control' type="text"/>
                                    {errors?.numeroPassaport && <span className='text-warning mt-3'>{errors.numeroPassaport?.message}</span>}
                                 </Form.Group>

                                 
                                 <Form.Group className="col-md-12 form-group">
                                    <Form.Label>Cedula:</Form.Label>
                                    <input {...register("numeroCedula")} className='form-control' type="text"/>
                                    {errors?.numeroCedula && <span className='text-warning mt-3'>{errors.numeroCedula?.message}</span>}
                                 </Form.Group>
                                
                                 <Form.Group className="col-sm-12 form-group">
                                    <Form.Label>Nacionalidade:</Form.Label>
                                    <select 
                                       {...register("pais")}                                      
                                       className="selectpicker form-control" data-style="py-0">
                                       <option>Selecione o país</option>
                                       <option value={1}>Caneda</option>
                                       <option value={2}>Noida</option>
                                       <option value={3}>USA</option>
                                       <option value={4}>India</option>
                                       <option value={5}>Africa</option>
                                    </select>
                                    {errors?.pais && <span className='text-warning mt-3'>{errors.pais?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-sm-6 form-group">
                                    <Form.Label>Provincia:</Form.Label>
                                    <select {...register("provinciaId")} 
                                        className="selectpicker form-control" data-style="py-0">
                                       <option>Selecione a provincia</option>
                                       <option value={1}>Luanda</option>
                                       <option value={2}>Benguela</option>
                                       <option value={3}>Malange</option>
                                       <option value={4}>Uige</option>
                                       <option value={5}>Cabinda</option>
                                    </select>
                                    {errors?.provinciaId && <span className='text-warning mt-3'>{errors.provinciaId?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-sm-6 form-group">
                                    <Form.Label>Municipio:</Form.Label>
                                    <select {...register("municipioId")}
                                       className="selectpicker form-control" data-style="py-0">
                                       <option>Selecione o municipio</option>
                                       <option value={1}>Luanda</option>
                                       <option value={2}>Belas</option>
                                       <option value={3}>Cacuso</option>
                                       <option value={4}>Negage</option>
                                     
                                    </select>

                                    {errors?.municipioId && <span className='text-warning mt-3'>{errors.municipioId?.message}</span>}
                                 </Form.Group>

                                 <Form.Group className="col-sm-12 form-group">
                                    <Form.Label>Bairro:</Form.Label>
                                    <select {...register("bairro")} 
                                      
                                         className="selectpicker form-control" data-style="py-0">
                                       <option disabled>Selecioneo o bairro</option>
                                       <option value={1}>Kassequel</option>
                                       <option value={2}>Carreira de tiro</option>
                                       <option value={3}>Ritondo</option>
                                       <option value={4}>Calemba</option>
                                       <option value={5}>Golf 2</option>
                                    </select>
                                    {errors?.bairro && <span className='text-warning mt-3'>{errors.bairro?.message}</span>}
                                 </Form.Group>

                             


                                 <Form.Group className="col-sm-12  form-group">
                                    <Form.Label htmlFor="mobno">Número do telefone:</Form.Label>
                                    <input {...register("numeroDeTelefone")} className='form-control' type="text" id="mobno" placeholder="Número do telefone" />
                                    {errors?.numeroDeTelefone && <span className='text-warning mt-3'>{errors.numeroDeTelefone?.message}</span>}
                                 </Form.Group>
                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="altconno">Telefone alternativo:</Form.Label>
                                    <input {...register("telefoneAlternativo")} className='form-control' type="text" id="altconno" placeholder="Telefone alternativo" />
                                    {errors?.telefoneAlternativo && <span className='text-warning mt-3'>{errors.telefoneAlternativo?.message}</span>}
                                 </Form.Group>
                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="email">Email:</Form.Label>
                                    <input
                                    {...register("email")}
                                    className='form-control'
                                     type="email" 
                                    id="email" 
                                    placeholder="Email" />
                                     {errors?.email && <span className='text-warning mt-3'>{errors.email?.message}</span>}
                                 </Form.Group>
                               
                              
                              </div>
                              <hr />
                             <Button type="submit" variant="btn btn-primary" role='button'>Adicionar  novo usuário</Button>
                          
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Form>
            </Row>

         </Container>

      </Fragment>
   )
}
)

UserAdd.displayName = "UserAdd"
export default UserAdd;