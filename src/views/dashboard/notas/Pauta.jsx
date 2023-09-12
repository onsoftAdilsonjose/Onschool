import { memo, Fragment, useContext, useEffect, useState } from 'react'

// React-bootstrap
import { Row, Col, Image, Button, Table, Container, Form } from 'react-bootstrap'

import Select from "react-select";


//Components
import { api } from "./../../../server/server"
import Card from '../../../components/bootstrap/card'
import { AuthContext } from "./../../../context/AuthContext"
import { GlobalContext, operationHasBenSucceded, operationHasFailed } from "./../../../context/GlobalContext"
import PrevisualizarPauta from './PrevisualizarPauta';



const Pautas = memo(() => {
    const { estudante } = useContext(AuthContext)
    const { anoLectivo, periodo, classes, curso, turma } = useContext(GlobalContext)  
    const [classeId, setClasseId] = useState()
    const [turmaID, setTurmaID] = useState()
    const [cursoID, setCursoId] = useState()
    const [periodoId, setPeridoID] = useState()
    const [anoLectivoId, setAnoLectivoId] = useState()

    const [show,setShow] =useState(false);



    function handleClose(){
        setShow(false);
    }
   




  




  



    return (
        <Fragment>
            <PrevisualizarPauta handleClose={handleClose} show={show}/>
            <Col lg="12">
                <Card >
                    <Card.Header>
                        <h3>Lançar Pautas</h3>
                        <Form.Group className="col-md-3 form-group">
                            <Form.Label className='mb-3'>Ano lectivo:</Form.Label>
                            <Select
                                isSearchable
                                isClearable
                                value={anoLectivoId}
                                onChange={setAnoLectivoId}
                                options={anoLectivo.map((ano) => {
                                    return { value: ano.id, label: ano.ano_lectivo }
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
                                        <Select value={classeId} onChange={setClasseId} isSearchable isClearable options={classes.map((classe) => { return { value: classe.id, label: classe.classe_name } })} />
                                    </Form.Group>

                                    <Form.Group className="col-md-3  form-group">
                                        <Form.Label className='mb-3'>Curso:</Form.Label>
                                        <Select value={cursoID} onChange={setCursoId} isSearchable isClearable options={curso.map((curso) => { return { value: curso.id, label: curso.nomeCurso } })} />
                                    </Form.Group>

                                    <Form.Group className="col-md-3 form-group">
                                        <Form.Label className='mb-3'>Turma:</Form.Label>
                                        <Select value={turmaID} onChange={setTurmaID} isSearchable isClearable options={turma.map((turma) => { return { value: turma.id, label: turma.nomeTurma } })} />
                                    </Form.Group>

                                    <Form.Group className="col-md-3 form-group">
                                        <Form.Label className='mb-3'>Perido:</Form.Label>
                                        <Select value={periodoId} onChange={setPeridoID} isSearchable isClearable options={periodo.map((periodo) => { return { value: periodo.id, label: periodo.nomePeriodo } })} />
                                    </Form.Group>
                                </Row>
                                <button onClick={()=>setShow(true)} className='btn btn-primary  mx-3 my-3' role='button' type='button'>Ver</button>
                            </Col>


                        </Row>
                    </Card.Body>
                </Card>

            </Col>
        </Fragment>


       




        
    )
}
)

Pautas.displayName = "Pautas"
export default Pautas