import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";


interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function ServicoModal({ show, handleClose, handleShow }: cabecalhoProps) {


  function handleCabecalho() {
    handleClose();
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar rota</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>

         <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Nome:</Form.Label>
            <Form.Control
                required
           
            />
          </Form.Group>

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Preço:</Form.Label>
            <Form.Control
                required
                type="text"
          
                
            />
          </Form.Group>

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Quantidade:</Form.Label>
            <Form.Control
                required
                type="text"
              
         
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

export default ServicoModal;
