import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";


interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function ResumoPagemntoModal({ show, handleClose, handleShow }: cabecalhoProps) {


  function handleCabecalho() {
    handleClose();
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nova informação</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
         {/**Dmoeda */}
         <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Moeda:</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Moeda"
                id="moeda"
            />
          </Form.Group>

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Dia de cobranca da multa:</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Dia 11"
                
            />
          </Form.Group>

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Porcentagem:</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="10%"
         
            />
          </Form.Group>

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Insenção da multa:</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Dia 5"
              
            />
          </Form.Group>
        {/**ano lectivo */}
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Ano lectivo actual:</Form.Label>
          <Form.Control 
              required
              disabled
              type="text" 
              id="furl"
              placeholder="ano lectivo" />
        </Form.Group>

        
     
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button type="submit" variant="primary" onClick={handleCabecalho}>
          Salvar
        </Button>
      </Modal.Footer>
      
    </Modal>
  );
}

export default ResumoPagemntoModal;
