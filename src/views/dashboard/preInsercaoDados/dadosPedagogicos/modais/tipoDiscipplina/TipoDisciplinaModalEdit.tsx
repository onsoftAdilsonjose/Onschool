import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form, Col, Row } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError } from "../../../../../../context/AuthContext";
import { useParams,useNavigate } from "react-router-dom";
import { api } from "../../../../../../server/server";



function TipoDisciplinaModalEdit() {

  const {editTipoDeDisciplina}=useContext(GlobalContext)
  const [TipoNome,setName]=useState('')

  const {id}= useParams()
  const param = Number(id?.replace(":",""))
  const navigate = useNavigate();

  useEffect(()=>{
    api.get(`Admin/verUnicoTipoDisciplina/${param}`)
    .then(response=>{
      setName(response.data.Tipodedesciplina['TipoNome'])
    }).catch((err)=>{
      notifyError("Tipo inexistente")
    })
  },[])

  function handleCabecalho(){
    if(TipoNome==="" || TipoNome===null){
      notifyError("Digite  tipo de disciplina")
    }else{
      editTipoDeDisciplina({TipoNome,id:param},param)
      navigate("/admin/tipoDisciplina")
  
    }
    
  }
  return (
    <Row>
        <Col>

        <Card >
          <Card.Header>
            <Modal.Title>Adicionar Curso</Modal.Title>
          </Card.Header>
          <Card.Body>
            <Form.Group className="form-group">
              <Form.Label htmlFor="furl">Titulo:</Form.Label>
              <Form.Control 
                  value={TipoNome}
                  onChange={e=>setName(e.target.value)}
                  type="text" 
                  id="furl"
                  />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary" >
              Fechar
            </Button>
            <Button variant="primary" className="mx-3" onClick={handleCabecalho}>
              Salvar
            </Button>
          </Card.Footer>
        </Card>

        </Col>
    </Row>
  );
}

export default TipoDisciplinaModalEdit;
