import React, { useContext, useState } from "react";
import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { GlobalContext } from "../../../../context/GlobalContext";
import ReactToPrint from 'react-to-print'
import {useNavigate} from "react-router-dom"


interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}



function BoletimDeMatricula({ show, handleClose, handleShow }: cabecalhoProps) {

  const {addAssinatura,boletimRef}=useContext(GlobalContext)
  const [name,setName]=useState('')
  const navigate = useNavigate()
 
  function handleNewAssignaure(){
      addAssinatura(name)
      handleClose()
      setName('')
  }

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
  
      </Modal.Header>
      <Modal.Body ref={boletimRef}>
        <div className="text-center">
          <h3>República de Angola</h3>
          <h3>Ministério da educação</h3>
        </div>

        <div className="text-center mb-3 py-3 divBoletimMatricula">
          <p className="pBoletimMatricula">Boletim de matricula</p>

          <h4 className="text-center py-5">Dados pessoais</h4>
        </div>

        <table className="table table-borderless border">
          <tbody>
            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Data da matricula:
              </td>
              <td className="text-dark fs-5">21-08-2000</td>
            </tr>
            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Nome :
              </td>
              <td className="text-dark fs-5">Maria Alberto Jose</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Naturalidade :
              </td>
              <td className="text-dark fs-5">Luanda</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Municipio :
              </td>
              <td className="text-dark fs-5">Luanda</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Provincia :
              </td>
              <td className="text-dark fs-5">Luanda</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Bairro :
              </td>
              <td className="text-dark fs-5">Luanda</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Data de nascimento :
              </td>
              <td className="text-dark fs-5">21-09-2006</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Tipo de documento :
              </td>
              <td className="text-dark fs-5">Bilhete</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Nº do documento :
              </td>
              <td className="text-dark fs-5">21-09-2006</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Local de emissão :
              </td>
              <td className="text-dark fs-5">Luanda</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Data de emissão:
              </td>
              <td className="text-dark fs-5">21-09-2006</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Validade:
              </td>
              <td className="text-dark fs-5">21-09-2006</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Genêro :
              </td>
              <td className="text-dark fs-5">Luanda</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Estado civil:
              </td>
              <td className="text-dark fs-5">21-09-2006</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Telefone :
              </td>
              <td className="text-dark fs-5">99999999</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Email:
              </td>
              <td className="text-dark fs-5">teste@teste.com</td>
            </tr>
          </tbody>
        </table>

        <h4 className="text-center py-2">Pais/Encarregados</h4>

        <table className="table table-borderless border">
          <tbody>
            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Pai:
              </td>
              <td className="text-dark fs-5">Albero Jose</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Mãe:
              </td>
              <td className="text-dark fs-5">Maria Jose</td>
            </tr>
            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Encarregado principal:
              </td>
              <td className="text-dark fs-5">Maria Alberto Jose</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Contacto:
              </td>
              <td className="text-dark fs-5">99999999</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Outo encarregado :
              </td>
              <td className="text-dark fs-5">Luanda Antonio</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Contacto :
              </td>
              <td className="text-dark fs-5">8888888</td>
            </tr>
          </tbody>
        </table>

        
        <h4 className="text-center py-2">Dados acadêmicos</h4>

        <table className="table table-borderless border">
          <tbody>
            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Anon lectivo:
              </td>
              <td className="text-dark fs-5">201-20222</td>
             </tr>
            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Curso:
              </td>
              <td className="text-dark fs-5">-----</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Classe:
              </td>
              <td className="text-dark fs-5">9ª classe</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Turma :
              </td>
              <td className="text-dark fs-5">A</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Sala:
              </td>
              <td className="text-dark fs-5">8</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Periodo :
              </td>
              <td className="text-dark fs-5">Tarde</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Lingua estrangeira:
              </td>
              <td className="text-dark fs-5">Inglês</td>
            </tr>

            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Nº de processo :
              </td>
              <td className="text-dark fs-5">210625</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Repetente:
              </td>
              <td className="text-dark fs-5">Não</td>
            </tr>


            <tr>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Director de turma :
              </td>
              <td className="text-dark fs-5">Maria Antonio</td>
              <td className="fs-5 text-dark fw-bold" scope="col">
                Contacto:
              </td>
              <td className="text-dark fs-5">999999999</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>

      <Modal.Footer>
        <ReactToPrint
          trigger={() => <Button variant="primary">Imprimir</Button>}
          content={() => boletimRef.current}
          onAfterPrint={() => navigate("/admin/pagamento")}
          documentTitle="Pauta"
          pageStyle="@page { size: auto; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
        />
      </Modal.Footer>
    </Modal>
  );
}

export default BoletimDeMatricula;
