import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../context/GlobalContext";

import ConfirmarEstudante from "./../ConfirmarEstudante"

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
    <Modal show={show} onHide={handleClose} size="xl">
      
      <Modal.Header closeButton>
        <Modal.Title>Confirmação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ConfirmarEstudante/>
      </Modal.Body>
     
    </Modal>
  );
}

export default AssinaturaModal;
