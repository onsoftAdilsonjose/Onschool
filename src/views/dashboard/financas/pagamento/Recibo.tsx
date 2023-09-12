import React, { useContext, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../../../../context/AuthContext';


const Recibo = ({ show, handleClose}) => {
  const {cartItemsMonths, cartItemsServices, totalPagamento, estudanteDetalhes,user,payMant,reciboData}=useContext(AuthContext)
  const componentRef = useRef(null);
  const estudante =estudanteDetalhes?.EstudanteDetalhes
  

function concluir(){
  handleClose()
}
  return (
    <Row>
      <Col sm="12" lg="12" className="body" hidden>
        <Modal  size="xl" show={show} onHide={handleClose}>
        <Modal.Body  ref={componentRef}>

<header className="clearfix header">
     <div id="logo">
       <img src="/logo.png" alt=''/>
     </div>
     <h1>Fatura nº {reciboData?.NumeroFactura}</h1>

     <Row>
       <Col>
         <div>
           <div><span>Cliente: </span>{estudante && estudante.primeiro_nome+" "+estudante.ultimo_nome}</div>
           <div><span>Número de estudante: </span>{estudante && estudante.reg_Numero}</div>
           <div><span>Classe:</span> {estudante && estudante.classe_name} </div>
           <div><span>Curso: </span> {estudante && estudante.nomeCurso}</div>
           <div><span>Ano lectivo: </span> {estudante && estudante.ano_lectivo}</div>
           <div><span>Data de emissão: </span> {new Date().toLocaleDateString()}</div>
         </div>
       </Col>

       <Col>
           <div id="company">
             <div>Onsoft, prestacao de servico</div>
             <div>Av. 21 de Janeiro,<br /> Luanda, Angola</div>
             <div>(+244) 9876654 </div>
             <div><a href="onsoft@onsoft.com" target='blank'>onsoft@onsoft.com</a></div>
           </div>
       </Col>

     </Row>

  
   

 </header>


<main className='mainRecibo py-3'>
 <table className='tableRecibo mt-5' >
   <thead>
     <tr>
       <th className="service">Item</th>
       <th className="desc">Descrição</th>
       <th>Preço</th>
       <th>Desconto</th>
       <th>Qtd</th>
       <th>Total</th>
     </tr>
   </thead>
   <tbody>

     {reciboData?.Meses.map((item)=>(
         <tr key={item.mesID}>
         <td className="service">{item.mesNome}</td>
         <td className="desc">Pagamento de mensalidade</td>
         <td className="unit">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(item.pagamentoMensal))}</td>
         <td className="qty">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(item.desconto))}</td>
         <td className='qty'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(item.qtd))}</td>
         <td className="total">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(item.valorTotal))}</td>
       </tr>
     ))}

     {reciboData?.Services.map((item)=>(
         <tr key={item.id}>
         <td className="service">{item.ServicoNome}</td>
         <td className="desc">Serviços</td>
         <td className="unit">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(item.Preco))}</td>
         <td className="qty">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(item.desconto))}</td>
         <td className='qty'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(item.qtd))}</td>
         <td className="total">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(item.precoAPagar))}</td>
       </tr>
     ))}

  
   
     <tr>
       <td colSpan={5}>SUBTOTAL</td>
       <td className="total">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(reciboData?.subTotal))}</td>
     </tr>
     <tr>
       <td colSpan={5}>Desconto {25+"%"}</td>
       <td className="total">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(reciboData?.subTotal))}</td>
     </tr>
     <tr>
       <td colSpan={5} className="grand total">TOTAL</td>
       <td className="grand total">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'kzs' }).format(Number(reciboData?.total))}</td>
     </tr>
   </tbody>
 </table>
 <div id="notices">
   <div>Informação:</div>
   <div className="notice">Factur emitido por {user?.primeiro_nome+" "+user?.ultimo_nome}.</div>
 </div>
</main>

  
 </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <ReactToPrint
              trigger={() => (
                <Button variant="primary">Imprimir Recibo</Button>

              )}
              content={() => componentRef.current}
              onAfterPrint={concluir}
              documentTitle="Recibo"
              pageStyle="@page { size: auto; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
            />
         
          <Button onClick={handleClose} className='btn btn-primary px-3' variant="primary">Cancelar</Button>
          </Modal.Footer>
        </Modal>


      </Col>
    </Row>
  );
};

export default Recibo;
