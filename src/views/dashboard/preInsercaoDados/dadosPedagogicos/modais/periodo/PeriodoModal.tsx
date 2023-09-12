import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError } from "../../../../../../context/AuthContext";

import { useNavigate } from "react-router-dom";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function PeriodoModal({ show, handleClose, handleShow }: cabecalhoProps) {

  const {createPeriodo}=useContext(GlobalContext)
  const [nomePeriodo,setName]=useState('')

  const navigate = useNavigate()

  function handlePeriodo(){
   if(nomePeriodo==="" || nomePeriodo===null){
      notifyError("Nome do periodo obrigatorio")
   }else{
    createPeriodo({nomePeriodo})
    setName('')
    handleClose()
    navigate("/admin/periodo")
    
   }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar novo período</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Titulo:</Form.Label>
          <Form.Control 
              value={nomePeriodo}
              onChange={e=>setName(e.target.value)}
              type="text" 
              id="furl"
              placeholder="Período" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handlePeriodo}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PeriodoModal;
