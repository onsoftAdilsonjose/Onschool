import { memo, Fragment, useState,useContext} from "react";

// React-bootstrap
import { Row, Col, Image, Button, Table, Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

//Components

import MensalidadePrecoModal from "../modais/MensalidadePrecoModal";
import Card from "../../../../../components/bootstrap/card";
import { GlobalContext, edit, remove } from "../../../../../context/GlobalContext";




const MensalidadePreco= memo(() => {
  const [show, setShow] = useState(false);
  const {mensalidade}=useContext(GlobalContext)
  const [filterText, setFilterText] = useState("")

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredItems = mensalidade?.filter(
    (item) =>
      item.classe_name.toLowerCase().includes(filterText.toLowerCase())||
      item.nomeCurso.toLowerCase().includes(filterText.toLowerCase())
    
      
  );
  
  const formatClassComExam = (value) => {
    return value === 1 ? "Sim" : "Não";
  };
  
 
  
  const columns = [
    {
      name: "Classe",
      selector: "classe_name",
      sortable: true,
    },
    {
      name: "Curso",
      selector: "nomeCurso",
      sortable: true,
      
    },
    ,
    {
      name: "Periodo",
      selector: "nomePeriodo",
      sortable: true,
      
    }
    ,
    {
      name: "Propina anual",
      selector: "Propina_Anual",
      cell:(row)=>(
        <td>{new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "kzs",
        }).format(Number(row.Propina_Anual))}</td>
      )
      
    },
    {
      name: "Preço da matricula",
      cell:(row)=>(
        <td>{new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "kzs",
        }).format(Number(row.MatriculaPreco))}</td>
      )
      
    }
    ,
    {
      name: "Preço confirmação",
      selector: "ConfirmacaoPreco",
      cell:(row)=>(
        <td>{new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "kzs",
        }).format(Number(row.ConfirmacaoPreco))}</td>
      ),
      sortable: true,
      
    },
    {
      name: "Ano lectivo",
      selector: "ano_lectivo",
      sortable: true,
      
    }
    ,
    {
      name: "Ação",
      cell: (row) => (
        <div className="d-flex">        
          <Link
            to={`/admin/classe/edit:${row.id}`}
            className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
            role="button"
          >
            <span className="btn-inner">{edit}</span>
          </Link>
          <Button onClick={()=>handleDeleteClasse(row.id)} className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"  role="button">
            <span className="btn-inner">{remove}</span>
          </Button>
        </div>
      ),
    },
  ];
  
  const paginationOptions = {
    rowsPerPageText: 'Linhas por página:',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };



  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };



 
  return (
    <Fragment>
      <MensalidadePrecoModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
      <Container>
        <Row>
          <Col lg="12">
            <Card>
              <Card.Body>
                <Button
                  onClick={handleShow}
                  variant="primary"
                  className="btn btn-primary mt-2 me-1 me-1 mb-3"
                >
                  + Novo
                </Button>
                <div className="custom-table-effect table-responsive border rounded mt-3">
                  <Row>
                      <Col lg="4">
                      <input
                        className="form-control col-3 mt-3 mx-3"
                          type="text"
                          placeholder="Filtrar por nome ou data"
                          value={filterText}
                          onChange={handleFilterChange}
                        />
                      </Col>
                  </Row>
              
                    <DataTable
                      columns={columns}
                      data={filteredItems}
                      pagination
                      paginationComponentOptions={paginationOptions}
                      striped
                      highlightOnHover
                      pointerOnHover
                      noHeader
                      paginationPerPage={10}
                      paginationRowsPerPageOptions={[10, 20, 30]}
                      paginationServer={false}
                      paginationTotalRows={mensalidade.length}
                    />
                
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
});

MensalidadePreco.displayName = "MensalidadePreco";
export default MensalidadePreco;
