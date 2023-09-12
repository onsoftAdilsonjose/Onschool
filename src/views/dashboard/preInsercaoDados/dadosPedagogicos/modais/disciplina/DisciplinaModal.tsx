import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";
import { notifyError } from "../../../../../../context/AuthContext";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function DisciplinaModal({ show, handleClose, handleShow }: cabecalhoProps) {

  const {createDisciplina}=useContext(GlobalContext)
  const [ nomeDisciplina,setName]=useState('')

  function handleCabecalho(){

    if(nomeDisciplina!=="" && nomeDisciplina!==null){
      createDisciplina({nomeDisciplina})
      handleClose()
    }else{
      notifyError('Nome da disciplina obrigatório')
      const el =document.getElementById("nomeDisciplina")!
      el.focus()
      
    }
    
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar disciplina</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

export default DisciplinaModal;
