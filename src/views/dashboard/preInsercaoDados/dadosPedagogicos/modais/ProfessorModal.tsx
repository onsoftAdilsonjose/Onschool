import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";
import AddProfessor from "../../../professor/AddProfessor";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function ProfessorModal({ show, handleClose, handleShow }: cabecalhoProps) {

  const {addTurma}=useContext(GlobalContext)
  const [name,setName]=useState('')

  function handleCabecalho(){
    addTurma(name)
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose} size="xl" >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Professor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddProfessor/>
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

export default ProfessorModal;
