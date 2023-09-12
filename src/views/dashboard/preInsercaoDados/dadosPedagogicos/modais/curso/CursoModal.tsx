import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError, notifySucess } from "../../../../../../context/AuthContext";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function CursoModal({ show, handleClose}: cabecalhoProps) {

  const {createCurso,messageNotification}=useContext(GlobalContext)
  const [nomeCurso,setName]=useState('')

  function handleCabecalho(){
   try {
    createCurso({nomeCurso})
    handleClose()
    //notifySucess(messageNotification)
   } catch (error) {
    notifyError(messageNotification)
   }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Curso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Titulo:</Form.Label>
          <Form.Control 
              value={nomeCurso}
              onChange={e=>setName(e.target.value)}
              type="text" 
              id="furl"
              placeholder="Curso" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleCabecalho}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CursoModal;
