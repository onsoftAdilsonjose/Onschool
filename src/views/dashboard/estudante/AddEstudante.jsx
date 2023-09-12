import { memo, Fragment, useContext,useEffect,useState} from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

//react-bootstrap
import { Row, Col, Image, Form, Button, Container } from 'react-bootstrap'

//components
import Card from '../../../components/bootstrap/card'
import { AuthContext, confirmOperation } from '../../../context/AuthContext'
import { GlobalContext, operationHasBenSucceded } from '../../../context/GlobalContext'
import { api } from '../../../server/server'
import BoletimDeMatricula from '../matricula/modais/BoletimDeMatricula'


const matriculaEstudanteSchema = z.object({
   primeiroNome:z.string().nonempty("Campo obrigatório"),
   ultimoNome:z.string().nonempty("Campo obrigatório"),
   nomePai:z.string().nonempty("Campo obrigatório"),
   nomeMae:z.string().nonempty("Campo obrigatório"),
   generoId:z.coerce.number().min(1," Selecione o genero"),
   dataofbirth:z.string().nonempty("Campo obrigatório"),
   numeroDoDocumento:z.string().nonempty("Campo obrigatório"),
   tipoDeDocumento:z.string(),
   pais:z.string().nonempty("Campo obrigatorio"),
   provincia:z.string().nonempty("Campo obrigatorio"),
   municipio:z.string().nonempty("Campo obrigatorio"),
   telefone:z.string().nonempty("Campo obrigatório").min(9,"Telefone deve tter no minimo 9 digitos").max(12,"Telefone deve tter no maximo 12 digitos"),
   email:z.string().email("Formato de email inválido"),
   /**
    * Dados do encarregado
    */
    nomeEncarregado:z.string().nonempty("Nome obrigatorio"),
   sobreNomeEncarregado:z.string().nonempty("Sobrenome obrigatorio"),
   telefoneEncarregado:z.string().nonempty("Campo obrigatório").min(9,"Telefone deve tter no minimo 9 digitos").max(12,"Telefone deve tter no maximo 12 digitos"),
   emailEncarregado:z.string().email("email inválido"),
   nacionalidadeEncarregado:z.string().optional(),
/**
 * Ddos da maricula
 */
   cursoId:z.coerce.number().optional(),
   classeId:z.coerce.number().min(1,"Selecione a classe"),
   peridoId:z.coerce.number().min(1,"Selecione o periodo"),
   turmaId:z.coerce.number().min(1,"Selecione a turma"),
   sala:z.string().nonempty("Selecione a sala")

})



const AddEstudante = memo(() => {
   const {matriculaEstudante,showBoletim,setShowBoletim}=useContext(AuthContext)
   const {classes}=useContext(GlobalContext)

   const {register,handleSubmit,formState}=useForm({resolver:zodResolver(matriculaEstudanteSchema  )})
   const {errors} =formState

   /**Dados da matricula */
   const [sala,setSala] =useState([])
   const [turma,setTurma]=useState([])
   const [periodo,setPeriodo]=useState([])
   const [curso,setCurso]=useState([])
 

    /*** RECUPERANDO OS IDS */
 const [turmaID,setTurmaID]=useState(0)
 const [cursoID,setCursoID]=useState(0)
 const [disciplinaID,setDisciplinaID]=useState(0)
 const [periodoID,setPeriodoID]=useState(0);
 const [salaID,setSalaID]=useState(0)


  const [classComCurso,setClasseComCurso]=useState(true)
  const [classeSelecionada, setClasseSelecionda]=useState();

  function handleClose(){
      setShowBoletim(false);
  }


//Sala
useEffect(()=>{
   api.get(`Admin/salaApi/${classeSelecionada}`)
   .then((response)=>{
     setSala(response.data.Sala)
   })
 },[classeSelecionada])
 
 //Turma
 useEffect(()=>{
   api.get(`Admin/turmaApi/${classeSelecionada}`)
   .then((response)=>{
     setTurma(response.data.Turmas)
   })
 },[classeSelecionada])
 
 //perido
 useEffect(()=>{
   api.get(`Admin/periodoApi/${classeSelecionada}`)
   .then((response)=>{
     setPeriodo(response.data.periodo)
   })
 },[classeSelecionada])
 
 
 useEffect(()=>{
   api.get(`Admin/cursoApi/${classeSelecionada}`)
   .then((response)=>{
     setCurso(response.data.Cursos)
   })
 },[classeSelecionada])
 
 
 async   function handleMatriculaEstudante(data){ 
   console.log(data)
   const {cursoId,classeId,peridoId,primeiroNome,ultimoNome,nomePai,nomeMae,generoId,dataofbirth,numeroDoDocumento,tipoDeDocumento,pais,provincia,municipio,telefone,email} =data;
   const {nomeEncarregado,sobreNomeEncarregado,telefoneEncarregado,emailEncarregado,nacionalidadeEncarregado,}=data
   const encarregado =  {primeiroNome:nomeEncarregado,ultimoNome:sobreNomeEncarregado,telefoneEncarregado,email:emailEncarregado,nacionalidadeEncarregado}

   const estudante ={cursoId,classeId,peridoId,primeiroNome,ultimoNome,nomePai,nomeMae,generoId,dataofbirth,numeroDoDocumento,tipoDeDocumento,pais,provincia,municipio,telefone,email}
     
   await matriculaEstudante(estudante,encarregado);
   }
   return ( 
       <div className='form-card text-start'>  
       <BoletimDeMatricula handleClose={handleClose} show={showBoletim}/>
         <Form onSubmit={handleSubmit(handleMatriculaEstudante)}>     
               {/**  DADOS DO ESTUDANTE */}      
              <Card>
               <Card.Header>
                  <h3>Dados do estudante</h3>
               </Card.Header>
                <Card.Body>
          
                  <div className="row">
                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="fname">Primeiro nome:</Form.Label>
                        <Form.Control {...register("primeiroNome")} type="text" id="fname" placeholder="Primeiro nome" required />
                        {errors.primeiroNome && <span className='text-warning'>{errors.primeiroNome.message}</span>}
                     </Form.Group>

                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="lname">Sobrenome:</Form.Label>
                        <Form.Control {...register("ultimoNome")} type="text" id="lname" placeholder="Sobrenome" required />
                        {errors.ultimoNome && <span className='text-warning'>{errors.ultimoNome.message}</span>}
                     </Form.Group>
                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="add1">Número do documento:</Form.Label>
                        <Form.Control {...register("numeroDoDocumento")} type="text" id="add1" placeholder="NIF" />
                        {errors.numeroDoDocumento && <span className='text-warning'>{errors.numeroDoDocumento.message}</span>}
                    </Form.Group>

                     <Form.Group className="col-md-6 form-group">
                        <Form.Label>Tipo de documento:</Form.Label>
                        <select {...register("tipoDeDocumento")} className="selectpicker form-control" data-style="py-0" required>
                           <option>Selecione o documento</option>
                           <option>Bilhete</option>
                           <option>Cédula</option>
                           <option >Carta de condução</option>
                           <option>Passaport</option>

                        </select>
                        {errors.tipoDeDocumento && <span className='text-warning'>{errors.tipoDeDocumento.message}</span>}
                     </Form.Group>

                     <Form.Group className="form-group col-md-6">
                        <Form.Label>Gênero:</Form.Label>
                        <select {...register("generoId")} className="selectpicker form-control" data-style="py-0" required>
                           <option>Selecione o genero</option>
                           <option value={1}>Masculino</option>
                           <option valiue={2}>Femenino</option>

                        </select>
                        {errors.generoId && <span className='text-warning'>{errors.generoId.message}</span>}
                     </Form.Group>

                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="cname">Data de nascimento:</Form.Label>
                        <Form.Control {...register("dataofbirth")} type="date" id="cname" placeholder="Data de nascimento" required />
                        {errors.dataofbirth && <span className='text-warning'>{errors.dataofbirth.message}</span>}
                     </Form.Group>
                     <Form.Group className="col-md-4 form-group">
                        <Form.Label>País:</Form.Label>
                        <select {...register("pais")} className="selectpicker form-control" data-style="py-0">
                           <option>Selecione o país</option>
                           <option>Angola</option>
                           <option>Moçambique</option>
                           <option >Cabo Verde</option>
                           <option>Guiné Bissau</option>
                           <option>São Tomé e Princípe</option>
                        </select>
                        {errors.pais && <span className='text-warning'>{errors.pais.message}</span>}
                     </Form.Group>
                     <Form.Group className="col-md-4  form-group">
                        <Form.Label htmlFor="mobno">Província:</Form.Label>
                        <Form.Control {...register("provincia")} type="text" id="mobno" placeholder="Província" required />
                        {errors.provincia && <span className='text-warning'>{errors.provincia.message}</span>}
                     </Form.Group>
                     <Form.Group className="col-md-4  form-group">
                        <Form.Label htmlFor="altconno">Município:</Form.Label>
                        <Form.Control {...register("municipio")} type="text" id="altconno" placeholder="Município" required />
                        {errors.municipio && <span className='text-warning'>{errors.municipio.message}</span>}
                     </Form.Group>
                     {/**Dados do pai e da mae */}

                     <Form.Group className="col-md-6  form-group">
                        <Form.Label htmlFor="nomePai">Nome do pai:</Form.Label>
                        <Form.Control {...register("nomePai")} type="text" id="nomePai" placeholder="Nome do pai" required />
                        {errors.nomePai && <span className='text-warning'>{errors.nomePai.message}</span>}
                     </Form.Group>
                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="nomeMae">Nome da mãe:</Form.Label>
                        <Form.Control {...register("nomeMae")} type="text" id="pno" placeholder="Nome da mãe" required />
                        {errors.nomeMae && <span className='text-warning'>{errors.nomeMae.message}</span>}
                     </Form.Group>
                     {/**Fim dados do pai e da mae */}
                     <Form.Group className="col-md-6  form-group">
                        <Form.Label htmlFor="email">Email:</Form.Label>
                        <Form.Control {...register("email")} type="email" id="email" placeholder="Email" />
                        {errors.email && <span className='text-warning'>{errors.email.message}</span>}
                     </Form.Group>
                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="pno">Telefone:</Form.Label>
                        <Form.Control {...register("telefone")} type="number" id="pno" placeholder="Telefone" required />
                        {errors.telefone && <span className='text-warning'>{errors.telefone.message}</span>}
                     </Form.Group>
                     <Form.Group className="col-md-12 form-group">
                        <Form.Label htmlFor="city">Endereço:</Form.Label>
                        <Form.Control {...register("endereco")} className="py-5" type="text" id="city" placeholder="Endereço" required />
                        {errors.endereco && <span className='text-warning'>{errors.endereco.message}</span>}
                     </Form.Group>
                  </div>
                  <hr />


                 
            
                </Card.Body>    
                 
             </Card>

               {/**  DADOS DO ENCARREGADO */}
             <Card>
                  <Card.Header>
                        <h3>Dados do encarregado</h3>
                  </Card.Header>

                  <Card.Body>
                  <div className="row">
                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="nomeEncarregado">Primeiro nome:</Form.Label>
                        <Form.Control {...register("nomeEncarregado")} type="text" id="nomeEncarregado" placeholder="Primeiro nome"  />
                        {errors.nomeEncarregado && <span className='text-warning'>{errors.nomeEncarregado.message}</span>}
                     </Form.Group>
                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="lnameEncarregado">Sobrenome:</Form.Label>
                        <Form.Control {...register("sobreNomeEncarregado")} type="text" id="lnameEncarregado" placeholder="Sobrenome"  />
                        {errors.sobreNomeEncarregado && <span className='text-warning'>{errors.sobreNomeEncarregado.message}</span>}
                     </Form.Group>
                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="bilheteEncarregado">Bilhete:</Form.Label>
                        <Form.Control {...register("bilheteEncarregado")} type="text" id="bilheteEncarregado" placeholder="NIF" />
                        {errors.bilheteEncarregado && <span className='text-warning'>{errors.bilheteEncarregado.message}</span>}
                     </Form.Group>


                     <Form.Group className="form-group col-md-6">
                        <Form.Label>Gênero:</Form.Label>
                        <select {...register("generoEncarregado")} className="selectpicker form-select" data-style="py-0" >
                           <option>Selecione o genero</option>
                           <option>Masculino</option>
                           <option>Femenino</option>
                        </select>
                        {errors.generoEncarregado && <span className='text-warning'>{errors.generoEncarregado.message}</span>}
                     </Form.Group>

                     <Form.Group className="col-md-12 form-group">
                        <Form.Label>Nacionalidade:</Form.Label>
                        <Form.Control  {...register("nacionalidadeEncarregado")} placeholder='Nacionalidade' />
                        {errors.nacionalidadeEncarregado && <span className='text-warning'>{errors.nacionalidadeEncarregado.message}</span>}
                     </Form.Group>


                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="telefoneEncarregado">Telefone:</Form.Label>
                        <Form.Control  {...register("telefoneEncarregado")} type="text" id="telefoneEncarregado" placeholder="Telefone"  />
                     </Form.Group>
                     <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="emailEncarregado">Email:</Form.Label>
                        <Form.Control  {...register("emailEncarregado")} type="email" id="emailEncarregado" placeholder="Email"  />
                        {errors.emailEncarregado && <span className='text-warning'>{errors.emailEncarregado.message}</span>}
                     </Form.Group>
                  </div>
                  </Card.Body>
             </Card>

               {/**  DADOS DA MATRICULA */}
             <Card>
               <Card.Header>
                     <h3>Dados da matricula</h3>
               </Card.Header>

               <Card.Body>
                 <Row>
                 <Form.Group className="col-md-2 form-group">
                     <Form.Label htmlFor="sala">Classe:</Form.Label>
                     <Form.Select {...register("classeId")}
                     value={classeSelecionada}
                     onChange={e => {setClasseSelecionda(Number(e.target.value))}}
                     >
                        {classes.map((classe)=>(
                           <option key={classe.id} value={Number(classe.id)}>{classe.classe_name}</option>
                        ))}
                     </Form.Select>
                     {errors.classeId && <span className='text-warning'>{errors.classeId.message}</span>}
                  </Form.Group>

                  <Form.Group className="col-md-4 form-group">
                     <Form.Label htmlFor="curso">Curso:</Form.Label>
                     <Form.Select {...register("cursoId")}
                     value={cursoID}
                     onChange={e => {setCursoID(Number(e.target.value))}}
                     >
                        <option>----Selecione o curso ------</option>
                        {curso.map((curso)=>(
                           <option key={curso.id} value={Number(curso.id)}>{curso.nomeCurso}</option>
                        ))}
                     </Form.Select>
                     {errors.cursoId && <span className='text-warning'>{errors.cursoId.message}</span>}
                  </Form.Group>

                  <Form.Group className="col-md-2 form-group">
                     <Form.Label htmlFor="turma">Turma:</Form.Label>
                     <Form.Select {...register("turmaId")}>
                     <option>----Selecione a turma ------</option>
                           {turma.map((t)=>(
                              <option key={t.id} value={Number(t.id)}>{t.nomeTurma}</option>
                           ))}
                     </Form.Select>

                     {errors.periodoId && <span className='text-warning'>{errors.peridoId.message}</span>}
                  </Form.Group>

                  <Form.Group className="col-md-2 form-group">
                     <Form.Label htmlFor="sala">Sala:</Form.Label>
                     <Form.Select {...register("sala")}>
                     <option>----Selecione a sala ------</option>
                           {sala.map((sala)=>(
                              <option key={sala.id} value={Number(sala.id)}>{sala.nomeSala}</option>
                           ))}
                     </Form.Select>

                     {errors.periodoId && <span className='text-warning'>{errors.peridoId.message}</span>}
                  </Form.Group>

                  <Form.Group className="col-md-2 form-group">
                     <Form.Label htmlFor="nomeEncarregado">Periodo:</Form.Label>
                     <Form.Select {...register("peridoId")}>

                     <option>----Selecione o periodo ------</option>
                           {periodo.map((periodo)=>(
                              <option key={periodo.id} value={Number(periodo.id)}>{periodo.nomePeriodo}</option>
                           ))}
                     </Form.Select>

                     {errors.periodoId && <span className='text-warning'>{errors.peridoId.message}</span>}
                  </Form.Group>
                 </Row>
               </Card.Body>
             </Card>

            <Card>
            <Card.Footer className="flex">
                      <Button type="button" role='button' variant="btn btn-primary">Cancelar</Button>
                     <Button type="submit" role="button"  variant="btn btn-primary mx-3"  >Salvar</Button>
                 </Card.Footer>
            </Card>
         </Form>
      </div>
         



   )
}
)

AddEstudante.displayName = "AddEstudante"
export default AddEstudante;