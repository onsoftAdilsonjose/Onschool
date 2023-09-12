import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError } from "../../../../../../context/AuthContext";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function TurmaModal({ show, handleClose, handleShow }: cabecalhoProps) {

  const {createTurma}=useContext(GlobalContext)
  const [nomeTurma,setName]=useState('')

  function handleCabecalho(){
    if(nomeTurma!=="" && nomeTurma!==null && nomeTurma!==undefined){
      createTurma({nomeTurma})
      handleClose()
    }else{
      notifyError("Preencha corretamente o campo !")
    }
   
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar turma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Titulo:</Form.Label>
          <Form.Control 
              value={nomeTurma}
              onChange={e=>setName(e.target.value)}
              type="text" 
              id="furl"
              placeholder="Turma" />
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

export default TurmaModal;
