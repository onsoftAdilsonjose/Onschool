
import React, { useEffect } from 'react'
import  {useContext, useState} from "react";
import { Card, Col, Form, Row, Table } from "react-bootstrap";
import Recibo from "./Recibo";
import { AuthContext, confirmOperation, notifyError } from "../../../../context/AuthContext";
import Proforma from './ProForma';



function FormPagamento() {

  const {
    totalPagamento,
    cartItemsMonths,
    cartItemsServices,
    addMetodoPagamentoEscolhido,
    metodoPagamento,
    contaBancaria,
    estudanteDetalhes,
    saldo,
    calcSaldo,
    atualizarTela,
    setAtualizarTela,
    payMant

  } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [showProforma, setShowProforma] = useState(false);
  const [Tipodepagamento, setTipoMetodoPagamento] = useState();
  const [contaPorMetodo, setContaPorMetodo] = useState();
  const [valoresPorMetodo, setValoresPorMetodo] = useState();
  const [saldoExistente,setSaldoExistente]=useState(0)
  const [pagarComSaldo,setPagarComSaldo]=useState(false)


useEffect(()=>{
  setSaldoExistente(estudanteDetalhes && estudanteDetalhes.EstudanteSaldo)
},[estudanteDetalhes])
 
  const errors = [];


  function handleShow() {
    setShow(true);
  }



  function handleClose() {
    setShow(false);
  }

  function handleCloseProforma() {
    setShowProforma(false);
  }

  
const handelProforma=()=>{
  setShowProforma(true);
}

async function handleConcluir(){

const ok = await confirmOperation("Concluir pagamento")

if(ok){



  if(!pagarComSaldo){

    if((Tipodepagamento ==="" || Tipodepagamento===undefined || Tipodepagamento === null)){
      errors.push("Adicione metodo de pagamento")
    }
  
  
  
   }
  
    const findMetodoPagamento = metodoPagamento?.find(i=>i.id === Number(Tipodepagamento))
  
    if(findMetodoPagamento?.Tipodepagamento!=="Dinheiro" && !pagarComSaldo ){
      if((contaPorMetodo ==="" || contaPorMetodo === undefined)){
        errors.push("Adicione uma conta de pagamento")
      }
    }
  
   
  
    if(!pagarComSaldo){
      if((valoresPorMetodo ==="" || valoresPorMetodo===undefined)&& Tipodepagamento!=="Saldo"){
        errors.push("Adicione o valor que o cliente entregou, a quantia entregue!")
      }
    }
  
    if(pagarComSaldo && (valoresPorMetodo !=="" || valoresPorMetodo!==undefined || valoresPorMetodo !==null)){
        
      if(valoresPorMetodo < totalPagamento){
        if(saldoExistente >= totalPagamento || (saldoExistente+valoresPorMetodo)<= totalPagamento){
          errors.push("Valor insuficiente, o somatório do saldo e o  do valor entregue não cobrem a divida")
        }
      }
    
    }
  
    if(pagarComSaldo &&  (valoresPorMetodo ==="" || valoresPorMetodo===undefined || valoresPorMetodo ===null)){
      if(saldoExistente < totalPagamento){
        errors.push("Saldo insuficiente")
      }
    }
  
    if(!pagarComSaldo){
        if(valoresPorMetodo === undefined || valoresPorMetodo=== null || valoresPorMetodo===''){
          errors.push("A quantia a pagar é obrigatória!")
        }
    }
  
    if(!pagarComSaldo){
      if(valoresPorMetodo < totalPagamento){
        errors.push("A quantia entregue deve ser maior ou igual ao valor total de pagamento")
      }
    }
  
    
    
    errors.forEach((err)=>{
      notifyError(err)
    })
  
    if(errors.length===0){
  
      if(pagarComSaldo){
        const saldoEstudante = estudanteDetalhes?.EstudanteSaldo
  
        if(saldoEstudante >= totalPagamento){
  
          const data ={id:Number(Tipodepagamento),contaID:Number(contaPorMetodo),
            value:Number(valoresPorMetodo), pagamentoPorsaldo:pagarComSaldo, valorSaldo:saldoEstudante}
          addMetodoPagamentoEscolhido(data)
          handleShow()
  
        }else if(((saldoEstudante+valoresPorMetodo)>=totalPagamento) && !(valoresPorMetodo ==="" || valoresPorMetodo===undefined)){
          const data ={id:Number(Tipodepagamento),contaID:Number(contaPorMetodo),
            value:Number(valoresPorMetodo), pagamentoPorsaldo:pagarComSaldo, valorSaldo:saldoEstudante}
          addMetodoPagamentoEscolhido(data)
          payMant()
          handleShow()
        }else{
          errors.push("Saldo insuficiente")
        }
  
      }else{
        const data ={id:Number(Tipodepagamento),contaID:Number(contaPorMetodo),value:Number(valoresPorMetodo)}
        addMetodoPagamentoEscolhido(data,pagarComSaldo)
        payMant()
        handleShow()
      }
     
    }
  




}
  
  


 
}

const isDisable = cartItemsMonths.length === 0 && cartItemsServices.length === 0;

const valor= document.getElementById("valorPorMetodo");
const handleCalcNewSaldo =(e)=>{
  //calcSaldo(Number(valor))
 
  var key = e?.keyCode;
  if (key == 13) { // codigo da tecla enter
   setValoresPorMetodo(Number(valor.value))
    calcSaldo(Number(valor.value))
  }
}

 
useEffect(()=>{
  if(atualizarTela){
    setTipoMetodoPagamento(null)
    setContaPorMetodo(null)
    setValoresPorMetodo(null)
    setSaldoExistente(0)
    setValoresPorMetodo(0)
    setAtualizarTela(false)
  }
},[atualizarTela])




  return (
    <>
    <Recibo handleClose={handleClose} show={show} />
    <Proforma handleClose={handleCloseProforma} show={showProforma} />
    <Card>
      
      <Card.Body>
            <Form className="form-horizontal hide-on-print">
              <Form.Group as={Row} className="form-group">
                <Form.Label
                  column
                  sm="3"
                  className="control-label align-self-center mb-0"
                  htmlFor="email"
                >
                  Metódo de pagamento:
                </Form.Label>
                <Col sm="9">
                  <select disabled={isDisable} className='form-select' value={Tipodepagamento} onChange={e=>setTipoMetodoPagamento(e.target.value)}>
                  <option>------Selecione o metodo de pagametno ----</option>
                  {metodoPagamento?.map((metodo) => (
                    <option key={metodo.id} value={metodo.id}>{metodo.Tipodepagamento}</option>
                  ))}
                  </select>
                </Col>
              </Form.Group>

               <Form.Group as={Row} className="form-group">                                          
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0"
                    
                        >
                          Conta bancária:
                        </Form.Label>
                        <Col sm="9">
                          <select 
                           
                          className="form-select" value={contaPorMetodo} onChange={e=>setContaPorMetodo(e.target.value)}>
                            <option value="">
                              ----- Selecione a conta ---
                            </option>
                            {contaBancaria.map((conta) => (
                              <option value={conta.id} key={conta.id}>
                                {conta.IBAN+ "   " + conta.BANCO}
                              </option>
                            ))}
                          </select>
                        </Col>
                      
               </Form.Group>

                          
              <Form.Group as={Row} className="form-group">
                <Form.Label
                  column
                  sm="3"
                  className="control-label align-self-center mb-0"
                  htmlFor="desconto"
                >
                  Adicionar quantia:
                </Form.Label>
                <Col sm="9">
                <input
                  id="valorPorMetodo"
                  disabled={Tipodepagamento === "" || Tipodepagamento === undefined ? true : false}
                  value={valoresPorMetodo}
                  onChange={(e) => setValoresPorMetodo(e.target.value)} // Atualiza o estado quando o valor muda
                  onKeyUp={handleCalcNewSaldo}
                  type="text"
                  placeholder="kzs"
                  className="form-control"
                />

                </Col>
              </Form.Group>

              <Form.Group as={Row} className="form-group">
                <Form.Label
                  column
                  sm="3"
                  className="control-label align-self-center mb-0"
                  htmlFor="valorEntregue"
                >
                  Saldo:
                </Form.Label>
                <Col sm="9">
                  <input
                    type="text"
                    value={new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "kzs",
                    }).format(Number(saldo))}
                    disabled
                    className="form-control"
                    id="valorEntregue"
                  />
                </Col>
              </Form.Group> 

              <Form.Group as={Row} className="form-group">
                <Form.Label
                  column
                  sm="3"
                  className="control-label align-self-center mb-0"
                  htmlFor="valorEntregue"
                >
                  Saldo existente:
                </Form.Label>
                <Col sm="5">
                  <input
                    type="text"
                    value={new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "kzs",
                    }).format(Number(estudanteDetalhes?.EstudanteSaldo?estudanteDetalhes?.EstudanteSaldo:0))}
                    disabled
                    className="form-control"
                    id="saldo"
                  />
                </Col>

                <Col sm="4">
                <Form.Group className="mt-2 mb-5 form-group  center d-flex">
                <Form.Check className="form-check">
                  <Form.Check.Input  value={pagarComSaldo} onChange={e=>setPagarComSaldo(e.target.checked)} disabled={estudanteDetalhes && Number(estudanteDetalhes?.EstudanteSaldo)===0} type="checkbox" id="customEsquecerDivida" />
                  <Form.Check.Label htmlFor="customEsquecerDivida" >
                    Pagar com saldo
                  </Form.Check.Label>
                </Form.Check>                
              </Form.Group>
                </Col>
              </Form.Group>            

              <Form.Group as={Row} className="form-group">
                <Form.Label
              
                  column
                  sm="3"
                  className="control-label align-self-center mb-0"
                  htmlFor="valorEntregue"
                >
                  
                </Form.Label>
              
              </Form.Group>            
            </Form>
          </Card.Body>

          <Card.Footer >
        
            <h1 className="mb-3 col-12">
              Total a pagar:
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "kzs",
              }).format(Number(totalPagamento))}
            </h1>

            <button className="btn btn-primary col-4"  disabled={isDisable} onClick={handleConcluir}>
              Concluir
            </button>

            <button className="btn btn-primary col-3 mx-2" onClick={handelProforma}>
              Pró-forma
            </button>
       

            <button
              disabled={isDisable}
              className="btn btn-primary col-4 mx-2"
              
            >
              Cancelar
            </button>
           
          </Card.Footer>

    </Card>
    </>
  )
}

export default FormPagamento
