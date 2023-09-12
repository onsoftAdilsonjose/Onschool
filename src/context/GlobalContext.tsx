import React, { useContext, useEffect, useState,useRef } from "react";
import { createContext, ReactNode } from "react";
import { CriarTurmaModel, TurmaModel } from "../models/Turma";

import { DisciplinaClasseModel } from "../models/DisciplinaClasse";
import { Pessoa } from "../models/Pessoa";
import { api, errorMessage, statusCode } from "../server/server";

import { ICurso } from "../models/Curso";
import { notifyError, notifySucess } from "./AuthContext";

import { useNavigate } from "react-router-dom";
import { IDisciplina } from "../models/Disciplina";
import { IPeriodo } from "../models/Periodo";
import { ITipoDisciplina } from "../models/TipoDeDisciplina";
import { ISala } from "../models/Sala";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { StringNullableChain } from "lodash";
import { IEncarregadoModel } from "../models/Encarregado";
import { IProfessor } from "../models/Professor";
import { MensalidadeModel, MensalidadeModelList } from "../models/Mensalidade";



interface GlobalContextProps {
  children: ReactNode;
}

interface dataPre {
  name: string;
  createdAt?: string;
  actionadd?: ReactNode;
  actionedit?: ReactNode;
  actionremove?: ReactNode;
}



interface dataAnoLectivo{
  id?:number;
  ano_lectivo:string;
  inicio:string;
  fim:string;
  fimClassComExam:string
}

export interface classData{
  id?:number
  classe_name:string
  ClassComExam:number
}

interface GlobalContextData {
  addProfessorADisciplina:(data:any)=>Promise<void>
  createMensalidade:(data:Omit<MensalidadeModel,'id'>)=>Promise<void>
  mensalidade:MensalidadeModelList[],
  setMensalidade:(data:MensalidadeModelList[])=>void;
  boletimRef:any
   messageNotification:string
   encarregado:IEncarregadoModel[], 
   setEncarregado:(data:IEncarregadoModel[])=>void;
    sala:ISala[]
    tipoDeDisciplina:ITipoDisciplina[]
  
    disciplinaClasse:DisciplinaClasseModel[]

    classes:classData[]

    disciplina:IDisciplina[]

  
    periodo:IPeriodo[]
    assinaturas:dataPre[]
    cabecalho:dataPre[]
    anoLectivo:dataAnoLectivo[]

    /*---------------- CRUD CURSO ------------*/
    curso:ICurso[]
    setCurso:(param:ICurso[])=>void
    editCurso:(data:ICurso,id:number)=>void;
    createCurso:(data:ICurso)=>void;
    deleteCurso(id:number):Promise<void>
     /*---------------- FIM CRUD CURSO ------------*/

    deleteAnoLectivo:(id:number)=>Promise<void>
    EditAnoLectivo:(data:dataAnoLectivo,id:number)=>Promise<void>
 

  /*-------- CRUD SALA ----------*/
    createSala:(data:ISala)=>void;
    editSala:(data:ISala,id:number)=>void;
    deleteSala:(id:number)=>Promise<void>

    /*------ CRUD TIPO DE DISCIPLINA -----*/
    addTipoDeDisciplina:(data:ITipoDisciplina)=>void;
    editTipoDeDisciplina:(data:ITipoDisciplina,id:number)=>void;
    deleteTipoDeDisciplina:(id:number)=>void;

    /*------FIM CRUD TIPO DE DISCIPLINA-----*/

    /*------- PROFESSOR DATA --------------*/
    professor:IProfessor[]
    addProfessor:(data:IProfessor)=>void;

      /*-------FIM PROFESSOR DATA --------------*/

    createPeriodo:(data:IPeriodo)=>void;
    editPeriodo:(data:IPeriodo,id:number)=>void;
    deletePeriodo:(id:number)=>void;

    /*---------- CRUD TURMA -------*/
     turma:TurmaModel[]
     createTurma:(data:TurmaModel)=>void;
     deleteTurma:(id:number)=>Promise<void>
     editTurma:(data:TurmaModel,id:number)=>Promise<void>

     /*---------- FIM CRUD TURMA -------*/

    createDisciplina:(data:IDisciplina)=>void;
    editDisciplina:(data:IDisciplina,id:number)=>Promise<void>
    deleteDisciplina:(id:number)=>Promise<void>

    addCabecalho:(name:string)=>void
    addAssinatura:(name:string)=>void;
    createDisciplinaToClass:(data:DisciplinaClasseModel)=>void;
    
    addAnoLectivo:(params:dataAnoLectivo)=>Promise<void>;

    /*------ CRUD CLASSES ---- */
    editClasse:(data:classData,id:number)=>Promise<void>
    createClasse:(data:classData)=>void;
    deleteClasse:(id:number)=>Promise<void>
    /*----- FIM CRUD CLASSES ---*/
}

//Dados mese a pagar

interface pagamento{
  id?:number;
  descricao:string;
  multa:number;
  preco:number;
  estado?:string;
  totalApagar:number;
  qtd:number;
}


  /**ICONS SVG BUTTON ACTIONS */

 export  const add = (
    <svg
      width="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z"
        fill="currentColor"
      ></path>
      <path
        d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z"
        fill="currentColor"
      ></path>
      <path
        opacity="0.4"
        d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z"
        fill="currentColor"
      ></path>
    </svg>
  );
  
  export const edit = (
    <svg
      width="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z"
        fill="currentColor"
      ></path>
      <path
        d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z"
        fill="currentColor"
      ></path>
      <path
        opacity="0.4"
        d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z"
        fill="currentColor"
      ></path>
    </svg>
  );
  
  export const remove = (
    <svg
      width="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
        fill="currentColor"
      ></path>
      <path
        d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
        fill="currentColor"
      ></path>
    </svg>
  );

export function operationHasBenSucceded(message:string){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}





export function operationHasFailed(message:string){
  Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: message,
  })
}
export const GlobalContext = createContext({} as GlobalContextData) ;

function GlobalContextProvider({ children }: GlobalContextProps) {



    const [assinaturas, setAssinaturas] = useState<dataPre[]>([]);
    const [cabecalho,setCabecalho] =useState<dataPre[]>([]);
    const [curso,setCurso] =useState<ICurso[]>([]);

    const [mensalidade,setMensalidade]=useState<MensalidadeModelList[]>([])

    const [tipoDeDisciplina,setTipoDeDisciplina] =useState<ITipoDisciplina[]>([]);

    const [disciplina,setDisciplina] =useState<IDisciplina[]>([]);

    const [classes, setClasses] = useState<classData[]>([]);

    const [periodo, setPeriodo] = useState<IPeriodo[]>([]);

    const navigate = useNavigate();

    const boletimRef = useRef()
    
    const [sala,setSala] =useState<ISala[]>([]);


    const [disciplinaClasse,setDisciplinaClasse] =useState<DisciplinaClasseModel[]>([])

    const [anoLectivo,setAnoLectivo]=useState<dataAnoLectivo[]>([])
    const [professor,setProfessor] = useState<IProfessor[]>([])

    const [encarregado, setEncarregado]=useState<IEncarregadoModel[]>([])

    /*------* MENSAGEMS DE ERROS OU SUCESSO *------*/
    const [messageNotification,setMessageNoticatios]=useState('')


function createDisciplinaToClass({classe,curso,disciplina,periodo,professor,sala,tipoDisciplina,turma:turmaParaClasse,anoLectivo}:DisciplinaClasseModel){
       const data ={
        classe,curso,disciplina,periodo,professor,sala,tipoDisciplina,turma:turmaParaClasse,anoLectivo,
        actionadd: add,
        actionedit: edit,
        actionremove: remove
       }
  setDisciplinaClasse([...disciplinaClasse,data])
}

//Cabecalho
  function addCabecalho(name:string){
    setCabecalho([...cabecalho,{
        name,
        createdAt:new Date().toString(),
        actionadd: add,
        actionedit: edit,
        actionremove: remove
    }])
  }

  //Assinatura
  function addAssinatura(name:string){
    setAssinaturas([...assinaturas,{
        name,
        createdAt:new Date().toString(),
        actionadd: add,
        actionedit: edit,
        actionremove: remove
    }])
  }

  /******* CRUD ENCARREGADO */




  /********* FIM CRUD ENCARREGADO */


/*------------- CRUD DISCIPLINA PARA CLASSE --------*/

    useEffect(()=>{
      async function getDisciplinaParaClasse(){
        await api.get("Admin/verDisciplinaParaClasse")
        .then((response)=>{
        //  console.log(response.data)
        }).catch((err)=> console.log(err))
      }

      getDisciplinaParaClasse();
    },[])

/*------------- FIM CRUD DISCIPLINA PARA CLASSE ---- */



/*-------- CRUD TURMA -------------------------------*/
const [turma,setTurma] = useState<TurmaModel[]>([])

    useEffect(()=>{
      async function getTurma(){
        api.get("/Admin/verTurma")
        .then((res)=>{
          setTurma(res.data.Turmas)
        }).catch((err)=>console.log(err))
      }

      getTurma()
    },[])



    async function createTurma(data:TurmaModel){
        try {
          const response = await api.post("Admin/storeTurma",data)
        
          if(response.status === 401){
             operationHasBenSucceded(response.data.messagem)
            setTurma([...turma, response.data.turma])
          }
        
         
        } catch (error) {
       
          if(statusCode==422){
            operationHasFailed(error.response.data.errors.nomeTurma)
          }
    
        }
      
    }

    async function editTurma(data:TurmaModel,param:number){

      try {
        const response = await api.post(`Admin/updateTurma/${param}`,data)
        const update = turma.map((item)=>{
          if(item.id===data.id){
            return data;
          }        
          return item;
        })

        setTurma(update)
        notifySucess("Turma editada com sucesso")

      } catch (error) {
        notifyError("Erro ao editar turma")
      }
        
    }

    async function deleteTurma(id:number){
      try {
        const response = await api.delete(`Admin/deleteTurma/${id}`)
        const copyArray = [...turma]
        const index = copyArray.findIndex((i)=>i.id===id);

        if(index >-1){
          copyArray.splice(index,1)
          setTurma(copyArray)
        }

        notifySucess("Turma eliminada com sucesso")
      } catch (error) {
        notifyError("Erro ao eliminar turma!")
      }
    }


/*-------- FIM CRUD TURMA -------------------------------*/
  


   /*------------------- CRUD CURSO --------*/ 

    useEffect(()=>{
        api.get('Admin/verCurso')
        .then((response)=>{
          setCurso(response.data.Cursos)
        })
        .catch(err=>{
          console.log("err"+ err)
        })
    },[])

  async function createCurso(data:ICurso){

    try {
      const response = await api.post('/Admin/storeCurso',data)       
          operationHasBenSucceded("Curso cadastrado com sucesso")
          setCurso([...curso, response.data.curso])
    } catch (error) {
      operationHasFailed("Erro ao cadastrar curso")
    }
     
      
  }

  async function editCurso(data: ICurso, id: number) {
    try {
      const response = await api.post(`Admin/updateCurso/${id}`, data);     
          operationHasBenSucceded('Curso editado com sucesso');
          navigate("/admin/curso")
    } catch (error) {
          operationHasFailed('Erro ao editar curso')
    }
  }
  
  
  async function deleteCurso(id:number){
    try {
      const response = await api.delete(`deleteCurso/${id}`)
      console.log(response.data)
      operationHasBenSucceded('Curso eliminado com sucesso')
    } catch (error) {
      setMessageNoticatios('Erro ao eliminar curso!')
    }
   
  }
 /*------------------ FIM CRUD CURSO --------*/ 
  

  /*---------- CRUD SALA -------------------------*/

  useEffect(()=>{
      async function getSala(){
        await api.get('Admin/verSala')
          .then((res)=>{
            setSala(res.data.Sala)
          }).catch((err)=>{console.log(err)})
      }

      getSala();
  },[])


  async function createSala(data:ISala){
    
      try {
        const response = await api.post("/Admin/storeSala",data)
        setSala([...sala, response.data.sala])
        notifySucess('Sala criada com sucesso!')
      } catch (error) {
        notifyError('Erro ao criar sala')
      }
    
  }

  async function editSala(data:ISala,id:number){
        try {
            const response = await api.post(`Admin/updateSala/${id}`,data)

            const updateElement = sala.map((item)=>{
              if(item.id===data.id){
                return data
              }
              return item;
            })
         
            setSala(updateElement)
           notifySucess('Sala editada com sucesso')
        } catch (error) {
          notifyError('Erro ao editar sala')
        }
  }


  async function deleteSala(id:number) {
    
    try {
        const response = await api.delete(`Admin/deleteSala/${id}`)

        const copyArray = [...sala]
        const index = copyArray.findIndex((i)=>i.id===id)
        if(index>-1){
          copyArray.splice(index,1)
          setSala(copyArray)
        }
        notifySucess("Sala eliminada")
    } catch (error) {
      notifyError('Erro ao eliminar sala')
    }
  }


  /*---------------- CRUD TIPO DE DISCIPLINA --------------*/

  useEffect(()=>{
    api.get("Admin/verTipoDisciplina")
    .then((response)=>{
      setTipoDeDisciplina(response.data.Tipodedesciplina)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  async function addTipoDeDisciplina(data:ITipoDisciplina){
   
      try {
        const index = tipoDeDisciplina.findIndex((index)=>index.TipoNome===data.TipoNome)
        if(index<0){
          const response =  await api.post('Admin/storeTipoDisciplina',data);
          setTipoDeDisciplina([...tipoDeDisciplina,response.data.tipodedesciplina])
          notifySucess("Sucesso ao cadastrar tipo")
        }else{
          notifyError("Tipo ja existente")
        }
         
      } catch (error) {
        notifyError("Erro ao cadastrar tipo")
      }

  }


  async function editTipoDeDisciplina(data:ITipoDisciplina,id:number){

    try {
        const response = await api.post(`Admin/updateTipoDisciplina/${id}`,data)

        const update = tipoDeDisciplina.map((item)=>{
          if(item.id===id){
            return data
          }
          return item
        })

        setTipoDeDisciplina(update)
        notifySucess("Sucesso ao editar elemento")
    } catch (error) {
      notifyError("Erro ao editar elemento")
    }
  }

  async function deleteTipoDeDisciplina(id:number){
    try {

      const response = await api.delete(`Admin/deleteTipoDisciplina/${id}`)
      const arrayCopy = [...tipoDeDisciplina]
      const index = arrayCopy.findIndex((i)=>i.id===id)

      if(index>-1){
        arrayCopy.splice(index,1)
        setTipoDeDisciplina(arrayCopy)
      }

      notifySucess("Elemento eliminado com sucesso")
    } catch (error) {
      notifyError("Erro ao eliminar elemento")
    }
  }


 


/*------------ CRUD DISCIPLINA ------------*/

useEffect(()=>{
  async function getDisciplinas(){
      await api.get("Admin/verDisciplina")
      .then(response=>{
        setDisciplina(response.data.Disciplinas)
      }).catch((err)=>{
        console.log(err+" erro ao listar disciplinas")
      })
  }


  getDisciplinas()
},[])


  async function createDisciplina(data:IDisciplina){
   try {
      const response = await api.post("Admin/storeDisciplina", data)
      setDisciplina([...disciplina,response.data.disciplina]);
      notifySucess("Disciplina criada com sucesso")
   } catch (error) {
    notifyError("Erro ao criar disciplina")
    console.log(error)
   }
  }


  async function editDisciplina(data:IDisciplina,id:number){
    try {
      const response = await api.post(`Admin/updateDisciplina/${id}`,data)

      const updateDisciplina = disciplina.map((disc)=>{
              if(disc.id===data.id){
                return data
              }
              return disc;
            })
       setDisciplina(updateDisciplina)  
       navigate("/admin/disciplina")   
    } catch (error) {
      notifyError('Erro ao editar disciplina')
    }
  }


  async function deleteDisciplina(id:number){

    try {
      const response = await api.delete(`/Admin/deleteDisciplina/${id}`)
      const copyDisciplinas = [...disciplina]
      const index = copyDisciplinas.findIndex((item)=>item.id===id);

      if(index>-1){
        copyDisciplinas.splice(index,1)
        setDisciplina(copyDisciplinas)
      }
      notifySucess("Disciplina eliminada com sucesso")
    } catch (error) {
      notifyError("Erro ao eliminar disciplina")
    }
  }

  /*----------- FIM CRUD DISCIPLINAS --------------------------*/



  /*----------------------------------------------
          CRUD PERIODO
  ----------------------------------------------*/

  useEffect(()=>{
    async function getPeriodo(){
      await api.get("/Admin/verPeriodo")
      .then((response)=>{
        setPeriodo(response.data)
    

        
      }).catch((err)=>{
        console.log("Erro ao listar poeriodo")
      })
    }

    getPeriodo();
  },[])

  async function createPeriodo(data:IPeriodo){

      try {

        const index= periodo.findIndex((item)=>item.nomePeriodo===data.nomePeriodo)

        if(index <0){
          const response = await api.post("Admin/storePeriodo",data)
          setPeriodo([...periodo,response.data.periodo])
          notifySucess("Periodo adiciondado com sucesso")
        }else{
          notifyError("Periodo ja existe")
        }
       
      } catch (error) {
        notifyError("Erro ao cadastrar novo periodo")
      }

  }

  async function editPeriodo(data:IPeriodo,id){
      try {
        const response = await api.post(`Admin/updatePeriodo/${id}`,data)

        const updatePeriodo = periodo.map((item)=>{
          if(item.id===data.id){
            return data;
          }
          return item
        })

        setPeriodo(updatePeriodo)

        notifySucess("Periodo atualizado com sucesso")
      } catch (error) {
        notifyError("Erro ao actualizar periodo")
      }

  }

  async function deletePeriodo(id:number){

      try {
       const response = await api.delete(`Admin/deletePeriodo/${id}`)
       const copyArray =[...periodo]
       const index = copyArray.findIndex(el=>el.id===id)
       
       if(index>-1){
        copyArray.splice(index,1)
        setPeriodo(copyArray)
       }

       notifySucess("Periodo eliminado com sucesso!")
      } catch (error) {
        notifyError("Erro ao eliminar periodo")
      }


  }

  /*----------------------------------------------
         FIM CRUD PERIODO
  ----------------------------------------------*/

  /*----------- CRUD CLASSES ----- */

  useEffect(()=>{
    async function getClasses(){
        await api.get("Admin/verClasse")
        .then((response)=>{
          setClasses(response.data.Classes)

        }).catch((err)=>console.log(err+'Erro ao listar classes'))
    }

    getClasses()
  },[])


  async function createClasse(data:classData){
try {
   const response=   await api.post('Admin/storeClasse',data)
   operationHasBenSucceded('Classe criada com sucesso')      
} catch (error) {
  operationHasFailed('Erro ao criar classe')
}     
    
     
  }



  async function editClasse(data:classData,id:number){
    try {
      const response = await api.post(`Admin/updateClasse/${id}`,data)
      navigate("/admin/classe")
     
      operationHasBenSucceded('Classe editada com sucesso')
            
     } catch (error) {
    operationHasFailed('Erro ao editar classe')
    }
     
  }


  async function deleteClasse(id:number){

   try {
    const response =  await api.delete(`Admin/deleteClasse/${id}`)

    const copyClasseArray = [...classes]
    const index = copyClasseArray.findIndex((c)=>c.id===id)
    copyClasseArray.splice(index,1)    

    setClasses(copyClasseArray)
    operationHasBenSucceded('classe eliminada com sucesso')  
   } catch (error) {
      operationHasFailed('Erro ao deletar classe')
   } 

  }

  /*------   FIM CRUD CLASSES ----------------*/

 
  

/* ------ CRUD ANO LECTIVO --------------------*/

    //listando o ano lectivo
    useEffect(()=>{
      async function getAnoLectivo(){
          await api.get("/Admin/verAnolectivo").then((response)=>{
              setAnoLectivo(response.data.AnoLectivo)
          }).catch((err)=>{console.log(err+" ano lectivo list")})
      }

      getAnoLectivo();
  },[])

 async function addAnoLectivo(data:dataAnoLectivo){
    
   try {

    const response =await api.post("/Admin/storeAnolectivo",data)
    setAnoLectivo([...anoLectivo,data])
    operationHasBenSucceded('Ano lectivo criado com sucesso')

    
   } catch (error) {
    operationHasFailed("Este ano lectivo já esta cadastrado")
    
   }
  
  }


  async function EditAnoLectivo(data:dataAnoLectivo,id:number){
    
    await api.post(`Admin/updateAnolectivo/${id}`,data)
    .then((response)=>{
       operationHasBenSucceded("Ano lectivo actualizado")
 
    }).catch((err)=>{
      operationHasFailed("Erro ao actualizar o ano lectivo")
    })
  }

  async function deleteAnoLectivo(id:number){
    await api.delete(`Admin/deleteAnolectivo/${id}`)
      .then((response)=>{
        const copy = [...anoLectivo]
        const index = copy.findIndex(i=>i.id===id)
        copy.splice(index,1)
        setAnoLectivo(copy)
      }).catch((err)=>{
        operationHasFailed("Erro ao eliminar ano lectivo")
      })
  }

  /*--------- FIM CRUD ANO LECTIVO ---------*/

   /*------------ CRUD PROFESSOR ------------------*/

   useEffect(()=>{
    async function list(){
        await api.get("Admin/listaProfessores")
        .then((response)=>{
          setProfessor(response.data.listaProfessores)
        })
    }

    list()
  },[])


  function addProfessor(data:IProfessor){
    setProfessor([...professor,data]);
}



async function addProfessorADisciplina(data:any){
    try {
        const response = await api.post("Admin/storeDisciplinaParaClasse",data)
        if(response.status===200){
          operationHasBenSucceded("Dados salvo com sucesso")
        }
    } catch (error) {
      operationHasFailed(errorMessage)
    }
}



  /*---------- FIM CRUD PROFESSOR ---------------*/

 /*-----------  CRUD FUNCIONARIO GENERIC -------*/
 useEffect(()=>{
    async function list(){
      await api.get("Admin/listarFuncionarios")
      .then((response)=>{
        console.log(response.data)
      })
    }

    list();
 },[])

 /*----------- FIM CRUD FUNCIONARIO GENERIC -----*/

 /*-------------  CRUD MENSALIDADE ---------------- */
type createMensalidade =Omit<MensalidadeModel,'id'>

useEffect(()=>{
  async function get(){
    api.get("Admin/mensalidades")
    .then((response)=>{
      setMensalidade(response.data.mensalidades)

      console.log(response.data.mensalidades)
    })
  }

  get()
},[])

 async function createMensalidade(data:createMensalidade) {
    try {
        const response = await api.post("Admin/storemensalidades",data)
          if(response.status === 200 || response.status==201){
            operationHasBenSucceded("Mensalidade salva com sucesso!")
          }
      
    } catch (error) {
      operationHasFailed(error.response.message)
    }
 }

 /*-------------  FIM CRUD MENSALIDADE ---------------- */

  return <GlobalContext.Provider value={{
    createMensalidade,
    mensalidade,
    setMensalidade,
    boletimRef,
    encarregado, 
    setEncarregado,
    setCurso,
    turma,
    createTurma,
    deleteTurma,
    editTurma,

    messageNotification,
    editClasse,
    createClasse,
    deleteClasse,
    classes,
    assinaturas,
    addAssinatura,
    cabecalho,
    addCabecalho,
    anoLectivo,
    addAnoLectivo,
    curso,
    createCurso,
    deleteCurso,
    editCurso,

    createDisciplina,
    editDisciplina,
    deleteDisciplina,
    disciplina,
    createPeriodo,
    periodo,
    deletePeriodo,
    editPeriodo,
    addProfessor,
    professor,
    createDisciplinaToClass,
    disciplinaClasse,
    addProfessorADisciplina,
    tipoDeDisciplina,
    addTipoDeDisciplina,
    editTipoDeDisciplina,
    deleteTipoDeDisciplina,
    sala,
    createSala,
    editSala,
    deleteSala,
    EditAnoLectivo,
    deleteAnoLectivo
}}>
  
  
  {children}

</GlobalContext.Provider>;
}

export default GlobalContextProvider;
