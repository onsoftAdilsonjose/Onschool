import React, { useContext, useState,useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { api} from "../../../../../server/server";
import { MensalidadeModel } from "../../../../../models/Mensalidade";



interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}


const createMensalidadeScheema = z.object({
  Propina_Anual:z.coerce.number().optional(),
  Classe_id:z.coerce.number().min(1,"Adicione a classe"),
  Curso_id:z.coerce.number().optional(),
  Anolectivo_id:z.coerce.number().optional(),
  ConfirmacaoPreco:z.coerce.number().min(1,"Adicione o valor da confirmação"),
  MatriculaPreco:z.coerce.number().min(1,"Adicone o valor da matricula"),
   Periodo_id:z.coerce.number().min(1,"Periodo obrigatorio"),
  Turma_id:z.coerce.number().optional(),
  Sala_id:z.coerce.number().optional()
})

type mensalidadeType = Omit<MensalidadeModel , 'id'>

function MensalidadePrecoPrecoModal({ show, handleClose, handleShow }: cabecalhoProps) {
  const {classes,createMensalidade,turma,periodo,curso,sala}=useContext(GlobalContext)
  const {handleSubmit,register,formState:{errors}}= useForm<mensalidadeType>({resolver:zodResolver(createMensalidadeScheema)})
  
  const [classeSelecionada, setClasseSelecionada]=useState<number>()


  const[matricula,setMatricula] =useState('')
  const[confirmacao,setConfirmacao]=useState('')
  const [propina,setPropina]=useState('')

  const[anoLectivoActual,setAnoLectivo]=useState('')



useEffect(()=>{
  api.get("Admin/AnolectivoApi")
  .then(response=>{
    setAnoLectivo(response.data.anolectivoActual.ano_lectivo
      )
  })
},[])



  function handleCabecalho() {
    handleClose();
  }

  async function handleCreateMensalidade(data:mensalidadeType){    
    await createMensalidade(data)
  
    setClasseSelecionada(0)
    setConfirmacao("")
    setMatricula("")
  
 

   
  }


  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Mensalidade</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleCreateMensalidade)}>
      <Modal.Body>
    
       

        {/**Classe */}
        <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Classe:</Form.Label>
            <select className="form-select "           
            {...register("Classe_id")}>
              <option className="text-center">======== Selecione a classe   ========</option>
              {classes.map((classe)=>(
                <option key={classe.id} value={Number(classe.id)}>{classe.classe_name}</option>
              ))}
            </select>

            {errors.Classe_id && <span className="text-warning">{errors.Classe_id.message}</span>}
          </Form.Group>

          {/**Curso */}

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Curso:</Form.Label>
              <select {...register("Curso_id")} disabled={curso.length===0?true:false} className="form-select">
              <option className="text-center">======== Selecione o curso   ========</option>
                  {curso.map((curso)=>(
                    <option key={curso.id} value={Number(curso.id)}>{curso.nomeCurso}</option>
                  ))}
              </select>
              {errors.Curso_id && <span className="text-warning">{errors.Curso_id.message}</span>}
          </Form.Group>

           {/**Turma */}
           <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Turma:</Form.Label>                    
             <select {...register("Turma_id")} className="form-select" >
             <option className="text-center">======== Selecione o periodo   ========</option>
              {turma.map((turma)=>(
                <option key={turma.id} value={Number(turma.id)}>{turma.nomeTurma}</option>
              ))}
            </select>
            {errors.Turma_id && <span className="text-warning">{errors.Turma_id.message}</span>}
          </Form.Group>

          {/**Periodo */}
          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Periodo:</Form.Label>                    
             <select {...register("Periodo_id")} className="form-select" >
             <option className="text-center">======== Selecione o periodo   ========</option>
              {periodo.map((periodo)=>(
                <option key={periodo.id} value={Number(periodo.id)}>{periodo.nomePeriodo}</option>
              ))}
            </select>
            {errors.Periodo_id && <span className="text-warning">{errors.Periodo_id.message}</span>}
          </Form.Group>

          

          {/**SALA */}

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">sala:</Form.Label>
                    
            <select {...register("Sala_id")} className="form-select" disabled={sala.length===0?true:false}>
            <option className="text-center">======== Selecione a sala   ========</option>
              {sala.map((sala)=>(
                <option key={sala.id} value={Number(sala.id)}>{sala.nomeSala}</option>
              ))}
            </select>
            {errors.Sala_id && <span className="text-warning">{errors.Sala_id.message}</span>}
          </Form.Group>

            {/** Matricula preco */}
            <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Preço da matrícula:</Form.Label>
            <Form.Control required {...register("MatriculaPreco")}
             value={matricula}
             onChange={e=>{
              setMatricula(e.target.value)
             }}
            />
            {errors.MatriculaPreco && <span className="text-warning">{errors.MatriculaPreco.message}</span>}
          </Form.Group>

          {/** CONFIRMACAO PRECO */}

          <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Preço da confirmação:</Form.Label>
            <Form.Control required {...register("ConfirmacaoPreco")}
             value={confirmacao}
             onChange={e=>{
              setConfirmacao(e.target.value)
             }}
            />
            {errors.ConfirmacaoPreco && <span className="text-warning">{errors.ConfirmacaoPreco.message}</span>}
          </Form.Group>

          {/** Propina anula */}
        <Form.Group className="col-md-12 form-group">
            <Form.Label htmlFor="furl">Propina anual:</Form.Label>
            <Form.Control
             required {...register("Propina_Anual")}
             value={propina}
             onChange={e=>{
              setPropina(e.target.value)
             }}
            />
            {errors.Propina_Anual && <span className="text-warning">{errors.Propina_Anual.message}</span>}
          </Form.Group>


       

       
        {/**ano lectivo */}
        <Form.Group className="form-group">
          <Form.Label htmlFor="furl">Ano lectivo actual:</Form.Label>
          <Form.Control 
              required
              disabled
              type="text" 
              value={anoLectivoActual}
              id="furl"
              placeholder="ano lectivo" />
              
        </Form.Group>
     

        
     
      </Modal.Body>
      <Modal.Footer>
                <button className="btn btn-primary" role="button" type="button">Cancelar</button>
                <button  className="btn btn-primary mx-3" role="button" type="submit">Salvar</button>
      </Modal.Footer>
      </form>
    </Modal>
  );
}

export default MensalidadePrecoPrecoModal;
