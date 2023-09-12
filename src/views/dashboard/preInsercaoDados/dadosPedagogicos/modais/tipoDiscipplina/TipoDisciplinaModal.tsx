import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError } from "../../../../../../context/AuthContext";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function TipoDisciplinaModal({ show, handleClose, handleShow }: cabecalhoProps) {

  const {addTipoDeDisciplina}=useContext(GlobalContext)
  const [TipoNome,setName]=useState('')

  function handleCabecalho(){
    if(TipoNome==="" || TipoNome===null){
      notifyError("Digite  tipo de disciplina")
    }else{
      addTipoDeDisciplina({TipoNome})
       handleClose()
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
              value={TipoNome}
              onChange={e=>setName(e.target.value)}
              type="text" 
              id="furl"
              />
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

export default TipoDisciplinaModal;
