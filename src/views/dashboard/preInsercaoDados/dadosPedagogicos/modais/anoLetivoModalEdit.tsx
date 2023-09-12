import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form, Col, Row } from "react-bootstrap";
import { GlobalContext, operationHasFailed } from "../../../../../context/GlobalContext";
import {toast } from 'react-toastify';

import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../../../../server/server";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}


function AnoLetivoModalEdit() {

  const {EditAnoLectivo}=useContext(GlobalContext)
  
  const [ano_lectivo,setano_lectivo]=useState('')
  const [inicio,setInicio] = useState('')
  const [fim,setFim] = useState('')
  const [fimClassComExam,setFimClassComExame]=useState('')

  const navigate = useNavigate()
  const {id}= useParams()
  const param = Number(id?.replace(":",""))

//Busca um ano lectivo
 useEffect(()=>{
  async function getAnoLectivo(){
    await api.get(`Admin/verUnicoAnolectivo/`+param)
    .then((response)=>{
      const{ano_lectivo,fim,fimClassComExam,id,inicio}=response.data.anoLectivo
      setano_lectivo(ano_lectivo)
      setInicio(inicio)
      setFim(fim)
      setFimClassComExame(fimClassComExam)
    }).catch((err)=>console.log(err))
  }

  getAnoLectivo()
 },[])



  function handleNewAssignaure(){
    
    if(!(ano_lectivo==="" || ano_lectivo===null || inicio=="" || fim===""||fimClassComExam=="")){
      const data ={ano_lectivo,inicio,fim, fimClassComExam}   
        EditAnoLectivo(data,param)
        navigate("/admin/anoLetivo")    
     
    }else{
        operationHasFailed("Preencha os campos em branco 😉")
    }
     
    
  }

  return (
    <Row>
        <Col lg='12'>

            <Card>
                <Card.Header>
                  <Card.Title>Ano lectivo</Card.Title>
                </Card.Header>  
                 
                <Card.Body>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="furl">Titulo:</Form.Label>
                    <Form.Control type="text" id="furl" placeholder="Assinatura" 
                    required
                    value={ano_lectivo} onChange={e=>setano_lectivo(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label htmlFor="furl">Inicio:</Form.Label>
                    <Form.Control type="date" id="furl" placeholder="Inicio" 
                    required
                    value={inicio} onChange={e=>setInicio(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label htmlFor="furl">Fim:</Form.Label>
                    <Form.Control type="date" id="furl" placeholder="Fim" 
                    required
                    value={fim} onChange={e=>setFim(e.target.value)}/>
                  </Form.Group>

                  
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="furl">Fim da classe de exame:</Form.Label>
                    <Form.Control type="date" id="furl" placeholder="Fim" 
                    required
                    value={fimClassComExam} onChange={e=>setFimClassComExame(e.target.value)}/>
                  </Form.Group>
                </Card.Body>
                <Card.Footer>
                  
                  <Button variant="primary" onClick={handleNewAssignaure} >
                    Salvar
                  </Button>
                </Card.Footer>
            </Card>

                
        </Col>
    </Row>
  );
}

export default AnoLetivoModalEdit;
