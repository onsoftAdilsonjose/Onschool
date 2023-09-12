import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form, Col, Row } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError } from "../../../../../../context/AuthContext";
import { useParams,useNavigate } from "react-router-dom";
import { api } from "../../../../../../server/server";



function PeriodoModalEdit() {

  const {editPeriodo}=useContext(GlobalContext)
  const [nomePeriodo,setName]=useState('')


  const {id}= useParams()
 const param = Number(id?.replace(":",""))

 useEffect(()=>{
    async function getPeriodo(){
      await api.get(`Admin/verUnicoPeriodo/${param}`)
      .then((response)=>{
        setName(response.data['nomePeriodo'])
      }).catch((err)=>{
        notifyError("Periodo inexistente!")
      })
    }
    getPeriodo();
 },[])

  const navigate = useNavigate()

  function handlePeriodo(){
   if(nomePeriodo==="" || nomePeriodo===null){
      notifyError("Nome do periodo obrigatorio")
   }else{
    editPeriodo({nomePeriodo,id:param},param)  
    navigate("/admin/periodo")
   }
  }
  return (
  <Row>
      <Col>
          <Card >
        <Card.Header>
          <Modal.Title>Editar período</Modal.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group className="form-group">
            <Form.Label htmlFor="furl">Titulo:</Form.Label>
            <Form.Control 
                value={nomePeriodo}
                onChange={e=>setName(e.target.value)}
                type="text" 
                id="furl"
                placeholder="Período" />
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary">
            Fechar
          </Button>
          <Button variant="primary" onClick={handlePeriodo} className="mx-3">
            Salvar
          </Button>
        </Card.Footer>
         </Card>
      </Col>
  </Row>
  );
}

export default PeriodoModalEdit;
