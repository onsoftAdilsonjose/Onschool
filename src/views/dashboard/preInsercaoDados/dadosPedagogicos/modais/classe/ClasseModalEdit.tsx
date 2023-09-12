import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { GlobalContext } from "../../../../../../context/GlobalContext";

import { useParams } from "react-router-dom";
import { notifyError, notifySucess } from "../../../../../../context/AuthContext";
import { api } from "../../../../../../server/server";



function ClasseModalEdit() {
  const {editClasse} = useContext(GlobalContext);
  //  id?:number

  const [ classe_name, setClasse_name] = useState("");
  const [isChecked,setIsChecked]=useState<Boolean>()
  const [ClassComExam,setClassComExam]=useState(0)

  const {id}= useParams()
  const param = Number(id?.replace(":",""))

  useEffect(()=>{

    async function getClasse(){

      try {
        const response = await api.get(`Admin/verUnicoClasse/${param}`)
       const { classe_name,ClassComExam} = response.data.Classes

       setClasse_name(classe_name)

       if(ClassComExam===0){
        setIsChecked(true)
       }else{
        setIsChecked(false)
       }
        
      } catch (error) {
        notifyError("Error ao listar a classe")
      }
    }

    getClasse();

  },[])

  function handleEditClasse() {
   
   if(isChecked){
    if(classe_name!==''){
      editClasse({classe_name, ClassComExam,id:param},param);
      setClassComExam(1)
    }else{
      notifyError('Nome da classe e obrigatório')
    }
  
   }else{
    editClasse({classe_name, ClassComExam,id:param},param);
    setClassComExam(0)
  
   }
  
  }
  return (
  <Row>
    <Col>
      <Card>
        
        <Card.Header>
          <Card.Title>Editar Classe</Card.Title>
        </Card.Header>
        <Card.Body>
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
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={handleEditClasse}>
            Salvar
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  </Row>
  );
}

export default ClasseModalEdit;
