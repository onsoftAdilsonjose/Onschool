import React, { useContext, useState } from "react";
import { Card, Button, Modal, Form, FormSelect } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"





interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}


const formarTurmaScheema = z.object({
  classeId:z.string().min(1,"Adicione a classe"),
  nomeTurma:z.string().nonempty(" selecione a turma"),
  curso:z.coerce.number(),
  salaId:z.coerce.number().min(1,"Adicione a sala"),
  periodo:z.string().nonempty("Adicione o perido"),
  anoLectivoId:z.string().optional()
})

type formarTurmaTypeData = z.infer<typeof formarTurmaScheema>

function FormarTurmaModal({ show, handleClose, handleShow }: cabecalhoProps) {
  const {createTurma,turma,classes,curso } = useContext(GlobalContext);

  const [anoLectivo,setAnoLectivo]=useState("2021/2022")

  const {handleSubmit,register,formState:{errors}}=useForm<formarTurmaTypeData>({resolver:zodResolver(formarTurmaScheema)})

  console.log(errors)
  function handleCabecalho(data:formarTurmaTypeData) {
    createTurma(data);
    //handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Formar nova turma</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
    <form onSubmit={handleSubmit(handleCabecalho)}>
                {/**Turma */}
        <Form.Group className="col-md-12 form-group">
          <Form.Label>Turma:</Form.Label>
          <select
            {...register("nomeTurma")}
            className="selectpicker form-control"
            data-style="py-0"
            required
          >
            <option>Selecione a turma</option>
              {turma.map((item,index)=>(
                <option value={item.id} key={index}>{item.nomeTurma}</option>
              ))}
           
          </select>
          {errors.nomeTurma && <span className="text-warning">{errors.nomeTurma.message}</span>}
        </Form.Group>
      {/**Classe */}
        <Form.Group className="col-md-12 form-group">
          <Form.Label>Classe:</Form.Label>
          <select
            {...register("classeId")}
            aria-required
            className="selectpicker form-control"
            data-style="py-0"
            required
          >
            <option>classe</option>
            {classes.map((item,index)=>(
              <option key={index} value={Number(item.id)}>{item.classe_name}</option>
            ))}
           
          </select>
          {errors.classeId && <span className="text-warning">{errors.classeId.message}</span>}
        </Form.Group>

        {/**Curso */}
        <Form.Group className="col-md-12 form-group">
          <Form.Label>Curso:</Form.Label>
          <select
            {...register("curso")}
            className="selectpicker form-control"
            data-style="py-0"
            required
          >
            <option>Selecione o curso</option>
            {curso.map((item,index)=>(
              <option key={index} value={Number(item.id)}>{item.nomeCurso}</option>
            ))}
           
          </select>
          {errors.curso && <span className="text-warning">{errors.curso.message}</span>}
        </Form.Group>

        <Form.Group className="col-md-12 form-group">
          <Form.Label>Sala:</Form.Label>
          <select
            {...register("salaId")}
            className="selectpicker form-control"
            data-style="py-0"
            required
          >
            <option>Selecione a sala</option>
            <option value={Number(10)}>10</option>
            <option value={Number(12)}>12</option>
           
          </select>
          {errors.salaId && <span className="text-warning">{errors.salaId.message}</span>}
        </Form.Group>

        <Form.Group className="col-md-12 form-group">
          <Form.Label>Periodo:</Form.Label>
          <select
            {...register("periodo")}
            className="selectpicker form-control"
            data-style="py-0"
            required
          >
            <option>Periodo--</option>
            <option>Tarde</option>
            <option>Noite</option>
           
          </select>
          {errors.periodo && <span className="text-warning">{errors.periodo.message}</span>}
        </Form.Group>

        <Form.Group className="col-md-12 form-group">
          <Form.Label>Periodo:</Form.Label>
          <input
            {...register("anoLectivoId")}
            value={anoLectivo}
            className="selectpicker form-control"
            data-style="py-0"
            disabled
          />
         
          {errors.anoLectivoId && <span className="text-warning">{errors.anoLectivoId.message}</span>}
        </Form.Group>

        <Button type="submit" variant="primary" role="button">
          Salvar
        </Button>

        </form>

    
      </Modal.Body>


    </Modal>
  );
}

export default FormarTurmaModal;
