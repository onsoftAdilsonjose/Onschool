import { memo, Fragment, useContext, useEffect, useState } from 'react'

// React-bootstrap
import { Row, Col, Image, Button, Table, Container, Form } from 'react-bootstrap'

import Select from "react-select";


//Components
import {api} from "./../../../server/server"
import Card from '../../../components/bootstrap/card'
import {AuthContext} from "./../../../context/AuthContext"
import {GlobalContext, operationHasBenSucceded, operationHasFailed} from "./../../../context/GlobalContext"



const Notas = memo(() => {
   const {estudante}=useContext(AuthContext)
   const {anoLectivo,periodo,classes,curso,turma}=useContext(GlobalContext)

   

   const [listaNotaEstudanteLancamento,setlistaNotaEstudanteLancamento]=useState([])
   const [listaDeEstudantesDeUmaClasseTuramECurso, setlistaDeEstudantesDeUmaClasseTuramECurso] =useState([])
    const [disciplinaParaLancarNota,setDisciplinaParaLancarNota]=useState()

    const [prova, setProva] = useState('');
    const [notaAserLancada,setNotaAserLancada]=useState()

 
  const [estudanteSelecionado,setEstudanteSelecionado] =useState()
   const [classeId,setClasseId]=useState()
   const [turmaID,setTurmaID]=useState()
   const [cursoID,setCursoId]=useState()
   const [periodoId,setPeridoID]=useState()
   const [anoLectivoId,setAnoLectivoId]=useState()
   const [estudanteId,SetEstudanteId]=useState()
   const[disciplinaID,setDisciplinaId]=useState()

   const handleRadioChange = (event) => {
    setProva(event.target.value);
  };


   async function getListaDeEstundateDeUmaClasseTurmaECurso(){  
    
            const id1 = anoLectivoId?.value
            const id2 = turmaID?.value
            const id3 = periodoId?.value
            const id4 = cursoID?.value
            const id5 = classeId?.value    
       try {
            const response = await api.get(`/Admin/VerNotasEstudante/anolectivoID/${id1}/turmaID/${id2}/periodoID/${id3}/cursoID/${id4}/classeID/${id5}`)
            
            if(response.data.VerNotasEstudante.length===0){
                operationHasFailed("Nenhuma turma encontrada")
            }else{
                setlistaDeEstudantesDeUmaClasseTuramECurso(response.data.VerNotasEstudante)
              
            }
        } catch (error) {         
            operationHasFailed("Nenhuma turma encontrada")
        }


   }



   async function getEstudanteNotaData(id){
    const estudante = listaDeEstudantesDeUmaClasseTuramECurso.find((estudante)=>estudante.studentID === id)
    const {classeID,ano_lectivoID,studentID,full_name} =estudante
    SetEstudanteId(studentID);

    try {
       
        const response = await api.get(`Admin/VerNotas/Classe/${classeID}/Anolectivo/${ano_lectivoID}/Estudante/${studentID}`)
  

        if(response.data.Disciplina.length !==0){
            setlistaNotaEstudanteLancamento(response.data.Disciplina)
            setEstudanteSelecionado(full_name)
        }else{
            operationHasFailed("Informação não encontrada")
        }

      
    } catch (error) {
        operationHasFailed("Erro ao ver as notas do estudante "+full_name)
    }
    
   }


   function getDisciplinaToChangeNote(id){
        const item = listaNotaEstudanteLancamento.find((i)=>i.disciplinaID === id)
       setDisciplinaParaLancarNota(item)
       setDisciplinaId(id)
   }
   

   //funcao para adicionar a nota do estudante

   //esta e acionda clicando no botao
   async function lancarNota(){

  
    const ano_lectivoID = anoLectivoId?.value
    const classeID = classeId?.value 

        const data ={
            anolectivoID:ano_lectivoID,
            studentID:estudanteId,
            classeID:classeID,
            disciplinaID:disciplinaID,
            nota:notaAserLancada,
            prova:prova
        }
        try {
            const response = await api.post("/Admin/storeNotas",data)
             const {disciplinaID}= response.data.Notas
             const copy = [...listaNotaEstudanteLancamento]
             const index = copy.findIndex(id=>id.disciplinaID ===disciplinaID)
             copy[index] = response.data.Notas
             setlistaNotaEstudanteLancamento(copy)
             setNotaAserLancada("")
             operationHasBenSucceded("nota lançada com sucesso!")
          } catch (error) {

            operationHasFailed(Number(notaAserLancada) >20?" A nota deve estar no intervalo de 0 - 20":"erro ao lançar nota ")
        }
   }


//esta e acionado apertando a tecla enter
   const handlePostNewNote =(e)=>{
    //calcSaldo(Number(valor))
   
    var key = e?.keyCode;
    if (key == 13) { // codigo da tecla enter
        lancarNota()
        setNotaAserLancada("")
    
    }
  }

//funcao para calcular a media
  const media = (nota1,nota2,nota3)=>{
        const media =(Number(nota1)+  Number(nota2)+ Number(nota3))/3
        return Math.round(media) ===null?0:Math.round(media) 
  }


   function colorNote(nota){
    if(nota > 9){
        return "text-primary"
    }else{
        return "text-danger"
    }
   }


 
  
    return (
        <>
         <Fragment>
            <Container>
                <Row>
                    <Col lg="12">
                        <Card >
                            <Card.Header>
                                <h3>Lançar notas</h3>
                                <Form.Group className="col-md-3 form-group">
                                        <Form.Label className='mb-3'>Ano lectivo:</Form.Label>
                                        <Select
                                        isSearchable
                                        isClearable 
                                        value={anoLectivoId}
                                        onChange={setAnoLectivoId}
                                        options={anoLectivo.map((ano)=>{
                                            return {value:ano.id, label:ano.ano_lectivo}
                                        })}
                                        />
                                    </Form.Group>
                            </Card.Header>

                           <Card.Body>
                            
                            <Row>
                                

                                {/**Selecionar curso,classe,turma, ano lectivo */}
                                <Col lg="12">
                                    <Row>
                                    
                                    <Form.Group className="col-md-3 form-group">
                                        <Form.Label className='mb-3'>Classe:</Form.Label>
                                        <Select value={classeId} onChange={setClasseId} isSearchable isClearable options={classes.map((classe)=>{return {value:classe.id, label:classe.classe_name}})}/>
                                    </Form.Group>

                                    <Form.Group className="col-md-3  form-group">
                                        <Form.Label className='mb-3'>Curso:</Form.Label>
                                        <Select value={cursoID} onChange={setCursoId} isSearchable isClearable options={curso.map((curso)=>{return {value:curso.id, label:curso.nomeCurso}})}/>
                                    </Form.Group>    

                                      <Form.Group className="col-md-3 form-group">
                                        <Form.Label className='mb-3'>Turma:</Form.Label>
                                        <Select value={turmaID} onChange={setTurmaID} isSearchable isClearable options={turma.map((turma)=>{return {value:turma.id, label:turma.nomeTurma}})}/>
                                    </Form.Group>                              

                                    <Form.Group className="col-md-3 form-group">
                                        <Form.Label className='mb-3'>Perido:</Form.Label>
                                        <Select value={periodoId} onChange={setPeridoID} isSearchable isClearable options={periodo.map((periodo)=>{return{value:periodo.id,label:periodo.nomePeriodo}})}/>
                                    </Form.Group>                                
                                    </Row>
                                    <button onClick={getListaDeEstundateDeUmaClasseTurmaECurso} className='btn btn-primary col-2 mx-3 my-3 px-3 py-3' role='button' type='button'>Buscar</button>
                                </Col>

                                
                            </Row>
                           </Card.Body>
                        </Card>
                       
                    </Col>
                </Row>
            </Container>
        </Fragment>

        
        <Fragment>
            <Container>
                <Row>
                    <Col lg="4">
                   
                            <Card >
                                <Card.Header>
                                    <h3>Lista de estudantes</h3>
                                </Card.Header>
                                <Card.Body>
                                    <div className="notaAlturaDoCardsEstudanteNotas notaAlturaDoCardsEstudanteNotas custom-table-effect table-responsive border rounded mt-3">
                                        <Table className="mb-0" id="datatable" data-toggle="data-table">
                                            <thead>
                                                <tr className="bg-white">
                                                    <th scope="col">Número</th>
                                                    <th scope="col">Nome completo</th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {listaDeEstudantesDeUmaClasseTuramECurso.map((estudante,index)=>(
                                                    <tr key={estudante.studentID} onClick={()=>getEstudanteNotaData(estudante.studentID)}>
                                                        <td className="bold tex-dark">
                                                            {estudante.reg_Numero}          
                                                        </td>           
                                                        <td className="text-dark">{estudante.full_name}</td>
                                                    </tr> 
                                                ))}
                                            
                                                
                                                        
                                                        
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        
                    </Col>

                 
                    <Col lg="8" >
                      
                            <Card >
                                <Card.Header>
                                    <p>Estudante selecionadao: <strong>{estudanteSelecionado}</strong></p>
                                </Card.Header>
                                <Card.Body>
                                    <div className= "custom-table-effect table-responsive border rounded mt-3">
                                        <Table className="mb-0" id="datatable" data-toggle="data-table">
                                            <thead>
                                                <tr className="bg-primary text-white">
                                                    <th scope="col">Disciplina</th>
                                                    <th scope="col">Mac1</th>
                                                    <th scope="col">NPP1</th>
                                                    <th scope="col">NPT1</th>
                                                    <th scope="col">MT1</th>
                                                    <th scope="col">Mac2</th>
                                                    <th scope="col">NPP2</th>
                                                    <th scope="col">NPT2</th>
                                                    <th scope="col">MT2</th>
                                                    <th scope="col">Mac3</th>
                                                    <th scope="col">NPP3</th>
                                                    <th scope="col">NP3</th>
                                                    <th scope="col">MT3</th>                                         
                                    </tr>
                                            </thead>
                                            <tbody>

                                                {listaNotaEstudanteLancamento.map((disciplinas,index)=>(
                                                    <tr key={disciplinas.disciplinaID} onClick={()=>getDisciplinaToChangeNote(disciplinas.disciplinaID      )}>
                                                        <td className="text-white bg-primary">{disciplinas.nomeDisciplina}</td>
                                                        <td className={`${colorNote(Number(disciplinas.Mac1))} bold`}>{disciplinas.Mac1===null?0:disciplinas.Mac1}</td> 
                                                        <td className={`${colorNote(Number(disciplinas.Npp1))} bold`}>{disciplinas.Npp1===null?0:disciplinas.Npp1}</td> 
                                                        <td className={`${colorNote(Number(disciplinas.Npt1))} bold`}>{disciplinas.Npt1===null?0:disciplinas.Npt1}</td> 
                                                        <td className={`${colorNote(media(disciplinas.Npt1,disciplinas.Npp1,disciplinas.Mac1))} bg-warning bold`}>{media(disciplinas.Npt1,disciplinas.Npp1,disciplinas.Mac1)}</td> 
                                                        <td className={`${colorNote(Number(disciplinas.Mac2))} bold`}>{disciplinas.Mac2===null?0:disciplinas.Mac2}</td> 
                                                        <td className={`${colorNote(Number(disciplinas.Npp2))} bold`}>{disciplinas.Npp2===null?0:disciplinas.Npp2}</td> 
                                                        <td className={`${colorNote(Number(disciplinas.Npt2))} bold`}>{disciplinas.Npt2===null?0:disciplinas.Npt2}</td> 
                                                        <td className={`${colorNote(media(disciplinas.Npt2,disciplinas.Npp2,disciplinas.Mac2))} bg-warning bold`}>{media(disciplinas.Npt2,disciplinas.Npp2,disciplinas.Mac2)}</td> 
                                                        <td className={`${colorNote(Number(disciplinas.Mac3))} bold`}>{disciplinas.Mac3===null?0:disciplinas.Mac3}</td> 
                                                        <td className={`${colorNote(Number(disciplinas.Npp3))} bold`}>{disciplinas.Npp3===null?0:disciplinas.Npp3}</td>                                                
                                                        <td className={`${colorNote(Number(disciplinas.Npt3))} bold`}>{disciplinas.Npt3===null?0:disciplinas.Npt3}</td> 
                                                        <td className={`${colorNote(media(disciplinas.Npt3,disciplinas.Npp3,disciplinas.Mac3))} bg-warning bold`}>{media(disciplinas.Npt3,disciplinas.Npp3,disciplinas.Mac3)}</td> 
                                                    </tr>
                                                ))}
                                                    
                                                                                        
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                     
                    </Col>
                </Row>
            </Container>
        </Fragment>


        <Fragment>
            <Container>
                <Row>
                    <Col lg="12">
                        <Card >
                            <Card.Header>
                                <h3>Lançar nota de: <strong> {estudanteSelecionado}</strong></h3>
                            </Card.Header>

                           <Card.Body>

                            <Row className='mb-3'>
                            <Col lg="12">
                                    <Form.Group className='form-group flexMy'>
                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"Mac1"} className="me-2" type="radio" name="tipoProvaEpoca" id="buscarPorNomeDoEstudante" />
                                                <Form.Check.Label htmlFor="buscarPorNomeDoEstudante">
                                                    MAC1
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"Npp1"} className="me-2" type="radio" name="tipoProvaEpoca" id="buscarPorNumeroDeEstudante" defaultChecked />
                                                <Form.Check.Label htmlFor="buscarPorNumeroDeEstudante">
                                                NPP1
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"Npt1"} className="me-2" type="radio" name="tipoProvaEpoca" id="buscarPorNumeroDeEstudante" defaultChecked />
                                                <Form.Check.Label htmlFor="buscarPorNumeroDeEstudante">
                                                NPT1
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"Mac2"} className="me-2" type="radio" name="tipoProvaEpoca" id="buscarPorNomeDoEstudante" />
                                                <Form.Check.Label htmlFor="buscarPorNomeDoEstudante">
                                                    MAC2
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input  onChange={e=>handleRadioChange(e)} value={"Npp2"} className="me-2" type="radio" name="tipoProvaEpoca" id="buscarPorNumeroDeEstudante" defaultChecked />
                                                <Form.Check.Label htmlFor="buscarPorNumeroDeEstudante">
                                                NPP2
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"Npt2"} className="me-2" type="radio" name="tipoProvaEpoca" id="buscarPorNumeroDeEstudante" defaultChecked />
                                                <Form.Check.Label htmlFor="buscarPorNumeroDeEstudante">
                                                NPT2
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"Mac3"} className="me-2" type="radio" name="flexRadioDefault" id="buscarPorNomeDoEstudante" />
                                                <Form.Check.Label htmlFor="buscarPorNomeDoEstudante">
                                                    MAC3
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"Npp3"} className="me-2" type="radio" name="tipoProvaEpoca" id="buscarPorNumeroDeEstudante" defaultChecked />
                                                <Form.Check.Label htmlFor="buscarPorNumeroDeEstudante">
                                                NPP3
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"Npt3"} className="me-2" type="radio" name="tipoProvaEpoca" id="buscarPorNumeroDeEstudante" defaultChecked />
                                                <Form.Check.Label htmlFor="buscarPorNumeroDeEstudante">
                                                NPT3
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"exame"} className="me-2" type="radio" name="tipoProvaEpoca" id="exame" />
                                                <Form.Check.Label htmlFor="exame">
                                                    Exame
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"recuperacao"} className="me-2" type="radio" name="tipoProvaEpoca" id="recDisciplinaAtrasoRadio" defaultChecked />
                                                <Form.Check.Label htmlFor="recDisciplinaAtrasoRadio">
                                                Rec/disc. em atraso
                                                </Form.Check.Label>
                                            </Form.Check>

                                            <Form.Check>
                                                <Form.Check.Input onChange={e=>handleRadioChange(e)} value={"melhoria de nota"} className="me-2" type="radio" name="tipoProvaEpoca" id="melhoriaNotaRadio" defaultChecked />
                                                <Form.Check.Label htmlFor="melhoriaNotaRadio">
                                                Melhoria de nota
                                                </Form.Check.Label>
                                            </Form.Check>
                                    </Form.Group>

                                    
                            </Col>


                            </Row>

                            <Row>
                                  {/**Selecionar prova, epoca , data de recurso, disciplina e adicionar nota */}
                                 <Col lg="12">
                                    <Row>
                                    <Form.Group className="col-md-3 form-group">
                                        <Form.Label className='mb-3'>Prova:</Form.Label>
                                        <input type="text" className='form-control' disabled value={prova}/>
                                    </Form.Group>

                                    <Form.Group className="col-md-3 form-group">
                                        <Form.Label className='mb-3'>Disciplina:</Form.Label>
                                        <input type='text' className='form-control' value={disciplinaParaLancarNota?.nomeDisciplina} disabled/>
                                    </Form.Group>
                                    <Form.Group className="col-md-3 form-group">
                                        <Form.Label className='mb-3'>Nota:</Form.Label>
                                        <input  onKeyUp={handlePostNewNote} type="text" placeholder='nota' className='form-control' value={notaAserLancada} onChange={e=>setNotaAserLancada(e.target.value)} />
                                       
                                    </Form.Group>

                                    <Form.Group className="col-md-3 form-group py-2">                                        
                                          <button className='btn btn-primary mt-5' onClick={()=>lancarNota()}>Lançar nota</button>
                                    </Form.Group>

                                    
                                 
                                        
        
                                    </Row>
                                        
                                    <div className='d-flex gap-2 mt-3'>
                                    <Button type="submit" variant="btn btn-primary">Pautas e minipautas</Button>
                                        <Button type="submit" variant="btn btn-primary">Permitir melhoria de notas</Button>
                                    </div>
                                </Col>

                            </Row>
                           </Card.Body>
                        </Card>
                       
                    </Col>
                </Row>
            </Container>
        </Fragment>

        </>
    )
}
)

Notas.displayName = "Notas"
export default Notas