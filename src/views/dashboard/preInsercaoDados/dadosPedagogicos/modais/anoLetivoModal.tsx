import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";



interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}


function AnoLetivoModal({ show, handleClose, handleShow }: cabecalhoProps) {

  const {addAnoLectivo}=useContext(GlobalContext)
  const [ano_lectivo,setano_lectivo]=useState('')
  const [inicio,setInicio] = useState('')
  const [fim,setFim] = useState('')
  const [fimClassComExam,setFimClassComExame]=useState('')
 

 

 

  function handleNewAssignaure(){
    
    if(!(ano_lectivo==="" || ano_lectivo===null || inicio=="" || fim===""||fimClassComExam=="")){
      const data ={ano_lectivo,inicio,fim, fimClassComExam}
      addAnoLectivo(data)
      handleClose()
      setano_lectivo('')
      setFim('')
      setInicio('')
    }
     
    
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ano lectivo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Titulo:</Form.Label>
          <Form.Control type="text" id="furl" placeholder="Assinatura" 
           required
           value={ano_lectivo} onChange={e=>setano_lectivo(e.target.value)}/>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Inicio:</Form.Label>
          <Form.Control type="date" id="furl" placeholder="Inicio" 
           required
           value={inicio} onChange={e=>setInicio(e.target.value)}/>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Fim:</Form.Label>
          <Form.Control type="date" id="furl" placeholder="Fim" 
           required
           value={fim} onChange={e=>setFim(e.target.value)}/>
        </Form.Group>

        
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Fim da classe de exame:</Form.Label>
          <Form.Control type="date" id="furl" placeholder="Fim" 
           required
           value={fimClassComExam} onChange={e=>setFimClassComExame(e.target.value)}/>
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

export default AnoLetivoModal;
