import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../../../context/GlobalContext";
import {useForm,FieldArray, useFieldArray} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { api } from "../../../../../server/server";
import Select from "react-select"

interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

const createDisciplinaParaClasseParamSchema = z.object({
  classe:z.coerce.number().min(1,"Classe é obrigatória"),
  curso:z.coerce.number(),
  anoLectivo:z.string().optional(),
  disciplinas:z.array(z.object({
    disciplinaId:z.coerce.number().min(1,"Disciplina é obrigatória"),
    tipo:z.string().nonempty("Selecione o tipo de desciplina")
  })).min(6,"Insira no minímo 6 disciplinas")
})

type createClasseParaDisciplina = z.infer<typeof createDisciplinaParaClasseParamSchema >

function DisciplinaParaClasseModal({ show, handleClose, handleShow }: cabecalhoProps) {
  const {turma,classes,curso,disciplina} = useContext(GlobalContext);
  const [classComCurso,setClasseComCurso]=useState(true)
  const [classeSelecionada, setClasseSelecionda]=useState<number>();


  const {handleSubmit,register,control,formState:{errors}} = useForm<createClasseParaDisciplina>({resolver:zodResolver(createDisciplinaParaClasseParamSchema)})
  const {fields,append,remove}=useFieldArray({control,name:"disciplinas"})


  function addNovaDisciplina(){
    append({disciplinaId:0,tipo:''})
  }

  function crateDisciplinaParaClasse(data:any){
    api.post("Admin/CursoDisciplinaClasse/store",data)
    handleClose();
  }



  function verifyClasse(){
  /*  const classe = classes.find(classe=>classe.id===value)
    const item  = classe?.classe_name.trim().split('').map(classeNumber=>{
      return classeNumber[0]
    })

    if(item[1] !==""){
     const classeSelecionada = Number((item[0]+""+item[1])) 
     if(classeSelecionada > 9){
        return true
     }
    }else{
      const classeSelecionada = Number(item[0])
      if(classeSelecionada > 9){
        return true
       }
    }*/

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
  
 
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar disciplina a classe ou Curso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(crateDisciplinaParaClasse)}>
          {/**Classe */}

         
          <Form.Group className="col-md-12 form-group">
            <Form.Label>Classe:</Form.Label>
            <select
              {...register("classe")}
              value={classeSelecionada}
              onChange={e=>setClasseSelecionda(Number(e.target.value))}
              className="selectpicker form-control"
              data-style="py-0"
              required
        
            >
                     
                     <option>Selecione a Classe</option>
              {classes.map((item, index) => (
                <option key={index} value={Number(item.id)}>{item.classe_name}</option>
              ))}
            </select>
            {errors.classe && <span>{errors.classe.message}</span>}
          </Form.Group>


           {/**Curso */}
           <Form.Group className="col-md-12 form-group" hidden={classComCurso}>
            <Form.Label>Curso:</Form.Label>
            <select
              {...register("curso")}   
                 
              className="selectpicker form-control"
              data-style="py-0"
                >
              
              <option value={0}>Selecione o curso</option>
              {curso.map((item, index) => (
                <option key={index} value={Number(item.id)}>{item.nomeCurso}</option>
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
                <div key={field.id} className="row">
                   <Form.Group className="col-md-6 form-group">
                    <select {...register(`disciplinas.${index}.disciplinaId`)} className="selectpicker form-select" data-style="py-0" required >        
                      <option>Selecione a disciplina</option>
                        {disciplina.map((item, index) => (
                          <option key={index} value={Number(item.id)}>{item.nomeDisciplina}</option>
                        ))}
                    </select>                  
                  </Form.Group>

                  <Form.Group className="col-md-6 form-group">
                    <select {...register(`disciplinas.${index}.tipo`)} className="selectpicker form-select" data-style="py-0" required >
                          <option>Selecione o tipo de disciplina</option>
                          <option>Nuclear</option>
                          <option>Não nuclear</option>
                    </select>
                  </Form.Group>
                </div>
              ))}

              {errors?.disciplinas && <span className="text-danger">{errors.disciplinas.message}</span> }
          </Form.Group>

        

         

          {/**ano lectivo */}
          <Form.Group className="form-group">
            <Form.Label htmlFor="furl">Ano lectivo actual:</Form.Label>
            <input className="form-control"
              {...register("anoLectivo")}
              disabled
              type="text"
              id="furl"
              value={"2022/2023"}
              placeholder="ano lectivo"
            />

            {errors.anoLectivo&& <span>{errors.anoLectivo.message}</span>}
          </Form.Group>

   
          <Button type="submit" variant="primary" className="col-md-3 mt-3 mb-3" role="button">
            Salvar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default DisciplinaParaClasseModal;
