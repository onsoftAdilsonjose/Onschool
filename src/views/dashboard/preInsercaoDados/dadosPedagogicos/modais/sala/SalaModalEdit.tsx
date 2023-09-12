import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form, Col, Row } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError } from "../../../../../../context/AuthContext";
import { useNavigate,useParams } from "react-router-dom";
import { api } from "../../../../../../server/server";


function SalaModalEdit() {

  const {editSala}=useContext(GlobalContext)
  const [nomeSala,setName]=useState('')
  const [created_at,setCreatedAt]=useState()
  const [updated_at,setUpdatedAt]=useState()

  const {id}= useParams()
  const param = Number(id?.replace(":",""))
  const navigate =useNavigate()

  useEffect(()=>{
    async function getSala(){
      const response = await api.get(`/Admin/verUnicoSala/${param}`)
      const {nomeSala,created_at,updated_at} = response.data.Sala;
      setName(nomeSala)
      setCreatedAt(created_at)
      setUpdatedAt(updated_at)
    }

    getSala()
  },[])

  function handleCabecalho(){
    if(nomeSala!=="" && nomeSala!==null){
      editSala({nomeSala,id:param,created_at,updated_at},param)
      navigate("/admin/sala")

    }else{
      notifyError("Nome da sala obrigatorio")
    }

  
  
  }
  return (
    <Row>
        <Col>
        <Card >
      <Card.Header>
        <Card.Title>Editar sala</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Titulo:</Form.Label>
          <Form.Control 
              value={nomeSala}
              onChange={e=>setName(e.target.value)}
              type="text" 
              id="furl"
            />
        </Form.Group>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary">
          Fechar
        </Button>
        <Button variant="primary" onClick={handleCabecalho} className="mx-3">
          Salvar
        </Button>
      </Card.Footer>
    </Card>
        </Col>
    </Row>
  );
}

export default SalaModalEdit;
