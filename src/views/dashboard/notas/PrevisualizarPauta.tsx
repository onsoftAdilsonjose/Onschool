import React, { useContext, useRef, useState } from "react";
import { Card, Button, Modal, Form, Table } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";
import ReactToPrint from 'react-to-print';
import GlobalContext, { operationHasFailed, operationHasBenSucceded } from "../../../context/GlobalContext";
import { api } from "../../../server/server";


interface cabecalhoProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function PrevisualizarPauta({ show, handleClose}: cabecalhoProps) {
    const componentRef = useRef(null);

    const { estudante } = useContext(AuthContext)
  



    const [listaNotaEstudanteLancamento, setlistaNotaEstudanteLancamento] = useState([])
    const [listaDeEstudantesDeUmaClasseTuramECurso, setlistaDeEstudantesDeUmaClasseTuramECurso] = useState([])
    const [disciplinaParaLancarNota, setDisciplinaParaLancarNota] = useState()

    const [prova, setProva] = useState('');
    const [notaAserLancada, setNotaAserLancada] = useState()


    const [estudanteSelecionado, setEstudanteSelecionado] = useState()
    const [classeId, setClasseId] = useState()
    const [turmaID, setTurmaID] = useState()
    const [cursoID, setCursoId] = useState()
    const [periodoId, setPeridoID] = useState()
    const [anoLectivoId, setAnoLectivoId] = useState()
    const [estudanteId, SetEstudanteId] = useState()
    const [disciplinaID, setDisciplinaId] = useState()

    const pautaGeral = [
        {
            "studante": "Narciso Ribas",
            "disciplina": [
                { "nomeDisciplina": "Lingua Portuguesa", "MT1": 16, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Matematica", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Historia", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Fisica", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Geografia", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "EMC", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "E. LABORAL", "MT1": 9, "MT2": 10, "MT3": 10, "MFD": 10 }
            ]
        },

        {
            "studante": "Oliveira Ribas",
            "disciplina": [
                { "nomeDisciplina": "Lingua Portuguesa", "MT1": 18, "MT2": 19, "MT3": 18, "MFD": 18 },
                { "nomeDisciplina": "Matematica", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Historia", "MT1": 10, "MT2": 8, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Fisica", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Geografia", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "EMC", "MT1": 5, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "E. LABORAL", "MT1": 10, "MT2": 0, "MT3": 10, "MFD": 10 }


            ]
        },

        {
            "studante": "Antonio Joswe",
            "disciplina": [
                { "nomeDisciplina": "Lingua Portuguesa", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Matematica", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Historia", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Fisica", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Geografia", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "EMC", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "E. LABORAL", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 }


            ]
        },
        {
            "studante": "Marlene Afonso",
            "disciplina": [
                { "nomeDisciplina": "Lingua Portuguesa", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Matematica", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Historia", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Fisica", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "Geografia", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "EMC", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 },
                { "nomeDisciplina": "E. LABORAL", "MT1": 10, "MT2": 10, "MT3": 10, "MFD": 10 }


            ]
        },
    ]



    const handleRadioChange = (event) => {
        setProva(event.target.value);
    };


 



   





    function colorNote(nota) {
        if (nota > 9) {
            return "text-primary"
        } else {
            return "text-danger"
        }
    }

 

  function handleCabecalho(){  
    handleClose()

  
  }
  return (

    
    <Modal show={show} onHide={handleClose}  fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Pauta</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={componentRef}>
     
          <Table className="mb-0" id="datatable" data-toggle="data-table">
            <thead>
              <td
                rowSpan={3}
                className="border-l-dark text-center py-5 px-3"
              >
                Nome Completo do estudante{" "}
              </td>
              <tr>
                {pautaGeral && pautaGeral[0].disciplina?.map((data) =>
                 (
                    <td
                      key={data.nomeDisciplina}
                      colSpan={4}
                      className="text-center border-l-dark"
                    >
                      {data.nomeDisciplina}
                    </td>
                  )
                )}
              </tr>
              <tr className="bg-white border-dark notMedias">
                { pautaGeral && pautaGeral[0].disciplina?.map((data) =>                
                    <>
                      <td className="border-l-darkSoft">MT1</td>
                      <td className="border-l-darkSoft">MT2</td>
                      <td className="border-l-darkSoft">MT3</td>
                      <td className="border-l-dark">MFD</td>
                    </>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {pautaGeral.map((notasEstudante) => (
                <tr>
                  <td className="border-l-dark">{notasEstudante.studante}</td>
                  {notasEstudante.disciplina.map((notas) => (
                    <>
                      <td
                        className={`${colorNote(
                          Number(notas.MT1)
                        )} bold border-l-darkSoft`}
                      >
                        {notas.MT1}
                      </td>
                      <td
                        className={`${colorNote(
                          Number(notas.MT2)
                        )} bold border-l-darkSoft`}
                      >
                        {notas.MT2}
                      </td>
                      <td
                        className={`${colorNote(
                          Number(notas.MT3)
                        )} bold border-l-darkSoft`}
                      >
                        {notas.MT3}
                      </td>
                      <td
                        className={`${colorNote(
                          Number(notas.MFD)
                        )} bold border-l-dark`}
                      >
                        {notas.MFD}
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <ReactToPrint
              trigger={() => (
                <Button variant="primary">Imprimir pauta</Button>

              )}
              content={() => componentRef.current}
              documentTitle="Pauta"
              pageStyle="@page { size: auto; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
            />
      </Modal.Footer>
    </Modal>
  );
}

export default PrevisualizarPauta;
