import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function ClasseModal({ show, handleClose, handleShow }: cabecalhoProps) {
  const { createClasse} = useContext(GlobalContext);
  //  id?:number
 
  const [ classe_name, setClasse_name] = useState("");
  const [isChecked,setIsChecked]=useState<Boolean>()
  const [ClassComExam,setClassComExam]=useState(0)

  function handleCabecalho() {

   
    isChecked?setClassComExam(1):setClassComExam(0)
     
    
      createClasse({classe_name, ClassComExam});
      handleClose();
    
    
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Classe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Titulo:</Form.Label>
          <Form.Control
            value={classe_name}
            onChange={(e) => setClasse_name(e.target.value)}
            type="text"
            id="furl"
            placeholder="Classe"
          />
        </Form.Group>

        <div className="checkbox mb-3">
          <Form.Check className="form-check ">
            <Form.Check.Input
              type="checkbox"
              onChange={e=>setIsChecked(e.target.checked)}
              id="flexCheckDefault3"
            />
            <Form.Check.Label htmlFor="flexCheckDefault3">
              Classe de exame
            </Form.Check.Label>
          </Form.Check>
        </div>
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

export default ClasseModal;
