import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { GlobalContext, operationHasFailed } from "../../../../../../context/GlobalContext";
import { notifyError, notifySucess } from "../../../../../../context/AuthContext";
import { api } from "../../../../../../server/server";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function CursoModalEdit() {

  const {editCurso}=useContext(GlobalContext)
  const [nomeCurso,setName]=useState('')
  const {id}= useParams()
  const param = Number(id?.replace(":",""))

  useEffect(()=>{
    async function getCurso(){
      await api.get(`/Admin/verUnicoCurso/${param}`)
      .then((response)=>{
        setName(response.data.Curso['nomeCurso'])
      }).catch(err=>{
        operationHasFailed('Nenhum curso encontrado!')
      })
    }

    getCurso()
  },[])

  function handleEditCurso(){
    const data={nomeCurso}
    const id = param
   try {
    editCurso(data,id)
   
    //notifySucess(messageNotification)
   } catch (error) {
    notifyError("Erro inesperado")
   }
  }
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header >
            <Card.Title>Editar Curso</Card.Title>
          </Card.Header>

          <Card.Body>
            <Form.Group className="form-group">
              <Form.Label htmlFor="furl">Titulo:</Form.Label>
              <Form.Control 
                  value={nomeCurso}
                  onChange={e=>setName(e.target.value)}
                  type="text" 
                  id="furl"
                  placeholder="Curso" />
            </Form.Group>
          </Card.Body>

          <Card.Footer>
            <Button variant="secondary" >
              Cancelar
            </Button>
            <Button variant="primary mx-3" onClick={handleEditCurso}>
              Salvar
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default CursoModalEdit;
