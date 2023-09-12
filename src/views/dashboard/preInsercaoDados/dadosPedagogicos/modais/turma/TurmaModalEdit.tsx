import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form, Col, Row } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError } from "../../../../../../context/AuthContext";
import { useNavigate,useParams } from "react-router-dom";
import { api } from "../../../../../../server/server";


function TurmaModalEdit() {

  const {editTurma}=useContext(GlobalContext)
  const [nomeTurma,setName]=useState('')
  const [created_at,setCreatedAt]=useState("")
  const [updated_at,setUpdatedAt]=useState("")

  const {id}= useParams()
  const param = Number(id?.replace(":",""))
  const navigate = useNavigate();

    useEffect(()=>{
      async function getTurma(){

        await api.get(`Admin/verUnicoTurma/${param}`)
        .then((response)=>{

          const {nomeTurma,created_at,updated_at}=response.data.Turmas          
          setCreatedAt(created_at)
          setUpdatedAt(updated_at)
          setName(nomeTurma)

        }).catch(err=>console.log(err))

      }
      getTurma()
    },[])

  function handleCabecalho(){
    if(nomeTurma!=="" && nomeTurma!==null && nomeTurma!==undefined){
      
      editTurma({nomeTurma,created_at,updated_at,id:param},param)
      navigate("/admin/turma")
      
    }else{
      notifyError("Preencha corretamente o campo !")
    }
   
  }
  return (
    <Row>
        <Col>
            <Card>
              <Card.Header>
                <Card.Title>Adicionar turma</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="furl">Titulo:</Form.Label>
                  <Form.Control 
                      value={nomeTurma}
                      onChange={e=>setName(e.target.value)}
                      type="text" 
                      id="furl"
                      placeholder="Turma" />
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button variant="secondary" >
                  Fechar
                </Button>
                <Button variant="primary" onClick={handleCabecalho}>
                  Salvar
                </Button>
              </Card.Footer>
            </Card>
        </Col>
    </Row>
  );
}

export default TurmaModalEdit;
