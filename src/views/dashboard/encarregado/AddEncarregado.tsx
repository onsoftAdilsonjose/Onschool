import React, { useContext, useState,useEffect} from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form'
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Select from "react-select";
import { parseCookies, setCookie } from "nookies"
import { api } from "../../../server/server";
import { AuthContext } from "../../../context/AuthContext";



interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}



const createEncarregadoSchema = z.object({
  nomeEncarregado:z.string().nonempty("Nome obrigatorio"),
  sobreNomeEncarregado:z.string().nonempty("Sobrenome obrigatorio"),
  telefoneEncarregado:z.string().nonempty("Campo obrigatório").min(9,"Telefone deve tter no minimo 9 digitos").max(12,"Telefone deve tter no maximo 12 digitos"),
  emailEncarregado:z.string().email("email inválido"),
  bilheteEncarregado:z.string().nonempty("Adicione o numero do bilhete"),
  nacionalidadeEncarregado:z.string().optional(),
  generoEncarregado:z.string().optional()
})


type encarregadoDataType= z.infer<typeof createEncarregadoSchema>

interface filhos{
  value:number;
  label:string
}

function CadastroEncarregado({ show, handleClose}: cabecalhoProps) {
  const {setEstudante,estudante, addEncarregado} = useContext(AuthContext)
  const [estudanteId,setEstudanteId]=useState<filhos[]>([])
  const {register,handleSubmit,formState}=useForm<encarregadoDataType>({resolver:zodResolver(createEncarregadoSchema)})
  const {errors} =formState



  function handleCabecalho() {
    handleClose();
  }

  async function handleCreateEncarregado(data:any){
    const primeiroNome = data.nomeEncarregado;
    const ultimoNome = data.sobreNomeEncarregado;
    const email = data.emailEncarregado;
    const telefone = data.telefoneEncarregado;
    const nacionalidade = data.nacionalidadeEncarregado;

  
    const encarregadoData ={
      primeiroNome,
      ultimoNome,
      email,
      telefone,
      nacionalidade,
      estudanteId
    }

    addEncarregado(encarregadoData)
  }


  useEffect(() => {

    const cookies = parseCookies();
      const { "token.Onschool": token } = cookies;

    async function getEstudante() {
      
      await api
        .get("/ProcuararEstudante",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },        
        )
        .then((response) => {
          setEstudante(response.data.EstudanteSelecionado);
        })
        
    }
    getEstudante();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Dados do encarregado</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleCreateEncarregado)}>
      <Modal.Body>      
       <Card>
          <Card.Body>
            <div className="row">
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="nomeEncarregado">
                  Primeiro nome:
                </Form.Label>
                <Form.Control
                  {...register("nomeEncarregado")}
                  type="text"
                  id="nomeEncarregado"
                  placeholder="Primeiro nome"
                />
                {errors.nomeEncarregado && (
                  <span className="text-warning">
                   {errors.nomeEncarregado.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="lnameEncarregado">Sobrenome:</Form.Label>
                <Form.Control
                  {...register("sobreNomeEncarregado")}
                  type="text"
                  id="lnameEncarregado"
                  placeholder="Sobrenome"
                />
                {errors.sobreNomeEncarregado && (
                  <span className="text-warning">
                    {errors.sobreNomeEncarregado.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="bilheteEncarregado">Bilhete:</Form.Label>
                <Form.Control
                  {...register("bilheteEncarregado")}
                  type="text"
                  id="bilheteEncarregado"
                  placeholder="NIF"
                />
                {errors.bilheteEncarregado && (
                  <span className="text-warning">
              
                  </span>
                )}
              </Form.Group>

              <Form.Group className="form-group col-md-6">
                <Form.Label>Gênero:</Form.Label>
                <select
                  {...register("generoEncarregado")}
                  className="selectpicker form-select"
                  data-style="py-0"
                >
                  <option>Selecione o genero</option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
                {errors.generoEncarregado && (
                  <span className="text-warning">
                      {errors.generoEncarregado.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="col-md-12 form-group">
                <Form.Label>Nacionalidade:</Form.Label>
                <Form.Control
                  {...register("nacionalidadeEncarregado")}
                  placeholder="Nacionalidade"
                />
                {errors.nacionalidadeEncarregado && (
                  <span className="text-warning">
                   
                  </span>
                )}
              </Form.Group>

              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="telefoneEncarregado">Telefone:</Form.Label>
                <Form.Control
                  {...register("telefoneEncarregado")}
                  type="text"
                  id="telefoneEncarregado"
                  placeholder="Telefone"
                />
              </Form.Group>
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="emailEncarregado">Email:</Form.Label>
                <Form.Control
                  {...register("emailEncarregado")}
                  type="email"
                  id="emailEncarregado"
                  placeholder="Email"
                />
                {errors.emailEncarregado && (
                  <span className="text-warning">
                 
                  </span>
                )}
              </Form.Group>

              <Form.Group>
              <Form.Label htmlFor="filhos">Filhos:</Form.Label>
              <Select    
                 isMulti
                  isClearable 
                  isSearchable
                  placeholder="Selecione o estudante"
                  options={estudante.map((estudante)=>(
                   {value:estudante.studentID,label:estudante.primeiro_nome+" "+estudante.ultimo_nome}
                  ))}/>                   
                                  
              </Form.Group>
            </div>
          </Card.Body>
        </Card>
    
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button type="submit" variant="primary" role="button">
          Salvar
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CadastroEncarregado;
