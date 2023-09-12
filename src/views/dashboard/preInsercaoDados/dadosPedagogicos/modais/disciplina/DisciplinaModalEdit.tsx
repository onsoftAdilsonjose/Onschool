import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form, Col, Row } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError } from "../../../../../../context/AuthContext";
import { useParams,useNavigate } from "react-router-dom";
import { api } from "../../../../../../server/server";

function DisciplinaModalEdit() {

  const {editDisciplina}=useContext(GlobalContext)
  const [ nomeDisciplina,setName]=useState('')
  const navigate = useNavigate();

  const {id}= useParams()
  const param = Number(id?.replace(":",""))

  useEffect(()=>{
    async function getDisciplina(){
        await api.post(`/verUnicoDisciplina/${param}`)
        .then((response)=>{
          console.log(response.data)
        }).catch((err)=>{
          notifyError("Disciplina inexistente")
        })
    }

    getDisciplina()
  },[])

  function handleCabecalho(){

    if(nomeDisciplina!=="" && nomeDisciplina!==null){
      editDisciplina({nomeDisciplina,id:param},param)
      }else{
      notifyError('Nome da disciplina obrigatório')  
     
    }
    
  }

  
  return (
   <Row>
      <Col>
        <Card>
        <Card.Header>
          <Modal.Title>Adicionar disciplina</Modal.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group className="form-group">
            <Form.Label htmlFor="furl">Titulo:</Form.Label>
            <Form.Control 
                required
                value={nomeDisciplina}
                onChange={e=>setName(e.target.value)}
                type="text" 
                id="nomeDisciplina"
                placeholder="Disciplina" />
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary" onClick={()=>navigate("/admin/disciplina")}>
            Cancelar
          </Button>
          <Button variant="primary mx-3" onClick={handleCabecalho}>
            Salvar
          </Button>
        </Card.Footer>
        </Card>
      </Col>
   </Row>
  );
}

export default DisciplinaModalEdit;
