import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";
import {useForm,FieldArray, useFieldArray} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Select from 'react-select'
import { TurmaModel } from "../../../../../models/Turma";
import { ICurso } from "../../../../../models/Curso";
import { IDisciplina } from "../../../../../models/Disciplina";
import { IPeriodo } from "../../../../../models/Periodo";
import { ISala } from "../../../../../models/Sala";
import { api } from "../../../../../server/server";

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

const createDisciplinaParaClasseParamSchema = z.object({
  professor_id:z.string(),
  anoLectivo:z.string().optional(),
  disciplinas:z.array(z.object({
    disciplinaId:z.coerce.number().min(1,"Disciplina é obrigatória"),
    classe:z.coerce.number().min(1,"Selecione a classe"),
    turma:z.coerce.number().min(1,"Selecione a classe"),
    periodo:z.coerce.number().min(1,"Selecione a classe"),
    curso:z.string().optional(),
    sala_id:z.coerce.number().min(1,"Adicione a sala")
  })).min(1,"Insira no minímo 1 disciplina")
})

type createClasseParaDisciplina = z.infer<typeof createDisciplinaParaClasseParamSchema >

function ProfessorParaClasseCursoModal({ show, handleClose, handleShow }: cabecalhoProps) {
  const {professor,classes,addProfessorADisciplina}=useContext(GlobalContext)
const [profSelecionado, setProfSelecionado]=useState()
 const [classeId,setClassesId]=useState();
 const [turma,setTurma]=useState<TurmaModel[]>([])
 const [curso,setCurso]=useState<ICurso[]>([])
 const [disciplina,setDisciplina]=useState<IDisciplina[]>([])
 const [periodo,setPeriodo]=useState<IPeriodo[]>([]);
 const [sala,setSala]=useState<ISala[]>([])


 

 /*** RECUPERANDO OS IDS */
 const [turmaID,setTurmaID]=useState(0)
 const [cursoID,setCursoID]=useState(0)
 const [disciplinaID,setDisciplinaID]=useState(0)
 const [periodoID,setPeriodoID]=useState(0);
 const [salaID,setSalaID]=useState(0)


  const [classComCurso,setClasseComCurso]=useState(true)
  const [classeSelecionada, setClasseSelecionda]=useState<number>();


  const {handleSubmit,register,control,formState:{errors}} = useForm<createClasseParaDisciplina>({resolver:zodResolver(createDisciplinaParaClasseParamSchema)})

  const {fields,append,remove}=useFieldArray({control,name:"disciplinas"})

  

  function addNovaDisciplina(){
    append({disciplinaId:0,turma:0,periodo:0,classe:0,sala_id:0})
  }

  function crateDisciplinaParaClasse(data:any){
    console.log(data)
    addProfessorADisciplina(data)
    handleClose()
  }





  function verifyClasse(){
     const classe = classes.find(classe=>classe.id===classeSelecionada);
    const id = classe?.id!
    if(id > 9){
      return false
    }else{
      return true
    }


  }

  useEffect(()=>{
    const state = verifyClasse();
    setClasseComCurso(state);
  },[classeSelecionada])
  



//Sala
useEffect(()=>{
  api.get(`Admin/salaApi/${classeSelecionada}`)
  .then((response)=>{
    setSala(response.data.Sala)
  })
},[classeSelecionada])

//Turma
useEffect(()=>{
  api.get(`Admin/turmaApi/${classeSelecionada}`)
  .then((response)=>{
    setTurma(response.data.Turmas)
  })
},[classeSelecionada])

//perido
useEffect(()=>{
  api.get(`Admin/periodoApi/${classeSelecionada}`)
  .then((response)=>{
    setPeriodo(response.data.periodo)
  })
},[classeSelecionada])


useEffect(()=>{
  api.get(`Admin/cursoApi/${classeSelecionada}`)
  .then((response)=>{
    setCurso(response.data.Cursos)
  })
},[classeSelecionada])


useEffect(()=>{
  console.log(cursoID)
  api.get(`Admin/cursodisciplina/curso/${cursoID}/classe/${classeSelecionada}`)
  .then((response)=>{
    setDisciplina(response.data.Disciplinas)
  })
},[cursoID])

 
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar professor a classe</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(crateDisciplinaParaClasse)}>
          {/**Classe */}

          <Form.Group className="col-md-12 form-group">
              <Form.Label>Professor:</Form.Label>
              <select  className="form-select"
              {...register("professor_id")}               
                value={profSelecionado}
                onChange={e=>setProfSelecionado}>
                  <option>Selecione o professor</option>
                  {professor.map(prof=>(

                    <option value={Number(prof.id)}>{prof.full_name}</option>
                  ))}
              </select>
          </Form.Group>
      

          {/**Disciplina */}         
           
            <div className="flex space-between gap-5 mb-4">            
               <span > Disciplina</span>                     
              <button role="button" type="button" className=" btn  text-primary bold " onClick={()=>addNovaDisciplina()}>Adicionar</button>
            </div>
           
            <Form.Group className="col-md-12 form-group">
              {fields.map((field,index)=>(
                <div key={field.id} className="row mb-3 mt-3 py-2 pb-3 professorParaClasseOprionsDiv">


            <Form.Group className="col-md-2 form-group">
                <Form.Label>Classe:</Form.Label>
                <select
                  {...register(`disciplinas.${index}.classe`)}
                  value={classeSelecionada}
                  onChange={e=>setClasseSelecionda(Number(e.target.value))}
                  className="selectpicker form-control"
                  data-style="py-0"
                  required>                        
          
                  {classes.map((item, index) => (
                    <option key={index} value={Number(item.id)}>{item.classe_name}</option>
                  ))}
                </select>           
                </Form.Group>

                <Form.Group className="col-md-2 form-group" >
                       <Form.Label>Curso:</Form.Label>
                    <select {...register(`disciplinas.${index}.curso`)}
                         value={Number(cursoID)}
                        onChange={e => {setCursoID(Number(e.target.value))}}
                      className="selectpicker form-select" data-style="py-0">
                      <option>Selecione o curso</option>
                      {curso?.map((curso)=>(
                        <option key={curso.id} value={curso.id}>{curso.nomeCurso}</option>
                      ))}   
                    </select>
                  </Form.Group>
                   
                   <Form.Group className="col-md-2 form-group">                   
                   <Form.Label>Disciplina:</Form.Label>
                    <select value={disciplinaID}   {...register(`disciplinas.${index}.disciplinaId`)} 
                    onChange={e => {setDisciplinaID(Number(e.target.value))}}
                    className="selectpicker form-select" data-style="py-0" required >        
                      <option>Selecione a disciplina</option>
                        {disciplina?.map((item, index) => (
                          <option key={index} value={Number(item.id)}>{item.nomeDisciplina}</option>
                        ))}
                    </select>                  
                  </Form.Group>
               

                  

                  <Form.Group className="col-md-2 form-group">
                  <Form.Label>Sala:</Form.Label>
                    <select {...register(`disciplinas.${index}.sala_id`)} 
                      value={salaID}    onChange={e =>{setSalaID(Number(e.target.value))}}
                    className="selectpicker form-select" data-style="py-0" required >
                          {sala?.map((sala)=>(
                            <option key={sala.id} value={sala.id}>{sala.nomeSala}</option>
                          ))}
                    </select>
                  </Form.Group>

                  <Form.Group className="col-md-2 form-group">
                    <Form.Label>Turma:</Form.Label>
                    <select {...register(`disciplinas.${index}.turma`)} className="selectpicker form-select" data-style="py-0" required >
                        {turma?.map((turma)=>(
                          <option key={turma.id} value={turma.id}>{turma.nomeTurma}</option>
                        ))}               
                    </select>                  
                  </Form.Group>

                  <Form.Group className="col-md-2 form-group">
                    <Form.Label>Periodo:</Form.Label>
                    <select {...register(`disciplinas.${index}.periodo`)} className="selectpicker form-select" data-style="py-0" required >
                        {periodo?.map((periodo)=>(
                          <option key={periodo.id} value={periodo.id}>{periodo.nomePeriodo}</option>
                        ))}               
                    </select>
                  </Form.Group>

                 
                </div>
              ))}

              {errors?.disciplinas && <span className="text-danger">{errors.disciplinas.message}</span> }
          </Form.Group> 
   
          <Button type="submit" variant="primary" className="col-md-3 mt-3 mb-3" role="button">
            Salvar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfessorParaClasseCursoModal;
