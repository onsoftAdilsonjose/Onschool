import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";


interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function InsencaoDeMensalidadeModal({ show, handleClose, handleShow }: cabecalhoProps) {


  function handleCabecalho() {
    handleClose();
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar rota</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
         {/**Dmoeda */}
         <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Mês:</Form.Label>
            <Form.Control
                required
                placeholder="Janeiro"
                disabled
            />
          </Form.Group>

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Anular pagamento:</Form.Label>
            <Form.Select
                required
              >
                <option>Activar pagamento</option>
                <option>Anular pagamento</option>

            </Form.Select>
          </Form.Group>

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Alterar desconto:</Form.Label>
            <Form.Control
                required
                type="text"
            />
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

export default InsencaoDeMensalidadeModal;
