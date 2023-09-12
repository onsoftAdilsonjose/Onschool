import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function AssinaturaModal({ show, handleClose, handleShow }: cabecalhoProps) {

  const {addAssinatura}=useContext(GlobalContext)
  const [name,setName]=useState('')

  function handleNewAssignaure(){
      addAssinatura(name)
      handleClose()
      setName('')
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nova assinatura</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Titulo:</Form.Label>
          <Form.Control type="text" id="furl" placeholder="Assinatura" 
           value={name} onChange={e=>setName(e.target.value)}/>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleNewAssignaure} >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AssinaturaModal;
