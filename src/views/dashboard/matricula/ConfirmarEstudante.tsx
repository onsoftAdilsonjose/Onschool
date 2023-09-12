
import React, { useContext } from 'react'
import { Button, Form } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';

function ConfirmarEstudante() {

  const {setShowStep}=useContext(AuthContext)
  return (
    <div>
      
      <div className="form-card text-start">
        
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Nome completo: *</label>
              <input
                type="text"
                className="form-control"
                name="fname"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Número de estudante: *</label>
              <input
                type="text"
                className="form-control"
                name="lname"
                placeholder="Número de estudante"
              />
            </div>
          </div>

          <Form.Group className="form-group col-md-6">
            <Form.Label>Curso:</Form.Label>
            <select
              name="type"
              className="selectpicker form-control"
              data-style="py-0"
              required
            >
              <option>Selecione o curso</option>
              <option>Informática</option>
              <option>Enfermagem</option>
            </select>
          </Form.Group>

          <Form.Group className="form-group col-md-6">
            <Form.Label>Classe:</Form.Label>
            <select
              name="type"
              className="selectpicker form-control"
              data-style="py-0"
              required
            >
              <option>Selecione a classe</option>
              <option>1º</option>
              <option>2º</option>
              <option>3º</option>
              <option>4º</option>
              <option>5º</option>
              <option>6º</option>
              <option>7º</option>
              <option>8º</option>
              <option>9º</option>
              <option>10º</option>
              
            </select>
          </Form.Group>

          <Form.Group className="form-group col-md-6">
            <Form.Label>Período:</Form.Label>
            <select
              name="type"
              className="selectpicker form-control"
              data-style="py-0"
              required
            >
              <option>Selecione o período</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
            </select>
          </Form.Group>

          <Form.Group className="form-group col-md-6">
            <Form.Label>Sala:</Form.Label>
            <select
              name="type"
              className="selectpicker form-control"
              data-style="py-0"
              required
            >
              <option>Selecione a sala</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </Form.Group>


          <Form.Group className="form-group col-md-6">
            <Form.Label>Turma:</Form.Label>
            <select
              name="type"
              className="selectpicker form-control"
              data-style="py-0"
              required
            >
              <option>Selecione a turma</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </Form.Group>


          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Ano lectivo actual: *</label>
              <input
                type="text"
                className="form-control"
                name="phno_2"
                placeholder="Ano lecivo ."
              />
            </div>
          </div>
        </div>

        <Button type="button" name="next" className="action-button float-end">Confirmar</Button>
        <Button type="button" name="previous" className="btn  previous action-button-previous float-end me-1">Cancelar</Button>
      </div>
    </div>
  );
}

export default ConfirmarEstudante
